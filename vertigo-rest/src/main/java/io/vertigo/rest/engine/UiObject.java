package io.vertigo.rest.engine;

import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.kernel.lang.Assertion;
import io.vertigo.kernel.metamodel.DefinitionReference;
import io.vertigo.kernel.util.StringUtil;
import io.vertigo.rest.validation.DtObjectErrors;
import io.vertigo.rest.validation.DtObjectValidator;
import io.vertigo.rest.validation.UiMessageStack;

import java.io.Serializable;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * UiObject is used as an Input buffer from client.
 * It managed to : 
 * - merge a serverSideObject and an inputBufferObject
 * - check validators
 * - return merged Object
 * 
 * @author pchretien, npiedeloup
 * @param <D> Type de DtObject représenté par cet Input
 */
public final class UiObject<D extends DtObject> implements Serializable {

	private static final long serialVersionUID = -4639050257543017072L;

	/**
	 * Index de transformation des propriétés CamelCase en champs du Dt en const
	 */
	private final Map<String, String> camel2ConstIndex = new HashMap<>();
	private final Map<String, String> const2CamelIndex = new HashMap<>();

	/** Référence vers la Définition. */
	private final DefinitionReference<DtDefinition> dtDefinitionRef;

	private String inputKey;
	private D inputDto;
	private Set<String> modifiedFields; //modified fieldNames in camelCase

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
	public UiObject(D inputDto, Set<String> modifiedFields) {
		Assertion.checkNotNull(inputDto, "inputObject can't be null");
		Assertion.checkNotNull(modifiedFields, "modifiedFields can't be null");
		Assertion.checkArgument(!modifiedFields.isEmpty(), "modifiedFields can't be empty");
		//-------------------------------------------------------------------------------
		this.inputDto = inputDto;
		this.modifiedFields = Collections.unmodifiableSet(new LinkedHashSet<>(modifiedFields));
		
		this.dtDefinitionRef = new DefinitionReference<>(DtObjectUtil.findDtDefinition(inputDto));
		for (final DtField dtField : getDtDefinition().getFields()) {
			camel2ConstIndex.put(StringUtil.constToCamelCase(dtField.getName(), false), dtField.getName());
			const2CamelIndex.put(dtField.getName(), StringUtil.constToCamelCase(dtField.getName(), false));
		}
	}

	// ==========================================================================

	/**
	 * @return Server Side Token , null if none
	 */
	public final String getServerSideToken() {
		return serverSideToken;
	}

	/**
	 * @param serverSideToken Server Side Token
	 */
	public final void setServerSideToken(final String serverSideToken) {
		this.serverSideToken = serverSideToken;
	}

	/**
	 * @param serverSideDto Object keep server side
	 */
	public final void setServerSideObject(final D serverSideDto) {
		Assertion.checkNotNull(serverSideDto, "ServerSideObject can't be null");
		//-------------------------------------------------------------------------------
		this.serverSideDto = serverSideDto;
	}

	/**
	 * @param inputKey Object reference keep in this request context (for error handling)
	 */
	public final void setInputKey(final String inputKey) {
		this.inputKey = inputKey;
	}

	/**
	 * @return Object reference keep in this request context (for error handling)
	 */
	public final String getInputKey() {
		return inputKey;
	}

	/**
	 * @return DtDefinition de l'objet métier
	 */
	public final DtDefinition getDtDefinition() {
		return dtDefinitionRef.get();
	}

	private DtObjectErrors getDtObjectErrors() {
		if (dtObjectErrors == null) {
			dtObjectErrors = new DtObjectErrors();
		}
		return dtObjectErrors;
	}

	// ==========================================================================

	private void mergeInput() {
		Assertion.checkNotNull(serverSideDto, "serverSideDto is mandatory");
		Assertion.checkNotNull(inputDto, "inputDto is mandatory");
		Assertion.checkNotNull(modifiedFields, "modifiedFields is mandatory");
		//---------------------------------------------------------------------
		for (final DtField dtField : getDtDefinition().getFields()) {
			if (!isModified(dtField)) {
				dtField.getDataAccessor().setValue(inputDto, dtField.getDataAccessor().getValue(serverSideDto));
			}
		}
	}

