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
package io.vertigo.datamodel.data.stereotype;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Gestion des associations NN.
 *
 * @author  dchallas
 */
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Target({ ElementType.METHOD, ElementType.FIELD })
public @interface AssociationNN {
	/**
	 * Nom logique de l'association.
	 */
	String name();

	/**
	 * Nom de la table de jointure.
	 */
	String tableName();

	/**
	 * Nom du DT possédant la table A utilisée (n).
	 */
	String dataDefinitionA();

	/**
	 * Nom du DT possédant la table A utilisée (n).
	 */
	String dataDefinitionB();

	/**
	 * Si le noeud représentant la table A est navigable.
	 */
	boolean navigabilityA();

	/**
	 * Si le noeud représentant la table B est navigable.
	 */
	boolean navigabilityB();

	/**
	 * Label du role associé au noeud représentant la table A.
	 */
	String labelA();

	/**
	 * Label du role associé au noeud représentant la table B.
	 */
	String labelB();

	/**
	 * Nom du role associé au noeud représentant la table A.
	 */
	String roleA();

	/**
	 * Nom du role associé au noeud représentant la table B.
	 */
	String roleB();

}
