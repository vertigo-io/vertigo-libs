/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.database.impl.sql.vendor.core;

import java.math.BigDecimal;
import java.sql.Clob;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

import io.vertigo.core.lang.DataStream;
import io.vertigo.database.sql.vendor.SqlMapping;

/**
 * this class implements the default mapping to a sql database
 * Its behavior is defined by construction :
 * - createWithBooleanAsBit
 * - createWithBooleanAsBoolean
 *
 * @author pchretien
 */
public final class SqlVendorMapping implements SqlMapping {

	private static final String TYPE_UNSUPPORTED = "Type unsupported : ";

	private final boolean booleanAsBit;

	private SqlVendorMapping(final boolean booleanAsBit) {
		this.booleanAsBit = booleanAsBit;
	}

	public static SqlMapping createWithBooleanAsBit() {
		return new SqlVendorMapping(true);
	}

	public static SqlMapping createWithBooleanAsBoolean() {
		return new SqlVendorMapping(false);
	}

	private int getSqlType(final Class dataType) {
		if (Boolean.class.isAssignableFrom(dataType)) {
			return booleanAsBit ? Types.BIT : Types.BOOLEAN;
		}
		//---Numbers
		if (Integer.class.isAssignableFrom(dataType)) {
			return Types.INTEGER;
		}
		if (Long.class.isAssignableFrom(dataType)) {
			return Types.BIGINT;
		}
		if (Double.class.isAssignableFrom(dataType)) {
			return Types.DOUBLE;
		}
		if (BigDecimal.class.isAssignableFrom(dataType)) {
			return Types.DECIMAL;
		}
		//---String
		if (String.class.isAssignableFrom(dataType)) {
			return Types.VARCHAR;
		}
		if (DataStream.class.isAssignableFrom(dataType)) {
			//For better compatibility with postgresql bytea : use VARBINARY instead of BLOB: https://github.com/pgjdbc/pgjdbc/issues/1751#issuecomment-613880184
			//Warn : VARBINARY is not supported for all databases' types
			// PostgreSQL use BYTEA
			// MySQL use VARBINARY, not BLOB
			// Oracle use RAW, not BLOB
			// SQLServer use VARBINARY, not IMAGE
			return Types.VARBINARY;
		}
		//---Dates
		//java.util.Date is now Deprecated and must be replaced by LocalDate or Instant
		if (Date.class.isAssignableFrom(dataType)) {
			return Types.TIMESTAMP;
		}
		if (LocalDate.class.isAssignableFrom(dataType)) {
			return Types.DATE;
		}
		if (Instant.class.isAssignableFrom(dataType)) {
			return Types.TIMESTAMP;
		}
		throw new IllegalArgumentException(TYPE_UNSUPPORTED + dataType);
	}

	/** {@inheritDoc} */
	@Override
	public <O> void setValueOnStatement(
			final java.sql.PreparedStatement statement,
			final int index,
			final Class<O> dataType,
			final O value) throws SQLException {
		if (value == null) {
			final int typeSQL = getSqlType(dataType);
			statement.setNull(index, typeSQL);
		} else if (Integer.class.isAssignableFrom(dataType)) {
			statement.setInt(index, (Integer) value);
		} else if (Long.class.isAssignableFrom(dataType)) {
			statement.setLong(index, (Long) value);
		} else if (Boolean.class.isAssignableFrom(dataType)) {
			if (booleanAsBit) {
				final int intValue = Boolean.TRUE.equals(value) ? 1 : 0;
				statement.setInt(index, intValue);
			} else {
				//Boolean as Boolean
				statement.setBoolean(index, Boolean.TRUE.equals(value));
			}
		} else if (Double.class.isAssignableFrom(dataType)) {
			statement.setDouble(index, (Double) value);
		} else if (BigDecimal.class.isAssignableFrom(dataType)) {
			statement.setBigDecimal(index, (BigDecimal) value);
		} else if (String.class.isAssignableFrom(dataType)) {
			statement.setString(index, (String) value);
		} else if (LocalDate.class.isAssignableFrom(dataType)) {
			final LocalDate localDate = (LocalDate) value;
			statement.setDate(index, java.sql.Date.valueOf(localDate));
		} else if (Date.class.isAssignableFrom(dataType)) {
			final Date date = (Date) value;
			final Timestamp ts = new Timestamp(date.getTime());
			statement.setTimestamp(index, ts);
		} else if (Instant.class.isAssignableFrom(dataType)) {
			final Instant instant = (Instant) value;
			final Timestamp ts = Timestamp.from(instant);
			statement.setTimestamp(index, ts);
		} else if (DataStream.class.isAssignableFrom(dataType)) {
			final DataStream dataStream = (DataStream) value;
			statement.setBytes(index, dataStream.getBytes());
		} else {
			throw new IllegalArgumentException(TYPE_UNSUPPORTED + dataType);
		}
	}

