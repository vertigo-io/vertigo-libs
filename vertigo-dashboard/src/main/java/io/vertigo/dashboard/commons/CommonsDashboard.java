package io.vertigo.dashboard.commons;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import io.vertigo.app.App;
import io.vertigo.app.Home;
import io.vertigo.commons.cache.CacheDefinition;
import io.vertigo.commons.daemon.DaemonDefinition;
import io.vertigo.commons.daemon.DaemonManager;
import io.vertigo.commons.daemon.DaemonStat;
import io.vertigo.commons.eventbus.EventBusSubscriptionDefinition;
import io.vertigo.dashboard.model.CacheModel;
import io.vertigo.dashboard.model.DaemonModel;
import io.vertigo.dashboard.model.EventBusModel;

public class CommonsDashboard {

	public static void buildModel(final App app, final Map<String, Object> model) {
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
	}

	private static void buildEventBusModel(final App app, final Map<String, Object> model) {
		final List<EventBusModel> events = Home.getApp().getDefinitionSpace().getAll(EventBusSubscriptionDefinition.class)
				.stream()
				.collect(Collectors.groupingBy(EventBusSubscriptionDefinition::getEventType))
				.entrySet()
				.stream()
				.map(entry -> new EventBusModel(entry.getKey(), entry.getValue()))
				.collect(Collectors.toList());
		model.put("events", events);
	}

	private static void buildCacheModel(final App app, final Map<String, Object> model) {
		final List<CacheModel> caches = Home.getApp().getDefinitionSpace().getAll(CacheDefinition.class)
				.stream()
				.map(cacheDefinition -> new CacheModel(cacheDefinition))
				.collect(Collectors.toList());
		model.put("caches", caches);
	}

}
