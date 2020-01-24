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
package io.vertigo.studio.plugins.mda.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.node.Home;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.StudioDtDefinition;
import io.vertigo.dynamo.domain.metamodel.StudioDtField;
import io.vertigo.dynamo.domain.metamodel.association.StudioAssociationDefinition;
import io.vertigo.dynamo.domain.metamodel.association.StudioAssociationNNDefinition;
import io.vertigo.dynamo.domain.metamodel.association.StudioAssociationSimpleDefinition;
import io.vertigo.dynamo.task.metamodel.StudioTaskAttribute;

/**
 * Helper.
 *
 * @author emangin
 */
public final class DomainUtil {

	/**
	 * Constructeur privé pour classe utilitaire.
	 */
	private DomainUtil() {
		//RAS
	}

	/**
	 * Construite le type java (sous forme de chaine de caractère) correspondant
	 * à un champ.
	 * @param dtField the field
	 * @return String
	 */
	public static String buildJavaType(final StudioDtField dtField) {
		return buildJavaType(dtField.getDomain(), dtField.getCardinality(), getManyTargetJavaClass(dtField.getDomain()));
	}

	/**
	 * Construite le type java (sous forme de chaine de caractère) correspondant
	 * à un attribut de tache.
	 * @param taskAttribute the attribute
	 * @return String
	 */
	public static String buildJavaType(final StudioTaskAttribute taskAttribute) {
		return buildJavaType(taskAttribute.getDomain(), taskAttribute.getCardinality(), getManyTargetJavaClass(taskAttribute.getDomain()));
	}

	/**
	 * Construite le label du type java (sous forme de chaine de caractère) correspondant
	 * à un DtField.
	 * @param dtField DtField
	 * @return String
	 */
	public static String buildJavaTypeLabel(final StudioDtField dtField) {
		return buildJavaTypeLabel(dtField.getDomain(), dtField.getCardinality(), getManyTargetJavaClass(dtField.getDomain()));
	}

	/**
	 * Construite le label du type java (sous forme de chaine de caractère) correspondant
	 * à un attribut de tache.
	 * @param taskAttribute the attribute
	 * @return String
	 */
	public static String buildJavaTypeLabel(final StudioTaskAttribute taskAttribute) {
		return buildJavaTypeLabel(taskAttribute.getDomain(), taskAttribute.getCardinality(), getManyTargetJavaClass(taskAttribute.getDomain()));
	}

	private static Class getManyTargetJavaClass(final Domain domain) {
		switch (domain.getScope()) {
			case DATA_OBJECT:
				return DtList.class;
			case PRIMITIVE:
			case VALUE_OBJECT:
				return List.class;
			default:
				throw new IllegalStateException();
		}
	}

	private static String buildJavaType(final Domain domain, final Cardinality cardinality, final Class manyTargetClass) {
		final String className;
		switch (domain.getScope()) {
			case PRIMITIVE:
				String javaType = domain.getJavaClass().getName();

				//On simplifie l'écriture des types primitifs
				//java.lang.String => String
				if (javaType.startsWith("java.lang.")) {
					javaType = javaType.substring("java.lang.".length());
				}
				className = javaType;
				break;
			case DATA_OBJECT:
				className = domain.getDtDefinition().getClassCanonicalName();
				break;
			case VALUE_OBJECT:
				className = domain.getJavaClass().getName();
				break;
			default:
				throw new IllegalStateException();
		}
		if (cardinality.hasMany()) {
			return manyTargetClass.getName() + '<' + className + '>';
		}
		return className;
	}

	public static String buildJavaTypeLabel(final Domain domain, final Cardinality cardinality, final Class manyTargetClass) {
		final String classLabel;
		switch (domain.getScope()) {
			case PRIMITIVE:
				classLabel = domain.getJavaClass().getSimpleName();
				break;
			case DATA_OBJECT:
				classLabel = domain.getDtDefinition().getClassSimpleName();
				break;
			case VALUE_OBJECT:
				classLabel = domain.getJavaClass().getSimpleName();
				break;
			default:
				throw new IllegalStateException();
		}
		if (cardinality.hasMany()) {
			return manyTargetClass.getSimpleName() + " de " + classLabel;
		}
		return classLabel;
	}

	public static Collection<StudioDtDefinition> getDtDefinitions() {
		return sortDefinitionCollection(Home.getApp().getDefinitionSpace().getAll(StudioDtDefinition.class));
	}

	public static Map<String, Collection<StudioDtDefinition>> getDtDefinitionCollectionMap() {
		return getDefinitionCollectionMap(getDtDefinitions());
	}

	public static Collection<StudioAssociationSimpleDefinition> getSimpleAssociations() {
		return sortAssociationsCollection(Home.getApp().getDefinitionSpace().getAll(StudioAssociationSimpleDefinition.class));
	}

	public static Collection<StudioAssociationNNDefinition> getNNAssociations() {
		return sortAssociationsCollection(Home.getApp().getDefinitionSpace().getAll(StudioAssociationNNDefinition.class));
	}

	/**
	 * trie de la collection.
	 * @param definitionCollection collection à trier
	 * @return collection triée
	 */
	public static List<StudioDtDefinition> sortDefinitionCollection(final Collection<StudioDtDefinition> definitionCollection) {
		final List<StudioDtDefinition> list = new ArrayList<>(definitionCollection);
		list.sort(Comparator.comparing(StudioDtDefinition::getName));
		return list;
	}

	/**
	 * @param definitionCollection collection à traiter
	 * @return map ayant le package name en clef
	 */
	private static Map<String, Collection<StudioDtDefinition>> getDefinitionCollectionMap(final Collection<StudioDtDefinition> definitions) {
		final Map<String, Collection<StudioDtDefinition>> map = new LinkedHashMap<>();

		for (final StudioDtDefinition definition : definitions) {
			map.computeIfAbsent(definition.getPackageName(),
					k -> new ArrayList<>())
					.add(definition);
		}
		return map;
	}

	private static <A extends StudioAssociationDefinition> Collection<A> sortAssociationsCollection(final Collection<A> associationCollection) {
		final List<A> list = new ArrayList<>(associationCollection);
		list.sort(Comparator.comparing(StudioAssociationDefinition::getName));
		return list;
	}
}
