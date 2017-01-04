package io.vertigo.x.plugins.sql.dao.instance;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.x.workflow.domain.instance.WfWorkflow;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * WfWorkflowDAO
 */
public final class WfWorkflowDAO extends DAO<WfWorkflow, java.lang.Long> implements StoreServices {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public WfWorkflowDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(WfWorkflow.class, storeManager, taskManager);
	}
	

}
