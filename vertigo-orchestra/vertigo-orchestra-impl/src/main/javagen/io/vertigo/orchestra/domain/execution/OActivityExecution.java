package io.vertigo.orchestra.domain.execution;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données OActivityExecution
 */
@io.vertigo.dynamo.domain.stereotype.DataSpace("orchestra")
public final class OActivityExecution implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long aceId;
	private java.util.Date creationTime;
	private java.util.Date beginTime;
	private java.util.Date endTime;
	private String engine;
	private String token;
	private Long actId;
	private Long preId;
	private Long nodId;
	private String estCd;
	private io.vertigo.orchestra.domain.definition.OActivity activity;
	private io.vertigo.orchestra.domain.referential.OExecutionState executionState;
	private io.vertigo.orchestra.domain.execution.ONode node;
	private io.vertigo.orchestra.domain.execution.OProcessExecution processusExecution;

	/** {@inheritDoc} */
	@Override
	public URI<OActivityExecution> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id de l'execution d'un processus'.
	 * @return Long aceId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_IDENTIFIANT", type = "ID", required = true, label = "Id de l'execution d'un processus")
	public Long getAceId() {
		return aceId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id de l'execution d'un processus'.
	 * @param aceId Long <b>Obligatoire</b>
	 */
	public void setAceId(final Long aceId) {
		this.aceId = aceId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Date de création'.
	 * @return java.util.Date creationTime <b>Obligatoire</b>
	 */
	@Field(domain = "DO_O_TIMESTAMP", required = true, label = "Date de création")
	public java.util.Date getCreationTime() {
		return creationTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Date de création'.
	 * @param creationTime java.util.Date <b>Obligatoire</b>
	 */
	public void setCreationTime(final java.util.Date creationTime) {
		this.creationTime = creationTime;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Date de début'.
	 * @return java.util.Date beginTime
	 */
	@Field(domain = "DO_O_TIMESTAMP", label = "Date de début")
	public java.util.Date getBeginTime() {
		return beginTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Date de début'.
	 * @param beginTime java.util.Date
	 */
	public void setBeginTime(final java.util.Date beginTime) {
		this.beginTime = beginTime;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Date de fin'.
	 * @return java.util.Date endTime
	 */
	@Field(domain = "DO_O_TIMESTAMP", label = "Date de fin")
	public java.util.Date getEndTime() {
		return endTime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Date de fin'.
	 * @param endTime java.util.Date
	 */
	public void setEndTime(final java.util.Date endTime) {
		this.endTime = endTime;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Implémentation effective de l'execution'.
	 * @return String engine
	 */
	@Field(domain = "DO_O_CLASSE", label = "Implémentation effective de l'execution")
	public String getEngine() {
		return engine;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Implémentation effective de l'execution'.
	 * @param engine String
	 */
	public void setEngine(final String engine) {
		this.engine = engine;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Token d'identification'.
	 * @return String token
	 */
	@Field(domain = "DO_O_TOKEN", label = "Token d'identification")
	public String getToken() {
		return token;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Token d'identification'.
	 * @param token String
	 */
	public void setToken(final String token) {
		this.token = token;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Activity'.
	 * @return Long actId
	 */
	@Field(domain = "DO_O_IDENTIFIANT", type = "FOREIGN_KEY", label = "Activity")
	public Long getActId() {
		return actId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Activity'.
	 * @param actId Long
	 */
	public void setActId(final Long actId) {
		this.actId = actId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Processus'.
	 * @return Long preId
	 */
	@Field(domain = "DO_O_IDENTIFIANT", type = "FOREIGN_KEY", label = "Processus")
	public Long getPreId() {
		return preId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Processus'.
	 * @param preId Long
	 */
	public void setPreId(final Long preId) {
		this.preId = preId;
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
	 * Récupère la valeur de la propriété 'ExecutionState'.
	 * @return String estCd
	 */
	@Field(domain = "DO_O_CODE_IDENTIFIANT", type = "FOREIGN_KEY", label = "ExecutionState")
	public String getEstCd() {
		return estCd;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'ExecutionState'.
	 * @param estCd String
	 */
	public void setEstCd(final String estCd) {
		this.estCd = estCd;
	}

	/**
	 * Association : Activity.
	 * @return io.vertigo.orchestra.domain.definition.OActivity
	 */
	public io.vertigo.orchestra.domain.definition.OActivity getActivity() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.definition.OActivity> fkURI = getActivityURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (activity == null || !fkURI.equals(activity.getURI())) {
			activity = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return activity;
	}

	/**
	 * Retourne l'URI: Activity.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_ACE_ACT",
			fkFieldName = "ACT_ID",
			primaryDtDefinitionName = "DT_O_ACTIVITY",
			primaryIsNavigable = true,
			primaryRole = "Activity",
			primaryLabel = "Activity",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_O_ACTIVITY_EXECUTION",
			foreignIsNavigable = false,
			foreignRole = "ExecutionActivity",
			foreignLabel = "ExecutionActivity",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.definition.OActivity> getActivityURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_ACE_ACT", io.vertigo.orchestra.domain.definition.OActivity.class);
	}

	/**
	 * Association : ExecutionState.
	 * @return io.vertigo.orchestra.domain.referential.OExecutionState
	 */
	public io.vertigo.orchestra.domain.referential.OExecutionState getExecutionState() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.referential.OExecutionState> fkURI = getExecutionStateURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (executionState == null || !fkURI.equals(executionState.getURI())) {
			executionState = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return executionState;
	}

	/**
	 * Retourne l'URI: ExecutionState.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_ACE_EST",
			fkFieldName = "EST_CD",
			primaryDtDefinitionName = "DT_O_EXECUTION_STATE",
			primaryIsNavigable = true,
			primaryRole = "ExecutionState",
			primaryLabel = "ExecutionState",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_O_ACTIVITY_EXECUTION",
			foreignIsNavigable = false,
			foreignRole = "ExecutionActivity",
			foreignLabel = "ExecutionActivity",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.referential.OExecutionState> getExecutionStateURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_ACE_EST", io.vertigo.orchestra.domain.referential.OExecutionState.class);
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
			name = "A_ACE_NOD",
			fkFieldName = "NOD_ID",
			primaryDtDefinitionName = "DT_O_NODE",
			primaryIsNavigable = true,
			primaryRole = "Node",
			primaryLabel = "Node",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_O_ACTIVITY_EXECUTION",
			foreignIsNavigable = false,
			foreignRole = "ExecutionActivity",
			foreignLabel = "ExecutionActivity",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.execution.ONode> getNodeURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_ACE_NOD", io.vertigo.orchestra.domain.execution.ONode.class);
	}

	/**
	 * Association : Processus.
	 * @return io.vertigo.orchestra.domain.execution.OProcessExecution
	 */
	public io.vertigo.orchestra.domain.execution.OProcessExecution getProcessusExecution() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.execution.OProcessExecution> fkURI = getProcessusExecutionURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (processusExecution == null || !fkURI.equals(processusExecution.getURI())) {
			processusExecution = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return processusExecution;
	}

	/**
	 * Retourne l'URI: Processus.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_ACE_PRE",
			fkFieldName = "PRE_ID",
			primaryDtDefinitionName = "DT_O_PROCESS_EXECUTION",
			primaryIsNavigable = true,
			primaryRole = "ProcessusExecution",
			primaryLabel = "Processus",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_O_ACTIVITY_EXECUTION",
			foreignIsNavigable = false,
			foreignRole = "ExecutionActivity",
			foreignLabel = "ExecutionActivity",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.orchestra.domain.execution.OProcessExecution> getProcessusExecutionURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_ACE_PRE", io.vertigo.orchestra.domain.execution.OProcessExecution.class);
	}

	// Association : ActivityLog non navigable
	// Association : ActivityWorkspace non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
