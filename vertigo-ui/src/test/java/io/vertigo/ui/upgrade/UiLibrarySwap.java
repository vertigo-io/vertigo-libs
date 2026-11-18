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

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.regex.Pattern;

/**
 * A library of the embedded CDN played with two versions : the urls `<name>@x.y.z/` are rewritten to the version
 * under test, whatever version the page asks.
 *
 * @param name npm name of the library, as in its url
 * @param globalVersionExpression javascript expression giving the version loaded by the page
 * @param baseline baseline version
 * @param candidate candidate version
 */
public record UiLibrarySwap(String name, String globalVersionExpression, String baseline, String candidate) {

	/** Swappable libraries : name, version expression, the two vendored versions (oldest first), to follow static/3rdParty. */
	private static final List<String[]> LIBRARIES = List.of(
			new String[] { "quasar", "Quasar.version", "2.21.1", "2.35.4" },
			new String[] { "vue", "Vue.version", "3.5.39", "3.5.45" },
			new String[] { "axios", "axios.VERSION", "1.18.1", "1.21.1" });

	/**
	 * @param properties system properties : <name>.candidate enables the swap of a library, <name>.baseline is optional
	 * (the other vendored version by default)
	 * @return the libraries to swap, in a stable order
	 */
	public static List<UiLibrarySwap> fromProperties(final Properties properties) {
		final List<UiLibrarySwap> swaps = new ArrayList<>();
		for (final String[] library : LIBRARIES) {
			final String candidate = properties.getProperty(library[0] + ".candidate");
			if (candidate != null && !candidate.isBlank()) {
				final String otherVersion = candidate.equals(library[2]) ? library[3] : library[2];
				swaps.add(new UiLibrarySwap(library[0], library[1], properties.getProperty(library[0] + ".baseline", otherVersion), candidate));
			}
		}
		return swaps;
	}

	/** @return the url with this library at the given version (other urls unchanged) */
	public String rewrite(final String url, final String version) {
		return Pattern.compile("/" + Pattern.quote(name) + "@[0-9][^/]*/").matcher(url).replaceFirst("/" + name + "@" + version + "/");
	}

	/** @return true if the url asks this library (any version) */
	public boolean isRequestedBy(final String url) {
		return url.contains("/" + name + "@");
	}

	/**
	 * @param loaded version given by {@link #globalVersionExpression()} (null if the library is not loaded)
	 * @param requested true if the page asked the library : not loaded is then a mismatch (version not vendored, typo in the property)
	 * @return the mismatch of the version loaded by the scenario, if any
	 */
	public Optional<String> versionMismatch(final String scenario, final String expected, final Object loaded, final boolean requested) {
		if (loaded == null) {
			return requested ? Optional.of(scenario + " : " + name + " not loaded instead of " + expected) : Optional.empty();
		}
		return expected.equals(loaded) ? Optional.empty() : Optional.of(scenario + " : " + name + " " + loaded + " instead of " + expected);
	}

	/** @return true if the url leaves the machine (a host other than localhost) */
	public static boolean isExternal(final String url) {
		final String host = URI.create(url).getHost();
		return host != null && !"localhost".equals(host) && !"127.0.0.1".equals(host);
	}
}
