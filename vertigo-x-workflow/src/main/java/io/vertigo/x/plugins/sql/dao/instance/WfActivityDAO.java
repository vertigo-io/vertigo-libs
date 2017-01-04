package io.vertigo.x.plugins.sql.dao.instance;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.x.workflow.domain.instance.WfActivity;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * WfActivityDAO
 */
public final class WfActivityDAO extends DAO<WfActivity, java.lang.Long> implements StoreServices {
	 
	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public WfActivityDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(WfActivity.class, storeManager, taskManager);
	}
	

}
