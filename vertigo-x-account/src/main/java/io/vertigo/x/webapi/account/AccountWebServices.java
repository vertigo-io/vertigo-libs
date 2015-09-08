package io.vertigo.x.webapi.account;

import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.vega.webservice.WebServices;
import io.vertigo.vega.webservice.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.webservice.stereotype.GET;
import io.vertigo.vega.webservice.stereotype.PathParam;
import io.vertigo.vega.webservice.stereotype.PathPrefix;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

/**
 * Webservice for account extension.
 *
 * @author npiedeloup
 */
@PathPrefix("/x/account")
public final class AccountWebServices implements WebServices {

	private static final String API_VERSION = "0.1.0";
	private static final String IMPL_VERSION = "0.8.2";

	@Inject
	private AccountManager accountManager;

	/**
	 * Get account by id.
	 *
	 * @param id account id.
	 * @return account
	 */
	@GET("/api/accounts/{id}")
	@AnonymousAccessAllowed
	public Account getAccount(@PathParam("id") final String id) {
		return accountManager.getAccount(DtObjectUtil.createURI(Account.class, id));
	}

	/**
	 * Get account by id.
	 *
	 * @param id account id.
	 * @return account
	 */
	@GET("/api/accounts/{id}/photo")
	@AnonymousAccessAllowed
	public VFile getAccountPhoto(@PathParam("id") final String id) {
		return accountManager.getPhoto(DtObjectUtil.createURI(Account.class, id));
	}

	/**
	 * Get all groups.
	 *
	 * @return all groups
	 */
	@GET("/api/groups")
	@AnonymousAccessAllowed
	public Collection<AccountGroup> getAllGroups() {
		return accountManager.getAllGroups();
	}

	/**
	 * Get group by id.
	 *
	 * @param id group id.
	 * @return group
	 */
	@GET("/api/groups/{id}")
	@AnonymousAccessAllowed
	public AccountGroup getAccountGroup(@PathParam("id") final String id) {
		return accountManager.getGroup(DtObjectUtil.createURI(AccountGroup.class, id));
	}

	//-----

	/**
	 * Extension status (code 200 or 500)
	 * @return "OK" or error message
	 */
	@GET("/status")
	@AnonymousAccessAllowed
	public String getStatus() {
		return "OK";
	}

	/**
	 * Extension stats.
	 * @return "OK" or error message
	 */
	@GET("/stats")
	@AnonymousAccessAllowed
	public Map<String, Object> getStats() {
		final Map<String, Object> stats = new HashMap<>();
		final Map<String, Object> sizeStats = new HashMap<>();
		sizeStats.put("accounts", accountManager.getAccountsCount());
		sizeStats.put("groups", accountManager.getGroupsCount());
		stats.put("size", sizeStats);
		return stats;
	}

	/**
	 * Extension config.
	 * @return Config object
	 */
	@GET("/config")
	@AnonymousAccessAllowed
	public Map<String, Object> getConfig() {
		final Map<String, Object> config = new HashMap<>();
		config.put("api-version", API_VERSION);
		config.put("impl-version", IMPL_VERSION);
		return config;
	}

	/**
	 * Extension help.
	 * @return Help object
	 */
	@GET("/help")
	@AnonymousAccessAllowed
	public String getHelp() {
		return "##Account extension"
				+ "\n This extension manage a Account transversal concept use by others extensions.";
	}

}
