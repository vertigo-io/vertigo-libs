/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2021, Vertigo.io, team@vertigo.io
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
package io.vertigo.datamodel.task.definitions;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.Node;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.structure.definitions.ConstraintException;

/**
 * Attribut d'une tache.
 * Il s'agit soit :
 *  - d'un type primitif
 *  - d'un type complexe : DTO ou DTC
 * Dans tous les cas il s'agit d'un {@link io.vertigo.dynamo.domain.metamodel.Domain}.
 *
 * Le paramètre peut être :
 *
 *  - obligatoire ou facultatif
 *
 * @author  fconstantin, pchretien
 * @param name the name of the attribute
 * @param smartTypeDefinition the smartType of the attribute
 * @param cardinality the cardinality of the attribute see {@code Cardinality}
 */
public record TaskAttribute(
		String name,
		SmartTypeDefinition smartTypeDefinition,
		Cardinality cardinality) {

	public TaskAttribute {
		Assertion.check()
				.isNotNull(name)
				.isNotNull(smartTypeDefinition)
				.isNotNull(cardinality)
				.isTrue(StringUtil.isLowerCamelCase(name),
						"the name of the attribute {0} must be in lowerCamelCase", name);
	}

	/**
	 * Vérifie la cohérence des arguments d'un Attribute
	 * Vérifie que l'objet est cohérent avec le type défini sur l'attribut.
	 * @param value Valeur (Object primitif ou DtObject ou bien DtList)
	 */
	public void checkAttribute(final Object value) {
		final SmartTypeManager smartTypeManager = Node.getNode().getComponentSpace().resolve(SmartTypeManager.class);
		try {
			smartTypeManager.checkConstraints(smartTypeDefinition, cardinality, value);
		} catch (final ConstraintException e) {
			throw WrappedException.wrap(e);
		}
	}

	/**
	 * Returns the class that holds the value of the field.
	 * If cardinality is many it's either a list or a dtList, if not then it's the base type of the domain.
	 * @return the data accessor.
	 */
	public Class getTargetJavaClass() {
		return smartTypeDefinition.getJavaClass(cardinality);
	}
}
