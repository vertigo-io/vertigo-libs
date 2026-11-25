/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.vega.webservice;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

import org.apache.http.HttpStatus;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.restassured.RestAssured;
import io.restassured.filter.session.SessionFilter;
import io.restassured.path.json.JsonPath;
import io.restassured.specification.RequestSpecification;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.vega.webservice.data.MyNodeConfig;

/**
 * Tests of the thread dump route (feature webservices.threadDump).
 */
public final class ThreadDumpWebServicesTest {

	private static final String ROUTE = "/dev/threadDump";
	private static AutoCloseableNode node;
	private final SessionFilter loggedSessionFilter = new SessionFilter();

	static {
		//RestAsssured init
		RestAssured.port = MyNodeConfig.WS_PORT;
	}

	@BeforeAll
	public static void setUp() {
		node = new AutoCloseableNode(MyNodeConfig.config(true));
	}

	@BeforeEach
	public void preTestLogin() {
		RestAssured.given()
				.filter(loggedSessionFilter)
				.get("/test/login");
	}

	@AfterAll
	public static void tearDown() {
		if (node != null) {
			node.close();
		}
	}

	@Test
	public void testJson() {
		final JsonPath json = logged()
				.queryParam("format", "json")
				.queryParam("sampleMs", 100)
				.get(ROUTE)
				.then().statusCode(HttpStatus.SC_OK).contentType("application/json")
				.extract().jsonPath();
		Assertions.assertTrue(json.getLong("sampleMs") >= 100);
		Assertions.assertEquals(Runtime.getRuntime().availableProcessors(), json.getInt("cpu.availableProcessors"));
		Assertions.assertNotNull(json.get("cpu.threadsCpuMs"));
		final List<String> names = json.getList("threads.name");
		Assertions.assertTrue(names.contains("main"), "the test thread is listed");
		Assertions.assertNotNull(json.get("threads.find { it.name == 'main' }.cpuDeltaMs"), "the CPU of the test thread is measured");
		Assertions.assertNotNull(json.get("threads.find { it.name == 'main' }.cpuCorePercent"));
		Assertions.assertTrue(json.getInt("threadsSummary.count") > 0);
		Assertions.assertTrue(json.getLong("memory.heapUsedMb") >= 0);
		Assertions.assertFalse(json.getList("gc").isEmpty());
		Assertions.assertEquals(ProcessHandle.current().pid(), json.getLong("runtime.pid"));
	}

	@Test
	public void testWithoutSample() {
		final JsonPath json = logged()
				.queryParam("format", "json")
				.queryParam("sampleMs", 0)
				.get(ROUTE)
				.then().statusCode(HttpStatus.SC_OK)
				.extract().jsonPath();
		Assertions.assertEquals(0, json.getLong("sampleMs"));
		Assertions.assertNull(json.get("cpu.threadsCpuMs"));
		Assertions.assertTrue(json.getList("threads.cpuDeltaMs").stream().allMatch(cpuDelta -> cpuDelta == null));
		//bounded
		Assertions.assertEquals(0, logged()
				.queryParam("format", "json")
				.queryParam("sampleMs", -5)
				.get(ROUTE)
				.then().statusCode(HttpStatus.SC_OK)
				.extract().jsonPath().getLong("sampleMs"));
	}

	@Test
	public void testMaxDepth() {
		final JsonPath json = logged()
				.queryParam("format", "json")
				.queryParam("sampleMs", 0)
				.queryParam("maxDepth", 2)
				.get(ROUTE)
				.then().statusCode(HttpStatus.SC_OK)
				.extract().jsonPath();
		Assertions.assertEquals(2, json.getInt("maxDepth"));
		final List<List<String>> stackTraces = json.getList("threads.stackTrace");
		Assertions.assertTrue(stackTraces.stream().allMatch(stackTrace -> stackTrace.size() <= 2));
		//bounded
		Assertions.assertEquals(1000, logged()
				.queryParam("format", "json")
				.queryParam("sampleMs", 0)
				.queryParam("maxDepth", 99999)
				.get(ROUTE)
				.then().statusCode(HttpStatus.SC_OK)
				.extract().jsonPath().getInt("maxDepth"));
	}

	@Test
	public void testHtmlPage() {
		final String html = logged()
				.get(ROUTE)
				.then().statusCode(HttpStatus.SC_OK).contentType("text/html")
				.extract().asString();
		Assertions.assertTrue(html.contains("<script>"));
		Assertions.assertTrue(html.contains("routeUrl('json')"), "the page calls the route in json");
		Assertions.assertFalse(html.contains("<script src"), "no external script");
		Assertions.assertFalse(html.contains("http://") || html.contains("https://"), "no external resource");
		Assertions.assertFalse(html.contains("onclick"), "no inline handler (blocked by a CSP)");
	}

	@Test
	public void testText() {
		final String text = logged()
				.queryParam("format", "text")
				.queryParam("sampleMs", 0)
				.get(ROUTE)
				.then().statusCode(HttpStatus.SC_OK).contentType("text/plain")
				.extract().asString();
		Assertions.assertTrue(text.contains("Full thread dump "));
		Assertions.assertTrue(text.contains("\"main\" #"));
		Assertions.assertTrue(text.contains("   java.lang.Thread.State: "));
		Assertions.assertTrue(text.contains("\tat "));
	}

