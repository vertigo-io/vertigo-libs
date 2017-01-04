package io.vertigo.x.plugins.sql.dao.instance;

import javax.inject.Inject;
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
	

}
