package io.vertigo.x.rules.dao;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.x.rules.domain.RuleFilterDefinition;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * RuleFilterDefinitionDAO
 */
public final class RuleFilterDefinitionDAO extends DAO<RuleFilterDefinition, java.lang.Long> implements StoreServices {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public RuleFilterDefinitionDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(RuleFilterDefinition.class, storeManager, taskManager);
	}
	

}
