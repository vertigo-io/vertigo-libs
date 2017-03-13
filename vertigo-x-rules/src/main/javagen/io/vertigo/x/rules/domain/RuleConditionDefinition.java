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
package io.vertigo.x.rules.domain;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données RuleConditionDefinition
 */
public final class RuleConditionDefinition implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long id;
	private String field;
	private String operator;
	private String expression;
	private Long rudId;

	/** {@inheritDoc} */
	@Override
	public URI<RuleConditionDefinition> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'id'.
	 * @return Long id <b>Obligatoire</b>
	 */
	@Field(domain = "DO_X_RULES_ID", type = "ID", required = true, label = "id")
	public Long getId() {
		return id;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'id'.
	 * @param id Long <b>Obligatoire</b>
	 */
	public void setId(final Long id) {
		this.id = id;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'field'.
	 * @return String field
	 */
	@Field(domain = "DO_X_RULES_FIELD", label = "field")
	public String getField() {
		return field;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'field'.
	 * @param field String
	 */
	public void setField(final String field) {
		this.field = field;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'operator'.
	 * @return String operator
	 */
	@Field(domain = "DO_X_RULES_OPERATOR", label = "operator")
	public String getOperator() {
		return operator;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'operator'.
	 * @param operator String
	 */
	public void setOperator(final String operator) {
		this.operator = operator;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'expression'.
	 * @return String expression
	 */
	@Field(domain = "DO_X_RULES_EXPRESSION", label = "expression")
	public String getExpression() {
		return expression;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'expression'.
	 * @param expression String
	 */
	public void setExpression(final String expression) {
		this.expression = expression;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'RuleDefinition'.
	 * @return Long rudId
	 */
	@Field(domain = "DO_X_RULES_ID", type = "FOREIGN_KEY", label = "RuleDefinition")
	public Long getRudId() {
		return rudId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'RuleDefinition'.
	 * @param rudId Long
	 */
	public void setRudId(final Long rudId) {
		this.rudId = rudId;
	}

	// Association : RuleDefinition non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
