package io.vertigo.dashboard.webservices;

import javax.inject.Inject;

import io.vertigo.dashboard.services.data.DataFilter;
import io.vertigo.dashboard.services.data.DataProvider;
import io.vertigo.dashboard.services.data.TabularDatas;
import io.vertigo.dashboard.services.data.TimeFilter;
import io.vertigo.dashboard.services.data.TimedDatas;
import io.vertigo.vega.webservice.WebServices;
import io.vertigo.vega.webservice.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.webservice.stereotype.InnerBodyParam;
import io.vertigo.vega.webservice.stereotype.POST;
import io.vertigo.vega.webservice.stereotype.PathPrefix;
import io.vertigo.vega.webservice.stereotype.SessionLess;

@PathPrefix("/dashboard/data")
public class DashboardDataProviderWebServices implements WebServices {

	@Inject
	private DataProvider dataProvider;

	@SessionLess
	@AnonymousAccessAllowed
	@POST("/series")
	public TimedDatas getTimedDatas(
			@InnerBodyParam("dataFilter") final DataFilter dataFilter,
			@InnerBodyParam("timeFilter") final TimeFilter timeFilter) {

		return dataProvider.getTimeSeries(dataFilter, timeFilter);
	}

	@SessionLess
	@AnonymousAccessAllowed
	@POST("/tabular")
	public TabularDatas getTimedDatas(
			@InnerBodyParam("dataFilter") final DataFilter dataFilter,
			@InnerBodyParam("timeFilter") final TimeFilter timeFilter,
			@InnerBodyParam("groupBy") final String groupBy) {

		return dataProvider.getTabularData(dataFilter, timeFilter, groupBy);
	}

}
