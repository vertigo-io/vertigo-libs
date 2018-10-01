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

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.thymeleaf.standard.expression.VariableExpression;

import io.vertigo.lang.Assertion;

public class ThymeleafComponent {

	private String name;
	private String fragmentTemplate;
	private final Optional<VariableExpression> selectionExpression;
	private final Set<String> parameters;
	private final String frag;

	public ThymeleafComponent(final String name, final String fragmentTemplate, final String selectionExpression, final Optional<String> parameters, final String frag) {
		Assertion.checkArgNotEmpty(name);
		Assertion.checkArgNotEmpty(fragmentTemplate);
		Assertion.checkArgNotEmpty(selectionExpression);
		Assertion.checkArgument(selectionExpression.startsWith("${") && selectionExpression.endsWith("}"), "Component {0} selector expression must starts with $\\{ and ends with \\} ({1})", name, selectionExpression);
		Assertion.checkArgNotEmpty(frag);
		//-----
		this.name = name;
		this.fragmentTemplate = fragmentTemplate;
		final String trimmedSelectionExpression = selectionExpression.substring(2, selectionExpression.length() - 1);
		this.selectionExpression = Optional.of(new VariableExpression(trimmedSelectionExpression));
		this.parameters = splitAsSet(parameters);
		this.frag = frag;
	}

	public ThymeleafComponent(final String name, final String fragmentTemplate, final Optional<String> parameters, final String frag) {
		Assertion.checkArgNotEmpty(name);
		Assertion.checkArgNotEmpty(fragmentTemplate);
		Assertion.checkArgNotEmpty(frag);
		//-----
		this.name = name;
		this.fragmentTemplate = fragmentTemplate;
		selectionExpression = Optional.empty();
		this.parameters = splitAsSet(parameters);
		this.frag = frag;
	}

	private Set<String> splitAsSet(final Optional<String> parameters) {
		if (parameters.isPresent()) {
			return new HashSet<>(Arrays.asList(parameters.get().split("\\s*,\\s*")));
		}
		return Collections.emptySet();
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

	public Optional<VariableExpression> getSelectionExpression() {
		return selectionExpression;
	}

	public Set<String> getParameters() {
		return parameters;
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
		return "Component [name=" + name + ", fragmentTemplate=" + fragmentTemplate + "]";
	}

}
