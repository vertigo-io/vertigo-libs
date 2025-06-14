/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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

import java.util.Arrays;
import java.util.function.BinaryOperator;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.data.model.DataObject;

final class CriteriaExpression<D extends DataObject> extends Criteria<D> {
	private static final long serialVersionUID = 8301054336845536973L;

	private final CriteriaLogicalOperator operator;
	private final Criteria<D>[] operands;

	CriteriaExpression(final CriteriaLogicalOperator operator, final Criteria<D>[] leftOperands, final Criteria<D> rightOperand) {
		Assertion.check()
				.isNotNull(operator)
				.isNotNull(leftOperands);
		//---
		this.operator = operator;
		final int size = leftOperands.length + 1;
		this.operands = new Criteria[size];
		System.arraycopy(leftOperands, 0, this.operands, 0, leftOperands.length);
		this.operands[size - 1] = rightOperand;
	}

	CriteriaExpression(final CriteriaLogicalOperator operator, final Criteria<D> leftOperand, final Criteria<D> rightOperand) {
		Assertion.check()
				.isNotNull(operator)
				.isNotNull(leftOperand);
		//---
		this.operator = operator;
		this.operands = new Criteria[] { leftOperand, rightOperand };
	}

	CriteriaLogicalOperator getOperator() {
		return operator;
	}

	Criteria<D>[] getOperands() {
		return operands;
	}

	@Override
	public Predicate<D> toPredicate() {
		final BinaryOperator<Predicate<D>> accumulator = switch (operator) {
			case OR -> Predicate::or;
			case AND -> Predicate::and;
		};
		return Arrays.stream(operands)
				.map(Criteria::toPredicate)
				.reduce(accumulator)
				.orElseThrow(IllegalAccessError::new);
	}

	@Override
	String toString(final CriteriaCtx ctx, final CriteriaEncoder criteriaEncoder) {
		return Arrays.stream(operands)
				.map(operand -> operand.toString(ctx, criteriaEncoder))
				.collect(Collectors.joining(" " + criteriaEncoder.encodeLogicalOperator(operator) + " ", criteriaEncoder.getExpressionStartDelimiter(), criteriaEncoder.getExpressionEndDelimiter()));
	}
}
