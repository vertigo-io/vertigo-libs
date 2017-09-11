package io.vertigo.dashboard.services.data;

import java.util.List;
import java.util.Map;

public final class TabularDatas {
	private final Map<String, TimedDataSerie> dataSeries;
	private final List<String> seriesNames;

	public TabularDatas(final Map<String, TimedDataSerie> dataSeries, final List<String> seriesNames) {
		this.dataSeries = dataSeries;
		this.seriesNames = seriesNames;
	}

	public Map<String, TimedDataSerie> getDataSeries() {
		return dataSeries;
	}

	public List<String> getSeriesNames() {
		return seriesNames;
	}

}
