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
import io.vertigo.core.node.definition.AbstractDefinition;

/**
 * Décrit une association entre deux objets (A et B)
 * L'association permet de décrire d'un point de vue conceptuel :
 * - les cardinalités, (notnull ; multiplicity )
 * - les roles,
 * - la navigation,
 * - les deux types d'objets ou DtDefinition ou classes mises en oeuvre.
 *
 * L'association permet aussi de décrire les choix d'implémentation effectués
 * - Foreign key
 * - Nom de table
 *
 *
 * 3 cas de figure :
 *  >>Relation simple     A-B = (0)1 -- (0)1
 *  >>Relation multpliple A-B = (0)1 -- *
 *  >>Relation complexe   A-B =   *  -- *
 *  Pour la relation simple on copie la clé de B dans A
 *  Pour la relation multiple on copie la relation de A dans B
 *  Pour la relation complexe XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *
 * @author  jcassignol, pchretien
 */
public abstract class AssociationDefinition<A extends AssociationDefinition<A>> extends AbstractDefinition<A> {
	private final AssociationNode associationNodeA;
	private final AssociationNode associationNodeB;

	/**
	 * Constructor.
	 * @param associationNodeA Noeud A
	 * @param associationNodeB Noeud B
	 */
	AssociationDefinition(final String name, final AssociationNode associationNodeA, final AssociationNode associationNodeB) {
		super(name);
		//---
		Assertion.check()
				.isNotNull(associationNodeA)
				.isNotNull(associationNodeB);
		//-----
		this.associationNodeA = associationNodeA;
		this.associationNodeB = associationNodeB;
		//-----
		// we check that navigable nodes are entities because you cannot navigate toward an object that is not identified by a key
		checkNavigability(associationNodeA, name);
		checkNavigability(associationNodeB, name);
	}

	private static void checkNavigability(final AssociationNode associationNode, final String associationName) {
		Assertion.check()
				.when(associationNode.isNavigable(), () -> Assertion.check()
						.isTrue(associationNode.getDataDefinition().getStereotype().isPersistent(), "assocation : {0}. you cannot navigate towards an object that is not an entity ", associationName));
	}

	/**
	 * Noeud A de l'association.
	 * @return AssociationNode
	 */
	public final AssociationNode getAssociationNodeA() {
		return associationNodeA;
	}

	/**
	 * Noeud B de l'association.
	 * @return AssociationNode
	 */
	public final AssociationNode getAssociationNodeB() {
		return associationNodeB;
	}
}
