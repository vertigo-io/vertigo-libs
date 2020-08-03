package io.vertigo.orchestra.dao.definition;

import javax.inject.Inject;

import io.vertigo.core.node.Node;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Generated;
import io.vertigo.datamodel.task.TaskManager;
import io.vertigo.datamodel.task.metamodel.TaskDefinition;
import io.vertigo.datamodel.task.model.Task;
import io.vertigo.datamodel.task.model.TaskBuilder;
import io.vertigo.datastore.impl.dao.StoreServices;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
 @Generated
public final class DefinitionPAO implements StoreServices {
	private final TaskManager taskManager;

	/**
	 * Constructeur.
	 * @param taskManager Manager des Task
	 */
	@Inject
	public DefinitionPAO(final TaskManager taskManager) {
		Assertion.check().isNotNull(taskManager);
		//-----
		this.taskManager = taskManager;
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
	 * Execute la tache TkDisableOldProcessDefinitions.
	 * @param name String
	*/
	@io.vertigo.datamodel.task.proxy.TaskAnnotation(
			dataSpace = "orchestra",
			name = "TkDisableOldProcessDefinitions",
			request = "update o_process " + 
 "        	set ACTIVE_VERSION = false," + 
 "        		NEED_UPDATE = false" + 
 "        	where NAME = #name#",
			taskEngineClass = io.vertigo.dynamox.task.TaskEngineProc.class)
	public void disableOldProcessDefinitions(@io.vertigo.datamodel.task.proxy.TaskInput(name = "name", smartType = "STyOLibelle") final String name) {
		final Task task = createTaskBuilder("TkDisableOldProcessDefinitions")
				.addValue("name", name)
				.build();
		getTaskManager().execute(task);
	}

	/**
	 * Execute la tache TkGetProcessesByName.
	 * @param name String
	 * @return Integer nombre
	*/
	@io.vertigo.datamodel.task.proxy.TaskAnnotation(
			dataSpace = "orchestra",
			name = "TkGetProcessesByName",
			request = "select " + 
 "        		count(*)" + 
 "        	from o_process pro" + 
 "        	where pro.NAME = #name#",
			taskEngineClass = io.vertigo.dynamox.task.TaskEngineSelect.class)
	@io.vertigo.datamodel.task.proxy.TaskOutput(smartType = "STyONombre")
	public Integer getProcessesByName(@io.vertigo.datamodel.task.proxy.TaskInput(name = "name", smartType = "STyOLibelle") final String name) {
		final Task task = createTaskBuilder("TkGetProcessesByName")
				.addValue("name", name)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	private TaskManager getTaskManager() {
		return taskManager;
	}
}
