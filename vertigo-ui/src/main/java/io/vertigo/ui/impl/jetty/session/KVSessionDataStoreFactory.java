/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
