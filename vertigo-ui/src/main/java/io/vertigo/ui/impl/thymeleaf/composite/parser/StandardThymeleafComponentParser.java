/*
 * Copyright 2017, Danny Rottstegge
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.vertigo.ui.impl.thymeleaf.composite.parser;

import java.util.HashSet;
import java.util.Set;

import org.attoparser.dom.Element;
import org.thymeleaf.standard.StandardDialect;
import org.thymeleaf.templateresource.ITemplateResource;

import io.vertigo.ui.impl.thymeleaf.composite.model.ThymeleafComponent;

public class StandardThymeleafComponentParser extends AbstractElementParser
		implements IThymeleafComponentParser {

	protected static final String NAME_ATTRIBUTE = "selector";
	protected static final String FRAGMENT_ATTRIBUTE = "fragment";

	//private final String directory;
	//private final String templatePrefix;
	//private final String templateSuffix;

	private final VuiResourceTemplateResolver compositeResolver;
	//private final SpringTemplateEngine templateEngine;

	/**
	 * Constructor
	 * @param templatePrefix
	 *            Template prefix (e.g. templates/)
	 * @param templateSuffix
	 *            Template suffix (e.g. .html)
	 * @param directory
	 *            Subdirectory of param templatePrefix to find components in
	 *            (e.g. components)
	 */
	//	public StandardThymeleafComponentParser(
	//			final String dialectPrefix,
	//			final String templatePrefix,
	//			final String templateSuffix,
	//			final String directory) {
	//		super(dialectPrefix);
	//		this.directory = directory;
	//		this.templatePrefix = templatePrefix;
	//		this.templateSuffix = templateSuffix;
	//	}

	public StandardThymeleafComponentParser(final String dialectPrefix, final VuiResourceTemplateResolver compositeResolver) {
		super(dialectPrefix);
		this.compositeResolver = compositeResolver;
		//templateEngine = templateEngine;
	}

	@Override
	public Set<ThymeleafComponent> parseComposite(final String compositeName) {
		final Set<ThymeleafComponent> components = new HashSet<>();

		final ITemplateResource templateResource = compositeResolver.resolveResource("composites/" + compositeName);
		for (final Element element : parseElements(templateResource)) {
			if (isThymeleafComponent(element)) {
				components.add(createComponent(element, compositeName));
			}
		}
		return components;
	}

	//	@Override
	//	public Set<ThymeleafComponent> parse() {
	//		final Set<ThymeleafComponent> components = new HashSet<>();
	//
	//		compositeResolver.resolveTemplate(configuration, ownerTemplate, template, templateResolutionAttributes)
	//		for (final String file : new ResourcePathFinder(templatePrefix + directory)
	//				.findResourceFiles()) {
	//			for (final Element element : parseElements(file)) {
	//				if (isThymeleafComponent(element)) {
	//					components.add(createComponent(element, file));
	//				}
	//			}
	//		}
	//		return components;
	//	}

	private ThymeleafComponent createComponent(final Element element,
			final String compositeName) {

		String frag = getDynamicAttributeValue(element, StandardDialect.PREFIX,
				FRAGMENT_ATTRIBUTE);
		frag = frag.replaceAll("\\(.*\\)", "");

		String name = getDynamicAttributeValue(element, dialectPrefix,
				NAME_ATTRIBUTE);
		if (name == null) {
			name = frag;
		}

		return new ThymeleafComponent(name, "composites/" + compositeName + ".html" + " :: " + frag);
	}

	private boolean isThymeleafComponent(final Element element) {
		return hasDynamicAttribute(element, StandardDialect.PREFIX,
				FRAGMENT_ATTRIBUTE);
	}

	private boolean hasDynamicAttribute(final Element element, final String prefix,
			final String dynamicAttribute) {
		return element.hasAttribute("data-" + prefix + "-" + dynamicAttribute)
				|| element.hasAttribute(prefix + ":" + dynamicAttribute);
	}

	private String getDynamicAttributeValue(final Element element, final String prefix,
			final String dynamicAttribute) {
		final String value = element
				.getAttributeValue("data-" + prefix + "-" + dynamicAttribute);
		if (value != null) {
			return value;
		}
		return element.getAttributeValue(prefix + ":" + dynamicAttribute);
	}

}
