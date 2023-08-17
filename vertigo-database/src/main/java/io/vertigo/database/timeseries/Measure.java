/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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

import java.time.Instant;
import java.util.Map;

import io.vertigo.core.lang.Assertion;

/**
 * Measure
 */
public record Measure(
		String measurement,
		Instant instant,
		Map<String, Object> fields,
		Map<String, String> tags) {

	public Measure {
		Assertion.check()
				.isNotBlank(measurement)
				.isNotNull(instant)
				.isTrue(fields.size() > 0, "At least one field is required on a measure");
	}

	/**
	 * Creates a new Point Build build to create a new Point in a fluent manner.
	 *
	 * @param measurement the name of the measurement.
	 * @return the Builder to be able to add further Builder calls.
	 */

	public static MeasureBuilder builder(final String measurement) {
		return new MeasureBuilder(measurement);
	}
}
