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

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

/**
 * Comparison of the captures of a scenario between the baseline and the candidate versions, and its report.
 */
public final class UiComparisonReport {
	private static final Pattern SRGB_COLOR = Pattern.compile("color\\(srgb ([0-9.]+) ([0-9.]+) ([0-9.]+)(?: / ([0-9.]+))?\\)");
	private static final Pattern RGB_COLOR = Pattern.compile("rgb\\((\\d+), (\\d+), (\\d+)\\)");
	private static final Pattern DATE = Pattern.compile("\\d{1,2}/\\d{1,2}/\\d{2,4}");
	private static final Pattern NUMBER = Pattern.compile("\\d+");
	private static final int DIFF_COLOR = 0xFFFF0000;
	private static final Pattern SESSION_ID = Pattern.compile(";jsessionid=[^/?#\"'\\s)]*");
	/** Classes of a running Quasar transition : depend on the moment of the capture. */
	private static final Pattern TRANSITION_CLASS = Pattern.compile("\\s*q-transition--\\S+");
	private static final String WAITING_FOR = "waiting for ";

	private UiComparisonReport() {
		//util
	}

	/** Same notation for the same color : the browser writes a color(srgb ...) computed from css variables, rgba(...) otherwise. */
	static String normalizeColors(final String cssValue) {
		final String srgbReplaced = SRGB_COLOR.matcher(cssValue).replaceAll(match -> String.format(Locale.ROOT, "rgba(%d, %d, %d, %s)",
				Math.round(Float.parseFloat(match.group(1)) * 255),
				Math.round(Float.parseFloat(match.group(2)) * 255),
				Math.round(Float.parseFloat(match.group(3)) * 255),
				match.group(4) == null ? "1" : match.group(4)));
		return RGB_COLOR.matcher(srgbReplaced).replaceAll("rgba($1, $2, $3, 1)");
	}

	/** Accessibility snapshot without the values that change from one run to another : session ids, dates, then numbers. */
	static String normalizeAria(final String ariaSnapshot) {
		return NUMBER.matcher(DATE.matcher(removeSessionIds(ariaSnapshot)).replaceAll("<date>")).replaceAll("0");
	}

	/** A javascript error compared between the versions : its first line (no stack, whose urls carry the session id). */
	static String normalizeError(final String error) {
		return removeSessionIds(error.lines().findFirst().orElse(""));
	}

	/**
	 * A failed action or check compared between the versions : the Playwright message line (its first line otherwise), numbers
	 * normalized, then the element waited for (two failures of the same step on different elements are distinct).
	 */
	static String failureMessage(final String message) {
		final var messageLine = message.lines()
				.map(String::trim)
				.filter(line -> line.startsWith("message='"))
				.map(line -> line.substring("message='".length()))
				.findFirst()
				.orElseGet(() -> message.lines().findFirst().orElse(""));
		final var waitingFor = message.lines()
				.filter(line -> line.contains(WAITING_FOR))
				.map(line -> " (" + line.substring(line.indexOf(WAITING_FOR)).trim() + ")")
				.findFirst()
				.orElse("");
		return normalizeAria(messageLine) + waitingFor;
	}

	/** A server error compared between the versions : status, method and url without its query (it may hold generated ids) nor session id. */
	static String httpError(final int status, final String method, final String url) {
		final int queryIndex = url.indexOf('?');
		return "HTTP " + status + " " + method + " " + removeSessionIds(queryIndex < 0 ? url : url.substring(0, queryIndex));
	}

	private static String removeTransitionClasses(final String cssValue) {
		return TRANSITION_CLASS.matcher(cssValue).replaceAll("").trim();
	}

	private static String removeSessionIds(final String text) {
		return SESSION_ID.matcher(text).replaceAll("");
	}

