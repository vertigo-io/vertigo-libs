package io.vertigo.orchestra.domain.planification;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données OProcessPlanification
 */
@io.vertigo.dynamo.domain.stereotype.DataSpace("orchestra")
public final class OProcessPlanification implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long prpId;
	private java.util.Date expectedTime;
	private String initialParams;
	private Long proId;
	private Long nodId;
	private String sstCd;
	private io.vertigo.orchestra.domain.execution.ONode node;
	private io.vertigo.orchestra.domain.definition.OProcess processus;
	private io.vertigo.orchestra.domain.referential.OSchedulerState planificationState;

	/** {@inheritDoc} */
	@Override
	public URI<OProcessPlanification> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id Planification'.
	 * @return Long prpId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_IDENTIFIANT", type = "ID", required = true, label = "Id Planification")
	public Long getPrpId() {
		return prpId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id Planification'.
	 * @param prpId Long <b>Obligatoire</b>
	 */
	public void setPrpId(final Long prpId) {
		this.prpId = prpId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Date d'execution prévue'.
	 * @return java.util.Date expectedTime
	 */
	@Field(domain = "DO_O_TIMESTAMP", label = "Date d'execution prévue")
	public java.util.Date getExpectedTime() {
		return expectedTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Date d'execution prévue'.
	 * @param expectedTime java.util.Date
	 */
	public void setExpectedTime(final java.util.Date expectedTime) {
		this.expectedTime = expectedTime;
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
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Processus'.
	 * @return Long proId
	 */
	@Field(domain = "DO_O_IDENTIFIANT", type = "FOREIGN_KEY", label = "Processus")
	public Long getProId() {
		return proId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Processus'.
	 * @param proId Long
	 */
	public void setProId(final Long proId) {
		this.proId = proId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Node'.
	 * @return Long nodId
	 */
	@Field(domain = "DO_O_IDENTIFIANT", type = "FOREIGN_KEY", label = "Node")
	public Long getNodId() {
		return nodId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Node'.
	 * @param nodId Long
	 */
	public void setNodId(final Long nodId) {
		this.nodId = nodId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'PlanificationState'.
	 * @return String sstCd
	 */
	@Field(domain = "DO_O_CODE_IDENTIFIANT", type = "FOREIGN_KEY", label = "PlanificationState")
	public String getSstCd() {
		return sstCd;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'PlanificationState'.
	 * @param sstCd String
	 */
	public void setSstCd(final String sstCd) {
		this.sstCd = sstCd;
	}

	/**
	 * Association : Node.
	 * @return io.vertigo.orchestra.domain.execution.ONode
	 */
	public io.vertigo.orchestra.domain.execution.ONode getNode() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.execution.ONode> fkURI = getNodeURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (node == null || !fkURI.equals(node.getURI())) {
			node = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return node;
	}

	/**
	 * Retourne l'URI: Node.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_PRP_NOD",
			fkFieldName = "NOD_ID",
			primaryDtDefinitionName = "DT_O_NODE",
			primaryIsNavigable = true,
			primaryRole = "Node",
			primaryLabel = "Node",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_O_PROCESS_PLANIFICATION",
			foreignIsNavigable = false,
			foreignRole = "ProcessPlanification",
			foreignLabel = "PlanificationProcessus",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.execution.ONode> getNodeURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_PRP_NOD", io.vertigo.orchestra.domain.execution.ONode.class);
	}

	/**
	 * Association : Processus.
	 * @return io.vertigo.orchestra.domain.definition.OProcess
	 */
	public io.vertigo.orchestra.domain.definition.OProcess getProcessus() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.definition.OProcess> fkURI = getProcessusURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (processus == null || !fkURI.equals(processus.getURI())) {
			processus = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return processus;
	}

	/**
	 * Retourne l'URI: Processus.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_PRP_PRO",
			fkFieldName = "PRO_ID",
			primaryDtDefinitionName = "DT_O_PROCESS",
			primaryIsNavigable = true,
			primaryRole = "Processus",
			primaryLabel = "Processus",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_O_PROCESS_PLANIFICATION",
			foreignIsNavigable = false,
			foreignRole = "ProcessPlanification",
			foreignLabel = "PlanificationProcessus",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.definition.OProcess> getProcessusURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_PRP_PRO", io.vertigo.orchestra.domain.definition.OProcess.class);
	}

	/**
	 * Association : PlanificationState.
	 * @return io.vertigo.orchestra.domain.referential.OSchedulerState
	 */
	public io.vertigo.orchestra.domain.referential.OSchedulerState getPlanificationState() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.referential.OSchedulerState> fkURI = getPlanificationStateURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (planificationState == null || !fkURI.equals(planificationState.getURI())) {
			planificationState = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return planificationState;
	}

	/**
	 * Retourne l'URI: PlanificationState.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_PRP_PST",
			fkFieldName = "SST_CD",
			primaryDtDefinitionName = "DT_O_SCHEDULER_STATE",
			primaryIsNavigable = true,
			primaryRole = "PlanificationState",
			primaryLabel = "PlanificationState",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_O_PROCESS_PLANIFICATION",
			foreignIsNavigable = false,
			foreignRole = "ProcessPlanification",
			foreignLabel = "ProcessPlanification",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.referential.OSchedulerState> getPlanificationStateURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_PRP_PST", io.vertigo.orchestra.domain.referential.OSchedulerState.class);
	}


	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
