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
package io.vertigo.datastore.plugins.entitystore.sql;

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
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.node.Node;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.StringUtil;
import io.vertigo.database.sql.SqlManager;
import io.vertigo.database.sql.vendor.SqlDialect;
import io.vertigo.datamodel.criteria.Criteria;
import io.vertigo.datamodel.criteria.CriteriaEncoder;
import io.vertigo.datamodel.criteria.Criterions;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.definitions.association.DtListURIForNNAssociation;
import io.vertigo.datamodel.data.definitions.association.DtListURIForSimpleAssociation;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.data.util.AssociationUtil;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.task.TaskManager;
import io.vertigo.datamodel.task.definitions.TaskDefinition;
import io.vertigo.datamodel.task.model.Task;
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
		/** Prefix of the DELETE BATCH.*/
		TkDeleteBatch,
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
	 * Return the tableName to which the dataDefinition is mapped.
	 *
	 * @param dataDefinition the dataDefinition
	 * @return the name of the table
	 */
	private static String getEntityName(final DataDefinition dataDefinition) {
		return dataDefinition.getFragment().orElse(dataDefinition).id().shortName();
	}

	private static String getRequestedCols(final DataDefinition dataDefinition) {
		if (dataDefinition.getFragment().isPresent()) {
			return dataDefinition.getFields()
					.stream()
					.map(DataField::name)
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

	private static DataField getIdField(final DataDefinition dataDefinition) {
		Assertion.check().isNotNull(dataDefinition);
		//---
		return dataDefinition.getIdField().orElseThrow(() -> new IllegalStateException("no ID found"));
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E readNullable(final DataDefinition dataDefinition, final UID<E> uri) {
		final var entityName = getEntityName(dataDefinition);
		final var tableName = StringUtil.camelToConstCase(entityName);
		final var taskName = TASK.TkSelect + entityName + "ByUri";

		final var requestedCols = getRequestedCols(dataDefinition);
		final var idField = getIdField(dataDefinition);
		final var idFieldName = idField.name();
		final var request = " select " + requestedCols +
				" from " + tableName +
				" where " + StringUtil.camelToConstCase(idFieldName) + " = #" + idFieldName + '#';

		final var taskDefinition = TaskDefinition.builder(taskName)
				.withEngine(TaskEngineSelect.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute(idFieldName, idField.smartTypeDefinition(), Cardinality.ONE)
				.withOutAttribute("dto", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + uri.getDefinition().getName(), SmartTypeDefinition.class), Cardinality.OPTIONAL_OR_NULLABLE)
				.build();

		final var task = Task.builder(taskDefinition)
				.addValue(idFieldName, uri.getId())
				.addContextProperty("connectionName", getConnectionName())
				.build();

		return taskManager
				.execute(task)
				.getResult();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> DtList<E> findAll(final DataDefinition dataDefinition, final DtListURIForNNAssociation dtcUri) {
		Assertion.check()
				.isNotNull(dataDefinition)
				.isNotNull(dtcUri);
		//-----
		final var entityName = getEntityName(dataDefinition);
		final var tableName = StringUtil.camelToConstCase(entityName);

		final var taskName = TASK.TkSelect + "NNList" + entityName + "ByUri";

		//PK de la DtList recherchée
		final var idFieldName = StringUtil.camelToConstCase(getIdField(dataDefinition).name());
		//FK dans la table nn correspondant à la collection recherchée. (clé de jointure ).
		final var associationNNDefinition = dtcUri.getAssociationDefinition();
		final var joinTableName = associationNNDefinition.getTableName();
		final var joinDtDefinition = AssociationUtil.getAssociationNode(associationNNDefinition, dtcUri.getRoleName()).getDataDefinition();
		final var joinDataFieldName = StringUtil.camelToConstCase(getIdField(joinDtDefinition).name());

		//La condition s'applique sur l'autre noeud de la relation (par rapport à la collection attendue)
		final var associationNode = AssociationUtil.getAssociationNodeTarget(associationNNDefinition, dtcUri.getRoleName());
		final var fkField = getIdField(associationNode.getDataDefinition());
		final var fkFieldName = fkField.name();

		final var request = " select t.* from " +
				tableName + " t" +
				//On établit une jointure fermée entre la pk et la fk de la collection recherchée.
				" join " + joinTableName + " j on j." + joinDataFieldName + " = t." + idFieldName +
				//Condition de la recherche
				" where j." + StringUtil.camelToConstCase(fkFieldName) + " = #" + fkFieldName + '#';

		final var taskDefinition = TaskDefinition.builder(taskName)
				.withEngine(TaskEngineSelect.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute(fkFieldName, fkField.smartTypeDefinition(), Cardinality.ONE)
				.withOutAttribute("dtc", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + dataDefinition.getName(), SmartTypeDefinition.class), Cardinality.MANY)
				.build();

		final var uid = dtcUri.getSource();

		final var task = Task.builder(taskDefinition)
				.addValue(fkFieldName, uid.getId())
				.addContextProperty("connectionName", getConnectionName())
				.build();

		return taskManager
				.execute(task)
				.getResult();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> DtList<E> findAll(final DataDefinition dataDefinition, final DtListURIForSimpleAssociation dtcUri) {
		Assertion.check()
				.isNotNull(dataDefinition)
				.isNotNull(dtcUri);
		//---
		final var fkField = dtcUri.getAssociationDefinition().getFKField();
		final var value = dtcUri.getSource().getId();

		return findByCriteria(dataDefinition, Criterions.isEqualTo(fkField::name, value), DtListState.of(null));
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> DtList<E> findByCriteria(final DataDefinition dataDefinition, final Criteria<E> criteria, final DtListState dtListState) {
		Assertion.check()
				.isNotNull(dataDefinition)
				.isNotNull(criteria)
				.isNotNull(dtListState);
		//---
		final var entityName = getEntityName(dataDefinition);
		final var tableName = StringUtil.camelToConstCase(entityName);
		final var requestedCols = getRequestedCols(dataDefinition);
		final var taskName = getListTaskName(entityName);
		final var tuple = criteria.toStringAnCtx(criteriaEncoder);
		final var where = tuple.val1();
		final var request = createLoadAllLikeQuery(tableName, requestedCols, where, dtListState);
		final var taskDefinitionBuilder = TaskDefinition.builder(taskName)
				.withEngine(TaskEngineSelect.class)
				.withDataSpace(dataSpace)
				.withRequest(request);

		final var ctx = tuple.val2();
		//IN, Optional
		for (final String attributeName : ctx.getAttributeNames()) {
			taskDefinitionBuilder.addInAttribute(attributeName, dataDefinition.getField(ctx.getDataFieldName(attributeName)).smartTypeDefinition(), Cardinality.OPTIONAL_OR_NULLABLE);
		}
		//OUT, obligatoire
		final var taskDefinition = taskDefinitionBuilder
				.withOutAttribute("dtc", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + dataDefinition.getName(), SmartTypeDefinition.class), Cardinality.MANY)
				.build();

		final var taskBuilder = Task.builder(taskDefinition);
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
		final var fullName = TASK.TkSelect.name() +
				"List" +
				entityName +
				"ByCriteria";
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
	public <E extends Entity> E create(final DataDefinition dataDefinition, final E entity) {
		Assertion.check().isNull(DataModelUtil.getId(entity), "Only object without any id can be created");
		//------
		final var insert = true;
		put(entity, insert);
		return entity;
	}

	@Override
	public <E extends Entity> DtList<E> createList(final DtList<E> entities) {
		final var dataDefinition = entities.getDefinition();
		final var entityName = getEntityName(dataDefinition);
		final var tableName = StringUtil.camelToConstCase(entityName);
		//---
		final var request = sqlDialect.createInsertQuery(dataDefinition.getIdField().get().name(), getDataFields(dataDefinition), sequencePrefix, tableName, "dtos");

		final var taskDefinition = TaskDefinition.builder(TASK.TkInsertBatch.name() + entityName)
				.withEngine(TaskEngineInsertBatch.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute("dtos", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + dataDefinition.getName(), SmartTypeDefinition.class), Cardinality.MANY)
				.withOutAttribute(AbstractTaskEngineSQL.SQL_ROWCOUNT, integerSmartType, Cardinality.ONE)
				.build();

		final var task = Task.builder(taskDefinition)
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
	public void update(final DataDefinition dataDefinition, final Entity entity) {
		Assertion.check().isNotNull(DataModelUtil.getId(entity), "Need an id to update an object ");
		//-----
		final var insert = false;
		put(entity, insert);
	}

	@Override
	public <E extends Entity> void updateList(final DtList<E> entities) {
		final var dataDefinition = entities.getDefinition();
		final var entityName = getEntityName(dataDefinition);
		//---
		final var request = createUpdateQuery(dataDefinition, "dtos");

		final var taskDefinition = TaskDefinition.builder(TASK.TkUpdateBatch.name() + entityName)
				.withEngine(TaskEngineProcBatch.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute("dtos", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + dataDefinition.getName(), SmartTypeDefinition.class), Cardinality.MANY)
				.withOutAttribute(AbstractTaskEngineSQL.SQL_ROWCOUNT, integerSmartType, Cardinality.ONE)
				.build();

		final var task = Task.builder(taskDefinition)
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
	 * @param dataDefinition the dataDefinition
	 * @return the sql request
	 */
	private static String createUpdateQuery(final DataDefinition dataDefinition, final String parameterName) {
		final var entityName = getEntityName(dataDefinition);
		final var tableName = StringUtil.camelToConstCase(entityName);
		final var idField = getIdField(dataDefinition);

		return "update " + tableName + " set " +
				dataDefinition.getFields()
						.stream()
						.filter(dtField -> dtField.isPersistent() && !dtField.getType().isId())
						.map(dtField -> StringUtil.camelToConstCase(dtField.name()) + " =#" + parameterName + '.' + dtField.name() + '#')
						.collect(Collectors.joining(", "))
				+
				" where " +
				StringUtil.camelToConstCase(idField.name()) + " = #" + parameterName + '.' + idField.name() + '#';
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
		final var dataDefinition = DataModelUtil.findDataDefinition(entity);
		final var entityName = getEntityName(dataDefinition);
		final var tableName = StringUtil.camelToConstCase(entityName);
		final var taskName = (insert ? TASK.TkInsert : TASK.TkUpdate) + entityName;

		final var request = insert ? sqlDialect.createInsertQuery(dataDefinition.getIdField().get().name(), getDataFields(dataDefinition), sequencePrefix, tableName, "dto") : createUpdateQuery(dataDefinition, "dto");

		final var taskDefinition = TaskDefinition.builder(taskName)
				.withEngine(getTaskEngineClass(insert))
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute("dto", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + dataDefinition.getName(), SmartTypeDefinition.class), Cardinality.ONE)
				.withOutAttribute(AbstractTaskEngineSQL.SQL_ROWCOUNT, integerSmartType, Cardinality.ONE)
				.build();

		final var task = Task.builder(taskDefinition)
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

	private static List<String> getDataFields(final DataDefinition dataDefinition) {
		return dataDefinition.getFields()
				.stream()
				.filter(dtField -> !dtField.getType().isId())
				.filter(DataField::isPersistent)
				.map(DataField::name)
				.toList();
	}

	/** {@inheritDoc} */
	@Override
	public void delete(final DataDefinition dataDefinition, final UID uri) {
		Assertion.check()
				.isNotNull(dataDefinition)
				.isNotNull(uri);
		//---
		final var idField = getIdField(dataDefinition);
		final var entityName = getEntityName(dataDefinition);
		final var tableName = StringUtil.camelToConstCase(entityName);
		final var taskName = TASK.TkDelete + entityName;

		final var idFieldName = idField.name();

		final var request = "delete from " + tableName +
				" where " + StringUtil.camelToConstCase(idFieldName) + " = #" + idFieldName + '#';

		final var taskDefinition = TaskDefinition.builder(taskName)
				.withEngine(TaskEngineProc.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute(idFieldName, idField.smartTypeDefinition(), Cardinality.ONE)
				.withOutAttribute(AbstractTaskEngineSQL.SQL_ROWCOUNT, integerSmartType, Cardinality.ONE)
				.build();

		final var task = Task.builder(taskDefinition)
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

	@Override
	public <E extends Entity> void deleteList(final List<UID<E>> uids) {
		Assertion.check()
				.isNotNull(uids)
				.isFalse(uids.isEmpty(), "Cannot delete by list with an empty list");
		// ---
		final var dataDefinition = uids.get(0).getDefinition();
		final var idField = getIdField(dataDefinition);
		final var entityName = getEntityName(dataDefinition);
		final var tableName = StringUtil.camelToConstCase(entityName);
		final var idFieldName = idField.name();
		//---
		final var request = "delete from " + tableName +
				" where " + StringUtil.camelToConstCase(idFieldName) + " = #uids#";

		final var taskDefinition = TaskDefinition.builder(TASK.TkDeleteBatch.name() + entityName)
				.withEngine(TaskEngineProcBatch.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute("uids", idField.smartTypeDefinition(), Cardinality.MANY)
				.withOutAttribute(AbstractTaskEngineSQL.SQL_ROWCOUNT, integerSmartType, Cardinality.ONE)
				.build();

		final var task = Task.builder(taskDefinition)
				.addValue("uids", uids.stream().map(UID::getId).toList())
				.addContextProperty("connectionName", getConnectionName())
				.build();

		final int sqlRowCount = taskManager
				.execute(task)
				.getResult();

		if (sqlRowCount != uids.size()) {
			throw new VSystemException("Deleted row count mismatch the size of elements in delete by list");
		}

	}

	/** {@inheritDoc} */
	@Override
	public int count(final DataDefinition dataDefinition) {
		Assertion.check()
				.isNotNull(dataDefinition)
				.isTrue(dataDefinition.isPersistent(), "DtDefinition is not  persistent");
		//-----
		final var entityName = getEntityName(dataDefinition);
		final var tableName = StringUtil.camelToConstCase(entityName);
		final var taskName = TASK.TkCount + entityName;
		final var countSmartType = SmartTypeDefinition.builder("STyCount", BasicType.Long).build();

		final var request = "select count(*) from " + tableName;

		final var taskDefinition = TaskDefinition.builder(taskName)
				.withEngine(TaskEngineSelect.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.withOutAttribute("count", countSmartType, Cardinality.ONE)
				.build();

		final var task = Task.builder(taskDefinition)
				.addContextProperty("connectionName", getConnectionName())
				.build();

		final var count = (Long) taskManager
				.execute(task)
				.getResult();

		return count.intValue();
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E readNullableForUpdate(final DataDefinition dataDefinition, final UID<?> uri) {
		final var entityName = getEntityName(dataDefinition);
		final var tableName = StringUtil.camelToConstCase(entityName);
		final var taskName = TASK.TkLock + entityName;

		final var requestedCols = getRequestedCols(dataDefinition);
		final var idField = getIdField(dataDefinition);
		final var idFieldName = idField.name();
		final var request = sqlDialect.createSelectForUpdateQuery(tableName, requestedCols, idFieldName);

		final var taskDefinition = TaskDefinition.builder(taskName)
				.withEngine(TaskEngineSelect.class)
				.withDataSpace(dataSpace)
				.withRequest(request)
				.addInAttribute(idFieldName, idField.smartTypeDefinition(), Cardinality.ONE)
				.withOutAttribute("dto", Node.getNode().getDefinitionSpace().resolve(SMART_TYPE_PREFIX + uri.getDefinition().getName(), SmartTypeDefinition.class), Cardinality.OPTIONAL_OR_NULLABLE)
				.build();

		final var task = Task.builder(taskDefinition)
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

		final var request = new StringBuilder("select ")
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
