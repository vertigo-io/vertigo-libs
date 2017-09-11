package io.vertigo.dashboard.services.data;

import java.util.List;
import java.util.Map;

public final class TabularDatas {
	private final Map<Map<String, String>, TimedDataSerie> dataSeries;
	private final List<String> seriesNames;

	public TabularDatas(final Map<Map<String, String>, TimedDataSerie> dataSeries, final List<String> seriesNames) {
		this.dataSeries = dataSeries;
		this.seriesNames = seriesNames;
	}

	public Map<Map<String, String>, TimedDataSerie> getDataSeries() {
		return dataSeries;
	}

	public List<String> getSeriesNames() {
		return seriesNames;
	}

}
