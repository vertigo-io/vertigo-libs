/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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

import java.io.Serializable;
import java.util.Optional;
import java.util.function.Supplier;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.locale.LocaleMessageKey;
import io.vertigo.core.locale.LocaleMessageText;

/**
 * Utility functions for constraints handling.
 *
 * @author skerdudou
 */
public final class ConstraintUtil {

	/**
	 * Constructor.
	 */
	private ConstraintUtil() {
		//constructor is private
	}

	/**
	 * Resolve constraint error message based on annotation parameters and a default message.
	 * overrideMessageOpt and overrideResourceMessageOpt are exclusives.
	 *
	 * @deprecated Use resolveMessage with LocaleMessageKey and params...
	 * @param overrideMessageOpt Text error message
	 * @param overrideResourceMessageOpt Error ressource name (i18n)
	 * @param defaultMessageText Default message if other parameters are empty
	 * @return The MessageKey that will display to the user
	 */
	@Deprecated
	public static LocaleMessageText resolveMessage(final Optional<String> overrideMessageOpt, final Optional<String> overrideResourceMessageOpt, final Supplier<LocaleMessageText> defaultMessageText) {
		Assertion.check()
				.isNotNull(overrideMessageOpt)
				.isNotNull(overrideResourceMessageOpt)
				.isFalse(overrideMessageOpt.isPresent() && overrideResourceMessageOpt.isPresent(), "msg and resourceMsg must not be set together");
		//-----
		if (overrideMessageOpt.isPresent()) {
			return LocaleMessageText.of(overrideMessageOpt.get());
		} else if (overrideResourceMessageOpt.isPresent()) {
			return LocaleMessageText.of(() -> overrideResourceMessageOpt.get()); // lambda to MessageKey
		}
		return defaultMessageText.get();
	}

	/**
	 * Resolve constraint error message based on annotation parameters and a default message.
	 * overrideMessageOpt and overrideResourceMessageOpt are exclusives.
	 *
	 * @param overrideMessageOpt Text error message
	 * @param overrideResourceMessageOpt Error ressource name (i18n)
	 * @param defaultMessageText Default message if other parameters are empty
	 * @return The MessageKey that will display to the user
	 */
	public static LocaleMessageText resolveMessage(final Optional<String> overrideMessageOpt, final Optional<String> overrideResourceMessageOpt, final LocaleMessageKey defaultMessageKey,
			final Serializable... params) {
		Assertion.check()
				.isNotNull(overrideMessageOpt)
				.isNotNull(overrideResourceMessageOpt)
				.isFalse(overrideMessageOpt.isPresent() && overrideResourceMessageOpt.isPresent(), "msg and resourceMsg must not be set together");
		//-----
		if (overrideMessageOpt.isPresent()) {
			return LocaleMessageText.of(overrideMessageOpt.get(), params);
		} else if (overrideResourceMessageOpt.isPresent()) {
			return LocaleMessageText.of(() -> overrideResourceMessageOpt.get(), params); // lambda to MessageKey
		}
		return LocaleMessageText.of(defaultMessageKey, params);
	}
}
