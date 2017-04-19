package io.vertigo.orchestra.domain.definition;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données OProcess
 */
@io.vertigo.dynamo.domain.stereotype.DataSpace("orchestra")
public final class OProcess implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long proId;
	private String name;
	private String label;
	private String cronExpression;
	private String initialParams;
	private Boolean multiexecution;
	private Boolean activeVersion;
	private Boolean active;
	private Integer rescuePeriod;
	private String metadatas;
	private Boolean needUpdate;
	private String trtCd;
	private String prtCd;
	private io.vertigo.orchestra.domain.referential.OProcessType processType;
	private io.vertigo.orchestra.domain.referential.TriggerType triggerType;

	/** {@inheritDoc} */
	@Override
	public URI<OProcess> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id de la definition du processus'.
	 * @return Long proId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_IDENTIFIANT", type = "ID", required = true, label = "Id de la definition du processus")
	public Long getProId() {
		return proId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id de la definition du processus'.
	 * @param proId Long <b>Obligatoire</b>
	 */
	public void setProId(final Long proId) {
		this.proId = proId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Nom du processus'.
	 * @return String name
	 */
	@Field(domain = "DO_O_LIBELLE", label = "Nom du processus")
	public String getName() {
		return name;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nom du processus'.
	 * @param name String
	 */
	public void setName(final String name) {
		this.name = name;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Libellé du processus'.
	 * @return String label
	 */
	@Field(domain = "DO_O_LIBELLE", label = "Libellé du processus")
	public String getLabel() {
		return label;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Libellé du processus'.
	 * @param label String
	 */
	public void setLabel(final String label) {
		this.label = label;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Expression récurrence du processus'.
	 * @return String cronExpression
	 */
	@Field(domain = "DO_O_LIBELLE", label = "Expression récurrence du processus")
	public String getCronExpression() {
		return cronExpression;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Expression récurrence du processus'.
	 * @param cronExpression String
	 */
	public void setCronExpression(final String cronExpression) {
		this.cronExpression = cronExpression;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Paramètres initiaux sous forme de JSON'.
	 * @return String initialParams
	 */
	@Field(domain = "DO_O_JSON_TEXT", label = "Paramètres initiaux sous forme de JSON")
	public String getInitialParams() {
		return initialParams;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Paramètres initiaux sous forme de JSON'.
	 * @param initialParams String
	 */
	public void setInitialParams(final String initialParams) {
		this.initialParams = initialParams;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Accepte la multi-execution'.
	 * @return Boolean multiexecution
	 */
	@Field(domain = "DO_O_BOOLEEN", label = "Accepte la multi-execution")
	public Boolean getMultiexecution() {
		return multiexecution;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Accepte la multi-execution'.
	 * @param multiexecution Boolean
	 */
	public void setMultiexecution(final Boolean multiexecution) {
		this.multiexecution = multiexecution;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Version active'.
	 * @return Boolean activeVersion <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_BOOLEEN", required = true, label = "Version active")
	public Boolean getActiveVersion() {
		return activeVersion;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Version active'.
	 * @param activeVersion Boolean <b>Obligatoire</b>
	 */
	public void setActiveVersion(final Boolean activeVersion) {
		this.activeVersion = activeVersion;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Processus actif'.
	 * @return Boolean active <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_BOOLEEN", required = true, label = "Processus actif")
	public Boolean getActive() {
		return active;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Processus actif'.
	 * @param active Boolean <b>Obligatoire</b>
	 */
	public void setActive(final Boolean active) {
		this.active = active;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Temps de validité d'une planification'.
	 * @return Integer rescuePeriod <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_NOMBRE", required = true, label = "Temps de validité d'une planification")
	public Integer getRescuePeriod() {
		return rescuePeriod;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Temps de validité d'une planification'.
	 * @param rescuePeriod Integer <b>Obligatoire</b>
	 */
	public void setRescuePeriod(final Integer rescuePeriod) {
		this.rescuePeriod = rescuePeriod;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Meta-données du processus'.
	 * @return String metadatas
	 */
	@Field(domain = "DO_O_METADATAS", label = "Meta-données du processus")
	public String getMetadatas() {
		return metadatas;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Meta-données du processus'.
	 * @param metadatas String
	 */
	public void setMetadatas(final String metadatas) {
		this.metadatas = metadatas;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Doit être mise à jour lors du démarrage'.
	 * @return Boolean needUpdate <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_BOOLEEN", required = true, label = "Doit être mise à jour lors du démarrage")
	public Boolean getNeedUpdate() {
		return needUpdate;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Doit être mise à jour lors du démarrage'.
	 * @param needUpdate Boolean <b>Obligatoire</b>
	 */
	public void setNeedUpdate(final Boolean needUpdate) {
		this.needUpdate = needUpdate;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'TriggerType'.
	 * @return String trtCd
	 */
	@Field(domain = "DO_O_CODE_IDENTIFIANT", type = "FOREIGN_KEY", label = "TriggerType")
	public String getTrtCd() {
		return trtCd;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'TriggerType'.
	 * @param trtCd String
	 */
	public void setTrtCd(final String trtCd) {
		this.trtCd = trtCd;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'ProcessType'.
	 * @return String prtCd
	 */
	@Field(domain = "DO_O_CODE_IDENTIFIANT", type = "FOREIGN_KEY", label = "ProcessType")
	public String getPrtCd() {
		return prtCd;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'ProcessType'.
	 * @param prtCd String
	 */
	public void setPrtCd(final String prtCd) {
		this.prtCd = prtCd;
	}

	// Association : Activity non navigable
	// Association : ExecutionProcessus non navigable
	/**
	 * Association : ProcessType.
	 * @return io.vertigo.orchestra.domain.referential.OProcessType
	 */
	public io.vertigo.orchestra.domain.referential.OProcessType getProcessType() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.referential.OProcessType> fkURI = getProcessTypeURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (processType == null || !fkURI.equals(processType.getURI())) {
			processType = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return processType;
	}

	/**
	 * Retourne l'URI: ProcessType.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_PRO_PRT",
			fkFieldName = "PRT_CD",
			primaryDtDefinitionName = "DT_O_PROCESS_TYPE",
			primaryIsNavigable = true,
			primaryRole = "ProcessType",
			primaryLabel = "ProcessType",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_O_PROCESS",
			foreignIsNavigable = false,
			foreignRole = "Process",
			foreignLabel = "Process",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.referential.OProcessType> getProcessTypeURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_PRO_PRT", io.vertigo.orchestra.domain.referential.OProcessType.class);
	}

	/**
	 * Association : TriggerType.
	 * @return io.vertigo.orchestra.domain.referential.TriggerType
	 */
	public io.vertigo.orchestra.domain.referential.TriggerType getTriggerType() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.referential.TriggerType> fkURI = getTriggerTypeURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (triggerType == null || !fkURI.equals(triggerType.getURI())) {
			triggerType = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return triggerType;
	}

	/**
	 * Retourne l'URI: TriggerType.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_PRO_TRT",
			fkFieldName = "TRT_CD",
			primaryDtDefinitionName = "DT_TRIGGER_TYPE",
			primaryIsNavigable = true,
			primaryRole = "TriggerType",
			primaryLabel = "TriggerType",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_O_PROCESS",
			foreignIsNavigable = false,
			foreignRole = "Process",
			foreignLabel = "Process",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.referential.TriggerType> getTriggerTypeURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_PRO_TRT", io.vertigo.orchestra.domain.referential.TriggerType.class);
	}

	// Association : PlanificationProcessus non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
