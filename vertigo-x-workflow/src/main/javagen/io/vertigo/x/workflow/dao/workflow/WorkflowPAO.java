package io.vertigo.x.workflow.dao.workflow;

import javax.inject.Inject;

import java.util.Optional;
import io.vertigo.app.Home;
import io.vertigo.lang.Assertion;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.dynamo.store.StoreServices;

/**
 * PAO : Accès aux objects du package. 
 * WorkflowPAO
 */
public final class WorkflowPAO implements StoreServices {
	private final TaskManager taskManager;

	/**
	 * Constructeur.
	 * @param taskManager Manager des Task
	 */
	@Inject
	public WorkflowPAO(final TaskManager taskManager) {
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
	 * Execute la tache TK_COUNT_DEFAULT_TRANSACTIONS.
	 * @param wfwdId Long 
	 * @return Integer number
	*/
	public Integer countDefaultTransactions(final Long wfwdId) {
		final Task task = createTaskBuilder("TK_COUNT_DEFAULT_TRANSACTIONS")
				.addValue("WFWD_ID", wfwdId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TK_DELETE_ACTIVITIES_BY_DEFINTIONS_IDS.
	 * @param wfadId Long 
	*/
	public void deleteActivitiesByDefintionsIds(final Long wfadId) {
		final Task task = createTaskBuilder("TK_DELETE_ACTIVITIES_BY_DEFINTIONS_IDS")
				.addValue("WFAD_ID", wfadId)
				.build();
		getTaskManager().execute(task);
	}

	/**
	 * Execute la tache TK_INCREMENT_ACTIVITY_DEFINITION_POSITIONS_AFTER.
	 * @param wfwdId Long 
	 * @param level Integer 
	*/
	public void incrementActivityDefinitionPositionsAfter(final Long wfwdId, final Integer level) {
		final Task task = createTaskBuilder("TK_INCREMENT_ACTIVITY_DEFINITION_POSITIONS_AFTER")
				.addValue("WFWD_ID", wfwdId)
				.addValue("LEVEL", level)
				.build();
		getTaskManager().execute(task);
	}

	/**
	 * Execute la tache TK_INSERT_ACTIVITY_UPDATE_WORKFLOW.
	*/
	public void insertActivityUpdateWorkflow() {
		final Task task = createTaskBuilder("TK_INSERT_ACTIVITY_UPDATE_WORKFLOW")
				.build();
		getTaskManager().execute(task);
	}

	/**
	 * Execute la tache TK_UNSET_CURRENT_ACTIVITY.
	 * @param wfadId Long 
	*/
	public void unsetCurrentActivity(final Long wfadId) {
		final Task task = createTaskBuilder("TK_UNSET_CURRENT_ACTIVITY")
				.addValue("WFAD_ID", wfadId)
				.build();
		getTaskManager().execute(task);
	}

	/**
	 * Execute la tache TK_UPDATE_ACTIVITIES_IS_AUTO.
	*/
	public void updateActivitiesIsAuto() {
		final Task task = createTaskBuilder("TK_UPDATE_ACTIVITIES_IS_AUTO")
				.build();
		getTaskManager().execute(task);
	}

	/**
	 * Execute la tache TK_UPDATE_WORKFLOW_CURRENT_ACTIVITIES.
	*/
	public void updateWorkflowCurrentActivities() {
		final Task task = createTaskBuilder("TK_UPDATE_WORKFLOW_CURRENT_ACTIVITIES")
				.build();
		getTaskManager().execute(task);
	}

	/**
	 * Execute la tache TK_SHIFT_ACTIVITY_DEFINITION_POSITIONS_BETWEEN.
	 * @param shift Integer 
	 * @param levelStart Integer 
	 * @param levelEnd Integer 
	 * @param wfwdId Long (peut être null)
	*/
	public void shiftActivityDefinitionPositionsBetween(final Integer shift, final Integer levelStart, final Integer levelEnd, final Optional<Long> wfwdId) {
		final Task task = createTaskBuilder("TK_SHIFT_ACTIVITY_DEFINITION_POSITIONS_BETWEEN")
				.addValue("SHIFT", shift)
				.addValue("LEVEL_START", levelStart)
				.addValue("LEVEL_END", levelEnd)
				.addValue("WFWD_ID", wfwdId.orElse(null))
				.build();
		getTaskManager().execute(task);
	}

    
    private TaskManager getTaskManager(){
    	return taskManager;
    } 
}
