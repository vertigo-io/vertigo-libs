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

package io.vertigo.x.impl.workflow;

import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.app.config.DefinitionProvider;
import io.vertigo.app.config.DefinitionSupplier;
import io.vertigo.core.spaces.definiton.Definition;
import io.vertigo.core.spaces.definiton.DefinitionSpace;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DomainBuilder;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtDefinitionBuilder;
import io.vertigo.util.ListBuilder;

/**
 * Provides all the definitions used in the 'Workflow' module.
 * @author xdurand
 */
public final class WorkflowProvider implements DefinitionProvider {

	@Override
	public List<DefinitionSupplier> get(final DefinitionSpace definitionSpace) {
		final Domain domainWorkflowId = new DomainBuilder("DO_X_WORKFLOW_ID", DataType.Long).build();
		final Domain domainWorkflowCode = new DomainBuilder("DO_X_WORKFLOW_CODE", DataType.String).build();
		final Domain domainWorkflowDate = new DomainBuilder("DO_X_WORKFLOW_DATE", DataType.Date).build();
		final Domain domainWorkflowWeakId = new DomainBuilder("DO_X_WORKFLOW_WEAK_ID", DataType.Long).build();
		final Domain domainWorkflowChoice = new DomainBuilder("DO_X_WORKFLOW_CHOICE", DataType.Long).build();
		final Domain domainWorkflowUser = new DomainBuilder("DO_X_WORKFLOW_USER", DataType.String).build();
		final Domain domainWorkflowLabel = new DomainBuilder("DO_X_WORKFLOW_LABEL", DataType.String).build();
		final Domain domainWorkflowComments = new DomainBuilder("DO_X_WORKFLOW_COMMENTS", DataType.String).build();
		final Domain domainWorkflowFlag = new DomainBuilder("DO_X_WORKFLOW_FLAG", DataType.Boolean).build();
		final Domain domainWorkflowLevel = new DomainBuilder("DO_X_WORKFLOW_LEVEL", DataType.Integer).build();

		final DtDefinition wfMultiplicityDefinitionDtDefinition = new DtDefinitionBuilder("DT_WF_MULTIPLICITY_DEFINITION")
				.addIdField("WFMD_CODE", "wfmdCode", domainWorkflowCode, false, false)
				.addDataField("LABEL", "label", domainWorkflowLabel, true, true, false, false)
				.build();

		final DtDefinitionBuilder wfWorkflowDefinitionDtDefinitionBuilder = new DtDefinitionBuilder("DT_WF_WORKFLOW_DEFINITION")
				.addIdField("WFWD_ID", "wfwdId", domainWorkflowId, false, false)
				.addDataField("NAME", "name", domainWorkflowLabel, true, true, true, true)
				.addDataField("DATE", "date", domainWorkflowDate, true, true, false, false);

		final DtDefinitionBuilder wfTransitionDefinitionDtDefinitionBuilder = new DtDefinitionBuilder("DT_WF_TRANSITION_DEFINITION")
				.addIdField("WFTD_ID", "wftdId", domainWorkflowId, false, false)
				.addDataField("NAME", "name", domainWorkflowLabel, true, true, false, false);

		final DtDefinitionBuilder wfActivityDefinitionDtDefinitionBuilder = new DtDefinitionBuilder("DT_WF_ACTIVITY_DEFINITION")
				.addIdField("WFAD_ID", "wfadId", domainWorkflowId, false, false)
				.addDataField("NAME", "name", domainWorkflowLabel, true, true, false, false)
				.addDataField("LEVEL", "level", domainWorkflowLevel, false, true, false, false);

		final DtDefinitionBuilder wfWorkflowDtDefinitionBuilder = new DtDefinitionBuilder("DT_WF_WORKFLOW")
				.addIdField("WFW_ID", "wfwId", domainWorkflowId, false, false)
				.addDataField("CREATION_DATE", "creationDate", domainWorkflowDate, true, true, false, false)
				.addDataField("ITEM_ID", "itemId", domainWorkflowId, false, true, false, false)
				.addDataField("USERNAME", "username", domainWorkflowUser, true, true, false, false)
				.addDataField("USER_LOGIC", "userLogic", domainWorkflowFlag, true, true, false, false);

		final DtDefinitionBuilder wfWorkflowActivityDtDefinitionBuilder = new DtDefinitionBuilder("DT_WF_ACTIVITY")
				.addIdField("WFA_ID", "wfaId", domainWorkflowId, false, false)
				.addDataField("CREATION_DATE", "creationDate", domainWorkflowDate, true, true, false, false);

		final DtDefinitionBuilder wfWorkflowDecisionDtDefinitionBuilder = new DtDefinitionBuilder("DT_WF_DECISION")
				.addIdField("WFE_ID", "wfaId", domainWorkflowId, false, false)
				.addDataField("CREATION_DATE", "creationDate", domainWorkflowDate, true, true, false, false)
				.addDataField("CHOICE", "choice", domainWorkflowChoice, false, true, false, false)
				.addDataField("DECISION_DATE", "decisionDate", domainWorkflowDate, false, true, false, false)
				.addDataField("COMMENTS", "comments", domainWorkflowComments, false, true, false, false)
				.addDataField("USERNAME", "username", domainWorkflowUser, true, true, false, false);

		final DtDefinition wfStatusDtDefinition = new DtDefinitionBuilder("DT_WF_STATUS")
				.addIdField("WFS_CODE", "wfsCode", domainWorkflowCode, false, false)
				.addDataField("LABEL", "label", domainWorkflowLabel, true, true, true, true)
				.build();

		final DtDefinition wfWorkflowDefinitionDtDefinition = wfWorkflowDefinitionDtDefinitionBuilder.build();
		final DtDefinition wfTransitionDefinitionDtDefinition = wfTransitionDefinitionDtDefinitionBuilder.build();
		final DtDefinition wfWorkflowDtDefinition = wfWorkflowDtDefinitionBuilder.build();
		final DtDefinition wfActivityDefinitionDtDefinition = wfActivityDefinitionDtDefinitionBuilder.build();
		final DtDefinition wfWorkflowActivityDtDefinition = wfWorkflowActivityDtDefinitionBuilder.build();
		final DtDefinition wfWorkflowDecisionDtDefinition = wfWorkflowDecisionDtDefinitionBuilder.build();

		wfWorkflowDefinitionDtDefinitionBuilder
				.addForeignKey("WFAD_ID", "wfadId", domainWorkflowId, true, "DO_X_WORKFLOW_ID", false, false);

		wfTransitionDefinitionDtDefinitionBuilder
				.addForeignKey("WFWD_ID", "wfwdId", domainWorkflowId, true, "DO_X_WORKFLOW_ID", false, false)
				.addForeignKey("WFAD_ID_FROM", "wfadIdFrom", domainWorkflowId, true, "DO_X_WORKFLOW_ID", false, false)
				.addForeignKey("WFAD_ID_TO", "wfadIdTo", domainWorkflowId, true, "DO_X_WORKFLOW_ID", false, false);

		wfWorkflowDtDefinitionBuilder
				.addForeignKey("WFWD_ID", "wfwdId", domainWorkflowId, true, "DO_X_WORKFLOW_ID", false, false)
				.addForeignKey("WFS_CODE", "wfsCode", domainWorkflowId, true, "DO_X_WORKFLOW_ID", false, false)
				.addForeignKey("WFA_ID", "wfaId", domainWorkflowId, false, "DO_X_WORKFLOW_ID", false, false);

		wfWorkflowActivityDtDefinitionBuilder
				.addForeignKey("WFW_ID", "wfwId", domainWorkflowId, true, "DO_X_WORKFLOW_ID", false, false)
				.addForeignKey("WFAD_ID", "wfadId", domainWorkflowId, true, "DO_X_WORKFLOW_ID", false, false);

		wfActivityDefinitionDtDefinitionBuilder
				.addForeignKey("WFMD_CODE", "wfmdCode", domainWorkflowCode, true, "DO_X_WORKFLOW_CODE", false, false)
				.addForeignKey("WFWD_ID", "wfwdId", domainWorkflowId, true, "DO_X_WORKFLOW_ID", false, false);

		wfWorkflowDecisionDtDefinitionBuilder
				.addForeignKey("WFA_ID", "wfaId", domainWorkflowId, true, "DO_X_WORKFLOW_ID", false, false);

		return new ListBuilder<Definition>()
				.add(domainWorkflowId)
				.add(domainWorkflowCode)
				.add(domainWorkflowDate)
				.add(domainWorkflowWeakId)
				.add(domainWorkflowChoice)
				.add(domainWorkflowUser)
				.add(domainWorkflowLabel)
				.add(domainWorkflowComments)
				.add(domainWorkflowFlag)
				.add(domainWorkflowLevel)
				.add(wfWorkflowActivityDtDefinition)
				.add(wfWorkflowDecisionDtDefinition)
				.add(wfStatusDtDefinition)
				.add(wfWorkflowDtDefinition)
				.add(wfActivityDefinitionDtDefinition)
				.add(wfMultiplicityDefinitionDtDefinition)
				.add(wfTransitionDefinitionDtDefinition)
				.add(wfWorkflowDefinitionDtDefinition)
				.build()
				.stream()
				.map(definition -> (DefinitionSupplier) dS -> definition)
				.collect(Collectors.toList());
	}

}
