/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.x.plugins.workflow.validate;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.x.impl.workflow.WorkflowPredicateAutoValidatePlugin;
import io.vertigo.x.rules.services.RuleConstants;
import io.vertigo.x.rules.services.RuleContext;
import io.vertigo.x.rules.services.RuleServices;
import io.vertigo.x.workflow.domain.model.WfActivityDefinition;

/**
 *
 * @author xdurand
 *
 */
public final class RuleWorkflowPredicateAutoValidatePlugin implements WorkflowPredicateAutoValidatePlugin {

	@Inject
	private RuleServices ruleServices;

	@Override
	public boolean canAutoValidateActivity(final WfActivityDefinition activityDefinition, final DtObject object) {

		final RuleConstants ruleConstants = ruleServices.getConstants(activityDefinition.getWfwdId());
		final RuleContext ruleContext = new RuleContext(object, ruleConstants);
		return !ruleServices.isRuleValid(activityDefinition.getWfadId(), ruleContext);
	}
}
