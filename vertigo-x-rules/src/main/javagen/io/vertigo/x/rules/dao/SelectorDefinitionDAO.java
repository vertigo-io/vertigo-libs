package io.vertigo.x.rules.dao;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.x.rules.domain.SelectorDefinition;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * SelectorDefinitionDAO
 */
public final class SelectorDefinitionDAO extends DAO<SelectorDefinition, java.lang.Long> implements StoreServices {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public SelectorDefinitionDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(SelectorDefinition.class, storeManager, taskManager);
	}
	

}
