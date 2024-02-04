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
package io.vertigo.datafactory.impl.search.loader;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import io.vertigo.basics.task.TaskEngineSelect;
import io.vertigo.commons.transaction.Transactional;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.node.Node;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.data.definitions.DataAccessor;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.model.DtObject;
import io.vertigo.datamodel.data.model.KeyConcept;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.data.util.DtObjectUtil;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.task.TaskManager;
import io.vertigo.datamodel.task.definitions.TaskDefinition;
import io.vertigo.datamodel.task.model.Task;

/**
 * Default SearchLoader for Database datasource.
 * @author npiedeloup
 * @param <S> KeyConcept type
 * @param <I> Index type
 */
public abstract class AbstractSqlSearchLoader<S extends KeyConcept, I extends DtObject> extends AbstractSearchLoader<S, I> {
	private static final int SEARCH_CHUNK_SIZE = 500;
	private final TaskManager taskManager;
	private final VTransactionManager transactionManager;

	/**
	 * Constructor.
	 * @param taskManager Task manager
	 * @param transactionManager transactionManager
	 */
	@Inject
	public AbstractSqlSearchLoader(
			final TaskManager taskManager,
			final VTransactionManager transactionManager) {
		Assertion.check()
				.isNotNull(taskManager)
				.isNotNull(transactionManager);
		// -----
		this.taskManager = taskManager;
		this.transactionManager = transactionManager;
	}

	protected final VTransactionManager getTransactionManager() {
		return transactionManager;
	}

	/** {@inheritDoc} */
	@Override
	@Transactional
	protected final List<Tuple<UID<S>, Serializable>> loadNextURI(final Serializable lastValue, final boolean orderByVersion, final DataDefinition dataDefinition) {
		try (final VTransactionWritable tx = transactionManager.createCurrentTransaction()) {
			final String entityName = getEntityName(dataDefinition);
			final String tableName = StringUtil.camelToConstCase(entityName);
			final String taskName = "TkSelect" + entityName + "NextSearchChunk";
			final DataField idField = dataDefinition.getIdField().get();
			final DataField versionField = getVersionField(dataDefinition);
			final DataField iteratorField = orderByVersion ? versionField : idField;

			final String request = getNextIdsSqlQuery(tableName, idField.name(), iteratorField.name(), versionField.name());

			final TaskDefinition taskDefinition = TaskDefinition.builder(taskName)
					.withEngine(TaskEngineSelect.class)
					.withDataSpace(dataDefinition.getDataSpace())
					.withRequest(request)
					.addInAttribute(iteratorField.name(), iteratorField.smartTypeDefinition(), Cardinality.ONE)
					.withOutAttribute("dtc", Node.getNode().getDefinitionSpace().resolve(SmartTypeDefinition.PREFIX + dataDefinition.getName(), SmartTypeDefinition.class), Cardinality.MANY)
					.build();

			final Task task = Task.builder(taskDefinition)
					.addValue(iteratorField.name(), lastValue)
					.build();

			final DtList<S> resultDtc = taskManager
					.execute(task)
					.getResult();

			final List<Tuple<UID<S>, Serializable>> uids = new ArrayList<>(resultDtc.size());
			final DataAccessor versionFieldAccessor = versionField.getDataAccessor();
			for (final S dto : resultDtc) {
				uids.add(Tuple.of(UID.<S> of(dataDefinition, DtObjectUtil.getId(dto)), (Serializable) versionFieldAccessor.getValue(dto)));
			}
			return uids;
		}
	}

	/**
	 * Create a SQL query to get next chunk's ids next in table from previous chunk
	 * @param tableName Table name to use
	 * @param pkFieldName Pk field name to return
	 * @param iteratorFieldName Iterator field name use in where clause
	 * @param versionFieldName Version field name to return
	 * @return SQL query
	 */
	protected String getNextIdsSqlQuery(final String tableName, final String pkFieldName, final String iteratorFieldName, final String versionFieldName) {
		final String pkColumnName = StringUtil.camelToConstCase(pkFieldName);
		final String iteratorColumnName = StringUtil.camelToConstCase(iteratorFieldName);
		final String versionColumnName = StringUtil.camelToConstCase(versionFieldName);

		final StringBuilder request = new StringBuilder()
				.append(" select ").append(pkColumnName)
				.append(pkColumnName.equals(versionColumnName) ? "" : ", " + versionColumnName)
				.append(" from ")
				.append(tableName)
				.append(" where ")
				.append(iteratorColumnName)
				.append(" > #")
				.append(iteratorFieldName)
				.append('#');
		final String sqlQueryFilter = getSqlQueryFilter();
		Assertion.check().isNotNull(sqlQueryFilter, "getSqlQueryFilter can't be null");
		if (!sqlQueryFilter.isEmpty()) {
			request.append(" and (").append(sqlQueryFilter).append(')');
		}
		request.append(" order by ").append(iteratorColumnName).append(" ASC");
		appendMaxRows(request, SEARCH_CHUNK_SIZE);
		return request.toString();
	}

	/**
	 * Ajoute à la requete les éléments techniques nécessaire pour limiter le resultat à {maxRows}.
	 * @param request Buffer de la requete
	 * @param maxRows Nombre de lignes max
	 */
	protected void appendMaxRows(final StringBuilder request, final Integer maxRows) {
		request.append(" limit ").append(maxRows); //Attention : non compatible avec toutes les bases
		//sur Oracle, il faut ajouter "select * from ("+request+") where rownum <= "+mawRows
	}

	/**
	 * Specific SqlQuery structural filter.
	 * If use with reindexDelta : logicaly elements must be returned by this filter, and index data must be filterd by loadData query.
	 * So this filter may no change during data life cycle ( like `type='text'`) and inactivity filter should be in loadData query.
	 *
	 * To use a limit by a date (for archive for exemple), you may add a filter here with 1 hour or 1 day more
	 * and the right limit is loadData quey.
	 * @return Specific SqlQuery filter
	 */
	protected String getSqlQueryFilter() {
		//nothing, but overrideable
		return "";
	}

	/**
	 * @return TaskManager
	 */
	protected final TaskManager getTaskManager() {
		return taskManager;
	}

	/**
	 * Nom de la table en fonction de la définition du DT mappé.
	 *
	 * @param dataDefinition Définition du DT mappé
	 * @return Nom de la table
	 */
	protected static final String getEntityName(final DataDefinition dataDefinition) {
		return dataDefinition.getFragment().orElse(dataDefinition).id().shortName();
	}

}
