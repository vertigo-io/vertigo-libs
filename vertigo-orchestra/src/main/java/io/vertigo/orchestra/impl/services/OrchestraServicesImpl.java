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
package io.vertigo.orchestra.impl.services;

import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.lang.Assertion;
import io.vertigo.orchestra.services.OrchestraServices;
import io.vertigo.orchestra.services.execution.JobExecutor;
import io.vertigo.orchestra.services.log.ProcessLogger;
import io.vertigo.orchestra.services.report.ProcessReport;

/**
 * Implémentation du manager des executions.
 *
 * @author mlaroche.
 * @version $Id$
 */
public final class OrchestraServicesImpl implements OrchestraServices {

	@Inject
	private JobExecutor processExecutor;
	private final Optional<ProcessLogger> optionalProcessLog;
	private final Optional<ProcessReport> optionalProcessReport;

	/**
	 * Constructeur du gestionnaire de l'execution des processus orchestra.
	 * @param logProviderPlugin plugin for logging
	 * @param processReportPlugin plugin for reporting
	 */
	@Inject
	public OrchestraServicesImpl(
			final Optional<ProcessLoggerPlugin> logProviderPlugin,
			final Optional<ProcessReportPlugin> processReportPlugin) {
		Assertion.checkNotNull(logProviderPlugin);
		Assertion.checkNotNull(processReportPlugin);
		// ---
		optionalProcessLog = Optional.ofNullable(logProviderPlugin.orElse(null));
		optionalProcessReport = Optional.ofNullable(processReportPlugin.orElse(null));

	}

	/** {@inheritDoc} */
	@Override
	public JobExecutor getExecutor() {
		return processExecutor;
	}

	@Override
	public ProcessLogger getLogger() {
		return optionalProcessLog
				.orElseThrow(() -> new IllegalStateException("A ProcessLogPlugin must be defined for logging"));
	}

	@Override
	public ProcessReport getReport() {
		return optionalProcessReport
				.orElseThrow(() -> new IllegalStateException("A ProcessReportPlugin must be defined for retrieving executions and summaries"));
	}

}
