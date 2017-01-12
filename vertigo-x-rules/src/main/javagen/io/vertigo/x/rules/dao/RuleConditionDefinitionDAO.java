package io.vertigo.x.rules.dao;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.x.rules.domain.RuleConditionDefinition;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * RuleConditionDefinitionDAO
 */
public final class RuleConditionDefinitionDAO extends DAO<RuleConditionDefinition, java.lang.Long> implements StoreServices {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public RuleConditionDefinitionDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(RuleConditionDefinition.class, storeManager, taskManager);
	}
	

}
