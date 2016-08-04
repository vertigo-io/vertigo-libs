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
package io.vertigo.x.impl.rules;

import java.util.Date;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * This class defines the Rule definition for an Object.
 *
 * @author xdurand
 */
public final class RuleDefinition implements Entity {
	/**
	 *
	 */
	private static final long serialVersionUID = 2280022920606418634L;

	@Field(type = "ID", domain = "DO_X_RULES_ID", required = true, label = "id")
	private Long id;

	@Field(domain = "DO_X_RULES_DATE", label = "creationDate")
	private final Date creationDate;

	@Field(domain = "DO_X_RULES_WEAK_ID", label = "itemId")
	private Long itemId;

	private io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.impl.rules.RuleConditionDefinition> ruleConditionDefinition;

	/**
	 *
	 * @param id
	 * @param itemId
	 */
	public RuleDefinition(final Long id, final Long itemId) {
		this.id = id;
		this.itemId = itemId;
		creationDate = new Date();
	}

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(final Long id) {
		this.id = id;
	}

	/**
	 * @return the creationDate
	 */
	public Date getCreationDate() {
		return creationDate;
	}

	/**
	 * @return the itemId
	 */
	public Long getItemId() {
		return itemId;
	}

	/**
	 * @param itemId the itemId to set
	 */
	public void setItemId(final Long itemId) {
		this.itemId = itemId;
	}

	/**
	 * Association : WfTransitionDefinition.
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.model.WfTransitionDefinition>
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_RUD_COD",
			fkFieldName = "RUD_ID",
			primaryDtDefinitionName = "DT_RULE_DEFINITION",
			primaryIsNavigable = false,
			primaryRole = "RuleDefinition",
			primaryLabel = "RuleDefinition",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_RULE_CONDITION_DEFINITION",
			foreignIsNavigable = true,
			foreignRole = "RuleConditionDefinition",
			foreignLabel = "RuleConditionDefinition",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.impl.rules.RuleConditionDefinition> getRuleConditionDefinitionList() {
		//		return this.<io.vertigo.x.workflow.domain.model.WfTransitionDefinition> getList(getWfTransitionDefinitionListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(io.vertigo.x.impl.rules.RuleConditionDefinition.class);
		}
		final io.vertigo.dynamo.domain.model.DtListURI fkDtListURI = getRuleConditionDefinitionDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (ruleConditionDefinition == null) {
			ruleConditionDefinition = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().findAll(fkDtListURI);
		}
		return ruleConditionDefinition;
	}

	/**
	 * Association URI: WfTransitionDefinition.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
			name = "A_RUD_COD",
			fkFieldName = "RUD_ID",
			primaryDtDefinitionName = "DT_RULE_DEFINITION",
			primaryIsNavigable = false,
			primaryRole = "RuleDefinition",
			primaryLabel = "RuleDefinition",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DT_RULE_CONDITION_DEFINITION",
			foreignIsNavigable = true,
			foreignRole = "RuleConditionDefinition",
			foreignLabel = "RuleConditionDefinition",
			foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForSimpleAssociation getRuleConditionDefinitionDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURIForSimpleAssociation(this, "A_RUD_COD", "RuleConditionDefinition");
	}

	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
