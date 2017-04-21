package io.vertigo.orchestra.dao.definition;

import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.app.Home;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.orchestra.domain.definition.OActivity;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * OActivityDAO
 */
public final class OActivityDAO extends DAO<OActivity, java.lang.Long> implements StoreServices {

	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public OActivityDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(OActivity.class, storeManager, taskManager);
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
	 * Execute la tache TK_GET_ACTIVITIES_BY_PRO_ID.
	 * @param proId Long 
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.domain.definition.OActivity> dtOActivities
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.domain.definition.OActivity> getActivitiesByProId(final Long proId) {
		final Task task = createTaskBuilder("TK_GET_ACTIVITIES_BY_PRO_ID")
				.addValue("PRO_ID", proId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TK_GET_ALL_ACTIVITIES_IN_ACTIVE_PROCESSES.
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.domain.definition.OActivity> dtOActivities
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.orchestra.domain.definition.OActivity> getAllActivitiesInActiveProcesses() {
		final Task task = createTaskBuilder("TK_GET_ALL_ACTIVITIES_IN_ACTIVE_PROCESSES")
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TK_GET_FIRST_ACTIVITY_BY_PROCESS.
	 * @param proId Long 
	 * @return io.vertigo.orchestra.domain.definition.OActivity dtOActivity
	*/
	public io.vertigo.orchestra.domain.definition.OActivity getFirstActivityByProcess(final Long proId) {
		final Task task = createTaskBuilder("TK_GET_FIRST_ACTIVITY_BY_PROCESS")
				.addValue("PRO_ID", proId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TK_GET_NEXT_ACTIVITY_BY_ACT_ID.
	 * @param actId Long 
	 * @return Option de io.vertigo.orchestra.domain.definition.OActivity dtOActivity
	*/
	public Optional<io.vertigo.orchestra.domain.definition.OActivity> getNextActivityByActId(final Long actId) {
		final Task task = createTaskBuilder("TK_GET_NEXT_ACTIVITY_BY_ACT_ID")
				.addValue("ACT_ID", actId)
				.build();
		return Optional.ofNullable((io.vertigo.orchestra.domain.definition.OActivity) getTaskManager()
				.execute(task)
				.getResult());
	}

}
