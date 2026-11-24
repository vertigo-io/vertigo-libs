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

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

/**
 * Static checks on the Thymeleaf templates, to catch mistakes that only show up
 * as a Vue warning or a raw i18n placeholder in the browser.
 *
 * @author skerdudou
 */
class UiTemplateLintTest {

	private static final Path COMPONENTS_DIR = Path.of("src/main/resources/io/vertigo/ui/components");
	private static final Path VIEWS_DIR = Path.of("src/test/resources/testWebApp/WEB-INF/views");

	/**
	 * An attribute value that *starts* with `function (` is a bare function expression.
	 * Vue validates a v-on value as raw statements as soon as it contains a `;`, and an
	 * anonymous function declaration is a SyntaxError there ("Function statements require
	 * a function name"), reported as the misleading "avoid using JavaScript keyword as
	 * property name: function". A `;` sneaks in easily: inside a string literal, or from
	 * the `;jsessionid=...` the servlet container appends to an URL.
	 * Arrow functions are valid in both positions, so they must be used instead.
	 */
	private static final Pattern BARE_FUNCTION_EXPRESSION = Pattern.compile("=\"\\|?\\s*function\\s*\\(");

	private static final Pattern I18N_KEY = Pattern.compile("#\\{([a-zA-Z0-9_.]+)\\}");
	/** The keys of the components may hold a dash (the name of the component). */
	private static final Pattern COMPONENT_I18N_KEY = Pattern.compile("#\\{([a-zA-Z0-9_.-]+)\\}");

	/** A component is named by its fragment, and by its vu:alias if any. */
	private static final Pattern FRAGMENT_NAME = Pattern.compile("th:fragment=\"\\s*([a-zA-Z0-9_-]+)");
	private static final Pattern COMPONENT_ALIAS = Pattern.compile("vu:alias=\"([a-zA-Z0-9_-]+)\"");
	private static final Pattern FRAGMENT_SIGNATURE = Pattern.compile("th:fragment=\"\\s*([a-zA-Z0-9_-]+)\\s*(?:\\(([^)]*)\\))?");
	private static final Pattern VU_ELEMENT = Pattern.compile("<vu:([a-zA-Z0-9_-]+)");
	/** Elements handled by the processors of the dialect, not by a component file. */
	private static final Set<String> BUILT_IN_ELEMENTS = Set.of("content", "content-item", "slot", "content-slot");

	@Test
	void no_template_uses_a_bare_function_expression_as_handler() throws IOException {
		final List<String> offenders = new ArrayList<>();
		for (final Path template : htmlFilesIn(COMPONENTS_DIR)) {
			final List<String> lines = Files.readAllLines(template, StandardCharsets.UTF_8);
			for (int i = 0; i < lines.size(); i++) {
				if (BARE_FUNCTION_EXPRESSION.matcher(lines.get(i)).find()) {
					offenders.add(template + ":" + (i + 1) + " -> use an arrow function instead");
				}
			}
		}
		Assertions.assertTrue(offenders.isEmpty(),
				() -> "Bare `function (...)` handlers found, Vue cannot always compile them:\n" + String.join("\n", offenders));
	}

	@Test
	void every_i18n_key_of_the_views_is_declared_in_a_sibling_bundle() throws IOException {
		final List<String> offenders = new ArrayList<>();
		for (final Path view : htmlFilesIn(VIEWS_DIR)) {
			final String content = Files.readString(view, StandardCharsets.UTF_8);
			final Matcher matcher = I18N_KEY.matcher(content);
			while (matcher.find()) {
				final String key = matcher.group(1);
				if (!bundleOf(view).containsKey(key)) {
					// Thymeleaf resolves #{...} from a properties file sitting next to the template
					// and sharing its name; without it the page shows a raw ??key_locale?? placeholder.
					offenders.add(view + " -> missing key '" + key + "' in " + bundleName(view));
				}
			}
		}
		Assertions.assertTrue(offenders.isEmpty(),
				() -> "i18n keys without a sibling bundle entry, they render as ??key_locale??:\n" + String.join("\n", offenders));
	}