	@Test
	public void testUnknownFormat() {
		logged()
				.queryParam("format", "xml")
				.get(ROUTE)
				.then().statusCode(HttpStatus.SC_BAD_REQUEST);
	}

	@Test
	public void testNotAnonymous() {
		RestAssured.given()
				.queryParam("format", "json")
				.get(ROUTE)
				.then().statusCode(HttpStatus.SC_UNAUTHORIZED);
	}

	@Test
	public void testDeadlock() throws InterruptedException {
		final ReentrantLock lockA = new ReentrantLock();
		final ReentrantLock lockB = new ReentrantLock();
		final CountDownLatch bothLocked = new CountDownLatch(2);
		final Thread thread1 = startDeadlockThread("deadlock-test-1", lockA, lockB, bothLocked);
		final Thread thread2 = startDeadlockThread("deadlock-test-2", lockB, lockA, bothLocked);
		try {
			waitParked(thread1, lockB);
			waitParked(thread2, lockA);
			//-----
			final JsonPath json = logged()
					.queryParam("format", "json")
					.queryParam("sampleMs", 0)
					.queryParam("synchronizers", "true")
					.get(ROUTE)
					.then().statusCode(HttpStatus.SC_OK)
					.extract().jsonPath();
			final List<Long> deadlocked = json.getList("deadlockedThreadIds", Long.class);
			Assertions.assertTrue(deadlocked.contains(thread1.threadId()));
			Assertions.assertTrue(deadlocked.contains(thread2.threadId()));
			Assertions.assertEquals("WAITING", json.getString("threads.find { it.name == 'deadlock-test-1' }.state"));
			Assertions.assertEquals("deadlock-test-2", json.getString("threads.find { it.name == 'deadlock-test-1' }.lockOwnerName"));
			final List<String> lockedSynchronizers = json.getList("threads.find { it.name == 'deadlock-test-1' }.lockedSynchronizers");
			Assertions.assertTrue(lockedSynchronizers.stream().anyMatch(synchronizer -> synchronizer.contains("ReentrantLock")), "synchronizers=true lists the held locks");
			//-----
			final String text = logged()
					.queryParam("format", "text")
					.queryParam("sampleMs", 0)
					.get(ROUTE)
					.then().statusCode(HttpStatus.SC_OK)
					.extract().asString();
			Assertions.assertTrue(text.contains("Found one Java-level deadlock:"));
			Assertions.assertTrue(text.contains("- parking to wait for  <"));
			Assertions.assertTrue(text.contains("owned by \"deadlock-test-2\""));
		} finally {
			thread1.interrupt();
			thread2.interrupt();
			thread1.join(5000);
			thread2.join(5000);
		}
		Assertions.assertFalse(thread1.isAlive() || thread2.isAlive(), "the deadlocked threads are released");
	}

	@Test
	public void testOneDumpAtATime() {
		final CompletableFuture<Integer> longDump = CompletableFuture.supplyAsync(() -> logged()
				.queryParam("format", "json")
				.queryParam("sampleMs", 3000)
				.get(ROUTE)
				.statusCode());
		boolean tooManyRequests = false;
		while (!tooManyRequests && !longDump.isDone()) {
			tooManyRequests = logged()
					.queryParam("format", "json")
					.queryParam("sampleMs", 0)
					.get(ROUTE)
					.statusCode() == 429;
			sleep(100);
		}
		Assertions.assertTrue(tooManyRequests, "a dump during another one gets a 429");
		Assertions.assertEquals(HttpStatus.SC_OK, longDump.join());
	}

	private RequestSpecification logged() {
		return RestAssured.given().filter(loggedSessionFilter);
	}

	private static Thread startDeadlockThread(final String name, final ReentrantLock first, final ReentrantLock second, final CountDownLatch bothLocked) {
		final Thread thread = new Thread(() -> {
			try {
				first.lockInterruptibly();
				try {
					bothLocked.countDown();
					bothLocked.await(5, TimeUnit.SECONDS);
					second.lockInterruptibly(); //deadlock, until interrupted
					second.unlock();
				} finally {
					first.unlock();
				}
			} catch (final InterruptedException e) {
				Thread.currentThread().interrupt(); //released by the end of the test
			}
		}, name);
		thread.setDaemon(true);
		thread.start();
		return thread;
	}

	private static void waitParked(final Thread thread, final ReentrantLock awaitedLock) {
		for (int i = 0; i < 100 && !(thread.getState() == Thread.State.WAITING && awaitedLock.hasQueuedThread(thread)); i++) {
			sleep(50);
		}
		Assertions.assertTrue(awaitedLock.hasQueuedThread(thread), thread.getName() + " waits for the lock");
	}

	private static void sleep(final long millis) {
		try {
			Thread.sleep(millis);
		} catch (final InterruptedException e) {
			Thread.currentThread().interrupt();
		}
	}
}
