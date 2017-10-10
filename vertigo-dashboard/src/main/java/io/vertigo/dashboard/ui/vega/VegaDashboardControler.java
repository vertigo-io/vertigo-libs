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
