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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Builder;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.locale.LocaleMessageKey;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.node.definition.DefinitionId;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;

/**
 * This class must be used to build a DtDefinition.
 *
 * Each dtDefinition must have a name following this pattern DT_XXX_YYYY
 *
 * @author pchretien
 */
public final class DataDefinitionBuilder implements Builder<DataDefinition> {

	private static class MessageKeyImpl implements LocaleMessageKey {
		private static final long serialVersionUID = 6959551752755175151L;

		private final String name;

		MessageKeyImpl(final String name) {
			this.name = name;
		}

		/** {@inheritDoc} */
		@Override
		public String name() {
			return name;
		}
	}

	private DataDefinition dataDefinition;
	private final String myName;
	private DefinitionId<DataDefinition> myFragmentId;
	private String myPackageName;
	private DataStereotype myStereotype;
	private DataField myIdField;
	private final List<DataField> myFields = new ArrayList<>();
	private String myDataSpace;
	private String mySortFieldName;
	private String myDisplayFieldName;
	private String myHandleFieldName;
	private String myKeyFieldName;

	/**
	 * Constructor.
	 * @param name the name of the dtDefinition
	 */
	DataDefinitionBuilder(final String name) {
		Assertion.check().isNotBlank(name);
		//-----
		myName = name;
	}

	/**
	 * Sets packageName
	 * @param packageName the name of the package (nullable)
	 * @return this builder
	 */
	public DataDefinitionBuilder withPackageName(final String packageName) {
		//the packageName can be null
		//-----
		myPackageName = packageName;
		return this;
	}

	/**
	 * Sets fragment
	 * @param fragment Persistent root DtDefinition for this fragment
	 * @return this builder
	 */
	public DataDefinitionBuilder withFragment(final DataDefinition fragment) {
		Assertion.check().isNotNull(fragment);
		//---
		myStereotype = DataStereotype.Fragment;
		myFragmentId = fragment.id();
		return this;
	}

	/**
	 * Sets the stereotype of the dtDefinition.
	 *
	 * @param stereotype the stereotype of the dtDefinition
	 * @return this builder
	 */
	public DataDefinitionBuilder withStereoType(final DataStereotype stereotype) {
		Assertion.check().isNotNull(stereotype);
		//-----
		myStereotype = stereotype;
		return this;
	}

	/**
	 * Adds a field linked to another dtDefinition (aka foreign key).
	 *
	 * @param fieldName the name of the field
	 * @param fkDtDefinitionName the name of the linked definition
	 * @param label the label of the field
	 * @param smartType the smartType of the field
	 * @param cardinality cardinality of the field see {@code Cardinality}
	 * @param required if the field is required
	 * @return this builder
	 */
	public DataDefinitionBuilder addForeignKey(
			final String fieldName,
			final String label,
			final SmartTypeDefinition domain,
			final Cardinality cardinality,
			final String fkDtDefinitionName) {
		//Pour l'instant on ne gère pas les chamsp computed dynamiques
		final boolean persistent = true;
		final DataField dtField = createField(
				fieldName,
				DataField.FieldType.FOREIGN_KEY,
				domain,
				label,
				cardinality,
				persistent,
				fkDtDefinitionName);
		myFields.add(dtField);
		return this;
	}

	/**
	 * Adds a computed field.
	 *
	 * @param fieldName the name of the field
	 * @param label the label of the field
	 * @param smartType the smartType of the field
	 * @param cardinality cardinality of the field see {@code Cardinality}
	 * @return this builder
	 */
	public DataDefinitionBuilder addComputedField(
			final String fieldName,
			final String label,
			final SmartTypeDefinition smartType,
			final Cardinality cardinality) {
		final boolean persistent = false;
		final DataField dtField = createField(
				fieldName,
				DataField.FieldType.COMPUTED,
				smartType,
				label,
				cardinality,
				persistent,
				null);
		myFields.add(dtField);
		return this;
	}

	/**
	 * Adds a common data field.
	 *
	 * @param fieldName the name of the field
	 * @param smartType the smartType of the field
	 * @param cardinality cardinality of the field see {@code Cardinality}
	 * @param label the label of the field
	 * @param required if the field is required
	 * @param persistent if the fiels is persistent
	 * @return this builder
	 */
	public DataDefinitionBuilder addDataField(
			final String fieldName,
			final String label,
			final SmartTypeDefinition domain,
			final Cardinality cardinality,
			final boolean persistent) {
		//the field is dynamic if and only if the dtDefinition is dynamic
		final DataField dtField = createField(
				fieldName,
				DataField.FieldType.DATA,
				domain,
				label,
				cardinality,
				persistent,
				null);
		myFields.add(dtField);
		return this;
	}

	/**
	 * Adds an ID field.
	 * This field is required.
	 *
	 * @param fieldName the name of the field
	 * @param smartType the smartType of the field
	 * @param label the label of the field
	 * @return this builder
	 */
	public DataDefinitionBuilder addIdField(
			final String fieldName,
			final String label,
			final SmartTypeDefinition domain) {
		Assertion.check().isNull(myIdField, "only one ID per Entity is permitted, error on {0}", myPackageName);
		//---
		//le champ ID est tjrs required
		final Cardinality cardinality = Cardinality.ONE;
		//le champ ID est persistant SSI la définition est persitante.
		final boolean persistent = true;
		//le champ  est dynamic SSI la définition est dynamique
		final DataField dtField = createField(
				fieldName,
				DataField.FieldType.ID,
				domain,
				label,
				cardinality,
				persistent,
				null);
		myIdField = dtField;
		myFields.add(dtField);
		return this;
	}

