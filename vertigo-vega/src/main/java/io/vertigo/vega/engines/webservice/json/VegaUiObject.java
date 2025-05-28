/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.vega.engines.webservice.json;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.definition.DefinitionId;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.smarttype.definitions.FormatterException;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.vega.webservice.validation.DtObjectErrors;
import io.vertigo.vega.webservice.validation.DtObjectValidator;
import io.vertigo.vega.webservice.validation.UiMessageStack;

/**
 * UiObject is used as an Input buffer from client.
 * It managed to :
 * - merge a serverSideObject and an inputBufferObject
 * - check validators
 * - return merged Object
 *
 * @author pchretien, npiedeloup
 * @param <D> DtObject type
 */
public class VegaUiObject<D extends DataObject> implements io.vertigo.vega.webservice.model.UiObject<D> {
	private static final long serialVersionUID = -4639050257543017072L;

	/** Référence vers la définition. */
	private final DefinitionId<DataDefinition> dataDefinitionId;
	protected final Set<String> fieldIndex;

	private String inputKey;
	private D inputDto;
	private final Map<String, String[]> inputBuffer = new LinkedHashMap<>();

	private transient boolean isChecked; //init a false

	/**
	 * DtObject dont on gère le buffer d'input.
	 */
	private D serverSideDto;
	private String serverSideToken;

	private transient DtObjectErrors dtObjectErrors;

	// =========================================================================
	// ========================CONSTRUCTEUR=====================================
	// ==========================================================================
	/**
	 * Constructor.
	 * @param inputDto partial object translated from input
	 * @param modifiedFields modified fieldNames
	 */
	public VegaUiObject(final D inputDto, final Set<String> modifiedFields) {
		Assertion.check()
				.isNotNull(inputDto, "inputObject can't be null")
				.isNotNull(modifiedFields, "modifiedFields can't be null");
		//-----
		this.inputDto = inputDto;
		this.dataDefinitionId = DataModelUtil.findDataDefinition(inputDto).id();
		fieldIndex = Collections.unmodifiableSet(getDtDefinition().getFields().stream()
				.map(DataField::name)
				.collect(Collectors.toSet()));

		for (final String field : modifiedFields) {
			setTypedValue(field, (Serializable) getDataField(field).getDataAccessor().getValue(inputDto));
		}

	}

	// ==========================================================================

	/**
	 * @return Server Side Token , null if none
	 */
	@Override
	public String getServerSideToken() {
		return serverSideToken;
	}

	/**
	 * @param serverSideToken Server Side Token
	 */
	@Override
	public void setServerSideToken(final String serverSideToken) {
		this.serverSideToken = serverSideToken;
	}

	/**
	 * @return Server Side Object , null if none
	 */
	@Override
	public D getServerSideObject() {
		return serverSideDto;
	}

	/**
	 * @param serverSideDto Object keep server side
	 */
	@Override
	public void setServerSideObject(final D serverSideDto) {
		Assertion.check().isNotNull(serverSideDto, "ServerSideObject can't be null");
		//-----
		this.serverSideDto = serverSideDto;
	}

	/**
	 * @param inputKey Object reference keep in this request context (for error handling)
	 */
	@Override
	public void setInputKey(final String inputKey) {
		this.inputKey = inputKey;
	}

	/**
	 * @return Object reference keep in this request context (for error handling)
	 */
	@Override
	public String getInputKey() {
		return inputKey;
	}

	/**
	 * @return DtDefinition de l'objet métier
	 */
	@Override
	public final DataDefinition getDtDefinition() {
		return dataDefinitionId.get();
	}

	private DtObjectErrors getDtObjectErrors() {
		if (dtObjectErrors == null) {
			dtObjectErrors = new DtObjectErrors();
		}
		return dtObjectErrors;
	}

	// ==========================================================================

	private void mergeInput() {
		Assertion.check()
				.isNotNull(serverSideDto, "serverSideDto is mandatory")
				.isNotNull(inputDto, "inputDto is mandatory");
		//-----
		for (final DataField dtField : getDtDefinition().getFields()) {
			if (isModified(dtField.name())) {
				dtField.getDataAccessor().setValue(serverSideDto, dtField.getDataAccessor().getValue(inputDto));
			}
		}
	}

