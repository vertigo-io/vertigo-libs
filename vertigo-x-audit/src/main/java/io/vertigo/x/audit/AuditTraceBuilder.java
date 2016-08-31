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
import java.util.List;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;

/**
 * Builder for an audit trace
 * @author xdurand
 *
 */
public class AuditTraceBuilder implements Builder<AuditTrace> {

	private Long id;
	private final String category;
	private final String user;
	private Date businessDate;
	private final Date executionDate;
	private final Long item;
	private final String message;
	private String myContext;

	/**
	 * Builder for AuditTrace
	 * @param id
	 * @param category
	 * @param user
	 * @param item
	 */
	AuditTraceBuilder(final String category, final String user, final Long item, final String message) {
		Assertion.checkNotNull(item);
		Assertion.checkArgNotEmpty(category);
		Assertion.checkArgNotEmpty(user);
		//---
		this.category = category;
		this.user = user;
		this.message = message;
		this.item = item;
		executionDate = new Date();
	}

	/**
	 * Optionnal business date
	 * @param dateBusiness
	 * @return the builder (for fluent style)
	 */
	public AuditTraceBuilder withDateBusiness(final Date dateBusiness) {
		Assertion.checkNotNull(dateBusiness);
		//---
		businessDate = dateBusiness;
		return this;
	}

	/**
	 * Optionnal business date
	 * @param context context for metadata
	 * @return the builder (for fluent style)
	 */
	public AuditTraceBuilder withContext(final List<String> context) {
		Assertion.checkNotNull(context);
		Assertion.checkArgument(context.isEmpty() == false, "The provided context is empty");
		//---
		final StringBuilder sb = new StringBuilder();
		for (final String string : context) {
			sb.append(string).append("|");
		}
		this.myContext = sb.toString();
		return this;
	}

	@Override
	public AuditTrace build() {
		return new AuditTrace(id, category, user, businessDate, executionDate, item, message, myContext);
	}

}
