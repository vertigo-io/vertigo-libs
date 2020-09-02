package io.vertigo.orchestra.dao.execution;

import javax.inject.Inject;

import java.util.Optional;
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
import io.vertigo.orchestra.domain.execution.OActivityWorkspace;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
public final class OActivityWorkspaceDAO extends DAO<OActivityWorkspace, java.lang.Long> implements StoreServices {

	/**
	 * Contructeur.
	 * @param entityStoreManager Manager de persistance
	 * @param taskManager Manager de Task
	 * @param smartTypeManager SmartTypeManager
	 */
	@Inject
	public OActivityWorkspaceDAO(final EntityStoreManager entityStoreManager, final TaskManager taskManager, final SmartTypeManager smartTypeManager) {
		super(OActivityWorkspace.class, entityStoreManager, taskManager, smartTypeManager);
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
	 * Execute la tache TkGetActivityWorkspace.
	 * @param aceId Long
	 * @param workspaceIn Boolean
	 * @return Option de OActivityWorkspace dtOActivityWorkspace
	*/
	@io.vertigo.datamodel.task.proxy.TaskAnnotation(
			dataSpace = "orchestra",
			name = "TkGetActivityWorkspace",
			request = "select acw.*" + 
 "        	 from o_activity_workspace acw" + 
 "        	 where acw.ACE_ID = #aceId#" + 
 "        	 and   acw.IS_IN = #workspaceIn#",
			taskEngineClass = io.vertigo.basics.task.TaskEngineSelect.class)
	@io.vertigo.datamodel.task.proxy.TaskOutput(smartType = "STyDtOActivityWorkspace")
	public Optional<io.vertigo.orchestra.domain.execution.OActivityWorkspace> getActivityWorkspace(@io.vertigo.datamodel.task.proxy.TaskInput(name = "aceId", smartType = "STyOIdentifiant") final Long aceId, @io.vertigo.datamodel.task.proxy.TaskInput(name = "workspaceIn", smartType = "STyOBooleen") final Boolean workspaceIn) {
		final Task task = createTaskBuilder("TkGetActivityWorkspace")
				.addValue("aceId", aceId)
				.addValue("workspaceIn", workspaceIn)
				.addContextProperty("connectionName", io.vertigo.datastore.impl.dao.StoreUtil.getConnectionName("orchestra"))
				.build();
		return Optional.ofNullable((io.vertigo.orchestra.domain.execution.OActivityWorkspace) getTaskManager()
				.execute(task)
				.getResult());
	}

}
