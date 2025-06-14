/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.basics.constraint;

import java.util.Optional;
import java.util.regex.Pattern;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.datamodel.smarttype.definitions.Constraint;
import io.vertigo.datamodel.smarttype.definitions.DtProperty;
import io.vertigo.datamodel.smarttype.definitions.Property;

/**
 * Exemple de contrainte utilisant une expression régulière.
 *
 * @author pchretien
 */
public final class ConstraintRegex implements Constraint<String, String> {
	private final Pattern pattern;
	private final LocaleMessageText errorMessage;

	/**
	 * @param regex Expression régulière
	 */
	public ConstraintRegex(final String regex, final Optional<String> overrideMessageOpt, final Optional<String> overrideResourceMessageOpt) {
		Assertion.check()
				.isNotBlank(regex);
		//---
		pattern = Pattern.compile(regex);
		errorMessage = ConstraintUtil.resolveMessage(overrideMessageOpt, overrideResourceMessageOpt, Resources.DYNAMO_CONSTRAINT_REGEXP, pattern.pattern());
	}

	/** {@inheritDoc} */
	@Override
	public boolean checkConstraint(final String value) {
		return value == null
				|| pattern.matcher(value)
						.matches();
	}

	/** {@inheritDoc} */
	@Override
	public LocaleMessageText getErrorMessage() {
		return errorMessage;
	}

	/** {@inheritDoc} */
	@Override
	public Property getProperty() {
		return DtProperty.REGEX;
	}

	/** {@inheritDoc} */
	@Override
	public String getPropertyValue() {
		return pattern.pattern();
	}

	/**
	 * @return Expression régulière testée par la contrainte
	 */
	public String getRegex() {
		//regex ==>
		return pattern.pattern();
	}
}
