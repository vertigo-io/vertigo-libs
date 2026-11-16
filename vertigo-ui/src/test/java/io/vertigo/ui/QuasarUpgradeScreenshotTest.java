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
package io.vertigo.ui;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.function.Consumer;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.core.config.Configurator;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfSystemProperty;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.PlaywrightException;
import com.microsoft.playwright.Route;
import com.microsoft.playwright.options.LoadState;
import com.microsoft.playwright.options.ScreenshotAnimations;

import io.vertigo.ui.boot.JettyBoot;
import io.vertigo.ui.boot.JettyBootParams;

/**
 * Visual comparison of the test webapp between two Quasar versions, to check that a Quasar upgrade is under control.
 * The same server and build are used : only the Quasar UMD/CSS/lang files are switched, by rewriting the vendored
 * `quasar@x.y.z` urls (both versions must be vendored in static/3rdParty).
 * Each scenario is played with both versions : screenshots, then a report target/quasar-screenshots/report.html (baseline,
 * candidate, pixel diff). The test fails if a page doesn't run the expected Quasar version or if the candidate raises
 * javascript errors the baseline didn't. Visual differences are reviewed by a human with the report and the Quasar changelog.
 *
 * Disabled unless quasar.candidate is set ; run it manually :
 * mvn test -Dtest=QuasarUpgradeScreenshotTest -Dquasar.baseline=2.21.1 -Dquasar.candidate=2.35.4
 * (-Dquasar.scenarios=movie-edit-.* to play only some scenarios, a regex on their names)
 * (Playwright downloads its Chromium on first run).
 */
@EnabledIfSystemProperty(named = "quasar.candidate", matches = ".+", disabledReason = "Manual check when upgrading Quasar : needs the two Quasar versions vendored and a Playwright Chromium")
public final class QuasarUpgradeScreenshotTest {
	private static final int PORT = 18080;
	private static final String BASE_URL = "http://localhost:" + PORT + "/test";
	private static final String BASELINE = System.getProperty("quasar.baseline", "2.21.1");
	private static final String CANDIDATE = System.getProperty("quasar.candidate");
	private static final Path OUTPUT = Path.of("target", "quasar-screenshots");
	private static final Pattern QUASAR_URL = Pattern.compile("quasar@[0-9][^/]*/");
	private static final int DIFF_COLOR = 0xFFFF0000;
	/** An overlay (dialog, popup, menu) is shot in the viewport, as the user sees it : the scroll lock changed in Quasar 2.28, full page shots would differ. */
	private static final boolean OVERLAY = true;
	private static final Pattern SCENARIO_FILTER = Pattern.compile(System.getProperty("quasar.scenarios", ".*"));

	private record Scenario(String name, boolean overlay, String path, int width, Consumer<Page> actions) {

		Scenario(final String name, final String path, final int width, final Consumer<Page> actions) {
			this(name, false, path, width, actions);
		}
	}

	private record Shot(Path image, List<String> errors, List<String> notes) {
	}

