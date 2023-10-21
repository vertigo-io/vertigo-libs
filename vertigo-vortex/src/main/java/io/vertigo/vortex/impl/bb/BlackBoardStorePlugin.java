package io.vertigo.vortex.impl.bb;

import java.util.Set;

import io.vertigo.core.node.component.Plugin;
import io.vertigo.vortex.bb.BBKey;
import io.vertigo.vortex.bb.BBKeyPattern;
import io.vertigo.vortex.bb.BlackBoard.Type;

public interface BlackBoardStorePlugin extends Plugin {

	//------------------------------------
	//--- Keys
	//------------------------------------
	/**
	 * Returns if the keys exists
	 *
	 * @param key the key
	 * @return if the key exists
	 */
	boolean exists(final BBKey key);

	/**
	 * Returns all the keys matching the pattern
	 * The magic pattern * returns all the keys
	 *
	 * @param keyPattern the pattern
	 * @return A list of keys
	 */
	Set<BBKey> keys(final BBKeyPattern keyPattern);

	/**
	 * Deletes all the keys matching the pattern
	 *
	 * The magic pattern * remove all the keys
	 *
	 * @param keyPattern the pattern
	 */
	void delete(final BBKeyPattern keyPattern);

	/**
	 * Returns the key type or null if the keys doesn't exist
	 *
	 * @param key the key
	 * @return the key type or null
	 */
	Type getType(final BBKey key);

	//------------------------------------
	//--- KV
	//------------------------------------
	/**
	 * Returns the value or null if the key does not exist
	 * @param key the key
	 * @return the value mapped with the key or null if the key does not exist
	 */
	String get(final BBKey key);

	//--- KV String
	/**
	 * Returns the value or null if the key does not exist
	 * @param key the key
	 * @return the value mapped with the key or null if the key does not exist
	 */
	String getString(final BBKey key);

	void putString(final BBKey key, final String value);

	//--- KV Integer
	/**
	 * Returns the value or null if the key does not exist
	 *
	 * @param key the key
	 * @return the value mapped with the key or null if the key does not exist
	 */
	Integer getInteger(final BBKey key);

	void putInteger(final BBKey key, final Integer value);

	/**
	 * Increments the value (must be an integer) at the key by a value
	 *
	 * @param key the key
	 * @param value the value
	 */
	void incrBy(final BBKey key, final int value);

	//--- KV Boolean
	/**
	 * Returns the value or null if the key does not exist
	 *
	 * @param key the key
	 * @return the value mapped with the key or null if the key does not exist
	 */
	Boolean getBoolean(final BBKey key);

	void putBoolean(final BBKey key, final Boolean value);

	//------------------------------------
	//- List
	//- All methods are prefixed with list
	//------------------------------------
	/**
	 * Returns the size of the list identified by the key
	 *
	 * @param key the key
	 * @return the size of the list
	 */
	int listSize(final BBKey key);

	/**
	 * Pushes a value at the top of the list
	 *
	 * @param key the key
	 * @param value the value
	 */
	void listPush(final BBKey key, final String value);

	/**
	 * Removes and returns the value at the top of the list
	 *
	 * @param key the key
	 * @param value the value
	 */
	String listPop(final BBKey key);

	/**
	 * Returns the value at the top of the list
	 *
	 * @param key the key
	 * @param value the value
	 */
	String listPeek(final BBKey key);

	/**
	 * Reads the value at the index of the list
	 *
	 * @param key the key
	 * @param idx the index
	 * @return the value at the corresponding index
	 */
	String listGet(final BBKey key, final int idx);

	//------------------------------------
	//- Plugin                             -
	//------------------------------------

	String getStoreName();
}
