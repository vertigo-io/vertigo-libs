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
package io.vertigo.datamodel.data.definitions.association;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.DefinitionId;
import io.vertigo.datamodel.data.definitions.DataDefinition;

/**
 * Noeud d'une association.
 *
 * @author  jcassignol, pchretien
 */
public final class AssociationNode {
	private final DefinitionId<DataDefinition> dataDefinitionId;
	private final boolean navigable;
	private final String role;
	private final String label;
	private final boolean multiple;
	private final boolean notNull;

	/**
	 * Constructeur d'un noeud.
	 * @param dataDefinition Définition de DT
	 * @param isNavigable Si le noeud est navigable (i.e. visible)
	 * @param role Role
	 * @param label Label
	 * @param isMultiple Si la cardinalité max est multiple (au plus)
	 * @param isNotNull Si la cardinalité min est non null (au moins)
	 */
	public AssociationNode(
			final DataDefinition dataDefinition,
			final boolean isNavigable,
			final String role,
			final String label,
			final boolean isMultiple,
			final boolean isNotNull) {
		Assertion.check()
				.isNotNull(dataDefinition)
				.isNotNull(label)
				.isNotNull(role)
				.isTrue(role.indexOf(' ') == -1, "Le role ne doit pas être un label : {0}", role);
		//-----
		dataDefinitionId = dataDefinition.id();
		this.role = role;
		this.label = label;
		navigable = isNavigable;
		notNull = isNotNull;
		multiple = isMultiple;
	}

	/**
	 * @return DT (classe de l'objet métier) associé au noeud
	 */
	public DataDefinition getDataDefinition() {
		return dataDefinitionId.get();
	}

	/**
	 * @return Si le noeud est navigable
	 */
	public boolean isNavigable() {
		return navigable;
	}

	/**
	 * @return Role du noeud
	 */
	public String getRole() {
		return role;
	}

	/**
	 * @return Label du noeud
	 */
	public String getLabel() {
		return label;
	}

	/**
	 * @return Si la cardinalité max du noeud est multiple
	 */
	public boolean isMultiple() {
		return multiple;
	}

	/**
	 * @return Si la cardinalité min du noeud est égale à 1
	 */
	public boolean isNotNull() {
		return notNull;
	}
}
