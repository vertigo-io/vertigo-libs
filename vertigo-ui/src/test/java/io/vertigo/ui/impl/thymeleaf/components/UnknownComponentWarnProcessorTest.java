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
package io.vertigo.ui.impl.thymeleaf.components;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.Test;
import org.thymeleaf.context.Context;
import org.thymeleaf.dialect.AbstractProcessorDialect;
import org.thymeleaf.processor.IProcessor;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templateresolver.StringTemplateResolver;

/**
 * A vu: element without component is logged once (by template and element), in dev mode.
 */
class UnknownComponentWarnProcessorTest {
	private static final String TEMPLATE = "<div><vu:known-component/><vu:dsfr-link/><vu:dsfr-link/></div>";

	@Test
	void unknownElementWarnedOnce() {
		final var processor = new UnknownComponentWarnProcessor("vu", Set.of("known-component"));
		final var engine = new SpringTemplateEngine(); // SpEL, as vertigo-ui
		engine.setTemplateResolver(new StringTemplateResolver());
		engine.addDialect(new AbstractProcessorDialect("test", "vu", 1000) {
			@Override
			public Set<IProcessor> getProcessors(final String dialectPrefix) {
				return Set.of(processor);
			}
		});
		// rendered twice : a page shown again warns no more
		engine.process(TEMPLATE, new Context());
		engine.process(TEMPLATE, new Context());

		assertFalse(processor.warnOnce(TEMPLATE, 1, "vu:dsfr-link"), "already warned by the rendering");
		assertTrue(processor.warnOnce(TEMPLATE, 1, "vu:known-component"), "a known component is never warned by the rendering");
		assertTrue(processor.warnOnce("other", 1, "vu:dsfr-link"), "warned once by template");
	}
}
