package io.vertigo.dashboard.services.data;

import java.util.List;

import io.vertigo.commons.analytics.health.HealthCheck;
import io.vertigo.commons.analytics.metric.Metric;
import io.vertigo.core.component.Component;

public interface DataProvider extends Component {

	TimedDatas getTimeSeries(final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter);

	TimedDatas getClusteredTimeSeries(final ClusteredMeasure clusteredMeasure, final DataFilter dataFilter, final TimeFilter timeFilter);

	List<HealthCheck> getHealthChecks();

	List<Metric> getMetrics();

	TabularDatas getTabularData(final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter, final String... groupBy);

}
