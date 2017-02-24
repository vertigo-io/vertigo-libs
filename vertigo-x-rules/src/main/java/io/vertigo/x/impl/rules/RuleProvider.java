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

import java.util.List;

import io.vertigo.core.definition.Definition;
import io.vertigo.core.definition.DefinitionSpace;
import io.vertigo.core.definition.SimpleDefinitionProvider;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DomainBuilder;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtDefinitionBuilder;
import io.vertigo.util.ListBuilder;

/**
 * Provides all the definitions used in the 'Rules' module.
 *
 * @author xdurand
 */
public final class RuleProvider extends SimpleDefinitionProvider {

	@Override
	public List<Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		final Domain domainWorkflowId = new DomainBuilder("DO_X_RULES_ID", DataType.Long).build();
		final Domain domainWorkflowCode = new DomainBuilder("DO_X_RULES_CODE", DataType.String).build();
		final Domain domainWorkflowDate = new DomainBuilder("DO_X_RULES_DATE", DataType.Date).build();
		final Domain domainWorkflowWeakId = new DomainBuilder("DO_X_RULES_WEAK_ID", DataType.Long).build();
		final Domain domainWorkflowLabel = new DomainBuilder("DO_X_RULES_LABEL", DataType.String).build();
		final Domain domainWorkflowField = new DomainBuilder("DO_X_RULES_FIELD", DataType.String).build();
		final Domain domainWorkflowOperator = new DomainBuilder("DO_X_RULES_OPERATOR", DataType.String).build();
		final Domain domainWorkflowExpression = new DomainBuilder("DO_X_RULES_EXPRESSION", DataType.String).build();

		final DtDefinition wfRuleDefinitionDtDefinition = new DtDefinitionBuilder("DT_RULE_DEFINITION")
				.addIdField("ID", "id", domainWorkflowId, false, false)
				.addDataField("CREATION_DATE", "creationDate", domainWorkflowDate, true, true, false, false)
				.addDataField("ITEM_ID", "itemId", domainWorkflowWeakId, true, true, false, false).build();

		final DtDefinitionBuilder wfConditionDefinitionDtDefinitionBuilder = new DtDefinitionBuilder(
				"DT_RULE_CONDITION_DEFINITION").addIdField("ID", "id", domainWorkflowId, false, false)
						.addDataField("FIELD", "field", domainWorkflowField, true, true, false, false)
						.addDataField("OPERATOR", "operator", domainWorkflowOperator, true, true, false, false)
						.addDataField("EXPRESSION", "expression", domainWorkflowExpression, true, true, false, false);

		final DtDefinition wfSelectorDefinitionDtDefinition = new DtDefinitionBuilder("DT_SELECTOR_DEFINITION")
				.addIdField("ID", "id", domainWorkflowId, false, false)
				.addDataField("CREATION_DATE", "creationDate", domainWorkflowDate, true, true, false, false)
				.addDataField("ITEM_ID", "itemId", domainWorkflowWeakId, true, true, false, false).build();

		final DtDefinition wfConditionDefinitionDtDefinition = wfConditionDefinitionDtDefinitionBuilder.build();

		wfConditionDefinitionDtDefinitionBuilder.addForeignKey("RUD_ID", "rudId", domainWorkflowId, true,
				"DO_X_WORKFLOW_ID", false, false);

		return new ListBuilder<Definition>()
				.add(domainWorkflowId)
				.add(domainWorkflowCode)
				.add(domainWorkflowDate)
				.add(domainWorkflowWeakId)
				.add(domainWorkflowLabel)
				.add(wfRuleDefinitionDtDefinition)
				.add(wfConditionDefinitionDtDefinition)
				.add(wfSelectorDefinitionDtDefinition)
				.build();
	}

}
