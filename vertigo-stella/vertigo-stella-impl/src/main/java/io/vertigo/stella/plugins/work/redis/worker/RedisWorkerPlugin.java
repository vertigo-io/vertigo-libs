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
package io.vertigo.stella.plugins.work.redis.worker;

import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.commons.impl.connectors.redis.RedisConnector;
import io.vertigo.lang.Assertion;
import io.vertigo.stella.impl.work.WorkDispatcherConfUtil;
import io.vertigo.stella.impl.work.WorkItem;
import io.vertigo.stella.impl.work.WorkerPlugin;
import io.vertigo.stella.plugins.work.redis.RedisDB;

/**
 * NodePlugin
 * Ce plugin permet d'exécuter des travaux en mode distribué.
 * REDIS est utilisé comme plateforme d'échanges.
 *
 * @author pchretien
 */
public final class RedisWorkerPlugin implements WorkerPlugin {
	private final Map<String, Integer> workTypes;
	private final RedisDB redisDB;

	@Inject
	public RedisWorkerPlugin(
			final CodecManager codecManager,
			final RedisConnector redisConnector,
			@Named("nodeId") final String nodeId,
			@Named("workTypes") final String workTypes) {
		Assertion.checkNotNull(codecManager);
		Assertion.checkNotNull(redisConnector);
		Assertion.checkArgNotEmpty(workTypes);
		//-----
		this.workTypes = WorkDispatcherConfUtil.readWorkTypeConf(workTypes);
		redisDB = new RedisDB(codecManager, redisConnector);
	}

	/** {@inheritDoc} */
	@Override
	public Map<String, Integer> getWorkTypes() {
		return workTypes;
	}

	/*public List<Node> getNodes() {
		return redisDB.getNodes();
	}*/

	/** {@inheritDoc} */
	@Override
	public <R, W> WorkItem<R, W> pollWorkItem(final String workType) {
		return redisDB.pollWorkItem(workType);
	}

	/** {@inheritDoc} */
	@Override
	public <R> void putResult(final String workId, final R result, final Throwable error) {
		redisDB.putResult(workId, result, error);
	}

	/** {@inheritDoc} */
	@Override
	public void putStart(final String workId) {
		redisDB.putStart(workId);
	}
}
