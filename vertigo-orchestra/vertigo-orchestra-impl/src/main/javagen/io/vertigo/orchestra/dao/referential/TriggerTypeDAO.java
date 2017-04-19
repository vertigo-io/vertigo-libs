package io.vertigo.orchestra.dao.referential;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.orchestra.domain.referential.TriggerType;

/**
 * DAO : Accès à un object (DTO, DTC). 
 * TriggerTypeDAO
 */
public final class TriggerTypeDAO extends DAO<TriggerType, java.lang.String> implements StoreServices {

	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public TriggerTypeDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(TriggerType.class, storeManager, taskManager);
	}

}
