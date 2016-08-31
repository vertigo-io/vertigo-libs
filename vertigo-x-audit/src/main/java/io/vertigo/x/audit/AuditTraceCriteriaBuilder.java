/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2016, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.x.audit;


import java.util.Date;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;

/**
 * Fluent Builder for a audit trace
 * @author xdurand
 *
 */
public final class AuditTraceCriteriaBuilder implements Builder<AuditTraceCriteria> {

	private String myCategory;
	private String myUser;
	private Date myStartBusinessDate;
	private Date myEndBusinessDate;
	private Date myStartExecutionDate;
	private Date myEndExecutionDate;
	private Long myItem;

	/**
	 * Optionnal category
	 * @param category
	 * @return the builder (for fluent style)
	 */
	public AuditTraceCriteriaBuilder withCategory(final String category) {
		Assertion.checkNotNull(category);
		//---
		this.myCategory = category;
		return this;
	}

	/**
	 * Optionnal user
	 * @param user
	 * @return the builder (for fluent style)
	 */
	public AuditTraceCriteriaBuilder withUser(final String user) {
		Assertion.checkNotNull(user);
		//---
		this.myUser = user;
		return this;
	}

	/**
	 * Optionnal starting business date range
	 * @param startBusinessDate
	 * @return the builder (for fluent style)
	 */
	public AuditTraceCriteriaBuilder withDateBusinessStart(final Date startBusinessDate) {
		Assertion.checkNotNull(startBusinessDate);
		//---
		this.myStartBusinessDate = startBusinessDate;
		return this;
	}

	/**
	 * Optionnal ending business date range
	 * @param endBusinessDate
	 * @return the builder (for fluent style)
	 */
	public AuditTraceCriteriaBuilder withDateBusinessEnd(final Date endBusinessDate) {
		Assertion.checkNotNull(endBusinessDate);
		//---
		this.myEndBusinessDate = endBusinessDate;
		return this;
	}

	/**
	 * Optionnal starting execution date range
	 * @param startExecutionDate
	 * @return the builder (for fluent style)
	 */
	public AuditTraceCriteriaBuilder withDateExecutionStart(final Date startExecutionDate) {
		Assertion.checkNotNull(startExecutionDate);
		//---
		this.myStartExecutionDate = startExecutionDate;
		return this;
	}

	/**
	 * Optionnal ending business date range
	 * @param endExecutionDate
	 * @return the builder (for fluent style)
	 */
	public AuditTraceCriteriaBuilder withDateExecutionEnd(final Date endExecutionDate) {
		Assertion.checkNotNull(endExecutionDate);
		//---
		this.myEndExecutionDate = endExecutionDate;
		return this;
	}

	/**
	 * Optionnal item id
	 * @param item
	 * @return the builder (for fluent style)
	 */
	public AuditTraceCriteriaBuilder withItem(final Long item) {
		Assertion.checkNotNull(item);
		//---
		this.myItem = item;
		return this;
	}

	@Override
	public AuditTraceCriteria build() {
		return new AuditTraceCriteria(this.myCategory, this.myUser, this.myStartBusinessDate,
				this.myEndBusinessDate, this.myStartExecutionDate, this.myEndExecutionDate, this.myItem);
	}

}