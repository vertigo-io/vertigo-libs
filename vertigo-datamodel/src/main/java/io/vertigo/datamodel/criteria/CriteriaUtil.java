/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.datamodel.criteria;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.datamodel.structure.model.DtObject;

final class CriteriaUtil {
	private static final Logger LOG = LogManager.getLogger(CriteriaUtil.class);

	private CriteriaUtil() {
		//
	}

	static <D extends DtObject> Criteria<D> and(final Criteria<D> leftOperand, final Criteria<D> rightOperand) {
		//if exp*c
		//	when a*b*c
		//		then *(exp.operands, c)
		//	when a+b*c
		//		then *(exp, c))
		if (leftOperand instanceof CriteriaExpression && rightOperand instanceof Criterion) {
			final CriteriaExpression<D> criteria = CriteriaExpression.class.cast(leftOperand);
			switch (criteria.getOperator()) {
				case AND:
					return new CriteriaExpression<>(CriteriaLogicalOperator.AND, criteria.getOperands(), rightOperand);
				case OR:
					// ! before 3.5.1, there was a bad precedence changing  a+b*c => a + (b * c), now it's (a + b) * c
					//We log a warning for regressions
					LOG.warn("Criteria `({}) AND {}` You may check regressions : `a or b and c` is now `(a or b) and c`, before 3.5.1 it was `a or (b and c)` => ({}) AND {}", leftOperand.toString(), rightOperand.toString());
					return new CriteriaExpression<>(CriteriaLogicalOperator.AND, leftOperand, rightOperand);
				default:
					throw new IllegalStateException();
			}
		}
		return new CriteriaExpression<>(CriteriaLogicalOperator.AND, leftOperand, rightOperand);
	}

	static <D extends DtObject> Criteria<D> or(final Criteria<D> leftOperand, final Criteria<D> rightOperand) {
		//if exp+c
		//	when a*b+c
		//		then +(exp, c)
		//	when a+b+c
		//		then +(exp.operands, c)
		if (leftOperand instanceof CriteriaExpression && rightOperand instanceof Criterion) {
			final CriteriaExpression<D> criteria = CriteriaExpression.class.cast(leftOperand);
			if (criteria.getOperator() == CriteriaLogicalOperator.OR) {
				return new CriteriaExpression<>(CriteriaLogicalOperator.OR, criteria.getOperands(), rightOperand);
			}
		}
		return new CriteriaExpression<>(CriteriaLogicalOperator.OR, leftOperand, rightOperand);
	}
}
