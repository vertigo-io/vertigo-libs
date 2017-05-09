package io.vertigo.stella.impl.work;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.WrappedException;
import io.vertigo.stella.work.WorkPromise;

/**
 *
 * @author pchretien
 */
final class WorkPromiseImpl implements WorkPromise {
	private final Future internal;

	WorkPromiseImpl(final Future future) {
		Assertion.checkNotNull(future);
		//---
		this.internal = future;
	}

	@Override
	public boolean cancel(final boolean mayInterruptIfRunning) {
		return internal.cancel(mayInterruptIfRunning);
	}

	@Override
	public boolean isCancelled() {
		return internal.isCancelled();
	}

	@Override
	public boolean isDone() {
		return internal.isDone();
	}

	@Override
	public Object get() throws InterruptedException, ExecutionException {
		return internal.get();
	}

	@Override
	public Object get(final long timeout, final TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException {
		return internal.get(timeout, unit);
	}

	@Override
	public Object join() {
		try {
			return internal.get();
		} catch (final ExecutionException | InterruptedException e) {
			if (e.getCause() instanceof RuntimeException) {
				throw (RuntimeException) e.getCause();
			}
			throw WrappedException.wrap(e.getCause());
		}
	}

}
