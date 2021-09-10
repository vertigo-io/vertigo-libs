package io.vertigo.account.authorization;

import java.util.function.BooleanSupplier;
import java.util.stream.Stream;

import io.vertigo.account.authorization.definitions.AuthorizationName;
import io.vertigo.account.authorization.definitions.OperationName;
import io.vertigo.core.locale.MessageText;
import io.vertigo.core.node.Node;
import io.vertigo.datamodel.criteria.Criteria;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.util.DtObjectUtil;
import io.vertigo.datastore.entitystore.EntityStoreManager;

public final class AuthorizationUtil {
	private static final MessageText DEFAULT_FORBIDDEN_MESSAGE = MessageText.ofDefaultMsg("Not enough authorizations", Resources.AUTHORIZATION_DEFAULT_FORBIDDEN_MESSAGE);

	public static void assertAuthorizations(final AuthorizationName... authorizationName) {
		assertAuthorizations(DEFAULT_FORBIDDEN_MESSAGE, authorizationName); //no too sharp info here : may use log
	}

	public static void assertAuthorizations(final MessageText message, final AuthorizationName... authorizationName) {
		final AuthorizationManager authorizationManager = Node.getNode().getComponentSpace().resolve(AuthorizationManager.class);
		if (!authorizationManager.hasAuthorization(authorizationName)) {
			throw new VSecurityException(message);
		}
	}

	public static <E extends Entity> void assertOperations(final E entity, final OperationName<E> operation) {
		assertOperations(entity, operation, DEFAULT_FORBIDDEN_MESSAGE); //no too sharp info here : may use log
	}

	public static <E extends Entity> void assertOperations(final E entity, final OperationName<E> operation, final MessageText message) {
		final AuthorizationManager authorizationManager = Node.getNode().getComponentSpace().resolve(AuthorizationManager.class);
		if (!authorizationManager.isAuthorized(entity, operation)) {
			throw new VSecurityException(message);
		}
	}

	public static <E extends Entity> E assertOperationsOnOriginalEntity(final E entity, final OperationName<E> operation) {
		return assertOperationsOnOriginalEntity(entity, operation, DEFAULT_FORBIDDEN_MESSAGE); //no too sharp info here : may use log
	}

	public static <E extends Entity> E assertOperationsOnOriginalEntity(final E entity, final OperationName<E> operation, final MessageText message) {
		E originalEntity;
		if (DtObjectUtil.getId(entity) != null) {
			final EntityStoreManager entityStoreManager = Node.getNode().getComponentSpace().resolve(EntityStoreManager.class);
			originalEntity = (E) entityStoreManager.readOneForUpdate(entity.getUID());
		} else {
			originalEntity = entity;
		}
		assertOperations(originalEntity, operation, message); //no too sharp info here : may use log
		return originalEntity;
	}

	public static void assertOr(final BooleanSupplier... booleanSuppliers) {
		if (!Stream.of(booleanSuppliers).anyMatch(BooleanSupplier::getAsBoolean)) {
			throw new VSecurityException(DEFAULT_FORBIDDEN_MESSAGE);
		}
	}

	public static BooleanSupplier hasAuthorization(final AuthorizationName... authorizationName) {
		final AuthorizationManager authorizationManager = Node.getNode().getComponentSpace().resolve(AuthorizationManager.class);
		return () -> authorizationManager.hasAuthorization(authorizationName);
	}

	public static <E extends Entity> AuthorizationCriteria<E> authorizationCriteria(final Class<E> clazz, final OperationName<E> operation) {
		final AuthorizationManager authorizationManager = Node.getNode().getComponentSpace().resolve(AuthorizationManager.class);
		final Criteria<E> criteria = authorizationManager.getCriteriaSecurity(clazz, operation);
		return new AuthorizationCriteria<>(criteria, clazz);
	}
}
