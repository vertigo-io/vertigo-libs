package io.vertigo.orchestra.dao.definition;

import javax.inject.Inject;

import java.util.Optional;
import io.vertigo.core.lang.Generated;
import io.vertigo.core.node.Home;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.datastore.impl.dao.DAO;
import io.vertigo.datastore.impl.dao.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.orchestra.domain.definition.OProcess;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
public final class OProcessDAO extends DAO<OProcess, java.lang.Long> implements StoreServices {

	/**
	 * Contructeur.
	 * @param entityStoreManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public OProcessDAO(final EntityStoreManager entityStoreManager, final TaskManager taskManager) {
		super(OProcess.class, entityStoreManager, taskManager);
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
	 * Execute la tache TkGetActiveProcessByName.
	 * @param name String
	 * @return Option de OProcess dtProcess
	*/
	public Optional<io.vertigo.orchestra.domain.definition.OProcess> getActiveProcessByName(final String name) {
		final Task task = createTaskBuilder("TkGetActiveProcessByName")
				.addValue("name", name)
				.build();
		return Optional.ofNullable((io.vertigo.orchestra.domain.definition.OProcess) getTaskManager()
				.execute(task)
				.getResult());
	}

	/**
	 * Execute la tache TkGetAllActiveProcesses.
	 * @return DtList de OProcess dtcProcesses
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.domain.definition.OProcess> getAllActiveProcesses() {
		final Task task = createTaskBuilder("TkGetAllActiveProcesses")
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

}
