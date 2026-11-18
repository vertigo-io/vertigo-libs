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

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.model.IProcessableElementTag;
import org.thymeleaf.processor.AbstractProcessor;
import org.thymeleaf.processor.element.IElementTagProcessor;
import org.thymeleaf.processor.element.IElementTagStructureHandler;
import org.thymeleaf.processor.element.MatchingAttributeName;
import org.thymeleaf.processor.element.MatchingElementName;
import org.thymeleaf.templatemode.TemplateMode;

import io.vertigo.core.lang.Assertion;

/**
 * Dev mode only : logs a vu: element without component, written as is and ignored by the browser (a component removed or
 * renamed, a typo). Once by template and element : the processors run at each rendering.
 *
 * @author npiedeloup
 */
public final class UnknownComponentWarnProcessor extends AbstractProcessor implements IElementTagProcessor {
	private static final Logger LOG = LogManager.getLogger(UnknownComponentWarnProcessor.class);
	/** After the other processors : it only reads the element. */
	private static final int PRECEDENCE = Integer.MAX_VALUE;
	/** Bounds the memory of the warnings already logged. */
	private static final int MAX_WARNINGS = 1000;

	private final MatchingElementName matchingElementName;
	private final Set<String> componentNames;
	private final Set<String> warnings = ConcurrentHashMap.newKeySet();

	/**
	 * @param dialectPrefix Dialect prefix (vu)
	 * @param componentNames Names of the elements of the dialect (components, content, slot...)
	 */
	public UnknownComponentWarnProcessor(final String dialectPrefix, final Set<String> componentNames) {
		super(TemplateMode.HTML, PRECEDENCE);
		Assertion.check()
				.isNotBlank(dialectPrefix)
				.isNotNull(componentNames);
		//---
		matchingElementName = MatchingElementName.forAllElementsWithPrefix(TemplateMode.HTML, dialectPrefix);
		this.componentNames = Set.copyOf(componentNames);
	}

	@Override
	public MatchingElementName getMatchingElementName() {
		return matchingElementName;
	}

	@Override
	public MatchingAttributeName getMatchingAttributeName() {
		return null;
	}

	@Override
	public void process(final ITemplateContext context, final IProcessableElementTag tag, final IElementTagStructureHandler structureHandler) {
		if (!componentNames.contains(tag.getElementDefinition().getElementName().getElementName())) {
			warnOnce(tag.getTemplateName(), tag.getLine(), tag.getElementCompleteName());
		}
	}

	/** @return true if logged, false if already logged for this template (or too many warnings) */
	boolean warnOnce(final String templateName, final int line, final String elementCompleteName) {
		if (warnings.size() >= MAX_WARNINGS || !warnings.add(templateName + ' ' + elementCompleteName)) {
			return false;
		}
		LOG.warn("Unknown Vertigo component <{}> in template '{}' line {} : written as is and ignored by the browser (component removed or renamed, typo ?)",
				elementCompleteName, templateName, line);
		return true;
	}
}
