package io.vertigo.orchestra.dao.referential;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.orchestra.domain.referential.OProcessType;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * OProcessTypeDAO
 */
public final class OProcessTypeDAO extends DAO<OProcessType, java.lang.String> implements StoreServices {

	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public OProcessTypeDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(OProcessType.class, storeManager, taskManager);
	}

}
