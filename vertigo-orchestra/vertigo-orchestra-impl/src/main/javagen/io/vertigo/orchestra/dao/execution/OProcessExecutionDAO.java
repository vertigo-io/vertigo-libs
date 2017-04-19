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
import io.vertigo.orchestra.domain.execution.OProcessExecution;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * OProcessExecutionDAO
 */
public final class OProcessExecutionDAO extends DAO<OProcessExecution, java.lang.Long> implements StoreServices {

	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public OProcessExecutionDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(OProcessExecution.class, storeManager, taskManager);
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
	 * Execute la tache TK_GET_ACTIVE_PROCESS_EXECUTION_BY_PRO_ID.
	 * @param proId Long 
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.domain.execution.OProcessExecution> dtcProcessExecution
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.domain.execution.OProcessExecution> getActiveProcessExecutionByProId(final Long proId) {
		final Task task = createTaskBuilder("TK_GET_ACTIVE_PROCESS_EXECUTION_BY_PRO_ID")
				.addValue("PRO_ID", proId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TK_GET_EXECUTIONS_BY_PRO_ID.
	 * @param proId Long 
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.domain.execution.OProcessExecution> dtcOProcessExecution
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.domain.execution.OProcessExecution> getExecutionsByProId(final Long proId) {
		final Task task = createTaskBuilder("TK_GET_EXECUTIONS_BY_PRO_ID")
				.addValue("PRO_ID", proId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

}
