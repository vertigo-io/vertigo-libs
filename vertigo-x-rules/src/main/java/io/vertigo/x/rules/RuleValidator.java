package io.vertigo.x.rules;

import java.util.List;

import io.vertigo.x.impl.rules.RuleContext;
import io.vertigo.x.impl.rules.RuleDefinition;

/**
 *
 * @author xdurand
 *
 */
public interface RuleValidator {

	/**
	 * Validate a rulle for an activity
	 * @param idActivityDefinition
	 * @param rules
	 * @param ruleContext
	 * @return true is the rule is valid, false otherwise
	 */
	boolean isRuleValid(Long idActivityDefinition, final List<RuleDefinition> rules, RuleContext ruleContext);

}
