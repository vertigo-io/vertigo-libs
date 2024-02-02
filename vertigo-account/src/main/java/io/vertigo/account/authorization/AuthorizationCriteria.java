/*
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
package io.vertigo.account.authorization;

import java.util.Map;
import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.util.InjectorUtil;
import io.vertigo.core.util.StringUtil;
import io.vertigo.database.sql.SqlManager;
import io.vertigo.database.sql.vendor.SqlDialect;
import io.vertigo.datamodel.criteria.Criteria;
import io.vertigo.datamodel.criteria.CriteriaCtx;
import io.vertigo.datamodel.criteria.CriteriaEncoder;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datastore.plugins.entitystore.sql.SqlCriteriaEncoder;

public class AuthorizationCriteria<E extends Entity> {
	private final Criteria<E> criteria;
	private final Class<E> clazz;

	@Inject
	private SqlManager sqlManager;

	AuthorizationCriteria(final Criteria<E> criteria, final Class<E> clazz) {
		Assertion.check()
				.isNotNull(criteria)
				.isNotNull(clazz);
		InjectorUtil.injectMembers(this);
		//--
		this.criteria = criteria;
		this.clazz = clazz;
	}

	public String asSqlWhere(final String alias, final Map<String, String> taskContext) {
		Assertion.check()
				.isNotNull(taskContext, "You must pass 'ctx', in your Task request, use implicit 'ctx' parameter");
		//--
		final SqlDialect sqlDialect = sqlManager.getConnectionProvider(taskContext.getOrDefault("connectionName", SqlManager.MAIN_CONNECTION_PROVIDER_NAME))
				.getDataBase().getSqlDialect();
		final CriteriaEncoder criteriaEncoder = new SqlCriteriaEncoder(sqlDialect, Optional.ofNullable(alias), false);
		final Tuple<String, CriteriaCtx> tuple = criteria.toStringAnCtx(criteriaEncoder);
		return tuple.val1();
	}

	public String asSqlFrom(final String sqlEntityName, final Map<String, String> taskContext) {
		final String criteriaEntity = StringUtil.camelToConstCase(clazz.getSimpleName());
		Assertion.check()
				.isNotNull(taskContext, "You must pass 'ctx', in your Task request, use implicit 'ctx' parameter")
				.isNotBlank(sqlEntityName)
				.isTrue(sqlEntityName.equalsIgnoreCase(criteriaEntity), "Sql Table ({0}) and the entity of the criteria ({1}) must be the same or compatible", sqlEntityName, criteriaEntity);
		//--
		return "select * from " +
				sqlEntityName +
				" where " +
				asSqlWhere(null, taskContext);
	}

}
