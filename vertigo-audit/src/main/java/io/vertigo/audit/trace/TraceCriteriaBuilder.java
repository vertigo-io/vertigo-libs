/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.audit.trace;

import java.time.Instant;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Builder;

/**
 * Fluent Builder for a audit trace
 * @author xdurand
 *
 */
public final class TraceCriteriaBuilder implements Builder<TraceCriteria> {
	private String myCategory;
	private String myUsername;
	private Instant myStartBusinessDate;
	private Instant myEndBusinessDate;
	private Instant myStartExecutionDate;
	private Instant myEndExecutionDate;
	private Long myItem;

	/**
	 * Optionnal category
	 * @param category
	 * @return the builder (for fluent style)
	 */
	public TraceCriteriaBuilder withCategory(final String category) {
		Assertion.checkNotNull(category);
		//---
		myCategory = category;
		return this;
	}

	/**
	 * Optionnal user
	 * @param username
	 * @return the builder (for fluent style)
	 */
	public TraceCriteriaBuilder withUsername(final String username) {
		Assertion.checkNotNull(username);
		//---
		myUsername = username;
		return this;
	}

	/**
	 * Optionnal starting business date range
	 * @param startBusinessDate
	 * @return the builder (for fluent style)
	 */
	public TraceCriteriaBuilder withDateBusinessStart(final Instant startBusinessDate) {
		Assertion.checkNotNull(startBusinessDate);
		//---
		myStartBusinessDate = startBusinessDate;
		return this;
	}

	/**
	 * Optionnal ending business date range
	 * @param endBusinessDate
	 * @return the builder (for fluent style)
	 */
	public TraceCriteriaBuilder withDateBusinessEnd(final Instant endBusinessDate) {
		Assertion.checkNotNull(endBusinessDate);
		//---
		myEndBusinessDate = endBusinessDate;
		return this;
	}

	/**
	 * Optionnal starting execution date range
	 * @param startExecutionDate
	 * @return the builder (for fluent style)
	 */
	public TraceCriteriaBuilder withDateExecutionStart(final Instant startExecutionDate) {
		Assertion.checkNotNull(startExecutionDate);
		//---
		myStartExecutionDate = startExecutionDate;
		return this;
	}

	/**
	 * Optionnal ending business date range
	 * @param endExecutionDate
	 * @return the builder (for fluent style)
	 */
	public TraceCriteriaBuilder withDateExecutionEnd(final Instant endExecutionDate) {
		Assertion.checkNotNull(endExecutionDate);
		//---
		myEndExecutionDate = endExecutionDate;
		return this;
	}

	/**
	 * Optionnal item id
	 * @param item
	 * @return the builder (for fluent style)
	 */
	public TraceCriteriaBuilder withItem(final Long item) {
		Assertion.checkNotNull(item);
		//---
		myItem = item;
		return this;
	}

	@Override
	public TraceCriteria build() {
		return new TraceCriteria(myCategory, myUsername, myStartBusinessDate,
				myEndBusinessDate, myStartExecutionDate, myEndExecutionDate, myItem);
	}

}
