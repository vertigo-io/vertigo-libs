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
package io.vertigo.vega.impl.webservice.debug;

import java.io.IOException;
import java.io.OutputStream;
import java.lang.management.ClassLoadingMXBean;
import java.lang.management.GarbageCollectorMXBean;
import java.lang.management.LockInfo;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;
import java.lang.management.RuntimeMXBean;
import java.lang.management.ThreadInfo;
import java.lang.management.ThreadMXBean;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;
import java.util.concurrent.locks.ReentrantLock;

import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import io.vertigo.account.authorization.VSecurityException;
import io.vertigo.account.security.UserSession;
import io.vertigo.account.security.VSecurityManager;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.vega.engines.webservice.json.JsonEngine;
import io.vertigo.vega.impl.servlet.filter.ContentSecurityPolicyFilter;
import io.vertigo.vega.webservice.WebServices;
import io.vertigo.vega.webservice.exception.TooManyRequestException;
import io.vertigo.vega.webservice.stereotype.GET;
import io.vertigo.vega.webservice.stereotype.QueryParam;

/**
 * Thread dump of the JVM, for development and debugging : the threads with the CPU they used over a sample window,
 * their stack, the lock they wait for and its owner, the deadlocks, and a summary of the memory, the GC and the JVM.
 * <p>
 * Route GET /dev/threadDump, params (all optional) :
 * <ul>
 * <li>format : html (default, a self-contained page that calls this route in json), json, or text (a jstack-like text,
 * readable by the thread dump analyzers)</li>
 * <li>sampleMs : window of the CPU measure, 500 ms by default, 5000 ms at most, 0 for no measure</li>
 * <li>maxDepth : depth of the stacks, 100 by default, 1000 at most</li>
 * <li>synchronizers=true : also the locked java.util.concurrent synchronizers (can be slow on a big JVM)</li>
 * </ul>
 * One dump at a time : a call while another one runs gets a 429.
 * Virtual threads are not listed : the JVM management API only sees the platform threads.
 * <p>
 * Warning : the stacks and the names of the threads expose internal information of the application.
 * The route requires an authenticated user session (checked here, whatever the webservices security feature) ;
 * its feature is meant for development only.
 *
 * @author npiedeloup
 */
public final class ThreadDumpWebServices implements WebServices {

	private static final int DEFAULT_SAMPLE_MS = 500;
	private static final int MAX_SAMPLE_MS = 5000;
	private static final int DEFAULT_MAX_DEPTH = 100;
	private static final int MAX_MAX_DEPTH = 1000;
	private static final long MB = 1024L * 1024L;
	private static final double NANOS_BY_MS = 1_000_000d;
	private static final ReentrantLock DUMP_LOCK = new ReentrantLock();

	@Inject
	private VSecurityManager securityManager;
	@Inject
	private JsonEngine jsonEngine;

