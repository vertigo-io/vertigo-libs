package io.vertigo.x.workflow.domain.model;

import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
/**
 * Attention cette classe est générée automatiquement !
 * Objet de données WfActivityDefinition
 */
@DtDefinition
public final class WfActivityDefinition implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long wfadId;
	private String name;
	private Integer level;
	private String wfmdCode;
	private Long wfwdId;
	private io.vertigo.x.workflow.domain.model.WfMultiplicityDefinition wfMultiplicityDefinition;
	private io.vertigo.x.workflow.domain.model.WfWorkflowDefinition wfWorkflowDefinition;

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id Activity Definition'. 
	 * @return Long wfadId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_ID", type = "ID", required = true, label = "Id Activity Definition")
	public Long getWfadId() {
		return wfadId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id Activity Definition'.
	 * @param wfadId Long <b>Obligatoire</b>
	 */
	public void setWfadId(final Long wfadId) {
		this.wfadId = wfadId;
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
	 * Récupère la valeur de la propriété 'level'. 
	 * @return Integer level 
	 */
	@Field(domain = "DO_X_WORKFLOW_LEVEL", label = "level")
	public Integer getLevel() {
		return level;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'level'.
	 * @param level Integer 
	 */
	public void setLevel(final Integer level) {
		this.level = level;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'WfMultiplicityDefinition'. 
	 * @return String wfmdCode 
	 */
	@Field(domain = "DO_X_WORKFLOW_CODE", type = "FOREIGN_KEY", label = "WfMultiplicityDefinition")
	public String getWfmdCode() {
		return wfmdCode;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'WfMultiplicityDefinition'.
	 * @param wfmdCode String 
	 */
	public void setWfmdCode(final String wfmdCode) {
		this.wfmdCode = wfmdCode;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'WfWorkflowDefinition'. 
	 * @return Long wfwdId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_ID", type = "FOREIGN_KEY", required = true, label = "WfWorkflowDefinition")
	public Long getWfwdId() {
		return wfwdId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'WfWorkflowDefinition'.
	 * @param wfwdId Long <b>Obligatoire</b>
	 */
	public void setWfwdId(final Long wfwdId) {
		this.wfwdId = wfwdId;
	}


	// Association : WfTransitionDefinition non navigable

	// Association : WfTransitionDefinition non navigable

	// Association : WfWorkflowDefinition non navigable
	/**
	 * Association : WfMultiplicityDefinition.
	 * @return io.vertigo.x.workflow.domain.model.WfMultiplicityDefinition
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_WFAD_WFMD",
    	fkFieldName = "WFMD_CODE",
    	primaryDtDefinitionName = "DT_WF_MULTIPLICITY_DEFINITION",
    	primaryIsNavigable = true,
    	primaryRole = "WfMultiplicityDefinition",
    	primaryLabel = "WfMultiplicityDefinition",
    	primaryMultiplicity = "0..1",
    	foreignDtDefinitionName = "DT_WF_ACTIVITY_DEFINITION",
    	foreignIsNavigable = false,
    	foreignRole = "WfActivityDefinition",
    	foreignLabel = "WfActivityDefinition",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.x.workflow.domain.model.WfMultiplicityDefinition getWfMultiplicityDefinition() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfMultiplicityDefinition> fkURI = getWfMultiplicityDefinitionURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (wfMultiplicityDefinition != null) {
			// On s'assure que l'objet correspond à la bonne clé
			final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfMultiplicityDefinition> uri;
			uri = io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(wfMultiplicityDefinition);
			if (!fkURI.urn().equals(uri.urn())) {
				wfMultiplicityDefinition = null;
			}
		}		
		if (wfMultiplicityDefinition == null) {
			wfMultiplicityDefinition = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().read(fkURI);
		}
		return wfMultiplicityDefinition;
	}

	/**
	 * Retourne l'URI: WfMultiplicityDefinition.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_WFAD_WFMD",
    	fkFieldName = "WFMD_CODE",
    	primaryDtDefinitionName = "DT_WF_MULTIPLICITY_DEFINITION",
    	primaryIsNavigable = true,
    	primaryRole = "WfMultiplicityDefinition",
    	primaryLabel = "WfMultiplicityDefinition",
    	primaryMultiplicity = "0..1",
    	foreignDtDefinitionName = "DT_WF_ACTIVITY_DEFINITION",
    	foreignIsNavigable = false,
    	foreignRole = "WfActivityDefinition",
    	foreignLabel = "WfActivityDefinition",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfMultiplicityDefinition> getWfMultiplicityDefinitionURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_WFAD_WFMD", io.vertigo.x.workflow.domain.model.WfMultiplicityDefinition.class);
	}
	/**
	 * Association : WfWorkflowDefinition.
	 * @return io.vertigo.x.workflow.domain.model.WfWorkflowDefinition
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_WFWD_WFAD_CURRENT",
    	fkFieldName = "WFWD_ID",
    	primaryDtDefinitionName = "DT_WF_WORKFLOW_DEFINITION",
    	primaryIsNavigable = true,
    	primaryRole = "WfWorkflowDefinition",
    	primaryLabel = "WfWorkflowDefinition",
    	primaryMultiplicity = "1..1",
    	foreignDtDefinitionName = "DT_WF_ACTIVITY_DEFINITION",
    	foreignIsNavigable = false,
    	foreignRole = "WfActivityDefinition",
    	foreignLabel = "WfActivityDefinition",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.x.workflow.domain.model.WfWorkflowDefinition getWfWorkflowDefinition() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfWorkflowDefinition> fkURI = getWfWorkflowDefinitionURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (wfWorkflowDefinition != null) {
			// On s'assure que l'objet correspond à la bonne clé
			final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfWorkflowDefinition> uri;
			uri = io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(wfWorkflowDefinition);
			if (!fkURI.urn().equals(uri.urn())) {
				wfWorkflowDefinition = null;
			}
		}		
		if (wfWorkflowDefinition == null) {
			wfWorkflowDefinition = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().read(fkURI);
		}
		return wfWorkflowDefinition;
	}

	/**
	 * Retourne l'URI: WfWorkflowDefinition.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_WFWD_WFAD_CURRENT",
    	fkFieldName = "WFWD_ID",
    	primaryDtDefinitionName = "DT_WF_WORKFLOW_DEFINITION",
    	primaryIsNavigable = true,
    	primaryRole = "WfWorkflowDefinition",
    	primaryLabel = "WfWorkflowDefinition",
    	primaryMultiplicity = "1..1",
    	foreignDtDefinitionName = "DT_WF_ACTIVITY_DEFINITION",
    	foreignIsNavigable = false,
    	foreignRole = "WfActivityDefinition",
    	foreignLabel = "WfActivityDefinition",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfWorkflowDefinition> getWfWorkflowDefinitionURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_WFWD_WFAD_CURRENT", io.vertigo.x.workflow.domain.model.WfWorkflowDefinition.class);
	}

	// Association : WfActivity non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
