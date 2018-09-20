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

import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import org.attoparser.AbstractMarkupHandler;
import org.attoparser.MarkupParser;
import org.attoparser.ParseException;
import org.attoparser.config.ParseConfiguration;
import org.attoparser.dom.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.thymeleaf.templateresource.ITemplateResource;

public abstract class AbstractElementParser extends AbstractMarkupHandler {

	private static final Logger LOG = LoggerFactory.getLogger(AbstractElementParser.class);

	protected final String dialectPrefix;

	private List<Element> elements;
	private Element currentElement;

	public AbstractElementParser(final String dialectPrefix) {
		this.dialectPrefix = dialectPrefix;
	}

	protected List<Element> parseElements(final ITemplateResource templateResource) {
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

}