	/**
	 * Thread dump.
	 * @param formatOpt html (default), json or text
	 * @param sampleMsOpt window of the CPU measure in ms (0 for no measure)
	 * @param maxDepthOpt depth of the stacks
	 * @param synchronizersOpt true to list the locked java.util.concurrent synchronizers
	 * @param request the http request
	 * @param response the http response
	 * @throws IOException if the response can't be written
	 */
	@GET("/dev/threadDump")
	public void threadDump(
			@QueryParam("format") final Optional<String> formatOpt,
			@QueryParam("sampleMs") final Optional<Integer> sampleMsOpt,
			@QueryParam("maxDepth") final Optional<Integer> maxDepthOpt,
			@QueryParam("synchronizers") final Optional<String> synchronizersOpt,
			final HttpServletRequest request,
			final HttpServletResponse response) throws IOException {
		final Optional<UserSession> userSessionOpt = securityManager.getCurrentUserSession();
		if (userSessionOpt.isEmpty() || !userSessionOpt.get().isAuthenticated()) {
			throw new VSecurityException(LocaleMessageText.of("User unauthentified"));
		}
		//-----
		final String format = formatOpt.orElse("html");
		if ("html".equals(format)) {
			final Object nonce = request.getAttribute(ContentSecurityPolicyFilter.NONCE_ATTRIBUTE_NAME);
			write(response, HttpServletResponse.SC_OK, "text/html", htmlPage(nonce instanceof String ? (String) nonce : null));
			return;
		}
		if (!"json".equals(format) && !"text".equals(format)) {
			write(response, HttpServletResponse.SC_BAD_REQUEST, "text/plain", "format must be html, json or text");
			return;
		}
		final int sampleMs = Math.max(0, Math.min(MAX_SAMPLE_MS, sampleMsOpt.orElse(DEFAULT_SAMPLE_MS)));
		final int maxDepth = Math.max(1, Math.min(MAX_MAX_DEPTH, maxDepthOpt.orElse(DEFAULT_MAX_DEPTH)));
		final boolean synchronizers = Boolean.parseBoolean(synchronizersOpt.orElse("false"));
		if (!DUMP_LOCK.tryLock()) {
			throw new TooManyRequestException("A thread dump is already running, retry in a few seconds");
		}
		try { //the lock also covers the serialization and the writing : they are the heavy part on a big JVM
			final ThreadDump threadDump = collect(sampleMs, maxDepth, synchronizers);
			if ("json".equals(format)) {
				write(response, HttpServletResponse.SC_OK, "application/json", jsonEngine.toJson(threadDump));
			} else {
				write(response, HttpServletResponse.SC_OK, "text/plain", toText(threadDump));
			}
		} finally {
			DUMP_LOCK.unlock();
		}
	}

	/** The thread dump. CPU values are null when not measured (sampleMs = 0 or CPU time not supported by the JVM). */
	private record ThreadDump(
			String timestamp,
			long sampleMs,
			int maxDepth,
			CpuSummary cpu,
			ThreadsSummary threadsSummary,
			List<Long> deadlockedThreadIds,
			List<ThreadEntry> threads,
			MemorySummary memory,
			List<GcEntry> gc,
			RuntimeSummary runtime,
			String note) {
	}

	/**
	 * CPU used over the sample window, in ms and in percent of all the cores.
	 * The process CPU minus the threads CPU is the CPU of the JVM itself (GC, JIT).
	 */
	private record CpuSummary(
			int availableProcessors,
			Long threadsCpuMs,
			Double threadsCpuPercent,
			Long processCpuMs,
			Double processCpuPercent) {
	}

	/** Thread counts. */
	private record ThreadsSummary(
			int count,
			int daemonCount,
			int peakCount,
			long totalStartedCount,
			Map<String, Integer> byState) {
	}

	/** A thread. cpuCorePercent is the percent of one core used over the sample window. */
	private record ThreadEntry(
			long id,
			String name,
			String state,
			boolean daemon,
			boolean inNative,
			Long cpuMs,
			Long cpuDeltaMs,
			Double cpuCorePercent,
			long blockedCount,
			long waitedCount,
			String lockName,
			Long lockOwnerId,
			String lockOwnerName,
			List<String> stackTrace,
			List<LockedMonitor> lockedMonitors,
			List<String> lockedSynchronizers) {
	}

	/** A monitor held by a thread, locked at this depth of its stack. */
	private record LockedMonitor(String lock, int stackDepth) {
	}

	/** Memory, in MB. */
	private record MemorySummary(
			long heapUsedMb,
			long heapCommittedMb,
			long heapMaxMb,
			long nonHeapUsedMb,
			long nonHeapCommittedMb,
			int loadedClassCount) {
	}

	/** A garbage collector : its counters since the start of the JVM, and over the sample window. */
	private record GcEntry(
			String name,
			long collectionCount,
			long collectionTimeMs,
			Long collectionCountDelta,
			Long collectionTimeDeltaMs) {
	}

	/** The JVM. */
	private record RuntimeSummary(
			long pid,
			String vmName,
			String vmVersion,
			String javaVersion,
			long uptimeMs) {
	}

