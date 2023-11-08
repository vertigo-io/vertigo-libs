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
package io.vertigo.datastore.kvstore;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Stream;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.datastore.kvstore.data.Flower;

/**
 * @author pchretien
 */
public abstract class AbstractKVStoreManagerTest {
	protected static final String COLLECTION = "MyDB:flowers";
	@Inject
	protected KVStoreManager kvStoreManager;
	@Inject
	protected VTransactionManager transactionManager;

	private AutoCloseableNode node;

	protected static final KVCollection FLOWERS = new KVCollection("flowers");
	protected static final int TTL = 10;
	protected final String storagePath = System.getProperty("user.home") + "/datastore-tmp";
	//protected final String storagePath = "d:\\datastore-tmp";

	@BeforeEach
	public final void setUp() throws Exception {
		node = new AutoCloseableNode(buildNodeConfig());
		purgeDirectory(new File(storagePath));
		DIInjector.injectMembers(this, node.getComponentSpace());
		//---
		doSetUp();
	}

	private void purgeDirectory(final File dir) {
		dir.mkdirs();
		for (final File file : dir.listFiles()) {
			if (file.isDirectory()) {
				purgeDirectory(file);
			}
			file.delete();
		}
	}

	protected void doSetUp() throws Exception {
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			kvStoreManager.clear(FLOWERS);
		}
	}

	@AfterEach
	public final void tearDown() throws Exception {
		if (node != null) {
			try {
				doTearDown();
			} finally {
				node.close();
			}
		}

	}

	protected void doTearDown() throws Exception {
		//
	}

	protected abstract NodeConfig buildNodeConfig();

	protected static Flower buildFlower(final String name, final double price) {
		return new Flower()
				.setName(name)
				.setPrice(price);
	}

	@Test
	public void testCount() {
		final Flower tulip1 = buildFlower("tulip", 100);
		final Flower tulip2 = buildFlower("tulip", 110);
		final Flower tulip3 = buildFlower("tulip", 120);
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final int nbFlowers = kvStoreManager.count(FLOWERS);
			Assertions.assertEquals(0, nbFlowers);
			kvStoreManager.put(FLOWERS, "1", tulip1);

			kvStoreManager.put(FLOWERS, "2", tulip2);

			kvStoreManager.put(FLOWERS, "3", tulip3);
			transaction.commit();
		}

		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			//count after 3 inserts
			final int nbFlowers2 = kvStoreManager.count(FLOWERS);
			Assertions.assertEquals(3, nbFlowers2);
		}
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			//count after 1 more insert of same value
			kvStoreManager.put(FLOWERS, "4", tulip3);
			transaction.commit();
		}
		final int nbFlowers3 = kvStoreManager.count(FLOWERS);
		Assertions.assertEquals(4, nbFlowers3);

		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			//count after 1 insert of same key : update
			kvStoreManager.put(FLOWERS, "3", tulip3);
			transaction.commit();
		}
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final int nbFlowers4 = kvStoreManager.count(FLOWERS);
			Assertions.assertEquals(4, nbFlowers4);
		}
	}

	@Test
	public void testFind() {
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final Optional<Flower> foundFlower = kvStoreManager.find(FLOWERS, "1", Flower.class);
			Assertions.assertEquals(Optional.empty(), foundFlower);
			final Flower tulip = buildFlower("tulip", 100);

			kvStoreManager.put(FLOWERS, "1", tulip);
			transaction.commit();
		}
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final Optional<Flower> foundFlower2 = kvStoreManager.find(FLOWERS, "1", Flower.class);
			Assertions.assertTrue(foundFlower2.isPresent());
			Assertions.assertEquals("tulip", foundFlower2.get().getName());
			Assertions.assertEquals(100d, foundFlower2.get().getPrice().doubleValue()); //"Price must be excatly 100",
		}
	}

	@Test
	public void testRemove() {
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final Optional<Flower> flower = kvStoreManager.find(FLOWERS, "10", Flower.class);
			Assertions.assertFalse(flower.isPresent(), "There is already a flower id 10");

			kvStoreManager.put(FLOWERS, "10", buildFlower("daisy", 60));
			kvStoreManager.put(FLOWERS, "11", buildFlower("tulip", 100));
			transaction.commit();
		}

		Optional<Flower> flower1;
		Optional<Flower> flower2;
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			flower1 = kvStoreManager.find(FLOWERS, "10", Flower.class);
			flower2 = kvStoreManager.find(FLOWERS, "11", Flower.class);
			Assertions.assertTrue(flower1.isPresent(), "Flower id 10 not found");
			Assertions.assertTrue(flower2.isPresent(), "Flower id 11 not found");
		}

		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final Optional<Flower> flower = kvStoreManager.find(FLOWERS, "10", Flower.class);
			Assertions.assertTrue(flower.isPresent(), "Flower id 10 not found");

			kvStoreManager.remove(FLOWERS, "10");
			transaction.commit();
		}

		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			flower1 = kvStoreManager.find(FLOWERS, "10", Flower.class);
			flower2 = kvStoreManager.find(FLOWERS, "11", Flower.class);
			Assertions.assertFalse(flower1.isPresent(), "Remove flower id 10 failed");
			Assertions.assertTrue(flower2.isPresent(), "Flower id 11 not found");
		}
	}

	@Test
	public void testInsertMass() {

		for (int j = 0; j < 10; j++) {
			try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
				for (int i = 0; i < 100; i++) {
					kvStoreManager.put(FLOWERS, String.valueOf(j * 1000 + i), buildFlower("Test", 60));
				}
				transaction.commit();
			}
		}
	}

	@Disabled
	@Test
	public void testInsertMassConcurrent() throws InterruptedException {
		final Runnable task = new Runnable() {
			@Override
			public void run() {
				for (int j = 0; j < 50 && !Thread.currentThread().isInterrupted(); j++) {
					try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
						for (int i = 0; i < 50 && !Thread.currentThread().isInterrupted(); i++) {
							kvStoreManager.put(FLOWERS, String.valueOf(j * 1000 + i), buildFlower("Test", 60));
						}
						transaction.commit();
						try {
							Thread.sleep(100);
						} catch (final InterruptedException e) {
							break;
						}
					}
				}
			}
		};
		final Thread[] threads = new Thread[10];
		for (int i = 0; i < threads.length; i++) {
			threads[i] = new Thread(task);
			threads[i].start();
		}

		System.out.println("Insert " + 50 * 50 * threads.length + " flowers with " + threads.length + " threads");

		for (final Thread thread : threads) {
			thread.join();
		}
		System.out.println("Finished");

	}

	@Test
	public void testFindAll() {
		final List<Flower> flowers = List.of(
				buildFlower("daisy", 60),
				buildFlower("tulip", 100),
				buildFlower("rose", 110),
				buildFlower("lily", 120),
				buildFlower("orchid", 200));

		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final List<Flower> foundFlowers = kvStoreManager.findAll(FLOWERS, 0, null, Flower.class);
			Assertions.assertTrue(foundFlowers.isEmpty());

			int i = 0;
			for (final Flower flower : flowers) {
				final String id = "" + i++;
				kvStoreManager.put(FLOWERS, id, flower);
			}
			transaction.commit();
		}

		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final List<Flower> foundFlowers2 = kvStoreManager.findAll(FLOWERS, 0, 1000, Flower.class);
			Assertions.assertEquals(flowers.size(), foundFlowers2.size());
		}
	}

	@Test
	public void testRemoveFail() {
		Assertions.assertThrows(RuntimeException.class, () -> {
			try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
				kvStoreManager.remove(FLOWERS, "1");
			}
		});
	}

	@Test
	public void testRollback() {
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final Flower tulip = buildFlower("tulip", 100);
			kvStoreManager.put(FLOWERS, "1", tulip);
			transaction.commit();
		}
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final Optional<Flower> flower1 = kvStoreManager.find(FLOWERS, "1", Flower.class);
			Assertions.assertTrue(flower1.isPresent(), "Flower id 1 not found");

			final Optional<Flower> flower2 = kvStoreManager.find(FLOWERS, "2", Flower.class);
			Assertions.assertFalse(flower2.isPresent(), "There is already a flower id 2");
		}
		try {
			try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
				final Flower tulip = buildFlower("rose", 100);
				kvStoreManager.put(FLOWERS, "2", tulip);
				throw new VSystemException("Error");
			}
		} catch (final RuntimeException e) {
			//on doit passer par là
		}
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final Optional<Flower> flower2bis = kvStoreManager.find(FLOWERS, "2", Flower.class);
			Assertions.assertFalse(flower2bis.isPresent(), "Rollback flower id 2 failed");
		}
	}

	private static String UNIQUE_PAYLOAD = "V1ZkS2FscEhWbTFhTTBwdllWZHdjbUpITVhWaU0wSjRZMjVPTUdSWVdqTmxTR3cyVVZWS1JGSkZWa2RTTUdoS1UydDBUVlJWTlZCVlJrWlRWVEZTVmxac1pGbFhWbTkzVFZSSmVrNUVWVEpPZW1jMVYyeHNXVll4V2xaV1JrNVRWVlU1VUZSck1VMVRNSEJLVTBWa1IxSlZVa1JSYTBZMlpWaG9NMlJ1VmpCak0wcDRZakk1ZFdKWGVISmhiV3h2V2pKYWJGcEhUbWxaVjBacFdUSlNiRnB0WkhsaFIyeHhZVEo0ZEdKdE9YZGpXRXA2WkVoV01tUXphRFZsYTBaRFVUQlNSbEpyWkVsVFZYQk1WRVV4VDFReFFsSlZiRTVWVmxaYVdGZEdiR0ZOUkVWNVRYcFJNVTVxWXpSUFZuQmFWMFprVjFaV1VsUlZiRVpRVkRBMVRsUkZkRXRUVldoSVVtdFdSVkV3U2tKbGJtdzBaRE5hTVdSSVRubGpWemwyWW0weGMyRXljSEJoUjJSdFdsZFNhbGx0UlV0WFZtUkxZV3h3U0ZadE1XRk5NSEIyV1Zaa2QyTnRTa2hOV0ZacFRUQktORmt5TlU5TlIxSlpWMnBPYkZOSGR6SlZWbFpMVWtaS1JsWnJaRk5OUjJoTFZUSjBNRlJXVWxaT1ZrSldVbXRhVkZaVVJsTldiRnB6V2tac1dGWnRPVE5VVmxKS1pXczFSVlpVU2s5bGJXTXhWako0YzFkV1dYaFhiRnBYVW1zMVZGWldWVFZWUmxKeVRWVXhWRTFJUWt0Vk1GWnJVakZLVmxWclVsSmhNRmt5V2xab2IwMHlVblZXYWtKcVRUQndORmxxU1RWa1YwcFlaVWhLYUdKWGVIWlhha3BoWWtad1NGUnRiRnBXTUZwd1YxUktVMkpHY0hSYVNHeG9Vako0ZUZsVVNqUmtSMHAwVDFoa2FsZEZjRFphUldoWFRXMVJlbUZFVm14aE1GcEVWVlJDVTFKc1NuSmFSV3hVVmxoQ1RWWkZWWGhVTVZGNFVXeEtWbUpGTlZaV2JGcGhWMFprUjJKSFJrNVNSVlkxVkZod1VrMVZOWEZaZWxKUVZtNUNZVll3V210V01WcFhWV3hTVm1KRldsRldSRUV4Vkd4U1JtUkZkRlJXVjJoSlZXMTBWMUpXUlhkVGEwcHNZbTEzTUZwRVRtRk5WMUpKVkc1c2FsWjZiREpaYlRCNFl6SkZlV05JUW1oU01sSjBWMnhrVTJGc2JIUlNWREE5";

	@Disabled
	@Test
	public void testPurgeTooOldElements() {
		final int[] rollCount = new int[TTL];
		int lastRollIndex = 0;
		final long start = System.currentTimeMillis();
		int flowerId = 1;
		final int startCountFlowers = kvStoreManager.count(FLOWERS);
		Assertions.assertEquals(0, startCountFlowers);
		System.out.println("start inserting flowers 100 per TX, and 100 000 per loop for " + TTL * 2 + "s, TTL:" + TTL);
		int i = 0;
		while ((System.currentTimeMillis() - start) / 1000 < TTL + TTL) {
			i++;
			//try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final int countFlowers = kvStoreManager.count(FLOWERS);
			System.out.println("flowers count " + countFlowers);
			//}
			//Assertions.assertEquals(0, nbFlowers);
			//put a flower a t+0s (expire a T+10s)
			final long startLoop = System.currentTimeMillis();
			for (int j = 0; j < 1000; j++) {
				try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
					for (int k = 0; k < 100; k++) {
						final Flower tulip1 = buildFlower(UNIQUE_PAYLOAD + flowerId, 100 + k);
						kvStoreManager.put(FLOWERS, String.valueOf(flowerId++), tulip1);
					}
					transaction.commit();
					final int rollIndex = (int) ((System.currentTimeMillis() - start) / 1000);
					if (lastRollIndex != rollIndex) {
						for (int c = lastRollIndex + 1; c < rollIndex; c++) {
							rollCount[c % TTL] = 0;
						}
						rollCount[rollIndex % TTL] = 100;
						lastRollIndex = rollIndex;
					} else {
						rollCount[rollIndex % TTL] += 100;
					}
				}
			}
			try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
				final var perS = 1000 * 100d / (System.currentTimeMillis() - startLoop) * 1000;
				final var searchFlower = kvStoreManager.find(FLOWERS, String.valueOf(flowerId - 10), Flower.class);
				final var time = System.currentTimeMillis() - start;
				System.out.println(time / 1000 + "; get " + searchFlower.isPresent() + " over " + kvStoreManager.count(FLOWERS) + " time:" + time / 1000 + "s , " + perS + " insert/s (" + getDirectorySizeJava8(Path.of(storagePath)) / (1024 * 1024) + "Mo)");
				int rollCountTmp = 0;
				for (int c = 0; c < TTL; c++) {
					rollCountTmp += rollCount[c];
				}
				System.out.println(time / 1000 + "; <ttl ~" + TTL * i * 100000 / (time / 1000d) + "  =" + rollCountTmp + " total:" + flowerId);
				if (perS > 10000) {
					try {
						Thread.sleep((int) (perS / 10d));//limit at 10000/s or storage may be full
					} catch (final InterruptedException e) {
						Thread.currentThread().interrupt(); //si interrupt on relance
					}
				}
			}
			//
			sleep(1);
		}
		//wait remove all
		do {
			try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
				final int countFlowers = kvStoreManager.count(FLOWERS);
				final var time = System.currentTimeMillis() - start;
				System.out.println(time / 1000 + "; count " + countFlowers + "  (" + getDirectorySizeJava8(Path.of(storagePath)) / (1024 * 1024) + "Mo)");
				if (countFlowers == 0) {
					break;
				}
			}
			sleep(5);
		} while (true);

		try (
				VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final int finalSearchFlowers = kvStoreManager.findAll(FLOWERS, 0, 1000, Flower.class).size();
			//search always filter too old elements
			Assertions.assertEquals(0, finalSearchFlowers);

			final int finalCountFlowers = kvStoreManager.count(FLOWERS);
			//count needs daemon
			Assertions.assertEquals(0, finalCountFlowers);
		}

	}

	@Disabled
	@Test
	public void testDbSize() {

		int flowerId = 1;
		final int startCountFlowers = kvStoreManager.count(FLOWERS);
		Assertions.assertEquals(0, startCountFlowers);
		final long startSize = getDirectorySizeJava8(Path.of(storagePath));

		final long start = System.currentTimeMillis();
		final SortedMap<Long, AtomicInteger> mapPutDuration = new TreeMap<>();
		var time = System.currentTimeMillis() - start;
		try {
			System.out.println("start inserting flowers 1 000 000 (start storage:" + startSize / (1024 * 1024) + "Mo)");
			System.out.println(time / 1000 + ";0;0");
			for (int i = 0; i < 10; i++) {
				for (int j = 0; j < 100; j++) {
					try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
						for (int k = 0; k < 1000; k++) {
							final Flower tulip1 = buildFlower(UNIQUE_PAYLOAD + flowerId, 100 + k);
							final var putDurationTime = System.currentTimeMillis();

							kvStoreManager.put(FLOWERS, String.valueOf(flowerId++), tulip1);

							final var putDuration = System.currentTimeMillis() - putDurationTime;
							if (putDuration > 1) {
								mapPutDuration.putIfAbsent(putDuration, new AtomicInteger(0));
								mapPutDuration.get(putDuration).incrementAndGet();
							}
						}
						transaction.commit();
					}
				}
				time = System.currentTimeMillis() - start;
				System.out.println((System.currentTimeMillis() - start) / 1000 + ";" + kvStoreManager.count(FLOWERS) + ";" + (getDirectorySizeJava8(Path.of(storagePath)) - startSize) / 1024);
				//System.out.println(time / 1000 + "s size:" + kvStoreManager.count(FLOWERS) + " storage:" + (getDirectorySizeJava8(Path.of(storagePath)) - startSize) / (1024 * 1024) + "Mo");
			}
			for (int i = 0; i < 10; i++) {
				sleep(10);
				time = System.currentTimeMillis() - start;
				System.out.println((System.currentTimeMillis() - start) / 1000 + ";" + kvStoreManager.count(FLOWERS) + ";" + (getDirectorySizeJava8(Path.of(storagePath)) - startSize) / 1024);
				//System.out.println(time / 1000 + "s after sleep, size:" + kvStoreManager.count(FLOWERS) + " storage:" + (getDirectorySizeJava8(Path.of(storagePath)) - startSize) / (1024 * 1024) + "Mo");
			}
			//wait remove all
			System.out.println((System.currentTimeMillis() - start) / 1000 + "; CLEAR ALL");
			try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
				kvStoreManager.clear(FLOWERS);
				transaction.commit();
			}
			for (int i = 0; i < 10; i++) {
				try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
					final int countFlowers = kvStoreManager.count(FLOWERS);
					final long storage = getDirectorySizeJava8(Path.of(storagePath)) - startSize;
					//System.out.println("size:" + countFlowers + " storage:" + storage / (1024 * 1024) + "Mo ("+()+"") per item");
					System.out.println((System.currentTimeMillis() - start) / 1000 + ";" + countFlowers + ";" + storage / 1024);
					if (countFlowers == 0 && storage < 20 * 1024 * 1024) {
						break;
					}
				}
				sleep(6);
			}
			System.out.println((System.currentTimeMillis() - start) / 1000 + "; FINISH FLAT STEP, RE-INSERT");
			final long stepSize = getDirectorySizeJava8(Path.of(storagePath));

			for (int i = 0; i < 10; i++) {
				for (int j = 0; j < 100; j++) {
					try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
						for (int k = 0; k < 1000; k++) {
							final Flower tulip1 = buildFlower(UNIQUE_PAYLOAD + flowerId, 100 + k);
							final var putDurationTime = System.currentTimeMillis();

							kvStoreManager.put(FLOWERS, String.valueOf(flowerId++), tulip1);

							final var putDuration = System.currentTimeMillis() - putDurationTime;
							if (putDuration > 1) {
								mapPutDuration.putIfAbsent(putDuration, new AtomicInteger(0));
								mapPutDuration.get(putDuration).incrementAndGet();
							}
						}
						transaction.commit();
					}
				}
				time = System.currentTimeMillis() - start;
				System.out.println((System.currentTimeMillis() - start) / 1000 + ";" + kvStoreManager.count(FLOWERS) + ";" + (getDirectorySizeJava8(Path.of(storagePath)) - startSize) / 1024);
				//System.out.println(time / 1000 + "s size:" + kvStoreManager.count(FLOWERS) + " storage:" + (getDirectorySizeJava8(Path.of(storagePath)) - startSize) / (1024 * 1024) + "Mo");
			}

			//wait remove all
			System.out.println((System.currentTimeMillis() - start) / 1000 + "; CLEAR ALL");
			try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
				kvStoreManager.clear(FLOWERS);
				transaction.commit();
			}
			do {
				try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
					final int countFlowers = kvStoreManager.count(FLOWERS);
					final long storage = getDirectorySizeJava8(Path.of(storagePath)) - startSize;
					//System.out.println("size:" + countFlowers + " storage:" + storage / (1024 * 1024) + "Mo ("+()+"") per item");
					System.out.println((System.currentTimeMillis() - start) / 1000 + ";" + countFlowers + ";" + storage / 1024);
					if (countFlowers == 0 && storage - stepSize < 10 * 1024 * 1024) {
						break;
					}
				}
				sleep(1);
			} while (true);
			sleep(10);
		} finally {
			System.out.println((System.currentTimeMillis() - start) / 1000 + ";" + kvStoreManager.count(FLOWERS) + ";" + (getDirectorySizeJava8(Path.of(storagePath)) - startSize) / 1024);
			System.out.println("putDurationOccurences : " + mapPutDuration);
		}

	}

	protected boolean supportFindAll() {
		return true;
	}

	@Test
	public void testTimeToLive() {
		//NEED set TTL to 10 !!
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final int nbFlowers = kvStoreManager.count(FLOWERS);
			Assertions.assertEquals(0, nbFlowers);
			//put a flower a t+0s (expire a T+10s)
			final Flower tulip1 = buildFlower("tulip", 100);
			kvStoreManager.put(FLOWERS, "1", tulip1);
			sleep(2);

			//put a flower a t+2s (expire a T+12s)
			final Flower tulip2 = buildFlower("tulip", 110);
			kvStoreManager.put(FLOWERS, "2", tulip2);
			sleep(2);

			//put a flower a t+4s (expire a T+14s)
			final Flower tulip3 = buildFlower("tulip", 120);
			kvStoreManager.put(FLOWERS, "3", tulip3);
			sleep(2);
			transaction.commit();
		}
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			//count after 3 inserts and T+6s
			final long nbFlowers2 = countFlowersFrom("1", "2", "3");
			Assertions.assertEquals(3, nbFlowers2);

			sleep(3);

			//find unexpired element
			final Optional<Flower> tulip1Load = kvStoreManager.find(FLOWERS, "1", Flower.class);
			Assertions.assertTrue(tulip1Load.isPresent());

			//count after 3 inserts and T+9s
			final long nbFlowers3 = countFlowersFrom("1", "2", "3");
			Assertions.assertEquals(3, nbFlowers3);

			sleep(2);

			//count after 3 inserts and T+11s
			final long nbFlowers4 = countFlowersFrom("1", "2", "3");
			Assertions.assertEquals(2, nbFlowers4);
			sleep(2);

			//count after 3 inserts and T+13s
			final long nbFlowers5 = countFlowersFrom("1", "2", "3");
			Assertions.assertEquals(1, nbFlowers5);
			sleep(2);

			//count after 3 inserts and 15s
			final long nbFlowers6 = countFlowersFrom("1", "2", "3");
			Assertions.assertEquals(0, nbFlowers6);

			//find expired element
			final Optional<Flower> tulip1Reload = kvStoreManager.find(FLOWERS, "1", Flower.class);
			Assertions.assertFalse(tulip1Reload.isPresent());
		}
	}

	private long countFlowersFrom(final String... ids) {
		long nbFlowers = 0;
		if (supportFindAll()) {
			nbFlowers = kvStoreManager.findAll(FLOWERS, 0, 1000, Flower.class).size(); //can't use count as it doesnt detect too old element (needs daemon)
		} else {
			for (final String id : ids) {
				nbFlowers += kvStoreManager.find(FLOWERS, id, Flower.class).isPresent() ? 1 : 0;
			}
		}
		return nbFlowers;
	}

	private void sleep(final int timeSecond) {
		try {
			Thread.sleep(timeSecond * 1000);
		} catch (final InterruptedException e) {
			Thread.currentThread().interrupt(); //si interrupt on relance
		}
	}

	protected static long getDirectorySizeJava8(final Path path) {
		long size = 0;
		// need close Files.walk
		try (Stream<Path> walk = Files.walk(path)) {
			size = walk
					//.peek(System.out::println) // debug
					.filter(Files::isRegularFile)
					.mapToLong(p -> {
						// ugly, can pretty it with an extract method
						try {
							return Files.size(p);
						} catch (final IOException e) {
							System.out.printf("Failed to get size of %s%n%s", p, e);
							return 0L;
						}
					})
					.sum();
		} catch (final IOException e) {
			System.out.printf("IO errors %s", e);
		}
		return size;
	}

}
