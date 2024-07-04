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
package io.vertigo.ui.impl.springmvc.config.interceptors;

import java.util.List;

import javax.inject.Inject;

import org.springframework.web.servlet.HandlerInterceptor;

import io.vertigo.core.util.InjectorUtil;
import io.vertigo.vega.ratelimiting.RateLimitingManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Spring Controllers Interceptor for RateLimiting.
 * @author npiedeloup
 */
public final class RateLimitingHandlerInterceptor implements HandlerInterceptor {

	@Inject
	private RateLimitingManager rateLimitingManager;

	private final List<String> urlPrefixes;

	public RateLimitingHandlerInterceptor(final List<String> urlPrefixes) {
		InjectorUtil.injectMembers(this);
		this.urlPrefixes = urlPrefixes;
	}

	protected static String getRequestUrl(final String context, final String requestUri) {
		String url = requestUri.substring(requestUri.indexOf(context) + context.length());
		if (url.contains(";")) { //pour les ;jsessionid qui ne doivent pas etre pris en compte par les patterns
			url = url.substring(0, url.indexOf(';'));
		}
		return url;
	}

	@Override
	public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) throws Exception {
		if (!rateLimitingManager.isActive()) { //fast bypass
			return true;
		}
		final String requestUrl = getRequestUrl(request.getContextPath(), request.getRequestURI());
		boolean requestRateLimited = false;
		for (final String urlPrefix : urlPrefixes) {
			if (requestUrl.startsWith(urlPrefix)) {
				requestRateLimited = true;
				break;
			}
		}
		if (!requestRateLimited) {
			return true;
		}

		return rateLimitingManager.preHandle(request, response);
	}
}
