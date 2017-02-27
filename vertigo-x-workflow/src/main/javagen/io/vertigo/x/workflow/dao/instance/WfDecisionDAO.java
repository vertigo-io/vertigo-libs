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
import io.vertigo.x.workflow.domain.instance.WfDecision;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * WfDecisionDAO
 */
public final class WfDecisionDAO extends DAO<WfDecision, java.lang.Long> implements StoreServices {

	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public WfDecisionDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(WfDecision.class, storeManager, taskManager);
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
	 * Execute la tache TK_FIND_DECISIONS_BY_WORKFLOW_ID.
	 * @param wfwId Long 
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.instance.WfDecision> workflowDecisionList
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.workflow.domain.instance.WfDecision> findDecisionsByWorkflowId(final Long wfwId) {
		final Task task = createTaskBuilder("TK_FIND_DECISIONS_BY_WORKFLOW_ID")
				.addValue("WFW_ID", wfwId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

}
