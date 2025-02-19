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
}
