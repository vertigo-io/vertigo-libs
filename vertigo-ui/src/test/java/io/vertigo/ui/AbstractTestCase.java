package io.vertigo.ui;

import java.io.Serializable;
import java.util.Map;

import javax.inject.Inject;

import io.vertigo.account.authorization.AuthorizationManager;
import io.vertigo.account.authorization.definitions.Authorization;
import io.vertigo.account.authorization.definitions.AuthorizationName;
import io.vertigo.account.authorization.definitions.Role;
import io.vertigo.account.security.UserSession;
import io.vertigo.account.security.VSecurityManager;
import io.vertigo.core.node.Node;

/**
 * Classe parent des tests pour créer une session avec droits.
 *
 * @author npiedeloup
 */
public class AbstractTestCase {

	@Inject
	private VSecurityManager securityManager;
	@Inject
	protected AuthorizationManager authorizationManager;

	protected void clearAuthorizations() {
		authorizationManager.obtainUserAuthorizations().clearRoles().clearSecurityKeys();
	}

	protected AutoCloseable ensureAuthorization(final AuthorizationName authorizationName, final Map<String, Serializable> securityKeys) {
		startCurrentSessionAuthorization(authorizationName, securityKeys);
		return new AutoCloseable() {

			@Override
			public void close() {
				stopCurrentSession();
			}
		};
	}

	protected void startCurrentSessionAuthorization(final AuthorizationName authorizationName, final Map<String, Serializable> securityKeys) {
		final var userSession = securityManager.createUserSession();
		securityManager.startCurrentUserSession(userSession);
		clearAuthorizations();
		final var authorizations = authorizationManager.obtainUserAuthorizations();
		if (!authorizations.hasAuthorization(authorizationName)) {
			authorizations.addAuthorization(getAuthorization(authorizationName));
		}
	}

	protected <U extends UserSession> U startCurrentSessionRole(final String roleId, final Map<String, Serializable> securityKeys) {
		final U userSession = securityManager.createUserSession();
		securityManager.startCurrentUserSession(userSession);
		clearAuthorizations();
		final var authorizations = authorizationManager.obtainUserAuthorizations();
		final var role = getRole(roleId);
		if (!authorizations.hasRole(role)) {
			authorizations.addRole(role);
			securityKeys.forEach((key, value) -> authorizations.withSecurityKeys(key, value));
		}
		return userSession;
	}

	protected void stopCurrentSession() {
		securityManager.stopCurrentUserSession();
	}

	protected static Role getRole(final String roleId) {
		return Node.getNode().getDefinitionSpace().resolve(roleId, Role.class);
	}

	protected static Authorization getAuthorization(final AuthorizationName authorizationName) {
		final var definitionSpace = Node.getNode().getDefinitionSpace();
		return definitionSpace.resolve(authorizationName.name(), Authorization.class);
	}

}