	/**
	 * Merge et Valide l'objet d'IHM et place les erreurs rencontrées dans la stack.
	 * @param dtObjectValidators Validateurs à utiliser, peut-être spécifique à l'objet.
	 * @param uiMessageStack Pile des messages qui sera mise à jour
	 * @return Objet métier mis à jour
	 */
	public D mergeAndCheckInput(final List<DtObjectValidator<D>> dtObjectValidators, final UiMessageStack uiMessageStack) {
		Assertion.checkNotNull(dtObjectValidators);
		//---------------------------------------------------------------------
		//we update inputBuffer with older datas
		if (serverSideDto != null) { //If serverSideObject was kept, we merge input with server object
			mergeInput();
		}
		//we remove older errors
		getDtObjectErrors().clearErrors();
		//we check validator
		for (final DtObjectValidator<D> dtObjectValidator : dtObjectValidators) {
			dtObjectValidator.validate(inputDto, modifiedFields, getDtObjectErrors());
		}

		if (serverSideDto != null) { //If serverSideObject was kept, we compact modified fieldSet
			compactModifiedSet();
		}
		getDtObjectErrors().flushIntoMessageStack(inputKey, uiMessageStack);

		return inputDto;
	}

	/**
	 * Mise à jour des données typées.
	 * Verifie si la valeur correspond à une modification.
	 * Si oui, la valeur est gardée, sinon la saisie de l'utilisateur est vidée. 
	 */
	private void compactModifiedSet() {
		Assertion.checkNotNull(serverSideDto, "serverSideDto is mandatory");
		Assertion.checkNotNull(inputDto, "inputDto is mandatory");
		Assertion.checkNotNull(modifiedFields, "modifiedFields is mandatory");
		//---------------------------------------------------------------------
		final Set<String> updatedModifiedFields = new HashSet<>(modifiedFields);
		for (final String camelField : modifiedFields) {
			//Si le champs n'a pas d'erreur
			//On regarde pour vider le buffer
			if (!dtObjectErrors.hasError(camelField)) {
				// ======================================================================
				// ======================Mise à jour différentielle du BUFFER============
				// ======================================================================
				final DtField dtField = getDtField(camelField);
				final DataType dataType = dtField.getDomain().getDataType();
				// égalité entre la valeur d'origine et la valeur saisie.
				if (dataType.equals(dtField.getDataAccessor().getValue(serverSideDto), dtField.getDataAccessor().getValue(inputDto))) {
					// Si la valeur saisie est identique à la valeur d'origine
					// alors on purge le buffer de saisie.
					updatedModifiedFields.remove(camelField);
				}
			}
		}
		modifiedFields = Collections.unmodifiableSet(new LinkedHashSet<>(updatedModifiedFields));
	}

	private DtField getDtField(final String camelField) {
		return getDtDefinition().getField(camel2ConstIndex.get(camelField));
	}

	/**
	 * @param fieldName Champs
	 * @return Si le champs à été modifié dans le UiObject
	 */
	public boolean isModified(final String fieldName) {
		Assertion.checkArgNotEmpty(fieldName);
		//---------------------------------------------------------------------
		return modifiedFields.contains(fieldName);
	}
	
	/**
	 * @return All modified fieldNames (camel)
	 */
	public Set<String> getModifiedFields() {
		return modifiedFields;
	}

	private boolean isModified(final DtField dtField) {
		Assertion.checkNotNull(dtField);
		//---------------------------------------------------------------------
		return modifiedFields.contains(const2CamelIndex.get(dtField.getName()));
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return "uiObject(modified:" + modifiedFields + " over dto:" + serverSideDto.toString() + ")";
	}

}
