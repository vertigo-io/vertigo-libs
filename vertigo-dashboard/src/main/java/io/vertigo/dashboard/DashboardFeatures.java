package io.vertigo.dashboard;

import io.vertigo.app.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.dashboard.impl.services.data.DataProviderImpl;
import io.vertigo.dashboard.plugins.data.influxdb.InfluxDbDataProviderPlugin;
import io.vertigo.dashboard.services.data.DataProvider;
import io.vertigo.dashboard.webservices.DashboardDataProviderWebServices;

public class DashboardFeatures extends Features {

	private String myAppName;

	public DashboardFeatures() {
		super("dashboard");
	}

	public DashboardFeatures withAppName(final String appName) {
		myAppName = appName;
		return this;
	}

	public DashboardFeatures withInfluxDb(final String host, final String user, final String password) {
		getModuleConfigBuilder()
				.addPlugin(InfluxDbDataProviderPlugin.class,
						Param.of("host", host),
						Param.of("user", user),
						Param.of("password", password));
		return this;
	}

	@Override
	protected void buildFeatures() {
		if (myAppName != null) {
			getModuleConfigBuilder()
					.addComponent(DataProvider.class, DataProviderImpl.class, Param.of("appName", myAppName));
		} else {
			getModuleConfigBuilder()
					.addComponent(DataProvider.class, DataProviderImpl.class);
		}
		getModuleConfigBuilder()
				.addComponent(DashboardDataProviderWebServices.class);

	}

}
