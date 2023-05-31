/**
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
package io.vertigo.datastore.plugins.entitystore.sql;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.basics.task.AbstractTaskEngineSQL;
import io.vertigo.basics.task.TaskEngineInsert;
import io.vertigo.basics.task.TaskEngineInsertBatch;
import io.vertigo.basics.task.TaskEngineProc;
import io.vertigo.basics.task.TaskEngineProcBatch;
import io.vertigo.basics.task.TaskEngineSelect;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.node.Node;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.StringUtil;
import io.vertigo.database.sql.SqlManager;
import io.vertigo.database.sql.vendor.SqlDialect;
import io.vertigo.datamodel.criteria.Criteria;
import io.vertigo.datamodel.criteria.CriteriaCtx;
import io.vertigo.datamodel.criteria.CriteriaEncoder;
import io.vertigo.datamodel.criteria.Criterions;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.structure.definitions.DtDefinition;
import io.vertigo.datamodel.structure.definitions.DtField;
import io.vertigo.datamodel.structure.definitions.association.AssociationNNDefinition;
import io.vertigo.datamodel.structure.definitions.association.AssociationNode;
import io.vertigo.datamodel.structure.definitions.association.DtListURIForNNAssociation;
import io.vertigo.datamodel.structure.definitions.association.DtListURIForSimpleAssociation;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.DtListState;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.util.AssociationUtil;
import io.vertigo.datamodel.structure.util.DtObjectUtil;
import io.vertigo.datamodel.task.TaskManager;
import io.vertigo.datamodel.task.definitions.TaskDefinition;
import io.vertigo.datamodel.task.definitions.TaskDefinitionBuilder;
import io.vertigo.datamodel.task.model.Task;
import io.vertigo.datamodel.task.model.TaskBuilder;
import io.vertigo.datamodel.task.model.TaskEngine;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.datastore.impl.entitystore.EntityStorePlugin;

/**
 * This class is the basic implementation of the dataStore in the sql way.
 *
 * @author pchretien
 */
public final class SqlEntityStorePlugin implements EntityStorePlugin {
	private static final int MAX_TASK_SPECIFIC_NAME_LENGTH = 40;
	private static final String SMART_TYPE_PREFIX = SmartTypeDefinition.PREFIX;

	private final String dataSpace;
	private final String connectionName;
	private final String sequencePrefix;
	/**
	 * Domaine à usage interne.
	 * Ce smartType n'est pas enregistré.
	 */
	private final SmartTypeDefinition integerSmartType;

	private enum TASK {
		/** Prefix of the SELECT.*/
		TkSelect,
		/** Prefix of the INSERT.*/
		TkInsert,
		/** Prefix of the INSERT BATCH.*/
		TkInsertBatch,
		/** Prefix of the UPDATE.*/
		TkUpdate,
		/** Prefix of the UPDATE BATCH.*/
		TkUpdateBatch,
		/** Prefix of the DELETE.*/
		TkDelete,
		/** Prefix of the COUNT.*/
		TkCount,
		/** Prefix of the LOCK.*/
		TkLock
	}

	private final SqlDialect sqlDialect;
	private final TaskManager taskManager;
	private final CriteriaEncoder criteriaEncoder;

	/**
	 * Constructor.
	 * @param optDataSpace the dataSpace (option)
	 * @param optConnectionName the name of the connection
	 * @param optSequencePrefix the prefix of sequences
	 * @param taskManager the taskManager
	 * @param sqlManager the sqlDataBaseManager
	 */
	@Inject
	public SqlEntityStorePlugin(
			@ParamValue("dataSpace") final Optional<String> optDataSpace,
			@ParamValue("connectionName") final Optional<String> optConnectionName,
			@ParamValue("sequencePrefix") final Optional<String> optSequencePrefix,
			final TaskManager taskManager,
			final SqlManager sqlManager) {
		Assertion.check()
				.isNotNull(optDataSpace)
				.isNotNull(optConnectionName)
				.isNotNull(optSequencePrefix)
				.isNotNull(taskManager)
				.isNotNull(sqlManager);
		//-----
		dataSpace = optDataSpace.orElse(EntityStoreManager.MAIN_DATA_SPACE_NAME);
		connectionName = optConnectionName.orElse(SqlManager.MAIN_CONNECTION_PROVIDER_NAME);
		sequencePrefix = optSequencePrefix.orElse("SEQ_");
		this.taskManager = taskManager;
		sqlDialect = sqlManager.getConnectionProvider(connectionName).getDataBase().getSqlDialect();
		criteriaEncoder = new SqlCriteriaEncoder(sqlDialect);
		integerSmartType = SmartTypeDefinition.builder("STyIntegerSql", BasicType.Integer).build();
	}

