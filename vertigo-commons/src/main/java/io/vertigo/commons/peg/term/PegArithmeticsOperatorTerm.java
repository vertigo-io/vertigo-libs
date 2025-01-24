/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.commons.peg.term;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.function.BinaryOperator;

import io.vertigo.commons.peg.PegOperatorTerm;
import io.vertigo.commons.peg.PegParsingValueException;

/**
 * All boolean operators.
 */
public enum PegArithmeticsOperatorTerm implements PegOperatorTerm<Object> {
	PLUS(1, "+"),
	MINUS(1, "-"),
	MULTIPLY(2, "*"),
	DIVIDE(2, "/");

	private final String str;
	private final int priority;
	private final BinaryOperator<Object> binaryOperator;

	PegArithmeticsOperatorTerm(final int priority, final String str) {
		this.priority = priority;
		this.str = str;

		binaryOperator = (a, b) -> doArithmetics(a, b, this);
	}

	@Override
	public List<String> getStrValues() {
		return Arrays.asList(str);
	}

	@Override
	public int getPriority() {
		return priority;
	}

	@Override
	public Object apply(final Object left, final Object right) {
		return binaryOperator.apply(left, right);
	}

	private static Object doArithmetics(final Object left, final Object right, final PegArithmeticsOperatorTerm operator) {
		if (left.getClass() != right.getClass()) {
			throw new PegParsingValueException("Cannot compute on different types", left, right, operator.getStrValues().get(0));
		}

		if (left instanceof final String leftStr && right instanceof final String rightStr) {
			if (operator != PLUS) {
				throw new PegParsingValueException("Operator '" + operator.str + "' not supported for String", left, right, operator.str);
			}
			return leftStr + rightStr;
		} else if (left instanceof final Integer leftI && right instanceof final Integer rightI) {
			return switch (operator) {
				case PLUS -> leftI + rightI;
				case MINUS -> leftI - rightI;
				case MULTIPLY -> leftI * rightI;
				case DIVIDE -> leftI / rightI;
			};
		} else if (left instanceof final BigDecimal leftD && right instanceof final BigDecimal rightD) {
			return switch (operator) {
				case PLUS -> leftD.add(rightD);
				case MINUS -> leftD.subtract(rightD);
				case MULTIPLY -> leftD.multiply(rightD);
				case DIVIDE -> leftD.divide(rightD);
			};
		}
		// TODO: handle other types (ex dates)
		throw new PegParsingValueException("Type '" + left.getClass().getSimpleName() + "' not supported");
	}
}
