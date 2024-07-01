package io.vertigo.vega.impl.ratelimiting;

import java.io.IOException;
import java.time.Instant;
import java.util.Enumeration;
import java.util.Map;
import java.util.Optional;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.param.ParamValue;
import io.vertigo.vega.ratelimiting.RateLimitingManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

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

	private final boolean insertHeaders;

	private final boolean useForwardedFor; //use x-forwarded-for
	private final boolean useUserIp; //use user IP or else session id

	private final int errorCode; //503:SC_SERVICE_UNAVAILABLE, 429:TOO_MANY_REQUESTS

	private final OverRateLimitMode overRateLimitMode;
	private int logEveryXRequests = 50; //limit how many logs
	private long banishSeconds = 60 * 60; //Banish seconds
	private double banishRepeaterMult = 2; //Banish mult for repeaters
	private long maxBanishSeconds = 7 * 24 * 60 * 60; //Max banish seconds
	private String banishMessage = "1 request/min"; //Banish message

	private final AnalyticsManager analyticsManager;
	private final RateLimitingStorePlugin rateLimitingStorePlugin;

	@Inject
	public RateLimitingManagerImpl(@ParamValue("windowSeconds") final Optional<Integer> windowSeconds,
			@ParamValue("maxRequests") final Optional<Long> maxRequests,
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
			final RateLimitingStorePlugin rateLimitingStorePlugin,
			final AnalyticsManager analyticsManager) {
		this.rateLimitingStorePlugin = rateLimitingStorePlugin;
		this.analyticsManager = analyticsManager;

		Assertion.check()
				.isNotNull(windowSeconds)
				.isNotNull(maxRequests)
				.isNotNull(insertHeaders);
		//-----
		this.windowSeconds = windowSeconds.orElse(DEFAULT_WINDOW_SECONDS);
		this.maxRequests = maxRequests.orElse(DEFAULT_MAX_REQUESTS_VALUE);
		this.errorCode = errorCode.orElse(429); //TOO_MANY_REQUESTS
		this.overRateLimitMode = OverRateLimitMode.valueOf(overRateLimitMode.orElse(OverRateLimitMode.reject.name()));

		this.insertHeaders = insertHeaders.orElse(true);
		this.useForwardedFor = useForwardedFor.orElse(false); //use x-forwarded-for
		this.useUserIp = useUserIp.orElse(true); //use user Ip, or else session id

		this.logEveryXRequests = logEveryXRequests.orElse(DEFAULT_LOG_EVERY_X_REQUEST); //limit how many logs
		this.banishSeconds = banishSeconds.orElse(DEFAULT_BANISH_SECONDS); //Banish seconds
		this.banishRepeaterMult = banishRepeaterMult.orElse(DEFAULT_BANISH_REPEATER_MULT); //Banish mult for repeaters
		this.maxBanishSeconds = maxBanishSeconds.orElse(DEFAULT_BANISH_MAX_SECONDS); //Max banish seconds

		final double maxRequestsPerMinutes = Math.round(this.maxRequests * 60.0 * 10.0 / this.windowSeconds) / 10.0;
		this.banishMessage = banishMessage.orElse(maxRequestsPerMinutes + " requests/min"); //Message returned if banished
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
		final String userKey = obtainUserKey(request);

		final Instant banishUntil = rateLimitingStorePlugin.getBanishInstant(userKey);
		final Instant now = Instant.now();
		if (banishUntil != null && now.isBefore(banishUntil)) {
			addHeaderBanish(response, banishUntil.getEpochSecond() - now.getEpochSecond());
			analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer.setTag("rateLimited", "banished"));
			response.sendError(errorCode, banishMessage);
			return false;
		}

		final long hits = rateLimitingStorePlugin.touch(userKey, windowSeconds);
		final long remainingSeconds = rateLimitingStorePlugin.remainingSeconds(userKey);
		if (hits > maxRequests) {
			switch (overRateLimitMode) {
				case nothing:
					break;
				case logOnly:
					logRateLimitExceeded(userKey, hits);
					analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
							.setMeasure("overLimitHits", hits)
							.setTag("rateLimited", "logOnly"));
					break;
				case reject:
					logRateLimitExceeded(userKey, hits);
					addHeaderReject(response, remainingSeconds);
					analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
							.setMeasure("overLimitHits", hits)
							.setTag("rateLimited", "rejected"));
					response.sendError(errorCode);
					return false;
				case banish:
					final long banishForSeconds = banish(userKey);
					logRateLimitExceeded(userKey, hits);
					addHeaderBanish(response, banishForSeconds);
					analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
							.setMeasure("overLimitHits", hits)
							.setMeasure("banishedForSeconds", banishForSeconds)
							.setTag("rateLimited", "banish"));
					response.sendError(errorCode, banishMessage);
					return false;
				default:
					throw new IllegalArgumentException("Unsupported overRateLimitMode " + overRateLimitMode);
			}
		}
		addHeaderRemaining(response, hits, remainingSeconds);
		return true;
	}

	private void addHeaderRemaining(final HttpServletResponse response, final long hits, final long remainingSeconds) {
		if (insertHeaders) {
			response.addHeader(HEADER_RATE_LIMIT_LIMIT, String.valueOf(maxRequests));
			response.addHeader(HEADER_RATE_LIMIT_RESET, String.valueOf(remainingSeconds));
			response.addHeader(HEADER_RATE_LIMIT_REMAINING, String.valueOf(maxRequests - hits));
		}
	}

	private void addHeaderReject(final HttpServletResponse response, final long remainingSeconds) {
		if (insertHeaders) {
			response.addHeader(HEADER_RATE_LIMIT_LIMIT, String.valueOf(maxRequests));
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
		final int banishCounter = rateLimitingStorePlugin.incrementBanishCounter(userKey, maxBanishSeconds);
		final long banishedForSeconds = Math.min(maxBanishSeconds, Math.round(banishSeconds * Math.pow(banishRepeaterMult, banishCounter - 1)));
		final Instant banishUntil = Instant.now().plusSeconds(banishedForSeconds);
		rateLimitingStorePlugin.banishUntil(userKey, banishUntil);
		return banishedForSeconds;
	}

	private void logRateLimitExceeded(final String userKey, final long hits) {
		if (hits == maxRequests + 1) {
			LOG.warn("Rate limit exceeded ({})", userKey);
		} else if ((hits - maxRequests) % logEveryXRequests == 0) {
			LOG.info("Rate limit exceeded ({})", userKey);
		}
	}

	private String obtainUserKey(final HttpServletRequest request) {
		final Optional<String> userIp = useUserIp ? obtainUserIp(request) : Optional.empty();

		final Optional<String> userSessionId = obtainSessionId(request);

		return userIp
				.orElseGet(() -> userSessionId
						.orElse("anonymous"));
	}

	private Optional<String> obtainUserIp(final HttpServletRequest request) {
		if (useForwardedFor) {
			final Enumeration<String> ipEnumeration = request.getHeaders("X-Forwarded-For");
			if (ipEnumeration != null) {
				if (ipEnumeration.hasMoreElements()) {
					return Optional.of(ipEnumeration.nextElement());
				}
			} //if no X-Forwarded-For : use remoteAddr
		}
		final String remoteAddr = request.getRemoteAddr();
		if (remoteAddr != null && !remoteAddr.isBlank()) {
			return Optional.of(remoteAddr);
		}
		return Optional.empty();
	}

	private Optional<String> obtainSessionId(final HttpServletRequest request) {
		final HttpSession session = request.getSession(false);
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