	/**
	 * Vérifie les UiObjects de la liste et remplis la pile d'erreur.
	 * @param uiMessageStack Pile des messages qui sera mise à jour
	 * @return if the object is valid (no format errors) if it's not valid you must not call mergeAndCheckInput
	 */
	@Override
	public boolean checkFormat(final UiMessageStack uiMessageStack) {
		if (getDtObjectErrors().hasError()) {
			getDtObjectErrors().flushIntoMessageStack(inputKey, uiMessageStack);
		}
		isChecked = true;
		return !getDtObjectErrors().hasError();
	}

	/**
	 * Merge et Valide l'objet d'IHM et place les erreurs rencontrées dans la stack.
	 * @param dtObjectValidators Validateurs à utiliser, peut-être spécifique à l'objet.
	 * @param uiMessageStack Pile des messages qui sera mise Ã  jour
	 * @return Objet métier mis Ã  jour
	 */
	@Override
	public D mergeAndCheckInput(final List<DtObjectValidator<D>> dtObjectValidators, final UiMessageStack uiMessageStack) {
		Assertion.check().isNotNull(dtObjectValidators);
		//-----
		if (!isChecked) {
			checkFormat(uiMessageStack);
		}
		Assertion.check().isFalse(getDtObjectErrors().hasError(), "Unable to merge input on a object that as format errors : {0}", this);
		//we update inputBuffer with older datas
		if (serverSideDto != null) { //If serverSideObject was kept, we merge input with server object
			mergeInput();
		}
		final D objectToValidate = serverSideDto != null ? serverSideDto : inputDto;
		//we remove older errors
		getDtObjectErrors().clearErrors();
		//we check validator
		for (final DtObjectValidator<D> dtObjectValidator : dtObjectValidators) {
			dtObjectValidator.validate(objectToValidate, inputBuffer.keySet(), getDtObjectErrors());
		}

		getDtObjectErrors().flushIntoMessageStack(inputKey, uiMessageStack);
		inputBuffer.clear();
		if (serverSideDto != null) {
			inputDto = (D) DataModelUtil.createDataObject(getDtDefinition());
			return serverSideDto;
		}
		return inputDto;
	}

	protected final DataField getDataField(final String camelField) {
		return getDtDefinition().getField(camelField);
	}

	/**
	 * @param fieldName Champs
	 * @return Si le champs à été modifié dans le UiObject
	 */
	@Override
	public boolean isModified(final String fieldName) {
		Assertion.check().isNotBlank(fieldName);
		//-----
		return inputBuffer.containsKey(fieldName);
	}

	/**
	 * @return All modified fieldNames (camel)
	 */
	@Override
	public Set<String> getModifiedFields() {
		return inputBuffer.keySet();
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return "uiObject(modified:" +
				inputBuffer.keySet() +
				" over dto:" +
				serverSideDto +
				")";
	}

	/** {@inheritDoc} */
	@Override
	public String getSingleInputValue(final String fieldName) {
		final String[] inputValues = getInputValue(fieldName);
		return inputValues != null ? inputValues[0] : null;
	}

	/** {@inheritDoc} */
	@Override
	public String[] getInputValue(final String fieldName) {
		Assertion.check()
				.isNotBlank(fieldName)
				.isTrue(Character.isLowerCase(fieldName.charAt(0)) && !fieldName.contains("_"), "Le nom du champs doit-être en camelCase ({0}).", fieldName);
		//-----
		if (hasFormatError(fieldName)) {
			return inputBuffer.get(fieldName);
		}
		final Object value = doGetTypedValue(fieldName);
		final DataField dtField = getDataField(fieldName);
		final SmartTypeDefinition smartType = dtField.smartTypeDefinition();
		final List<String> inputValues = new ArrayList<>();

		final SmartTypeManager smartTypeManager = Node.getNode().getComponentSpace().resolve(SmartTypeManager.class);
		if (dtField.smartTypeDefinition().getScope().isBasicType()) {
			if (!dtField.cardinality().hasMany()) {
				inputValues.add(smartTypeManager.valueToString(smartType, value));// encodeValue
				return inputValues.isEmpty() ? null : inputValues.toArray(String[]::new);
			}
			if (value != null) {
				((List) value).forEach(val -> inputValues.add(smartTypeManager.valueToString(smartType, val)));
			}
			return inputValues.toArray(String[]::new);

		}
		final BasicTypeAdapter basicTypeAdapter = smartTypeManager.getTypeAdapters("ui").get(smartType.getJavaClass());
		if (basicTypeAdapter != null) {
			if (!dtField.cardinality().hasMany()) {
				final Object basicValue = basicTypeAdapter.toBasic(value);
				if (basicValue != null) { //adapter return null, if value was null
					inputValues.add(basicValue.toString());
				}
				return inputValues.isEmpty() ? null : inputValues.toArray(String[]::new);
			}
			if (value != null) {
				((List) value).forEach(val -> {
					final Object basicValue = basicTypeAdapter.toBasic(val);
					if (basicValue != null) { //adapter return null, if value was null
						inputValues.add(basicValue.toString());
					}
				});
			}
			return inputValues.toArray(String[]::new);
		}
		return null;
	}

