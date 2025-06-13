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
package io.vertigo.ui.impl.springmvc.config;

import java.io.Serializable;
import java.util.Arrays;

import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.messageresolver.IMessageResolver;
import org.thymeleaf.spring6.SpringTemplateEngine;

import io.vertigo.core.locale.LocaleMessageText;

final class VSpringTemplateEngine extends SpringTemplateEngine {

	private static final class VSpringMessageResolver implements IMessageResolver {
		@Override
		public String resolveMessage(final ITemplateContext context, final Class<?> origin, final String key, final Object[] messageParameters) {
			final var messageParametersSerializable = Arrays.stream(messageParameters)
					.map(String::valueOf)
					.toArray(Serializable[]::new);

			return LocaleMessageText.of(() -> key, messageParametersSerializable).getDisplayOpt().orElse(null);
		}

		@Override
		public Integer getOrder() {
			return null; // after default resolver (which have null order)
		}

		@Override
		public String getName() {
			return "VSpringMessageResolver";
		}

		@Override
		public String createAbsentMessageRepresentation(final ITemplateContext context, final Class<?> origin, final String key, final Object[] messageParameters) {
			return LocaleMessageText.of(() -> key, messageParameters).toString();
		}
	}

	@Override
	protected void initializeSpringSpecific() {
		// add Vertigo LocalManager as secondary message resolver
		super.addMessageResolver(new VSpringMessageResolver());
	}
}
