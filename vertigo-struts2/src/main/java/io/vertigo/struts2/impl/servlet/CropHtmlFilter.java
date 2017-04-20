/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.struts2.impl.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.vertigo.lang.Assertion;
import io.vertigo.vega.impl.servlet.filter.AbstractFilter;

/**
 * Html cropper filter.
 * Use the (comma separated) elements ids found in the ${croppedIdsHeaderName} header, to crop the HTML produced.
 * Send to client, only these elements.
 * Param  ${cropInclusive} say if element is send or only its innerContent (true by default)
 * @author npiedeloup
 */
public final class CropHtmlFilter extends AbstractFilter {
	private String cropIdsHeaderName;
	private boolean cropInclusive = true;

	/** {@inheritDoc} */
	@Override
	public void doInit() {
		final FilterConfig filterConfig = getFilterConfig();
		cropIdsHeaderName = Optional.ofNullable(filterConfig.getInitParameter("cropIdsHeaderName")).orElse("x-request-target");
		final String cropInclusiveStr = filterConfig.getInitParameter("cropInclusive");
		if (cropInclusiveStr != null) {
			cropInclusive = Boolean.parseBoolean(cropInclusiveStr);
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
		final Set<String> headers = new HashSet<>(Collections.list(request.getHeaderNames()));
		if (headers.contains(cropIdsHeaderName)) {
			try (final CropHtmlServletResponseWrapper wrappedResponse = new CropHtmlServletResponseWrapper(response)) {
				boolean hasError = true;
				try {
					chain.doFilter(request, wrappedResponse);
					hasError = false;
					final Set<String> fragmentIds = new HashSet<>(Collections.list(request.getHeaders(cropIdsHeaderName)));
					final String croppedHtml = cropHtml(wrappedResponse.getAsString(), fragmentIds, cropInclusive);
					//text is already encoded by struts (content is already secure)
					response.getWriter().print(croppedHtml);
				} finally {
					if (hasError) {
						//text is already encoded by struts (content is already secure)
						response.getWriter().print(wrappedResponse.getAsString());
					}
				}
			}
		} else {
			chain.doFilter(request, response);
		}
	}

	private static String cropHtml(final String fullContent, final Set<String> fragmentIds, final boolean cropInclusive) {
		final List<String> result = new ArrayList<>();
		for (final String fragmentId : fragmentIds) {
			final Pattern pattern = Pattern.compile("<([a-z]+)\\s[^>]*id=['\"]" + fragmentId.substring(1) + "['\"][^>]*>");
			final Matcher matcher = pattern.matcher(fullContent);
			if (matcher.find()) {
				final int start = matcher.start();
				final int startTagEnd = matcher.end();
				final String tag = matcher.group(1);
				final int end = findEndTag(fullContent, start, tag, 0);
				final String elementContent;
				if (cropInclusive) {
					//Keep the found tag
					elementContent = fullContent.substring(start, end + 3 + tag.length());
				} else {
					//Exclude the found tag
					elementContent = fullContent.substring(startTagEnd, end);
				}
				result.add(elementContent);
			} else {
				throw new IllegalArgumentException("Can't find tag " + fragmentId + " in result");
			}
		}
		return result.stream()
				.collect(Collectors.joining(" "));
	}

	private static int findEndTag(final String temp, final int from, final String tag, final int deep) {
		int end = temp.indexOf("</" + tag + ">", from);
		Assertion.checkArgument(end > 0, "Cant find en tag {0} after position {1}", "</" + tag + ">", from);
		final int innerStart = temp.indexOf("<" + tag, from + 1 + tag.length());
		if (innerStart != -1 && innerStart < end) {
			final int innerEnd = findEndTag(temp, innerStart, tag, deep + 1);
			end = findEndTag(temp, innerEnd + 3 + tag.length(), tag, deep);
			Assertion.checkArgument(end > 0, "Cant find en tag {0} after position {1} (deep", "</" + tag + ">", from);
		}
		return end;
	}
}
