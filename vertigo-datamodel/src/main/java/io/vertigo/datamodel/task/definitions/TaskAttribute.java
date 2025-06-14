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
package io.vertigo.datamodel.task.definitions;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.datamodel.data.definitions.DataDescriptor;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;

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
public final class TaskAttribute extends DataDescriptor {
	public TaskAttribute(final String name, final SmartTypeDefinition smartTypeDefinition, final Cardinality cardinality) {
		super(name, smartTypeDefinition, cardinality);
	}
}
