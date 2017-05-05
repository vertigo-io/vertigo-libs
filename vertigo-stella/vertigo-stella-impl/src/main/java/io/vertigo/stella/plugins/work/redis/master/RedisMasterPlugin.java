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
package io.vertigo.stella.plugins.work.redis.master;

import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.commons.impl.connectors.redis.RedisConnector;
import io.vertigo.lang.Assertion;
import io.vertigo.stella.impl.work.MasterPlugin;
import io.vertigo.stella.impl.work.WorkItem;
import io.vertigo.stella.impl.work.WorkResult;
import io.vertigo.stella.plugins.work.redis.RedisDB;

/**
 * Ce plugin permet de distribuer des travaux.
 * REDIS est utilisé comme plateforme d'échanges.
 *
 * @author pchretien
 */
public final class RedisMasterPlugin implements MasterPlugin {
	private final RedisDB redisDB;
	private final List<String> distributedWorkTypes;

	@Inject
	public RedisMasterPlugin(
			final CodecManager codecManager,
			final RedisConnector redisConnector,
			@Named("distributedWorkTypes") final String distributedWorkTypes) {
		Assertion.checkArgNotEmpty(distributedWorkTypes);
		Assertion.checkNotNull(codecManager);
		Assertion.checkNotNull(redisConnector);
		//-----
		this.distributedWorkTypes = Arrays.asList(distributedWorkTypes.split(";"));
		redisDB = new RedisDB(codecManager, redisConnector);
	}

	/** {@inheritDoc} */
	@Override
	public List<String> acceptedWorkTypes() {
		return distributedWorkTypes;
	}

	/** {@inheritDoc}*/
	@Override
	public WorkResult pollResult(final int waitTimeSeconds) {
		return redisDB.pollResult(waitTimeSeconds);
	}

	/** {@inheritDoc} */
	@Override
	public <R, W> void putWorkItem(final WorkItem<R, W> workItem) {
		redisDB.putWorkItem(workItem);
	}
}
