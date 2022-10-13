/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
package io.vertigo.account.authorization;

import java.util.function.BooleanSupplier;
import java.util.function.Supplier;
import java.util.stream.Stream;

import io.vertigo.account.authorization.definitions.AuthorizationName;
import io.vertigo.account.authorization.definitions.OperationName;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.node.Node;
import io.vertigo.datamodel.criteria.Criteria;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.util.DtObjectUtil;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.datastore.impl.entitystore.StoreVAccessor;

public final class AuthorizationUtil {
	private static final LocaleMessageText DEFAULT_FORBIDDEN_MESSAGE = LocaleMessageText.ofDefaultMsg("Not enough authorizations", Resources.AUTHORIZATION_DEFAULT_FORBIDDEN_MESSAGE);

	public static void assertAuthorizations(final AuthorizationName... authorizationName) {
		assertAuthorizations(DEFAULT_FORBIDDEN_MESSAGE, authorizationName); //no too sharp info here : may use log
	}

	public static void assertAuthorizations(final LocaleMessageText message, final AuthorizationName... authorizationName) {
		final AuthorizationManager authorizationManager = Node.getNode().getComponentSpace().resolve(AuthorizationManager.class);
		if (!authorizationManager.hasAuthorization(authorizationName)) {
			throw new VSecurityException(message);
		}
	}

	public static <E extends Entity> void assertOperations(final E entity, final OperationName<E> operation) {
		assertOperations(entity, operation, DEFAULT_FORBIDDEN_MESSAGE); //no too sharp info here : may use log
	}

	public static <E extends Entity> void assertOperations(final E entity, final OperationName<E> operation, final LocaleMessageText message) {
		final AuthorizationManager authorizationManager = Node.getNode().getComponentSpace().resolve(AuthorizationManager.class);
		if (!authorizationManager.isAuthorized(entity, operation)) {
			throw new VSecurityException(message);
		}
	}

	public static <E extends Entity> E assertOperationsOnOriginalEntity(final E entity, final OperationName<E> operation) {
		return assertOperationsOnOriginalEntity(entity, operation, DEFAULT_FORBIDDEN_MESSAGE); //no too sharp info here : may use log
	}

	public static <E extends Entity> E assertOperationsOnOriginalEntity(final E entity, final OperationName<E> operation, final LocaleMessageText message) {
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

	public static <E extends Entity> Criteria<E> getCriteriaSecurity(final Class<E> clazz, final OperationName<E> operation) {
		final AuthorizationManager authorizationManager = Node.getNode().getComponentSpace().resolve(AuthorizationManager.class);
		return authorizationManager.getCriteriaSecurity(clazz, operation);
	}

	public static <E extends Entity> void assertOperationsWithLoadIfNeeded(final StoreVAccessor<E> entityAccessor, final OperationName<E> operation) {
		assertOperationsWithLoadIfNeeded(entityAccessor, operation, DEFAULT_FORBIDDEN_MESSAGE);
	}

	public static <E extends Entity> void assertOperationsWithLoadIfNeeded(final StoreVAccessor<E> entityAccessor, final OperationName<E> operation, final LocaleMessageText message) {
		if (!entityAccessor.isLoaded()) {
			entityAccessor.load();
		}
		assertOperations(entityAccessor.get(), operation, message);
	}

	public static <E extends Entity> E assertOperationsAndReturn(final Supplier<E> entityLoader, final OperationName<E> operation) {
		return assertOperationsAndReturn(entityLoader, operation, DEFAULT_FORBIDDEN_MESSAGE);
	}

	public static <E extends Entity> E assertOperationsAndReturn(final Supplier<E> entityLoader, final OperationName<E> operation, final LocaleMessageText message) {
		final E entity = entityLoader.get();
		assertOperations(entity, operation, message);
		return entity;
	}
}
