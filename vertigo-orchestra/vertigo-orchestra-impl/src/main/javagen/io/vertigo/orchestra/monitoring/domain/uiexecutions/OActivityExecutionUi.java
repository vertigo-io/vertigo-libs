package io.vertigo.orchestra.monitoring.domain.uiexecutions;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données OActivityExecutionUi
 */
public final class OActivityExecutionUi implements DtObject {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long aceId;
	private String label;
	private java.util.Date beginTime;
	private java.util.Date endTime;
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
	@Field(domain = "DO_O_IDENTIFIANT", required = true, label = "Id de l'activité")
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

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Nom du processus'.
	 * @return java.util.Date beginTime <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_TIMESTAMP", required = true, label = "Nom du processus")
	public java.util.Date getBeginTime() {
		return beginTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nom du processus'.
	 * @param beginTime java.util.Date <b>Obligatoire</b>
	 */
	public void setBeginTime(final java.util.Date beginTime) {
		this.beginTime = beginTime;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Nom du processus'.
	 * @return java.util.Date endTime <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_TIMESTAMP", required = true, label = "Nom du processus")
	public java.util.Date getEndTime() {
		return endTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nom du processus'.
	 * @param endTime java.util.Date <b>Obligatoire</b>
	 */
	public void setEndTime(final java.util.Date endTime) {
		this.endTime = endTime;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Durée'.
	 * @return Integer executionTime
	 */
	@Field(domain = "DO_O_NOMBRE", label = "Durée")
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
	@Field(domain = "DO_O_CODE_IDENTIFIANT", label = "Statut")
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
	@Field(domain = "DO_O_JSON_TEXT", label = "Paramètres entrants")
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
	@Field(domain = "DO_O_JSON_TEXT", label = "Paramètres sortants")
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
	@Field(domain = "DO_O_BOOLEEN", label = "Fichier de log")
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
	@Field(domain = "DO_O_BOOLEEN", label = "Log technique")
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

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