	private DataField createField(
			final String fieldName,
			final DataField.FieldType type,
			final SmartTypeDefinition domain,
			final String strLabel,
			final Cardinality cardinality,
			final boolean persistent,
			final String fkDtDefinitionName) {

		final String shortName = myName.substring(DataDefinition.PREFIX.length());
		//-----
		// Le DataField vérifie ses propres règles et gère ses propres optimisations
		final String id = DataField.PREFIX + shortName + '$' + fieldName;

		//2. Sinon Indication de longueur portée par le champ du DT.
		//-----
		final LocaleMessageText labelMsg = LocaleMessageText.ofDefaultMsg(strLabel, new MessageKeyImpl(id));
		// Champ CODE_COMMUNE >> getCodeCommune()
		//Un champ est persisanty s'il est marqué comme tel et si la définition l'est aussi.
		return new DataField(
				id,
				fieldName,
				type,
				domain,
				labelMsg,
				cardinality,
				persistent,
				fkDtDefinitionName);
	}

	/**
	 * Sets the dataSpace to which the dtDefinition belongs.
	 * @param dataSpace the dataSpace to which the DtDefinition is mapped.
	 * @return this builder
	 */
	public DataDefinitionBuilder withDataSpace(final String dataSpace) {
		//the dataSpace can be null, in this case the default dataSpace will be chosen.
		//-----
		myDataSpace = dataSpace;
		return this;
	}

	/**
	 * Specifies which field to be used for sorting
	 * @param sortFieldName fieldName to use
	 * @return this builder
	 */
	public DataDefinitionBuilder withSortField(final String sortFieldName) {
		mySortFieldName = sortFieldName;
		return this;
	}

	/**
	 * Specifies which field to be used for display
	 * @param displayFieldName fieldName to use
	 * @return this builder
	 */
	public DataDefinitionBuilder withDisplayField(final String displayFieldName) {
		myDisplayFieldName = displayFieldName;
		return this;
	}

	/**
	 * Specifies which field to be used for handle
	 * @param handleFieldName fieldName to use
	 * @return this builder
	 */
	public DataDefinitionBuilder withHandleField(final String handleFieldName) {
		myHandleFieldName = handleFieldName;
		return this;
	}

	/**
	 * Specifies which field to be used to distinguish elements inside a collection
	 * @param keyFieldName fieldName to use
	 * @return this builder
	 */
	public DataDefinitionBuilder withKeyField(final String keyFieldName) {
		myKeyFieldName = keyFieldName;
		return this;
	}

	/** {@inheritDoc} */
	@Override
	public DataDefinition build() {
		Assertion.check().isNull(dataDefinition, "build() already executed");
		//-----
		if (myStereotype == null) {
			myStereotype = myIdField == null ? DataStereotype.ValueObject : DataStereotype.Entity;
		}

		final DataField sortField;
		if (mySortFieldName != null) {
			sortField = findFieldByName(mySortFieldName)
					.orElseThrow(() -> new IllegalStateException(StringUtil.format("Sort field '{0}' not found on '{1}'", mySortFieldName, dataDefinition.getName())));
		} else if (myStereotype == DataStereotype.Fragment) {
			sortField = myFragmentId.get().getSortField().orElse(null);
		} else {
			sortField = null;
		}

		final DataField displayField;
		if (myDisplayFieldName != null) {
			displayField = findFieldByName(myDisplayFieldName)
					.orElseThrow(() -> new IllegalStateException(StringUtil.format("Display field '{0}' not found on '{1}'", myDisplayFieldName, dataDefinition.getName())));
		} else if (myStereotype == DataStereotype.Fragment) {
			displayField = myFragmentId.get().getDisplayField().orElse(null);
		} else {
			displayField = null;
		}

		final DataField handleField;
		if (myHandleFieldName != null) {
			handleField = findFieldByName(myHandleFieldName)
					.orElseThrow(() -> new IllegalStateException(StringUtil.format("Handle field '{0}' not found on '{1}'", myHandleFieldName, dataDefinition.getName())));
		} else if (myStereotype == DataStereotype.Fragment) {
			handleField = myFragmentId.get().getHandleField().orElse(null);
		} else {
			handleField = null;
		}

		final DataField keyField;
		if (myKeyFieldName != null) {
			keyField = findFieldByName(myKeyFieldName)
					.orElseThrow(() -> new IllegalStateException(StringUtil.format("Key field '{0}' not found on '{1}'", myKeyFieldName, dataDefinition.getName())));
		} else {
			keyField = null;
		}

		dataDefinition = new DataDefinition(
				myName,
				Optional.ofNullable(myFragmentId),
				myPackageName,
				myStereotype,
				myFields,
				myDataSpace == null ? DataDefinition.DEFAULT_DATA_SPACE : myDataSpace,
				Optional.ofNullable(sortField),
				Optional.ofNullable(displayField),
				Optional.ofNullable(handleField),
				Optional.ofNullable(keyField));
		return dataDefinition;
	}

	private Optional<DataField> findFieldByName(final String fieldName) {
		Assertion.check().isNotBlank(fieldName);
		return myFields
				.stream()
				.filter(dtField -> fieldName.equals(dtField.name()))
				.findFirst();
	}

}
