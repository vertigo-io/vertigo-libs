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
package io.vertigo.orchestra.plugins.definitions.memory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import io.vertigo.app.Home;
import io.vertigo.core.definition.DefinitionSpace;
import io.vertigo.core.definition.DefinitionSpaceWritable;
import io.vertigo.lang.Assertion;
import io.vertigo.orchestra.definitions.ProcessDefinition;
import io.vertigo.orchestra.definitions.ProcessType;
import io.vertigo.orchestra.impl.definitions.ProcessDefinitionStorePlugin;

/**
 * Plugin de gestion des définitions en mémoire dans le DefinitionSpace.
 * @author mlaroche
 *
 */
public class MemoryProcessDefinitionStorePlugin implements ProcessDefinitionStorePlugin {
	private DefinitionSpace getDefinitionSpace() {
		return Home.getApp().getDefinitionSpace();
	}

	@Override
	public void createOrUpdateDefinition(final ProcessDefinition processDefinition) {
		((DefinitionSpaceWritable) getDefinitionSpace()).registerDefinition(processDefinition);

	}

	@Override
	public boolean processDefinitionExists(final String processName) {
		Assertion.checkArgNotEmpty(processName);
		// ---
		return getDefinitionSpace().contains(processName);
	}

	@Override
	public ProcessDefinition getProcessDefinition(final String processName) {
		Assertion.checkArgNotEmpty(processName);
		// ---
		return getDefinitionSpace().resolve(processName, ProcessDefinition.class);
	}

	@Override
	public List<ProcessDefinition> getAllProcessDefinitions() {
		return new ArrayList<>(getDefinitionSpace().getAll(ProcessDefinition.class));
	}

	@Override
	public void updateProcessDefinitionProperties(final ProcessDefinition processDefinition, final Optional<String> cronExpression, final boolean multiExecution, final int rescuePeriod,
			final boolean active) {
		// unsupported
		throw new UnsupportedOperationException("An in memory definition is immutable");
	}

	@Override
	public void updateProcessDefinitionInitialParams(final ProcessDefinition processDefinition, final Map<String, String> initialParams) {
		throw new UnsupportedOperationException("An in memory definition is immutable");
	}

	@Override
	public ProcessType getHandledProcessType() {
		return ProcessType.UNSUPERVISED;
	}

}
