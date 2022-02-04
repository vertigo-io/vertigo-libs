/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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

import io.vertigo.datamodel.structure.model.DtObject;

final class CriteriaUtil {

	private CriteriaUtil() {
		//
	}

	//Comment gérer la prorité des opérations ?
	static <D extends DtObject> Criteria<D> and(final Criteria<D> leftOperand, final Criteria<D> rightOperand) {
		//if exp*c
		//	when a*b*c
		//		then *(exp.operands, c)
		//	when a+b*c
		//		then +(exp.operands.left, *(exp.operands.left, c))
		if (leftOperand instanceof CriteriaExpression && rightOperand instanceof Criterion) {
			final CriteriaExpression<D> criteria = CriteriaExpression.class.cast(leftOperand);
			return switch (criteria.getOperator()) {
				case AND -> new CriteriaExpression<>(CriteriaLogicalOperator.AND, criteria.getOperands(), rightOperand);
				case OR -> {
					//the most complex case !  a+b*c => a + (b*c)
					final Criteria<D>[] leftOperands = new Criteria[criteria.getOperands().length - 1];
					for (int i = 0; i < criteria.getOperands().length - 1; i++) {
						leftOperands[i] = criteria.getOperands()[i];
					}
					yield new CriteriaExpression<>(CriteriaLogicalOperator.OR, leftOperands, and(criteria.getOperands()[criteria.getOperands().length - 1], rightOperand));
				}
				default -> throw new IllegalStateException();
			};
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
