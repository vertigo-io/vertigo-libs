package io.vertigo.x.plugins.account.redis;

import io.vertigo.commons.codec.Codec;
import io.vertigo.commons.codec.CodecManager;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.Option;
import io.vertigo.util.MapBuilder;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountBuilder;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.connectors.redis.RedisConnector;
import io.vertigo.x.impl.account.AccountStorePlugin;

import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
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
	private static final int CODEC_BUFFER_SIZE = 3 * 1024;
	private static final String CODEC_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
	private final RedisConnector redisConnector;
	private final CodecManager codecManager;

	/**
	 * @param redisConnector Connector Redis
	 * @param codecManager Codec manager
	 */
	@Inject
	public RedisAccountStorePlugin(final RedisConnector redisConnector, final CodecManager codecManager) {
		Assertion.checkNotNull(redisConnector);
		Assertion.checkNotNull(codecManager);
		//-----
		this.redisConnector = redisConnector;
		this.codecManager = codecManager;
	}

	/** {@inheritDoc} */
	@Override
	public void saveAccounts(final List<Account> accounts) {
		Assertion.checkNotNull(accounts);
		//-----
		try (final Jedis jedis = redisConnector.getResource()) {
			final Transaction tx = jedis.multi();
			for (final Account account : accounts) {
				tx.hmset("account:" + account.getId(), account2Map(account));
				tx.lpush("accounts", account.getId());
			}
			tx.exec();
		}
	}

	/** {@inheritDoc} */
	@Override
	public long getAccountsCount() {
		try (final Jedis jedis = redisConnector.getResource()) {
			return jedis.llen("accounts");
		}
	}

	/** {@inheritDoc} */
	@Override
	public long getGroupsCount() {
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
			tx.lrem("accountsByGroup:" + groupURI.getId(), 0, accountURI.getId().toString());
			tx.lrem("groupsByAccount:" + accountURI.getId(), 0, groupURI.getId().toString());
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

	private static Map<String, String> account2Map(final Account account) {
		return new MapBuilder<String, String>()
				.put("id", account.getId())
				.put("displayName", account.getDisplayName())
				.putNullable("email", account.getEmail())
				.build();
	}

	private static Account map2Account(final Map<String, String> data) {
		return new AccountBuilder(data.get("id"))
				.withDisplayName(data.get("displayName"))
				.withEmail(data.get("email"))
				.build();
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
	public void setPhoto(final URI<Account> accountURI, final VFile photo) {
		Assertion.checkNotNull(accountURI);
		Assertion.checkNotNull(photo);
		//-----
		final Map<String, String> vFileMapPhoto = vFile2Map(photo);
		try (final Jedis jedis = redisConnector.getResource()) {
			final Transaction tx = jedis.multi();
			tx.hmset("photoByAccount:" + accountURI.getId(), vFileMapPhoto);
			tx.exec();
		}
	}

	/** {@inheritDoc} */
	@Override
	public Option<VFile> getPhoto(final URI<Account> accountURI) {
		final Map<String, String> result;
		try (final Jedis jedis = redisConnector.getResource()) {
			result = jedis.hgetAll("photoByAccount:" + accountURI.getId());
		}
		if (result.isEmpty()) {
			return Option.none();
		}
		return Option.some(map2vFile(result));
	}

	private Map<String, String> vFile2Map(final VFile vFile) {
		final String lastModified = new SimpleDateFormat(CODEC_DATE_FORMAT).format(vFile.getLastModified());
		final String base64Content = encode2Base64(vFile);
		return new MapBuilder<String, String>()
				.put("fileName", vFile.getFileName())
				.put("mimeType", vFile.getMimeType())
				.put("length", String.valueOf(vFile.getLength()))
				.put("lastModified", lastModified)
				.put("base64Content", base64Content)
				.build();
	}

	private static VFile map2vFile(final Map<String, String> vFileMap) {
		try {
			final String fileName = vFileMap.get("fileName");
			final String mimeType = vFileMap.get("mimeType");
			final Long length = Long.valueOf(vFileMap.get("length"));
			final Date lastModified = new SimpleDateFormat(CODEC_DATE_FORMAT).parse(vFileMap.get("lastModified"));

			final String base64Content = vFileMap.get("base64Content");
			return new Base64File(fileName, mimeType, length, lastModified, base64Content);
		} catch (final ParseException e) {
			throw new RuntimeException("Can't decode base64 file", e);
		}
	}

	private String encode2Base64(final VFile vFile) {
		final StringBuilder sb = new StringBuilder();
		final Codec<byte[], String> base64Codec = codecManager.getBase64Codec();
		try (InputStream in = vFile.createInputStream()) {
			final byte[] buf = new byte[CODEC_BUFFER_SIZE];
			while (true) {
				final int rc = in.read(buf);
				if (rc <= 0) {
					break;
				}
				if (rc == CODEC_BUFFER_SIZE) {
					sb.append(base64Codec.encode(buf));
				} else {
					// il faut mettre uniquement la taille pertinente
					final byte[] buf2 = new byte[rc];
					System.arraycopy(buf, 0, buf2, 0, rc);
					sb.append(base64Codec.encode(buf2));
				}
			}
		} catch (final Exception e) {
			throw new RuntimeException("problème encodage base 64 du fichier", e);
		}
		return sb.toString();
	}
}
