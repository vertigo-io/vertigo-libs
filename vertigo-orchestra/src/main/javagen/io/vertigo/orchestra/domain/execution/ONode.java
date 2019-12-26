package io.vertigo.orchestra.domain.execution;

import io.vertigo.core.lang.Generated;
import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.UID;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
@io.vertigo.dynamo.domain.stereotype.DataSpace("orchestra")
public final class ONode implements Entity {
	private static final long serialVersionUID = 1L;

	private Long nodId;
	private String name;
	private java.time.Instant heartbeat;

	/** {@inheritDoc} */
	@Override
	public UID<ONode> getUID() {
		return UID.of(this);
	}
	
	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id du noeud'.
	 * @return Long nodId <b>Obligatoire</b>
	 */
	@Field(domain = "DoOIdentifiant", type = "ID", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Id du noeud")
	public Long getNodId() {
		return nodId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id du noeud'.
	 * @param nodId Long <b>Obligatoire</b>
	 */
	public void setNodId(final Long nodId) {
		this.nodId = nodId;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Nom du noeud'.
	 * @return String name <b>Obligatoire</b>
	 */
	@Field(domain = "DoOLibelle", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Nom du noeud")
	public String getName() {
		return name;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nom du noeud'.
	 * @param name String <b>Obligatoire</b>
	 */
	public void setName(final String name) {
		this.name = name;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Date de dernière activité'.
	 * @return Instant heartbeat
	 */
	@Field(domain = "DoOTimestamp", cardinality = io.vertigo.core.lang.Cardinality.OPTIONAL_OR_NULLABLE, label = "Date de dernière activité")
	public java.time.Instant getHeartbeat() {
		return heartbeat;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Date de dernière activité'.
	 * @param heartbeat Instant
	 */
	public void setHeartbeat(final java.time.Instant heartbeat) {
		this.heartbeat = heartbeat;
	}
	
	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
