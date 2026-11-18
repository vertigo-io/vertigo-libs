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
package io.vertigo.ui.impl.thymeleaf;

import java.util.Map;
import java.util.Set;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.thymeleaf.IEngineConfiguration;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.cache.AlwaysValidCacheEntryValidity;
import org.thymeleaf.cache.ICacheEntryValidity;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.AbstractTemplateResolver;
import org.thymeleaf.templateresource.ITemplateResource;
import org.thymeleaf.templateresource.StringTemplateResource;

/**
 * Templates are served in-DOM : the browser parses them itself and, per the HTML spec, ignores the trailing slash of a
 * self-closed tag on anything but a void element. A self-closed q-btn would therefore stay open in the DOM and swallow
 * everything that follows as its content (extended v-if scope, siblings turned into a default slot), Thymeleaf
 * rendering it back exactly as written.
 *
 * These tests pin the repair of that mistake on the model Thymeleaf is about to write out, i.e. after the vu:
 * components have been expanded.
 *
 * @author skerdudou
 */
class AutoCloseTagsPostProcessorTest {

	@Test
	void a_self_closed_custom_element_is_closed() {
		Assertions.assertEquals(
				"<div><q-btn label=\"ok\"></q-btn></div>",
				render(Map.of("page", "<div><q-btn label=\"ok\" /></div>")));
	}

	@Test
	void valueless_attributes_and_the_original_quotes_are_preserved() {
		// Thymeleaf writes attribute values verbatim : re-quoting a value that holds a double quote would break the tag
		Assertions.assertEquals(
				"<q-input dense v-model='a \"b\"'></q-input>",
				render(Map.of("page", "<q-input dense v-model='a \"b\"' />")));
	}

	@Test
	void the_attribute_order_is_preserved() {
		Assertions.assertEquals(
				"<q-btn a=\"1\" b=\"2\" c=\"3\"></q-btn>",
				render(Map.of("page", "<q-btn a=\"1\" b=\"2\" c=\"3\" />")));
	}

	@Test
	void an_attribute_value_holding_a_gt_is_no_obstacle() {
		// out of reach of a regex on the rendered html, which is why the deprecated UnAutoCloseTagsFilter misses it
		Assertions.assertEquals(
				"<q-btn :disable=\"[1,2].length > 5\"></q-btn>",
				render(Map.of("page", "<q-btn :disable=\"[1,2].length > 5\" />")));
	}

	@Test
	void a_tag_brought_by_an_included_fragment_is_closed_too() {
		Assertions.assertEquals(
				"<div><div><q-card></q-card></div></div>",
				render(Map.of(
						"page", "<div th:insert=\"~{component :: body}\"></div>",
						"component", "<div th:fragment=\"body\"><q-card /></div>")));
	}

	@Test
	void self_closed_void_elements_are_left_alone() {
		final String template = "<div><br /><hr /><input name=\"a\" /><img src=\"a.png\" /><meta charset=\"utf-8\" /></div>";

		Assertions.assertEquals(template, render(Map.of("page", template)));
	}

	@Test
	void paired_custom_elements_are_left_alone() {
		final String template = "<div><q-btn label=\"ok\"></q-btn></div>";

		Assertions.assertEquals(template, render(Map.of("page", template)));
	}

	@Test
	void the_default_whitelisted_prefixes_are_closed() {
		Assertions.assertEquals(
				"<div><v-chatbot></v-chatbot><vui-thing></vui-thing><dsfr-button></dsfr-button></div>",
				render(Map.of("page", "<div><v-chatbot /><vui-thing /><dsfr-button /></div>")));
	}

	@Test
	void custom_elements_out_of_the_whitelist_are_left_alone() {
		// a vu-unknown-component (vu: component no processor matched) included : out of the whitelist, written as it is
		final String template = "<div><my-widget /><vu-unknown-component /></div>";
		Assertions.assertEquals(template, render(Map.of("page", template)));
	}

	@Test
	void the_whitelist_can_be_overridden() {
		Assertions.assertEquals(
				"<div><my-widget></my-widget><q-btn /></div>",
				render(Map.of("page", "<div><my-widget /><q-btn /></div>"), Set.of("my-")));
	}

	private static String render(final Map<String, String> templates) {
		return render(templates, VUiStandardDialect.DEFAULT_AUTO_CLOSE_TAGS_PREFIXES);
	}

	private static String render(final Map<String, String> templates, final Set<String> autoCloseTagsPrefixes) {
		// SpringTemplateEngine, as in production : the plain TemplateEngine evaluates expressions with OGNL, which vertigo-ui does not ship
		final TemplateEngine templateEngine = new SpringTemplateEngine();
		templateEngine.setTemplateResolver(new MapTemplateResolver(templates));
		templateEngine.addDialect("vu", new VUiStandardDialect("vu", Set.of(), autoCloseTagsPrefixes));
		return templateEngine.process("page", new Context());
	}

	private static final class MapTemplateResolver extends AbstractTemplateResolver {
		private final Map<String, String> templates;

		MapTemplateResolver(final Map<String, String> templates) {
			this.templates = templates;
		}

		@Override
		protected ITemplateResource computeTemplateResource(
				final IEngineConfiguration configuration, final String ownerTemplate, final String template,
				final Map<String, Object> templateResolutionAttributes) {
			final String content = templates.get(template);
			Assertions.assertNotNull(content, () -> "Unknown template : " + template);
			return new StringTemplateResource(content);
		}

		@Override
		protected TemplateMode computeTemplateMode(
				final IEngineConfiguration configuration, final String ownerTemplate, final String template,
				final Map<String, Object> templateResolutionAttributes) {
			return TemplateMode.HTML;
		}

		@Override
		protected ICacheEntryValidity computeValidity(
				final IEngineConfiguration configuration, final String ownerTemplate, final String template,
				final Map<String, Object> templateResolutionAttributes) {
			return AlwaysValidCacheEntryValidity.INSTANCE;
		}
	}
}
