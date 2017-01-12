package io.vertigo.x.workflow.domain.common;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données WorkflowDummyBoolean
 */
public final class WorkflowDummyBoolean implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Boolean dummyBoolean;

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'dummy boolean'.
	 * @return Boolean dummyBoolean
	 */
	@Field(domain = "DO_BOOLEEN", label = "dummy boolean")
	public Boolean getDummyBoolean() {
		return dummyBoolean;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'dummy boolean'.
	 * @param dummyBoolean Boolean
	 */
	public void setDummyBoolean(final Boolean dummyBoolean) {
		this.dummyBoolean = dummyBoolean;
	}

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
