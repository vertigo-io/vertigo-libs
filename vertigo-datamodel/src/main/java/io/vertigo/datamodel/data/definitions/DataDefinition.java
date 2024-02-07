/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.datamodel.data.definitions;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.ListBuilder;
import io.vertigo.core.lang.MapBuilder;
import io.vertigo.core.node.definition.AbstractDefinition;
import io.vertigo.core.node.definition.DefinitionId;
import io.vertigo.core.node.definition.DefinitionPrefix;

/**
 * The DtDefinition class defines the definition of data.
 *
 * @author pchretien
 */
@DefinitionPrefix(DataDefinition.PREFIX)
public final class DataDefinition extends AbstractDefinition<DataDefinition> {
	public static final String PREFIX = "Dt";
	/** the dataSpace must match this pattern. */
	public static final Pattern REGEX_DATA_SPACE = Pattern.compile("[a-z][a-zA-Z0-9]{3,60}");
	public static final String DEFAULT_DATA_SPACE = "main";

	/** if the definition is a fragment. */
	private final Optional<DefinitionId<DataDefinition>> fragmentOpt;

	/** name of the package. */
	private final String packageName;

	/** List of fields.  */
	private final List<DataField> fields;

	/** Map. (fieldName, DataField). */
	private final Map<String, DataField> mappedFields;

	private final DataStereotype stereotype;

	/** id Field */
	private final Optional<DataField> idFieldOpt;

	private final Optional<DataField> sortFieldOpt;
	private final Optional<DataField> displayFieldOpt;
	private final Optional<DataField> handleFieldOpt;
	private final Optional<DataField> keyFieldOpt;

	private final String dataSpace;

	/**
	 * Constructor.
	 */
	DataDefinition(
			final String name,
			final Optional<DefinitionId<DataDefinition>> fragment,
			final String packageName,
			final DataStereotype stereotype,
			final List<DataField> dtFields,
			final String dataSpace,
			final Optional<DataField> sortField,
			final Optional<DataField> displayField,
			final Optional<DataField> handleField,
			final Optional<DataField> keyField) {
		super(name);
		//---
		Assertion.check()
				.isNotNull(fragment)
				.isNotNull(stereotype)
				.isNotNull(dtFields)
				.isNotBlank(dataSpace)
				.isTrue(REGEX_DATA_SPACE.matcher(dataSpace).matches(), "dataSpace {0} must match pattern {1}", dataSpace, REGEX_DATA_SPACE)
				.isNotNull(sortField)
				.isNotNull(displayField)
				.isNotNull(handleField)
				.isNotNull(keyField);
		//-----
		final var fieldsBuilder = new ListBuilder<DataField>();
		final var mappedFieldsBuilder = new MapBuilder<String, DataField>();
		//-----
		fragmentOpt = fragment;
		//
		this.stereotype = stereotype;
		this.packageName = packageName;
		DataField id = null;

		sortFieldOpt = sortField;
		displayFieldOpt = displayField;
		handleFieldOpt = handleField;
		keyFieldOpt = keyField;

		for (final DataField dtField : dtFields) {
			Assertion.check()
					.when(stereotype.isPersistent() && dtField.isPersistent(), () -> Assertion.check()
							.isTrue(!dtField.cardinality().hasMany(),
									"Only non multiple smarttype are allowed in entity '{0}'", name));
			if (dtField.getType().isId()) {
				Assertion.check().isNull(id, "Only one ID Field is allowed : {0}", name);
				id = dtField;
			}
			registerDataField(mappedFieldsBuilder, fieldsBuilder, dtField);
		}
		fields = fieldsBuilder.unmodifiable().build();
		mappedFields = mappedFieldsBuilder.unmodifiable().build();
		idFieldOpt = Optional.ofNullable(id);
		this.dataSpace = dataSpace;
		//-----
		Assertion.check()
				.when(fragment.isPresent(), () -> Assertion.check()
						.isTrue(DataStereotype.Fragment == stereotype, "Error on {0} with sterotype {1}, If an object is a fragment then it must have this stereotype", name, stereotype))
				//Persistent => ID
				.when(stereotype.isPersistent(), () -> Assertion.check()
						.isTrue(idFieldOpt.isPresent(), "Error on {0}, If an object is persistent then it must have an ID", name))
				.when(stereotype.isPersistent(), () -> Assertion.check()
						.isTrue(keyFieldOpt.isEmpty(), "Error on {0}, If an object is persistent then it must not have a keyField", name))
				.when(!stereotype.isPersistent(), () -> Assertion.check()
						.isTrue(idFieldOpt.isEmpty(), "Error on {0}, If an object is not persistent then it must have no ID", name));
	}

