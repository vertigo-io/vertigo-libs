package io.vertigo.addons.plugins.account.redis;

import io.vertigo.addons.account.Account;
import io.vertigo.addons.account.AccountBuilder;
import io.vertigo.addons.account.AccountGroup;
import io.vertigo.addons.connectors.redis.RedisConnector;
import io.vertigo.addons.impl.account.AccountStorePlugin;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.lang.Assertion;
import io.vertigo.util.MapBuilder;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.inject.Inject;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.Response;
import redis.clients.jedis.Transaction;

/**
 * @author pchretien
 */
public final class RedisAccountStorePlugin implements AccountStorePlugin {
	private final RedisConnector redisConnector;

	/**
	 * @param redisConnector Connector Redis
	 */
	@Inject
	public RedisAccountStorePlugin(final RedisConnector redisConnector) {
		Assertion.checkNotNull(redisConnector);
		//-----
		this.redisConnector = redisConnector;
	}

	/** {@inheritDoc} */
	@Override
	public void saveAccount(final Account account) {
		Assertion.checkNotNull(account);
		//-----
		try (final Jedis jedis = redisConnector.getResource()) {
			final Transaction tx = jedis.multi();
			tx.hmset("account:" + account.getId(), account2Map(account));
			tx.lpush("accounts", account.getId());
			tx.exec();
		}
	}

	private static Map<String, String> account2Map(final Account account) {
		return new MapBuilder<String, String>()
				.put("id", account.getId())
				.put("displayName", account.getDisplayName())
				.build();
	}

	private static Account map2Account(final Map<String, String> data) {
		return new AccountBuilder(data.get("id"))
				.withDisplayName(data.get("displayName"))
				.build();
	}

	@Override
	public long getNbAccounts() {
		try (final Jedis jedis = redisConnector.getResource()) {
			return jedis.llen("accounts");
		}
	}

	@Override
	public long getNbGroups() {
		try (final Jedis jedis = redisConnector.getResource()) {
			return jedis.llen("groups");
		}
	}

	/** {@inheritDoc} */
	@Override
	public boolean exists(final URI<Account> accountURI) {
		Assertion.checkNotNull(accountURI);
		//-----
		try (final Jedis jedis = redisConnector.getResource()) {
			return jedis.exists("account:" + accountURI.getId());
		}
	}

	/** {@inheritDoc} */
	@Override
	public Account getAccount(final URI<Account> accountURI) {
		Assertion.checkNotNull(accountURI);
		//-----
		try (final Jedis jedis = redisConnector.getResource()) {
			return map2Account(jedis.hgetAll("account:" + accountURI.getId()));
		}
	}

	/** {@inheritDoc} */
	@Override
	public void saveGroup(final AccountGroup group) {
		Assertion.checkNotNull(group);
		//-----
		//----
		try (final Jedis jedis = redisConnector.getResource()) {
			final Transaction tx = jedis.multi();
			tx.hmset("group:" + group.getId(), group2Map(group));
			tx.lpush("groups", group.getId());
			tx.exec();
		}
	}

	private static Map<String, String> group2Map(final AccountGroup group) {
		return new MapBuilder<String, String>()
				.put("id", group.getId())
				.put("displayName", group.getDisplayName())
				.build();
	}

	private static AccountGroup map2Group(final Map<String, String> data) {
		return new AccountGroup(data.get("id"), data.get("displayName"));
	}

	/** {@inheritDoc} */
	@Override
	public AccountGroup getGroup(final URI<AccountGroup> groupURI) {
		Assertion.checkNotNull(groupURI);
		//-----
		try (final Jedis jedis = redisConnector.getResource()) {
			return map2Group(jedis.hgetAll("group:" + groupURI.getId()));
		}
	}

	/** {@inheritDoc} */
	@Override
	public Collection<AccountGroup> getAllGroups() {
		final List<Response<Map<String, String>>> responses = new ArrayList<>();
		try (final Jedis jedis = redisConnector.getResource()) {
			final List<String> ids = jedis.lrange("accounts", 0, -1);
			final Transaction tx = jedis.multi();
			for (final String id : ids) {
				responses.add(tx.hgetAll("account:" + id));
			}
			tx.exec();
		}
		//----- we are using tx to avoid roundtrips
		final List<AccountGroup> groups = new ArrayList<>();
		for (final Response<Map<String, String>> response : responses) {
			final Map<String, String> data = response.get();
			if (!data.isEmpty()) {
				groups.add(map2Group(data));
			}
		}
		return groups;
	}

	/** {@inheritDoc} */
	@Override
	public void attach(final URI<Account> accountURI, final URI<AccountGroup> groupURI) {
		Assertion.checkNotNull(accountURI);
		Assertion.checkNotNull(groupURI);
		//-----
		try (final Jedis jedis = redisConnector.getResource()) {
			final Transaction tx = jedis.multi();
			tx.lpush("accountsByGroup:" + groupURI.getId(), accountURI.getId().toString());
			tx.lpush("groupsByAccount:" + accountURI.getId(), groupURI.getId().toString());
			tx.exec();
		}
	}

	/** {@inheritDoc} */
	@Override
	public void detach(final URI<Account> accountURI, final URI<AccountGroup> groupURI) {
		Assertion.checkNotNull(accountURI);
		Assertion.checkNotNull(groupURI);
		//-----
		try (final Jedis jedis = redisConnector.getResource()) {
			final Transaction tx = jedis.multi();
			tx.lrem("accountsByGroup:" + groupURI.getId(), -1, accountURI.getId().toString());
			tx.lrem("groupsByAccount:" + accountURI.getId(), 1, groupURI.getId().toString());
			tx.exec();
		}
	}

	/** {@inheritDoc} */
	@Override
	public Set<URI<Account>> getAccountURIs(final URI<AccountGroup> groupURI) {
		Assertion.checkNotNull(groupURI);
		//-----
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(Account.class);
		final Set<URI<Account>> set = new HashSet<>();
		try (final Jedis jedis = redisConnector.getResource()) {
			final List<String> ids = jedis.lrange("accountsByGroup:" + groupURI.getId(), 0, -1);
			for (final String id : ids) {
				set.add(new URI<Account>(dtDefinition, id));
			}
			return set;
		}
	}

	/** {@inheritDoc} */
	@Override
	public Set<URI<AccountGroup>> getGroupURIs(final URI<Account> accountURI) {
		Assertion.checkNotNull(accountURI);
		//-----
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(AccountGroup.class);
		final Set<URI<AccountGroup>> set = new HashSet<>();
		try (final Jedis jedis = redisConnector.getResource()) {
			final List<String> ids = jedis.lrange("groupsByAccount:" + accountURI.getId(), 0, -1);
			for (final String id : ids) {
				set.add(new URI<AccountGroup>(dtDefinition, id));
			}
			return set;
		}
	}

}
