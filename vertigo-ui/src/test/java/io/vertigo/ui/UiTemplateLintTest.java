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
import java.util.List;
import java.util.Properties;
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

	private static String bundleName(final Path view) {
		final String fileName = view.getFileName().toString();
		return fileName.substring(0, fileName.length() - ".html".length()) + "_fr.properties";
	}

	private static Properties bundleOf(final Path view) throws IOException {
		final Properties properties = new Properties();
		final Path bundle = view.resolveSibling(bundleName(view));
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
