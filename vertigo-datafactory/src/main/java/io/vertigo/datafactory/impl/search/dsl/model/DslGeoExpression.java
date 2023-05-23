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
package io.vertigo.datafactory.impl.search.dsl.model;

import io.vertigo.core.lang.Assertion;

/**
 * One geo expression.
 * A geo query is many DslGeoExpression.
 * @author npiedeloup
 */
public final class DslGeoExpression {
	private final DslField field;
	private final DslQuery geoQuery;

	/**
	 *
	 * @param field
	 * @param geoQuery
	 */
	public DslGeoExpression(
			final DslField field,
			final DslQuery geoQuery) {
		Assertion.check()
				.isNotNull(field)
				.isNotNull(geoQuery)
				.isTrue(geoQuery instanceof DslGeoDistanceQuery || geoQuery instanceof DslGeoRangeQuery, "GeoExpression only support distance or boundingbox queries ({0})", geoQuery);
		//-----
		this.field = field;
		this.geoQuery = geoQuery;
	}

	/**
	 * @return field
	 */
	public DslField getField() {
		return field;
	}

	/**
	 * @return geoQuery
	 */
	public DslQuery getGeoQuery() {
		return geoQuery;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return field +
				":" +
				geoQuery;
	}
}
