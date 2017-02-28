package io.vertigo.x.plugins.workflow.validate;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.x.impl.rules.RuleConstants;
import io.vertigo.x.impl.workflow.WorkflowPredicateAutoValidatePlugin;
import io.vertigo.x.rules.RuleManager;
import io.vertigo.x.workflow.domain.model.WfActivityDefinition;

/**
 *
 * @author xdurand
 *
 */
public final class RuleWorkflowPredicateAutoValidatePlugin implements WorkflowPredicateAutoValidatePlugin {

	@Inject
	private RuleManager ruleManager;

	@Override
	public boolean canAutoValidateActivity(final WfActivityDefinition activityDefinition, final DtObject object) {

		final RuleConstants ruleConstants = ruleManager.getConstants(activityDefinition.getWfwdId());

		return !ruleManager.isRuleValid(activityDefinition.getWfadId(), object, ruleConstants);
	}
}
