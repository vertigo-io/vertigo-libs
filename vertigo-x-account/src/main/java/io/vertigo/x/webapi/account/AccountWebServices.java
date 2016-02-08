/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.x.webapi.account;

import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.util.MapBuilder;
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
 * Webservices for account extension.
 *
 * @author npiedeloup
 */
@PathPrefix("/x/account")
public final class AccountWebServices implements WebServices {

	private static final String API_VERSION = "0.1.0";
	private static final String IMPL_VERSION = "0.9.1";

	@Inject
	private AccountManager accountManager;

	/**
	 * Gets an account by its id.
	 *
	 * @param id the account id.
	 * @return the account
	 */
	@GET("/api/accounts/{id}")
	@AnonymousAccessAllowed
	public Account getAccount(@PathParam("id") final String id) {
		return accountManager.getStore().getAccount(DtObjectUtil.createURI(Account.class, id));
	}

	/**
	 * Gets an account photo by its id.
	 *
	 * @param id account id.
	 * @return the photo of an account
	 */
	@GET("/api/accounts/{id}/photo")
	@AnonymousAccessAllowed
	public VFile getAccountPhoto(@PathParam("id") final String id) {
		return accountManager.getStore().getPhoto(DtObjectUtil.createURI(Account.class, id)).getOrElse(accountManager.getDefaultPhoto());
	}

	/**
	 * Gets all groups.
	 *
	 * @return all groups
	 */
	@GET("/api/groups")
	@AnonymousAccessAllowed
	public Collection<AccountGroup> getAllGroups() {
		return accountManager.getStore().getAllGroups();
	}

	/**
	 * Gets a group by its id.
	 *
	 * @param id the group id.
	 * @return the group
	 */
	@GET("/api/groups/{id}")
	@AnonymousAccessAllowed
	public AccountGroup getAccountGroup(@PathParam("id") final String id) {
		return accountManager.getStore().getGroup(DtObjectUtil.createURI(AccountGroup.class, id));
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
		sizeStats.put("accounts", accountManager.getStore().getAccountsCount());
		sizeStats.put("groups", accountManager.getStore().getGroupsCount());
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
		return new MapBuilder<String, Object>()
				.put("api-version", API_VERSION)
				.put("impl-version", IMPL_VERSION)
				.build();
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
