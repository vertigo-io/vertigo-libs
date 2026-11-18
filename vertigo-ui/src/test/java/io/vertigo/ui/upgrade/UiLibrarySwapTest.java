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
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;
import java.util.Properties;

import org.junit.jupiter.api.Test;

/**
 * Library swap of the upgrade comparison : which libraries are swapped, and how their urls are rewritten.
 */
class UiLibrarySwapTest {
	private static final String NPM = "http://localhost:18080/test/vertigo-ui/static/3rdParty/cdn.jsdelivr.net/npm/";

	@Test
	void fromProperties() {
		final var properties = new Properties();
		assertEquals(List.of(), UiLibrarySwap.fromProperties(properties));

		properties.setProperty("quasar.candidate", "2.35.4");
		assertEquals(List.of(new UiLibrarySwap("quasar", "Quasar.version", "2.21.1", "2.35.4")), UiLibrarySwap.fromProperties(properties));

		properties.setProperty("vue.candidate", "3.5.45");
		properties.setProperty("vue.baseline", "3.5.39");
		assertEquals(List.of(
				new UiLibrarySwap("quasar", "Quasar.version", "2.21.1", "2.35.4"),
				new UiLibrarySwap("vue", "Vue.version", "3.5.39", "3.5.45")),
				UiLibrarySwap.fromProperties(properties));
	}

	@Test
	void missingBaselineIsTheOtherVendoredVersion() {
		final var properties = new Properties();
		properties.setProperty("axios.candidate", "1.18.1");
		assertEquals(List.of(new UiLibrarySwap("axios", "axios.VERSION", "1.21.1", "1.18.1")), UiLibrarySwap.fromProperties(properties));
	}

	@Test
	void rewritesAnyVendoredVersion() {
		final var quasar = new UiLibrarySwap("quasar", "Quasar.version", "2.21.1", "2.35.4");
		assertEquals(NPM + "quasar@2.35.4/dist/quasar.umd.prod.js", quasar.rewrite(NPM + "quasar@2.21.1/dist/quasar.umd.prod.js", "2.35.4"));
		assertEquals(NPM + "quasar@2.21.1/dist/quasar.css", quasar.rewrite(NPM + "quasar@2.35.4/dist/quasar.css", "2.21.1"));
		assertEquals(NPM + "vue@3.5.39/dist/vue.global.prod.js", quasar.rewrite(NPM + "vue@3.5.39/dist/vue.global.prod.js", "2.35.4"));
	}

	@Test
	void vueDsfr() {
		final var properties = new Properties();
		properties.setProperty("vue-dsfr.candidate", "8.22.0");
		properties.setProperty("vue-dsfr.baseline", "8.21.0");
		final var vueDsfr = new UiLibrarySwap("vue-dsfr", UiLibrarySwap.VUE_DSFR_VERSION_EXPRESSION, "8.21.0", "8.22.0");
		assertEquals(List.of(vueDsfr), UiLibrarySwap.fromProperties(properties));
		final String bundle = "http://localhost:18080/test/vertigo-ui/static/3rdParty/dsfr/vue-dsfr@8.21.0/vertigo-dsfr.umd.js?v=4.5.0";
		assertEquals(bundle.replace("8.21.0", "8.22.0"), vueDsfr.rewrite(bundle, "8.22.0"));
		// the vue swap leaves the vue-dsfr bundle
		assertEquals(bundle, new UiLibrarySwap("vue", "Vue.version", "3.5.39", "3.5.45").rewrite(bundle, "3.5.39"));
		// the bundle doesn't hold its vue-dsfr version : loaded (true) means the rewritten url was served
		assertEquals(Optional.empty(), vueDsfr.versionMismatch("dsfr", "8.22.0", Boolean.TRUE, true));
		assertEquals(Optional.of("dsfr : vue-dsfr not loaded instead of 8.22.0"), vueDsfr.versionMismatch("dsfr", "8.22.0", null, true));
	}

	@Test
	void versionMismatch() {
		final var quasar = new UiLibrarySwap("quasar", "Quasar.version", "2.21.1", "2.35.4");
		assertEquals(Optional.empty(), quasar.versionMismatch("movies", "2.35.4", "2.35.4", true));
		assertEquals(Optional.of("movies : quasar 2.21.1 instead of 2.35.4"), quasar.versionMismatch("movies", "2.35.4", "2.21.1", true));
		// requested but not loaded (the rewritten url answered 404 : version not vendored, or typo in the property)
		assertEquals(Optional.of("movies : quasar not loaded instead of 2.35.4"), quasar.versionMismatch("movies", "2.35.4", null, true));
		// not used by the page
		assertEquals(Optional.empty(), quasar.versionMismatch("my", "2.35.4", null, false));
	}

	@Test
	void externalUrls() {
		assertFalse(UiLibrarySwap.isExternal("http://localhost:18080/test/movies/"));
		assertFalse(UiLibrarySwap.isExternal(NPM + "quasar@2.35.4/dist/quasar.css"));
		assertTrue(UiLibrarySwap.isExternal("https://cdn.jsdelivr.net/npm/ol@10.4.0/dist/ol.js"));
		assertTrue(UiLibrarySwap.isExternal("https://m.media-amazon.com/images/x.jpg"));
		assertFalse(UiLibrarySwap.isExternal("data:image/png;base64,AAAA"));
	}
}
