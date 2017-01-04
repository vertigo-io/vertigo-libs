package io.vertigo.x.plugins.sql.dao.model;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.x.workflow.domain.model.WfTransitionDefinition;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * WfTransitionDefinitionDAO
 */
public final class WfTransitionDefinitionDAO extends DAO<WfTransitionDefinition, java.lang.Long> implements StoreServices {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public WfTransitionDefinitionDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(WfTransitionDefinition.class, storeManager, taskManager);
	}
	

}
