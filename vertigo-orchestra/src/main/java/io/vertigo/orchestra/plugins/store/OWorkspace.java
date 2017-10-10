package io.vertigo.orchestra.plugins.store;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import io.vertigo.lang.Assertion;
import io.vertigo.orchestra.plugins.services.JobRunnerUtil;

public class OWorkspace {

	private static final String CLASS_ENGINE = "ClassEngine";
	private static final String JOB_NAME = "JobName";
	private static final String JOB_ID = "JobId";
	private static final String RUN_STATUS = "RunStatus";
	private static final String EXEC_DATE = "ExecDate";

	private final Map<String, String> map = new HashMap<>();

	public OWorkspace(final Map<String, String> ws, final String jobId, final String jobName, final String classEngine, final ZonedDateTime execDate) {
		map.putAll(ws);
		map.put(JOB_ID, jobId);
		map.put(JOB_NAME, jobName);
		map.put(CLASS_ENGINE, classEngine);
		map.put(EXEC_DATE, execDate.toString());
	}

	public OWorkspace(final String json) {
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

	public String getClassEngine() {
		return get(CLASS_ENGINE);
	}

	public String getJobName() {
		return get(JOB_NAME);
	}

	public String getJobId() {
		return get(JOB_ID);
	}

	public ZonedDateTime getExecDate() {
		return ZonedDateTime.parse(get(EXEC_DATE));
	}

	public String toJson() {
		return JobRunnerUtil.mapToJson(map);
	}

	public void setSuccess() {
		map.put(RUN_STATUS, "S");
	}

}
