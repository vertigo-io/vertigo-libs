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
package io.vertigo.database.timeseries;

import java.util.HashMap;
import java.util.Map;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Builder;

/**
 * @author mlaroche
 *
 */
public final class DataFilterBuilder implements Builder<DataFilter> {

	private final String myMeasurement;
	private final Map<String, String> myFilters = new HashMap<>();

	DataFilterBuilder(
			final String measurement) {
		Assertion.check().isNotBlank(measurement);
		//---
		myMeasurement = measurement;
	}

	/**
	 * Add a filter to the data filter
	 * @param field Field name (tag or field)
	 * @param value Value to filter on; <b>null</b> value mean no filter, <b>empty string</b> mean field shouldn't exists, <b>*</b> mean field must exists
	 * @return this builder
	 */
	public DataFilterBuilder addFilter(final String field, final String value) {
		Assertion.check()
				.isNotBlank(field)
				.isNotNull(value);
		//---
		myFilters.put(field, value);
		return this;
	}

	@Override
	public DataFilter build() {
		return new DataFilter(
				myMeasurement,
				myFilters);
	}

}
