package io.vertigo.orchestra.monitoring.domain.summary;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.lang.Generated;

/**
 * This class is automatically generated.
 */
 @Generated
public final class OExecutionSummary implements DtObject {
	private static final long serialVersionUID = 1L;

	private Long proId;
	private String processName;
	private String processLabel;
	private java.util.Date lastExecutionTime;
	private java.util.Date nextExecutionTime;
	private Integer errorsCount;
	private Integer misfiredCount;
	private Integer successfulCount;
	private Integer runningCount;
	private Integer averageExecutionTime;
	private String health;

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Id du processus'.
	 * @return Long proId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_IDENTIFIANT", required = true, label = "Id du processus")
	public Long getProId() {
		return proId;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Id du processus'.
	 * @param proId Long <b>Obligatoire</b>
	 */
	public void setProId(final Long proId) {
		this.proId = proId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Nom du processus'.
	 * @return String processName <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_LIBELLE", required = true, label = "Nom du processus")
	public String getProcessName() {
		return processName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nom du processus'.
	 * @param processName String <b>Obligatoire</b>
	 */
	public void setProcessName(final String processName) {
		this.processName = processName;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Libellé du processus'.
	 * @return String processLabel <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_LIBELLE", required = true, label = "Libellé du processus")
	public String getProcessLabel() {
		return processLabel;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Libellé du processus'.
	 * @param processLabel String <b>Obligatoire</b>
	 */
	public void setProcessLabel(final String processLabel) {
		this.processLabel = processLabel;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Dernière exécution le'.
	 * @return java.util.Date lastExecutionTime
	 */
	@Field(domain = "DO_O_TIMESTAMP", label = "Dernière exécution le")
	public java.util.Date getLastExecutionTime() {
		return lastExecutionTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Dernière exécution le'.
	 * @param lastExecutionTime java.util.Date
	 */
	public void setLastExecutionTime(final java.util.Date lastExecutionTime) {
		this.lastExecutionTime = lastExecutionTime;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Prochaine exécution le'.
	 * @return java.util.Date nextExecutionTime
	 */
	@Field(domain = "DO_O_TIMESTAMP", label = "Prochaine exécution le")
	public java.util.Date getNextExecutionTime() {
		return nextExecutionTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Prochaine exécution le'.
	 * @param nextExecutionTime java.util.Date
	 */
	public void setNextExecutionTime(final java.util.Date nextExecutionTime) {
		this.nextExecutionTime = nextExecutionTime;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Nombre en erreur'.
	 * @return Integer errorsCount
	 */
	@Field(domain = "DO_O_NOMBRE", label = "Nombre en erreur")
	public Integer getErrorsCount() {
		return errorsCount;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nombre en erreur'.
	 * @param errorsCount Integer
	 */
	public void setErrorsCount(final Integer errorsCount) {
		this.errorsCount = errorsCount;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Nombre non executés'.
	 * @return Integer misfiredCount
	 */
	@Field(domain = "DO_O_NOMBRE", label = "Nombre non executés")
	public Integer getMisfiredCount() {
		return misfiredCount;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nombre non executés'.
	 * @param misfiredCount Integer
	 */
	public void setMisfiredCount(final Integer misfiredCount) {
		this.misfiredCount = misfiredCount;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Nombre en succès'.
	 * @return Integer successfulCount
	 */
	@Field(domain = "DO_O_NOMBRE", label = "Nombre en succès")
	public Integer getSuccessfulCount() {
		return successfulCount;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nombre en succès'.
	 * @param successfulCount Integer
	 */
	public void setSuccessfulCount(final Integer successfulCount) {
		this.successfulCount = successfulCount;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Nombre en cours'.
	 * @return Integer runningCount
	 */
	@Field(domain = "DO_O_NOMBRE", label = "Nombre en cours")
	public Integer getRunningCount() {
		return runningCount;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nombre en cours'.
	 * @param runningCount Integer
	 */
	public void setRunningCount(final Integer runningCount) {
		this.runningCount = runningCount;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Durée moyenne d'exécution'.
	 * @return Integer averageExecutionTime
	 */
	@Field(domain = "DO_O_NOMBRE", label = "Durée moyenne d'exécution")
	public Integer getAverageExecutionTime() {
		return averageExecutionTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Durée moyenne d'exécution'.
	 * @param averageExecutionTime Integer
	 */
	public void setAverageExecutionTime(final Integer averageExecutionTime) {
		this.averageExecutionTime = averageExecutionTime;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Santé du processus'.
	 * @return String health <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_CODE_IDENTIFIANT", required = true, label = "Santé du processus")
	public String getHealth() {
		return health;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Santé du processus'.
	 * @param health String <b>Obligatoire</b>
	 */
	public void setHealth(final String health) {
		this.health = health;
	}


	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
