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

import org.thymeleaf.engine.AbstractTemplateHandler;
import org.thymeleaf.engine.ElementDefinition;
import org.thymeleaf.engine.HTMLElementDefinition;
import org.thymeleaf.model.IAttribute;
import org.thymeleaf.model.IModelFactory;
import org.thymeleaf.model.IOpenElementTag;
import org.thymeleaf.model.IStandaloneElementTag;
import org.thymeleaf.postprocessor.IPostProcessor;
import org.thymeleaf.postprocessor.PostProcessor;
import org.thymeleaf.templatemode.TemplateMode;

/**
 * Closes the self-closed custom elements, q-btn ... / and the like, left in the markup Thymeleaf is about to write out.
 *
 * Vertigo-ui templates are in-DOM templates : the browser parses them before Vue does. Per the HTML spec the trailing
 * slash of a start tag is ignored on anything but a void element, so a self-closed q-btn would stay open and everything
 * following it would become its content : an extended v-if scope, siblings swallowed as the component default slot.
 * This post-processor rewrites such a tag into an open/close pair, so the browser gets the markup the author meant to
 * write.
 *
 * Being a post-processor, it runs on the final model, once the vu: components have been expanded, so a tag brought in
 * by a component is handled too.
 *
 * Only elements whose name holds a dash are concerned (quasar q-*, Vue components, web components), minus the void
 * elements, for which the trailing slash is legal.
 *
 * @author skerdudou
 */
public final class AutoCloseTagsPostProcessor extends AbstractTemplateHandler {

	static final IPostProcessor POST_PROCESSOR = new PostProcessor(TemplateMode.HTML, AutoCloseTagsPostProcessor.class, VUiStandardDialect.PROCESSOR_PRECEDENCE);

	@Override
	public void handleStandaloneElement(final IStandaloneElementTag standaloneElementTag) {
		if (!isSwallowedByTheBrowser(standaloneElementTag)) {
			super.handleStandaloneElement(standaloneElementTag);
			return;
		}
		//---
		final IModelFactory modelFactory = getContext().getModelFactory();
		final String name = standaloneElementTag.getElementCompleteName();
		IOpenElementTag openElementTag = modelFactory.createOpenElementTag(name);
		for (final IAttribute attribute : standaloneElementTag.getAllAttributes()) {
			// the original quotes are kept : Thymeleaf writes attribute values verbatim, re-quoting could break the tag
			openElementTag = modelFactory.setAttribute(openElementTag, attribute.getAttributeCompleteName(), attribute.getValue(), attribute.getValueQuotes());
		}
		getNext().handleOpenElement(openElementTag);
		getNext().handleCloseElement(modelFactory.createCloseElementTag(name));
	}

	private static boolean isSwallowedByTheBrowser(final IStandaloneElementTag tag) {
		if (!tag.isMinimized()) {
			return false; // hr written without a slash : the parser reports it as standalone anyway, there is nothing to repair
		}
		if (tag.getElementCompleteName().indexOf('-') < 1) {
			return false; // only custom elements (q-btn, my-component) are concerned, to stay clear of false positives
		}
		// Names prefixed by a Thymeleaf dialect (vu-, th-, layout-) are deliberately NOT exempted. A post-processor runs
		// on the final model : every element a dialect knows has already been consumed by its processor, so a vu- still
		// standing here is a name no processor matched. It will be written out verbatim and the browser will read it as
		// an open tag, exactly like any other dashed element. Exempting it would leave in place the very symptoms this
		// class removes, on the templates that are hardest to diagnose : a v-if whose scope silently extends past the
		// tag, the following markup absorbed as a default slot, and not one error message anywhere.
		final ElementDefinition elementDefinition = tag.getElementDefinition();
		return !(elementDefinition instanceof final HTMLElementDefinition htmlElementDefinition)
				|| !htmlElementDefinition.getType().isVoid();
	}
}
