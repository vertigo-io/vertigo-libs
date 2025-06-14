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
package io.vertigo.database.sql.statement;

import io.vertigo.core.lang.Assertion;

/**
 * this class concerns the param of a sql statement.
 *
 * @author pchretien
 * @param <O> the type param
 * @param dataType the param type
 * @param value the param value
 */
public record SqlParameter<O> (
		Class<O> dataType,
		O value) {

	public SqlParameter {
		Assertion.check().isNotNull(dataType);
	}

	/**
	 * Static builder.
	 * @param dataType the param type
	 * @param value the param value
	 * @return SqlParameter of this value
	 */
	public static <O> SqlParameter of(final Class<O> dataType, final O value) {
		return new SqlParameter<>(dataType, value);

	}

	@Override
	public String toString() {
		return value != null ? value.toString() : "null";
	}
}
