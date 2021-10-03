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
package io.vertigo.datamodel.structure.definitions.association;

import io.vertigo.core.node.definition.DefinitionId;
import io.vertigo.datamodel.structure.model.UID;

/**
 * URI for simple 1N relation list.
 * @author npiedeloup
 */
public final class DtListURIForSimpleAssociation extends DtListURIForAssociation<AssociationSimpleDefinition> {
	private static final long serialVersionUID = -6235569695625996356L;
	private final DefinitionId<AssociationSimpleDefinition> associationSimpleDefinitionId;

	/**
	 * @param associationDefinition Association definition
	 * @param source URI source
	 * @param roleName role of this association
	 */
	public DtListURIForSimpleAssociation(final AssociationSimpleDefinition associationDefinition, final UID source, final String roleName) {
		super(associationDefinition, source, roleName);
		associationSimpleDefinitionId = associationDefinition.id();
	}

	/**
	 * @return Association definition.
	 */
	public AssociationSimpleDefinition getAssociationDefinition() {
		return associationSimpleDefinitionId.get();
	}

	/** {@inheritDoc} */
	@Override
	public String buildUrn() {
		return getAssociationDefinition().getName() + D2A_SEPARATOR + getRoleName() + D2A_SEPARATOR + getSource().urn();
	}
}
