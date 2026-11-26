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
package io.vertigo.database.impl.sql;

import java.beans.PropertyDescriptor;
import java.util.List;
import java.util.Locale;

import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.util.BeanUtil;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.core.util.StringUtil;
import io.vertigo.database.sql.statement.SqlParameter;

/**
 * The mapping of the beans: the mapper of every data type that no plugin accepts.
 * - a column gives the name of a property: MOVIE_ID gives movieId
 * - a read finds the type of each property by its getter, and sets the value with its setter
 * - a write reads the value of a property by its getter
 * This is the mapping of the driver before the mappers: its behavior does not change.
 * It is a plugin that no node declares: the driver makes it, and asks it after the plugins of the node.
 *
 * @author pchretien
 */
final class BeanSqlMapperPlugin implements SqlMapperPlugin {

	static final BeanSqlMapperPlugin INSTANCE = new BeanSqlMapperPlugin();

	private BeanSqlMapperPlugin() {
		// one instance: the mapper has no state
	}

	/** Accepts every data type. */
	@Override
	public boolean accepts(final Class<?> dataType) {
		return true;
	}

	@Override
	public <O> SqlRowReader<O> reader(final Class<O> dataType, final List<String> columns) {
		final var names = new String[columns.size()];
		final Class<?>[] types = new Class<?>[columns.size()];
		for (var i = 0; i < names.length; i++) {
			// toUpperCase nécessaire pour postgreSQL et SQLServer
			names[i] = StringUtil.constToLowerCamelCase(columns.get(i).toUpperCase(Locale.ENGLISH));
			try {
				final var getter = dataType.getDeclaredMethod("get" + StringUtil.first2UpperCase(names[i]));
				types[i] = getter.getReturnType();
			} catch (final NoSuchMethodException e) {
				throw WrappedException.wrap(e);
			}
		}
		return new SqlRowReader<>() {

			@Override
			public List<Class<?>> types() {
				return List.of(types);
			}

			@Override
			public O read(final Object[] values) {
				final var bean = ClassUtil.newInstance(dataType);
				for (var i = 0; i < names.length; i++) {
					BeanUtil.setValue(bean, names[i], values[i]);
				}
				return bean;
			}
		};
	}

	@Override
	public SqlParameter fieldOf(final Object holder, final String field) {
		final PropertyDescriptor propertyDescriptor = BeanUtil.getPropertyDescriptor(field, holder.getClass());
		return SqlParameter.of((Class) propertyDescriptor.getPropertyType(), BeanUtil.getValue(holder, field));
	}
}