	private static ThreadDump collect(final int sampleMs, final int maxDepth, final boolean synchronizers) {
		final ThreadMXBean threadBean = ManagementFactory.getThreadMXBean();
		final boolean cpuSupported = threadBean.isThreadCpuTimeSupported() && threadBean.isThreadCpuTimeEnabled();
		final boolean measured = sampleMs > 0;
		final Map<Long, Long> cpuBefore = measured && cpuSupported ? threadsCpuNanos(threadBean) : Map.of();
		final Optional<Long> processBefore = processCpuNanos();
		final Map<String, long[]> gcBefore = gcCounters();
		final long start = System.nanoTime();
		if (measured) {
			sleep(sampleMs);
		}
		//the end of the window is read before the dump : the dump itself is not measured
		final long elapsedNanos = System.nanoTime() - start;
		final Map<Long, Long> cpuAfter = cpuSupported ? threadsCpuNanos(threadBean) : Map.of();
		final Optional<Long> processAfter = processCpuNanos();
		final Map<String, long[]> gcAfter = gcCounters();
		final ThreadInfo[] threadInfos = threadBean.dumpAllThreads(
				threadBean.isObjectMonitorUsageSupported(),
				synchronizers && threadBean.isSynchronizerUsageSupported(),
				maxDepth);
		//-----
		final int processors = Runtime.getRuntime().availableProcessors();
		final long[] deadlocked = threadBean.findDeadlockedThreads();
		final List<ThreadEntry> threads = new ArrayList<>();
		final Map<String, Integer> byState = new TreeMap<>();
		long threadsCpuDeltaNanos = 0;
		for (final ThreadInfo threadInfo : threadInfos) {
			if (threadInfo == null) {
				continue; //the thread ended during the dump
			}
			final Long cpuAfterNanos = cpuAfter.get(threadInfo.getThreadId()); //null for a thread started after the window
			Long cpuDeltaNanos = null;
			if (measured && cpuAfterNanos != null) {
				//a thread started during the window : all its CPU is in the window
				cpuDeltaNanos = cpuAfterNanos - cpuBefore.getOrDefault(threadInfo.getThreadId(), 0L);
				threadsCpuDeltaNanos += cpuDeltaNanos;
			}
			threads.add(toThreadEntry(threadInfo, cpuAfterNanos, cpuDeltaNanos, elapsedNanos));
			byState.merge(threadInfo.getThreadState().name(), 1, Integer::sum);
		}
		threads.sort(Comparator.comparing((final ThreadEntry thread) -> thread.cpuDeltaMs() == null ? 0L : thread.cpuDeltaMs()).reversed()
				.thenComparing(ThreadEntry::name));
		//-----
		final CpuSummary cpu;
		if (measured && cpuSupported) {
			final Long processDeltaNanos = processBefore.isPresent() && processAfter.isPresent() ? processAfter.get() - processBefore.get() : null;
			cpu = new CpuSummary(processors,
					Math.round(threadsCpuDeltaNanos / NANOS_BY_MS),
					percent(threadsCpuDeltaNanos, elapsedNanos * processors),
					processDeltaNanos == null ? null : Math.round(processDeltaNanos / NANOS_BY_MS),
					processDeltaNanos == null ? null : percent(processDeltaNanos, elapsedNanos * processors));
		} else {
			cpu = new CpuSummary(processors, null, null, null, null);
		}
		final ThreadsSummary threadsSummary = new ThreadsSummary(threadBean.getThreadCount(), threadBean.getDaemonThreadCount(),
				threadBean.getPeakThreadCount(), threadBean.getTotalStartedThreadCount(), byState);
		return new ThreadDump(
				Instant.now().toString(),
				measured ? Math.round(elapsedNanos / NANOS_BY_MS) : 0,
				maxDepth,
				cpu,
				threadsSummary,
				deadlocked == null ? List.of() : Arrays.stream(deadlocked).boxed().toList(),
				threads,
				memorySummary(),
				gcEntries(gcBefore, gcAfter, measured),
				runtimeSummary(),
				"Virtual threads are not listed : the JVM management API only sees the platform threads."
						+ (cpuSupported ? "" : " The CPU time of the threads is not supported or not enabled on this JVM."));
	}

