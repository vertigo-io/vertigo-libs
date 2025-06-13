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
package io.vertigo.datamodel.data.util;

import java.text.Collator;
import java.util.Locale;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.Node;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.datamodel.data.definitions.DataAccessor;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.definitions.association.AssociationNNDefinition;
import io.vertigo.datamodel.data.definitions.association.AssociationSimpleDefinition;
import io.vertigo.datamodel.data.definitions.association.DtListURIForNNAssociation;
import io.vertigo.datamodel.data.definitions.association.DtListURIForSimpleAssociation;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.model.Fragment;
import io.vertigo.datamodel.data.model.UID;

/**
 * The DtObjectUtil class is a set of utils about the DtObject.
 *
 * @author pchretien
 */
public final class DataModelUtil {

	private DataModelUtil() {
		//private constructor.
	}

	/**
	 * Creates a new instance of 'DtObject' from a 'DtDefinition'.
	 *
	 * @param dataDefinition the definition to use for creation
	 * @return the new instance
	 */
	public static DataObject createDataObject(final DataDefinition dataDefinition) {
		Assertion.check().isNotNull(dataDefinition);
		//-----
		//La création des DtObject n'est pas sécurisée
		return ClassUtil.newInstance(dataDefinition.getClassCanonicalName(), DataObject.class);
	}

	/**
	 * Creates a new entity from a 'DtDefinition'.
	 *
	 * @param dataDefinition the definition to use for creation
	 * @return the new instance
	 */
	public static Entity createEntity(final DataDefinition dataDefinition) {
		return Entity.class.cast(createDataObject(dataDefinition));
	}

	/**
	 * Returns the 'id' of a 'DtObject'.
	 *
	 * @param entity the entity
	 * @return the id of the specified 'DtObject'
	 */
	public static Object getId(final Entity entity) {
		Assertion.check().isNotNull(entity);
		//-----
		final DataDefinition dataDefinition = findDataDefinition(entity);
		final DataField idField = dataDefinition.getIdField().get();
		return idField.getDataAccessor().getValue(entity);
	}

	/**
	 * Récupération d'une UID de DTO.
	 * On récupère l'URI d'un DTO référencé par une association.
	 * Il est nécessaire que l'association soit simple.
	 * Si l'association est multiple on ne récupère pas une UID mais une DtListURI, c'est à dire le pointeur vers une liste.
	 * On recherche une UID correspondant à une association.
	 * Exemple : Une Commande possède un bénéficiaire.
	 * Dans cetexemple on recherche l'UID du bénéficiaire à partir de l'objet commande.
	 *
	 * @param <E>
	 * @param associationDefinitionName Nom de la définition d'une association
	 * @param data Data
	 * @param dtoTargetClass Class of entity of this association
	 * @return dto du DTO relié via l'association au dto passé en paramètre (Nullable)
	 */
	public static <E extends Entity> UID<E> createUID(final DataObject data, final String associationDefinitionName, final Class<E> dtoTargetClass) {
		Assertion.check()
				.isNotNull(associationDefinitionName)
				.isNotNull(data)
				.isNotNull(dtoTargetClass);
		//-----
		final AssociationSimpleDefinition associationSimpleDefinition = Node.getNode().getDefinitionSpace().resolve(associationDefinitionName, AssociationSimpleDefinition.class);
		// 1. On recherche le nom du champ portant l'objet référencé (Exemple : personne)
		final DataDefinition dataDefinition = associationSimpleDefinition.getPrimaryAssociationNode().getDataDefinition();

		// 2. On calcule le nom de la fk.
		final DataField fkField = associationSimpleDefinition.getFKField();

		// 3. On calcule l'URI de la clé étrangère
		final Object id = fkField.getDataAccessor().getValue(data);
		if (id == null) {
			return null;
		}
		return UID.of(dataDefinition, id);
	}

	/**
	 * Récupération d'une UID de Collection à partir d'un dto
	 *
	 * @param entity the entity
	 * @param associationDefinitionName Nom de l'association
	 * @param roleName Nom du role
	 * @return UID de la collection référencée.
	 */
	public static DtListURIForSimpleAssociation createDtListURIForSimpleAssociation(final Entity entity, final String associationDefinitionName, final String roleName) {
		Assertion.check()
				.isNotNull(associationDefinitionName)
				.isNotNull(roleName)
				.isNotNull(entity);
		//-----
		final AssociationSimpleDefinition associationDefinition = Node.getNode().getDefinitionSpace().resolve(associationDefinitionName, AssociationSimpleDefinition.class);
		return new DtListURIForSimpleAssociation(associationDefinition, entity.getUID(), roleName);
	}

