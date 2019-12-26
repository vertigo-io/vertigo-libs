package io.vertigo.orchestra.monitoring.domain.uiexecutions;

import io.vertigo.core.lang.Generated;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
public final class OActivityExecutionUi implements DtObject {
	private static final long serialVersionUID = 1L;

	private Long aceId;
	private String label;
	private java.time.Instant beginTime;
	private java.time.Instant endTime;
	private Integer executionTime;
	private String status;
	private String workspaceIn;
	private String workspaceOut;
	private Boolean hasAttachment;
	private Boolean hasTechnicalLog;
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Id de l'activité'.
	 * @return Long aceId <b>Obligatoire</b>
	 */
	@Field(domain = "DoOIdentifiant", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Id de l'activité")
	public Long getAceId() {
		return aceId;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Id de l'activité'.
	 * @param aceId Long <b>Obligatoire</b>
	 */
	public void setAceId(final Long aceId) {
		this.aceId = aceId;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Libellé'.
	 * @return String label
	 */
	@Field(domain = "DoOLibelle", cardinality = io.vertigo.core.lang.Cardinality.OPTIONAL_OR_NULLABLE, label = "Libellé")
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
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Démarrage'.
	 * @return Instant beginTime <b>Obligatoire</b>
	 */
	@Field(domain = "DoOTimestamp", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Démarrage")
	public java.time.Instant getBeginTime() {
		return beginTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Démarrage'.
	 * @param beginTime Instant <b>Obligatoire</b>
	 */
	public void setBeginTime(final java.time.Instant beginTime) {
		this.beginTime = beginTime;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Fin'.
	 * @return Instant endTime <b>Obligatoire</b>
	 */
	@Field(domain = "DoOTimestamp", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Fin")
	public java.time.Instant getEndTime() {
		return endTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Fin'.
	 * @param endTime Instant <b>Obligatoire</b>
	 */
	public void setEndTime(final java.time.Instant endTime) {
		this.endTime = endTime;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Durée'.
	 * @return Integer executionTime
	 */
	@Field(domain = "DoONombre", cardinality = io.vertigo.core.lang.Cardinality.OPTIONAL_OR_NULLABLE, label = "Durée")
	public Integer getExecutionTime() {
		return executionTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Durée'.
	 * @param executionTime Integer
	 */
	public void setExecutionTime(final Integer executionTime) {
		this.executionTime = executionTime;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Statut'.
	 * @return String status
	 */
	@Field(domain = "DoOCodeIdentifiant", cardinality = io.vertigo.core.lang.Cardinality.OPTIONAL_OR_NULLABLE, label = "Statut")
	public String getStatus() {
		return status;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Statut'.
	 * @param status String
	 */
	public void setStatus(final String status) {
		this.status = status;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Paramètres entrants'.
	 * @return String workspaceIn
	 */
	@Field(domain = "DoOJsonText", cardinality = io.vertigo.core.lang.Cardinality.OPTIONAL_OR_NULLABLE, label = "Paramètres entrants")
	public String getWorkspaceIn() {
		return workspaceIn;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Paramètres entrants'.
	 * @param workspaceIn String
	 */
	public void setWorkspaceIn(final String workspaceIn) {
		this.workspaceIn = workspaceIn;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Paramètres sortants'.
	 * @return String workspaceOut
	 */
	@Field(domain = "DoOJsonText", cardinality = io.vertigo.core.lang.Cardinality.OPTIONAL_OR_NULLABLE, label = "Paramètres sortants")
	public String getWorkspaceOut() {
		return workspaceOut;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Paramètres sortants'.
	 * @param workspaceOut String
	 */
	public void setWorkspaceOut(final String workspaceOut) {
		this.workspaceOut = workspaceOut;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Fichier de log'.
	 * @return Boolean hasAttachment
	 */
	@Field(domain = "DoOBooleen", cardinality = io.vertigo.core.lang.Cardinality.OPTIONAL_OR_NULLABLE, label = "Fichier de log")
	public Boolean getHasAttachment() {
		return hasAttachment;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Fichier de log'.
	 * @param hasAttachment Boolean
	 */
	public void setHasAttachment(final Boolean hasAttachment) {
		this.hasAttachment = hasAttachment;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Log technique'.
	 * @return Boolean hasTechnicalLog
	 */
	@Field(domain = "DoOBooleen", cardinality = io.vertigo.core.lang.Cardinality.OPTIONAL_OR_NULLABLE, label = "Log technique")
	public Boolean getHasTechnicalLog() {
		return hasTechnicalLog;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Log technique'.
	 * @param hasTechnicalLog Boolean
	 */
	public void setHasTechnicalLog(final Boolean hasTechnicalLog) {
		this.hasTechnicalLog = hasTechnicalLog;
	}
	
	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
