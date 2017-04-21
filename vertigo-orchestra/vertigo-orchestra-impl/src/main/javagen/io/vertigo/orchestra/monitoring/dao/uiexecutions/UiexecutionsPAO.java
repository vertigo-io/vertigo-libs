package io.vertigo.orchestra.monitoring.dao.uiexecutions;

import javax.inject.Inject;

import io.vertigo.app.Home;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.lang.Assertion;

/**
 * PAO : Accès aux objects du package. 
 * UiexecutionsPAO
 */
public final class UiexecutionsPAO implements StoreServices {
	private final TaskManager taskManager;

	/**
	 * Constructeur.
	 * @param taskManager Manager des Task
	 */
	@Inject
	public UiexecutionsPAO(final TaskManager taskManager) {
		Assertion.checkNotNull(taskManager);
		//-----
		this.taskManager = taskManager;
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
	 * Execute la tache TK_GET_ACTIVITIES_BY_PRE_ID.
	 * @param preId Long 
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.monitoring.domain.uiexecutions.OActivityExecutionUi> dtcOActivityExecutionUi
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.monitoring.domain.uiexecutions.OActivityExecutionUi> getActivitiesByPreId(final Long preId) {
		final Task task = createTaskBuilder("TK_GET_ACTIVITIES_BY_PRE_ID")
				.addValue("PRE_ID", preId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TK_GET_ACTIVITIY_BY_ACE_ID.
	 * @param aceId Long 
	 * @return io.vertigo.orchestra.monitoring.domain.uiexecutions.OActivityExecutionUi dtOActivityExecutionUi
	*/
	public io.vertigo.orchestra.monitoring.domain.uiexecutions.OActivityExecutionUi getActivitiyByAceId(final Long aceId) {
		final Task task = createTaskBuilder("TK_GET_ACTIVITIY_BY_ACE_ID")
				.addValue("ACE_ID", aceId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TK_GET_EXECUTIONS_BY_PROCESS_NAME.
	 * @param name String 
	 * @param status String 
	 * @param limit Integer 
	 * @param offset Integer 
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.monitoring.domain.uiexecutions.OProcessExecutionUi> dtcOProcessExecutionUi
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.monitoring.domain.uiexecutions.OProcessExecutionUi> getExecutionsByProcessName(final String name, final String status, final Integer limit, final Integer offset) {
		final Task task = createTaskBuilder("TK_GET_EXECUTIONS_BY_PROCESS_NAME")
				.addValue("NAME", name)
				.addValue("STATUS", status)
				.addValue("LIMIT", limit)
				.addValue("OFFSET", offset)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TK_GET_EXECUTION_BY_PRE_ID.
	 * @param preId Long 
	 * @return io.vertigo.orchestra.monitoring.domain.uiexecutions.OProcessExecutionUi dtOProcessExecutionUi
	*/
	public io.vertigo.orchestra.monitoring.domain.uiexecutions.OProcessExecutionUi getExecutionByPreId(final Long preId) {
		final Task task = createTaskBuilder("TK_GET_EXECUTION_BY_PRE_ID")
				.addValue("PRE_ID", preId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	private TaskManager getTaskManager() {
		return taskManager;
	}
}
