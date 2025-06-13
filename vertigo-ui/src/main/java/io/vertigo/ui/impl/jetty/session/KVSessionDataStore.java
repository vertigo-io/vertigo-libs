/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.eclipse.jetty.server.session.AbstractSessionDataStore;
import org.eclipse.jetty.server.session.SessionData;
import org.eclipse.jetty.server.session.UnreadableSessionDataException;
import org.eclipse.jetty.util.ClassLoadingObjectInputStream;
import org.eclipse.jetty.util.annotation.ManagedAttribute;
import org.eclipse.jetty.util.annotation.ManagedObject;

import io.vertigo.core.node.Node;
import io.vertigo.datastore.kvstore.KVCollection;
import io.vertigo.datastore.kvstore.KVStoreManager;

/**
 * KVStore of session data.
 *
 * From JDBCSessionDataStore and RedisSessionDataStore gyli@embed-soft.cn
 */
@ManagedObject
public class KVSessionDataStore extends AbstractSessionDataStore {

	private static final Logger LOG = LogManager.getLogger(KVSessionDataStore.class);

	private KVStoreManager kvStoreManager;
	private final KVCollection sessionsCollection;

	private final Set<String> loadedSessionId = new HashSet<>();
	private final String sessionCollectionName;

	KVSessionDataStore(final String sessionCollectionName) {
		super();
		this.sessionCollectionName = sessionCollectionName;
		sessionsCollection = new KVCollection(sessionCollectionName);

	}

	@ManagedAttribute(value = "does store serialize sessions", readonly = true)
	@Override
	public boolean isPassivating() {
		return true;
	}

	@Override
	public boolean doExists(final String id) throws Exception {
		final AtomicReference<Boolean> reference = new AtomicReference<Boolean>();
		final AtomicReference<Exception> exception = new AtomicReference<Exception>();

		final Runnable r = new Runnable() {

			@Override
			public void run() {
				LOG.debug("Check existing SessionID {} from KVStore {}", id, sessionCollectionName);
				try {
					reference.set(getKVStoreManager().find(sessionsCollection, id, byte[].class).isPresent());
				} catch (final Exception e) {
					exception.set(e);
				}
			}
		};

		//ensure this runs with the context classloader set, mandatory for Jetty SessionData Deserializer
		_context.run(r);

		if (exception.get() != null) {
			throw exception.get();
		}

		return reference.get();
	}

	@Override
	public SessionData doLoad(final String id) throws Exception {
		final AtomicReference<Optional<SessionData>> reference = new AtomicReference<Optional<SessionData>>();
		final AtomicReference<Exception> exception = new AtomicReference<Exception>();

		final Runnable r = new Runnable() {

			@Override
			public void run() {
				LOG.debug("Loading SessionID {} from KVStore {}", id, sessionCollectionName);
				try {
					final var sessionBytes = getKVStoreManager().find(sessionsCollection, id, byte[].class);
					if (sessionBytes.isPresent()) {
						reference.set(Optional.of(bytesToSessionData(sessionBytes.get(), id)));
					} else {
						reference.set(Optional.empty());
					}
				} catch (final Exception e) {
					exception.set(e);
				}
			}
		};

		//ensure this runs with the context classloader set, mandatory for Jetty SessionData Deserializer
		_context.run(r);

		if (exception.get() != null) {
			throw exception.get();
		}

		final var sessionData = reference.get();
		if (sessionData.isPresent()) {
			loadedSessionId.add(id);
		}
		//as api is used by jetty it self : return null, if not exists (or expired)
		return sessionData.orElse(null);
	}

	@Override
	public boolean delete(final String id) throws Exception {
		LOG.debug("Deleting SessionID {} from KVStore {}", id, sessionCollectionName);
		getKVStoreManager().removeIfExists(sessionsCollection, id);
		loadedSessionId.remove(id);
		return true;
	}

	@Override
	public void doStore(final String id, final SessionData session, final long lastSaveTime) throws Exception {
		if (LOG.isDebugEnabled()) {
			LOG.debug("Store session: {} from KVStore {}", id, sessionCollectionName);
		}
		getKVStoreManager().put(sessionsCollection, id, sessionDataToBytes(id, session));
		loadedSessionId.add(id);
	}

