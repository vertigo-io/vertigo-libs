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
public final class H2KVStoreManagerTest extends AbstractKVStoreManagerTest {

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
								Param.of("batchSize", "5"),
								Param.of("jsonLayout", String.valueOf(json)),
								Param.of("compressOutputStream", "true"))
						.build())
				.addModule(new CommonsFeatures()
						.build())
				.addModule(new DataStoreFeatures()
						.withCache()
						.withMemoryCache()
						.withKVStore()
						.withH2KV(
								Param.of("collections", "flowers;TTL=" + TTL + ", trees;inMemory"),
								Param.of("dbFilePath", storagePath))
						.build())
				.build();
	}

	@Override
	protected boolean supportFindAll() {
		return true;
	}

	/*@Override
	@Test
	public void testDbSize() {
		final int leftLimit = 48; // numeral '0'
		final int rightLimit = 122; // letter 'z'
		final int targetStringLength = 2048;
		final Random random = new Random();
		final String uniquePayload = random.ints(leftLimit, rightLimit + 1)
				.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
				.limit(targetStringLength)
				.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
				.toString();
	
		final String storagePath = "d:\\datastore-tmp\\mvstore";
	
		final MVStore store = new MVStore.Builder()
				.fileName(storagePath)
				//.autoCompactFillRate(100)
				//.cacheSize(50)
				.compress()
				.open();
		try {
			final var map = store.openMap("mvstore");
			System.out.println(" size:" + map.size() + " fillRate:" + store.getFileStore().getFillRate() + " chunksFillRate:" + store.getFileStore().getChunksFillRate());
	
			int payloadId = 1;
			final long startSize = Path.of(storagePath).toFile().length();
			final long start = System.currentTimeMillis();
			var time = System.currentTimeMillis() - start;
			try {
				System.out.println("start inserting flowers 1 000 000 (start storage:" + startSize / (1024 * 1024) + "Mo)");
				System.out.println(time / 1000 + ";0;0");
				for (int i = 0; i < 10; i++) {
					for (int j = 0; j < 100; j++) {
						for (int k = 0; k < 1000; k++) {
							final String payload = uniquePayload + payloadId;
							map.put(payloadId, payload);
							payloadId++;
						}
					}
					time = System.currentTimeMillis() - start;
					System.out.println((System.currentTimeMillis() - start) / 1000 + ";" + map.size() + ";" + (Path.of(storagePath).toFile().length() - startSize) / 1024);
					//System.out.println(time / 1000 + "s size:" + kvStoreManager.count(FLOWERS) + " storage:" + (getDirectorySizeJava8(Path.of(storagePath)) - startSize) / (1024 * 1024) + "Mo");
				}
				for (int i = 0; i < 10; i++) {
					Thread.sleep(10000);
					time = System.currentTimeMillis() - start;
					System.out.println((System.currentTimeMillis() - start) / 1000 + ";" + map.size() + ";" + (Path.of(storagePath).toFile().length() - startSize) / 1024);
					System.out.println(" fillRate:" + store.getFileStore().getFillRate() + " chunksFillRate:" + store.getFileStore().getChunksFillRate());
					//System.out.println(time / 1000 + "s after sleep, size:" + kvStoreManager.count(FLOWERS) + " storage:" + (getDirectorySizeJava8(Path.of(storagePath)) - startSize) / (1024 * 1024) + "Mo");
				}
				//wait remove all
				map.clear();
				do {
					final int countPayloads = map.size();
					final long storage = Path.of(storagePath).toFile().length() - startSize;
					System.out.println((System.currentTimeMillis() - start) / 1000 + ";" + countPayloads + ";" + storage / 1024);
					System.out.println(" fillRate:" + store.getFileStore().getFillRate() + " chunksFillRate:" + store.getFileStore().getChunksFillRate());
					if (countPayloads == 0 && storage < 10 * 1024 * 1024) {
						break;
					}
					store.compactFile(5000);
					Thread.sleep(5000);
				} while (true);
				Thread.sleep(10000);
			} catch (final InterruptedException e) {
				e.printStackTrace();
			} finally {
				System.out.println((System.currentTimeMillis() - start) / 1000 + ";" + map.size() + ";" + (Path.of(storagePath).toFile().length() - startSize) / 1024);
			}
	
		} finally {
			store.close();
		}
	}*/

}