	/** @return the lines of the normalized snapshots missing in the candidate ("- ") then added by it ("+ "), order kept */
	static List<String> ariaDiff(final String baseline, final String candidate) {
		final List<String> before = normalizeAria(baseline).lines().toList();
		final List<String> after = normalizeAria(candidate).lines().toList();
		final List<String> diff = new ArrayList<>();
		before.stream().filter(line -> !after.contains(line)).forEach(line -> diff.add("- " + line));
		after.stream().filter(line -> !before.contains(line)).forEach(line -> diff.add("+ " + line));
		return diff;
	}

	/**
	 * Classes and frame properties of the overlays that differ between the two versions. An overlay shown with one version
	 * only is reported once (a notification may already be closed when the screenshot is taken).
	 */
	static List<String> overlayChanges(final String scenario, final String baselineLabel, final String candidateLabel,
			final Map<String, String> before, final Map<String, String> after) {
		final List<String> changes = new ArrayList<>();
		final var selectors = new LinkedHashSet<String>();
		before.keySet().forEach(key -> selectors.add(selectorOf(key)));
		after.keySet().forEach(key -> selectors.add(selectorOf(key)));
		for (final String selector : selectors) {
			final boolean inBefore = before.containsKey(selector + " class");
			final boolean inAfter = after.containsKey(selector + " class");
			if (inBefore != inAfter) {
				changes.add(scenario + " : " + selector + " shown with " + (inBefore ? baselineLabel : candidateLabel) + " only");
			}
		}
		before.entrySet().stream().sorted(Map.Entry.comparingByKey()).forEach(entry -> {
			final String afterValue = after.get(entry.getKey());
			if (afterValue != null && !removeTransitionClasses(normalizeColors(entry.getValue())).equals(removeTransitionClasses(normalizeColors(afterValue)))) {
				changes.add(scenario + " : " + entry.getKey() + " '" + entry.getValue() + "' -> '" + afterValue + "'");
			}
		});
		return changes;
	}

	/** @return the checks failing with the candidate but not with the baseline (a check failing with both is a broken scenario) */
	static List<String> candidateOnlyFailures(final List<String> baselineFailures, final List<String> candidateFailures) {
		return candidateFailures.stream().filter(failure -> !baselineFailures.contains(failure)).toList();
	}

	/** @return the javascript errors of the candidate the baseline didn't have */
	static List<String> newErrors(final UiCapture baseline, final UiCapture candidate) {
		return candidate.errors().stream().filter(error -> !baseline.errors().contains(error)).distinct().toList();
	}

	/**
	 * Writes the report : summary first, then one row per scenario (screenshots and pixel diff, accessibility tree diff,
	 * overlay changes, errors and failed checks).
	 * @return the report file
	 */
	static Path write(final Path outputDir, final List<UiLibrarySwap> swaps, final Map<String, UiCapture> baseline, final Map<String, UiCapture> candidate) throws IOException {
		final String baselineLabel = swaps.stream().map(swap -> swap.name() + " " + swap.baseline()).collect(Collectors.joining(", "));
		final String candidateLabel = swaps.stream().map(swap -> swap.name() + " " + swap.candidate()).collect(Collectors.joining(", "));
		final List<String> newErrors = new ArrayList<>();
		final List<String> candidateOnlyFailures = new ArrayList<>();
		final List<String> brokenScenarios = new ArrayList<>();
		final List<String> overlayChanges = new ArrayList<>();
		final Set<String> abortedUrls = new TreeSet<>();
		final StringBuilder rows = new StringBuilder();
		for (final var entry : baseline.entrySet()) {
			final String name = entry.getKey();
			final UiCapture before = entry.getValue();
			final UiCapture after = candidate.get(name);
			newErrors(before, after).forEach(error -> newErrors.add(name + " : " + error));
			candidateOnlyFailures(before.failedChecks(), after.failedChecks()).forEach(failure -> candidateOnlyFailures.add(name + " : " + failure));
			before.failedChecks().stream().filter(after.failedChecks()::contains).forEach(failure -> brokenScenarios.add(name + " : " + failure));
			final List<String> scenarioOverlayChanges = overlayChanges(name, baselineLabel, candidateLabel, before.overlays(), after.overlays());
			overlayChanges.addAll(scenarioOverlayChanges);
			abortedUrls.addAll(before.abortedUrls());
			abortedUrls.addAll(after.abortedUrls());
			rows.append(row(outputDir, name, before, after, scenarioOverlayChanges));
		}
		final Path report = outputDir.resolve("report.html");
		Files.writeString(report, "<!doctype html><html><head><meta charset='utf-8'><title>UI upgrade " + escape(candidateLabel) + "</title>"
				+ "<style>body{font-family:sans-serif}td{vertical-align:top;padding:4px}img{width:420px;border:1px solid #ccc}pre{font-size:11px;max-width:420px;white-space:pre-wrap}</style></head><body>"
				+ "<h1>Baseline : " + escape(baselineLabel) + "<br>Candidate : " + escape(candidateLabel) + "</h1>"
				+ section("New javascript errors with the candidate", newErrors)
				+ section("Checks failing with the candidate only", candidateOnlyFailures)
				+ section("Broken scenarios (checks failing with both versions)", brokenScenarios)
				+ section("Overlay changes (classes, border, shadow, corners)", overlayChanges)
				+ section("Aborted external requests", List.copyOf(abortedUrls))
				+ "<table><tr><th>Scenario</th><th>Baseline</th><th>Candidate</th><th>Diff</th></tr>" + rows + "</table></body></html>",
				StandardCharsets.UTF_8);
		return report;
	}

