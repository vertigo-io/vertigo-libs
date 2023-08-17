/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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

import java.util.Set;

import io.vertigo.account.authorization.definitions.AuthorizationName;
import io.vertigo.account.authorization.definitions.OperationName;
import io.vertigo.core.node.component.Manager;
import io.vertigo.datamodel.criteria.Criteria;
import io.vertigo.datamodel.structure.model.Entity;

/**
 * Authorizations manager.
 * There is two type of authorisations :
 * - general, no-conditions authoriations : used for main features of application (menu, admin, ...)
 * - context dependents authorisations : used for operation on secured data
 *
 * @author npiedeloup
 */
public interface AuthorizationManager extends Manager {

	/**
	 * User authorization accessor to test or add authorizations.
	 * A UserSession must exists.
	 * @return UserAuthorizations
	 */
	UserAuthorizations obtainUserAuthorizations();

	/**
	 * Check on authorizations.
	 * Say if current user has this authorization.
	 *
	 * @param authorizationName authorization. (not null)
	 * @return if user has this authorization.
	 */
	boolean hasAuthorization(AuthorizationName... authorizationName);

	/**
	 * Check if current user can do this operation on this entity.
	 *
	 * @param entity secured data to check
	 * @param operation operation name
	 * @return true if current user can do this operation on this entity.
	 * @param <E> entity type
	 */
	<E extends Entity> boolean isAuthorized(final E entity, OperationName<E> operation);

	/**
	 * Return Criteria of security rules for this current user on this entityClass.
	 *
	 * @param entityClass secured data to check
	 * @param operation operation name
	 * @return Criteria of security rule for this current user on this entity
	 * @param <E> entity type
	 */
	<E extends Entity> Criteria<E> getCriteriaSecurity(Class<E> entityClass, OperationName<E> operation);

	/**
	 * Return Search query filter of security rules for this current user on this dtObjectClass.
	 *
	 * @param entityClass secured data to check
	 * @param operation operation name
	 * @return Search query filter of security rules for this current user on this entity.
	 * @param <E> entity type
	 */
	<E extends Entity> String getSearchSecurity(final Class<E> entityClass, OperationName<E> operation);

	/**
	 * Get all prior authorizations of current user.
	 * This can be use by UI to show or not some features.
	 *
	 * @return authorizations set
	 */
	Set<String> getPriorAuthorizations();

	/**
	 * Get all operation doable on this object by current user.
	 * This can be use by UI to show or not some features.
	 *
	 * @param entity secured data to check
	 * @return operations list
	 * @param <E> entity type
	 */
	<E extends Entity> Set<String> getAuthorizedOperations(final E entity);

}
