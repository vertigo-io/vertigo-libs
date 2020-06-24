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
import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Builder;

/**
 * Builder for an audit trace
 * @author xdurand
 *
 */
public final class TraceBuilder implements Builder<Trace> {
	private final String myCategory;
	private final String myUser;
	private Instant myBusinessDate;
	private final Instant myExecutionDate;
	private final Long myItem;
	private final String myMessage;
	private String myContext;

	/**
	 * Builder for AuditTrace
	 * @param id
	 * @param category
	 * @param user
	 * @param item
	 */
	public TraceBuilder(final String category, final String user, final Long item, final String message) {
		Assertion.check()
				.notNull(item)
				.isNotBlank(category)
				.isNotBlank(user);
		//---
		myCategory = category;
		myUser = user;
		myMessage = message;
		myItem = item;
		myExecutionDate = Instant.now();
	}

	/**
	 * Optionnal business date
	 * @param dateBusiness
	 * @return the builder (for fluent style)
	 */
	public TraceBuilder withDateBusiness(final Instant dateBusiness) {
		Assertion.check().notNull(dateBusiness);
		//---
		myBusinessDate = dateBusiness;
		return this;
	}

	/**
	 * Optionnal context
	 * @param context context for metadata
	 * @return the builder (for fluent style)
	 */
	public TraceBuilder withContext(final List<String> context) {
		Assertion.check()
				.notNull(context)
				.argument(context.isEmpty() == false, "The provided context is empty");
		//---
		myContext = context
				.stream()
				.collect(Collectors.joining("|"));
		return this;
	}

	@Override
	public Trace build() {
		return new Trace(null, myCategory, myUser, myBusinessDate, myExecutionDate, myItem, myMessage, myContext);
	}

}
