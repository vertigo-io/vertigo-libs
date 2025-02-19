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

import io.vertigo.commons.peg.PegParsingValueException;

/**
 * Interface for all operator terms. Operators have a priority of execution and can be applied to two operands.
 *
 * @param <T> the type of operands used by this operator
 * @author skerdudou
 */
public interface PegOperatorTerm<T> extends PegTerm {

	/**
	 * Get the priority of the operator. Higher is the priority, earlier the operator is executed.
	 *
	 * @return the priority of the operator
	 */
	int getPriority();

	/**
	 * Apply the operator to the two operands.
	 *
	 * @param left the left operand
	 * @param right the right operand
	 * @return the result of the operation
	 * @throws PegParsingValueException if the operator cannot be applied to the operands
	 */
	T apply(T left, T right) throws PegParsingValueException;

}
