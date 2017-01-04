package io.vertigo.x.plugins.sql.dao.model;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.x.workflow.domain.model.WfMultiplicityDefinition;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * WfMultiplicityDefinitionDAO
 */
public final class WfMultiplicityDefinitionDAO extends DAO<WfMultiplicityDefinition, java.lang.String> implements StoreServices {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public WfMultiplicityDefinitionDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(WfMultiplicityDefinition.class, storeManager, taskManager);
	}
	

}
