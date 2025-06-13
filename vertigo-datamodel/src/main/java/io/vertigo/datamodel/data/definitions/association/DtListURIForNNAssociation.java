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

import io.vertigo.core.node.definition.DefinitionId;
import io.vertigo.datamodel.data.model.UID;

/**
 * URI for NN relation list.
 * @author npiedeloup
 */
public final class DtListURIForNNAssociation extends DtListURIForAssociation<AssociationNNDefinition> {
	private static final long serialVersionUID = -6235569695625996356L;
	private final DefinitionId<AssociationNNDefinition> associationNNDefinitionId;

	/**
	 * @param associationDefinition Association definition
	 * @param source URI source
	 * @param roleName role of this association
	 */
	public DtListURIForNNAssociation(final AssociationNNDefinition associationDefinition, final UID source, final String roleName) {
		super(associationDefinition, source, roleName);
		associationNNDefinitionId = associationDefinition.id();
	}

	/**
	 * @return Association definition.
	 */
	public AssociationNNDefinition getAssociationDefinition() {
		return associationNNDefinitionId.get();
	}

	/** {@inheritDoc} */
	@Override
	public String buildUrn() {
		return getAssociationDefinition().getName() + D2A_SEPARATOR + getRoleName() + D2A_SEPARATOR + getSource().urn();
	}

}
