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
package io.vertigo.vega.ratelimiting;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;

import io.vertigo.core.node.component.Manager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Manager of Rate limiting.
 * @author npiedeloup
 */
public interface RateLimitingManager extends Manager {

	/**
	 * @return true if rateLimiting is active (for fast by-pass)
	 */
	boolean isActive();

	/**
	 * Prehandle request.
	 * @param request HttpRequest
	 * @param response HttpResponse
	 * @return true if request should be managed, false to stop response
	 * @throws IOException
	 */
	boolean preHandle(final HttpServletRequest request, final HttpServletResponse response) throws IOException;

	/**
	 * Cancel banishment of a userkey.
	 * @param userKey user key to reset
	 */
	void cancelBanishment(String userKey);

	/**
	 * Cancel all banishments.
	 */
	void cancelAllBanishments();

	/**
	 * @return current banished userKey
	 */
	Map<String, Instant> getBanishments();

}
