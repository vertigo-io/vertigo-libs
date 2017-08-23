/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import freemarker.cache.ClassTemplateLoader;
import freemarker.ext.beans.BeansWrapperBuilder;
import freemarker.template.Configuration;
import freemarker.template.Template;
import io.vertigo.app.App;
import io.vertigo.app.Home;
import io.vertigo.app.config.ModuleConfig;
import io.vertigo.commons.analytics.AnalyticsManager;
import io.vertigo.commons.analytics.health.HealthCheck;
import io.vertigo.commons.daemon.DaemonDefinition;
import io.vertigo.commons.daemon.DaemonManager;
import io.vertigo.commons.daemon.DaemonStat;
import io.vertigo.dashboard.commons.CommonsDashboard;
import io.vertigo.lang.Assertion;
import spark.Response;
import spark.Spark;

public final class Dashboard {
	private static final Logger LOGGER = LoggerFactory.getLogger(Dashboard.class);
	private final Configuration configuration;

	private final App app;

	private List<HealthCheck> appHealthChecks;
	private final Object healthChecksLock = new Object();

	@Inject
	private AnalyticsManager analyticsManager;

	/**
	 * Creates a new studio for an existing app
	 * @param app the app we are working on
	 * @param port the port to access the studio interface
	 */
	public Dashboard(final App app, final int port) {
		configuration = new Configuration(Configuration.VERSION_2_3_23);
		configuration.setTemplateLoader(new ClassTemplateLoader(Dashboard.class, "/"));
		configuration.setClassForTemplateLoading(Dashboard.class, "");
		final BeansWrapperBuilder beansWrapperBuilder = new BeansWrapperBuilder(Configuration.VERSION_2_3_23);
		beansWrapperBuilder.setSimpleMapWrapper(true);
		configuration.setObjectWrapper(beansWrapperBuilder.build());
		Spark.port(port);
		this.app = app;
	}

	/**
	 * Start method of the server
	 */
	public void start() {

		Spark.staticFileLocation("/static/");
		Spark.exception(Exception.class, (e, request, response) -> {
			response.status(500);
			LOGGER.error("dashboard : error on render ", e);
			response.body(e.getMessage());
		});

		Spark.get("/dashboard", (request, response) -> {
			return renderModules(response);
		});

		Spark.get("/dashboard/modules/:moduleName", (request, response) -> {
			final String moduleName = request.params(":moduleName");
			final Map<String, Object> model = new HashMap<>();
			initModuleModel(model, moduleName);
			switch (moduleName) {
				case "commons":
					CommonsDashboard.buildModel(app, model);
					break;
				default:
					break;
			}
			return render(response, "templates/" + moduleName + ".ftl", model);
		});

	}

	private String renderModules(final Response response) throws Exception {
		final Map<String, Object> model = new HashMap<>();
		initModel(model);
		return render(response, "templates/modules.ftl", model);
	}

	private void prepareCommonsModel(final Map<String, Object> model) {
		final DaemonManager daemonManager = app.getComponentSpace().resolve(DaemonManager.class);
		model.put("daemons", Home.getApp().getDefinitionSpace().getAll(DaemonDefinition.class));
		model.put("daemonsStats", daemonManager.getStats().stream().collect(Collectors.groupingBy(DaemonStat::getDaemonName)));
	}

	private void initModuleModel(final Map<String, Object> model, final String moduleName) {
		final Set<String> modules = app.getConfig().getModuleConfigs().stream().map(ModuleConfig::getName).collect(Collectors.toSet());
		Assertion.checkState(modules.contains(moduleName), "no module with name '{0}' found in the app", moduleName);
		//---
		initModel(model);
		//---
		final List<HealthCheck> healthChecks = getHealthChecks();
		final Map<String, List<HealthCheck>> healthChecksByTopic = healthChecks
				.stream()
				.filter(healthCheck -> moduleName.equals(healthCheck.getFeature()))
				.collect(Collectors.groupingBy(HealthCheck::getTopic, Collectors.toList()));

		final Set<String> topics = healthChecks
				.stream()
				.filter(healthCheck -> moduleName.equals(healthCheck.getFeature()))
				.map(HealthCheck::getTopic)
				.collect(Collectors.toSet());

		//---
		model.put("topics", topics);
		model.put("healthchecksByTopic", healthChecksByTopic);
		model.put("moduleName", moduleName);
	}

	private String render(final Response response, final String templateName, final Map<String, Object> model) throws Exception {
		response.status(200);
		response.type("text/html");

		final StringWriter stringWriter = new StringWriter();

		final Template template = configuration.getTemplate(templateName);
		template.process(model, stringWriter);
		return stringWriter.toString();
	}

	private List<HealthCheck> getHealthChecks() {
		if (appHealthChecks == null) {
			loadHealthChecks();
		}
		return appHealthChecks;
	}

	private void loadHealthChecks() {
		synchronized (healthChecksLock) {
			appHealthChecks = analyticsManager.getHealthChecks();
		}

	}

	private void initModel(final Map<String, Object> model) {
		model.put("modules", Home.getApp().getConfig().getModuleConfigs()
				.stream()
				.map(ModuleConfig::getName)
				.collect(Collectors.toList()));
	}

}
