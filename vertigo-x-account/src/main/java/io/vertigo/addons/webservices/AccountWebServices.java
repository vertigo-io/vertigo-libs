package io.vertigo.addons.webservices;

import io.vertigo.addons.account.Account;
import io.vertigo.addons.account.AccountGroup;
import io.vertigo.addons.account.AccountManager;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.GET;
import io.vertigo.vega.rest.stereotype.PathParam;
import io.vertigo.vega.rest.stereotype.PathPrefix;

import java.util.Collection;

import javax.inject.Inject;

/**
 * Webservice for addon Account.
 *
 * @author npiedeloup
 */
@PathPrefix("/x/accounts")
public final class AccountWebServices implements RestfulService {

	@Inject
	private AccountManager accountManager;

	/**
	 * Get account by id.
	 *
	 * @param id account id.
	 * @return account
	 */
	@GET("/{id}")
	@AnonymousAccessAllowed
	public Account getAccount(@PathParam("id") final long id) {
		return accountManager.getStore().getAccount(DtObjectUtil.createURI(Account.class, id));
	}

	/**
	 * Get all groups.
	 *
	 * @return all groups
	 */
	@GET("/groups")
	@AnonymousAccessAllowed
	public Collection<AccountGroup> getAllGroups() {
		return accountManager.getStore().getAllGroups();
	}

	/**
	 * Get group by id.
	 *
	 * @param id group id.
	 * @return group
	 */
	@GET("/groups/{id}")
	@AnonymousAccessAllowed
	public AccountGroup getAccountGroup(@PathParam("id") final long id) {
		return accountManager.getStore().getGroup(DtObjectUtil.createURI(AccountGroup.class, id));
	}

}
