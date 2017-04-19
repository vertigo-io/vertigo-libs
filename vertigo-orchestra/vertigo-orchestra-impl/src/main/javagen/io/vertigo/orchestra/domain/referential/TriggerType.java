package io.vertigo.orchestra.domain.referential;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données TriggerType
 */
@io.vertigo.dynamo.domain.stereotype.DataSpace("orchestra")
public final class TriggerType implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private String trtCd;
	private String label;

	/** {@inheritDoc} */
	@Override
	public URI<TriggerType> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Code'.
	 * @return String trtCd <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_CODE_IDENTIFIANT", type = "ID", required = true, label = "Code")
	public String getTrtCd() {
		return trtCd;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Code'.
	 * @param trtCd String <b>Obligatoire</b>
	 */
	public void setTrtCd(final String trtCd) {
		this.trtCd = trtCd;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Libellé'.
	 * @return String label
	 */
	@Field(domain = "DO_O_LIBELLE", label = "Libellé")
	public String getLabel() {
		return label;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Libellé'.
	 * @param label String
	 */
	public void setLabel(final String label) {
		this.label = label;
	}

	// Association : Process non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
