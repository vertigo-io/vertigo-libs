package io.vertigo.x.workflow.domain.instance;

import io.vertigo.dynamo.domain.model.Entity;
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
	private Integer choice;
	private java.util.Date decisionDate;
	private String comments;
	private String user;
	private Long wfwId;
	private Long wfadId;
	private io.vertigo.x.workflow.domain.instance.WfWorkflow wfWorkflow;
	private io.vertigo.x.workflow.domain.model.WfActivityDefinition wfActivityDefinition;

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
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'choice'.
	 * @return Integer choice
	 */
	@Field(domain = "DO_X_WORKFLOW_CHOICE", label = "choice")
	public Integer getChoice() {
		return choice;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'choice'.
	 * @param choice Integer
	 */
	public void setChoice(final Integer choice) {
		this.choice = choice;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'decision date'.
	 * @return java.util.Date decisionDate
	 */
	@Field(domain = "DO_X_WORKFLOW_DATE", label = "decision date")
	public java.util.Date getDecisionDate() {
		return decisionDate;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'decision date'.
	 * @param decisionDate java.util.Date
	 */
	public void setDecisionDate(final java.util.Date decisionDate) {
		this.decisionDate = decisionDate;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'comments'.
	 * @return String comments
	 */
	@Field(domain = "DO_X_WORKFLOW_COMMENTS", label = "comments")
	public String getComments() {
		return comments;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'comments'.
	 * @param comments String
	 */
	public void setComments(final String comments) {
		this.comments = comments;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'user'.
	 * @return String user
	 */
	@Field(domain = "DO_X_WORKFLOW_USER", label = "user")
	public String getUser() {
		return user;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'user'.
	 * @param user String
	 */
	public void setUser(final String user) {
		this.user = user;
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
	@io.vertigo.dynamo.domain.stereotype.Association(
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
	public io.vertigo.x.workflow.domain.instance.WfWorkflow getWfWorkflow() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.instance.WfWorkflow> fkURI = getWfWorkflowURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (wfWorkflow != null) {
			// On s'assure que l'objet correspond à la bonne clé
			final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.instance.WfWorkflow> uri;
			uri = io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(wfWorkflow);
			if (!fkURI.urn().equals(uri.urn())) {
				wfWorkflow = null;
			}
		}
		if (wfWorkflow == null) {
			wfWorkflow = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().read(fkURI);
		}
		return wfWorkflow;
	}

	/**
	 * Retourne l'URI: WfWorkflow.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
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
	@io.vertigo.dynamo.domain.stereotype.Association(
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
	public io.vertigo.x.workflow.domain.model.WfActivityDefinition getWfActivityDefinition() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfActivityDefinition> fkURI = getWfActivityDefinitionURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (wfActivityDefinition != null) {
			// On s'assure que l'objet correspond à la bonne clé
			final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfActivityDefinition> uri;
			uri = io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(wfActivityDefinition);
			if (!fkURI.urn().equals(uri.urn())) {
				wfActivityDefinition = null;
			}
		}
		if (wfActivityDefinition == null) {
			wfActivityDefinition = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().read(fkURI);
		}
		return wfActivityDefinition;
	}

	/**
	 * Retourne l'URI: WfActivityDefinition.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
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

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
