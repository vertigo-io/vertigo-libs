package io.vertigo.orchestra.monitoring.domain.uiexecutions;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.lang.Generated;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
public final class OProcessExecutionUi implements DtObject {
	private static final long serialVersionUID = 1L;

	private Long preId;
	private java.time.Instant beginTime;
	private java.time.Instant endTime;
	private Integer executionTime;
	private String status;
	private Boolean checked;
	private java.time.Instant checkingDate;
	private String checkingComment;
	private Boolean hasAttachment;
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Id de l'activité'.
	 * @return Long preId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_IDENTIFIANT", required = true, label = "Id de l'activité")
	public Long getPreId() {
		return preId;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Id de l'activité'.
	 * @param preId Long <b>Obligatoire</b>
	 */
	public void setPreId(final Long preId) {
		this.preId = preId;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Démarrage'.
	 * @return Instant beginTime <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_TIMESTAMP", required = true, label = "Démarrage")
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
	@Field(domain = "DO_O_TIMESTAMP", required = true, label = "Fin")
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
	 * Récupère la valeur de la propriété 'Pris en charge'.
	 * @return Boolean checked
	 */
	@Field(domain = "DO_O_BOOLEEN", label = "Pris en charge")
	public Boolean getChecked() {
		return checked;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Pris en charge'.
	 * @param checked Boolean
	 */
	public void setChecked(final Boolean checked) {
		this.checked = checked;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Date de prise en charge'.
	 * @return Instant checkingDate
	 */
	@Field(domain = "DO_O_TIMESTAMP", label = "Date de prise en charge")
	public java.time.Instant getCheckingDate() {
		return checkingDate;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Date de prise en charge'.
	 * @param checkingDate Instant
	 */
	public void setCheckingDate(final java.time.Instant checkingDate) {
		this.checkingDate = checkingDate;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Commentaire'.
	 * @return String checkingComment
	 */
	@Field(domain = "DO_O_TEXT", label = "Commentaire")
	public String getCheckingComment() {
		return checkingComment;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Commentaire'.
	 * @param checkingComment String
	 */
	public void setCheckingComment(final String checkingComment) {
		this.checkingComment = checkingComment;
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
	
	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