	@Override
	public Set<String> doCheckExpired(final Set<String> candidates, final long time) {
		if (candidates == null || candidates.isEmpty()) {
			return candidates;
		}

		final Set<String> expired = new HashSet<>();

		for (final String candidate : candidates) {
			LOG.debug("Checking expiry for SessionID {}", candidate);
			try {
				final SessionData sd = load(candidate);

				//if the session no longer exists
				if (sd == null) {
					expired.add(candidate);
					LOG.debug("SessionID {} does not exist in store", candidate);
				} else if (_context.getWorkerName().equals(sd.getLastNode())) {
					//we are its manager, add it to the expired set if it is expired now
					if (sd.getExpiry() > 0 && sd.getExpiry() <= time) {
						expired.add(candidate);
						LOG.debug("SessionID {} managed by {} is expired", candidate, _context.getWorkerName());
					}
				} else /**
						 * at least 1 graceperiod since the last expiry check. If we haven't done previous expiry checks, then check
						 * those that have expired at least 3 graceperiod ago.
						 */
				if (sd.getExpiry() > 0 && sd.getExpiry() < time -
						TimeUnit.SECONDS.toMillis((_lastExpiryCheckTime <= 0 ? 3 : 1) * _gracePeriodSec)) {
					expired.add(candidate);
				}
			} catch (final Exception e) {
				LOG.warn("Error checking if SessionID {} is expired. {}", candidate, e.getMessage());
			}
		}

		return expired;
	}

	@Override
	public Set<String> doGetExpired(final long timeLimit) {
		if (LOG.isDebugEnabled()) {
			LOG.debug("{} - Searching for sessions for context {} expired before {}", _context.getWorkerName(), _context.getCanonicalContextPath(), timeLimit);
		}
		//Get sessions for my context but managed by any node that expired at or before the timeLimit
		return doCheckExpired(loadedSessionId, timeLimit);
	}

	@Override
	public void doCleanOrphans(final long time) {
		//already done by KVStoreManager expirity strategy
	}

	private KVStoreManager getKVStoreManager() {
		if (kvStoreManager == null) {
			kvStoreManager = Node.getNode().getComponentSpace().resolve(KVStoreManager.class);
		}
		return kvStoreManager;
	}

	/* ------------------------------------------------------------ */
	/**
	 * @param os the output stream to save to
	 * @param id identity of the session
	 * @param data the info of the session
	 * @return
	 * @throws IOException
	 */
	private byte[] sessionDataToBytes(final String id, final SessionData data) throws IOException {
		try (ByteArrayOutputStream os = new ByteArrayOutputStream(1400)) {
			final DataOutputStream out = new DataOutputStream(os);
			out.writeUTF(id);
			out.writeUTF(_context.getCanonicalContextPath());
			out.writeUTF(_context.getVhost());
			out.writeUTF(data.getLastNode());
			out.writeLong(data.getCreated());
			out.writeLong(data.getAccessed());
			out.writeLong(data.getLastAccessed());
			out.writeLong(data.getCookieSet());
			out.writeLong(data.getExpiry());
			out.writeLong(data.getMaxInactiveMs());
			out.writeLong(data.getLastSaved());

			final List<String> keys = new ArrayList<String>(data.getKeys());
			out.writeInt(keys.size());
			final ObjectOutputStream oos = new ObjectOutputStream(out);
			for (final String name : keys) {
				oos.writeUTF(name);
				oos.writeObject(data.getAttribute(name));
			}
			os.close();
			return os.toByteArray();
		}

	}

	/**
	 * @param is inputstream containing session data
	 * @param expectedId the id we've been told to load
	 * @return the session data
	 * @throws Exception
	 */
	private SessionData bytesToSessionData(final byte[] bytes, final String expectedId) throws Exception {
		String id = null; //the actual id from inside the file

		try (ByteArrayInputStream bin = new ByteArrayInputStream(bytes)) {
			SessionData data = null;
			final DataInputStream di = new DataInputStream(bin);

			id = di.readUTF();
			final String contextPath = di.readUTF();
			final String vhost = di.readUTF();
			final String lastNode = di.readUTF();
			final long created = di.readLong();
			final long accessed = di.readLong();
			final long lastAccessed = di.readLong();
			final long cookieSet = di.readLong();
			final long expiry = di.readLong();
			final long maxIdle = di.readLong();
			final long lastSaved = di.readLong();

			data = newSessionData(id, created, accessed, lastAccessed, maxIdle);
			data.setContextPath(contextPath);
			data.setVhost(vhost);
			data.setLastNode(lastNode);
			data.setCookieSet(cookieSet);
			data.setExpiry(expiry);
			data.setMaxInactiveMs(maxIdle);
			data.setLastSaved(lastSaved);

			// Attributes
			restoreAttributes(di, di.readInt(), data);

			return data;
		} catch (final Exception e) {
			throw new UnreadableSessionDataException(expectedId, _context, e);
		}
	}

	/**
	 * @param is inputstream containing session data
	 * @param size number of attributes
	 * @param data the data to restore to
	 * @throws Exception
	 */
	private void restoreAttributes(final InputStream is, final int size, final SessionData data) throws Exception {
		if (size > 0) {
			// input stream should not be closed here
			final Map<String, Object> attributes = new HashMap<String, Object>();
			final ClassLoadingObjectInputStream ois = new ClassLoadingObjectInputStream(is);
			for (int i = 0; i < size; i++) {
				final String key = ois.readUTF();
				final Object value = ois.readObject();
				attributes.put(key, value);
			}
			data.putAllAttributes(attributes);
		}
	}
}
