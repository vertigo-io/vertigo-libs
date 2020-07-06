/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.dynamox.metrics;

import java.util.List;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.analytics.metric.Metric;
import io.vertigo.core.node.AutoCloseableApp;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.datamodel.DataModelFeatures;
import io.vertigo.datamodel.impl.smarttype.ModelDefinitionProvider;
import io.vertigo.datamodel.task.TaskManager;
import io.vertigo.datastore.DataStoreFeatures;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.datastore.task.SuperHeroDao;
import io.vertigo.datastore.task.data.TestSmartTypes;
import io.vertigo.datastore.task.data.domain.SuperHeroDataBase;
import io.vertigo.dynamox.metric.domain.DomainMetricsProvider;
import io.vertigo.dynamox.metric.task.TasksMetricsProvider;

/**
 * @author mlaroche
 */
public final class MetricAnalyticsTest {

	@Inject
	private AnalyticsManager analyticsManager;
	@Inject
	private TaskManager taskManager;
	@Inject
	private EntityStoreManager entityStoreManager;
	@Inject
	private VTransactionManager transactionManager;

	private SuperHeroDataBase superHeroDataBase;

	private AutoCloseableApp app;

	@BeforeEach
	public final void setUp() throws Exception {
		app = new AutoCloseableApp(buildNodeConfig());
		DIInjector.injectMembers(this, app.getComponentSpace());
		//---
		superHeroDataBase = new SuperHeroDataBase(transactionManager, taskManager);
		superHeroDataBase.createDataBase();
		superHeroDataBase.populateSuperHero(entityStoreManager, 33);
	}

	@AfterEach
	public final void tearDown() throws Exception {
		if (app != null) {
			app.close();
		}
	}

	private NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.withLocales("fr_FR")
						.addPlugin(ClassPathResourceResolverPlugin.class)
						.build())
				.addModule(new CommonsFeatures()
						.withScript()
						.withJaninoScript()
						.build())
				.addModule(new DatabaseFeatures()
						.withSqlDataBase()
						.withC3p0(
								Param.of("dataBaseClass", H2DataBase.class.getName()),
								Param.of("jdbcDriver", "org.h2.Driver"),
								Param.of("jdbcUrl", "jdbc:h2:mem:database"))
						.build())
				.addModule(new DataModelFeatures().build())
				.addModule(new DataStoreFeatures()
						.withCache()
						.withMemoryCache()
						.withEntityStore()
						.withSqlEntityStore()
						.withTaskProxyMethod()
						.build())
				.addModule(ModuleConfig.builder("myApp")
						.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
								.addDefinitionResource("smarttypes", TestSmartTypes.class.getName())
								.addDefinitionResource("dtobjects", "io.vertigo.datastore.task.data.DtDefinitions")
								.build())
						.addAmplifier(SuperHeroDao.class)
						.build())
				.addModule(ModuleConfig.builder("analytics-metric")
						.addComponent(DomainMetricsProvider.class)
						.addComponent(TasksMetricsProvider.class)
						.build())
				.build();
	}

	@Test
	public void testAnalyze() {
		final List<Metric> metrics = analyticsManager.getMetrics();
		//---
		Assertions.assertEquals(11, metrics.size());
	}
}
