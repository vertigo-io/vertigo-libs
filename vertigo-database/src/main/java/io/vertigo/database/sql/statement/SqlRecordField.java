/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
 * A param #record.field# on a record, that the driver resolves with the mapper of the record, when it executes the statement.
 * - the statement builder reads the field of a bean itself, with its getter
 * - it keeps the field of a record in a SqlRecordField: a record has no getter, and its mapper knows how to read it
 *
 * @author pchretien
 * @param record the record bound to the param
 * @param field the name of the field, as the param writes it
 */
public record SqlRecordField(
		Record record,
		String field) {

	public SqlRecordField {
		Assertion.check()
				.isNotNull(record)
				.isNotBlank(field);
	}
}
