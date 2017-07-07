/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.struts2.impl.tags.div;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.components.ClosingUIBean;
import org.apache.struts2.views.annotations.StrutsTag;

import com.opensymphony.xwork2.util.ValueStack;

/**
 * <!-- START SNIPPET: javadoc -->
 * Creates an HTML &lt;div&gt;
 * <!-- END SNIPPET: javadoc -->
 *
 * Resurrect the Struts2 2.3.x DivTag.
 * It doesn't do anything, and we could it to specify division with a layout : table or grid
 * @author npiedeloup
 */
@StrutsTag(name = "div", tldTagClass = "io.vertigo.struts2.impl.tags.div.DivTag", description = "Render an HTML div", allowDynamicAttributes = true)
public final class Div extends ClosingUIBean {

	private static final String TEMPLATE = "div";
	private static final String TEMPLATE_CLOSE = "div-close";

	/**
	 * Constructor.
	 * @param stack ValueStack
	 * @param request Request
	 * @param response Response
	 */
	public Div(final ValueStack stack, final HttpServletRequest request, final HttpServletResponse response) {
		super(stack, request, response);
	}

	/** {@inheritDoc} */
	@Override
	public String getDefaultOpenTemplate() {
		return TEMPLATE;
	}

	/** {@inheritDoc} */
	@Override
	protected String getDefaultTemplate() {
		return TEMPLATE_CLOSE;
	}
}
