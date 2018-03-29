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
package io.vertigo.orchestra.plugins.services.schedule.memory;

import java.util.Optional;
import java.util.TimerTask;

import io.vertigo.lang.Assertion;
import io.vertigo.orchestra.definitions.ProcessDefinition;
import io.vertigo.orchestra.services.execution.ProcessExecutor;

/**
 * Timer permettant l'exécution d'un Job.
 * @author npiedeloup
 */
final class BasicTimerTask extends TimerTask {
	private final ProcessDefinition processDefinition;
	private final ProcessExecutor processExecutor;

	/**
	 * Constructeur.
	 * @param jobManager Manager des jobs.
	 */
	BasicTimerTask(final ProcessDefinition processDefinition, final ProcessExecutor processExecutor) {
		Assertion.checkNotNull(processDefinition);
		Assertion.checkNotNull(processExecutor);
		//-----
		this.processDefinition = processDefinition;
		this.processExecutor = processExecutor;
	}

	/** {@inheritDoc} */
	@Override
	public void run() {
		processExecutor.execute(processDefinition, Optional.<String> empty());
	}
}
