package io.vertigo.orchestra.dao.execution;

import javax.inject.Inject;
import io.vertigo.app.Home;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.orchestra.domain.execution.OActivityExecution;
import io.vertigo.lang.Generated;

/**
 * This class is automatically generated.
 */
 @Generated
public final class OActivityExecutionDAO extends DAO<OActivityExecution, java.lang.Long> implements StoreServices {

	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public OActivityExecutionDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(OActivityExecution.class, storeManager, taskManager);
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
	 * Execute la tache TK_GET_ACTIVITIES_TO_LAUNCH.
	 * @param nodId Long 
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.domain.execution.OActivityExecution> dtcActivityExecution
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.domain.execution.OActivityExecution> getActivitiesToLaunch(final Long nodId) {
		final Task task = createTaskBuilder("TK_GET_ACTIVITIES_TO_LAUNCH")
				.addValue("NOD_ID", nodId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TK_GET_ACTIVITY_EXECUTIONS_BY_PRE_ID.
	 * @param preId Long 
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.domain.execution.OActivityExecution> dtcOActivityExecution
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.domain.execution.OActivityExecution> getActivityExecutionsByPreId(final Long preId) {
		final Task task = createTaskBuilder("TK_GET_ACTIVITY_EXECUTIONS_BY_PRE_ID")
				.addValue("PRE_ID", preId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TK_GET_ACTIVITY_EXECUTION_BY_TOKEN.
	 * @param aceId Long 
	 * @param token String 
	 * @return io.vertigo.orchestra.domain.execution.OActivityExecution dtActivityExecution
	*/
	public io.vertigo.orchestra.domain.execution.OActivityExecution getActivityExecutionByToken(final Long aceId, final String token) {
		final Task task = createTaskBuilder("TK_GET_ACTIVITY_EXECUTION_BY_TOKEN")
				.addValue("ACE_ID", aceId)
				.addValue("TOKEN", token)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

}
