package io.vertigo.orchestra.dao.definition;

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
 * DefinitionPAO
 */
public final class DefinitionPAO implements StoreServices {
	private final TaskManager taskManager;

	/**
	 * Constructeur.
	 * @param taskManager Manager des Task
	 */
	@Inject
	public DefinitionPAO(final TaskManager taskManager) {
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
	 * Execute la tache TK_DISABLE_OLD_PROCESS_DEFINITIONS.
	 * @param name String 
	*/
	public void disableOldProcessDefinitions(final String name) {
		final Task task = createTaskBuilder("TK_DISABLE_OLD_PROCESS_DEFINITIONS")
				.addValue("NAME", name)
				.build();
		getTaskManager().execute(task);
	}

	/**
	 * Execute la tache TK_GET_PROCESSES_BY_NAME.
	 * @param name String 
	 * @return Integer nombre
	*/
	public Integer getProcessesByName(final String name) {
		final Task task = createTaskBuilder("TK_GET_PROCESSES_BY_NAME")
				.addValue("NAME", name)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	private TaskManager getTaskManager() {
		return taskManager;
	}
}
