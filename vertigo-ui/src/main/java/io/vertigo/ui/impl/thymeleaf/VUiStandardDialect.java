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

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.thymeleaf.dialect.AbstractProcessorDialect;
import org.thymeleaf.dialect.IExecutionAttributeDialect;
import org.thymeleaf.dialect.IPostProcessorDialect;
import org.thymeleaf.postprocessor.IPostProcessor;
import org.thymeleaf.processor.IProcessor;
import org.thymeleaf.standard.processor.StandardXmlNsTagProcessor;
import org.thymeleaf.templatemode.TemplateMode;

import io.vertigo.core.lang.Assertion;
import io.vertigo.ui.impl.thymeleaf.components.ContentComponentProcessor;
import io.vertigo.ui.impl.thymeleaf.components.ContentItemComponentProcessor;
import io.vertigo.ui.impl.thymeleaf.components.ContentSlotComponentProcessor;
import io.vertigo.ui.impl.thymeleaf.components.NamedComponentDefinition;
import io.vertigo.ui.impl.thymeleaf.components.NamedComponentElementProcessor;
import io.vertigo.ui.impl.thymeleaf.components.OnceAttributeTagProcessor;
import io.vertigo.ui.impl.thymeleaf.components.SlotAttributeTagProcessor;
import io.vertigo.ui.impl.thymeleaf.components.SlotComponentProcessor;
import io.vertigo.ui.impl.thymeleaf.components.VuiTextTagProcessor;
import io.vertigo.ui.impl.thymeleaf.components.VuiUTextTagProcessor;

public final class VUiStandardDialect extends AbstractProcessorDialect implements IPostProcessorDialect, IExecutionAttributeDialect {

	public static final String NAME = "VertigoStandard";
	public static final String PREFIX = "vu";
	public static final int PROCESSOR_PRECEDENCE = 2000;
	/** Elements closed by the AutoCloseTagsPostProcessor when self-closed : quasar, vertigo-ui, vui and vue-dsfr components. */
	public static final Set<String> DEFAULT_AUTO_CLOSE_TAGS_PREFIXES = Set.of("q-", "v-", "vui-", "dsfr-");
	static final String AUTO_CLOSE_TAGS_PREFIXES_ATTRIBUTE = NAME + ".autoCloseTagsPrefixes";

	// These variables will be initialized lazily following the model applied in the extended StandardDialect.
	private final Set<NamedComponentDefinition> components;
	private final Set<String> autoCloseTagsPrefixes;

	public VUiStandardDialect(final Set<NamedComponentDefinition> components) {
		this(PREFIX, components);
	}

	public VUiStandardDialect(final String prefix, final Set<NamedComponentDefinition> components) {
		this(prefix, components, DEFAULT_AUTO_CLOSE_TAGS_PREFIXES);
	}

	/**
	 * @param prefix Dialect prefix
	 * @param components Named components
	 * @param autoCloseTagsPrefixes Prefixes of the elements closed when self-closed (q-btn ... / becomes an open/close pair)
	 */
	public VUiStandardDialect(final String prefix, final Set<NamedComponentDefinition> components, final Set<String> autoCloseTagsPrefixes) {
		super(NAME, prefix, PROCESSOR_PRECEDENCE);
		Assertion.check()
				.isNotNull(components)
				.isNotNull(autoCloseTagsPrefixes);
		//---
		this.components = components;
		this.autoCloseTagsPrefixes = Set.copyOf(autoCloseTagsPrefixes);
	}

	@Override
	public Map<String, Object> getExecutionAttributes() {
		//read by the AutoCloseTagsPostProcessor, instantiated by Thymeleaf
		return Map.of(AUTO_CLOSE_TAGS_PREFIXES_ATTRIBUTE, autoCloseTagsPrefixes);
	}

	@Override
	public Set<IProcessor> getProcessors(final String dialectPrefix) {
		return createVUiStandardProcessorsSet(dialectPrefix);
	}

	@Override
	public int getDialectPostProcessorPrecedence() {
		return PROCESSOR_PRECEDENCE;
	}

	@Override
	public Set<IPostProcessor> getPostProcessors() {
		return Set.of(AutoCloseTagsPostProcessor.POST_PROCESSOR);
	}

	private Set<IProcessor> createVUiStandardProcessorsSet(final String dialectPrefix) {
		final Set<IProcessor> processors = new HashSet<>();
		processors.add(new StandardXmlNsTagProcessor(TemplateMode.HTML, dialectPrefix));
		processors.add(new OnceAttributeTagProcessor(dialectPrefix));
		processors.add(new ContentComponentProcessor(dialectPrefix));
		processors.add(new ContentItemComponentProcessor(dialectPrefix));
		processors.add(new SlotAttributeTagProcessor(dialectPrefix));
		processors.add(new SlotComponentProcessor(dialectPrefix));
		processors.add(new ContentSlotComponentProcessor(dialectPrefix));
		processors.add(new VuiTextTagProcessor(dialectPrefix));
		processors.add(new VuiUTextTagProcessor(dialectPrefix));

		//standard components
		for (final NamedComponentDefinition comp : components) {
			processors.add(new NamedComponentElementProcessor(dialectPrefix, comp));
		}
		return processors;

	}

}
