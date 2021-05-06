package io.vertigo.ui.impl.springmvc.config;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.LocaleResolver;

import io.vertigo.core.locale.LocaleManager;
import io.vertigo.core.node.Node;

public class VertigoLocaleResolver implements LocaleResolver {

	@Override
	public Locale resolveLocale(final HttpServletRequest request) {
		return Node.getNode().getComponentSpace().resolve(LocaleManager.class).getCurrentLocale();
	}

	@Override
	public void setLocale(final HttpServletRequest request, final HttpServletResponse response, final Locale locale) {
		// the locale is not set this way. Generally via the Vertigo UserSession Object dedicated to the project
	}

}
