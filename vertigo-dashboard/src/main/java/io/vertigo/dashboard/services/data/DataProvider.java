package io.vertigo.dashboard.services.data;

import java.util.List;

import io.vertigo.commons.analytics.health.HealthCheck;
import io.vertigo.commons.analytics.metric.Metric;
import io.vertigo.core.component.Component;

public interface DataProvider extends Component {

	TimedDatas getTimeSeries(final DataFilter dataFilter, final TimeFilter timeFilter);

	List<HealthCheck> getHealthChecks();

	List<Metric> getMetrics();

	TabularDatas getTabularData(final DataFilter dataFilter, final TimeFilter timeFilter, final String... groupBy);

}