	private static ThreadEntry toThreadEntry(final ThreadInfo threadInfo, final Long cpuNanos, final Long cpuDeltaNanos, final long elapsedNanos) {
		final List<String> stackTrace = Arrays.stream(threadInfo.getStackTrace())
				.map(StackTraceElement::toString)
				.toList();
		final List<LockedMonitor> lockedMonitors = Arrays.stream(threadInfo.getLockedMonitors())
				.map(monitorInfo -> new LockedMonitor(monitorInfo.toString(), monitorInfo.getLockedStackDepth()))
				.toList();
		final List<String> lockedSynchronizers = Arrays.stream(threadInfo.getLockedSynchronizers())
				.map(LockInfo::toString)
				.toList();
		return new ThreadEntry(
				threadInfo.getThreadId(),
				threadInfo.getThreadName(),
				threadInfo.getThreadState().name(),
				threadInfo.isDaemon(),
				threadInfo.isInNative(),
				cpuNanos == null ? null : Math.round(cpuNanos / NANOS_BY_MS),
				cpuDeltaNanos == null ? null : Math.round(cpuDeltaNanos / NANOS_BY_MS),
				cpuDeltaNanos == null ? null : percent(cpuDeltaNanos, elapsedNanos),
				threadInfo.getBlockedCount(),
				threadInfo.getWaitedCount(),
				threadInfo.getLockName(),
				threadInfo.getLockOwnerId() < 0 ? null : threadInfo.getLockOwnerId(),
				threadInfo.getLockOwnerName(),
				stackTrace,
				lockedMonitors,
				lockedSynchronizers);
	}

	private static Map<Long, Long> threadsCpuNanos(final ThreadMXBean threadBean) {
		final Map<Long, Long> cpuNanos = new HashMap<>();
		for (final long threadId : threadBean.getAllThreadIds()) {
			final long nanos = threadBean.getThreadCpuTime(threadId);
			if (nanos >= 0) { //-1 : the thread ended
				cpuNanos.put(threadId, nanos);
			}
		}
		return cpuNanos;
	}

	private static Optional<Long> processCpuNanos() {
		if (ManagementFactory.getOperatingSystemMXBean() instanceof final com.sun.management.OperatingSystemMXBean operatingSystem) {
			final long nanos = operatingSystem.getProcessCpuTime();
			return nanos >= 0 ? Optional.of(nanos) : Optional.empty();
		}
		return Optional.empty();
	}

	private static Map<String, long[]> gcCounters() {
		final Map<String, long[]> counters = new HashMap<>();
		for (final GarbageCollectorMXBean garbageCollector : ManagementFactory.getGarbageCollectorMXBeans()) {
			counters.put(garbageCollector.getName(), new long[] { garbageCollector.getCollectionCount(), garbageCollector.getCollectionTime() });
		}
		return counters;
	}

	private static List<GcEntry> gcEntries(final Map<String, long[]> before, final Map<String, long[]> after, final boolean measured) {
		return after.entrySet().stream()
				.sorted(Map.Entry.comparingByKey())
				.map(entry -> {
					final long[] counters = entry.getValue();
					final long[] previous = before.get(entry.getKey());
					final boolean withDelta = measured && previous != null;
					return new GcEntry(entry.getKey(), counters[0], counters[1],
							withDelta ? counters[0] - previous[0] : null,
							withDelta ? counters[1] - previous[1] : null);
				})
				.toList();
	}

