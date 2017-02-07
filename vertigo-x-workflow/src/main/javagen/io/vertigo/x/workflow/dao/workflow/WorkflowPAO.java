package io.vertigo.x.workflow.dao.workflow;

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
	 * Execute la tache TK_HAS_NEXT_TRANSITION.
	 * @param wfadIdFrom Long 
	 * @param name String 
	 * @return Integer wfTransitionDefinitionCount
	*/
	public Integer hasNextTransition(final Long wfadIdFrom, final String name) {
		final Task task = createTaskBuilder("TK_HAS_NEXT_TRANSITION")
				.addValue("WFAD_ID_FROM", wfadIdFrom)
				.addValue("NAME", name)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

    
    private TaskManager getTaskManager(){
    	return taskManager;
    } 
}
