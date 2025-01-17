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
package io.vertigo.vega.impl.ratelimiting;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.param.ParamValue;
import io.vertigo.vega.ratelimiting.RateLimitingManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Filtre de limitation des appels par IP.
 *
 * @author npiedeloup
 */
public final class RateLimitingManagerImpl implements RateLimitingManager {

	private static final Logger LOG = LogManager.getLogger(RateLimitingManagerImpl.class);

	private static final String HEADER_RATE_LIMIT_LIMIT = "X-Rate-Limit-Limit"; //the rate limit ceiling for that given request
	private static final String HEADER_RATE_LIMIT_REMAINING = "X-Rate-Limit-Remaining"; //the number of requests left for the M minute window
	private static final String HEADER_RATE_LIMIT_RESET = "X-Rate-Limit-Reset"; //the remaining seconds before the rate limit resets

	public static final int DEFAULT_WINDOW_SECONDS = 5 * 60; //the time windows use to limit calls rate
	private static final long DEFAULT_MAX_REQUESTS_VALUE = 150; //the rate limit ceiling value
	private static final int DEFAULT_LOG_EVERY_X_REQUEST = 100; //limit how many logs
	private static final long DEFAULT_BANISH_SECONDS = 30 * 60; //Banish over raters seconds
	private static final double DEFAULT_BANISH_REPEATER_MULT = 2; //Banish mult for over raters repeaters
	public static final long DEFAULT_BANISH_MAX_SECONDS = 7 * 24 * 60 * 60; //Banish over raters seconds

	private enum OverRateLimitMode {
		nothing, //inactive rate limiting
		logOnly, //log over rate request
		reject, //reject over rate request
		banish //ban over rate request
	}

	private final int windowSeconds;
	private final long maxRequests;
	private final double maxRequestsPerMinutes;
	private final Optional<Long> maxDayRequests; //compute maximum requests per min over a whole day
	private final Optional<Double> maxDayRequestsPerMinutes;

	private final boolean insertHeaders;

	private final boolean useForwardedFor; //use x-forwarded-for
	private final boolean useUserIp; //use user IP or else session id

	private final int errorCode; //503:SC_SERVICE_UNAVAILABLE, 429:TOO_MANY_REQUESTS

	private final OverRateLimitMode overRateLimitMode;
	private final int logEveryXRequests; //limit how many logs
	private final long banishSeconds; //Banish seconds
	private final double banishRepeaterMult; //Banish mult for repeaters
	private final long maxBanishSeconds; //Max banish seconds
	private final String banishMessage; //Banish message
	private final Set<String> whiteListUsers;

	private final AnalyticsManager analyticsManager;
	private final RateLimitingStorePlugin rateLimitingStorePlugin;

	@Inject
	public RateLimitingManagerImpl(
			@ParamValue("windowSeconds") final Optional<Integer> windowSeconds,
			@ParamValue("maxRequests") final Optional<Long> maxRequests,
			@ParamValue("maxDayRequests") final Optional<Long> maxDayRequests,
			@ParamValue("errorCode") final Optional<Integer> errorCode,
			@ParamValue("overRateLimitMode") final Optional<String> overRateLimitMode,
			@ParamValue("insertHeaders") final Optional<Boolean> insertHeaders,
			@ParamValue("useForwardedFor") final Optional<Boolean> useForwardedFor,
			@ParamValue("useUserIp") final Optional<Boolean> useUserIp,
			@ParamValue("logEveryXRequests") final Optional<Integer> logEveryXRequests,
			@ParamValue("banishSeconds") final Optional<Long> banishSeconds,
			@ParamValue("banishRepeaterMult") final Optional<Double> banishRepeaterMult,
			@ParamValue("maxBanishSeconds") final Optional<Long> maxBanishSeconds,
			@ParamValue("banishMessage") final Optional<String> banishMessage,
			@ParamValue("whiteListUsers") final Optional<String> whiteListUsers,
			final RateLimitingStorePlugin rateLimitingStorePlugin,
			final AnalyticsManager analyticsManager) {
		this.rateLimitingStorePlugin = rateLimitingStorePlugin;
		this.analyticsManager = analyticsManager;

		Assertion.check()
				.isNotNull(windowSeconds)
				.isNotNull(maxRequests)
				.isNotNull(maxDayRequests)
				.isNotNull(insertHeaders)
				.when(maxDayRequests.isPresent(), () -> Assertion.check()
						.isTrue(maxDayRequests.get() >= maxRequests.orElse(DEFAULT_MAX_REQUESTS_VALUE),
								"maxDayRequests must be greater than maxRequests"));
		//-----
		this.windowSeconds = windowSeconds.orElse(DEFAULT_WINDOW_SECONDS);
		this.maxRequests = maxRequests.orElse(DEFAULT_MAX_REQUESTS_VALUE);
		this.maxDayRequests = maxDayRequests;
		this.errorCode = errorCode.orElse(429); //TOO_MANY_REQUESTS
		this.overRateLimitMode = OverRateLimitMode.valueOf(overRateLimitMode.orElse(OverRateLimitMode.reject.name()));

		this.insertHeaders = insertHeaders.orElse(true);
		this.useForwardedFor = useForwardedFor.orElse(false); //use x-forwarded-for
		this.useUserIp = useUserIp.orElse(true); //use user Ip, or else session id

		this.logEveryXRequests = logEveryXRequests.orElse(DEFAULT_LOG_EVERY_X_REQUEST); //limit how many logs
		this.banishSeconds = banishSeconds.orElse(DEFAULT_BANISH_SECONDS); //Banish seconds
		this.banishRepeaterMult = banishRepeaterMult.orElse(DEFAULT_BANISH_REPEATER_MULT); //Banish mult for repeaters
		this.maxBanishSeconds = maxBanishSeconds.orElse(DEFAULT_BANISH_MAX_SECONDS); //Max banish seconds

		maxRequestsPerMinutes = this.maxRequests * 60.0 / this.windowSeconds;
		maxDayRequestsPerMinutes = maxDayRequests.isPresent() ? Optional.of(this.maxDayRequests.get() * 60.0 / (24 * 60 * 60)) : Optional.empty();
		final var defaultBanishMessage = new StringBuilder().append(Math.round(maxRequestsPerMinutes * 10.0) / 10.0).append(" requests/min for short time");
		if (maxDayRequests.isPresent()) {
			defaultBanishMessage.append(", and ").append(Math.round(maxDayRequestsPerMinutes.get() * 10.0) / 10.0).append(" requests/min by day");
		}
		this.banishMessage = banishMessage.orElse(defaultBanishMessage.toString()); //Message returned if banished

		this.whiteListUsers = whiteListUsers.map(s -> Set.of(s.split("\\s*,\\s*"))).orElse(Set.of());
	}

