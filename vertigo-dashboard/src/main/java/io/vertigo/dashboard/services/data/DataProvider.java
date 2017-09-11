package io.vertigo.dashboard.services.data;

import java.util.List;

import io.vertigo.commons.analytics.health.HealthCheck;
import io.vertigo.commons.analytics.metric.Metric;
import io.vertigo.core.component.Component;

public interface DataProvider extends Component {

	public TimedDatas getTimeSeries(final DataFilter dataFilter, final TimeFilter timeFilter);

	public List<HealthCheck> getHealthChecks();

	public List<Metric> getMetrics();

	public TabularDatas getTabularData(final DataFilter dataFilter, final TimeFilter timeFilter, final String groupBy);

}
