package io.vertigo.x.rules;

import io.vertigo.x.impl.rules.RuleContext;

/**
 *
 * @author xdurand
 *
 */
public interface RuleExpressionEvaluator {

	/**
	 * Evaluate an expression
	 * @param expression
	 * @param context
	 * @return the evaluated expression (not parsed)
	 */
	String evaluateExpression(String expression, RuleContext context);

}
