/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.studio.plugins.mda.domain.java.model;

import io.vertigo.core.lang.Assertion;
import io.vertigo.dynamo.domain.metamodel.DtStereotype;
import io.vertigo.dynamo.domain.metamodel.association.StudioAssociationDefinition;
import io.vertigo.dynamo.domain.metamodel.association.StudioAssociationNode;
import io.vertigo.dynamo.domain.metamodel.association.StudioAssociationSimpleDefinition;

/**
 * Objet utilisé par FreeMarker.
 *
 * @author pchretien
 */
public final class StudioAssociationModel {
	private final StudioAssociationDefinition associationDefinition;
	private final StudioAssociationNode associationNode;

	/**
	 * Constructeur.
	 * @param associationNode Noeud de l'association à générer
	 */
	StudioAssociationModel(final StudioAssociationDefinition associationDefinition, final StudioAssociationNode associationNode) {
		Assertion.checkNotNull(associationDefinition);
		Assertion.checkNotNull(associationNode);
		//-----
		this.associationDefinition = associationDefinition;
		this.associationNode = associationNode;
	}

	/**
	 * @return Definition d'une association.
	 */
	public StudioAssociationDefinition getDefinition() {
		return associationDefinition;
	}

	/**
	 * @return Label du noeud
	 */
	public String getLabel() {
		return associationNode.getLabel();
	}

	/**
	 * @return Role du noeud
	 */
	public String getRole() {
		return associationNode.getRole();
	}

	/**
	 * @return Si la cardinalité max du noeud est multiple
	 */
	public boolean isMultiple() {
		return associationNode.isMultiple();
	}

	/**
	 * @return Type de l'association : Simple ou NN
	 */
	public boolean isSimple() {
		return getDefinition() instanceof StudioAssociationSimpleDefinition;
	}

	/**
	 * @return Si le noeud est navigable
	 */
	public boolean isNavigable() {
		return associationNode.isNavigable();
	}

	/**
	 * @return Type à retourner
	 */
	public String getReturnType() {
		return associationNode.getDtDefinition().getClassCanonicalName();
	}

	/**
	 * @return Type à retourner
	 */
	public String getReturnTypeSimpleName() {
		return associationNode.getDtDefinition().getClassSimpleName();
	}

	/**
	 * @return Type à retourner
	 */
	public boolean isTargetStaticMasterData() {
		return associationNode.getDtDefinition().getStereotype() == DtStereotype.StaticMasterData;
	}

	/**
	 * @return Urn de la définition de l'association
	 */
	public String getUrn() {
		return associationDefinition.getName();
	}

	/**
	 * @return Nom du champ fk en camelCase.
	 */
	public String getFkFieldName() {
		return ((StudioAssociationSimpleDefinition) associationDefinition).getFKField().getName();
	}
}
