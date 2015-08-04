package io.vertigo.addons.plugins.account.memory;

import io.vertigo.addons.account.Account;
import io.vertigo.addons.account.AccountGroup;
import io.vertigo.addons.impl.account.AccountStorePlugin;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.lang.Assertion;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * @author pchretien
 */
public final class MemoryAccountStorePlugin implements AccountStorePlugin {
	private final Map<URI<Account>, Account> accountByURI = new HashMap<>();
	private final Map<URI<AccountGroup>, AccountGroup> groupByURI = new HashMap<>();
	//---
	private final Map<URI<Account>, Set<URI<AccountGroup>>> groupByAccountURI = new HashMap<>();
	private final Map<URI<AccountGroup>, Set<URI<Account>>> accountBygroupURI = new HashMap<>();

	@Override
	public synchronized boolean exists(final URI<Account> accountURI) {
		Assertion.checkNotNull(accountURI);
		//-----
		return accountByURI.containsKey(accountURI);
	}

	@Override
	public synchronized Account getAccount(final URI<Account> accountURI) {
		Assertion.checkNotNull(accountURI);
		//-----
		return accountByURI.get(accountURI);
	}

	@Override
	public synchronized Collection<Account> getAllAccounts() {
		return accountByURI.values();
	}

	@Override
	public synchronized void saveAccount(final Account account) {
		Assertion.checkNotNull(account);
		//-----
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(account);
		final URI<Account> uri = new URI<>(dtDefinition, account.getId());
		//----
		Object old = accountByURI.put(uri, account);
		if (old == null) {
			groupByAccountURI.put(uri, new HashSet<URI<AccountGroup>>());
		}
	}

	//-----
	@Override
	public synchronized AccountGroup getGroup(URI<AccountGroup> groupURI) {
		Assertion.checkNotNull(groupURI);
		//-----
		return groupByURI.get(groupURI);
	}

	@Override
	public synchronized Collection<AccountGroup> getAllGroups() {
		return groupByURI.values();
	}

	@Override
	public synchronized void saveGroup(AccountGroup group) {
		Assertion.checkNotNull(group);
		//-----
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(group);
		final URI<AccountGroup> uri = new URI<>(dtDefinition, group.getId());
		//----
		Assertion.checkArgument(!accountByURI.containsKey(uri), "this group is already registered, you can't create it");
		//-----
		accountBygroupURI.put(uri, new HashSet<URI<Account>>());
		groupByURI.put(uri, group);
	}

	//-----
	@Override
	public synchronized void attach(URI<Account> accountURI, URI<AccountGroup> groupURI) {
		Assertion.checkNotNull(accountURI);
		Assertion.checkNotNull(groupURI);
		//-----
		Set<URI<AccountGroup>> groupURIs = groupByAccountURI.get(accountURI);
		Assertion.checkNotNull(groupURIs, "account must be create before this operation");
		groupURIs.add(groupURI);
		//-----
		Set<URI<Account>> accountURIs = accountBygroupURI.get(groupURI);
		Assertion.checkNotNull(accountURIs, "group must be create before this operation");
		accountURIs.add(accountURI);
	}

	@Override
	public synchronized void detach(URI<Account> accountURI, URI<AccountGroup> groupURI) {
		Assertion.checkNotNull(accountURI);
		Assertion.checkNotNull(groupURI);
		//-----
		Set<URI<AccountGroup>> groupURIs = groupByAccountURI.get(accountURI);
		Assertion.checkNotNull(groupURIs, "account does not long exist");
		groupURIs.remove(groupURI);

		//-----
		Set<URI<Account>> accountURIs = accountBygroupURI.get(groupURI);
		Assertion.checkNotNull(accountURIs, "group does not long exist");
		accountURIs.remove(accountURI);
	}

	@Override
	public synchronized Set<URI<AccountGroup>> getGroupURIs(URI<Account> accountURI) {
		Assertion.checkNotNull(accountURI);
		//-----
		Set<URI<AccountGroup>> groupURIs = groupByAccountURI.get(accountURI);
		Assertion.checkNotNull(accountURI, "account {0} must be create before this operation", accountURI);
		return Collections.unmodifiableSet(groupURIs);
		//
		//		Assertion.checkNotNull(groupURIs, "account must be create before this operation");
		//		List<AccountGroup> groups = new ArrayList<>();
		//		for (URI<AccountGroup> groupURI : groupURIs) {
		//			groups.add(groupByURI.get(groupURI));
		//		}
		//		return Collections.unmodifiableList(groups);
	}

	@Override
	public synchronized Set<URI<Account>> getAccountURIs(URI<AccountGroup> groupURI) {
		Assertion.checkNotNull(groupURI);
		//-----
		Set<URI<Account>> accountURIs = accountBygroupURI.get(groupURI);
		Assertion.checkNotNull(accountURIs, "group {0} must be create before this operation", groupURI);
		return Collections.unmodifiableSet(accountURIs);
	}
}
