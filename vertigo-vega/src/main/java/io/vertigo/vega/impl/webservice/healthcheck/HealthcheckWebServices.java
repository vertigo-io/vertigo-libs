/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.vega.impl.webservice.healthcheck;

import java.util.List;

import javax.inject.Inject;

import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.analytics.health.HealthCheck;
import io.vertigo.core.analytics.health.HealthStatus;
import io.vertigo.core.lang.Assertion;
import io.vertigo.vega.webservice.WebServices;
import io.vertigo.vega.webservice.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.webservice.stereotype.GET;
import io.vertigo.vega.webservice.stereotype.PathPrefix;
import io.vertigo.vega.webservice.stereotype.SessionLess;

/**
 * Healthcheck WebService.
 * @author xdurand (30 mars 2017 18:00:02)
 */
@PathPrefix("/healthcheck")
public final class HealthcheckWebServices implements WebServices {

	@Inject
	private AnalyticsManager analyticsManager;

	/**
	 * Healthcheck WebService.
	 * @return constant string "OK" that can be used to monitor the technical health.
	 */
	@SuppressWarnings("static-method")
	@SessionLess
	@AnonymousAccessAllowed
	@GET("/ping")
	public String healthcheck() {
		return "OK";
	}

	/**
	 * Complete node healthcheck WebService.
	 * @return a complete health status of the node for all the monitored components.
	 */
	@SessionLess
	@AnonymousAccessAllowed
	@GET("/complete")
	public List<HealthCheck> completeHealthcheck() {
		return analyticsManager.getHealthChecks();
	}

	/**
	 * Readiness node healthcheck WebService.
	 * @return a simple health status of the node for all the monitored components.
	 * @throws IllegalStateException if a component is not ready
	 */
	@SessionLess
	@AnonymousAccessAllowed
	@GET("/readiness")
	public String readinessHealthcheck() {
		for (final HealthCheck check : analyticsManager.getHealthChecks()) {
			Assertion.check().isFalse(check.healthMeasure().status() == HealthStatus.RED, "Component {0} is not ready", check.name());
		}
		return "OK";
	}

}