	private static String section(final String title, final List<String> lines) {
		return "<h2>" + escape(title) + "</h2><p>" + (lines.isEmpty() ? "none" : lines.stream().map(UiComparisonReport::escape).collect(Collectors.joining("<br>"))) + "</p>";
	}

	private static String row(final Path outputDir, final String name, final UiCapture before, final UiCapture after, final List<String> scenarioOverlayChanges) throws IOException {
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
		final Path diffImage = outputDir.resolve("diff").resolve(name + ".png");
		Files.createDirectories(diffImage.getParent());
		ImageIO.write(diff, "png", diffImage.toFile());
		final double ratio = 100.0 * diffPixels / ((long) width * height);
		final List<String> notes = new ArrayList<>();
		notes.addAll(scenarioOverlayChanges);
		after.errors().forEach(error -> notes.add("candidate js error : " + error));
		before.failedChecks().forEach(failure -> notes.add("baseline failed : " + failure));
		after.failedChecks().forEach(failure -> notes.add("candidate failed : " + failure));
		return String.format(Locale.ROOT, "<tr><td><b>%s</b><br>%.2f %% pixels differ<br>%s<pre>%s</pre></td>"
				+ "<td><a href='%s'><img src='%s'></a></td><td><a href='%s'><img src='%s'></a></td><td><a href='%s'><img src='%s'></a></td></tr>",
				escape(name), ratio, notes.stream().map(UiComparisonReport::escape).collect(Collectors.joining("<br>")),
				escape(String.join("\n", ariaDiff(before.ariaSnapshot(), after.ariaSnapshot()))),
				relative(outputDir, before.image()), relative(outputDir, before.image()), relative(outputDir, after.image()), relative(outputDir, after.image()),
				relative(outputDir, diffImage), relative(outputDir, diffImage));
	}

	private static String relative(final Path outputDir, final Path file) {
		return outputDir.relativize(file).toString().replace('\\', '/');
	}

	private static Integer pixel(final BufferedImage image, final int x, final int y) {
		return x < image.getWidth() && y < image.getHeight() ? image.getRGB(x, y) & 0xFFFFFF : null;
	}

	private static String escape(final String text) {
		return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
	}

	/** Overlay property key "<selector> <property>" : the selector may contain spaces (".q-dialog .q-card"). */
	private static String selectorOf(final String key) {
		return key.substring(0, key.lastIndexOf(' '));
	}
}
