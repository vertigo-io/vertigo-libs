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
package io.vertigo.datafactory.plugins.search.elasticsearch.rest;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import co.elastic.clients.elasticsearch.indices.IndexSettingsAnalysis;

/**
 * Checks the comparison between the analysis settings of an existing index and the expected ones (index settings dirty check at startup).
 */
public final class RestClientESSearchServicesPluginSettingsTest {

	private static IndexSettingsAnalysis analysis(final String analyzerName, final String... filters) {
		return IndexSettingsAnalysis.of(a -> a
				.analyzer(analyzerName, an -> an.custom(c -> c.tokenizer("standard").filter(java.util.List.of(filters))))
				.normalizer("sortable", n -> n.custom(c -> c.filter("lowercase", "asciifolding"))));
	}

	@Test
	public void testSameAnalysisIsNotDirty() {
		Assertions.assertFalse(RestClientESSearchServicesPlugin.isAnalysisDirty("idx", analysis("text_fr", "lowercase"), analysis("text_fr", "lowercase")));
	}

	@Test
	public void testMissingExpectedAnalyzerIsDirty() {
		//the config expects an analyzer the index doesn't have : index must be recreated
		Assertions.assertTrue(RestClientESSearchServicesPlugin.isAnalysisDirty("idx", analysis("text_fr", "lowercase"), analysis("text_en", "lowercase")));
	}

	@Test
	public void testChangedAnalyzerIsDirty() {
		//same analyzer name but different filters
		Assertions.assertTrue(RestClientESSearchServicesPlugin.isAnalysisDirty("idx", analysis("text_fr", "lowercase"), analysis("text_fr", "lowercase", "asciifolding")));
	}

	@Test
	public void testExtraAnalyzerOnIndexIsNotDirty() {
		//the index has more than expected : nothing missing, nothing changed
		final IndexSettingsAnalysis current = IndexSettingsAnalysis.of(a -> a
				.analyzer("text_fr", an -> an.custom(c -> c.tokenizer("standard").filter("lowercase")))
				.analyzer("text_en", an -> an.custom(c -> c.tokenizer("standard").filter("lowercase")))
				.normalizer("sortable", n -> n.custom(c -> c.filter("lowercase", "asciifolding"))));
		Assertions.assertFalse(RestClientESSearchServicesPlugin.isAnalysisDirty("idx", current, analysis("text_fr", "lowercase")));
	}

	@Test
	public void testNoCurrentAnalysisIsDirty() {
		Assertions.assertTrue(RestClientESSearchServicesPlugin.isAnalysisDirty("idx", null, analysis("text_fr", "lowercase")));
		Assertions.assertFalse(RestClientESSearchServicesPlugin.isAnalysisDirty("idx", analysis("text_fr", "lowercase"), null));
	}
}