	/**
	 * A component with bundles next to its template (sharing its name) reads its messages from them : a key it reads must be in each
	 * of them (the default one, _en, _fr), or in the default one, or the page shows the raw key.
	 */
	@Test
	void every_i18n_key_of_the_components_is_declared_in_their_sibling_bundles() throws IOException {
		final List<String> offenders = new ArrayList<>();
		for (final Path component : htmlFilesIn(COMPONENTS_DIR)) {
			final String name = component.getFileName().toString().replaceAll("\\.html$", "");
			final Properties defaultBundle = load(component.resolveSibling(name + ".properties"));
			final Map<String, Properties> bundles = new HashMap<>();
			for (final String suffix : List.of("", "_en", "_fr")) {
				final Path bundle = component.resolveSibling(name + suffix + ".properties");
				if (Files.exists(bundle)) {
					bundles.put(bundle.getFileName().toString(), load(bundle));
				}
			}
			final Matcher matcher = COMPONENT_I18N_KEY.matcher(Files.readString(component, StandardCharsets.UTF_8));
			while (matcher.find()) {
				for (final Map.Entry<String, Properties> bundle : bundles.entrySet()) {
					if (!bundle.getValue().containsKey(matcher.group(1)) && !defaultBundle.containsKey(matcher.group(1))) {
						offenders.add(component + " -> missing key '" + matcher.group(1) + "' in " + bundle.getKey());
					}
				}
			}
		}
		Assertions.assertTrue(offenders.isEmpty(),
				() -> "i18n keys of a component missing in its bundle, they render as ??key_locale??:\n" + String.join("\n", offenders));
	}

	/**
	 * A vu: element without component is written as is and ignored by the browser, without any error
	 * (a component removed or renamed, a typo) : the feature it should show silently disappears.
	 */
	@Test
	void every_vu_element_is_a_known_component() throws IOException {
		final Set<String> components = new HashSet<>(BUILT_IN_ELEMENTS);
		for (final Path template : htmlFilesIn(COMPONENTS_DIR)) {
			final String content = Files.readString(template, StandardCharsets.UTF_8);
			Stream.of(FRAGMENT_NAME, COMPONENT_ALIAS)
					.flatMap(pattern -> pattern.matcher(content).results())
					.forEach(match -> components.add(match.group(1)));
		}
		final List<String> offenders = new ArrayList<>();
		for (final Path template : Stream.concat(htmlFilesIn(COMPONENTS_DIR).stream(), htmlFilesIn(VIEWS_DIR).stream()).toList()) {
			final List<String> lines = Files.readAllLines(template, StandardCharsets.UTF_8);
			for (int i = 0; i < lines.size(); i++) {
				final Matcher matcher = VU_ELEMENT.matcher(lines.get(i));
				while (matcher.find()) {
					if (!components.contains(matcher.group(1))) {
						offenders.add(template + ":" + (i + 1) + " -> unknown component vu:" + matcher.group(1));
					}
				}
			}
		}
		Assertions.assertTrue(offenders.isEmpty(),
				() -> "vu: elements without component, they render as an ignored tag:\n" + String.join("\n", offenders));
	}

	/**
	 * Fragments of the same name in a file (told apart by a th:if) are one component : its params are read
	 * from one of them, picked in no fixed order at startup. They must declare the same params, in the same
	 * order (the last *_attrs gets the unknown attributes), or a param is randomly ignored.
	 */
	@Test
	void fragments_of_the_same_name_declare_the_same_params() throws IOException {
		final List<String> offenders = new ArrayList<>();
		for (final Path template : htmlFilesIn(COMPONENTS_DIR)) {
			final String content = Files.readString(template, StandardCharsets.UTF_8);
			final Map<String, String> paramsByFragment = new HashMap<>();
			final Matcher matcher = FRAGMENT_SIGNATURE.matcher(content);
			while (matcher.find()) {
				final String params = matcher.group(2) == null ? "" : matcher.group(2).replaceAll("\\s+", "");
				final String previous = paramsByFragment.putIfAbsent(matcher.group(1), params);
				if (previous != null && !previous.equals(params)) {
					offenders.add(template + " -> fragment " + matcher.group(1) + " declared with (" + previous + ") and (" + params + ")");
				}
			}
		}
		Assertions.assertTrue(offenders.isEmpty(),
				() -> "Fragments of the same name with different params, one of them is used at random:\n" + String.join("\n", offenders));
	}

	private static String bundleName(final Path view) {
		final String fileName = view.getFileName().toString();
		return fileName.substring(0, fileName.length() - ".html".length()) + "_fr.properties";
	}

	private static Properties bundleOf(final Path view) throws IOException {
		return load(view.resolveSibling(bundleName(view)));
	}

	private static Properties load(final Path bundle) throws IOException {
		final Properties properties = new Properties();
		if (Files.exists(bundle)) {
			try (InputStream in = Files.newInputStream(bundle)) {
				properties.load(in);
			}
		}
		return properties;
	}

	private static List<Path> htmlFilesIn(final Path root) throws IOException {
		Assertions.assertTrue(Files.isDirectory(root), () -> "Directory not found : " + root.toAbsolutePath());
		try (Stream<Path> files = Files.walk(root)) {
			return files.filter(Files::isRegularFile)
					.filter(path -> path.getFileName().toString().endsWith(".html"))
					.toList();
		}
	}
}
