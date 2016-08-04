package io.vertigo.x.workflow.domain.model;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données WfMultiplicityDefinition
 */
public final class WfMultiplicityDefinition implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String wfmdCode;
	private String label;

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Multiplicity code'.
	 * @return String wfmdCode <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_CODE", type = "ID", required = true, label = "Multiplicity code")
	public String getWfmdCode() {
		return wfmdCode;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Multiplicity code'.
	 * @param wfmdCode String <b>Obligatoire</b>
	 */
	public void setWfmdCode(final String wfmdCode) {
		this.wfmdCode = wfmdCode;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Label'.
	 * @return String label
	 */
	@Field(domain = "DO_X_WORKFLOW_LABEL", label = "Label")
	public String getLabel() {
		return label;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Label'.
	 * @param label String
	 */
	public void setLabel(final String label) {
		this.label = label;
	}

	// Association : WfActivityDefinition non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
