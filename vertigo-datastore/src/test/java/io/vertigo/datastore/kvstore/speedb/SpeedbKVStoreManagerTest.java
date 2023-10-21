/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.datastore.kvstore.speedb;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.analytics.log.SocketLoggerAnalyticsConnectorPlugin;
import io.vertigo.core.plugins.param.env.SystemPropertyParamPlugin;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.datastore.DataStoreFeatures;
import io.vertigo.datastore.kvstore.AbstractKVStoreManagerTest;

/**
 * @author npiedeloup
 */
public final class SpeedbKVStoreManagerTest extends AbstractKVStoreManagerTest {

	@Override
	protected NodeConfig buildNodeConfig() {
		System.setProperty("analyticsServer", "analytica.part.klee.lan.net");
		//System.setProperty("analyticsServer", "0.0.0.0");
		final boolean json = true;
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.addPlugin(SystemPropertyParamPlugin.class)
						.addPlugin(ClassPathResourceResolverPlugin.class)
						.addAnalyticsConnectorPlugin(SocketLoggerAnalyticsConnectorPlugin.class,
								Param.of("hostNameParam", "analyticsServer"),
								Param.of("port", json ? 4563 : 4562), //4562:serialiazed, 4563:json
								Param.of("batchSize", "10"),
								Param.of("jsonLayout", String.valueOf(json)),
								Param.of("compressOutputStream", "true"))
						.build())
				.addModule(new CommonsFeatures()
						.build())
				.addModule(new DataStoreFeatures()
						.withCache()
						.withMemoryCache()
						.withKVStore()
						.withSpeedbKV(
								Param.of("collections", "flowers;TTL=" + TTL + ", trees;inMemory"),
								Param.of("dbFilePath", storagePath))
						.build())
				.build();
	}

	@Override
	@Disabled
	@Test
	public void testRemoveFail() {
		//cant detect not found key
	}

	@Override
	@Disabled
	@Test
	public void testTimeToLive() {
		//need daemon : get can return expired key @see https://github.com/facebook/rocksdb/wiki/Time-to-Live
	}
}
