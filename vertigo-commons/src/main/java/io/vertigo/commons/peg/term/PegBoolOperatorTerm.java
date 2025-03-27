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

import java.util.Arrays;
import java.util.List;
import java.util.function.BinaryOperator;

/**
 * All boolean operators.
 */
public enum PegBoolOperatorTerm implements PegOperatorTerm<Boolean> {
	OR(1, (a, b) -> a || b, "OR", "Or", "or", "||"),
	AND(2, (a, b) -> a && b, "AND", "And", "and", "&&");

	private final List<String> operators;
	private final int priority;
	private final BinaryOperator<Boolean> binaryOperator;

	PegBoolOperatorTerm(final int priority, final BinaryOperator<Boolean> binaryOperator, final String... operators) {
		this.priority = priority;
		this.binaryOperator = binaryOperator;
		this.operators = Arrays.asList(operators);
	}

	@Override
	public List<String> getStrValues() {
		return operators;
	}

	@Override
	public int getPriority() {
		return priority;
	}

	@Override
	public Boolean apply(final Boolean left, final Boolean right) {
		return binaryOperator.apply(left, right);
	}

}
