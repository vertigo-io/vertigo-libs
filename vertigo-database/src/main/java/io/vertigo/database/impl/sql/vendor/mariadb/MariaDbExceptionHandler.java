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
package io.vertigo.database.impl.sql.vendor.mariadb;

import java.sql.SQLException;

import io.vertigo.database.impl.sql.vendor.core.AbstractSqlExceptionHandler;

/**
 * Handler des exceptions SQL spécifique à MariaDB.
 * Gère les codes d'erreur MySQL/MariaDB et les deadlocks InnoDB.
 *
 * @author ppinette
 */
final class MariaDbExceptionHandler extends AbstractSqlExceptionHandler {

	/**
	 * Constructor.
	 */
	MariaDbExceptionHandler() {
		super();
	}

	@Override
	public RuntimeException handleSQLException(final SQLException sqle, final String statementInfos) {
		final int errCode = sqle.getErrorCode();
		switch (errCode) {
			case 1062:
				// Violation de contrainte d'unicité (Duplicate entry)
				return handleUniqueConstraintSQLException(sqle);
			case 1452:
				// Violation de contrainte d'intégrité référentielle (Cannot add or update a child row)
				return handleForeignConstraintSQLException(sqle);
			case 1264:
			case 1265:
				// Valeur trop grande pour la colonne (Out of range value)
				return handleTooLargeValueSqlException(sqle);
			default:
				if (isUserSQLException(errCode)) {
					return handleUserSQLException(sqle);
				}
		}
		return handleOtherSQLException(sqle, statementInfos);
	}

	private static boolean isUserSQLException(final int errCode) {
		// Codes d'erreur utilisateur dans MySQL/MariaDB
		return errCode >= 1000 && errCode < 2000;
	}

	/** {@inheritDoc} */
	@Override
	protected String extractConstraintName(final String msg) {
		// Extraction du nom de contrainte depuis le message d'erreur MariaDB
		String constraintName = extractConstraintName(msg, "for key", '\'', '\'');
		if (constraintName == null) {
			constraintName = extractConstraintName(msg, "constraint", '\'', '\'');
		}
		return constraintName;
	}

	private static String extractConstraintName(
			final String msg,
			final String constraintName,
			final char constraintNameStart,
			final char constraintNameEnd) {
		final int i1 = msg.indexOf(constraintNameStart, msg.indexOf(constraintName));
		final int i2 = msg.indexOf(constraintNameEnd, i1 + 1);
		if (i1 > -1 && i2 > -1 && i2 > i1) {
			return msg.substring(i1 + 1, i2).toUpperCase().trim();
		}
		return null;
	}
}