	/**
	 * Return the tableName to which the dtDefinition is mapped.
	 *
	 * @param dtDefinition the dtDefinition
	 * @return the name of the table
	 */
	private static String getEntityName(final DtDefinition dtDefinition) {
		return dtDefinition.getFragment().orElse(dtDefinition).id().shortName();
	}

	private static String getRequestedCols(final DtDefinition dtDefinition) {
		if (dtDefinition.getFragment().isPresent()) {
			return dtDefinition.getFields()
					.stream()
					.map(DtField::name)
					.map(StringUtil::camelToConstCase)
					.collect(Collectors.joining(", "));
		}
		return "*"; //all fields
	}

	/** {@inheritDoc} */
	@Override
	public String getDataSpace() {
		return dataSpace;
	}

	/** {@inheritDoc} */
	@Override
	public String getConnectionName() {
		return connectionName;
	}

	private static DtField getIdField(final DtDefinition dtDefinition) {
		Assertion.check().isNotNull(dtDefinition);
		//---
		return dtDefinition.getIdField().orElseThrow(() -> new IllegalStateException("no ID found"));
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E readNullable(final DtDefinition dtDefinition, final UID<E> uri) {
		final String entityName = getEntityName(dtDefinition);
		final String tableName = StringUtil.camelToConstCase(entityName);
		final String taskName = TASK.TkSelect + entityName + "ByUri";

		final String requestedCols = getRequestedCols(dtDefinition);
		final DtField idField = getIdField(dtDefinition);
		final String idFieldName = idField.name();
		final String request = new StringBuilder()
				.append(" select ").append(requestedCols)
				.append(" from ").append(tableName)
				.append(" where ").append(StringUtil.camelToConstCase(idFieldName)).append(" = #").append(idFieldName).append('#')
				.toString();

		final TaskDefinition taskDefinition = TaskDefinition.builder(taskName)
				.withEngine(TaskEngineSelect.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute(idFieldName, idField.smartTypeDefinition(), Cardinality.ONE)
				.withOutAttribute("dto", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + uri.getDefinition().getName(), SmartTypeDefinition.class), Cardinality.OPTIONAL_OR_NULLABLE)
				.build();

		final Task task = Task.builder(taskDefinition)
				.addValue(idFieldName, uri.getId())
				.addContextProperty("connectionName", getConnectionName())
				.build();

		return taskManager
				.execute(task)
				.getResult();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> DtList<E> findAll(final DtDefinition dtDefinition, final DtListURIForNNAssociation dtcUri) {
		Assertion.check()
				.isNotNull(dtDefinition)
				.isNotNull(dtcUri);
		//-----
		final String entityName = getEntityName(dtDefinition);
		final String tableName = StringUtil.camelToConstCase(entityName);

		final String taskName = TASK.TkSelect + "NNList" + entityName + "ByUri";

		//PK de la DtList recherchée
		final String idFieldName = StringUtil.camelToConstCase(getIdField(dtDefinition).name());
		//FK dans la table nn correspondant à la collection recherchée. (clé de jointure ).
		final AssociationNNDefinition associationNNDefinition = dtcUri.getAssociationDefinition();
		final String joinTableName = associationNNDefinition.getTableName();
		final DtDefinition joinDtDefinition = AssociationUtil.getAssociationNode(associationNNDefinition, dtcUri.getRoleName()).getDtDefinition();
		final String joinDtFieldName = StringUtil.camelToConstCase(getIdField(joinDtDefinition).name());

		//La condition s'applique sur l'autre noeud de la relation (par rapport à la collection attendue)
		final AssociationNode associationNode = AssociationUtil.getAssociationNodeTarget(associationNNDefinition, dtcUri.getRoleName());
		final DtField fkField = getIdField(associationNode.getDtDefinition());
		final String fkFieldName = fkField.name();

		final String request = new StringBuilder(" select t.* from ")
				.append(tableName).append(" t")
				//On établit une jointure fermée entre la pk et la fk de la collection recherchée.
				.append(" join ").append(joinTableName).append(" j on j.").append(joinDtFieldName).append(" = t.").append(idFieldName)
				//Condition de la recherche
				.append(" where j.").append(StringUtil.camelToConstCase(fkFieldName)).append(" = #").append(fkFieldName).append('#')
				.toString();

		final TaskDefinition taskDefinition = TaskDefinition.builder(taskName)
				.withEngine(TaskEngineSelect.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute(fkFieldName, fkField.smartTypeDefinition(), Cardinality.ONE)
				.withOutAttribute("dtc", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + dtDefinition.getName(), SmartTypeDefinition.class), Cardinality.MANY)
				.build();

		final UID uid = dtcUri.getSource();

		final Task task = Task.builder(taskDefinition)
				.addValue(fkFieldName, uid.getId())
				.addContextProperty("connectionName", getConnectionName())
				.build();

		return taskManager
				.execute(task)
				.getResult();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> DtList<E> findAll(final DtDefinition dtDefinition, final DtListURIForSimpleAssociation dtcUri) {
		Assertion.check()
				.isNotNull(dtDefinition)
				.isNotNull(dtcUri);
		//---
		final DtField fkField = dtcUri.getAssociationDefinition().getFKField();
		final Serializable value = dtcUri.getSource().getId();

		return findByCriteria(dtDefinition, Criterions.isEqualTo(fkField::name, value), DtListState.of(null));
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> DtList<E> findByCriteria(final DtDefinition dtDefinition, final Criteria<E> criteria, final DtListState dtListState) {
		Assertion.check()
				.isNotNull(dtDefinition)
				.isNotNull(criteria)
				.isNotNull(dtListState);
		//---
		final String entityName = getEntityName(dtDefinition);
		final String tableName = StringUtil.camelToConstCase(entityName);
		final String requestedCols = getRequestedCols(dtDefinition);
		final String taskName = getListTaskName(entityName);
		final Tuple<String, CriteriaCtx> tuple = criteria.toStringAnCtx(criteriaEncoder);
		final String where = tuple.val1();
		final String request = createLoadAllLikeQuery(tableName, requestedCols, where, dtListState);
		final TaskDefinitionBuilder taskDefinitionBuilder = TaskDefinition.builder(taskName)
				.withEngine(TaskEngineSelect.class)
				.withDataSpace(dataSpace)
				.withRequest(request);

		final CriteriaCtx ctx = tuple.val2();
		//IN, Optional
		for (final String attributeName : ctx.getAttributeNames()) {
			taskDefinitionBuilder.addInAttribute(attributeName, dtDefinition.getField(ctx.getDtFieldName(attributeName)).smartTypeDefinition(), Cardinality.OPTIONAL_OR_NULLABLE);
		}
		//OUT, obligatoire
		final TaskDefinition taskDefinition = taskDefinitionBuilder
				.withOutAttribute("dtc", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + dtDefinition.getName(), SmartTypeDefinition.class), Cardinality.MANY)
				.build();

		final TaskBuilder taskBuilder = Task.builder(taskDefinition);
		for (final String attributeName : ctx.getAttributeNames()) {
			taskBuilder.addValue(attributeName, ctx.getAttributeValue(attributeName));
		}

		return taskManager
				.execute(taskBuilder
						.addContextProperty("connectionName", getConnectionName())
						.build())
				.getResult();
	}

	private static String getListTaskName(final String entityName) {
		final String fullName = new StringBuilder(TASK.TkSelect.name())
				.append("List")
				.append(entityName)
				.append("ByCriteria")
				.toString();
		if (fullName.length() > MAX_TASK_SPECIFIC_NAME_LENGTH) {
			return fullName.substring(0, MAX_TASK_SPECIFIC_NAME_LENGTH);
		}
		return fullName;
	}

	//==========================================================================
	//=============================== Ecriture =================================
	//==========================================================================
	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E create(final DtDefinition dtDefinition, final E entity) {
		Assertion.check().isNull(DtObjectUtil.getId(entity), "Only object without any id can be created");
		//------
		final boolean insert = true;
		put(entity, insert);
		return entity;
	}

	@Override
	public <E extends Entity> DtList<E> createList(final DtList<E> entities) {
		final DtDefinition dtDefinition = entities.getDefinition();
		final String entityName = getEntityName(dtDefinition);
		final String tableName = StringUtil.camelToConstCase(entityName);
		//---
		final String request = sqlDialect.createInsertQuery(dtDefinition.getIdField().get().name(), getDataFields(dtDefinition), sequencePrefix, tableName, "dtos");

		final TaskDefinition taskDefinition = TaskDefinition.builder(TASK.TkInsertBatch.name() + entityName)
				.withEngine(TaskEngineInsertBatch.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute("dtos", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + dtDefinition.getName(), SmartTypeDefinition.class), Cardinality.MANY)
				.withOutAttribute(AbstractTaskEngineSQL.SQL_ROWCOUNT, integerSmartType, Cardinality.ONE)
				.build();

		final Task task = Task.builder(taskDefinition)
				.addValue("dtos", entities)
				.addContextProperty("connectionName", getConnectionName())
				.build();

		/*final int sqlRowCount =*/ taskManager
				.execute(task)
				.getResult();

		return entities;
	}

	/** {@inheritDoc} */
	@Override
	public void update(final DtDefinition dtDefinition, final Entity entity) {
		Assertion.check().isNotNull(DtObjectUtil.getId(entity), "Need an id to update an object ");
		//-----
		final boolean insert = false;
		put(entity, insert);
	}

	@Override
	public <E extends Entity> void updateList(final DtList<E> entities) {
		final DtDefinition dtDefinition = entities.getDefinition();
		final String entityName = getEntityName(dtDefinition);
		//---
		final String request = createUpdateQuery(dtDefinition, "dtos");

		final TaskDefinition taskDefinition = TaskDefinition.builder(TASK.TkUpdateBatch.name() + entityName)
				.withEngine(TaskEngineProcBatch.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute("dtos", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + dtDefinition.getName(), SmartTypeDefinition.class), Cardinality.MANY)
				.withOutAttribute(AbstractTaskEngineSQL.SQL_ROWCOUNT, integerSmartType, Cardinality.ONE)
				.build();

		final Task task = Task.builder(taskDefinition)
				.addValue("dtos", entities)
				.addContextProperty("connectionName", getConnectionName())
				.build();

		final int sqlRowCount = taskManager
				.execute(task)
				.getResult();

		if (sqlRowCount == 0) {
			throw new VSystemException("no data updated");
		}

	}

	/**
	 * Creates the update request.
	 *
	 * @param dtDefinition the dtDefinition
	 * @return the sql request
	 */
	private static String createUpdateQuery(final DtDefinition dtDefinition, final String parameterName) {
		final String entityName = getEntityName(dtDefinition);
		final String tableName = StringUtil.camelToConstCase(entityName);
		final DtField idField = getIdField(dtDefinition);

		return new StringBuilder()
				.append("update ").append(tableName).append(" set ")

				.append(dtDefinition.getFields()
						.stream()
						.filter(dtField -> dtField.isPersistent() && !dtField.getType().isId())
						.map(dtField -> StringUtil.camelToConstCase(dtField.name()) + " =#" + parameterName + '.' + dtField.name() + '#')
						.collect(Collectors.joining(", ")))
				.append(" where ")
				.append(StringUtil.camelToConstCase(idField.name())).append(" = #").append(parameterName).append('.').append(idField.name()).append('#')
				.toString();
	}

	/**
	 * @param insert Si opération de type insert
	 * @return Classe du moteur de tache à utiliser
	 */
	private static Class<? extends TaskEngine> getTaskEngineClass(final boolean insert) {
		if (insert) {
			return TaskEngineInsert.class;
		}
		return TaskEngineProc.class;
	}

	/**
	 * @param entity Objet à persiter
	 * @param insert Si opération de type insert (update sinon)
	 */
	private void put(final Entity entity, final boolean insert) {
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(entity);
		final String entityName = getEntityName(dtDefinition);
		final String tableName = StringUtil.camelToConstCase(entityName);
		final String taskName = (insert ? TASK.TkInsert : TASK.TkUpdate) + entityName;

		final String request = insert ? sqlDialect.createInsertQuery(dtDefinition.getIdField().get().name(), getDataFields(dtDefinition), sequencePrefix, tableName, "dto") : createUpdateQuery(dtDefinition, "dto");

		final TaskDefinition taskDefinition = TaskDefinition.builder(taskName)
				.withEngine(getTaskEngineClass(insert))
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute("dto", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + dtDefinition.getName(), SmartTypeDefinition.class), Cardinality.ONE)
				.withOutAttribute(AbstractTaskEngineSQL.SQL_ROWCOUNT, integerSmartType, Cardinality.ONE)
				.build();

		final Task task = Task.builder(taskDefinition)
				.addValue("dto", entity)
				.addContextProperty("connectionName", getConnectionName())
				.build();

		final int sqlRowCount = taskManager
				.execute(task)
				.getResult();

		if (sqlRowCount > 1) {
			throw new VSystemException("more than one row has been " + (insert ? "created" : "updated"));
		}
		if (sqlRowCount == 0) {
			throw new VSystemException("no data " + (insert ? "created" : "updated"));
		}
	}

	private static List<String> getDataFields(final DtDefinition dtDefinition) {
		return dtDefinition.getFields()
				.stream()
				.filter(dtField -> !dtField.getType().isId())
				.filter(DtField::isPersistent)
				.map(DtField::name)
				.collect(Collectors.toList());
	}

	/** {@inheritDoc} */
	@Override
	public void delete(final DtDefinition dtDefinition, final UID uri) {
		Assertion.check()
				.isNotNull(dtDefinition)
				.isNotNull(uri);
		//---
		final DtField idField = getIdField(dtDefinition);
		final String entityName = getEntityName(dtDefinition);
		final String tableName = StringUtil.camelToConstCase(entityName);
		final String taskName = TASK.TkDelete + entityName;

		final String idFieldName = idField.name();

		final String request = new StringBuilder()
				.append("delete from ").append(tableName)
				.append(" where ").append(StringUtil.camelToConstCase(idFieldName)).append(" = #").append(idFieldName).append('#')
				.toString();

		final TaskDefinition taskDefinition = TaskDefinition.builder(taskName)
				.withEngine(TaskEngineProc.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute(idFieldName, idField.smartTypeDefinition(), Cardinality.ONE)
				.withOutAttribute(AbstractTaskEngineSQL.SQL_ROWCOUNT, integerSmartType, Cardinality.ONE)
				.build();

		final Task task = Task.builder(taskDefinition)
				.addValue(idFieldName, uri.getId())
				.addContextProperty("connectionName", getConnectionName())
				.build();

		final int sqlRowCount = taskManager
				.execute(task)
				.getResult();

		if (sqlRowCount > 1) {
			throw new VSystemException("more than one row has been deleted");
		} else if (sqlRowCount == 0) {
			throw new VSystemException("no row has been deleted");
		}
	}

	/** {@inheritDoc} */
	@Override
	public int count(final DtDefinition dtDefinition) {
		Assertion.check()
				.isNotNull(dtDefinition)
				.isTrue(dtDefinition.isPersistent(), "DtDefinition is not  persistent");
		//-----
		final String entityName = getEntityName(dtDefinition);
		final String tableName = StringUtil.camelToConstCase(entityName);
		final String taskName = TASK.TkCount + entityName;
		final SmartTypeDefinition countSmartType = SmartTypeDefinition.builder("STyCount", BasicType.Long).build();

		final String request = "select count(*) from " + tableName;

		final TaskDefinition taskDefinition = TaskDefinition.builder(taskName)
				.withEngine(TaskEngineSelect.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.withOutAttribute("count", countSmartType, Cardinality.ONE)
				.build();

		final Task task = Task.builder(taskDefinition)
				.addContextProperty("connectionName", getConnectionName())
				.build();

		final Long count = taskManager
				.execute(task)
				.getResult();

		return count.intValue();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E readNullableForUpdate(final DtDefinition dtDefinition, final UID<?> uri) {
		final String entityName = getEntityName(dtDefinition);
		final String tableName = StringUtil.camelToConstCase(entityName);
		final String taskName = TASK.TkLock + entityName;

		final String requestedCols = getRequestedCols(dtDefinition);
		final DtField idField = getIdField(dtDefinition);
		final String idFieldName = idField.name();
		final String request = sqlDialect.createSelectForUpdateQuery(tableName, requestedCols, idFieldName);

		final TaskDefinition taskDefinition = TaskDefinition.builder(taskName)
				.withEngine(TaskEngineSelect.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute(idFieldName, idField.smartTypeDefinition(), Cardinality.ONE)
				.withOutAttribute("dto", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + uri.getDefinition().getName(), SmartTypeDefinition.class), Cardinality.OPTIONAL_OR_NULLABLE)
				.build();

		final Task task = Task.builder(taskDefinition)
				.addValue(idFieldName, uri.getId())
				.addContextProperty("connectionName", getConnectionName())
				.build();

		return taskManager
				.execute(task)
				.getResult();
	}

	private String createLoadAllLikeQuery(
			final String tableName,
			final String requestedFields,
			final String where,
			final DtListState dtListState) {

		final StringBuilder request = new StringBuilder("select ")
				.append(requestedFields)
				.append(" from ").append(tableName)
				.append(" where ").append(where);

		sqlDialect.appendListState(request,
				dtListState.getMaxRows().orElse(null),
				dtListState.getSkipRows(),
				dtListState.getSortFieldName().orElse(null),
				dtListState.isSortDesc().orElse(false));
		return request.toString();
	}
}
