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
package io.vertigo.dashboard.ui.commons;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import io.vertigo.app.App;
import io.vertigo.app.Home;
import io.vertigo.commons.analytics.AnalyticsManager;
import io.vertigo.commons.analytics.health.HealthCheck;
import io.vertigo.commons.analytics.health.HealthStatus;
import io.vertigo.commons.cache.CacheDefinition;
import io.vertigo.commons.daemon.DaemonDefinition;
import io.vertigo.commons.daemon.DaemonManager;
import io.vertigo.commons.daemon.DaemonStat;
import io.vertigo.commons.eventbus.EventBusSubscriptionDefinition;
import io.vertigo.dashboard.ui.AbstractDashboardModuleControler;
import io.vertigo.dashboard.ui.commons.model.CacheModel;
import io.vertigo.dashboard.ui.commons.model.DaemonModel;
import io.vertigo.dashboard.ui.commons.model.EventBusModel;

public class CommonsDashboardControler extends AbstractDashboardModuleControler {

	@Override
	public void doBuildModel(final App app, final Map<String, Object> model) {
		buildDaemonsModel(app, model);
		buildEventBusModel(app, model);
		buildCacheModel(app, model);
	}

	private static void buildDaemonsModel(final App app, final Map<String, Object> model) {
		final DaemonManager daemonManager = app.getComponentSpace().resolve(DaemonManager.class);
		final List<DaemonStat> daemonStats = daemonManager.getStats();
		//---
		final List<DaemonModel> daemonModels = Home.getApp().getDefinitionSpace().getAll(DaemonDefinition.class)
				.stream()
				.map(daemonDefinition -> new DaemonModel(
						daemonDefinition,
						daemonStats
								.stream()
								.filter(stat -> daemonDefinition.getName().equals(stat.getDaemonName()))
								.findFirst()
								.get()))
				.collect(Collectors.toList());
		model.put("daemons", daemonModels);
		//---
		model.put("daemonsStatus", getHealthStatus(app, model, "daemons"));

	}

	private static void buildEventBusModel(final App app, final Map<String, Object> model) {
		final Collection<EventBusSubscriptionDefinition> eventBusSubscriptions = Home.getApp().getDefinitionSpace().getAll(EventBusSubscriptionDefinition.class);
		final List<EventBusModel> events = eventBusSubscriptions
				.stream()
				.collect(Collectors.groupingBy(EventBusSubscriptionDefinition::getEventType))
				.entrySet()
				.stream()
				.map(entry -> new EventBusModel(entry.getKey(), entry.getValue()))
				.collect(Collectors.toList());
		model.put("events", events);
		//---
		model.put("eventSubcriptionsCount", eventBusSubscriptions.size());
		model.put("eventsStatus", getHealthStatus(app, model, "events"));
	}

	private static void buildCacheModel(final App app, final Map<String, Object> model) {
		final List<CacheModel> caches = Home.getApp().getDefinitionSpace().getAll(CacheDefinition.class)
				.stream()
				.map(cacheDefinition -> new CacheModel(cacheDefinition))
				.collect(Collectors.toList());
		model.put("caches", caches);
		model.put("cacheStatus", getHealthStatus(app, model, "cache"));
	}

	private static HealthStatus getHealthStatus(final App app, final Map<String, Object> model, final String... topics) {
		final AnalyticsManager analyticsManager = app.getComponentSpace().resolve(AnalyticsManager.class);
		final Map<String, List<HealthCheck>> healthCheckByTopic = (Map<String, List<HealthCheck>>) model.get("healthchecksByFeature");
		final List<String> myTopics = Arrays.asList(topics);
		final List<HealthCheck> healtChecksToAggregate = healthCheckByTopic
				.entrySet()
				.stream()
				.filter(entry -> myTopics.contains(entry.getKey()))
				.flatMap(entry -> entry.getValue().stream())
				.collect(Collectors.toList());

		return analyticsManager.aggregate(healtChecksToAggregate);
	}

}
