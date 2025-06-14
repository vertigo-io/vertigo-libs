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
package io.vertigo.database.impl.sql;

import io.vertigo.core.locale.LocaleMessageKey;

/**
 *
 * @author jmforhan
 */
public enum Resources implements LocaleMessageKey {
	/**
	 * Value to big for field in database.
	 */
	DYNAMO_SQL_CONSTRAINT_TOO_BIG_VALUE,

	/**
	 * Impossible to delete entry due to referential constraint.
	 */
	DYNAMO_SQL_CONSTRAINT_IMPOSSIBLE_TO_DELETE,

	/**
	 * Unicity constraint problem.
	 */
	DYNAMO_SQL_CONSTRAINT_ALREADY_REGISTRED,
}
