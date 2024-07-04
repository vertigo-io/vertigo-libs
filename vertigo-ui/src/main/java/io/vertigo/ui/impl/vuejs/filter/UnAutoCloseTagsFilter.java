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
package io.vertigo.ui.impl.vuejs.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import io.vertigo.vega.impl.servlet.filter.AbstractFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Un AutoClosed Vue.js tags filter.
 * Vue.js has some weird behavior with autoclosed tags, they aren't executed normally.
 * This filter detected autoclosed tags, warn them in logs and replace with a end tags.
 * @author npiedeloup
 */
public final class UnAutoCloseTagsFilter extends AbstractFilter {
	private final List<Pattern> tagsPrefixPattern = new ArrayList<>();

	/** {@inheritDoc} */
	@Override
	public void doInit() {
		final String[] tagsPrefix = parseParam("tagsPrefix", String.class, "q-*;v-*").split("\\s*;\\s*");
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
