package io.vertigo.orchestra.monitoring.dao.uidefinitions;

import javax.inject.Inject;

import io.vertigo.app.Home;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.Generated;

/**
 * This class is automatically generated.
 */
 @Generated
public final class UidefinitionsPAO implements StoreServices {
	private final TaskManager taskManager;

	/**
	 * Constructeur.
	 * @param taskManager Manager des Task
	 */
	@Inject
	public UidefinitionsPAO(final TaskManager taskManager) {
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
	 * Execute la tache TK_GET_PROCESS_BY_PRO_ID.
	 * @param proId Long 
	 * @return io.vertigo.orchestra.monitoring.domain.uidefinitions.OProcessUi dtOProcessUi
	*/
	public io.vertigo.orchestra.monitoring.domain.uidefinitions.OProcessUi getProcessByProId(final Long proId) {
		final Task task = createTaskBuilder("TK_GET_PROCESS_BY_PRO_ID")
				.addValue("PRO_ID", proId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TK_SEARCH_PROCESS_BY_LABEL.
	 * @param search String 
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.monitoring.domain.uidefinitions.OProcessUi> dtcOProcessUi
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.monitoring.domain.uidefinitions.OProcessUi> searchProcessByLabel(final String search) {
		final Task task = createTaskBuilder("TK_SEARCH_PROCESS_BY_LABEL")
				.addValue("SEARCH", search)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	private TaskManager getTaskManager() {
		return taskManager;
	}
}