	/** {@inheritDoc} */
	@Override
	public void setInputValue(final String fieldName, final String... stringValue) {
		Assertion.check()
				.isNotBlank(fieldName)
				.isNotNull(stringValue, "formatted value can't be null, but may be empty : {0}", fieldName);
		final SmartTypeManager smartTypeManager = Node.getNode().getComponentSpace().resolve(SmartTypeManager.class);
		//-----
		final DataField dtField = getDataField(fieldName);
		//---
		isChecked = false;
		getDtObjectErrors().clearErrors(dtField.name());
		final List<String> formattedValue = new ArrayList<>();
		final SmartTypeDefinition smartTypeDefinition = dtField.smartTypeDefinition();
		final Serializable typedValue;
		if (smartTypeDefinition.getScope().isBasicType()) {
			if (!dtField.cardinality().hasMany()) {
				Assertion.check().isTrue(stringValue.length <= 1, "Can't support multiple input values");
				//------
				final Tuple<String, Serializable> tuple = tryFormat(smartTypeManager, dtField, stringValue[0]);
				formattedValue.add(tuple.val1());
				typedValue = tuple.val2();
			} else {
				final ArrayList list = new ArrayList<>();
				Stream.of(stringValue)
						.map(val -> tryFormat(smartTypeManager, dtField, val))
						.forEach(tuple -> {
							formattedValue.add(tuple.val1());
							list.add(tuple.val2());
						});
				typedValue = list;
			}
		} else {
			final BasicTypeAdapter basicTypeAdapter = smartTypeManager.getTypeAdapters("ui").get(smartTypeDefinition.getJavaClass());
			if (!dtField.cardinality().hasMany()) {
				Assertion.check().isTrue(stringValue.length <= 1, "Can't support multiple input values");
				//------
				final Tuple<String, Serializable> tuple = tryFormatWithAdapter(basicTypeAdapter, dtField, stringValue[0]);
				formattedValue.add(tuple.val1());
				typedValue = tuple.val2();
			} else {
				final ArrayList list = new ArrayList<>();
				Stream.of(stringValue)
						.map(val -> tryFormatWithAdapter(basicTypeAdapter, dtField, val))
						.forEach(tuple -> {
							formattedValue.add(tuple.val1());
							list.add(tuple.val2());
						});
				typedValue = list;
			}
		}
		doSetTypedValue(dtField, typedValue);

		inputBuffer.put(fieldName, formattedValue.toArray(String[]::new));

	}

	private Tuple<String, Serializable> tryFormat(final SmartTypeManager smartTypeManager, final DataField dtField, final String inputValue) {
		String formattedValue;
		Serializable typedValue = null;
		try {
			typedValue = (Serializable) smartTypeManager.stringToValue(dtField.smartTypeDefinition(), inputValue);// we should use an encoder instead
			// succesful encoding we can format and put in the inputbuffer
			formattedValue = smartTypeManager.valueToString(dtField.smartTypeDefinition(), typedValue);
		} catch (final FormatterException e) { //We don't log nor rethrow this exception // it should be an encoding exception
			/** Erreur de typage.	 */
			//encoding error
			getDtObjectErrors().addError(dtField.name(), e.getMessageText());
			formattedValue = inputValue;
		}
		return Tuple.of(formattedValue, typedValue);
	}