	private static MemorySummary memorySummary() {
		final MemoryMXBean memory = ManagementFactory.getMemoryMXBean();
		final MemoryUsage heap = memory.getHeapMemoryUsage();
		final MemoryUsage nonHeap = memory.getNonHeapMemoryUsage();
		final ClassLoadingMXBean classLoading = ManagementFactory.getClassLoadingMXBean();
		return new MemorySummary(heap.getUsed() / MB, heap.getCommitted() / MB, heap.getMax() < 0 ? -1 : heap.getMax() / MB,
				nonHeap.getUsed() / MB, nonHeap.getCommitted() / MB, classLoading.getLoadedClassCount());
	}

	private static RuntimeSummary runtimeSummary() {
		final RuntimeMXBean runtime = ManagementFactory.getRuntimeMXBean();
		return new RuntimeSummary(runtime.getPid(), runtime.getVmName(), runtime.getVmVersion(), System.getProperty("java.version"), runtime.getUptime());
	}

	private static Double percent(final long part, final long total) {
		return total <= 0 ? null : Math.round(part * 1000d / total) / 10d;
	}

	private static void sleep(final int sampleMs) {
		try {
			Thread.sleep(sampleMs);
		} catch (final InterruptedException e) {
			Thread.currentThread().interrupt(); //the measure is done over the elapsed time
		}
	}

	/** A jstack-like text : the thread dump analyzers read the '"name" #id' lines, the states, the 'at' lines and the deadlock section. */
	private static String toText(final ThreadDump threadDump) {
		final StringBuilder sb = new StringBuilder()
				.append(threadDump.timestamp()).append('\n')
				.append("Full thread dump ").append(threadDump.runtime().vmName())
				.append(" (").append(threadDump.runtime().vmVersion()).append("), pid ").append(threadDump.runtime().pid()).append(":\n\n");
		for (final ThreadEntry thread : threadDump.threads()) {
			sb.append('"').append(thread.name()).append("\" #").append(thread.id());
			if (thread.daemon()) {
				sb.append(" daemon");
			}
			if (thread.cpuMs() != null) {
				sb.append(" cpu=").append(thread.cpuMs()).append("ms");
			}
			if (thread.cpuDeltaMs() != null) {
				sb.append(" sampleCpu=").append(thread.cpuDeltaMs()).append("ms (").append(thread.cpuCorePercent()).append("% of a core)");
			}
			sb.append("\n   java.lang.Thread.State: ").append(thread.state()).append('\n');
			for (int depth = 0; depth < thread.stackTrace().size(); depth++) {
				sb.append("\tat ").append(thread.stackTrace().get(depth)).append('\n');
				if (depth == 0 && thread.lockName() != null) {
					sb.append("\t- ").append(lockVerb(thread)).append(" <").append(thread.lockName()).append('>');
					if (thread.lockOwnerName() != null) {
						sb.append(" owned by \"").append(thread.lockOwnerName()).append("\" #").append(thread.lockOwnerId());
					}
					sb.append('\n');
				}
				for (final LockedMonitor lockedMonitor : thread.lockedMonitors()) {
					if (lockedMonitor.stackDepth() == depth) {
						sb.append("\t- locked <").append(lockedMonitor.lock()).append(">\n");
					}
				}
			}
			if (!thread.lockedSynchronizers().isEmpty()) {
				sb.append("\n   Locked ownable synchronizers:\n");
				thread.lockedSynchronizers().forEach(synchronizer -> sb.append("\t- <").append(synchronizer).append(">\n"));
			}
			sb.append('\n');
		}
		appendDeadlocks(threadDump, sb);
		return sb.toString();
	}

	/** As jstack : waiting to lock (monitor), parking to wait for (java.util.concurrent lock), or waiting on (Object.wait). */
	private static String lockVerb(final ThreadEntry thread) {
		if ("BLOCKED".equals(thread.state())) {
			return "waiting to lock";
		}
		final String topFrame = thread.stackTrace().isEmpty() ? "" : thread.stackTrace().get(0);
		return topFrame.contains(".park(") ? "parking to wait for " : "waiting on";
	}

