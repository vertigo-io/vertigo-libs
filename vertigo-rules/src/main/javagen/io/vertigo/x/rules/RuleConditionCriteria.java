package io.vertigo.x.rules;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données RuleConditionCriteria
 */
public final class RuleConditionCriteria implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String field;
	private String value;

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Field'.
	 * @return String field
	 */
	@Field(domain = "DO_X_RULES_FIELD", label = "Field")
	public String getField() {
		return field;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Field'.
	 * @param field String
	 */
	public void setField(final String field) {
		this.field = field;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Value'.
	 * @return String value
	 */
	@Field(domain = "DO_X_RULES_EXPRESSION", label = "Value")
	public String getValue() {
		return value;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Value'.
	 * @param value String
	 */
	public void setValue(final String value) {
		this.value = value;
	}

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
