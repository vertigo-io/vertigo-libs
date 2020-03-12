package io.vertigo.studio.domain.stereotype;

import io.vertigo.core.lang.Generated;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datastore.impl.entitystore.StoreVAccessor;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
public final class Attachment implements Entity {
	private static final long serialVersionUID = 1L;

	private Long attId;
	private String url;

	@io.vertigo.datamodel.structure.stereotype.Association(
			name = "ACmdAtt",
			fkFieldName = "cmdId",
			primaryDtDefinitionName = "DtCommand",
			primaryIsNavigable = true,
			primaryRole = "Command",
			primaryLabel = "Command",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DtAttachment",
			foreignIsNavigable = true,
			foreignRole = "Attachment",
			foreignLabel = "Attachment",
			foreignMultiplicity = "0..*")
	private final StoreVAccessor<io.vertigo.studio.domain.stereotype.Command> cmdIdAccessor = new StoreVAccessor<>(io.vertigo.studio.domain.stereotype.Command.class, "Command");

	/** {@inheritDoc} */
	@Override
	public UID<Attachment> getUID() {
		return UID.of(this);
	}
	
	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'id'.
	 * @return Long attId <b>Obligatoire</b>
	 */
	@Field(smartType = "STyId", type = "ID", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "id")
	public Long getAttId() {
		return attId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'id'.
	 * @param attId Long <b>Obligatoire</b>
	 */
	public void setAttId(final Long attId) {
		this.attId = attId;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Url'.
	 * @return String url <b>Obligatoire</b>
	 */
	@Field(smartType = "STyKeyword", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Url")
	public String getUrl() {
		return url;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Url'.
	 * @param url String <b>Obligatoire</b>
	 */
	public void setUrl(final String url) {
		this.url = url;
	}
	
	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Command'.
	 * @return Long cmdId
	 */
	@io.vertigo.datamodel.structure.stereotype.ForeignKey(smartType = "STyId", label = "Command", fkDefinition = "DtCommand" )
	public Long getCmdId() {
		return (Long) cmdIdAccessor.getId();
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Command'.
	 * @param cmdId Long
	 */
	public void setCmdId(final Long cmdId) {
		cmdIdAccessor.setId(cmdId);
	}

 	/**
	 * Association : Command.
	 * @return l'accesseur vers la propriété 'Command'
	 */
	public StoreVAccessor<io.vertigo.studio.domain.stereotype.Command> command() {
		return cmdIdAccessor;
	}
	
	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}