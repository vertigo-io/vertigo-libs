package io.vertigo.dashboard.services.data;

import java.util.Map;

import io.vertigo.lang.Assertion;

/*
 * Couple(date, metriques)
 * @author pchretien, npiedeloup
 */
public final class TimedDataSerie {
	private final long time;
	private final Map<String, Object> values;

	public TimedDataSerie(final long time, final Map<String, Object> values) {
		Assertion.checkNotNull(values);
		//---
		this.time = time;
		this.values = values;
	}

	public long getTime() {
		return time;
	}

	public Map<String, Object> getValues() {
		return values;
	}
}
