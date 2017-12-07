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
package io.vertigo.dashboard.ui.vega;

import java.util.Arrays;
import java.util.Map;

import io.vertigo.app.App;
import io.vertigo.dashboard.services.data.DataFilter;
import io.vertigo.dashboard.services.data.TimeFilter;
import io.vertigo.dashboard.services.data.TimedDatas;
import io.vertigo.dashboard.ui.AbstractDashboardModuleControler;
import io.vertigo.lang.VUserException;

public final class VegaDashboardControler extends AbstractDashboardModuleControler {

	@Override
	public void doBuildModel(final App app, final Map<String, Object> model) {
		addGlobalIndicators(model);
		//
	}

	private void addGlobalIndicators(final Map<String, Object> model) {
		final DataFilter dataFilter = DataFilter.builder("webservices").build();
		final DataFilter dataFilterExceptions = DataFilter.builder("webservices")
				.withAdditionalWhereClause("\"exception\" != '' and \"exception\" != '" + VUserException.class.getCanonicalName() + "'")
				.build();
		final TimeFilter timeFilter = TimeFilter.builder("now() - 1w", "now()").withTimeDim("3w").build();
		//---
		final TimedDatas countAndMeanDuration = getDataProvider().getTimeSeries(Arrays.asList("duration:count", "duration:mean"), dataFilter, timeFilter);
		final TimedDatas numOfTechnicalExceptions = getDataProvider().getTimeSeries(Arrays.asList("duration:count"), dataFilterExceptions, timeFilter);

		double count = 0;
		double meanDuration = 0;
		double exceptionRate = 0;
		if (!countAndMeanDuration.getTimedDataSeries().isEmpty()) {
			// we have one and only one result
			final Map<String, Object> values = countAndMeanDuration.getTimedDataSeries().get(0).getValues();
			count = (Double) values.get("duration:count");
			meanDuration = (Double) values.get("duration:mean");
		}
		if (count > 0 && !numOfTechnicalExceptions.getTimedDataSeries().isEmpty()) {
			// we have one and only one result
			final Map<String, Object> values = numOfTechnicalExceptions.getTimedDataSeries().get(0).getValues();
			exceptionRate = (((Double) values.get("duration:count")) / count * 100);
		}
		model.put("webservicesCount", count);
		model.put("webservicesMeanDuration", meanDuration);
		model.put("webservicesExceptionRate", exceptionRate);
	}

}
