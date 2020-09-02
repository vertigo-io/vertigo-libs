package io.vertigo.orchestra.dao.execution;

import javax.inject.Inject;

import io.vertigo.core.lang.Generated;
import io.vertigo.core.node.Node;
import io.vertigo.datamodel.task.definitions.TaskDefinition;
import io.vertigo.datamodel.task.model.Task;
import io.vertigo.datamodel.task.model.TaskBuilder;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.datastore.impl.dao.DAO;
import io.vertigo.datastore.impl.dao.StoreServices;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.task.TaskManager;
import io.vertigo.orchestra.domain.execution.OActivityExecution;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
public final class OActivityExecutionDAO extends DAO<OActivityExecution, java.lang.Long> implements StoreServices {

	/**
	 * Contructeur.
	 * @param entityStoreManager Manager de persistance
	 * @param taskManager Manager de Task
	 * @param smartTypeManager SmartTypeManager
	 */
	@Inject
	public OActivityExecutionDAO(final EntityStoreManager entityStoreManager, final TaskManager taskManager, final SmartTypeManager smartTypeManager) {
		super(OActivityExecution.class, entityStoreManager, taskManager, smartTypeManager);
	}


	/**
	 * Creates a taskBuilder.
	 * @param name  the name of the task
	 * @return the builder 
	 */
	private static TaskBuilder createTaskBuilder(final String name) {
		final TaskDefinition taskDefinition = Node.getNode().getDefinitionSpace().resolve(name, TaskDefinition.class);
		return Task.builder(taskDefinition);
	}

	/**
	 * Execute la tache TkGetActivitiesToLaunch.
	 * @param nodId Long
	 * @return DtList de OActivityExecution dtcActivityExecution
	*/
	@io.vertigo.datamodel.task.proxy.TaskAnnotation(
			dataSpace = "orchestra",
			name = "TkGetActivitiesToLaunch",
			request = "select " + 
 "        		ace.*" + 
 "        	from o_activity_execution ace" + 
 "        	where ace.EST_CD = 'RESERVED'" + 
 "        	and ace.NOD_ID = #nodId#",
			taskEngineClass = io.vertigo.basics.task.TaskEngineSelect.class)
	@io.vertigo.datamodel.task.proxy.TaskOutput(smartType = "STyDtOActivityExecution")
	public io.vertigo.datamodel.structure.model.DtList<io.vertigo.orchestra.domain.execution.OActivityExecution> getActivitiesToLaunch(@io.vertigo.datamodel.task.proxy.TaskInput(name = "nodId", smartType = "STyOIdentifiant") final Long nodId) {
		final Task task = createTaskBuilder("TkGetActivitiesToLaunch")
				.addValue("nodId", nodId)
				.addContextProperty("connectionName", io.vertigo.datastore.impl.dao.StoreUtil.getConnectionName("orchestra"))
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TkGetActivityExecutionByToken.
	 * @param aceId Long
	 * @param token String
	 * @return OActivityExecution dtActivityExecution
	*/
	@io.vertigo.datamodel.task.proxy.TaskAnnotation(
			dataSpace = "orchestra",
			name = "TkGetActivityExecutionByToken",
			request = "select " + 
 "        		ace.*" + 
 "        	from o_activity_execution ace" + 
 "        	where ace.ACE_ID = #aceId#" + 
 "        	and ace.TOKEN = #token#",
			taskEngineClass = io.vertigo.basics.task.TaskEngineSelect.class)
	@io.vertigo.datamodel.task.proxy.TaskOutput(smartType = "STyDtOActivityExecution")
	public io.vertigo.orchestra.domain.execution.OActivityExecution getActivityExecutionByToken(@io.vertigo.datamodel.task.proxy.TaskInput(name = "aceId", smartType = "STyOIdentifiant") final Long aceId, @io.vertigo.datamodel.task.proxy.TaskInput(name = "token", smartType = "STyOToken") final String token) {
		final Task task = createTaskBuilder("TkGetActivityExecutionByToken")
				.addValue("aceId", aceId)
				.addValue("token", token)
				.addContextProperty("connectionName", io.vertigo.datastore.impl.dao.StoreUtil.getConnectionName("orchestra"))
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TkGetActivityExecutionsByPreId.
	 * @param preId Long
	 * @return DtList de OActivityExecution dtcOActivityExecution
	*/
	@io.vertigo.datamodel.task.proxy.TaskAnnotation(
			dataSpace = "orchestra",
			name = "TkGetActivityExecutionsByPreId",
			request = "select ace.*" + 
 "        	from o_activity_execution ace" + 
 "        	where ace.PRE_ID = #preId#",
			taskEngineClass = io.vertigo.basics.task.TaskEngineSelect.class)
	@io.vertigo.datamodel.task.proxy.TaskOutput(smartType = "STyDtOActivityExecution")
	public io.vertigo.datamodel.structure.model.DtList<io.vertigo.orchestra.domain.execution.OActivityExecution> getActivityExecutionsByPreId(@io.vertigo.datamodel.task.proxy.TaskInput(name = "preId", smartType = "STyOIdentifiant") final Long preId) {
		final Task task = createTaskBuilder("TkGetActivityExecutionsByPreId")
				.addValue("preId", preId)
				.addContextProperty("connectionName", io.vertigo.datastore.impl.dao.StoreUtil.getConnectionName("orchestra"))
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

}
