package io.vertigo.orchestra.dao.planification;

import javax.inject.Inject;

import io.vertigo.app.Home;
import io.vertigo.lang.Assertion;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.dynamo.store.StoreServices;

/**
 * PAO : Accès aux objects du package. 
 * PlanificationPAO
 */
public final class PlanificationPAO implements StoreServices {
	private final TaskManager taskManager;

	/**
	 * Constructeur.
	 * @param taskManager Manager des Task
	 */
	@Inject
	public PlanificationPAO(final TaskManager taskManager) {
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
		return new TaskBuilder(taskDefinition);
	}

	/**
	 * Execute la tache TK_CLEAN_FUTURE_PLANIFICATIONS.
	 * @param processName String 
	*/
	public void cleanFuturePlanifications(final String processName) {
		final Task task = createTaskBuilder("TK_CLEAN_FUTURE_PLANIFICATIONS")
				.addValue("PROCESS_NAME", processName)
				.build();
		getTaskManager().execute(task);
	}

	/**
	 * Execute la tache TK_CLEAN_PLANIFICATIONS_ON_BOOT.
	 * @param currentDate java.util.Date 
	*/
	public void cleanPlanificationsOnBoot(final java.util.Date currentDate) {
		final Task task = createTaskBuilder("TK_CLEAN_PLANIFICATIONS_ON_BOOT")
				.addValue("CURRENT_DATE", currentDate)
				.build();
		getTaskManager().execute(task);
	}

	/**
	 * Execute la tache TK_RESERVE_PROCESS_TO_EXECUTE.
	 * @param lowerLimit java.util.Date 
	 * @param upperLimit java.util.Date 
	 * @param nodId Long 
	*/
	public void reserveProcessToExecute(final java.util.Date lowerLimit, final java.util.Date upperLimit, final Long nodId) {
		final Task task = createTaskBuilder("TK_RESERVE_PROCESS_TO_EXECUTE")
				.addValue("LOWER_LIMIT", lowerLimit)
				.addValue("UPPER_LIMIT", upperLimit)
				.addValue("NOD_ID", nodId)
				.build();
		getTaskManager().execute(task);
	}

	private TaskManager getTaskManager() {
		return taskManager;
	}
}
