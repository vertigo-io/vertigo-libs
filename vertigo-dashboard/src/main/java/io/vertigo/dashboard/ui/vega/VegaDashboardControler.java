package io.vertigo.dashboard.ui.vega;

import java.util.Map;

import io.vertigo.app.App;
import io.vertigo.dashboard.services.data.DataFilter;
import io.vertigo.dashboard.services.data.TimeFilter;
import io.vertigo.dashboard.services.data.TimedDatas;
import io.vertigo.dashboard.ui.AbstractDashboardModuleControler;

public final class VegaDashboardControler extends AbstractDashboardModuleControler {

	@Override
	public void doBuildModel(final App app, final Map<String, Object> model) {
		final DataFilter dataFilter = new DataFilter("webservices", "*", "*", "*");
		final TimeFilter timeFilter = new TimeFilter("now() - 1w", "now()", "*");
		//---
		final TimedDatas timedDatas = getDataProvider().getTops("duration:sum", dataFilter, timeFilter, "name", 5);
		model.put("webservicesTop", timedDatas);
		//
	}

}
