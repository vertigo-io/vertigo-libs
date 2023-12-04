package io.vertigo.vortex.bb;

public interface BBCommandKV<O> {
	//--- KV Boolean
	/**
	 * Returns the value or null if the key does not exist
	 *
	 * @param key the key
	 * @return the value mapped with the key or null if the key does not exist
	 */
	O get(final BBKey key);

	/**
	 * Associates the specified value with the specified key
	 *
	 * @param key the key
	 * @param value the value
	 */
	void put(final BBKey key, final O value);

	boolean eq(final BBKey key, final O compare);
}
