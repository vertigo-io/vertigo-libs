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

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

/**
 * Comparison of the captures of a scenario between the baseline and the candidate versions.
 */
class UiComparisonReportTest {

	@Test
	void normalizeColors() {
		assertEquals(UiComparisonReport.normalizeColors("rgba(0, 0, 0, 0.2) 0px 1px 5px 0px"),
				UiComparisonReport.normalizeColors("color(srgb 0 0 0 / 0.2) 0px 1px 5px 0px"));
		assertEquals("rgba(55, 95, 172, 1)", UiComparisonReport.normalizeColors("rgb(55, 95, 172)"));
	}

	@Test
	void ariaDiff() {
		final var baseline = "- table\n  - text: 1-5 sur 89\n- button \"Save\"";
		final var candidate = "- table\n  - text: 1 - 5 sur 89\n- button \"Save\"";
		assertEquals(List.of("-   - text: 0-0 sur 0", "+   - text: 0 - 0 sur 0"), UiComparisonReport.ariaDiff(baseline, candidate));
	}

	@Test
	void ariaDiffIgnoresNumbersAndDates() {
		assertEquals(List.of(), UiComparisonReport.ariaDiff("- text: 7 movies on 18/11/2026", "- text: 12 movies on 01/02/2027"));
	}

	@Test
	void ariaDiffIgnoresSessionIds() {
		assertEquals(List.of(), UiComparisonReport.ariaDiff("- /url: /test/movie/;jsessionid=node0pyp0rp0xch0.node0", "- /url: /test/movie/;jsessionid=node0qs69by1lz.node0"));
	}

	@Test
	void normalizeError() {
		assertEquals("TypeError: Cannot read properties of undefined (reading 'View')",
				UiComparisonReport.normalizeError("TypeError: Cannot read properties of undefined (reading 'View')\n    at Proxy.mounted (http://localhost:18080/test/vertigo-ui/static/js/vertigo-ui.umd.js;jsessionid=node0qs69.node0?v=4.5.0:1:38532)"));
		assertEquals("Failed to load resource http://localhost:18080/test/x.js", UiComparisonReport.normalizeError("Failed to load resource http://localhost:18080/test/x.js;jsessionid=node0abc.node0"));
	}

	@Test
	void overlayChanges() {
		final var before = Map.of(".q-menu class", "q-menu q-position-engine scroll", ".q-menu box-shadow", "rgba(0, 0, 0, 0.2) 0px 1px 5px 0px");
		final var after = Map.of(".q-menu class", "q-menu scroll", ".q-menu box-shadow", "color(srgb 0 0 0 / 0.2) 0px 1px 5px 0px");
		assertEquals(List.of("date-popup : .q-menu class 'q-menu q-position-engine scroll' -> 'q-menu scroll'"),
				UiComparisonReport.overlayChanges("date-popup", "2.21.1", "2.35.4", before, after));
	}

	@Test
	void overlayChangesIgnoreTransitionClasses() {
		final var before = Map.of(".q-menu class", "q-menu scroll q-transition--fade-enter-from q-transition--fade-enter-active");
		final var after = Map.of(".q-menu class", "q-menu scroll");
		assertEquals(List.of(), UiComparisonReport.overlayChanges("select-open", "2.21.1", "2.35.4", before, after));
	}

	@Test
	void failureMessage() {
		assertEquals("Timeout 0ms exceeded. (waiting for locator(\".q-icon\").first())",
				UiComparisonReport.failureMessage("Error {\n  message='Timeout 5000ms exceeded.\n=========================== logs ===========================\nwaiting for locator(\".q-icon\").first()\n  name='TimeoutError"));
		assertEquals("Locator expected to be visible (waiting for locator(\".q-dialog\"))",
				UiComparisonReport.failureMessage("Locator expected to be visible\nCall log:\n  - Expect \"toBeVisible\" with timeout 5000ms\n  - waiting for locator(\".q-dialog\")"));
	}

	@Test
	void failuresOnDifferentElementsAreDistinct() {
		// the baseline fails on a check, the candidate on another one of the same step : a failure of the candidate only
		final var baseline = UiComparisonReport.failureMessage("Locator expected to be visible\nCall log:\n  - waiting for getByText(\"Catalog block\").first()");
		final var candidate = UiComparisonReport.failureMessage("Locator expected to be visible\nCall log:\n  - waiting for locator(\".fr-card\").first()");
		assertEquals(List.of(candidate), UiComparisonReport.candidateOnlyFailures(List.of(baseline), List.of(candidate)));
	}

	@Test
	void httpError() {
		// files saved at each load : the query differs between the two runs
		assertEquals("HTTP 500 GET http://localhost:18080/test/commons/upload",
				UiComparisonReport.httpError(500, "GET", "http://localhost:18080/test/commons/upload;jsessionid=node0abc.node0?file=3128cfea&file=11a4d0d0"));
	}

	@Test
	void overlayShownWithOneVersionOnly() {
		final var before = Map.of(".q-notification class", "q-notification", ".q-notification border-top-width", "0px");
		assertEquals(List.of("modifiable-table : .q-notification shown with 2.21.1 only"),
				UiComparisonReport.overlayChanges("modifiable-table", "2.21.1", "2.35.4", before, Map.of()));
	}

	@Test
	void candidateOnlyFailure() {
		assertEquals(List.of("menu visible"), UiComparisonReport.candidateOnlyFailures(List.of(), List.of("menu visible")));
		assertEquals(List.of(), UiComparisonReport.candidateOnlyFailures(List.of("menu visible"), List.of("menu visible")));
	}
}