	/** {@inheritDoc} */
	@Override
	public <O> O getValueForResultSet(
			final ResultSet resultSet,
			final int col,
			final Class<O> dataType) throws SQLException {
		final Object value;

		if (String.class.isAssignableFrom(dataType)) {
			value = getStringValueForResultSet(resultSet, col);
		} else if (Integer.class.isAssignableFrom(dataType)) {
			final int vi = resultSet.getInt(col);
			value = resultSet.wasNull() ? null : vi;
		} else if (Long.class.isAssignableFrom(dataType)) {
			final long vl = resultSet.getLong(col);
			value = resultSet.wasNull() ? null : vl;
		} else if (Boolean.class.isAssignableFrom(dataType)) {
			value = getBooleanValueForResultSet(resultSet, col);
		} else if (Double.class.isAssignableFrom(dataType)) {
			final double vd = resultSet.getDouble(col);
			value = resultSet.wasNull() ? null : vd;
		} else if (BigDecimal.class.isAssignableFrom(dataType)) {
			value = resultSet.getBigDecimal(col);
		} else if (LocalDate.class.isAssignableFrom(dataType)) {
			final java.sql.Date date = resultSet.getDate(col);
			value = date == null ? null : date.toLocalDate();
		} else if (Date.class.isAssignableFrom(dataType)) {
			final Timestamp timestamp = resultSet.getTimestamp(col);
			value = timestamp == null ? null : new java.util.Date(timestamp.getTime());
		} else if (Instant.class.isAssignableFrom(dataType)) {
			final Timestamp timestamp = resultSet.getTimestamp(col);
			value = timestamp == null ? null : timestamp.toInstant();
		} else if (DataStream.class.isAssignableFrom(dataType)) {
			value = SqlDataStreamMappingUtil.getDataStream(resultSet, col);
		} else {
			throw new IllegalArgumentException(TYPE_UNSUPPORTED + dataType);
		}
		return dataType.cast(value);
	}

	private static String getStringValueForResultSet(final ResultSet resultSet, final int col) throws SQLException {
		final String value;
		if (resultSet.getMetaData().getColumnType(col) == Types.CLOB) {
			final Clob clob = resultSet.getClob(col);
			if (clob != null) {
				final Long len = clob.length();
				value = clob.getSubString(1L, len.intValue());
			} else {
				value = null;
			}
		} else {
			value = resultSet.getString(col);
		}
		return value;
	}

	private Boolean getBooleanValueForResultSet(final ResultSet resultSet, final int col) throws SQLException {
		if (booleanAsBit) {
			final int vb = resultSet.getInt(col);
			return resultSet.wasNull() ? null : vb != 0 ? Boolean.TRUE : Boolean.FALSE;
		}
		//Boolean as Boolean
		final boolean vb = resultSet.getBoolean(col);
		return resultSet.wasNull() ? null : vb;
	}
}