	/**
	 * Static method factory for DataDefinitionBuilder
	 * @param name the name of the dataDefinition
	 * @return DtDefinitionBuilder
	 */
	public static DataDefinitionBuilder builder(final String name) {
		return new DataDefinitionBuilder(name);
	}

	private static void registerDataField(final MapBuilder<String, DataField> mappedFieldsBuilder, final ListBuilder<DataField> fieldsBuilder, final DataField dtField) {
		Assertion.check()
				.isNotNull(dtField);
		//-----
		fieldsBuilder.add(dtField);
		mappedFieldsBuilder.putCheckKeyNotExists(dtField.name(), dtField);
	}

	public Optional<DataDefinition> getFragment() {
		return fragmentOpt.map(DefinitionId::get);
	}

	/**
	 * @return Stereotype du Dt
	 */
	public DataStereotype getStereotype() {
		return stereotype;
	}

	/**
	 * @return Nom canonique (i.e. avec le package) de la classe d'implémentation du DtObject
	 */
	public String getClassCanonicalName() {
		return getPackageName() + '.' + getClassSimpleName();
	}

	/**
	 * @return Simple Nom (i.e. sans le package) de la classe d'implémentation du DtObject
	 */
	public String getClassSimpleName() {
		return id().shortName();
	}

	/**
	 * @return the name of the package
	 */
	public String getPackageName() {
		return packageName;
	}

	/**
	 * Retourne le champ correspondant SOUS CONDITION qu'il existe sinon assertion.
	 *
	 * @param fieldName Nom du champ
	 * @return Champ correspondant
	 */
	public DataField getField(final String fieldName) {
		Assertion.check().isNotBlank(fieldName);
		//-----
		final DataField dtField = mappedFields.get(fieldName);
		//-----
		Assertion.check().isNotNull(dtField, "field '{0}' not found on '{1}'. Available fields are :{2}", fieldName, getName(), mappedFields.keySet());
		return dtField;
	}

	/**
	 * Retourne le champ correspondant SOUS CONDITION qu'il existe sinon assertion.
	 *
	 * @param fieldName Nom du champ
	 * @return Champ correspondant
	 */
	public DataField getField(final DataFieldName fieldName) {
		return getField(fieldName.name());
	}

	/**
	 * @param fieldName FieldName
	 * @return if this field exists in this DtDefinition
	 */
	public boolean contains(final String fieldName) {
		Assertion.check().isNotNull(fieldName);
		//-----
		return mappedFields.containsKey(fieldName);
	}

	/**
	 * @return Collection des champs.
	 */
	public List<DataField> getFields() {
		return Collections.unmodifiableList(fields);
	}

	/**
	 * @return Champ identifiant l'identifiant
	 */
	public Optional<DataField> getIdField() {
		return idFieldOpt;
	}

	/**
	 * Gestion de la persistance.
	 * @return Si la définition est persistée.
	 */
	public boolean isPersistent() {
		return stereotype.isPersistent();
	}

	/**
	 * @return Champ représentant l'affichage
	 */
	public Optional<DataField> getDisplayField() {
		return displayFieldOpt;
	}

	/**
	 * @return Champ représentant le tri
	 */
	public Optional<DataField> getSortField() {
		return sortFieldOpt;
	}

	/**
	 * @return Champ représentant le handle
	 */
	public Optional<DataField> getHandleField() {
		return handleFieldOpt;
	}

	/**
	 * @return Champ représentant le champ servant de clé pour différencier localement les éléments d'une collection
	 */
	public Optional<DataField> getKeyField() {
		return keyFieldOpt;
	}

	/**
	 * @return the dataSpace
	 */
	public String getDataSpace() {
		return dataSpace;
	}
}
