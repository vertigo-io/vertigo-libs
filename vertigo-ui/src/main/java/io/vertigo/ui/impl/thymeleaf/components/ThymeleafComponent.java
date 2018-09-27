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

package io.vertigo.ui.impl.thymeleaf.components;

public class ThymeleafComponent {

	private String name;
	private String fragmentTemplate;
	private final String selectionExpression;
	private final String frag;

	public ThymeleafComponent(final String name, final String fragmentTemplate, final String selectionExpression, final String frag) {
		this.name = name;
		this.fragmentTemplate = fragmentTemplate;
		this.selectionExpression = selectionExpression;
		this.frag = frag;
	}

	/**
	 * Returns the name of the component (e.g. panel)
	 *
	 * @return Component name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Sets the name of the component (e.g. panel). This will be uses as the
	 * selector in the html file like.
	 *
	 * @param name
	 *            Component name
	 */
	public void setName(final String name) {
		this.name = name;
	}

	/**
	 * Returns the thymeleaf fragment template
	 *
	 * @return Fragment template
	 */
	public String getFragmentTemplate() {
		return fragmentTemplate;
	}

	public String getSelectionExpression() {
		return selectionExpression;
	}

	public String getFrag() {
		return frag;
	}

	/**
	 * Sets the thymeleaf fragment template (e.g components/panel :: panel). The
	 * pattern is without the fragments parameters, so 'components/panel ::
	 * panel(title)' will throw an error.
	 *
	 * @param fragmentTemplate
	 *            Fragment template
	 */
	public void setFragmentTemplate(final String fragmentTemplate) {
		this.fragmentTemplate = fragmentTemplate;
	}

	@Override
	public String toString() {
		return "Component [name=" + name + ", fragmentTemplate="
				+ fragmentTemplate + "]";
	}

}
