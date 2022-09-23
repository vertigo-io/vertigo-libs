package io.vertigo.vega.impl.auth;

import java.util.Map;

public final class CallbackResult<T> {
	private boolean isRequestConsumed;
	private final Map<String, Object> claims;
	private final T rawCallbackResult;

	public static <T> CallbackResult<T> ofConsumed() {
		return new CallbackResult<>(true, null, null);
	}

	public static <T> CallbackResult<T> of(final Map<String, Object> claims, final T rawCallbackResult) {
		return new CallbackResult<>(false, claims, rawCallbackResult);
	}

	private CallbackResult(final boolean isRequestConsumed, final Map<String, Object> claims, final T rawCallbackResult) {
		this.isRequestConsumed = isRequestConsumed;
		this.claims = claims;
		this.rawCallbackResult = rawCallbackResult;
	}

	public boolean isRequestConsumed() {
		return isRequestConsumed;
	}

	public Map<String, Object> getClaims() {
		return claims;
	}

	public T getRawCallbackResult() {
		return rawCallbackResult;
	}

	public void setRequestConsumed(final boolean isRequestConsumed) {
		this.isRequestConsumed = isRequestConsumed;
	}

}
