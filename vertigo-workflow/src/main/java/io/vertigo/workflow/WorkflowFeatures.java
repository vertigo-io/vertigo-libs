/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.workflow;

import io.vertigo.app.config.DefinitionProviderConfig;
import io.vertigo.app.config.Feature;
import io.vertigo.app.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.dynamo.plugins.environment.DynamoDefinitionProvider;
import io.vertigo.workflow.dao.instance.WfActivityDAO;
import io.vertigo.workflow.dao.instance.WfDecisionDAO;
import io.vertigo.workflow.dao.instance.WfStatusDAO;
import io.vertigo.workflow.dao.instance.WfWorkflowDAO;
import io.vertigo.workflow.dao.model.WfActivityDefinitionDAO;
import io.vertigo.workflow.dao.model.WfMultiplicityDefinitionDAO;
import io.vertigo.workflow.dao.model.WfTransitionDefinitionDAO;
import io.vertigo.workflow.dao.model.WfWorkflowDefinitionDAO;
import io.vertigo.workflow.dao.workflow.WorkflowPAO;
import io.vertigo.workflow.domain.DtDefinitions;
import io.vertigo.workflow.impl.services.ItemStorePlugin;
import io.vertigo.workflow.impl.services.WorkflowManagerImpl;
import io.vertigo.workflow.plugins.store.memory.MemoryWorkflowStorePlugin;
import io.vertigo.workflow.plugins.store.sql.SQLWorkflowStorePlugin;
import io.vertigo.workflow.plugins.validate.RuleWorkflowPredicateAutoValidatePlugin;
import io.vertigo.workflow.services.WorkflowManager;

/**
 * Defines the 'workflow' extension
 *
 * @author xdurand
 */
public final class WorkflowFeatures extends Features<WorkflowFeatures> {

	/**
	 * Constructor.
	 */
	public WorkflowFeatures() {
		super("vertigo-workflow");
	}

	/**
	 * Specifies the workflowStorePlugin.
	 *
	 * @param params the params
	 * @param workflowPredicateAutoValidatePlugin
	 * @return these features
	 */
	@Feature("workflow.autovalidate.predicate")
	public WorkflowFeatures withRulePredicateAutoValidatePlugin() {
		getModuleConfigBuilder().addPlugin(RuleWorkflowPredicateAutoValidatePlugin.class);
		return this;
	}

	/**
	 * Specifies the workflowStorePlugin.
	 *
	 * @param workflowStorePluginClass
	 *            the type of plugin to use
	 * @param params
	 *            the params
	 * @return these features
	 */
	@Feature("workflow.store.memory")
	public WorkflowFeatures withMemoryWorkflowStorePlugin() {
		getModuleConfigBuilder().addPlugin(MemoryWorkflowStorePlugin.class);
		return this;
	}

	/**
	 * Specifies the workflowStorePlugin.
	 *
	 * @return these features
	 */

	@Feature("workflow.store.db")
	public WorkflowFeatures withDbStorePlugin() {
		getModuleConfigBuilder()
				.addPlugin(SQLWorkflowStorePlugin.class) //
				.addComponent(WfActivityDAO.class) //
				.addComponent(WfWorkflowDAO.class) //
				.addComponent(WfStatusDAO.class) //
				.addComponent(WfDecisionDAO.class)//
				.addComponent(WfActivityDefinitionDAO.class) //
				.addComponent(WfWorkflowDefinitionDAO.class) //
				.addComponent(WfMultiplicityDefinitionDAO.class) //
				.addComponent(WfTransitionDefinitionDAO.class) //
				.addComponent(WorkflowPAO.class);
		return this;
	}

	/**
	 * Specifies the itemStorePlugin.
	 *
	 * @param itemStorePluginClass
	 *            the type of plugin to use
	 * @param params
	 *            the params
	 * @return these features
	 */
	public WorkflowFeatures withItemStorePlugin(final Class<? extends ItemStorePlugin> itemStorePluginClass,
			final Param... params) {
		getModuleConfigBuilder().addPlugin(itemStorePluginClass, params);
		return this;
	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addDefinitionProvider(DefinitionProviderConfig.builder(DynamoDefinitionProvider.class)
						.addDefinitionResource("kpr", "io/vertigo/workflow/definitions/application-workflow.kpr")
						.addDefinitionResource("classes", DtDefinitions.class.getName())
						.build())
				.addComponent(WorkflowManager.class, WorkflowManagerImpl.class);
	}

}
