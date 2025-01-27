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

import java.util.List;

import io.vertigo.commons.peg.PegParsingValueException;

/**
 * All comparison operators.
 */
public enum PegCompareTerm implements PegTerm {
	// Refacto : see : Equivalent of ValueOperator

	/** Lesser Than or Equals. */
	LTE("<="),
	/** Greater Than or Equals. */
	GTE(">="),
	/** Not Equals. */
	NEQ("!="),
	/** Equals. */
	EQ("="),
	/** Lesser Than. */
	LT("<"),
	/** Greater Than. */
	GT(">");

	private final String str;

	PegCompareTerm(final String str) {
		this.str = str;
	}

	@Override
	public List<String> getStrValues() {
		return List.of(str);
	}

	public static Boolean doCompare(final Object left, final Object right, final PegCompareTerm operator) {
		final Object leftResolved = convertIntegersToLong(left);
		final Object rightResolved = convertIntegersToLong(right);

		if (leftResolved != null && rightResolved != null && leftResolved.getClass() != rightResolved.getClass()) {
			throw new PegParsingValueException("Cannot compare different types", leftResolved, rightResolved, operator.str);
		}

		if (leftResolved instanceof String && operator != EQ && operator != NEQ) {
			throw new PegParsingValueException("Operator '" + operator.str + "' not supported for String", leftResolved, rightResolved, operator.str);
		}

		if (leftResolved == null || rightResolved == null) {
			if (operator == EQ) {
				return leftResolved == rightResolved;
			} else if (operator == NEQ) {
				return leftResolved != rightResolved;
			} else {
				return false;
			}
		}

		final int compareResult;
		if (leftResolved instanceof final Comparable leftResolvedC && rightResolved instanceof final Comparable rightResolvedC) {
			compareResult = leftResolvedC.compareTo(rightResolvedC);
		} else {
			throw new PegParsingValueException("Type '" + leftResolved.getClass() + "' not supported");
		}

		switch (operator) {
			case LTE:
				return compareResult <= 0;
			case GTE:
				return compareResult >= 0;
			case NEQ:
				return compareResult != 0;
			case EQ:
				return compareResult == 0;
			case LT:
				return compareResult < 0;
			case GT:
				return compareResult > 0;
			default:
				throw new PegParsingValueException("Operator '" + operator.str + "' not supported");
		}

	}

	private static Object convertIntegersToLong(final Object o) {
		if (o instanceof final Integer i) {
			return Long.valueOf(i.longValue());
		}
		return o;
	}

}
