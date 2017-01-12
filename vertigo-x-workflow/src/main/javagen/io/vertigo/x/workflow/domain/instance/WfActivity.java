package io.vertigo.x.workflow.domain.instance;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données WfActivity
 */
public final class WfActivity implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long wfaId;
	private java.util.Date creationDate;
	private Long wfwId;
	private Long wfadId;
	private io.vertigo.x.workflow.domain.instance.WfWorkflow wfWorkflow;
	private io.vertigo.x.workflow.domain.model.WfActivityDefinition wfActivityDefinition;
	private io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.instance.WfDecision> wfDecision;

	/** {@inheritDoc} */
	@Override
	public URI<WfActivity> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id activity'.
	 * @return Long wfaId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_ID", type = "ID", required = true, label = "Id activity")
	public Long getWfaId() {
		return wfaId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id activity'.
	 * @param wfaId Long <b>Obligatoire</b>
	 */
	public void setWfaId(final Long wfaId) {
		this.wfaId = wfaId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'creation date'.
	 * @return java.util.Date creationDate
	 */
	@Field(domain = "DO_X_WORKFLOW_DATE", label = "creation date")
	public java.util.Date getCreationDate() {
		return creationDate;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'creation date'.
	 * @param creationDate java.util.Date
	 */
	public void setCreationDate(final java.util.Date creationDate) {
		this.creationDate = creationDate;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'WfWorkflow'.
	 * @return Long wfwId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_ID", type = "FOREIGN_KEY", required = true, label = "WfWorkflow")
	public Long getWfwId() {
		return wfwId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'WfWorkflow'.
	 * @param wfwId Long <b>Obligatoire</b>
	 */
	public void setWfwId(final Long wfwId) {
		this.wfwId = wfwId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'WfActivityDefinition'.
	 * @return Long wfadId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_ID", type = "FOREIGN_KEY", required = true, label = "WfActivityDefinition")
	public Long getWfadId() {
		return wfadId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'WfActivityDefinition'.
	 * @param wfadId Long <b>Obligatoire</b>
	 */
	public void setWfadId(final Long wfadId) {
		this.wfadId = wfadId;
	}

	/**
	 * Association : WfWorkflow.
	 * @return io.vertigo.x.workflow.domain.instance.WfWorkflow
	 */
	public io.vertigo.x.workflow.domain.instance.WfWorkflow getWfWorkflow() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.instance.WfWorkflow> fkURI = getWfWorkflowURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (wfWorkflow == null || !fkURI.equals(wfWorkflow.getURI())) {
			wfWorkflow = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return wfWorkflow;
	}

	/**
	 * Retourne l'URI: WfWorkflow.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association (
			name = "A_WFW_WFA",
			fkFieldName = "WFW_ID",
			primaryDtDefinitionName = "DT_WF_WORKFLOW",
			primaryIsNavigable = true,
			primaryRole = "WfWorkflow",
			primaryLabel = "WfWorkflow",
			primaryMultiplicity = "1..1",
			foreignDtDefinitionName = "DT_WF_ACTIVITY",
			foreignIsNavigable = false,
			foreignRole = "WfActivity",
			foreignLabel = "WfActivity",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.instance.WfWorkflow> getWfWorkflowURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_WFW_WFA", io.vertigo.x.workflow.domain.instance.WfWorkflow.class);
	}
	/**
	 * Association : WfActivityDefinition.
	 * @return io.vertigo.x.workflow.domain.model.WfActivityDefinition
	 */
	public io.vertigo.x.workflow.domain.model.WfActivityDefinition getWfActivityDefinition() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfActivityDefinition> fkURI = getWfActivityDefinitionURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (wfActivityDefinition == null || !fkURI.equals(wfActivityDefinition.getURI())) {
			wfActivityDefinition = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return wfActivityDefinition;
	}

	/**
	 * Retourne l'URI: WfActivityDefinition.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association (
			name = "A_WFAD_WFA",
			fkFieldName = "WFAD_ID",
			primaryDtDefinitionName = "DT_WF_ACTIVITY_DEFINITION",
			primaryIsNavigable = true,
			primaryRole = "WfActivityDefinition",
			primaryLabel = "WfActivityDefinition",
			primaryMultiplicity = "1..1",
			foreignDtDefinitionName = "DT_WF_ACTIVITY",
			foreignIsNavigable = false,
			foreignRole = "WfActivity",
			foreignLabel = "WfActivity",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfActivityDefinition> getWfActivityDefinitionURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_WFAD_WFA", io.vertigo.x.workflow.domain.model.WfActivityDefinition.class);
	}

	// Association : WfWorkflow non navigable
	/**
	 * Association : WfDecision.
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.instance.WfDecision>
	 */
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.instance.WfDecision> getWfDecisionList() {
//		return this.<io.vertigo.x.workflow.domain.instance.WfDecision> getList(getWfDecisionListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(io.vertigo.x.workflow.domain.instance.WfDecision.class);
		}
		final io.vertigo.dynamo.domain.model.DtListURI fkDtListURI = getWfDecisionDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (wfDecision == null) {
			wfDecision = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().findAll(fkDtListURI);
		}
		return wfDecision;
	}

	/**
	 * Association URI: WfDecision.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association (
			name = "A_WFE_WFA",
			fkFieldName = "WFA_ID",
			primaryDtDefinitionName = "DT_WF_ACTIVITY",
			primaryIsNavigable = false,
			primaryRole = "WfActivity",
			primaryLabel = "WfActivity",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_WF_DECISION",
			foreignIsNavigable = true,
			foreignRole = "WfDecision",
			foreignLabel = "WfDecision",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForSimpleAssociation getWfDecisionDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURIForSimpleAssociation(this, "A_WFE_WFA", "WfDecision");
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
