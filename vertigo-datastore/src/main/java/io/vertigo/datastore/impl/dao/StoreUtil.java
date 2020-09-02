package io.vertigo.datastore.impl.dao;

import io.vertigo.core.node.Node;
import io.vertigo.datastore.entitystore.EntityStoreManager;

public final class StoreUtil {

	protected StoreUtil() {
		// util
	}

	public static String getConnectionName(final String dataSpace) {
		return Node.getNode().getComponentSpace().resolve(EntityStoreManager.class).getDataStoreConfig().getConnectionName(dataSpace);
	}
}
