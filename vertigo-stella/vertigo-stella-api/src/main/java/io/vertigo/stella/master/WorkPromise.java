package io.vertigo.stella.master;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

/**
 * This class is a java Promise.
 *
 * Java implements the concept of promise with {@link CompletableFuture} which is far too complex.
 * Only the interesting methods are kept.
 *
 * @author pchretien
 *
 * @param <R> the result
 */
public interface WorkPromise<R> extends Future<R> {
	/**
	 * @see CompletableFuture#join
	 * @return Result without exception
	 */
	R join();
}
