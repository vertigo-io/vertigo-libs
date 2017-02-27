package io.vertigo.x.rules.dao;

import javax.inject.Inject;
import io.vertigo.app.Home;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskBuilder;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.x.rules.domain.RuleDefinition;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * RuleDefinitionDAO
 */
public final class RuleDefinitionDAO extends DAO<RuleDefinition, java.lang.Long> implements StoreServices {

	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public RuleDefinitionDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(RuleDefinition.class, storeManager, taskManager);
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
	 * Execute la tache TK_FIND_ALL_RULES_BY_WORKFLOW_DEFINITION_ID.
	 * @param wfwdId Long 
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.rules.domain.RuleDefinition> ruleDefinitionList
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.rules.domain.RuleDefinition> findAllRulesByWorkflowDefinitionId(final Long wfwdId) {
		final Task task = createTaskBuilder("TK_FIND_ALL_RULES_BY_WORKFLOW_DEFINITION_ID")
				.addValue("WFWD_ID", wfwdId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

	/**
	 * Execute la tache TK_FIND_ITEMS_BY_CRITERIA.
	 * @param ruleConditionCriteria1 io.vertigo.x.rules.RuleConditionCriteria 
	 * @param ruleConditionCriteria2 io.vertigo.x.rules.RuleConditionCriteria 
	 * @param itemsId io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.rules.ItemId> 
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.rules.domain.RuleDefinition> ruleDefinition
	*/
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.rules.domain.RuleDefinition> findItemsByCriteria(final io.vertigo.x.rules.RuleConditionCriteria ruleConditionCriteria1, final io.vertigo.x.rules.RuleConditionCriteria ruleConditionCriteria2, final io.vertigo.dynamo.domain.model.DtList<io.vertigo.x.rules.ItemId> itemsId) {
		final Task task = createTaskBuilder("TK_FIND_ITEMS_BY_CRITERIA")
				.addValue("RULE_CONDITION_CRITERIA_1", ruleConditionCriteria1)
				.addValue("RULE_CONDITION_CRITERIA_2", ruleConditionCriteria2)
				.addValue("ITEMS_ID", itemsId)
				.build();
		return getTaskManager()
				.execute(task)
				.getResult();
	}

}
