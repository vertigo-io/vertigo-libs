package io.vertigo.x.plugins.workflow.validate;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.x.impl.workflow.WorkflowPredicateAutoValidatePlugin;
import io.vertigo.x.rules.services.RuleConstants;
import io.vertigo.x.rules.services.RuleServices;
import io.vertigo.x.workflow.domain.model.WfActivityDefinition;

/**
 *
 * @author xdurand
 *
 */
public final class RuleWorkflowPredicateAutoValidatePlugin implements WorkflowPredicateAutoValidatePlugin {

	@Inject
	private RuleServices ruleManager;

	@Override
	public boolean canAutoValidateActivity(final WfActivityDefinition activityDefinition, final DtObject object) {

		final RuleConstants ruleConstants = ruleManager.getConstants(activityDefinition.getWfwdId());

		return !ruleManager.isRuleValid(activityDefinition.getWfadId(), object, ruleConstants);
	}
}
