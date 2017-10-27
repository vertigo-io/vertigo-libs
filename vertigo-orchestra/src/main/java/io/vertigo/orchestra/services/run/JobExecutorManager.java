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
package io.vertigo.orchestra.services.run;

import io.vertigo.core.component.Manager;
import io.vertigo.orchestra.domain.run.OJobExec;
import io.vertigo.orchestra.plugins.store.OParams;

/**
 * @author xdurand
 */
public interface JobExecutorManager extends Manager {
	/**
	 * Execute un job.
	 * @param job le job à lancer
	 * @param initialParams paramètres initiaux
	 * @param jobId le job id
	 * @param execDate la date exacte d'execution faisant reférence
	 */
	//	void execute(OJobModel jobModel, OParams initialParams, String jobId, ZonedDateTime execDate);
	void execute(OJobExec jobExec, OParams initialParams);

	/**
	 *
	 */
	void awaitTermination();

}
