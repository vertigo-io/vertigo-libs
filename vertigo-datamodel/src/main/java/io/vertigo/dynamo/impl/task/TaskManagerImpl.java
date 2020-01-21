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
package io.vertigo.dynamo.impl.task;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.node.Home;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.core.util.InjectorUtil;
import io.vertigo.core.util.Selector;
import io.vertigo.core.util.Selector.MethodConditions;
import io.vertigo.dynamo.ngdomain.SmartTypeDefinition;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.metamodel.TaskDefinitionBuilder;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamo.task.model.TaskEngine;
import io.vertigo.dynamo.task.model.TaskResult;
import io.vertigo.dynamo.task.proxy.TaskAnnotation;
import io.vertigo.dynamo.task.proxy.TaskInput;
import io.vertigo.dynamo.task.proxy.TaskOutput;

/**
 * @author pchretien
 */
public final class TaskManagerImpl implements TaskManager, SimpleDefinitionProvider {
	private final AnalyticsManager analyticsManager;

	/**
	 * @param analyticsManager Manager analytics
	 */
	@Inject
	public TaskManagerImpl(final AnalyticsManager analyticsManager) {
		Assertion.checkNotNull(analyticsManager);
		//-----
		this.analyticsManager = analyticsManager;
	}

	/** {@inheritDoc} */
	@Override
	public TaskResult execute(final Task task) {
		return analyticsManager
				.traceWithReturn(
						"tasks",
						"/execute/" + task.getDefinition().getName(),
						tracer -> doExecute(task));
	}

	private static TaskResult doExecute(final Task task) {
		final TaskEngine taskEngine = InjectorUtil.newInstance(task.getDefinition().getTaskEngineClass());
		return taskEngine.process(task);
	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		final List<Class> componenentClasses = Home.getApp().getComponentSpace().keySet()
				.stream()
				.map(componentId -> Home.getApp().getComponentSpace().resolve(componentId, Object.class).getClass())
				.collect(Collectors.toList());

		return new Selector().from(componenentClasses)
				.filterMethods(MethodConditions.annotatedWith(TaskAnnotation.class))
				.findMethods()
				.stream()
				.map(tuple -> tuple.getVal2())
				.map(TaskManagerImpl::createTaskDefinition)
				.collect(Collectors.toList());
	}

	private static TaskDefinition createTaskDefinition(final Method method) {
		final io.vertigo.dynamo.task.proxy.TaskAnnotation taskAnnotation = method.getAnnotation(io.vertigo.dynamo.task.proxy.TaskAnnotation.class);

		final TaskDefinitionBuilder taskDefinitionBuilder = TaskDefinition.builder(taskAnnotation.name())
				.withEngine(taskAnnotation.taskEngineClass())
				.withRequest(taskAnnotation.request())
				.withDataSpace(taskAnnotation.dataSpace().isEmpty() ? null : taskAnnotation.dataSpace());

		if (hasOut(method)) {
			final SmartTypeDefinition outSmartType = findOutSmartType(method);
			final Cardinality outCardinality = getCardinality(method.getReturnType());
			taskDefinitionBuilder.withOutAttribute("out", outSmartType, outCardinality);
		}
		for (final Parameter parameter : method.getParameters()) {
			final TaskInput taskAttributeAnnotation = parameter.getAnnotation(TaskInput.class);
			final Cardinality inAttributeCardinality = getCardinality(parameter.getType());

			//test if the parameter is an optional type
			taskDefinitionBuilder.addInAttribute(
					taskAttributeAnnotation.name(),
					resolveSmartTypeDefinition(taskAttributeAnnotation.domain()),
					inAttributeCardinality);
		}

		return taskDefinitionBuilder.build();
	}

	private static SmartTypeDefinition resolveSmartTypeDefinition(final String smartTypeName) {
		return Home.getApp().getDefinitionSpace().resolve(smartTypeName, SmartTypeDefinition.class);
	}

	private static boolean hasOut(final Method method) {
		return !void.class.equals(method.getReturnType());
	}

	private static Cardinality getCardinality(final Class type) {
		if (Optional.class.isAssignableFrom(type)) {
			return Cardinality.OPTIONAL_OR_NULLABLE;
		} else if (List.class.isAssignableFrom(type)) {
			return Cardinality.MANY;
		} else {
			return Cardinality.ONE;
		}
	}

	private static SmartTypeDefinition findOutSmartType(final Method method) {
		final TaskOutput taskOutput = method.getAnnotation(TaskOutput.class);
		Assertion.checkNotNull(taskOutput, "The return method '{0}' must be annotated with '{1}'", method, TaskOutput.class);
		return resolveSmartTypeDefinition(taskOutput.domain());
	}
}