	private static List<Scenario> scenarios() {
		final List<Scenario> scenarios = new ArrayList<>();
		// pages
		scenarios.add(new Scenario("movies", "/movies/", 1280, page -> {
		}));
		scenarios.add(new Scenario("movie-read", "/movie/1000", 1280, page -> {
		}));
		scenarios.add(new Scenario("components-demo", "/componentsDemo/", 1280, page -> {
		}));
		scenarios.add(new Scenario("modifiable-table", "/modifiableTableDemo/", 1280, page -> {
		}));
		scenarios.add(new Scenario("file-upload", "/fileUploadDemo/", 1280, page -> {
		}));
		// interactions on the components the Quasar changelog touches
		scenarios.add(new Scenario("movies-table-sorted", "/movies/", 1280,
				page -> page.locator(".q-table th.sortable").first().click()));
		scenarios.add(new Scenario("movie-edit", "/movie/1000", 1280, QuasarUpgradeScreenshotTest::edit));
		scenarios.add(new Scenario("movie-edit-select-open", OVERLAY, "/movie/1000", 1280, page -> {
			edit(page);
			centerAndClick(page.locator(".q-select .q-field__control").first());
			waitVisible(page, ".q-menu");
		}));
		scenarios.add(new Scenario("movie-edit-date-popup", OVERLAY, "/movie/1000", 1280, page -> {
			edit(page);
			centerAndClick(page.locator(".q-icon:has-text('event')").first());
			waitVisible(page, ".q-date");
		}));
		scenarios.add(new Scenario("movie-edit-time-popup", OVERLAY, "/movie/1000", 1280, page -> {
			edit(page);
			centerAndClick(page.locator(".q-icon:has-text('access_time')").first());
			waitVisible(page, ".q-time");
		}));
		scenarios.add(new Scenario("movie-edit-autocomplete", OVERLAY, "/movie/1000", 1280, page -> {
			edit(page);
			final Locator autocomplete = page.locator(".q-select input.q-field__input >> visible=true").first();
			centerAndClick(autocomplete);
			autocomplete.fill("1");
			page.waitForTimeout(500);
		}));
		scenarios.add(new Scenario("movie-edit-keyboard-focus", "/movie/1000", 1280, page -> {
			edit(page);
			for (int i = 0; i < 4; i++) {
				page.keyboard().press("Tab");
			}
		}));
		scenarios.add(new Scenario("movie-modal", OVERLAY, "/movie/1000", 1280, page -> {
			page.locator(".q-btn:has-text('OpenModal')").click();
			waitVisible(page, ".q-dialog");
		}));
		scenarios.add(new Scenario("components-confirm-dialog", OVERLAY, "/componentsDemo/", 1280, page -> {
			page.locator(".q-btn:has-text('Save (confirm with attr)')").click();
			waitVisible(page, ".q-dialog");
		}));
		scenarios.add(new Scenario("components-editor-focus", "/componentsDemo/", 1280, // vu:text-editor (TipTap)
				page -> page.locator("[contenteditable=true] >> visible=true").first().click()));
		scenarios.add(new Scenario("components-form-errors", "/componentsDemo/", 1280, page -> {
			page.locator(".q-btn:has-text('Save (with DtObj Check)')").click();
			page.waitForLoadState(LoadState.NETWORKIDLE);
		}));
		scenarios.add(new Scenario("notif", OVERLAY, "/notifDemo/", 1280, page -> {
			page.locator(".q-btn:has-text('Notif ajax')").click();
			waitVisible(page, "[class*=q-notification]");
		}));
		// drawer breakpoint (now measured without the scrollbar)
		scenarios.add(new Scenario("movies-1040px", "/movies/", 1040, page -> {
		}));
		scenarios.add(new Scenario("movies-1000px", "/movies/", 1000, page -> {
		}));
		return scenarios;
	}

	/** Centers the element in the viewport first : the popup it opens is in the viewport shot. */
	private static void centerAndClick(final Locator locator) {
		locator.evaluate("element => element.scrollIntoView({block: 'center'})");
		locator.click();
	}

	private static void waitVisible(final Page page, final String selector) {
		page.locator(selector + " >> visible=true").first().waitFor(new Locator.WaitForOptions().setTimeout(5_000));
	}

