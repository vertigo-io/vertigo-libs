package io.vertigo.addons.connectors.redis;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;

import java.util.HashMap;
import java.util.Map;

/**
 * @author npiedeloup
 * @param <K> Key type
 * @param <V> Value type
 */
public final class RedisMapBuilder<K, V> implements Builder<Map<K, V>> {
	private final Map<K, V> map = new HashMap<>();

	/**
	 * @param key Key
	 * @param value Value not null
	 * @return this builder
	 */
	public RedisMapBuilder<K, V> put(final K key, final V value) {
		Assertion.checkNotNull(key);
		Assertion.checkNotNull(value);
		//-----
		map.put(key, value);
		return this;
	}

	/**
	 * @param key Key
	 * @param value Value nullable
	 * @return this builder
	 */
	public RedisMapBuilder<K, V> putNullable(final K key, final V value) {
		Assertion.checkNotNull(key);
		//-----
		if (value != null) {
			map.put(key, value);
		}
		return this;
	}

	/** {@inheritDoc} */
	@Override
	public Map<K, V> build() {
		return map;
	}
}
