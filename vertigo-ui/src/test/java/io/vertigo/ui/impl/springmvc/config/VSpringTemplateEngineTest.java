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
package io.vertigo.ui.impl.springmvc.config;

import java.util.Locale;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.context.support.StaticMessageSource;
import org.thymeleaf.context.Context;
import org.thymeleaf.messageresolver.StandardMessageResolver;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

/**
 * The messages of a page : the bundle next to its template (as the one of a component) and the MessageSource of the project.
 */
public final class VSpringTemplateEngineTest {

	@Test
	void withTheMessageSourceOfTheProjectTheBundleOfTheTemplateIsStillRead() {
		final StaticMessageSource projectMessageSource = new StaticMessageSource();
		projectMessageSource.addMessage("test.project", Locale.FRENCH, "project message");
		projectMessageSource.addMessage("test.redefined", Locale.FRENCH, "project message");

		final VSpringTemplateEngine templateEngine = newTemplateEngine();
		templateEngine.setTemplateEngineMessageSource(projectMessageSource);

		final String html = templateEngine.process("messages-page", new Context(Locale.FRENCH));

		Assertions.assertTrue(html.contains("<span id=\"component\">component message</span>"), html); // the bundle of the template
		Assertions.assertTrue(html.contains("<span id=\"redefined\">project message</span>"), html); // the project wins
		Assertions.assertTrue(html.contains("<span id=\"project\">project message</span>"), html);
	}

	@Test
	void withoutMessageSourceTheBundleOfTheTemplateIsReadOnce() {
		final VSpringTemplateEngine templateEngine = newTemplateEngine();

		final String html = templateEngine.process("messages-page", new Context(Locale.FRENCH));

		Assertions.assertTrue(html.contains("<span id=\"component\">component message</span>"), html);
		Assertions.assertEquals(1, templateEngine.getConfiguration().getMessageResolvers().stream()
				.filter(StandardMessageResolver.class::isInstance)
				.count());
	}

	private static VSpringTemplateEngine newTemplateEngine() {
		final VSpringTemplateEngine templateEngine = new VSpringTemplateEngine();
		final ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
		templateResolver.setPrefix("io/vertigo/ui/impl/springmvc/config/");
		templateResolver.setSuffix(".html");
		templateEngine.setTemplateResolver(templateResolver);
		return templateEngine;
	}
}
