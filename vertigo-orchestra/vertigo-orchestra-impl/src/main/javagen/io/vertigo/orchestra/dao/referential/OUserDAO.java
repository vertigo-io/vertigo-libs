package io.vertigo.orchestra.dao.referential;

import javax.inject.Inject;
import io.vertigo.dynamo.impl.store.util.DAO;
import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.dynamo.store.StoreServices;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.orchestra.domain.referential.OUser;
import io.vertigo.lang.Generated;

/**
 * This class is automatically generated.
 */
 @Generated
public final class OUserDAO extends DAO<OUser, java.lang.Long> implements StoreServices {

	/**
	 * Contructeur.
	 * @param storeManager Manager de persistance
	 * @param taskManager Manager de Task
	 */
	@Inject
	public OUserDAO(final StoreManager storeManager, final TaskManager taskManager) {
		super(OUser.class, storeManager, taskManager);
	}

}
