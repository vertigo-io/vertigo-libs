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
package io.vertigo.datafactory.impl.search.dsl.model;

import io.vertigo.core.lang.Assertion;

/**
 * Relative geo distance.
 * #(geoPointFieldName)#
 * @author npiedeloup
 */
public final class DslGeoPointCriteria implements DslQuery {
	private final String geoPointFieldName;

	/**
	 * @param geoPointFieldName geoPoint fieldName
	 */
	public DslGeoPointCriteria(final String geoPointFieldName) {
		Assertion.check().isNotBlank(geoPointFieldName);
		//-----
		this.geoPointFieldName = geoPointFieldName;
	}

	/**
	 * @return geoPointFieldName
	 */
	public String getGeoPointFieldName() {
		return geoPointFieldName;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return "#" + geoPointFieldName + "#";
	}
}
