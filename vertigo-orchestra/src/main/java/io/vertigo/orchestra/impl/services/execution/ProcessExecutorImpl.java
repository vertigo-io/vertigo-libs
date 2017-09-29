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
package io.vertigo.orchestra.impl.services.execution;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import io.vertigo.lang.Assertion;
import io.vertigo.orchestra.definitions.ProcessDefinition;
import io.vertigo.orchestra.definitions.ProcessType;
import io.vertigo.orchestra.services.execution.ProcessExecutor;

public final class ProcessExecutorImpl implements ProcessExecutor {
	private final Map<ProcessType, ProcessExecutorPlugin> executorPluginsMap = new EnumMap<>(ProcessType.class);

	public ProcessExecutorImpl(final List<ProcessExecutorPlugin> processExecutorPlugins) {
		Assertion.checkNotNull(processExecutorPlugins);
		// ---
		for (final ProcessExecutorPlugin processExecutorPlugin : processExecutorPlugins) {
			Assertion.checkState(!executorPluginsMap.containsKey(processExecutorPlugin.getHandledProcessType()), "Only one plugin can manage the processType {0}",
					processExecutorPlugin.getHandledProcessType());
			executorPluginsMap.put(processExecutorPlugin.getHandledProcessType(), processExecutorPlugin);
		}
	}

	/** {@inheritDoc} */
	@Override
	public void execute(final ProcessDefinition processDefinition, final Optional<String> initialParams) {
		Assertion.checkNotNull(processDefinition);
		Assertion.checkNotNull(initialParams);
		// ---
		getPluginByType(processDefinition.getProcessType()).execute(processDefinition, initialParams);
	}

	private ProcessExecutorPlugin getPluginByType(final ProcessType processType) {
		final ProcessExecutorPlugin executorPlugin = executorPluginsMap.get(processType);
		Assertion.checkNotNull(executorPlugin, "No plugin found for managing processType {0}", processType.name());
		return executorPlugin;
	}
}
