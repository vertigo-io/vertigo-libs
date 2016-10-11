package io.vertigo.x.workflow.domain.instance;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données WfStatus
 */
public final class WfStatus implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String wfsCode;
	private String label;

	/** {@inheritDoc} */
	@Override
	public URI<WfStatus> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Code Status'.
	 * @return String wfsCode <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_CODE", type = "ID", required = true, label = "Code Status")
	public String getWfsCode() {
		return wfsCode;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Code Status'.
	 * @param wfsCode String <b>Obligatoire</b>
	 */
	public void setWfsCode(final String wfsCode) {
		this.wfsCode = wfsCode;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'label'.
	 * @return String label
	 */
	@Field(domain = "DO_X_WORKFLOW_LABEL", label = "label")
	public String getLabel() {
		return label;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'label'.
	 * @param label String
	 */
	public void setLabel(final String label) {
		this.label = label;
	}

	// Association : WfWorkflow non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