	private static void appendDeadlocks(final ThreadDump threadDump, final StringBuilder sb) {
		if (threadDump.deadlockedThreadIds().isEmpty()) {
			return;
		}
		sb.append("Found one Java-level deadlock:\n=============================\n");
		for (final ThreadEntry thread : threadDump.threads()) {
			if (threadDump.deadlockedThreadIds().contains(thread.id())) {
				sb.append('"').append(thread.name()).append("\" #").append(thread.id()).append(":\n  ")
						.append("BLOCKED".equals(thread.state()) ? "waiting to lock monitor <" : "waiting for ownable synchronizer <")
						.append(thread.lockName()).append(">,\n  which is held by \"").append(thread.lockOwnerName()).append("\" #").append(thread.lockOwnerId()).append('\n');
			}
		}
		sb.append("\nFound ").append(threadDump.deadlockedThreadIds().size()).append(" deadlocked threads.\n");
	}

	private static void write(final HttpServletResponse response, final int status, final String contentType, final String content) throws IOException {
		final byte[] bytes = content.getBytes(StandardCharsets.UTF_8);
		response.setStatus(status);
		response.setContentType(contentType + ";charset=UTF-8");
		response.setHeader("Cache-Control", "no-store"); //internal information
		response.setContentLength(bytes.length);
		try (final OutputStream output = response.getOutputStream()) {
			output.write(bytes);
		}
	}

