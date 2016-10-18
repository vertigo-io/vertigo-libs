/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2016, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.x.workflow.domain.model;

import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
/**
 * Attention cette classe est générée automatiquement !
 * Objet de données WfTransitionDefinition
 */
public final class WfTransitionDefinition implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long wftdId;
	private String name;
	private Long wfwdId;
	private Long wfadIdFrom;
	private Long wfadIdTo;
	private io.vertigo.x.workflow.domain.model.WfActivityDefinition transitionFrom;
	private io.vertigo.x.workflow.domain.model.WfActivityDefinition transitionTo;

	/** {@inheritDoc} */
	@Override
	public URI<WfTransitionDefinition> getURI() {
		return DtObjectUtil.createURI(this);
	}
	
	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id Transition Definition'. 
	 * @return Long wftdId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_ID", type = "ID", required = true, label = "Id Transition Definition")
	public Long getWftdId() {
		return wftdId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id Transition Definition'.
	 * @param wftdId Long <b>Obligatoire</b>
	 */
	public void setWftdId(final Long wftdId) {
		this.wftdId = wftdId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'name'. 
	 * @return String name <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_LABEL", required = true, label = "name")
	public String getName() {
		return name;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'name'.
	 * @param name String <b>Obligatoire</b>
	 */
	public void setName(final String name) {
		this.name = name;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'WfWorkflowDefinition'. 
	 * @return Long wfwdId 
	 */
	@Field(domain = "DO_X_WORKFLOW_ID", type = "FOREIGN_KEY", label = "WfWorkflowDefinition")
	public Long getWfwdId() {
		return wfwdId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'WfWorkflowDefinition'.
	 * @param wfwdId Long 
	 */
	public void setWfwdId(final Long wfwdId) {
		this.wfwdId = wfwdId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'transitionFrom'. 
	 * @return Long wfadIdFrom <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_ID", type = "FOREIGN_KEY", required = true, label = "transitionFrom")
	public Long getWfadIdFrom() {
		return wfadIdFrom;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'transitionFrom'.
	 * @param wfadIdFrom Long <b>Obligatoire</b>
	 */
	public void setWfadIdFrom(final Long wfadIdFrom) {
		this.wfadIdFrom = wfadIdFrom;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'transitionTo'. 
	 * @return Long wfadIdTo <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_WORKFLOW_ID", type = "FOREIGN_KEY", required = true, label = "transitionTo")
	public Long getWfadIdTo() {
		return wfadIdTo;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'transitionTo'.
	 * @param wfadIdTo Long <b>Obligatoire</b>
	 */
	public void setWfadIdTo(final Long wfadIdTo) {
		this.wfadIdTo = wfadIdTo;
	}


	// Association : WfWorkflowDefinition non navigable
	/**
	 * Association : transitionFrom.
	 * @return io.vertigo.x.workflow.domain.model.WfActivityDefinition
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_WFT_WFA_FROM",
    	fkFieldName = "WFAD_ID_FROM",
    	primaryDtDefinitionName = "DT_WF_ACTIVITY_DEFINITION",
    	primaryIsNavigable = true,
    	primaryRole = "TransitionFrom",
    	primaryLabel = "transitionFrom",
    	primaryMultiplicity = "1..1",
    	foreignDtDefinitionName = "DT_WF_TRANSITION_DEFINITION",
    	foreignIsNavigable = false,
    	foreignRole = "WfTransitionDefinition",
    	foreignLabel = "WfTransitionDefinition",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.x.workflow.domain.model.WfActivityDefinition getTransitionFrom() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfActivityDefinition> fkURI = getTransitionFromURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (transitionFrom != null) {
			// On s'assure que l'objet correspond à la bonne clé
			final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfActivityDefinition> uri;
			uri = io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(transitionFrom);
			if (!fkURI.urn().equals(uri.urn())) {
				transitionFrom = null;
			}
		}		
		if (transitionFrom == null) {
			transitionFrom = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().read(fkURI);
		}
		return transitionFrom;
	}

	/**
	 * Retourne l'URI: transitionFrom.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_WFT_WFA_FROM",
    	fkFieldName = "WFAD_ID_FROM",
    	primaryDtDefinitionName = "DT_WF_ACTIVITY_DEFINITION",
    	primaryIsNavigable = true,
    	primaryRole = "TransitionFrom",
    	primaryLabel = "transitionFrom",
    	primaryMultiplicity = "1..1",
    	foreignDtDefinitionName = "DT_WF_TRANSITION_DEFINITION",
    	foreignIsNavigable = false,
    	foreignRole = "WfTransitionDefinition",
    	foreignLabel = "WfTransitionDefinition",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfActivityDefinition> getTransitionFromURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_WFT_WFA_FROM", io.vertigo.x.workflow.domain.model.WfActivityDefinition.class);
	}
	/**
	 * Association : transitionTo.
	 * @return io.vertigo.x.workflow.domain.model.WfActivityDefinition
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_WFT_WFA_TO",
    	fkFieldName = "WFAD_ID_TO",
    	primaryDtDefinitionName = "DT_WF_ACTIVITY_DEFINITION",
    	primaryIsNavigable = true,
    	primaryRole = "TransitionTo",
    	primaryLabel = "transitionTo",
    	primaryMultiplicity = "1..1",
    	foreignDtDefinitionName = "DT_WF_TRANSITION_DEFINITION",
    	foreignIsNavigable = false,
    	foreignRole = "WfTransitionDefinition",
    	foreignLabel = "WfTransitionDefinition",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.x.workflow.domain.model.WfActivityDefinition getTransitionTo() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfActivityDefinition> fkURI = getTransitionToURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (transitionTo != null) {
			// On s'assure que l'objet correspond à la bonne clé
			final io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfActivityDefinition> uri;
			uri = io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(transitionTo);
			if (!fkURI.urn().equals(uri.urn())) {
				transitionTo = null;
			}
		}		
		if (transitionTo == null) {
			transitionTo = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().read(fkURI);
		}
		return transitionTo;
	}

	/**
	 * Retourne l'URI: transitionTo.
	 * @return URI de l'association
	 */
    @io.vertigo.dynamo.domain.stereotype.Association (
    	name = "A_WFT_WFA_TO",
    	fkFieldName = "WFAD_ID_TO",
    	primaryDtDefinitionName = "DT_WF_ACTIVITY_DEFINITION",
    	primaryIsNavigable = true,
    	primaryRole = "TransitionTo",
    	primaryLabel = "transitionTo",
    	primaryMultiplicity = "1..1",
    	foreignDtDefinitionName = "DT_WF_TRANSITION_DEFINITION",
    	foreignIsNavigable = false,
    	foreignRole = "WfTransitionDefinition",
    	foreignLabel = "WfTransitionDefinition",
    	foreignMultiplicity = "0..*"
    )
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.x.workflow.domain.model.WfActivityDefinition> getTransitionToURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_WFT_WFA_TO", io.vertigo.x.workflow.domain.model.WfActivityDefinition.class);
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
