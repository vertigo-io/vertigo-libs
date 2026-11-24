/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.vega.impl.ratelimiting;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.lang.reflect.Proxy;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import io.vertigo.core.analytics.AnalyticsManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Rate limiting with the user IP read from the X-Forwarded-For header.
 * The header value comes from the network : it may be a proxy chain or a forged value, it must never fail the request.
 * In a proxy chain "client, proxy1, ...", the first address is the client one (the reverse proxy is responsible for the header reliability).
 */
public class RateLimitingManagerImplTest {
	private final List<String> countedUserKeys = new ArrayList<>();

	@Test
	void testForwardedForChainCountsTheClientIp() throws Exception {
		final RateLimitingManagerImpl rateLimitingManager = createRateLimitingManager(Optional.empty());
		assertTrue(rateLimitingManager.preHandle(request("203.0.113.5, 10.0.0.1"), response()));
		assertEquals(List.of("203.0.113.5"), countedUserKeys);
	}

	@Test
	void testForwardedForChainWithWhitelistedClient() throws Exception {
		final RateLimitingManagerImpl rateLimitingManager = createRateLimitingManager(Optional.of("203.0.113.5"));
		assertTrue(rateLimitingManager.preHandle(request("203.0.113.5, 10.0.0.1"), response()));
		assertEquals(List.of(), countedUserKeys); //whitelisted : never counted
	}

	@Test
	void testForwardedForChainWithOtherWhitelistedIp() throws Exception {
		final RateLimitingManagerImpl rateLimitingManager = createRateLimitingManager(Optional.of("198.51.100.7"));
		assertTrue(rateLimitingManager.preHandle(request("203.0.113.5, 10.0.0.1"), response()));
		assertEquals(List.of("203.0.113.5"), countedUserKeys);
	}

	@Test
	void testForgedForwardedForDoesNotFailTheRequest() throws Exception {
		final RateLimitingManagerImpl rateLimitingManager = createRateLimitingManager(Optional.of("203.0.113.5"));
		assertTrue(rateLimitingManager.preHandle(request("unknown-host.0.example.invalid"), response()));
		assertEquals(List.of("unknown-host.0.example.invalid"), countedUserKeys);
	}

	private RateLimitingManagerImpl createRateLimitingManager(final Optional<String> whiteListUsers) {
		return new RateLimitingManagerImpl(
				Optional.empty(), // windowSeconds
				Optional.empty(), // maxRequests
				Optional.empty(), // maxDayRequests
				Optional.empty(), // errorCode
				Optional.empty(), // overRateLimitMode : reject
				Optional.empty(), // insertHeaders
				Optional.of(true), // useForwardedFor
				Optional.empty(), // useHeaderUserIp
				Optional.empty(), // useUserIp
				Optional.empty(), // logEveryXRequests
				Optional.empty(), // banishSeconds
				Optional.empty(), // banishRepeaterMult
				Optional.empty(), // maxBanishSeconds
				Optional.empty(), // banishMessage
				whiteListUsers,
				storePlugin(),
				stub(AnalyticsManager.class));
	}

	/** Store recording the counted user keys : first hit of the window, never banished. */
	private RateLimitingStorePlugin storePlugin() {
		return (RateLimitingStorePlugin) Proxy.newProxyInstance(RateLimitingManagerImplTest.class.getClassLoader(), new Class<?>[] { RateLimitingStorePlugin.class },
				(proxy, method, args) -> {
					if ("touch".equals(method.getName())) {
						countedUserKeys.add((String) args[0]);
						return 1L;
					}
					return defaultValue(method.getReturnType());
				});
	}

	private static HttpServletRequest request(final String forwardedFor) {
		return (HttpServletRequest) Proxy.newProxyInstance(RateLimitingManagerImplTest.class.getClassLoader(), new Class<?>[] { HttpServletRequest.class },
				(proxy, method, args) -> switch (method.getName()) {
					case "getHeaders" -> "X-Forwarded-For".equalsIgnoreCase((String) args[0])
							? Collections.enumeration(List.of(forwardedFor))
							: Collections.emptyEnumeration();
					case "getHeader" -> "X-Forwarded-For".equalsIgnoreCase((String) args[0]) ? forwardedFor : null;
					case "getRemoteAddr" -> "10.0.0.1";
					default -> defaultValue(method.getReturnType());
				});
	}

	private static HttpServletResponse response() {
		return stub(HttpServletResponse.class);
	}

	/** A stub returning neutral values : null objects, empty Optional, 0 for numbers, false. */
	private static <T> T stub(final Class<T> type) {
		return type.cast(Proxy.newProxyInstance(RateLimitingManagerImplTest.class.getClassLoader(), new Class<?>[] { type },
				(proxy, method, args) -> defaultValue(method.getReturnType())));
	}

	private static Object defaultValue(final Class<?> returnType) {
		if (returnType == Optional.class) {
			return Optional.empty();
		} else if (returnType == boolean.class) {
			return false;
		} else if (returnType == long.class) {
			return 0L;
		} else if (returnType == int.class) {
			return 0;
		} else if (returnType == double.class) {
			return 0d;
		}
		return null;
	}
}
