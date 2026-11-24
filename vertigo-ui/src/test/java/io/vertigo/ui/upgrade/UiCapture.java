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

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.PlaywrightException;
import com.microsoft.playwright.Route;
import com.microsoft.playwright.options.LoadState;
import com.microsoft.playwright.options.ScreenshotAnimations;

/**
 * What a scenario gives with one version of the swapped libraries.
 *
 * @param image screenshot
 * @param ariaSnapshot accessibility tree of the whole body (overlays are teleported under body)
 * @param overlays classes and frame properties of the visible overlays, by "<selector> <property>"
 * @param errors javascript errors (page errors and console errors)
 * @param failedChecks actions or checks that failed (first line of the message, numbers normalized)
 * @param abortedUrls requests to an external host, aborted (images stubbed)
 * @param versionMismatches swapped libraries not loaded in the expected version
 */
public record UiCapture(Path image, String ariaSnapshot, Map<String, String> overlays, List<String> errors, List<String> failedChecks,
		List<String> abortedUrls, List<String> versionMismatches) {

	/** Overlays whose classes and frame (border, shadow, corners) are compared : a lost frame is hard to see on a screenshot diff. */
	static final List<String> OVERLAY_SELECTORS = List.of(".q-menu", ".q-date", ".q-time", ".q-dialog .q-card", ".q-notification");
	private static final String OVERLAYS_SCRIPT = """
			selectors => Object.fromEntries(selectors.flatMap(selector => {
				const element = [...document.querySelectorAll(selector)].find(e => e.getClientRects().length > 0);
				if (!element) {
					return [];
				}
				const style = getComputedStyle(element);
				// the classes too : project css often targets them (q-position-engine is no longer set on a q-menu in Quasar 2.35 with css anchor positioning)
				return [[selector + ' class', element.className]].concat(['border-top-width', 'border-top-style', 'border-top-color', 'box-shadow', 'border-radius', 'outline-style']
					.map(property => [selector + ' ' + property, style.getPropertyValue(property)]));
			}))""";
	/** The map (OpenLayers, loaded from internet) is excluded : masked on the screenshots. */
	private static final String MAP_SELECTOR = ".ol-viewport, .v-map";
	/**
	 * An external script (OpenLayers and its geocoder, for the excluded map) is replaced by objects accepting any use :
	 * the components using it are mounted without error, instead of failing (and sometimes breaking the page) on a missing global.
	 */
	private static final String EXTERNAL_SCRIPT_STUB = """
			(() => {
				const stub = new Proxy(function () {}, { get: (target, property) => property === Symbol.toPrimitive ? () => '' : stub, apply: () => stub, construct: () => stub });
				window.ol = window.ol || stub;
				window.Geocoder = window.Geocoder || stub;
			})();""";
	private static final byte[] PLACEHOLDER_PNG = Base64.getDecoder().decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=");

	/**
	 * Plays the scenario with the baseline or the candidate version of every swapped library.
	 *
	 * @param candidate true for the candidate versions, false for the baseline ones
	 * @param outputDir folder of the screenshots of this version
	 */
	@SuppressWarnings("unchecked")
	public static UiCapture capture(final Browser browser, final String baseUrl, final UiScenario scenario, final List<UiLibrarySwap> swaps,
			final boolean candidate, final Path outputDir) throws IOException {
		final List<String> errors = new ArrayList<>();
		final List<String> failedChecks = new ArrayList<>();
		final List<String> abortedUrls = new ArrayList<>();
		final List<String> versionMismatches = new ArrayList<>();
		final Set<String> requestedLibraries = ConcurrentHashMap.newKeySet();
		try (BrowserContext context = browser.newContext(new Browser.NewContextOptions()
				.setViewportSize(scenario.width(), 900)
				.setLocale("fr-FR")
				.setTimezoneId("Europe/Paris"))) {
			context.route("**/*", route -> route(route, swaps, candidate, abortedUrls, requestedLibraries));
			final Page page = context.newPage();
			page.onConsoleMessage(message -> {
				if ("error".equals(message.type())) {
					errors.add(UiComparisonReport.normalizeError(message.text()));
				}
			});
			page.onPageError(error -> errors.add(UiComparisonReport.normalizeError(error)));
			// a server error is an error of the page, whenever its notification shows (or not) on the screenshot
			page.onResponse(response -> {
				if (response.status() >= 500) {
					errors.add(UiComparisonReport.httpError(response.status(), response.request().method(), response.url()));
				}
			});
			page.navigate(baseUrl + scenario.path());
			page.waitForLoadState(LoadState.NETWORKIDLE);
			for (final UiLibrarySwap swap : swaps) {
				final String expected = candidate ? swap.candidate() : swap.baseline();
				final Object loaded = page.evaluate("() => { try { return " + swap.globalVersionExpression() + "; } catch (e) { return null; } }");
				swap.versionMismatch(scenario.name(), expected, loaded, requestedLibraries.contains(swap.name())).ifPresent(versionMismatches::add);
			}
			run("actions", () -> scenario.actions().accept(page), failedChecks);
			run("checks", () -> scenario.checks().accept(page), failedChecks);
			page.waitForTimeout(500); // popups and transitions
			final var overlays = new LinkedHashMap<>((Map<String, String>) page.evaluate(OVERLAYS_SCRIPT, OVERLAY_SELECTORS));
			final String ariaSnapshot = page.locator("body").ariaSnapshot();
			final Path image = outputDir.resolve(scenario.name() + ".png");
			Files.createDirectories(outputDir);
			page.screenshot(new Page.ScreenshotOptions()
					.setPath(image)
					.setFullPage(!scenario.overlay())
					.setAnimations(ScreenshotAnimations.DISABLED)
					.setMask(List.of(page.locator(MAP_SELECTOR))));
			return new UiCapture(image, ariaSnapshot, overlays, errors, failedChecks, abortedUrls.stream().distinct().toList(), versionMismatches);
		}
	}

	private static void route(final Route route, final List<UiLibrarySwap> swaps, final boolean candidate, final List<String> abortedUrls,
			final Set<String> requestedLibraries) {
		final String url = route.request().url();
		if (UiLibrarySwap.isExternal(url)) {
			synchronized (abortedUrls) {
				abortedUrls.add(url);
			}
			if ("image".equals(route.request().resourceType())) {
				route.fulfill(new Route.FulfillOptions().setContentType("image/png").setBodyBytes(PLACEHOLDER_PNG));
			} else if ("script".equals(route.request().resourceType())) {
				route.fulfill(new Route.FulfillOptions().setContentType("text/javascript").setBody(EXTERNAL_SCRIPT_STUB));
			} else {
				route.abort();
			}
			return;
		}
		String rewritten = url;
		for (final UiLibrarySwap swap : swaps) {
			if (swap.isRequestedBy(url)) {
				requestedLibraries.add(swap.name());
			}
			rewritten = swap.rewrite(rewritten, candidate ? swap.candidate() : swap.baseline());
		}
		if (Objects.equals(rewritten, url)) {
			route.resume();
		} else {
			route.resume(new Route.ResumeOptions().setUrl(rewritten));
		}
	}

	/** An action or a check that throws is recorded, not fatal : the other version may pass it. */
	private static void run(final String step, final Runnable runnable, final List<String> failedChecks) {
		try {
			runnable.run();
		} catch (final PlaywrightException | AssertionError e) {
			failedChecks.add(step + " : " + UiComparisonReport.failureMessage(String.valueOf(e.getMessage())));
		}
	}
}
