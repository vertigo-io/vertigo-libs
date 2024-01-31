package io.vertigo.ui.impl.springmvc.config;

import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.messageresolver.IMessageResolver;
import org.thymeleaf.spring6.SpringTemplateEngine;

import io.vertigo.core.locale.LocaleMessageText;

final class VSpringTemplateEngine extends SpringTemplateEngine {

	private static final class VSpringMessageResolver implements IMessageResolver {
		@Override
		public String resolveMessage(final ITemplateContext context, final Class<?> origin, final String key, final Object[] messageParameters) {
			return LocaleMessageText.of(() -> key, messageParameters).getDisplay();
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
			return null; // getDisplay already return "panic message" if not found
		}
	}

	@Override
	protected void initializeSpringSpecific() {
		// add Vertigo LocalManager as secondary message resolver
		super.addMessageResolver(new VSpringMessageResolver());
	}
}
