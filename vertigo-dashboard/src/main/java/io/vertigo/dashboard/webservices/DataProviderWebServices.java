package io.vertigo.dashboard.webservices;

import javax.inject.Inject;

import io.vertigo.dashboard.services.DataFilter;
import io.vertigo.dashboard.services.InfluxDbDataProvider;
import io.vertigo.dashboard.services.TimeFilter;
import io.vertigo.dashboard.services.TimedDatas;
import io.vertigo.vega.webservice.WebServices;
import io.vertigo.vega.webservice.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.webservice.stereotype.InnerBodyParam;
import io.vertigo.vega.webservice.stereotype.POST;
import io.vertigo.vega.webservice.stereotype.PathPrefix;
import io.vertigo.vega.webservice.stereotype.SessionLess;

@PathPrefix("/dashboard")
public class DataProviderWebServices implements WebServices {

	@Inject
	private InfluxDbDataProvider influxDbDataProvider;

	@SessionLess
	@AnonymousAccessAllowed
	@POST("/data/series")
	public TimedDatas getTimedDatas(
			@InnerBodyParam("dataFilter") final DataFilter dataFilter,
			@InnerBodyParam("timeFilter") final TimeFilter timeFilter) {

		return influxDbDataProvider.getTimeSeries(dataFilter, timeFilter);
	}

}
