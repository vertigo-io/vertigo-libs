package io.vertigo.x.impl.rules;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;

/**
 * This class defines the Rule definition for an Object.
 *
 * @author xdurand
 */
@DtDefinition
public final class RuleConditionDefinition implements Entity {
	/**
	 *
	 */
	private static final long serialVersionUID = 2280022920606418634L;

	@Field(type = "ID", domain = "DO_X_RULES_ID", required = true, label = "id")
	private final Long id;

	@Field(domain = "DO_X_RULES_FIELD", label = "field")
	private final String field;

	@Field(domain = "DO_X_RULES_OPERATOR", label = "operator")
	private final String operator;

	@Field(domain = "DO_X_RULES_EXPRESSION", label = "expression")
	private final String expression;

	@Field(domain = "DO_ID", type = "FOREIGN_KEY", label = "RuleDefinition")
	private final Long rudId;

	/**
	 * @param id
	 * @param field
	 * @param operator
	 * @param expression
	 */
	public RuleConditionDefinition(final Long id, final String field, final String operator, final String expression, final Long rudId) {
		super();
		this.id = id;
		this.field = field;
		this.operator = operator;
		this.expression = expression;
		this.rudId = rudId;
	}


	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}


	/**
	 * @return the field
	 */
	public String getField() {
		return field;
	}


	/**
	 * @return the operator
	 */
	public String getOperator() {
		return operator;
	}


	/**
	 * @return the expression
	 */
	public String getExpression() {
		return expression;
	}


}


