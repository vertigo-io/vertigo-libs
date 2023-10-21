package io.vertigo.vortex.bb;

import java.util.Set;

/**
 * The blackboard is a simple structure allowing to read and write values identified by keys.
 * Some basic operations are supported
 * The blackboard can be volatile or persistent
 * The blackboard can be shared or not
 *
 * Keys must follow a rule (see the regex)
 * @author pchretien
 */
public interface BlackBoard {

	/**
	 * Types
	 */
	enum Type {
		Boolean, String, Integer, List
	}

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
	 * Formats a message including {{keys}} with mustaches
	 *
	 * @param msg the msg
	 * @return the formatted msg
	 */
	String format(final String msg);

	/**
	 * Evaluate a keyTemplate including {{keys}} with mustaches
	 *
	 * @param keyTemplate the keyTemplate
	 * @return the key
	 */
	BBKey eval(final BBKeyTemplate keyTemplate);

	//--- KV String
	/**
	 * Returns the value or null if the key does not exist
	 *
	 * @param key the key
	 * @return the value mapped with the key or null if the key does not exist
	 */
	String getString(final BBKey key);

	/**
	 * Associates the specified value with the specified key
	 *
	 * @param key the key
	 * @param value the value
	 */
	void putString(final BBKey key, final String value);

	/**
	 * Appends something to a key
	 *
	 * @param key the key
	 * @param something something
	 */
	void append(final BBKey key, final String something);

	/**
	 * Returns true if the value associated to the key equals the compare string
	 *
	 * @param key the key
	 * @param compare the value to compare
	 * @return true if the value associated to the key equals the compare
	 */
	boolean eq(final BBKey key, final String compare);

	boolean eqCaseInsensitive(final BBKey key, final String compare);

	/**
	 * Returns true if the value associated to the key starts with the compare string
	 *
	 * @param key the key
	 * @param compare the value to compare
	 * @return true if the value associated to the key starts with the compare string
	 */
	boolean startsWith(final BBKey key, final String compare);

	//--- KV Integer
	/**
	 * Returns the value or null if the key does not exist
	 *
	 * @param key the key
	 * @return the value mapped with the key or null if the key does not exist
	 */
	Integer getInteger(final BBKey key);

	/**
	 * Associates the specified value with the specified key
	 *
	 * @param key the key
	 * @param value the value
	 */
	void putInteger(final BBKey key, final Integer value);

	/**
	 * Increments the value (must be an integer) at the key by a value
	 *
	 * @param key the key
	 * @param value the value
	 */
	void incrBy(final BBKey key, final int value);

	/**
	 * Increments the value (must be an integer) at the key
	 *
	 * @param key the key
	 */
	void incr(final BBKey key);

	/**
	 * Decrements the value (must be an integer) at the key
	 *
	 * @param key the key
	 */
	void decr(final BBKey key);

	boolean lt(final BBKey key, final Integer compare);

	boolean eq(final BBKey key, final Integer compare);

	boolean gt(final BBKey key, final Integer compare);

	//--- KV Boolean
	/**
	 * Returns the value or null if the key does not exist
	 *
	 * @param key the key
	 * @return the value mapped with the key or null if the key does not exist
	 */
	Boolean getBoolean(final BBKey key);

	/**
	 * Associates the specified value with the specified key
	 *
	 * @param key the key
	 * @param value the value
	 */
	void putBoolean(final BBKey key, final Boolean value);

	boolean eq(final BBKey key, final Boolean compare);

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
}