	private static void edit(final Page page) {
		page.locator("#editAction").click();
		page.waitForLoadState(LoadState.NETWORKIDLE);
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
	public void compareQuasarVersions() throws IOException {
		final Map<String, Shot> baselineShots = new LinkedHashMap<>();
		final Map<String, Shot> candidateShots = new LinkedHashMap<>();
		try (var playwright = Playwright.create(); var browser = playwright.chromium().launch()) {
			for (final Scenario scenario : scenarios()) {
				if (!SCENARIO_FILTER.matcher(scenario.name()).matches()) {
					continue;
				}
				baselineShots.put(scenario.name(), shoot(browser, scenario, BASELINE));
				candidateShots.put(scenario.name(), shoot(browser, scenario, CANDIDATE));
			}
		}
		final List<String> newErrors = new ArrayList<>();
		final StringBuilder rows = new StringBuilder();
		for (final var entry : baselineShots.entrySet()) {
			final Shot before = entry.getValue();
			final Shot after = candidateShots.get(entry.getKey());
			after.errors().stream()
					.filter(error -> !before.errors().contains(error))
					.forEach(error -> newErrors.add(entry.getKey() + " : " + error));
			rows.append(reportRow(entry.getKey(), before, after));
		}
		final Path report = OUTPUT.resolve("report.html");
		Files.writeString(report, "<!doctype html><html><head><meta charset='utf-8'><title>Quasar " + BASELINE + " vs " + CANDIDATE + "</title>"
				+ "<style>body{font-family:sans-serif}td{vertical-align:top;padding:4px}img{width:420px;border:1px solid #ccc}</style></head><body>"
				+ "<h1>Quasar " + BASELINE + " (baseline) vs " + CANDIDATE + " (candidate)</h1>"
				+ "<p>New javascript errors : " + (newErrors.isEmpty() ? "none" : String.join("<br>", newErrors)) + "</p>"
				+ "<table><tr><th>Scenario</th><th>" + BASELINE + "</th><th>" + CANDIDATE + "</th><th>Diff</th></tr>" + rows + "</table></body></html>",
				StandardCharsets.UTF_8);
		System.out.println("Quasar upgrade report : " + report.toAbsolutePath());
		Assertions.assertTrue(newErrors.isEmpty(), () -> "New javascript errors with Quasar " + CANDIDATE + " : " + newErrors);
	}

	private static Shot shoot(final Browser browser, final Scenario scenario, final String quasarVersion) throws IOException {
		final List<String> errors = new ArrayList<>();
		final List<String> notes = new ArrayList<>();
		try (BrowserContext context = browser.newContext(new Browser.NewContextOptions()
				.setViewportSize(scenario.width(), 900)
				.setLocale("fr-FR")
				.setTimezoneId("Europe/Paris"))) {
			context.route("**/quasar@*/**", route -> route.resume(new Route.ResumeOptions()
					.setUrl(QUASAR_URL.matcher(route.request().url()).replaceFirst("quasar@" + quasarVersion + "/"))));
			final Page page = context.newPage();
			page.onConsoleMessage(message -> {
				if ("error".equals(message.type())) {
					errors.add(message.text());
				}
			});
			page.onPageError(errors::add);
			page.navigate(BASE_URL + scenario.path());
			page.waitForLoadState(LoadState.NETWORKIDLE);
			Assertions.assertEquals(quasarVersion, page.evaluate("() => window.Quasar && Quasar.version"),
					() -> scenario.name() + " doesn't run Quasar " + quasarVersion + " (is it vendored ?)");
			try {
				scenario.actions().accept(page);
			} catch (final PlaywrightException e) {
				notes.add("interaction failed : " + String.join(" / ", e.getMessage().lines()
						.filter(line -> line.contains("message=") || line.trim().startsWith("-"))
						.map(String::trim)
						.distinct()
						.limit(6)
						.toList()));
			}
			page.waitForTimeout(500); // popups and transitions
			final Path image = OUTPUT.resolve(quasarVersion).resolve(scenario.name() + ".png");
			Files.createDirectories(image.getParent());
			page.screenshot(new Page.ScreenshotOptions()
					.setPath(image)
					.setFullPage(!scenario.overlay())
					.setAnimations(ScreenshotAnimations.DISABLED));
			return new Shot(image, errors, notes);
		}
	}

	private static String reportRow(final String name, final Shot before, final Shot after) throws IOException {
		final BufferedImage beforeImage = ImageIO.read(before.image().toFile());
		final BufferedImage afterImage = ImageIO.read(after.image().toFile());
		final int width = Math.max(beforeImage.getWidth(), afterImage.getWidth());
		final int height = Math.max(beforeImage.getHeight(), afterImage.getHeight());
		final BufferedImage diff = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		long diffPixels = 0;
		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				final Integer beforePixel = pixel(beforeImage, x, y);
				final Integer afterPixel = pixel(afterImage, x, y);
				if (beforePixel == null || !beforePixel.equals(afterPixel)) {
					diffPixels++;
					diff.setRGB(x, y, DIFF_COLOR);
				} else {
					final int gray = ((beforePixel >> 16 & 0xFF) + (beforePixel >> 8 & 0xFF) + (beforePixel & 0xFF)) / 3;
					final int light = 128 + gray / 2; //faded copy, so the red diff stands out
					diff.setRGB(x, y, light << 16 | light << 8 | light);
				}
			}
		}
		final Path diffImage = OUTPUT.resolve("diff").resolve(name + ".png");
		Files.createDirectories(diffImage.getParent());
		ImageIO.write(diff, "png", diffImage.toFile());
		final double ratio = 100.0 * diffPixels / ((long) width * height);
		return String.format(Locale.ROOT, "<tr><td><b>%s</b><br>%.2f %% pixels differ<br>%dx%d / %dx%d%s</td>"
				+ "<td><a href='%s/%s.png'><img src='%s/%s.png'></a></td><td><a href='%s/%s.png'><img src='%s/%s.png'></a></td>"
				+ "<td><a href='diff/%s.png'><img src='diff/%s.png'></a></td></tr>",
				name, ratio, beforeImage.getWidth(), beforeImage.getHeight(), afterImage.getWidth(), afterImage.getHeight(),
				(after.errors().isEmpty() ? "" : "<br>JS errors : " + String.join("<br>", after.errors()))
						+ (before.notes().isEmpty() ? "" : "<br>" + BASELINE + " : " + String.join("<br>", before.notes()))
						+ (after.notes().isEmpty() ? "" : "<br>" + CANDIDATE + " : " + String.join("<br>", after.notes())),
				BASELINE, name, BASELINE, name, CANDIDATE, name, CANDIDATE, name, name, name);
	}

	private static Integer pixel(final BufferedImage image, final int x, final int y) {
		return x < image.getWidth() && y < image.getHeight() ? image.getRGB(x, y) & 0xFFFFFF : null;
	}
}
