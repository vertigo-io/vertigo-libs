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

import io.vertigo.app.config.DefinitionProviderConfigBuilder;
import io.vertigo.app.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.dynamo.plugins.environment.DynamoDefinitionProvider;
import io.vertigo.x.plugins.workflow.sql.SQLWorkflowStorePlugin;
import io.vertigo.x.plugins.workflow.validate.RuleWorkflowPredicateAutoValidatePlugin;
import io.vertigo.x.workflow.WorkflowManager;
import io.vertigo.x.workflow.dao.instance.WfActivityDAO;
import io.vertigo.x.workflow.dao.instance.WfDecisionDAO;
import io.vertigo.x.workflow.dao.instance.WfStatusDAO;
import io.vertigo.x.workflow.dao.instance.WfWorkflowDAO;
import io.vertigo.x.workflow.dao.model.WfActivityDefinitionDAO;
import io.vertigo.x.workflow.dao.model.WfMultiplicityDefinitionDAO;
import io.vertigo.x.workflow.dao.model.WfTransitionDefinitionDAO;
import io.vertigo.x.workflow.dao.model.WfWorkflowDefinitionDAO;
import io.vertigo.x.workflow.dao.workflow.WorkflowPAO;
import io.vertigo.x.workflow.domain.DtDefinitions;

/**
 * Defines the 'workflow' extension
 *
 * @author xdurand
 */
public final class WorkflowFeatures extends Features {

	/**
	 * Constructor.
	 */
	public WorkflowFeatures() {
		super("x-workflow");
	}

	/**
	 * Specifies the workflowStorePlugin.
	 *
	 * @param params the params
	 * @param workflowPredicateAutoValidatePlugin
	 * @return these features
	 */
	public WorkflowFeatures withWorkflowPredicateAutoValidatePlugin(final Class<? extends WorkflowPredicateAutoValidatePlugin> workflowPredicateAutoValidatePlugin,
			final Param... params) {
		getModuleConfigBuilder().addPlugin(workflowPredicateAutoValidatePlugin, params);
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
	public WorkflowFeatures withWorkflowStorePlugin(final Class<? extends WorkflowStorePlugin> workflowStorePluginClass,
			final Param... params) {
		getModuleConfigBuilder().addPlugin(workflowStorePluginClass, params);
		return this;
	}

	/**
	 * Specifies the workflowStorePlugin.
	 *
	 * @return these features
	 */
	public WorkflowFeatures withDAOSupportWorkflowStorePlugin() {
		getModuleConfigBuilder().withNoAPI()//
				.addPlugin(SQLWorkflowStorePlugin.class) //
				.addPlugin(RuleWorkflowPredicateAutoValidatePlugin.class)
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
				.addDefinitionProvider(new DefinitionProviderConfigBuilder(DynamoDefinitionProvider.class)
						.addDefinitionResource("kpr", "boot/definitions/application-workflow.kpr")
						.addDefinitionResource("classes", DtDefinitions.class.getName())
						.build())
				.addComponent(WorkflowManager.class, WorkflowManagerImpl.class);
	}

}
