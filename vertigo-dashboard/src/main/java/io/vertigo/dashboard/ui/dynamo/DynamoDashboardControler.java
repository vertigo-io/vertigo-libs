package io.vertigo.dashboard.ui.dynamo;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import io.vertigo.app.App;
import io.vertigo.app.Home;
import io.vertigo.commons.analytics.metric.Metric;
import io.vertigo.dashboard.services.data.DataFilter;
import io.vertigo.dashboard.services.data.TabularDatas;
import io.vertigo.dashboard.services.data.TimeFilter;
import io.vertigo.dashboard.services.data.TimedDataSerie;
import io.vertigo.dashboard.ui.AbstractDashboardModuleControler;
import io.vertigo.dashboard.ui.dynamo.model.DomainModel;
import io.vertigo.dashboard.ui.dynamo.model.EntityModel;
import io.vertigo.dashboard.ui.dynamo.model.TaskModel;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtStereotype;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;

public final class DynamoDashboardControler extends AbstractDashboardModuleControler {

	@Override
	public void doBuildModel(final App app, final Map<String, Object> model) {
		final List<Metric> metrics = getDataProvider().getMetrics();
		buildEntityModel(app, model, metrics);
		buildDomainModel(app, model, metrics);
		buildTaskModel(app, model);
	}

	private void buildTaskModel(final App app, final Map<String, Object> model) {
		final DataFilter dataFilter = new DataFilter("tasks", "*", "*", "*");
		final TimeFilter timeFilter = new TimeFilter("now() - 1w", "now()", "*");
		final TabularDatas tabularDatas = getDataProvider().getTabularData(Arrays.asList("duration:median", "duration:count"), dataFilter, timeFilter, "name");

		final List<TaskModel> tasks = Home.getApp().getDefinitionSpace().getAll(TaskDefinition.class)
				.stream()
				.map(taskDefinition -> new TaskModel(
						taskDefinition,
						getValue(tabularDatas, "/execute/" + taskDefinition.getName(), "duration:count"),
						getValue(tabularDatas, "/execute/" + taskDefinition.getName(), "duration:median")))
				.collect(Collectors.toList());

		model.put("tasks", tasks);

	}

	private static Double getValue(final TabularDatas tabularDatas, final String serieName, final String measureName) {
		if (tabularDatas.getDataSeries().containsKey(serieName)) {
			final TimedDataSerie timedDataSerie = tabularDatas.getDataSeries().get(serieName);
			if (timedDataSerie.getValues().containsKey(serieName)) {
				return (Double) timedDataSerie.getValues().get(serieName);
			}
		}
		return null;
	}

	private static void buildEntityModel(final App app, final Map<String, Object> model, final List<Metric> metrics) {
		final Map<String, Double> entityCounts = new HashMap<>();

		metrics
				.stream()
				.filter(metric -> "entityCount".equals(metric.getName()))
				.forEach(metric -> entityCounts.put(metric.getTopic(), metric.getValue()));

		final Map<String, Double> taskCounts = new HashMap<>();
		metrics
				.stream()
				.filter(metric -> "definitionUsageInDao".equals(metric.getName()))
				.forEach(metric -> taskCounts.put(metric.getTopic(), metric.getValue()));

		final Map<String, Double> fieldCount = new HashMap<>();
		metrics
				.stream()
				.filter(metric -> "definitionFieldCount".equals(metric.getName()))
				.forEach(metric -> fieldCount.put(metric.getTopic(), metric.getValue()));

		final Collection<DtDefinition> dtDefinitions = Home.getApp().getDefinitionSpace().getAll(DtDefinition.class);
		final List<EntityModel> entities = dtDefinitions
				.stream()
				.filter(DtDefinition::isPersistent)
				.map(dtDefinition -> new EntityModel(
						dtDefinition,
						entityCounts.get(dtDefinition.getName()),
						taskCounts.get(dtDefinition.getName()),
						fieldCount.get(dtDefinition.getName())))
				.collect(Collectors.toList());
		model.put("entities", entities);
		//---
		model.put("entityCount", entities.size());
		final long keyConceptCount = dtDefinitions.stream().filter(dtDefinition -> dtDefinition.getStereotype() == DtStereotype.KeyConcept).count();
		model.put("keyConceptCount", keyConceptCount);
	}

	private static void buildDomainModel(final App app, final Map<String, Object> model, final List<Metric> metrics) {
		final Map<String, Double> taskCount = new HashMap<>();

		metrics
				.stream()
				.filter(metric -> "domainUsageInTasks".equals(metric.getName()))
				.forEach(metric -> taskCount.put(metric.getTopic(), metric.getValue()));

		final Map<String, Double> dtDefinitionCount = new HashMap<>();
		metrics
				.stream()
				.filter(metric -> "domainUsageInDtDefinitions".equals(metric.getName()))
				.forEach(metric -> dtDefinitionCount.put(metric.getTopic(), metric.getValue()));

		final Collection<Domain> domains = Home.getApp().getDefinitionSpace().getAll(Domain.class);
		final List<DomainModel> domainModels = domains
				.stream()
				.filter(domain -> domain.isPrimitive()) // we display only primitives
				.map(domain -> new DomainModel(
						domain,
						taskCount.get(domain.getName()),
						dtDefinitionCount.get(domain.getName())))
				.collect(Collectors.toList());

		model.put("domains", domainModels);

	}

}
