package io.vertigo.account.authorization;

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
import io.vertigo.datamodel.structure.model.Entity;
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
		//-----
		this.criteria = criteria;
		this.clazz = clazz;
	}

	public String asSqlWhere(final String alias, final String connectionName) {
		Assertion.check()
				.isNotBlank(connectionName, "You must pass 'connectionName', in your Task request, use implicit 'ctx_connectionName' parameter");
		final SqlDialect sqlDialect = sqlManager.getConnectionProvider(connectionName).getDataBase().getSqlDialect();
		final CriteriaEncoder criteriaEncoder = new SqlCriteriaEncoder(sqlDialect, Optional.ofNullable(alias), false);
		final Tuple<String, CriteriaCtx> tuple = criteria.toStringAnCtx(criteriaEncoder);
		return tuple.getVal1();
	}

	public String asSqlFrom(final String sqlEntityName, final String connectionName) {
		final String criteriaEntity = StringUtil.camelToConstCase(clazz.getSimpleName());
		Assertion.check()
				.isNotBlank(connectionName, "You must pass 'connectionName', in your Task request, use implicit 'ctx_connectionName' parameter")
				.isNotBlank(sqlEntityName)
				.isTrue(sqlEntityName.equalsIgnoreCase(criteriaEntity), "Sql Table ({0}) and the entity of the criteria ({1}) must be the same or compatible", sqlEntityName, criteriaEntity);

		final StringBuilder securedFrom = new StringBuilder("select * from ")
				.append(sqlEntityName)
				.append(" where ")
				.append(asSqlWhere(null, connectionName));
		return securedFrom.toString();
	}

}
