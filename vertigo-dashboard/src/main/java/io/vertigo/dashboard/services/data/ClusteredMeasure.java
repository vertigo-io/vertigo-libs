package io.vertigo.dashboard.services.data;

import java.io.Serializable;
import java.util.List;

import io.vertigo.lang.Assertion;

public class ClusteredMeasure implements Serializable {

	private static final long serialVersionUID = 1L;

	private final String measure;
	private final List<Integer> thresholds;

	public ClusteredMeasure(
			final String measure,
			final List<Integer> thresholds) {
		Assertion.checkArgNotEmpty(measure);
		Assertion.checkNotNull(thresholds);
		//---
		this.measure = measure;
		this.thresholds = thresholds;
	}

	public String getMeasure() {
		return measure;
	}

	public List<Integer> getThresholds() {
		return thresholds;
	}

}
