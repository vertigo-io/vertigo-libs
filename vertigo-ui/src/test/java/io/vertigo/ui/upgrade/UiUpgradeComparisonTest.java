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
package io.vertigo.ui.upgrade;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.stream.Stream;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.core.config.Configurator;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIf;

import com.microsoft.playwright.Playwright;

import io.vertigo.ui.MultipartConfigInjectionHandler;
import io.vertigo.ui.TestVSpringWebApplicationInitializer;
import io.vertigo.ui.boot.JettyBoot;
import io.vertigo.ui.boot.JettyBootParams;
import io.vertigo.ui.upgrade.scenarios.UiScenariosCollections;
import io.vertigo.ui.upgrade.scenarios.UiScenariosDsfr;
import io.vertigo.ui.upgrade.scenarios.UiScenariosInputs;
import io.vertigo.ui.upgrade.scenarios.UiScenariosPages;
import io.vertigo.ui.upgrade.scenarios.UiScenariosUpload;
import io.vertigo.ui.upgrade.scenarios.UiScenariosVue;

/**
 * Plays every scenario of the vertigo-ui components with the baseline and the candidate versions of the libraries of
 * the embedded CDN (Quasar, Vue, axios), in the same build : only their urls are rewritten. Run it before releasing an
 * upgrade of one of them.
 *
 * <h2>Run</h2>
 * Disabled unless a candidate version is given ; both versions must be vendored in static/3rdParty :
 * <pre>
 * mvn test -pl vertigo-ui -Dtest=UiUpgradeComparisonTest -Dquasar.candidate=2.35.4
 * mvn test -pl vertigo-ui -Dtest=UiUpgradeComparisonTest -Dquasar.candidate=2.35.4 -Dvue.candidate=3.5.45 -Dvue.baseline=3.5.39
 * </pre>
 * <ul>
 * <li>libraries : quasar.candidate / quasar.baseline, vue.candidate / vue.baseline, axios.candidate / axios.baseline
 * (a missing baseline is the other vendored version) ;</li>
 * <li>-Dui.scenarios=&lt;regex&gt; plays the matching scenarios only (catalog-.*, dsfr-.*...). On Windows, mvn.cmd breaks
 * a value holding a | : use optional groups instead, (my)?(notif)? ;</li>
 * <li>the test webapp starts an embedded Elasticsearch on port 9200 (testcontainers, Docker) unless ES_HOST answers :
 * nothing else may hold that port ;</li>
 * <li>Playwright downloads its Chromium on the first run.</li>
 * </ul>
 *
 * <h2>Result</h2>
 * target/ui-upgrade/report.html : summary (new javascript errors, checks failing with the candidate only, broken
 * scenarios, overlay changes, aborted external requests), then per scenario the screenshots, the pixel diff, the
 * accessibility tree diff, the overlay changes and the failed checks.
 * The run fails only on : a library not loaded in the expected version, a new javascript error (or HTTP &gt;= 500) with the
 * candidate, a check failing with the candidate only. Visual, accessibility and overlay differences are for a human review
 * with the library changelog ; a check failing with both versions is a broken scenario (or a known component bug).
 *
 * <h2>Add a scenario</h2>
 * One class per family in the scenarios package (pages, inputs, collections, upload, dsfr, vue), listed in {@link #scenarios()} :
 * a page path, the user actions, and the checks (Playwright assertions on what the user gets). The catalog pages
 * (data/catalog*.html) show the components with data built in memory.
 * Excluded : the map (OpenLayers comes from internet : stubbed and masked), the Vue components calling a module service
 * (v-comments, v-handles, v-notifications, v-commands, v-chatbot, v-extensions-store). No request leaves the machine :
 * external scripts are stubbed, external images replaced, other external requests aborted.
 */
@EnabledIf("hasCandidate")
public final class UiUpgradeComparisonTest {
	private static final int PORT = 18080;
	private static final String BASE_URL = "http://localhost:" + PORT + "/test";
	private static final Path OUTPUT = Path.of("target", "ui-upgrade");
	private static final List<UiLibrarySwap> SWAPS = UiLibrarySwap.fromProperties(System.getProperties());
	private static final Pattern SCENARIO_FILTER = Pattern.compile(System.getProperty("ui.scenarios", ".*"));

	static boolean hasCandidate() {
		return !SWAPS.isEmpty();
	}

	static List<UiScenario> scenarios() {
		return Stream.of(UiScenariosPages.scenarios(), UiScenariosInputs.scenarios(), UiScenariosCollections.scenarios(), UiScenariosUpload.scenarios(), UiScenariosDsfr.scenarios(), UiScenariosVue.scenarios())
				.flatMap(List::stream)
				.filter(scenario -> SCENARIO_FILTER.matcher(scenario.name()).matches())
				.toList();
	}

	@BeforeAll
	public static void setUp() throws Exception {
		Configurator.setLevel("io.vertigo", Level.WARN);
		JettyBoot.startServer(JettyBootParams.builder("testWebApp/", TestVSpringWebApplicationInitializer.class)
				.withContextPath("/test")
				.noSsl()
				.withPort(PORT)
				.noJoin()
				.build(), context -> {
					final var multipartConfigInjectionHandler = new MultipartConfigInjectionHandler();
					multipartConfigInjectionHandler.setHandler(context);
					return List.of(multipartConfigInjectionHandler);
				});
	}

	@AfterAll
	public static void tearDown() throws Exception {
		JettyBoot.stop();
	}

	@Test
	public void compareVersions() throws Exception {
		final Map<String, UiCapture> baseline = new LinkedHashMap<>();
		final Map<String, UiCapture> candidate = new LinkedHashMap<>();
		try (var playwright = Playwright.create(); var browser = playwright.chromium().launch()) {
			for (final UiScenario scenario : scenarios()) {
				baseline.put(scenario.name(), UiCapture.capture(browser, BASE_URL, scenario, SWAPS, false, OUTPUT.resolve("baseline")));
				candidate.put(scenario.name(), UiCapture.capture(browser, BASE_URL, scenario, SWAPS, true, OUTPUT.resolve("candidate")));
			}
		}
		final Path report = UiComparisonReport.write(OUTPUT, SWAPS, baseline, candidate);
		System.out.println("UI upgrade report : " + report.toAbsolutePath());

		final List<String> failures = new ArrayList<>();
		for (final var entry : baseline.entrySet()) {
			final UiCapture before = entry.getValue();
			final UiCapture after = candidate.get(entry.getKey());
			failures.addAll(before.versionMismatches());
			failures.addAll(after.versionMismatches());
			UiComparisonReport.newErrors(before, after).forEach(error -> failures.add(entry.getKey() + " : new javascript error : " + error));
			UiComparisonReport.candidateOnlyFailures(before.failedChecks(), after.failedChecks())
					.forEach(failure -> failures.add(entry.getKey() + " : fails with the candidate only : " + failure));
		}
		failures.forEach(failure -> System.out.println("UI upgrade failure : " + failure));
		Assertions.assertTrue(failures.isEmpty(), () -> "UI upgrade : " + failures.size() + " failures, see " + report.toAbsolutePath() + " : " + failures);
	}
}