	/**
	 * The page : a shell that calls this route in json and renders it in the browser (sort, groups, folding).
	 * No external resource ; the data is inserted with textContent only (no html injection).
	 * @param nonce the CSP nonce of the request, if any
	 * @return the html page
	 */
	static String htmlPage(final String nonce) {
		final String nonceAttribute = nonce == null ? "" : " nonce=\"" + nonce.replaceAll("[^A-Za-z0-9+/=]", "") + "\"";
		return """
				<!DOCTYPE html>
				<html lang="en">
				<head>
				<meta charset="UTF-8">
				<title>Thread dump</title>
				<style{{NONCE}}>
				body { font-family: sans-serif; font-size: 13px; margin: 12px; }
				header { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 8px; }
				h1 { font-size: 18px; margin: 0 12px 0 0; }
				.summary div { margin: 2px 0; }
				.alert { background: #f88; padding: 4px 8px; margin: 6px 0; font-weight: bold; }
				.row { cursor: pointer; padding: 2px 4px; border-top: 1px solid #eee; display: flex; gap: 12px; flex-wrap: wrap; }
				.row:hover { background: #eef; }
				.name { font-weight: bold; min-width: 260px; }
				.state { min-width: 140px; }
				.cpu { min-width: 140px; }
				.lock { color: #a00; }
				.h10 { background: #cf9; } .h20 { background: #ff8; } .h40 { background: #fc6; } .h60 { background: #f88; }
				.dead { outline: 2px solid red; }
				pre { margin: 0 0 6px 24px; font-size: 12px; background: #f6f6f6; padding: 4px; overflow-x: auto; }
				.hidden { display: none; }
				.note { color: #666; font-style: italic; }
				</style>
				</head>
				<body>
				<header>
				<h1>Thread dump</h1>
				<label>CPU sample <select id="sampleMs"><option value="0">none</option><option value="500">0.5 s</option><option value="1000">1 s</option><option value="2000">2 s</option><option value="5000">5 s</option></select></label>
				<label>View <select id="view"><option value="threads">threads</option><option value="stacks">identical stacks</option><option value="pools">pools</option></select></label>
				<label>Filter <input id="filter" placeholder="name or state"></label>
				<button id="refresh">Refresh</button>
				<a id="jsonLink">json</a> <a id="textLink">text</a>
				<span id="status"></span>
				</header>
				<div id="summary" class="summary"></div>
				<div id="alerts"></div>
				<div id="list"></div>
				<script{{NONCE}}>
				(function () {
					var params = new URLSearchParams(location.search);
					var data = null;
					function byId(id) { return document.getElementById(id); }
					function el(tag, cls, text) { var e = document.createElement(tag); if (cls) { e.className = cls; } if (text !== undefined && text !== null) { e.textContent = text; } return e; }
					function routeUrl(format) { var p = new URLSearchParams(params); p.set('format', format); return location.pathname + '?' + p.toString(); }
					function heat(p) { return p >= 60 ? 'h60' : p >= 40 ? 'h40' : p >= 20 ? 'h20' : p >= 10 ? 'h10' : ''; }
					function fold(row, detail) { row.addEventListener('click', function () { detail.classList.toggle('hidden'); }); }
					function pre(text, open) { var p = el('pre', open ? '' : 'hidden'); p.textContent = text; return p; }
					function line(parent, text) { parent.appendChild(el('div', null, text)); }
					function renderSummary(d) {
						var s = byId('summary'); s.textContent = '';
						var c = d.cpu;
						line(s, d.timestamp + ' - ' + d.runtime.vmName + ' ' + d.runtime.javaVersion + ', pid ' + d.runtime.pid + ', up ' + Math.round(d.runtime.uptimeMs / 60000) + ' min, ' + c.availableProcessors + ' cores');
						if (c.threadsCpuMs !== null && c.threadsCpuMs !== undefined) {
							line(s, 'CPU over ' + d.sampleMs + ' ms : threads ' + c.threadsCpuMs + ' ms (' + c.threadsCpuPercent + ' % of all cores), process ' + (c.processCpuMs === null || c.processCpuMs === undefined ? '?' : c.processCpuMs + ' ms (' + c.processCpuPercent + ' %)'));
						}
						var states = Object.keys(d.threadsSummary.byState).map(function (k) { return k + ' ' + d.threadsSummary.byState[k]; }).join(', ');
						line(s, 'Threads : ' + d.threadsSummary.count + ' (' + d.threadsSummary.daemonCount + ' daemon, peak ' + d.threadsSummary.peakCount + ', started ' + d.threadsSummary.totalStartedCount + ') : ' + states);
						var m = d.memory;
						line(s, 'Heap ' + m.heapUsedMb + ' / ' + m.heapCommittedMb + ' MB (max ' + m.heapMaxMb + '), non heap ' + m.nonHeapUsedMb + ' MB, ' + m.loadedClassCount + ' classes');
						line(s, 'GC : ' + d.gc.map(function (g) { return g.name + ' ' + g.collectionCount + ' (' + g.collectionTimeMs + ' ms)' + (g.collectionCountDelta !== null && g.collectionCountDelta !== undefined ? ', +' + g.collectionCountDelta + ' (+' + g.collectionTimeDeltaMs + ' ms) in the sample' : ''); }).join(' ; '));
						s.appendChild(el('div', 'note', d.note));
					}
					function renderAlerts(d) {
						var a = byId('alerts'); a.textContent = '';
						if (d.deadlockedThreadIds.length > 0) {
							var names = d.threads.filter(function (t) { return d.deadlockedThreadIds.indexOf(t.id) >= 0; }).map(function (t) { return t.name + ' #' + t.id; });
							a.appendChild(el('div', 'alert', 'Deadlock : ' + names.join(' <-> ')));
						}
					}
					function stackText(t) {
						var lines = t.stackTrace.slice();
						if (t.lockName) { lines.splice(Math.min(1, lines.length), 0, '- waiting on ' + t.lockName + (t.lockOwnerName ? ' owned by ' + t.lockOwnerName + ' #' + t.lockOwnerId : '')); }
						return lines.join('\\n');
					}
					function renderThreads(threads, list, dead) {
						threads.forEach(function (t) {
							var p = t.cpuCorePercent || 0;
							var row = el('div', 'row ' + heat(p) + (dead.indexOf(t.id) >= 0 ? ' dead' : ''));
							row.appendChild(el('span', 'name', t.name + ' #' + t.id));
							row.appendChild(el('span', 'state', t.state + (t.daemon ? ' daemon' : '') + (t.inNative ? ' native' : '')));
							row.appendChild(el('span', 'cpu', t.cpuDeltaMs === null || t.cpuDeltaMs === undefined ? '' : p + ' % of a core (' + t.cpuDeltaMs + ' ms)'));
							if (t.lockName) { row.appendChild(el('span', 'lock', 'waits ' + t.lockName + (t.lockOwnerName ? ' held by ' + t.lockOwnerName + ' #' + t.lockOwnerId : ''))); }
							var detail = pre(stackText(t), p >= 20 || t.state === 'BLOCKED' || dead.indexOf(t.id) >= 0);
							fold(row, detail); list.appendChild(row); list.appendChild(detail);
						});
					}
					function renderGroups(threads, list, keyOf, labelOf, detailOf) {
						var groups = new Map();
						threads.forEach(function (t) { var k = keyOf(t); if (!groups.has(k)) { groups.set(k, []); } groups.get(k).push(t); });
						Array.from(groups.values()).sort(function (a, b) { return b.length - a.length; }).forEach(function (ts) {
							var row = el('div', 'row');
							row.appendChild(el('span', 'state', ts.length + ' thread' + (ts.length > 1 ? 's' : '')));
							row.appendChild(el('span', 'name', labelOf(ts)));
							var detail = pre(detailOf(ts), false);
							fold(row, detail); list.appendChild(row); list.appendChild(detail);
						});
					}
					function poolOf(t) { return t.name.replace(/[0-9]+/g, '#'); }
					function render() {
						if (!data) { return; }
						var list = byId('list'); list.textContent = '';
						var f = byId('filter').value.toLowerCase();
						var threads = data.threads.filter(function (t) { return !f || t.name.toLowerCase().indexOf(f) >= 0 || t.state.toLowerCase().indexOf(f) >= 0; });
						var view = byId('view').value;
						if (view === 'stacks') {
							renderGroups(threads, list, function (t) { return t.state + '\\n' + t.stackTrace.join('\\n'); },
								function (ts) { return ts[0].state + ' : ' + ts.slice(0, 5).map(function (t) { return t.name; }).join(', ') + (ts.length > 5 ? ', ...' : ''); },
								function (ts) { return stackText(ts[0]) + '\\n\\n' + ts.map(function (t) { return t.name + ' #' + t.id; }).join('\\n'); });
						} else if (view === 'pools') {
							renderGroups(threads, list, poolOf,
								function (ts) { var byState = {}; ts.forEach(function (t) { byState[t.state] = (byState[t.state] || 0) + 1; }); return poolOf(ts[0]) + ' : ' + Object.keys(byState).map(function (k) { return k + ' ' + byState[k]; }).join(', '); },
								function (ts) { return ts.map(function (t) { return t.name + ' #' + t.id + ' ' + t.state + (t.stackTrace.length > 0 ? ' at ' + t.stackTrace[0] : ''); }).join('\\n'); });
						} else {
							renderThreads(threads, list, data.deadlockedThreadIds);
						}
					}
					function load() {
						params.set('sampleMs', byId('sampleMs').value || '500');
						byId('jsonLink').href = routeUrl('json');
						byId('textLink').href = routeUrl('text');
						byId('status').textContent = 'loading...';
						fetch(routeUrl('json'), { credentials: 'same-origin' }).then(function (response) {
							if (!response.ok) { return response.text().then(function (text) { throw new Error(response.status + ' ' + text); }); }
							return response.json();
						}).then(function (d) {
							data = d; byId('status').textContent = '';
							renderSummary(d); renderAlerts(d); render();
						}).catch(function (e) { byId('status').textContent = e.message; });
					}
					byId('sampleMs').value = params.get('sampleMs') || '500';
					if (!byId('sampleMs').value) { byId('sampleMs').value = '500'; } //a value not in the list
					byId('refresh').addEventListener('click', load);
					byId('view').addEventListener('change', render);
					byId('filter').addEventListener('input', render);
					load();
				})();
				</script>
				</body>
				</html>
				""".replace("{{NONCE}}", nonceAttribute);
	}
}
