/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.commons.impl.transaction.listener;

/**
 * This class is used to listen events during the execution of the transaction.
 *
 * @author npiedeloup
 */
public interface VTransactionListener {
	/**
	 * Notifies the start of the transaction.
	 */
	void onStart();

	/**
	 * Notifies the end of the transaction.
	 * This method is called on commit or rollback.
	 *
	 * @param commitSucceeded if the transaction has been committed successfully
	 * @param elapsedTimeMs the elapse time in ms
	 */
	void onFinish(boolean commitSucceeded, long elapsedTimeMs);

	/**
	 * @param th the error
	 */
	void logAfterCommitError(Throwable th);
}