	@Override
	public boolean isActive() {
		if (overRateLimitMode != OverRateLimitMode.nothing) { //fast bypass
			return true;
		}
		return false;
	}

	@Override
	public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
		if (overRateLimitMode == OverRateLimitMode.nothing) { //fast bypass
			return true;
		}
		final var userKey = obtainUserKey(request);
		if (whiteListUsers.contains(userKey)) { //fast bypass
			return true;
		}

		final var banishUntil = rateLimitingStorePlugin.getBanishInstant(userKey);
		final var now = Instant.now();
		if (banishUntil != null && now.isBefore(banishUntil)) {
			addHeaderBanish(response, banishUntil.getEpochSecond() - now.getEpochSecond());
			analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer.setTag("rateLimited", "banished"));
			response.sendError(errorCode, banishMessage);
			return false;
		}

		final var hits = rateLimitingStorePlugin.touch(userKey, 1, windowSeconds);
		final var remainingSeconds = insertHeaders ? rateLimitingStorePlugin.remainingSeconds(userKey) : 0;//if we dont insert headers, we dont need to compute remainingSeconds

		if (hits > maxRequests) {
			if (!overRateLimitExceeded(response, userKey, hits, remainingSeconds)) {
				return false;
			}
		}
		if (maxDayRequestsPerMinutes.isPresent()) { //if max daily rate is activated
			final double maxDayRequestsPerMinutesD = maxDayRequestsPerMinutes.get();

			final var countHitsFloor = (long) Math.ceil(maxDayRequestsPerMinutesD * windowSeconds / 60);
			if (hits >= countHitsFloor) { //for every window, if it exceeded maxDailyRate we update counter and trackTime
				final var dailyUserKey = userKey + "Daily";
				final long initialDailyWindow = 2 * windowSeconds;
				final var dailyHits = rateLimitingStorePlugin.touch(dailyUserKey, hits == countHitsFloor ? countHitsFloor : 1, initialDailyWindow);
				if (dailyHits > maxDayRequests.get()) {
					final var dailyRemainingSeconds = insertHeaders ? rateLimitingStorePlugin.remainingSeconds(dailyUserKey) : 0;//if we dont insert headers, we dont need to compute remainingSeconds
					if (!overRateLimitExceeded(response, userKey, dailyHits, dailyRemainingSeconds)) {
						return false;
					}
				}

				final var newDailyWindow = (long) Math.min(dailyHits * 60 / maxDayRequestsPerMinutesD, 24 * 60 * 60);
				if (newDailyWindow > initialDailyWindow //after the first window
						&& dailyHits % countHitsFloor == 0) { //every countHitsFloor, we check if we need to update window
					final var dailyAgeSeconds = rateLimitingStorePlugin.getFirstHitAgeSecond(dailyUserKey);
					final var currentRequestsPerMinute = dailyAgeSeconds > 0 ? dailyHits * 60.0 / dailyAgeSeconds : maxDayRequestsPerMinutesD;
					//we recompute TTL to wait if hitrate go down to daily rate
					if (currentRequestsPerMinute > maxDayRequestsPerMinutesD) { //if we are over maxDayRequestsPerMinutes, we extend window
						rateLimitingStorePlugin.extendsWindow(dailyUserKey, newDailyWindow - dailyAgeSeconds);//extend window to reach maxDayRequestsPerMinutes, max 24h
					}
				}
			}
		}
		addHeaderRemaining(response, hits, remainingSeconds, maxRequests);
		return true;
	}

	private boolean overRateLimitExceeded(final HttpServletResponse response, final String userKey, final long hits, final long remainingSeconds) throws IOException {
		return switch (overRateLimitMode) {
			case nothing -> true;
			case logOnly -> {
				logRateLimitExceeded(userKey, hits, maxRequests);
				analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
						.setMeasure("overLimitHits", hits)
						.setTag("rateLimited", "logOnly"));
				yield true;
			}
			case reject -> {
				logRateLimitExceeded(userKey, hits, maxRequests);
				addHeaderReject(response, remainingSeconds, maxRequests);
				analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
						.setMeasure("overLimitHits", hits)
						.setTag("rateLimited", "rejected"));
				response.sendError(errorCode);
				yield false;
			}
			case banish -> {
				final var banishForSeconds = banish(userKey);
				logRateLimitExceeded(userKey, hits, maxRequests);
				addHeaderBanish(response, banishForSeconds);
				analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
						.setMeasure("overLimitHits", hits)
						.setMeasure("banishedForSeconds", banishForSeconds)
						.setTag("rateLimited", "banish"));
				response.sendError(errorCode, banishMessage);
				yield false;
			}
			default -> throw new IllegalArgumentException("Unsupported overRateLimitMode " + overRateLimitMode);
		};
	}

	private void addHeaderRemaining(final HttpServletResponse response, final long hits, final long remainingSeconds, final long currentMaxRequests) {
		if (insertHeaders) {
			response.addHeader(HEADER_RATE_LIMIT_LIMIT, String.valueOf(currentMaxRequests));
			response.addHeader(HEADER_RATE_LIMIT_RESET, String.valueOf(remainingSeconds));
			response.addHeader(HEADER_RATE_LIMIT_REMAINING, String.valueOf(currentMaxRequests - hits));
		}
	}

	private void addHeaderReject(final HttpServletResponse response, final long remainingSeconds, final long currentMaxRequests) {
		if (insertHeaders) {
			response.addHeader(HEADER_RATE_LIMIT_LIMIT, String.valueOf(currentMaxRequests));
			response.addHeader(HEADER_RATE_LIMIT_RESET, String.valueOf(remainingSeconds));
		}
	}

	private void addHeaderBanish(final HttpServletResponse response, final long banishRemainingSeconds) {
		if (insertHeaders) {
			response.addHeader(HEADER_RATE_LIMIT_LIMIT, String.valueOf(banishMessage));
			response.addHeader(HEADER_RATE_LIMIT_RESET, String.valueOf(banishRemainingSeconds));
		}
	}

	private long banish(final String userKey) {
		final var banishCounter = rateLimitingStorePlugin.incrementBanishCounter(userKey, maxBanishSeconds);
		final var banishedForSeconds = Math.min(maxBanishSeconds, Math.round(banishSeconds * Math.pow(banishRepeaterMult, banishCounter - 1)));
		final var banishUntil = Instant.now().plusSeconds(banishedForSeconds);
		rateLimitingStorePlugin.banishUntil(userKey, banishUntil);
		return banishedForSeconds;
	}

	private void logRateLimitExceeded(final String userKey, final long hits, final long currentMaxRequests) {
		if (hits == currentMaxRequests + 1) {
			LOG.warn("Rate limit exceeded ({})", userKey);
		} else if ((hits - currentMaxRequests) % logEveryXRequests == 0) {
			LOG.info("Rate limit exceeded ({})", userKey);
		}
	}

	private String obtainUserKey(final HttpServletRequest request) {
		final var userIp = useUserIp ? obtainUserIp(request) : Optional.<String> empty();

		final var userSessionId = obtainSessionId(request);

		return userIp
				.orElseGet(() -> userSessionId
						.orElse("anonymous"));
	}

	private Optional<String> obtainUserIp(final HttpServletRequest request) {
		if (useForwardedFor) {
			final var ipEnumeration = request.getHeaders("X-Forwarded-For");
			if (ipEnumeration != null) {
				if (ipEnumeration.hasMoreElements()) {
					return Optional.of(ipEnumeration.nextElement().trim());
				}
			} //if no X-Forwarded-For : use remoteAddr
		}
		final var remoteAddr = request.getRemoteAddr();
		if (remoteAddr != null && !remoteAddr.isBlank()) {
			return Optional.of(remoteAddr);
		}
		return Optional.empty();
	}

	private Optional<String> obtainSessionId(final HttpServletRequest request) {
		final var session = request.getSession(false);
		if (session != null && !session.isNew()) {
			return Optional.of(session.getId());
		}
		return Optional.empty();
	}

	@Override
	public void cancelBanishment(final String userKey) {
		rateLimitingStorePlugin.cancelBanishment(userKey);
	}

	@Override
	public void cancelAllBanishments() {
		rateLimitingStorePlugin.cancelAllBanishments();
	}

	@Override
	public Map<String, Instant> getBanishments() {
		return rateLimitingStorePlugin.getBanishments();
	}

}
