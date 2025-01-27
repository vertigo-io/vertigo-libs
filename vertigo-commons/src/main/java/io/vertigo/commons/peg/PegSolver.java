package io.vertigo.commons.peg;

import java.util.function.Function;

/**
 * Generic interface for a solver that uses a function to transform raw data into a qualified value and then returns a result.
 *
 * @param <S> Raw data type
 * @param <I> Qualified data type
 * @param <R> Result type
 * @author skerdudou
 */
public interface PegSolver<S, I, R> extends Function<Function<S, I>, R> {
}
