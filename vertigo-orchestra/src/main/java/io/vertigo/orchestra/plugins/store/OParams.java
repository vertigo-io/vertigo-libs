package io.vertigo.orchestra.plugins.store;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import io.vertigo.lang.Assertion;
import io.vertigo.orchestra.plugins.services.JobRunnerUtil;

public class OParams {

	private final Map<String, String> map = new HashMap<>();
	
	public OParams() {
		super();
	}
	
	public OParams(String json) {
		map.putAll(JobRunnerUtil.jsonToMap(json));
	}

	public String get(String key) {
		Assertion.checkArgument(map.containsKey(key), "Paramètre absent : {}", key);
		return map.get(key);
	}
	
	public void put(String key, String value) {
		map.put(key, value);
	}
	
	public Set<String> keys() {
		return map.keySet();
	}
	
	public String toJson() {
		return JobRunnerUtil.mapToJson(map);
	}
	
	public Map<String, String> asMap() {
		Map<String, String> copy = new HashMap<>();
		copy.putAll(map);
		return copy;
	}
	
}