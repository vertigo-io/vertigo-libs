/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.quarto.publisher.metamodel;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.AbstractDefinition;
import io.vertigo.core.node.definition.DefinitionPrefix;

/**
 * Définition d'un modèle d'édition.
 * Un modèle d'édition est un arbre de données.
 *
 * @author npiedeloup, pchretien
 */
@DefinitionPrefix(PublisherDataDefinition.PREFIX)
public final class PublisherDataDefinition extends AbstractDefinition {
	public static final String PREFIX = "Pu";
	private final PublisherNodeDefinition rootNodeDefinition;

	public PublisherDataDefinition(final String name, final PublisherNodeDefinition rootNodeDefinition) {
		super(name);
		//---
		Assertion.check().isNotNull(rootNodeDefinition);
		//-----
		this.rootNodeDefinition = rootNodeDefinition;
	}

	/**
	 * @return Définition du noeud racine
	 */
	public PublisherNodeDefinition getRootNodeDefinition() {
		return rootNodeDefinition;
	}
}
