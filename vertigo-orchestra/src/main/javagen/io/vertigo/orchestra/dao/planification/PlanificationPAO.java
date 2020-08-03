package io.vertigo.orchestra.dao.planification;

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
public final class PlanificationPAO implements StoreServices {
	private final TaskManager taskManager;

	/**
	 * Constructeur.
	 * @param taskManager Manager des Task
	 */
	@Inject
	public PlanificationPAO(final TaskManager taskManager) {
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
	 * Execute la tache TkCleanFuturePlanifications.
	 * @param processName String
	*/
	@io.vertigo.datamodel.task.proxy.TaskAnnotation(
			dataSpace = "orchestra",
			name = "TkCleanFuturePlanifications",
			request = "delete from o_process_planification prp" + 
 "        	where prp.PRO_ID in (select pro.PRO_ID from o_process pro where pro.NAME = #processName#) and prp.SST_CD = 'WAITING' and prp.expected_time > current_timestamp",
			taskEngineClass = io.vertigo.dynamox.task.TaskEngineProc.class)
	public void cleanFuturePlanifications(@io.vertigo.datamodel.task.proxy.TaskInput(name = "processName", smartType = "STyOLibelle") final String processName) {
		final Task task = createTaskBuilder("TkCleanFuturePlanifications")
				.addValue("processName", processName)
				.build();
		getTaskManager().execute(task);
	}

	/**
	 * Execute la tache TkCleanPlanificationsOnBoot.
	 * @param currentDate Instant
	*/
	@io.vertigo.datamodel.task.proxy.TaskAnnotation(
			dataSpace = "orchestra",
			name = "TkCleanPlanificationsOnBoot",
			request = "update o_process_planification set " + 
 "			SST_CD = 'MISFIRED'" + 
 "			where SST_CD = 'WAITING' and expected_time < #currentDate# and prp_id not in (select prp.PRP_ID from  o_process_planification prp" + 
 "        	inner join (" + 
 "				    select pro_id, max(expected_time) as MaxDate" + 
 "				    from o_process_planification" + 
 "				    group by pro_id" + 
 "				) pp on pp.pro_id = prp.pro_id and pp.MaxDate = prp.expected_time)",
			taskEngineClass = io.vertigo.dynamox.task.TaskEngineProc.class)
	public void cleanPlanificationsOnBoot(@io.vertigo.datamodel.task.proxy.TaskInput(name = "currentDate", smartType = "STyOTimestamp") final java.time.Instant currentDate) {
		final Task task = createTaskBuilder("TkCleanPlanificationsOnBoot")
				.addValue("currentDate", currentDate)
				.build();
		getTaskManager().execute(task);
	}

	/**
	 * Execute la tache TkReserveProcessToExecute.
	 * @param lowerLimit Instant
	 * @param upperLimit Instant
	 * @param nodId Long
	*/
	@io.vertigo.datamodel.task.proxy.TaskAnnotation(
			dataSpace = "orchestra",
			name = "TkReserveProcessToExecute",
			request = "update o_process_planification" + 
 "        	set SST_CD = 'RESERVED', NOD_ID = #nodId#" + 
 "        	where (SST_CD = 'WAITING' and expected_time >= #lowerLimit# and expected_time <= #upperLimit#) " + 
 "        			or (SST_CD = 'RESCUED')",
			taskEngineClass = io.vertigo.dynamox.task.TaskEngineProc.class)
	public void reserveProcessToExecute(@io.vertigo.datamodel.task.proxy.TaskInput(name = "lowerLimit", smartType = "STyOTimestamp") final java.time.Instant lowerLimit, @io.vertigo.datamodel.task.proxy.TaskInput(name = "upperLimit", smartType = "STyOTimestamp") final java.time.Instant upperLimit, @io.vertigo.datamodel.task.proxy.TaskInput(name = "nodId", smartType = "STyOIdentifiant") final Long nodId) {
		final Task task = createTaskBuilder("TkReserveProcessToExecute")
				.addValue("lowerLimit", lowerLimit)
				.addValue("upperLimit", upperLimit)
				.addValue("nodId", nodId)
				.build();
		getTaskManager().execute(task);
	}

	private TaskManager getTaskManager() {
		return taskManager;
	}
}