	private Tuple<String, Serializable> tryFormatWithAdapter(final BasicTypeAdapter basicTypeAdapter, final DataField dtField, final String inputValue) {
		String formattedValue;
		Serializable typedValue = null;
		try {
			typedValue = (Serializable) basicTypeAdapter.toJava(inputValue, dtField.smartTypeDefinition().getJavaClass());
			// succesful encoding we can format and put in the inputbuffer
			formattedValue = inputValue;
		} catch (final Exception e) { //We don't log nor rethrow this exception // it should be an encoding exception
			/** Erreur de typage.	 */
			//encoding error
			getDtObjectErrors().addError(dtField.name(), LocaleMessageText.of(e.getMessage()));
			formattedValue = inputValue;
		}
		return Tuple.of(formattedValue, typedValue);
	}

	/**
	 * @param dtField Champs
	 * @return Valeur typée du champs
	 * @throws IllegalAccessError Si le champs possède une erreur de formatage
	 */
	@Override
	public <T> T getTypedValue(final String fieldName, final Class<T> type) {
		Assertion.check()
				.isNotBlank(fieldName)
				.isNotNull(type);
		//-----
		if (hasFormatError(fieldName)) {
			throw new IllegalAccessError("Le champ " + fieldName + " possède une erreur de formattage et doit être lu par son UiObject");
		}
		return type.cast(doGetTypedValue(fieldName));
	}

	@Override
	public final void setTypedValue(final String fieldName, final Serializable value) {
		final DataField dtField = getDataField(fieldName);
		isChecked = false;

		//on a trois choix :
		// 1) soit on ne fait pas de controle ici (sera fait par le check plus tard)
		// 2) soit on fait un check et on remplit la stack d'erreur
		// 3) soit on check et on lance une Runtime si erreur (comme dans DtObject)
		//100924 NPI : choix retenu 1
		doSetTypedValue(dtField, value);
		inputBuffer.put(fieldName, getInputValue(fieldName));
	}

	/**
	 * Récupération des données formatées.
	 *
	 * @param dtField Champ
	 * @return Valeur formatée (typée)
	 */
	private Object doGetTypedValue(final String fieldName) {
		Assertion.check().isNotBlank(fieldName);
		//
		final DataField dtField = getDataField(fieldName);
		if (isModified(fieldName)) {
			//Si le tableaux des valeurs formatées n'a pas été créé la valeur est null.
			return dtField.getDataAccessor().getValue(inputDto);
		}
		return dtField.getDataAccessor().getValue(serverSideDto != null ? serverSideDto : inputDto);
	}

	/**
	 * @return Si des champs ont été modifiés dans le UiObject
	 */
	@Override
	public boolean isModified() {
		return !inputBuffer.isEmpty();
	}

	/**
	 * @param dtField Champs
	 * @return Si le champs a une erreur de formatage
	 */
	protected boolean hasFormatError(final String fieldName) {
		Assertion.check().isNotBlank(fieldName);
		//-----
		return isModified(fieldName) && getDtObjectErrors().hasError(fieldName);
	}

	private void doSetTypedValue(final DataField dtField, final Serializable typedValue) {
		dtField.getDataAccessor().setValue(inputDto, typedValue);
	}

	@Override
	public Integer getInteger(final String fieldName) {
		return getTypedValue(fieldName, Integer.class);
	}

	@Override
	public Long getLong(final String fieldName) {
		return getTypedValue(fieldName, Long.class);
	}

	@Override
	public String getString(final String fieldName) {
		return getTypedValue(fieldName, String.class);
	}

	@Override
	public Boolean getBoolean(final String fieldName) {
		return getTypedValue(fieldName, Boolean.class);
	}

	@Override
	public LocalDate getLocalDate(final String fieldName) {
		return getTypedValue(fieldName, LocalDate.class);
	}

	@Override
	public Instant getInstant(final String fieldName) {
		return getTypedValue(fieldName, Instant.class);
	}

	@Override
	public Double getDouble(final String fieldName) {
		return getTypedValue(fieldName, Double.class);
	}

	@Override
	public BigDecimal getBigDecimal(final String fieldName) {
		return getTypedValue(fieldName, BigDecimal.class);
	}

}
