/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.dashboard.webservices;

import java.util.List;

import javax.inject.Inject;

import io.vertigo.dashboard.services.data.ClusteredMeasure;
import io.vertigo.dashboard.services.data.DataFilter;
import io.vertigo.dashboard.services.data.DataProvider;
import io.vertigo.dashboard.services.data.TimeFilter;
import io.vertigo.dashboard.services.data.TimedDatas;
import io.vertigo.lang.Assertion;
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
			@InnerBodyParam("measures") final List<String> measures,
			@InnerBodyParam("dataFilter") final DataFilter dataFilter,
			@InnerBodyParam("timeFilter") final TimeFilter timeFilter) {

		return dataProvider.getTimeSeries(measures, dataFilter, timeFilter);
	}

	@SessionLess
	@AnonymousAccessAllowed
	@POST("/series/clustered")
	public TimedDatas getClusteredTimedDatas(
			@InnerBodyParam("clusteredMeasure") final ClusteredMeasure clusteredMeasure,
			@InnerBodyParam("dataFilter") final DataFilter dataFilter,
			@InnerBodyParam("timeFilter") final TimeFilter timeFilter) {

		return dataProvider.getClusteredTimeSeries(clusteredMeasure, dataFilter, timeFilter);
	}

	@SessionLess
	@AnonymousAccessAllowed
	@POST("/tabular")
	public TimedDatas getTimedDatas(
			@InnerBodyParam("measures") final List<String> measures,
			@InnerBodyParam("dataFilter") final DataFilter dataFilter,
			@InnerBodyParam("timeFilter") final TimeFilter timeFilter,
			@InnerBodyParam("groupBy") final String groupBy) {

		return dataProvider.getTabularData(measures, dataFilter, timeFilter, false, groupBy);
	}

	@SessionLess
	@AnonymousAccessAllowed
	@POST("/tabular/tops")
	public TimedDatas getTops(
			@InnerBodyParam("measures") final List<String> measures,
			@InnerBodyParam("dataFilter") final DataFilter dataFilter,
			@InnerBodyParam("timeFilter") final TimeFilter timeFilter,
			@InnerBodyParam("groupBy") final String groupBy,
			@InnerBodyParam("maxRows") final int maxRows) {
		Assertion.checkState(measures.size() == 1, "One and only one measure must be queried for a top request");
		//---
		return dataProvider.getTops(measures.get(0), dataFilter, timeFilter, groupBy, maxRows);
	}

}
