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

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import io.vertigo.account.authorization.definitions.Authorization;
import io.vertigo.account.authorization.definitions.AuthorizationName;
import io.vertigo.account.authorization.definitions.Role;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.DefinitionId;
import io.vertigo.datamodel.structure.definitions.DtDefinition;

/**
 * This class list User's Authorizations.
 *
 * @author  pchretien, npiedeloup
 */
public final class UserAuthorizations implements Serializable {

	private static final long serialVersionUID = -7924146007592711123L;

	/**
	 * All authorizations list of this user (global and keyConcept)
	 */
	private final Map<String, DefinitionId<Authorization>> authorizationRefs = new HashMap<>();

	/**
	 * KeyConcept dependent authorizations list by keyConcept of this user.
	 */
	private final Map<DefinitionId<DtDefinition>, Map<String, DefinitionId<Authorization>>> authorizationMapRefs = new HashMap<>();

	/**
	 * Accepted roles for this user.
	 * Use for asc-compatibility.
	 */
	private final Set<DefinitionId<Role>> roleRefs = new HashSet<>();

	private final Map<String, List<Serializable>> mySecurityKeys = new HashMap<>();

	//===========================================================================
	//=======================GESTION DES ROLES===================================
	//===========================================================================
	/**
	 * Add a role to this User.
	 * Role must be previously declared.
	 *
	 * @param role Role to add
	 * @return this UserAuthorizations
	 */
	public UserAuthorizations addRole(final Role role) {
		Assertion.check().isNotNull(role);
		//-----
		roleRefs.add(role.id());
		role.getAuthorizations()
				.forEach(this::addAuthorization);
		return this;
	}

	/**
	 * Return roles set of this user.
	 * @return roles set
	 */
	public Set<Role> getRoles() {
		return roleRefs.stream()
				.map(DefinitionId::get)
				.collect(Collectors.toSet());
	}

	/**
	 * @param role Role
	 * @return if user has this role
	 */
	public boolean hasRole(final Role role) {
		Assertion.check().isNotNull(role);
		//-----
		return roleRefs.contains(role.id());
	}

	/**
	 * Clear all roles on this user. (authorizations are cleared too)
	 * Warning : no more rights after that.
	 * @return this UserAuthorizations
	 */
	public UserAuthorizations clearRoles() {
		roleRefs.clear();
		clearAuthorizations();
		return this;
	}

	/**
	 * Add a authorization to this User.
	 * Authorization must be previously declared.
	 *
	 * @param authorization Authorization to add
	 * @return this UserAuthorizations
	 */
	public UserAuthorizations addAuthorization(final Authorization authorization) {
		Assertion.check().isNotNull(authorization);
		//-----
		final DefinitionId<Authorization> definitionReference = authorization.id();
		if (!authorizationRefs.containsKey(authorization.getName())) {
			authorizationRefs.put(authorization.getName(), definitionReference);
			//On ne prend la définition de l'autorisation que si elle est nouvelle, sinon elle a déjà été donnée ou overridée
		} // else assert authorizationRefs.get(authorization.getName()).get().getOverrides().contains(authorization.getName())

		if (authorization.getEntityDefinition().isPresent()) {
			final Map<String, DefinitionId<Authorization>> entityAuthorizationRefs = authorizationMapRefs.computeIfAbsent(authorization.getEntityDefinition().get().id(), key -> new HashMap<>());
			if (!entityAuthorizationRefs.containsKey(authorization.getName())) {
				entityAuthorizationRefs.put(authorization.getName(), definitionReference);
				//On ne prend la définition de l'autorisation que si elle est nouvelle, sinon elle a déjà été donnée ou overridée
			}
			for (final Authorization grantedAuthorization : authorization.getGrants()) {
				if (!hasAuthorization(grantedAuthorization::getName)) { //On test pour ne pas créer de boucle
					addAuthorization(grantedAuthorization);
				}
			}
			//on ajoute pas vraiment les overrides, car on a juste ajouté un nom d'opération pour la rule de l'authorization actuelle
			final String authorizationPrefix = Authorization.PREFIX + authorization.getEntityDefinition().get().id().shortName() + '$';
			for (final String overridedAuthorization : authorization.getOverrides()) {
				authorizationRefs.put(authorizationPrefix + overridedAuthorization, definitionReference);
				entityAuthorizationRefs.put(authorizationPrefix + overridedAuthorization, definitionReference);
			}
		}
		return this;
	}

	/**
	 * Return uncontextual authorizations set of this user.
	 * It may be limited by entity right. It's usefull for UI rendering rights based.
	 * @return authorizations set
	 */
	public Set<String> getPriorAuthorizationNames() {
		return authorizationRefs.keySet();
	}

	/**
	 * Return authorizations set for this type of entity.
	 *
	 * @param entityDefinition Entity definition
	 * @return Authorizations set
	 */
	public Set<Authorization> getEntityAuthorizations(final DtDefinition entityDefinition) {
		final Map<String, DefinitionId<Authorization>> entityAuthorizationRefs = authorizationMapRefs.get(entityDefinition.id());
		if (entityAuthorizationRefs != null) {
			return entityAuthorizationRefs.values().stream()
					.map(DefinitionId::get)
					.collect(Collectors.toSet());
		}
		return Collections.emptySet();
	}

	/**
	 * @param authorizationNamse Authorization
	 * @return true if user has this authorization
	 */
	public boolean hasAuthorization(final AuthorizationName... authorizationNames) {
		Assertion.check().isNotNull(authorizationNames);
		//-----
		return Arrays.stream(authorizationNames)
				.anyMatch(authorizationName -> authorizationRefs.containsKey(authorizationName.name()));
	}

	/**
	 * Clear all authorization on this user. (but only authorization : roles aren't cleared)
	 * Warning : no more rights after that.
	 * @return this UserAuthorizations
	 */
	public UserAuthorizations clearAuthorizations() {
		authorizationRefs.clear();
		authorizationMapRefs.clear();
		return this;
	}

	/**
	 * Return the security keys of this user.
	 * Used for data dependent security rules.
	 * @return User's security keys.
	 */
	public Map<String, List<Serializable>> getSecurityKeys() {
		return mySecurityKeys;
	}

	/**
	 * Add a security key part of his security perimeter.
	 * A security key can be multi-valued (then withSecurityKeys is call multiple times).
	 * Value should be an array if this securityKey is a tree (hierarchical) key.
	 * Value can be null : but this don't give any authorizations : if it should be authorized it must be explicitly declared in auth config
	 *
	 * @param securityKey Name
	 * @param value Value
	 * @return this UserAuthorizations
	 */
	public UserAuthorizations withSecurityKeys(final String securityKey, final Serializable value) {
		Assertion.check()
				.isNotBlank(securityKey);
		if (value != null) {
			mySecurityKeys.computeIfAbsent(securityKey, v -> new ArrayList<>()).add(value);
		}
		return this;
	}

	/**
	 * Clear Security Keys.
	 * Use when user change it security perimeter.
	 * @return this UserAuthorizations
	 */
	public UserAuthorizations clearSecurityKeys() {
		mySecurityKeys.clear();
		return this;
	}
}
