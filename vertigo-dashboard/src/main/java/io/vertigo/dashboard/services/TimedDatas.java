package io.vertigo.dashboard.services;

import java.util.List;

public final class TimedDatas {
	private final List<TimedDataSerie> timedDataSeries;
	private final List<String> seriesNames;

	public TimedDatas(final List<TimedDataSerie> timedDataSeries, final List<String> seriesNames) {
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
