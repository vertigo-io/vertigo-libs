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
public final class RuleFilterDefinition implements Entity {
	/**
	 *
	 */
	private static final long serialVersionUID = 2280022920606418634L;

	@Field(type = "ID", domain = "DO_X_RULES_ID", required = true, label = "id")
	private Long id;

	@Field(domain = "DO_X_RULES_FIELD", label = "field")
	private final String field;

	@Field(domain = "DO_X_RULES_OPERATOR", label = "operator")
	private final String operator;

	@Field(domain = "DO_X_RULES_EXPRESSION", label = "expression")
	private final String expression;

	@Field(domain = "DO_ID", type = "FOREIGN_KEY", label = "RuleSelectorDefinition")
	private final Long selId;

	/**
	 * @param id
	 * @param field
	 * @param operator
	 * @param expression
	 * @param groupId
	 * @param selId
	 */
	public RuleFilterDefinition(final Long id, final String field, final String operator, final String expression, final Long selId) {
		super();
		this.id = id;
		this.field = field;
		this.operator = operator;
		this.expression = expression;
		this.selId = selId;
	}

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(final Long id) {
		this.id = id;
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

	/**
	 * @return the rudId
	 */
	public Long getSelId() {
		return selId;
	}

}
