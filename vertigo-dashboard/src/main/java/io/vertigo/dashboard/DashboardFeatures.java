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
