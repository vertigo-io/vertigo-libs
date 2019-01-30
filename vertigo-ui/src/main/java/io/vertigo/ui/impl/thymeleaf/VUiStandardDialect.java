/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.thymeleaf.dialect.AbstractProcessorDialect;
import org.thymeleaf.processor.IProcessor;

import io.vertigo.lang.Assertion;
import io.vertigo.ui.impl.thymeleaf.components.ComponentContentSlotProcessor;
import io.vertigo.ui.impl.thymeleaf.components.ComponentSlotAttributeTagProcessor;
import io.vertigo.ui.impl.thymeleaf.components.ComponentSlotProcessor;
import io.vertigo.ui.impl.thymeleaf.components.OnceAttributeTagProcessor;
import io.vertigo.ui.impl.thymeleaf.components.ThymeleafComponent;
import io.vertigo.ui.impl.thymeleaf.components.ThymeleafComponentContentItemProcessor;
import io.vertigo.ui.impl.thymeleaf.components.ThymeleafComponentNamedElementProcessor;
import io.vertigo.ui.impl.thymeleaf.components.ThymeleafComponentParser;

public final class VUiStandardDialect extends AbstractProcessorDialect {

	public static final String NAME = "VertigoStandard";
	public static final String PREFIX = "vu";
	public static final int PROCESSOR_PRECEDENCE = 2000;

	// These variables will be initialized lazily following the model applied in the extended StandardDialect.
	private final Set<ThymeleafComponent> components;
	private final List<ThymeleafComponentParser> parsers = new ArrayList<>();

	public VUiStandardDialect(final Set<ThymeleafComponent> components) {
		super(NAME, PREFIX, PROCESSOR_PRECEDENCE);
		Assertion.checkNotNull(components);
		//---
		this.components = components;
	}

	@Override
	public Set<IProcessor> getProcessors(final String dialectPrefix) {
		return createVUiStandardProcessorsSet(dialectPrefix);
	}

	private Set<IProcessor> createVUiStandardProcessorsSet(final String dialectPrefix) {
		final Set<IProcessor> processors = new HashSet<>();
		processors.add(new OnceAttributeTagProcessor(dialectPrefix));
		processors.add(new ThymeleafComponentContentItemProcessor(dialectPrefix));
		processors.add(new ComponentSlotAttributeTagProcessor(dialectPrefix));
		processors.add(new ComponentSlotProcessor(dialectPrefix));
		processors.add(new ComponentContentSlotProcessor(dialectPrefix));

		//standard components
		for (final ThymeleafComponent comp : components) {
			processors.add(new ThymeleafComponentNamedElementProcessor(dialectPrefix, comp));
		}

		//additionalComponents
		for (final ThymeleafComponent comp : parseComponents()) {
			processors.add(new ThymeleafComponentNamedElementProcessor(dialectPrefix, comp));
		}

		return processors;

	}

	/**
	 * Get components from parsers
	 * @return Thymeleaf components
	 */
	private Set<ThymeleafComponent> parseComponents() {
		final Set<ThymeleafComponent> parsedComponents = new HashSet<>();
		//TODO autodetect components
		return parsedComponents;
	}

	/**
	 * Add parser to the list of parsers
	 *
	 * @param parser Thymeleaf component parser
	 */
	public void addParser(final ThymeleafComponentParser parser) {
		parsers.add(parser);
	}

}
