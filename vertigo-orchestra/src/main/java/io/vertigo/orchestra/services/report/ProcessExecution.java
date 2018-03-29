/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.orchestra.services.report;

import java.io.Serializable;
import java.util.Date;

import io.vertigo.lang.Assertion;

public final class ProcessExecution implements Serializable {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private final Long preId;
	private final java.util.Date beginTime;
	private final java.util.Date endTime;
	private final Integer executionTime;
	private final String status;
	private final Boolean checked;
	private final java.util.Date checkingDate;
	private final String checkingComment;
	private final Boolean hasLogFile;

	/**
	 * Constructor.
	 * @param preId id of execution
	 * @param beginTime begin time
	 * @param endTime end time
	 * @param executionTime execution time in seconds
	 * @param status status of the execution
	 * @param checked if the execution is check (for errors)
	 * @param checkingDate the date of checking
	 * @param checkingComment the checking comm
	 * @param hasLogFile if the execution has an associated log
	 */
	public ProcessExecution(
			final Long preId,
			final Date beginTime,
			final Date endTime,
			final Integer executionTime,
			final String status,
			final Boolean checked,
			final Date checkingDate,
			final String checkingComment,
			final Boolean hasLogFile) {
		Assertion.checkNotNull(preId);
		// ---
		this.preId = preId;
		this.beginTime = beginTime;
		this.endTime = endTime;
		this.executionTime = executionTime;
		this.status = status;
		this.checked = checked;
		this.checkingDate = checkingDate;
		this.checkingComment = checkingComment;
		this.hasLogFile = hasLogFile;
	}

	public Long getPreId() {
		return preId;
	}

	public java.util.Date getBeginTime() {
		return beginTime;
	}

	public java.util.Date getEndTime() {
		return endTime;
	}

	public Integer getExecutionTime() {
		return executionTime;
	}

	public String getStatus() {
		return status;
	}

	public Boolean getChecked() {
		return checked;
	}

	public java.util.Date getCheckingDate() {
		return checkingDate;
	}

	public String getCheckingComment() {
		return checkingComment;
	}

	public Boolean getHasLogFile() {
		return hasLogFile;
	}

}
