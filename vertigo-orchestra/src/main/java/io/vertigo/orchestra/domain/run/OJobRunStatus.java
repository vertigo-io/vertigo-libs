package io.vertigo.orchestra.domain.run;

public enum OJobRunStatus {
	/*transitional states*/
	RUNNING("R"),
	ERROR("E"),
	/*final states*/
	SUCCEEDED("S"),
	KILLED("K"),
	TIMEOUT("T"),
	FAILED("F");

	private final String code;

	private OJobRunStatus(final String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
	}

	public static boolean isAlive(final OJobRun jobRun) {
		return OJobRunStatus.ERROR.getCode().equals(jobRun.getStatus())
				|| OJobRunStatus.RUNNING.getCode().equals(jobRun.getStatus());
	}
}
