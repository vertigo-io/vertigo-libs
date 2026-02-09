package io.vertigo.ui.impl.springmvc.config;

import java.io.Serializable;
import java.util.Arrays;

import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.messageresolver.IMessageResolver;

import io.vertigo.core.locale.LocaleMessageText;

/**
 * Resolves messages using Vertigo's localization mechanism.
 */
public final class VSpringMessageResolver implements IMessageResolver {

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
