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
package io.vertigo.dashboard.ui;

import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import freemarker.cache.ClassTemplateLoader;
import freemarker.core.Configurable;
import freemarker.ext.beans.BeansWrapperBuilder;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import io.vertigo.app.App;
import io.vertigo.app.config.ModuleConfig;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.dashboard.ui.commons.CommonsDashboardControler;
import io.vertigo.dashboard.ui.dynamo.DynamoDashboardControler;
import io.vertigo.dashboard.ui.vega.VegaDashboardControler;
import spark.Response;
import spark.Spark;
import spark.utils.GzipUtils;
import spark.utils.IOUtils;

public final class DashboardRouter {
	private static final Logger LOGGER = LoggerFactory.getLogger(DashboardRouter.class);
	private final Configuration configuration;

	private static final Map<String, Class<? extends DashboardModuleControler>> controlerMap = new HashMap<>();

	static {
		controlerMap.put("commons", CommonsDashboardControler.class);
		controlerMap.put("dynamo", DynamoDashboardControler.class);
		controlerMap.put("vega", VegaDashboardControler.class);
	}

	private final App app;

	/**
	 * Creates a new studio for an existing app
	 * @param app the app we are working on
	 */
	public DashboardRouter(final App app) {
		configuration = new Configuration(Configuration.VERSION_2_3_23);
		configuration.setTemplateLoader(new ClassTemplateLoader(DashboardRouter.class, "/"));
		configuration.setClassForTemplateLoading(DashboardRouter.class, "");
		final BeansWrapperBuilder beansWrapperBuilder = new BeansWrapperBuilder(Configuration.VERSION_2_3_23);
		beansWrapperBuilder.setSimpleMapWrapper(true);
		configuration.setObjectWrapper(beansWrapperBuilder.build());
		try {
			configuration.setSetting(Configurable.NUMBER_FORMAT_KEY, "computer");
		} catch (final TemplateException e) {
			LOGGER.error("Error putting settings", e);
		}
		this.app = app;
	}

	/**
	 * Start method of the server
	 */
	public void route() {

		Spark.get("/dashboard/static/:fileName", (request, response) -> {
			try (InputStream inputStream = DashboardRouter.class.getResource("/static/" + request.params(":fileName")).openStream();
					OutputStream wrappedOutputStream = GzipUtils.checkAndWrap(request.raw(), response.raw(), false)) {
				IOUtils.copy(inputStream, wrappedOutputStream);
			}
			return "";
		});

		Spark.get("/dashboard", (request, response) -> {
			final Set<String> modules = app.getConfig().getModuleConfigs().stream().map(ModuleConfig::getName).collect(Collectors.toSet());
			final Map<String, Object> model = new HashMap<>();
			model.put("modules", modules);
			return render(response, "templates/home.ftl", model);
		});

		Spark.get("/dashboard/modules/:moduleName", (request, response) -> {
			final String moduleName = request.params(":moduleName");
			final DashboardModuleControler controler = DIInjector.newInstance(controlerMap.get(moduleName), app.getComponentSpace());
			final Map<String, Object> model = controler.buildModel(app, moduleName);

			return render(response, "templates/" + moduleName + ".ftl", model);
		});

	}

	private String render(final Response response, final String templateName, final Map<String, Object> model) throws Exception {
		response.status(200);
		response.type("text/html");

		final StringWriter stringWriter = new StringWriter();

		final Template template = configuration.getTemplate(templateName);
		template.process(model, stringWriter);
		return stringWriter.toString();
	}

}
