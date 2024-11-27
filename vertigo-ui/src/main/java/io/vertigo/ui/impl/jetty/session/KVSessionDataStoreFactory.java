package io.vertigo.ui.impl.jetty.session;

import org.eclipse.jetty.server.session.AbstractSessionDataStoreFactory;
import org.eclipse.jetty.server.session.SessionDataStore;
import org.eclipse.jetty.server.session.SessionHandler;

public class KVSessionDataStoreFactory extends AbstractSessionDataStoreFactory {

	private final String sessionCollectionName;

	public KVSessionDataStoreFactory(final String sessionCollectionName) {
		super();
		this.sessionCollectionName = sessionCollectionName;
	}

	@Override
	public SessionDataStore getSessionDataStore(final SessionHandler handler) throws Exception {
		final KVSessionDataStore ds = new KVSessionDataStore(sessionCollectionName);
		ds.setGracePeriodSec(getGracePeriodSec());
		ds.setSavePeriodSec(getSavePeriodSec());
		return ds;
	}

}
