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

package io.vertigo.x.rules;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * This class defines the Rule definition for an Object.
 *
 * @author xdurand
 */
public final class RuleConditionDefinition implements Entity {
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

	@Field(domain = "DO_ID", type = "FOREIGN_KEY", label = "RuleDefinition")
	private Long rudId;

	/**
	 * @param id
	 * @param field
	 * @param operator
	 * @param expression
	 * @param rudId
	 */
	public RuleConditionDefinition(final Long id, final String field, final String operator, final String expression, final Long rudId) {
		super();
		this.id = id;
		this.field = field;
		this.operator = operator;
		this.expression = expression;
		this.rudId = rudId;
	}

	/** {@inheritDoc} */
	@Override
	public URI<RuleConditionDefinition> getURI() {
		return DtObjectUtil.createURI(this);
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
	 *
	 * @param rudId
	 */
	public void setRudId(final Long rudId) {
		this.rudId = rudId;
	}

	/**
	 * @return the rudId
	 */
	public Long getRudId() {
		return rudId;
	}

}
