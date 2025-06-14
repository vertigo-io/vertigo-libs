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
package io.vertigo.account.authorization;

import io.vertigo.account.authorization.definitions.AuthorizationName;
import io.vertigo.account.authorization.definitions.OperationName;
import io.vertigo.account.data.model.Record;

public final class SecurityNames {

	/**
	 * Enumération des Authorizations globales.
	 */
	public enum GlobalAuthorizations implements AuthorizationName {
		AtzAdmUsr, AtzAdmPro, AtzAdmApp
	}

	/**
	 * Enumération des Authorizations globales.
	 */
	public enum RecordAuthorizations implements AuthorizationName {
		AtzRecord$read, AtzRecord$read2, AtzRecord$read3, AtzRecord$read4, AtzRecord$readHp, //
		AtzRecord$delete, AtzRecord$notify, AtzRecord$create, AtzRecord$write, //
		AtzRecord$test, AtzRecord$test2, AtzRecord$test2LT, AtzRecord$test2LTE, AtzRecord$test2EQ, AtzRecord$test2NEQ, AtzRecord$test2GTE, AtzRecord$test2GT, //
		AtzRecord$test3, AtzRecord$test3LT, AtzRecord$test3LTE, AtzRecord$test3EQ, AtzRecord$test3NEQ, AtzRecord$test3GTE, AtzRecord$test3GT, //
		AtzRecord$test4, AtzRecord$test5, AtzRecord$test6
	}

	/**
	 * Enumération des opérations de Dossier.
	 */
	public enum RecordOperations implements OperationName<Record> {
		read, read2, read3, read4, readHp, //
		write, create, delete, notify, //
		test, test2, test2LT, test2LTE, test2EQ, test2NEQ, test2GTE, test2GT, //
		test3, test3LT, test3LTE, test3EQ, test3NEQ, test3GTE, test3GT, //
		test4, test5, test6
	}
}
