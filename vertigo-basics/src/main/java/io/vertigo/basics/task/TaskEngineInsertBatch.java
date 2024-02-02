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
/**
 *
 */
package io.vertigo.basics.task;

import java.sql.SQLException;
import java.util.List;
import java.util.OptionalInt;

import javax.inject.Inject;

import io.vertigo.commons.script.ScriptManager;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.util.StringUtil;
import io.vertigo.database.sql.SqlManager;
import io.vertigo.database.sql.connection.SqlConnection;
import io.vertigo.database.sql.statement.SqlStatement;
import io.vertigo.database.sql.statement.SqlStatementBuilder;
import io.vertigo.database.sql.vendor.SqlDialect.GenerationMode;
import io.vertigo.datamodel.data.definitions.DataAccessor;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DtField;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.task.definitions.TaskAttribute;

/**
 * @author jmforhan
 */
public final class TaskEngineInsertBatch extends AbstractTaskEngineSQL {

	/**
	 * Constructeur.
	 * @param scriptManager scriptManager
	 * @param transactionManager transactionManager
	 * @param sqlManager sqlDataBaseManager
	 */
	@Inject
	public TaskEngineInsertBatch(
			final ScriptManager scriptManager,
			final VTransactionManager transactionManager,
			final SqlManager sqlManager,
			final SmartTypeManager smartTypeManager,
			final AnalyticsManager analyticsManager) {
		super(scriptManager, transactionManager, sqlManager, smartTypeManager, analyticsManager);
	}

	/** {@inheritDoc} */
	@Override
	public OptionalInt doExecute(
			final SqlStatement sqlStatement,
			final SqlConnection connection) throws SQLException {
		Assertion.check()
				.isNotNull(sqlStatement)
				.isNotNull(connection);
		//---
		final TaskAttribute listAttribute = findListAttribute();

		//---
		// gestion de generatedKey
		final GenerationMode generationMode = connection.getDataBase().getSqlDialect().getGenerationMode();
		final DtList<Entity> list = getValue(listAttribute.name());
		final DataDefinition dataDefinition = list.getDefinition();
		final DtField idField = dataDefinition.getIdField().get();

		final Tuple<Integer, List<?>> result = getSqlManager().executeBatchWithGeneratedKeys(sqlStatement,
				generationMode,
				StringUtil.camelToConstCase(idField.name()),
				idField.smartTypeDefinition().getJavaClass(),
				getSmartTypeManager().getTypeAdapters("sql"),
				connection);

		final DataAccessor idAccessor = idField.getDataAccessor();

		for (int i = 0; i < result.val2().size(); i++) {
			idAccessor.setValue(list.get(i), result.val2().get(i));
		}
		//---
		return OptionalInt.of(result.val1());
	}

	@Override
	protected void setNamedParameters(final SqlStatementBuilder sqlStatementBuilder) {

		final TaskAttribute listAttribute = findListAttribute();

		final List<TaskAttribute> otherAttributes = getTaskDefinition().getInAttributes()
				.stream()
				.filter(inAttribute -> !inAttribute.cardinality().hasMany())// not multiple
				.toList();
		//---
		final List<?> list = getValue(listAttribute.name());
		list.forEach(object -> {
			// we bind the parameter of the batch
			sqlStatementBuilder.bind(listAttribute.name(), listAttribute.smartTypeDefinition().getJavaClass(), object);
			// we add all the "constant" parameters
			otherAttributes.forEach(
					otherAttribute -> sqlStatementBuilder.bind(otherAttribute.name(), otherAttribute.smartTypeDefinition().getJavaClass(), getValue(otherAttribute.name())));
			sqlStatementBuilder.nextLine();
		});
	}

	private TaskAttribute findListAttribute() {
		final List<TaskAttribute> potentialBatchAttributes = getTaskDefinition().getInAttributes()
				.stream()
				.filter(inAttribute -> inAttribute.cardinality().hasMany())// multiple
				.toList();

		Assertion.check().isTrue(potentialBatchAttributes.size() == 1, "For batch a single List param is required");
		return potentialBatchAttributes.get(0);
	}

}
