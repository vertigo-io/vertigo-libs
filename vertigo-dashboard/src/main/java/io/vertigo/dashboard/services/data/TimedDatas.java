package io.vertigo.dashboard.services.data;

import java.util.List;

import io.vertigo.lang.Assertion;

public final class TimedDatas {
	private final List<TimedDataSerie> timedDataSeries;
	private final List<String> seriesNames;

	public TimedDatas(
			final List<TimedDataSerie> timedDataSeries,
			final List<String> seriesNames) {
		Assertion.checkNotNull(timedDataSeries);
		Assertion.checkNotNull(seriesNames);
		//---
		this.timedDataSeries = timedDataSeries;
		this.seriesNames = seriesNames;
	}

	public List<TimedDataSerie> getTimedDataSeries() {
		return timedDataSeries;
	}

	public List<String> getSeriesNames() {
		return seriesNames;
	}

}
