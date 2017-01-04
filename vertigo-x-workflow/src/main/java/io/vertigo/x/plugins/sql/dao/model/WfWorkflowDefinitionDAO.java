package io.vertigo.x.plugins.sql.dao.model;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.x.workflow.domain.model.WfWorkflowDefinition;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * WfWorkflowDefinitionDAO
 */
public final class WfWorkflowDefinitionDAO extends DAO<WfWorkflowDefinition, java.lang.Long> implements StoreServices {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public WfWorkflowDefinitionDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(WfWorkflowDefinition.class, storeManager, taskManager);
	}
	

}
