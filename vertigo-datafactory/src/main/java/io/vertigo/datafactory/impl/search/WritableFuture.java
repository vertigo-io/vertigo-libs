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
package io.vertigo.datafactory.impl.search;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.function.Consumer;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VSystemException;

/**
 * WritableFuture for set result after execution.
 *
 * @see "org.apache.http.concurrent.BasicFuture"
 * @author npiedeloup
 * @param <V> Result type
 */
public final class WritableFuture<V> implements Future<V> {

	private static final Logger LOGGER = LogManager.getLogger(WritableFuture.class);

	private volatile boolean completed;
	private volatile boolean cancelled;
	private volatile long progress;
	private volatile V futureResult; //volatile used for reference of unmutable object
	private volatile Exception futureException; //volatile used for reference of unmutable object
	private final List<Consumer<? super WritableFuture<V>>> completionConsumers = new ArrayList<>();

	/** {@inheritDoc} */
	@Override
	public boolean isCancelled() {
		return cancelled;
	}

	/** {@inheritDoc} */
	@Override
	public boolean isDone() {
		return completed;
	}

	public long getProgress() {
		return progress;
	}

	public void setProgress(final long progress) {
		this.progress = progress;
	}

	/**
	 * Adds a callback that runs when the future completes, whether it succeeds, fails, or is cancelled.
	 * Any exception thrown by the callback is logged and ignored; use try/catch yourself if you need custom handling or use a dedicated thread to wait for this future completion and add your custom
	 * logic in this thread.
	 */
	public WritableFuture<V> onComplete(final Consumer<? super WritableFuture<V>> consumer) {
		Assertion.check().isNotNull(consumer, "Completion consumer must not be null");
		//-----
		synchronized (this) {
			if (!completed) {
				completionConsumers.add(consumer);
				return this;
			}
		}
		try {
			consumer.accept(this);
		} catch (final RuntimeException e) {
			LOGGER.warn("Completion consumer threw an exception", e);
		}
		return this;
	}

	/** {@inheritDoc} */
	@Override
	public synchronized V get() throws InterruptedException, ExecutionException {
		while (!completed) {
			wait();
		}
		return getResult();
	}

	/** {@inheritDoc} */
	@Override
	public synchronized V get(final long timeout, final TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException {
		Assertion.check().isNotNull(unit, "Time unit was null");
		//-----
		final long msecs = unit.toMillis(timeout);
		final long startTime = msecs <= 0 ? 0 : System.currentTimeMillis();
		long waitTime = msecs;
		if (completed) {
			return getResult();
		} else if (waitTime <= 0) {
			throw new TimeoutException();
		} else {
			for (;;) {
				wait(waitTime); //wait until timeout, if success or fail : waiting is interrupted by notifyAll()
				if (completed) {
					return getResult();
				}
				waitTime = msecs - (System.currentTimeMillis() - startTime);
				if (waitTime <= 0) {
					throw new TimeoutException();
				}
			}
		}
	}

	/** {@inheritDoc} */
	@Override
	public boolean cancel(final boolean mayInterruptIfRunning) {
		synchronized (this) {
			if (completed) {
				return false; //@see Future api
			}
			completed = true;
			cancelled = true;
			notifyAll();
		}
		runConsumers();
		return true;
	}

	/**
	 * Mark this execution as success.
	 *
	 * @param result Result of execution
	 */
	public void success(final V result) {
		synchronized (this) {
			Assertion.check().isFalse(completed, "Task already completed");
			//-----
			completed = true;
			futureResult = result;
			notifyAll();
		}
		runConsumers();
	}

	/**
	 * Mark this execution as failed.
	 *
	 * @param exception Failure reason
	 */
	public void fail(final Exception exception) {
		synchronized (this) {
			Assertion.check().isFalse(completed, "Task already completed");
			//-----
			completed = true;
			futureException = exception;
			notifyAll();
		}
		runConsumers();
	}

	private V getResult() throws ExecutionException {
		if (futureException != null) {
			throw new ExecutionException(futureException);
		}
		if (cancelled) {
			throw new VSystemException("No result as task was cancelled.");
		}
		return futureResult;
	}

	private void runConsumers() {
		final List<Consumer<? super WritableFuture<V>>> consumersToRun;
		synchronized (this) {
			consumersToRun = new ArrayList<>(completionConsumers);
			completionConsumers.clear();
		}
		for (final Consumer<? super WritableFuture<V>> completionConsumer : consumersToRun) {
			try {
				completionConsumer.accept(this);
			} catch (final RuntimeException e) {
				LOGGER.warn("Completion consumer threw an exception", e);
			}
		}
	}

}
