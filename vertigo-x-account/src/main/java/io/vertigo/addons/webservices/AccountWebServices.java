package io.vertigo.addons.webservices;

import io.vertigo.addons.account.Account;
import io.vertigo.addons.account.AccountGroup;
import io.vertigo.addons.account.AccountManager;
import io.vertigo.core.Home;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.metamodel.EndPointDefinition;
import io.vertigo.vega.rest.metamodel.EndPointParam;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.GET;
import io.vertigo.vega.rest.stereotype.PathParam;
import io.vertigo.vega.rest.stereotype.PathPrefix;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

/**
 * Webservice for addon Account.
 *
 * @author npiedeloup
 */
@PathPrefix("/x/accounts")
public final class AccountWebServices implements RestfulService {

	private static final String API_VERSION = "1.0.0";
	private static final String IMPL_VERSION = "0.8.2";

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
		return accountManager.getAccount(DtObjectUtil.createURI(Account.class, id));
	}

	/**
	 * Get all groups.
	 *
	 * @return all groups
	 */
	@GET("/groups")
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
	@GET("/groups/{id}")
	@AnonymousAccessAllowed
	public AccountGroup getAccountGroup(@PathParam("id") final long id) {
		return accountManager.getGroup(DtObjectUtil.createURI(AccountGroup.class, id));
	}

	//-----
	/**
	 * Addon status (code 200 or 500)
	 * @return "OK" or error message
	 */
	@GET("/status")
	@AnonymousAccessAllowed
	public String getStatus() {
		return "OK";
	}

	/**
	 * Addon stats.
	 * @return "OK" or error message
	 */
	@GET("/stats")
	@AnonymousAccessAllowed
	public Map<String, Object> getStats() {
		final Map<String, Object> stats = new HashMap<>();
		final Map<String, Object> sizeStats = new HashMap<>();
		sizeStats.put("accounts", accountManager.getNbAccounts());
		sizeStats.put("groups", accountManager.getNbGroups());
		stats.put("size", sizeStats);
		return stats;
	}

	/**
	 * Addon config.
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
	 * Addon config.
	 * @return Config object
	 */
	@GET("/api")
	@AnonymousAccessAllowed
	public List<String> getApi() {
		final Collection<EndPointDefinition> addonEndPointDefinitions = new ArrayList<>();
		for (final EndPointDefinition endPointDefinition : Home.getDefinitionSpace().getAll(EndPointDefinition.class)) {
			if (endPointDefinition.getMethod().getDeclaringClass().equals(this.getClass())) {
				addonEndPointDefinitions.add(endPointDefinition);
			}
		}
		return publishCatalog(addonEndPointDefinitions);
	}

	/**
	 * Addon config.
	 * @return Config object
	 */
	@GET("/help")
	@AnonymousAccessAllowed
	public String getHelp() {
		return "##Account ";
	}

	private List<String> publishCatalog(final Collection<EndPointDefinition> endPointDefinitions) {
		final List<String> result = new ArrayList<>();

		final StringBuilder sb = new StringBuilder();
		for (final EndPointDefinition endPointDefinition : endPointDefinitions) {
			final String doc = endPointDefinition.getDoc();
			if (!doc.isEmpty()) {
				sb.append(" /*")
						.append(endPointDefinition.getDoc())
						.append("*/")
						.append("\n");
			}
			sb.append(endPointDefinition.getVerb().name()).append(" ")
					.append(endPointDefinition.getPath())
					.append(" (");
			String sep = "";
			for (final EndPointParam endPointParam : endPointDefinition.getEndPointParams()) {
				sb.append(sep);
				sb.append(endPointParam);
				sep = ", ";
			}
			sb.append(")");
			final Type returnType = endPointDefinition.getMethod().getGenericReturnType();
			if (!void.class.isAssignableFrom(endPointDefinition.getMethod().getReturnType())) {
				sb.append(" -> ");
				appendTypeToString(sb, returnType);
			}
			result.add(sb.toString());
			sb.setLength(0);
		}
		return result;
	}

	private void appendTypeToString(final StringBuilder sb, final Type returnType) {
		String sep;
		if (returnType instanceof ParameterizedType) {
			sb.append(((ParameterizedType) returnType).getRawType())
					.append("<");
			sep = "";
			for (final Type typeArgument : ((ParameterizedType) returnType).getActualTypeArguments()) {
				sb.append(sep);
				appendTypeToString(sb, typeArgument);
				sep = ",";
			}
			sb.append(">");
		} else if (returnType instanceof Class) {
			sb.append(((Class) returnType).getSimpleName());
		} else {
			//le toString colle pour les autres cas
			sb.append(returnType.toString());
		}
	}
}
