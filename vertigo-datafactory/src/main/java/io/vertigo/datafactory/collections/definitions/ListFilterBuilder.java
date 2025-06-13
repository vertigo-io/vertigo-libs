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
package io.vertigo.datafactory.collections.definitions;

import io.vertigo.core.lang.Builder;
import io.vertigo.datafactory.collections.ListFilter;

/**
 * Project specific builder from Criteria to ListFilter.
 * @author npiedeloup
 * @param <C> Criteria type
 */
public interface ListFilterBuilder<C> extends Builder<ListFilter> {

	/**
	 * Build Query.
	 * @param buildQuery Query use by builder
	 * @return this builder
	 */
	ListFilterBuilder<C> withListFilterQuery(String listFilterBuilderQuery);

	/**
	 * Process a criteria to produce a ListFilter.
	 * @param criteria Criteria
	 * @return this builder
	 */
	ListFilterBuilder<C> withCriteria(C criteria);

}
