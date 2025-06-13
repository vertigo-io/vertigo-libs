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
package io.vertigo.datastore.impl.kvstore;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.MapBuilder;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.datastore.kvstore.KVCollection;
import io.vertigo.datastore.kvstore.KVStoreManager;

/**
 * Standard implementation of the Key-Value DataBase.
 *
 * @author pchretien
 */
public final class KVStoreManagerImpl implements KVStoreManager {

	private final Map<KVCollection, KVStorePlugin> kvStoreByCollection;

	/**
	 * Constructor.
	 * @param kvStorePlugins kvStore list
	 */
	@Inject
	public KVStoreManagerImpl(final List<KVStorePlugin> kvStorePlugins) {
		Assertion.check().isNotNull(kvStorePlugins);
		//-----
		final MapBuilder<KVCollection, KVStorePlugin> mapBuilder = new MapBuilder<>();
		for (final KVStorePlugin kvDataStorePlugin : kvStorePlugins) {
			for (final KVCollection collection : kvDataStorePlugin.getCollections()) {
				mapBuilder.putCheckKeyNotExists(collection, kvDataStorePlugin);
			}
		}
		kvStoreByCollection = mapBuilder.unmodifiable().build();
	}

	private KVStorePlugin getKVStorePlugin(final KVCollection collection) {
		Assertion.check().isNotNull(collection);
		//-----
		final KVStorePlugin kvStorePlugin = kvStoreByCollection.get(collection);
		Assertion.check().isNotNull(kvStorePlugin, "no store found for collection '{0}'", collection);
		return kvStorePlugin;
	}

	/** {@inheritDoc} */
	@Override
	public int count(final KVCollection collection) {
		return getKVStorePlugin(collection).count(collection);
	}

	/** {@inheritDoc} */
	@Override
	public void put(final KVCollection collection, final String id, final Object element) {
		getKVStorePlugin(collection).put(collection, id, element);
	}

	/** {@inheritDoc} */
	@Override
	public void remove(final KVCollection collection, final String id) {
		final boolean exists = getKVStorePlugin(collection).remove(collection, id);
		if (!exists) {
			throw new VSystemException(LocaleMessageText.of("Unable to remove non existing element from collection '{0}' with key '{1}'", collection.name(), id).getDisplay());
		}
	}

	/** {@inheritDoc} */
	@Override
	public boolean removeIfExists(final KVCollection collection, final String id) {
		return getKVStorePlugin(collection).remove(collection, id);
	}

	/** {@inheritDoc} */
	@Override
	public void clear(final KVCollection collection) {
		getKVStorePlugin(collection).clear(collection);
	}

	/** {@inheritDoc} */
	@Override
	public <C> Optional<C> find(final KVCollection collection, final String id, final Class<C> clazz) {
		return getKVStorePlugin(collection).find(collection, id, clazz);
	}

	/** {@inheritDoc} */
	@Override
	public <C> List<C> findAll(final KVCollection collection, final int skip, final Integer limit, final Class<C> clazz) {
		return getKVStorePlugin(collection).findAll(collection, skip, limit, clazz);
	}

}