	/**
	 * Récupération d'une UID de Collection à partir d'un dto
	 *
	 * @param entity the entity
	 * @param associationDefinitionName Nom de l'association
	 * @param roleName Nom du role
	 * @return UID de la collection référencée.
	 */
	public static DtListURIForNNAssociation createDtListURIForNNAssociation(final Entity entity, final String associationDefinitionName, final String roleName) {
		Assertion.check()
				.isNotNull(associationDefinitionName)
				.isNotNull(roleName)
				.isNotNull(entity);
		//-----
		final AssociationNNDefinition associationDefinition = Node.getNode().getDefinitionSpace().resolve(associationDefinitionName, AssociationNNDefinition.class);
		return new DtListURIForNNAssociation(associationDefinition, entity.getUID(), roleName);
	}

	/**
	 * Creates an UID of entity from an existing fragment.
	 *
	 * @param fragment fragment
	 * @return related entity UID
	 */
	public static <E extends Entity, F extends Fragment<E>> UID<E> createEntityUID(final F fragment) {
		Assertion.check().isNotNull(fragment);
		//-----
		final DataDefinition dataDefinition = findDataDefinition(fragment);
		final DataDefinition entityDtDefinition = dataDefinition.getFragment().get();
		final DataField idField = entityDtDefinition.getIdField().get();
		final Object idValue = idField.getDataAccessor().getValue(fragment);
		return UID.of(entityDtDefinition, idValue);
	}

	/**
	 * Représentation sous forme text d'un dtObject.
	 *
	 * @param data dtObject
	 * @return Représentation sous forme text du dtObject.
	 */
	public static String toString(final DataObject data) {
		Assertion.check().isNotNull(data);
		//-----
		return findDataDefinition(data).getFields()
				.stream()
				.filter(dtField -> dtField.getType() != DataField.FieldType.COMPUTED)
				.map(dtField -> dtField.name() + '=' + dtField.getDataAccessor().getValue(data))
				.collect(Collectors.joining(", ", findDataDefinition(data).getName() + '(', ")"));
	}

	/**
	 * Finds the definition to which the specified 'Data' is mapped.
	 *
	 * @param data Data
	 * @return the id
	 */
	public static DataDefinition findDataDefinition(final DataObject data) {
		Assertion.check().isNotNull(data);
		//-----
		return findDataDefinition(data.getClass());
	}

	/**
	 * Finds the definition from a type of 'Data'
	 *
	 * @param dataClass the type of the 'Data'
	 * @return the id
	 */
	public static DataDefinition findDataDefinition(final Class<? extends DataObject> dataClass) {
		Assertion.check().isNotNull(dataClass);
		//-----
		final String name = DataDefinition.PREFIX + dataClass.getSimpleName();
		return Node.getNode().getDefinitionSpace().resolve(name, DataDefinition.class);
	}

	/**
	 * Finds the definition from a type of 'Data'
	 *
	 * @param dataClassName the name of the 'Data'
	 * @return the id
	 */
	public static DataDefinition findDataDefinition(final String className) {
		Assertion.check().isNotNull(className);
		//-----
		final String simpleName = DataDefinition.PREFIX + className.substring(className.lastIndexOf('.') + 1);
		return Node.getNode().getDefinitionSpace().resolve(simpleName, DataDefinition.class);
	}

	/**
	 * Compare values.
	 *
	 * @param sortDesc sort order
	 * @param data1 value 1
	 * @param data2 value 2
	 * @param dataField field to compare
	 * @return compare value1 to value2
	 */
	public static int compareFieldValues(final DataObject data1, final DataObject data2, final DataField dataField, final boolean sortDesc) {
		Assertion.check().isTrue(DataModelUtil.findDataDefinition(data1).equals(DataModelUtil.findDataDefinition(data2)),
				"Only Datas of the same type can be compared, you try to compare object types '{0}' and '{1}'", data1.getClass(), data2.getClass());
		final DataAccessor dataAccessor = dataField.getDataAccessor();
		return compareFieldValues(dataAccessor.getValue(data1), dataAccessor.getValue(data2), sortDesc);
	}

	/**
	 * Compare values.
	 *
	 * @param sortDesc sort order
	 * @param fieldValue1 value 1
	 * @param fieldValue2 value 2
	 * @return compare value1 to value2
	 */
	public static int compareFieldValues(final Object fieldValue1, final Object fieldValue2, final boolean sortDesc) {
		final int result;
		if (fieldValue1 == null && fieldValue2 == null) {
			return 0;
		}
		if (fieldValue1 == null) {
			result = 1;
		} else if (fieldValue2 == null) {
			result = -1;
		} else if (fieldValue1 instanceof String) { //Objet1 et Objet2 sont désormais non null.
			// pour ignorer les accents
			final Collator compareOperator = Collator.getInstance(Locale.FRENCH);
			compareOperator.setStrength(Collator.PRIMARY);
			result = compareOperator.compare((String) fieldValue1, (String) fieldValue2);
		} else if (fieldValue1 instanceof Comparable<?>) {
			result = ((Comparable) fieldValue1).compareTo(fieldValue2);
		} else {
			result = fieldValue1.toString().compareTo(fieldValue2.toString());
		}
		return sortDesc ? -result : result;
	}
}
