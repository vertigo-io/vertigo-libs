/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.account.authorization.definitions;

import java.util.List;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.AbstractDefinition;
import io.vertigo.core.node.definition.DefinitionPrefix;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;

/**
 * Une SecuredEntity est une entité sécurisé.
 * Secured entity definition defined how an entity is secured.
 * - entity definition
 * - fields used for security purpose
 * - security dimension
 * - allowed operations
 *
 *
 * @author jgarnier, npiedeloup
 */
@DefinitionPrefix(SecuredEntity.PREFIX)
public final class SecuredEntity extends AbstractDefinition<SecuredEntity> {
	public static final String PREFIX = "Sec";
	private final DataDefinition entityDefinition;
	private final List<DataField> securityFields;
	private final List<SecurityDimension> advancedDimensions;
	private final List<Authorization> operations;

	/**
	 * Constructs an instance of SecurityEntity.
	 *
	 * @param entityDefinition Entity sécurisé.
	 * @param securityFields fields simple de sécurité.
	 * @param advancedDimensions axes avancés de sécurité.
	 * @param operations opérations attribuées.
	 */
	public SecuredEntity(
			final DataDefinition entityDefinition,
			final List<DataField> securityFields,
			final List<SecurityDimension> advancedDimensions,
			final List<Authorization> operations) {
		super(PREFIX + entityDefinition.getName());
		//---
		Assertion.check()
				.isNotNull(entityDefinition)
				.isNotNull(securityFields)
				.isNotNull(advancedDimensions)
				.isNotNull(operations);
		//---
		this.entityDefinition = entityDefinition;
		this.securityFields = securityFields;
		this.advancedDimensions = advancedDimensions;
		this.operations = operations;
	}

	/**
	 * @return the value of entity.
	 */
	public DataDefinition getEntity() {
		return entityDefinition;
	}

	/**
	 * @return the list of security fieldNames.
	 */
	public List<DataField> getSecurityFields() {
		return securityFields;
	}

	/**
	 * @return the value of axes.
	 */
	public List<SecurityDimension> getSecurityDimensions() {
		return advancedDimensions;
	}

	/**
	 * @return the value of operations.
	 */
	public List<Authorization> getOperations() {
		return operations;
	}
}
