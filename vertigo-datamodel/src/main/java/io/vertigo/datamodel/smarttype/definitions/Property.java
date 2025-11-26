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
package io.vertigo.datamodel.smarttype.definitions;

import io.vertigo.core.lang.Assertion;

/**
 * Propriété (meta-data, aspect, attribute) transverse gérée par l'application.
 * Certaines propriétés sont nativement gérées par Dynamo,
 * elles sont listées sous formes de constantes.
 * <br><br>
 * <u>Exemple :</u> le caractère obligatoire d'un champ est déclaré au niveau du modèle,
 * grâce à la propriété NOT_NULL. Cette information est utilisée pour
 * <ul>
 * <li>automatiser les tests métier unitaires coté serveur,</li>
 * <li>automatiser les tests de surface coté client (En utilisant par exemple le javascript),</li>
 * <li>modifier l'affichage de façon à renseigner l'utilisateur sur le caractère
 *      obligatoire du champ. (Exemple : libellé en gras ou astérisque à coté du champ</li>

 * Cette information ou propriété peut être directement portée par le champ voire
 * plus efficace portée par un domaine métier.
 * <br>
 * La finalité du domaine métier étant de dépasser les simples types techniques
 * afin de les enrichir avec une forte sémantique (le caractère obligatoire par exemple).
 * <br>
 * Cette riche sémantique étant utilisée de manière automatique et transparente
 * dans le framework Dynamo ou le framework commun de l'application.
 *
 * @author  pchretien
 * @param <T> type of the property
 */
public record Property<T>(
		String name,
		Class<T> type) {

	/**
	 * Constructeur à partir du nom évocateur de la propriété.
	 * @param name the name of the property
	 * @param type Classe java représentant le type de la propriété.
	 */
	public Property {
		Assertion.check()
				.isNotBlank(name)
				.isNotNull(type);
	}
}
