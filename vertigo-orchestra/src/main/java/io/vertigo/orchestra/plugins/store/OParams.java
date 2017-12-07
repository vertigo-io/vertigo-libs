package io.vertigo.orchestra.plugins.store;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import io.vertigo.lang.Assertion;
import io.vertigo.orchestra.plugins.services.JobRunnerUtil;

public final class OParams {

	private final Map<String, String> map = new HashMap<>();

	public OParams() {
		super();
	}

	public static OParams of(final String json) {
		return new OParams(json);
	}

	private OParams(final String json) {
		Assertion.checkArgNotEmpty(json);
		//--
		map.putAll(JobRunnerUtil.jsonToMap(json));
	}

	public String get(final String key) {
		Assertion.checkArgument(map.containsKey(key), "Paramètre absent : {}", key);
		return map.get(key);
	}

	public void put(final String key, final String value) {
		map.put(key, value);
	}

	public Set<String> keys() {
		return map.keySet();
	}

	public String toJson() {
		return JobRunnerUtil.mapToJson(map);
	}

	public Map<String, String> asMap() {
		final Map<String, String> copy = new HashMap<>();
		copy.putAll(map);
		return copy;
	}

}
