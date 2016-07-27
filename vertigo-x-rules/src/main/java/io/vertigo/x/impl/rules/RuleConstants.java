package io.vertigo.x.impl.rules;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author xdurand
 *
 */
public class RuleConstants {

	private final Map<String, String> constants = new ConcurrentHashMap<>();


	/**
	 *
	 * @param key
	 * @param value
	 */
	public void addConstant(final String key, final String value) {
		constants.put(key, value);
	}

	/**
	 *
	 * @return
	 */
	public List<Map.Entry<String, String>> getValues() {
		return new ArrayList<>(constants.entrySet());
	}

}