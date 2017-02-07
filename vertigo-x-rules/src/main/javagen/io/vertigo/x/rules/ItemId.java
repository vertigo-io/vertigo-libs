package io.vertigo.x.rules;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données ItemId
 */
public final class ItemId implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long itemId;

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'itemId'.
	 * @return Long itemId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_RULES_WEAK_ID", required = true, label = "itemId")
	public Long getItemId() {
		return itemId;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'itemId'.
	 * @param itemId Long <b>Obligatoire</b>
	 */
	public void setItemId(final Long itemId) {
		this.itemId = itemId;
	}

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
