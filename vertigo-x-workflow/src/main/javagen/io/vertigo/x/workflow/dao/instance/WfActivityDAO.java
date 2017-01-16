package io.vertigo.x.workflow.dao.instance;

import javax.inject.Inject;
import io.vertigo.app.Home;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.x.workflow.domain.instance.WfActivity;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * WfActivityDAO
 */
public final class WfActivityDAO extends DAO<WfActivity, java.lang.Long> implements StoreServices {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public WfActivityDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(WfActivity.class, storeManager, taskManager);
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
	 * Execute la tache TK_FIND_ACTIVITIES_BY_DEFINITION_ID.
	 * @param wfwId Long 
	 * @param actDefIds io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.common.WorkflowDummy> 
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.instance.WfActivity> workflowActivityList
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.instance.WfActivity> findActivitiesByDefinitionId(final Long wfwId, final io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.common.WorkflowDummy> actDefIds) {
		final Task task = createTaskBuilder("TK_FIND_ACTIVITIES_BY_DEFINITION_ID")
				.addValue("WFW_ID", wfwId)
				.addValue("ACT_DEF_IDS", actDefIds)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TK_FIND_ALL_ACTIVITIES_BY_WORKFLOW_DEFINITION_ID.
	 * @param wfwdId Long 
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.instance.WfActivity> workflowActivityList
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.instance.WfActivity> findAllActivitiesByWorkflowDefinitionId(final Long wfwdId) {
		final Task task = createTaskBuilder("TK_FIND_ALL_ACTIVITIES_BY_WORKFLOW_DEFINITION_ID")
				.addValue("WFWD_ID", wfwdId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}


}
