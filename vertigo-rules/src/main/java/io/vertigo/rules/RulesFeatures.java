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
package io.vertigo.rules;

import io.vertigo.app.config.DefinitionProviderConfig;
import io.vertigo.app.config.Feature;
import io.vertigo.app.config.Features;
import io.vertigo.dynamo.plugins.environment.DynamoDefinitionProvider;
import io.vertigo.rules.dao.RuleConditionDefinitionDAO;
import io.vertigo.rules.dao.RuleDefinitionDAO;
import io.vertigo.rules.dao.RuleFilterDefinitionDAO;
import io.vertigo.rules.dao.SelectorDefinitionDAO;
import io.vertigo.rules.domain.DtDefinitions;
import io.vertigo.rules.impl.services.RuleServicesImpl;
import io.vertigo.rules.plugins.selector.simple.SimpleRuleSelectorPlugin;
import io.vertigo.rules.plugins.store.memory.MemoryRuleConstantsStorePlugin;
import io.vertigo.rules.plugins.store.memory.MemoryRuleStorePlugin;
import io.vertigo.rules.plugins.store.sql.SQLRuleStorePlugin;
import io.vertigo.rules.plugins.validator.simple.SimpleRuleValidatorPlugin;
import io.vertigo.rules.services.RuleServices;

/**
 * Defines the 'workflow' extension
 *
 * @author xdurand
 */
public final class RulesFeatures extends Features<RulesFeatures> {

	/**
	 * Constructor.
	 */
	public RulesFeatures() {
		super("vertigo-rules");
	}

	@Feature("rules.store.sql")
	public RulesFeatures withSqlRuleStore() {
		getModuleConfigBuilder()
				.addComponent(RuleConditionDefinitionDAO.class)//
				.addComponent(RuleDefinitionDAO.class)//
				.addComponent(SelectorDefinitionDAO.class)//
				.addComponent(RuleFilterDefinitionDAO.class)//
				.addPlugin(SQLRuleStorePlugin.class);
		return this;
	}

	@Feature("rules.store.memory")
	public RulesFeatures withMemoryRuleStore() {
		getModuleConfigBuilder().addPlugin(MemoryRuleStorePlugin.class);
		return this;
	}

	@Feature("rules.constantStore.memory")
	public RulesFeatures withMemoryRuleConstantsStore() {
		getModuleConfigBuilder().addPlugin(MemoryRuleConstantsStorePlugin.class);
		return this;
	}

	@Feature("rules.selector.simple")
	public RulesFeatures withSimpleRuleSelector() {
		getModuleConfigBuilder().addPlugin(SimpleRuleSelectorPlugin.class);
		return this;
	}

	@Feature("rules.validator.simple")
	public RulesFeatures withSimpleRuleValidator() {
		getModuleConfigBuilder().addPlugin(SimpleRuleValidatorPlugin.class);
		return this;
	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addDefinitionProvider(DefinitionProviderConfig.builder(DynamoDefinitionProvider.class)
						.addDefinitionResource("kpr", "io/vertigo/rules/definitions/application-rules.kpr")
						.addDefinitionResource("classes", DtDefinitions.class.getName())
						.build())
				.addComponent(RuleServices.class, RuleServicesImpl.class);
	}

}
