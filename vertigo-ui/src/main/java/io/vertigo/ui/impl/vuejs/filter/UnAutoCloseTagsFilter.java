package io.vertigo.ui.impl.vuejs.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.vertigo.vega.impl.servlet.filter.AbstractFilter;

/**
 * Un AutoClosed Vue.js tags filter.
 * Vue.js has some weird behavior with autoclosed tags, they aren't executed normally.
 * This filter detected autoclosed tags, warn them in logs and replace with a end tags.
 * @author npiedeloup
 */
public final class UnAutoCloseTagsFilter extends AbstractFilter {
	private String[] tagsPrefix;
	private final List<Pattern> tagsPrefixPattern = new ArrayList<>();

	/** {@inheritDoc} */
	@Override
	public void doInit() {
		final FilterConfig filterConfig = getFilterConfig();
		tagsPrefix = Optional.ofNullable(filterConfig.getInitParameter("tagsPrefix")).orElse("q-*;v-*").split("\\s*;\\s*");
		for (final String tagPrefix : tagsPrefix) {
			final String preprocessedTagPrefix = tagPrefix.replace("*", "[^>\\s]+");
			tagsPrefixPattern.add(Pattern.compile("<(" + preprocessedTagPrefix + ")(\\s[^>]*)?/>"));
		}
	}

	@Override
	public void doMyFilter(final ServletRequest req, final ServletResponse res, final FilterChain chain) throws IOException, ServletException {
		if (!(req instanceof HttpServletRequest) || !(res instanceof HttpServletResponse)) {
			chain.doFilter(req, res);
			return;
		}

		final HttpServletRequest request = (HttpServletRequest) req;
		final HttpServletResponse response = (HttpServletResponse) res;
		try (final UnAutoCloseTagsServletResponseWrapper wrappedResponse = new UnAutoCloseTagsServletResponseWrapper(response)) {
			try {
				chain.doFilter(request, wrappedResponse);
			} finally {
				//with or without error we escape autoclosed tags
				final String proceedHtml = proceed(wrappedResponse.getAsString(), tagsPrefixPattern);
				response.getWriter().print(proceedHtml);
			}
		}
	}

	private static String proceed(final String fullContent, final List<Pattern> tagsPrefixPattern) {
		String newContent = fullContent;
		for (final Pattern tagPrefixPattern : tagsPrefixPattern) {
			final Matcher matcher = tagPrefixPattern.matcher(newContent);
			newContent = matcher.replaceAll("<$1$2></$1>");
		}
		return newContent;
	}

}