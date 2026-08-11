/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.commons.peg;

/**
 * Generic interface for a solver that uses a function to transform raw data into a qualified value and then returns a result.
 *
 * @param <S> Raw data type
 * @param <I> Qualified data type
 * @param <R> Result type
 * @author skerdudou
 */
@FunctionalInterface
public interface PegSolver<S, I, R> {

	R apply(PegSolverFunction<S, I> t) throws PegParsingValueException;

	@FunctionalInterface
	public interface PegSolverFunction<S, I> {

		I apply(S t) throws PegParsingValueException;

		static <T> PegSolverFunction<T, T> identity() {
			return t -> t;
		}

	}

	/**
	 * Forward the PegSolverFunction to the nested solver and return the PegSolver resolving both levels.
	 *
	 * @param nestedSolver the nested solver
	 * @param <S> Raw data type
	 * @param <I> Qualified data type
	 * @param <I2> Nested qualified data type
	 * @param <R> Result type
	 * @return the solver that resolve both levels
	 */
	public static <S, I, I2, R> PegSolver<S, I, R> flattenSolvers(final PegSolver<PegSolver<S, I, I2>, I2, R> nestedSolver) {
		return f -> nestedSolver.apply(f2 -> f2.apply(f));
	}
}
