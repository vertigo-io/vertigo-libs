/*
 * =============================================================================
 *
 *   Copyright (c) 2011-2016, The THYMELEAF team (http://www.thymeleaf.org)
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 * =============================================================================
 */
package io.vertigo.ui.impl.thymeleaf;

import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.model.IProcessableElementTag;
import org.thymeleaf.processor.element.AbstractElementTagProcessor;
import org.thymeleaf.processor.element.IElementTagStructureHandler;
import org.thymeleaf.templatemode.TemplateMode;

public final class VUiFieldProcessor extends AbstractElementTagProcessor {
	public static final String NAME = "VertigoStandard";
	public static final String PREFIX = "vu";
	public static final int PROCESSOR_PRECEDENCE = 2000;

	public VUiFieldProcessor(final TemplateMode templateMode, final String dialectPrefix, final String elementName, final boolean prefixElementName, final String attributeName, final boolean prefixAttributeName, final int precedence) {
		super(templateMode, dialectPrefix, elementName, prefixElementName, attributeName, prefixAttributeName, precedence);
	}

	public VUiFieldProcessor(final String dialectPrefix) {
		super(TemplateMode.HTML, dialectPrefix, "field", false, null, false, PROCESSOR_PRECEDENCE);
	}

	@Override
	protected void doProcess(final ITemplateContext context, final IProcessableElementTag tag, final IElementTagStructureHandler structureHandler) {
		final String fieldName = tag.getAttributeValue("field");
		structureHandler.replaceWith("<input type\"text\" name=\"" + fieldName + "\" value=\"" + fieldName + "\" />", false);

	}

}
