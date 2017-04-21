package io.vertigo.orchestra.dao.execution;

import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.app.Home;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.orchestra.domain.execution.OActivityWorkspace;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * OActivityWorkspaceDAO
 */
public final class OActivityWorkspaceDAO extends DAO<OActivityWorkspace, java.lang.Long> implements StoreServices {

	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public OActivityWorkspaceDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(OActivityWorkspace.class, storeManager, taskManager);
	}

	/**
	 * Creates a taskBuilder.
	 * @param name  the name of the task
	 * @return the builder 
	 */
	private static TaskBuilder createTaskBuilder(final String name) {
		final TaskDefinition taskDefinition = Home.getApp().getDefinitionSpace().resolve(name, TaskDefinition.class);
		return Task.builder(taskDefinition);
	}

	/**
	 * Execute la tache TK_GET_ACTIVITY_WORKSPACE.
	 * @param aceId Long 
	 * @param in Boolean 
	 * @return Option de io.vertigo.orchestra.domain.execution.OActivityWorkspace dtOActivityWorkspace
	*/
	public Optional<io.vertigo.orchestra.domain.execution.OActivityWorkspace> getActivityWorkspace(final Long aceId, final Boolean in) {
		final Task task = createTaskBuilder("TK_GET_ACTIVITY_WORKSPACE")
				.addValue("ACE_ID", aceId)
				.addValue("IN", in)
				.build();
		return Optional.ofNullable((io.vertigo.orchestra.domain.execution.OActivityWorkspace) getTaskManager()
				.execute(task)
				.getResult());
	}

}
