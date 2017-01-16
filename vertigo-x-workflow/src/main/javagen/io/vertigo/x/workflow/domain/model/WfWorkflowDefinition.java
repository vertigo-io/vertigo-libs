package io.vertigo.x.workflow.domain.model;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données WfWorkflowDefinition
 */
public final class WfWorkflowDefinition implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long wfwdId;
	private String name;
	private java.util.Date date;
	private Long wfadId;
	private io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.model.WfTransitionDefinition> wfTransitionDefinition;
	private io.vertigo.x.workflow.domain.model.WfActivityDefinition startActivity;

	/** {@inheritDoc} */
	@Override
	public URI<WfWorkflowDefinition> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id Workflow definition'.
	 * @return Long wfwdId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_ID", type = "ID", required = true, label = "Id Workflow definition")
	public Long getWfwdId() {
		return wfwdId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id Workflow definition'.
	 * @param wfwdId Long <b>Obligatoire</b>
	 */
	public void setWfwdId(final Long wfwdId) {
		this.wfwdId = wfwdId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'name'.
	 * @return String name
	 */
	@Field(domain = "DO_X_WORKFLOW_LABEL", label = "name")
	public String getName() {
		return name;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'name'.
	 * @param name String
	 */
	public void setName(final String name) {
		this.name = name;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'date'.
	 * @return java.util.Date date
	 */
	@Field(domain = "DO_X_WORKFLOW_DATE", label = "date")
	public java.util.Date getDate() {
		return date;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'date'.
	 * @param date java.util.Date
	 */
	public void setDate(final java.util.Date date) {
		this.date = date;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'startActivity'.
	 * @return Long wfadId
	 */
	@Field(domain = "DO_X_WORKFLOW_ID", type = "FOREIGN_KEY", label = "startActivity")
	public Long getWfadId() {
		return wfadId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'startActivity'.
	 * @param wfadId Long
	 */
	public void setWfadId(final Long wfadId) {
		this.wfadId = wfadId;
	}

	/**
	 * Association : WfTransitionDefinition.
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.model.WfTransitionDefinition>
	 */
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.model.WfTransitionDefinition> getWfTransitionDefinitionList() {
//		return this.<io.vertigo.x.workflow.domain.model.WfTransitionDefinition> getList(getWfTransitionDefinitionListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(io.vertigo.x.workflow.domain.model.WfTransitionDefinition.class);
		}
		final io.vertigo.dynamo.domain.model.DtListURI fkDtListURI = getWfTransitionDefinitionDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (wfTransitionDefinition == null) {
			wfTransitionDefinition = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().findAll(fkDtListURI);
		}
		return wfTransitionDefinition;
	}

	/**
	 * Association URI: WfTransitionDefinition.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association (
			name = "A_WFWD_WFTD",
			fkFieldName = "WFWD_ID",
			primaryDtDefinitionName = "DT_WF_WORKFLOW_DEFINITION",
			primaryIsNavigable = false,
			primaryRole = "WfWorkflowDefinition",
			primaryLabel = "WfWorkflowDefinition",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_WF_TRANSITION_DEFINITION",
			foreignIsNavigable = true,
			foreignRole = "WfTransitionDefinition",
			foreignLabel = "WfTransitionDefinition",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForSimpleAssociation getWfTransitionDefinitionDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURIForSimpleAssociation(this, "A_WFWD_WFTD", "WfTransitionDefinition");
	}
	/**
	 * Association : startActivity.
	 * @return io.vertigo.x.workflow.domain.model.WfActivityDefinition
	 */
	public io.vertigo.x.workflow.domain.model.WfActivityDefinition getStartActivity() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfActivityDefinition> fkURI = getStartActivityURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (startActivity == null || !fkURI.equals(startActivity.getURI())) {
			startActivity = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return startActivity;
	}

	/**
	 * Retourne l'URI: startActivity.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association (
			name = "A_WFWD_WFAD",
			fkFieldName = "WFAD_ID",
			primaryDtDefinitionName = "DT_WF_ACTIVITY_DEFINITION",
			primaryIsNavigable = true,
			primaryRole = "StartActivity",
			primaryLabel = "startActivity",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_WF_WORKFLOW_DEFINITION",
			foreignIsNavigable = false,
			foreignRole = "WfWorkflowDefinition",
			foreignLabel = "WfWorkflowDefinition",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfActivityDefinition> getStartActivityURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_WFWD_WFAD", io.vertigo.x.workflow.domain.model.WfActivityDefinition.class);
	}

	// Association : WfActivityDefinition non navigable

	// Association : WfWorkflow non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
