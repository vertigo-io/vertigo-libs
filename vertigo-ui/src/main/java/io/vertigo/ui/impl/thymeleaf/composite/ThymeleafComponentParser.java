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

package io.vertigo.ui.impl.thymeleaf.composite;

import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.attoparser.AbstractMarkupHandler;
import org.attoparser.MarkupParser;
import org.attoparser.ParseException;
import org.attoparser.config.ParseConfiguration;
import org.attoparser.dom.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.thymeleaf.standard.StandardDialect;
import org.thymeleaf.templateresource.ITemplateResource;

public class ThymeleafComponentParser extends AbstractMarkupHandler {

	private static final Logger LOG = LoggerFactory.getLogger(ThymeleafComponentParser.class);

	protected static final String NAME_ATTRIBUTE = "alias";
	protected static final String SELECTOR_ATTRIBUTE = "selector";
	protected static final String FRAGMENT_ATTRIBUTE = "fragment";

	private final VuiResourceTemplateResolver compositeResolver;

	protected final String dialectPrefix;

	private List<Element> elements;
	private Element currentElement;

	public ThymeleafComponentParser(final String dialectPrefix, final VuiResourceTemplateResolver compositeResolver) {
		this.dialectPrefix = dialectPrefix;
		this.compositeResolver = compositeResolver;
	}

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

	@Override
	public void handleAttribute(final char[] buffer, final int nameOffset, final int nameLen,
			final int nameLine, final int nameCol, final int operatorOffset, final int operatorLen,
			final int operatorLine, final int operatorCol, final int valueContentOffset,
			final int valueContentLen, final int valueOuterOffset, final int valueOuterLen,
			final int valueLine, final int valueCol) throws ParseException {
		final String attributeName = new String(buffer, nameOffset, nameLen);
		final String attributeValue = new String(buffer, valueContentOffset, valueContentLen);
		if (currentElement != null) {
			currentElement.addAttribute(attributeName, attributeValue);
		}
	}

	@Override
	public void handleOpenElementStart(final char[] buffer, final int nameOffset,
			final int nameLen, final int line, final int col) throws ParseException {
		final String attributeName = new String(buffer, nameOffset, nameLen);
		currentElement = new Element(attributeName);
		elements.add(currentElement);
	}

	private List<Element> parseElements(final ITemplateResource templateResource) {
		elements = new ArrayList<>();

		try (Reader reader = templateResource.reader()) {
			final ParseConfiguration config = ParseConfiguration.htmlConfiguration();

			final ParseConfiguration autoCloseConfig = ParseConfiguration.htmlConfiguration();
			autoCloseConfig.setElementBalancing(
					ParseConfiguration.ElementBalancing.AUTO_OPEN_CLOSE);

			final MarkupParser htmlStandardParser = new MarkupParser(config);
			htmlStandardParser.parse(reader, this);

		} catch (IOException | ParseException e) {
			LOG.error("Error while parsing elements: {}", e);
		}

		return elements;
	}

	private ThymeleafComponent createComponent(final Element element, final String compositeName) {

		String frag = getDynamicAttributeValue(element, StandardDialect.PREFIX, FRAGMENT_ATTRIBUTE);
		frag = frag.replaceAll("\\(.*\\)", "");

		String name = getDynamicAttributeValue(element, dialectPrefix, NAME_ATTRIBUTE);
		if (name == null) {
			name = frag;
		}

		final String selector = getDynamicAttributeValue(element, dialectPrefix, SELECTOR_ATTRIBUTE);
		final String selectionExpression;
		if (selector != null && !selector.isEmpty()) {
			//frag = "((" + selector + ")?'" + frag + "':~{})";
			selectionExpression = selector; //if selector is true display the corresponding fragment otherwise the empty one
		} else {
			selectionExpression = "${true}";
		}

		return new ThymeleafComponent(name, "composites/" + compositeName + ".html", selectionExpression, frag);
	}

	private static boolean isThymeleafComponent(final Element element) {
		return hasDynamicAttribute(element, StandardDialect.PREFIX, FRAGMENT_ATTRIBUTE);
	}

	private static boolean hasDynamicAttribute(final Element element, final String prefix, final String dynamicAttribute) {
		return element.hasAttribute("data-" + prefix + "-" + dynamicAttribute)
				|| element.hasAttribute(prefix + ":" + dynamicAttribute);
	}

	private static String getDynamicAttributeValue(final Element element, final String prefix, final String dynamicAttribute) {
		final String value = element.getAttributeValue("data-" + prefix + "-" + dynamicAttribute);
		if (value != null) {
			return value;
		}
		return element.getAttributeValue(prefix + ":" + dynamicAttribute);
	}

}
