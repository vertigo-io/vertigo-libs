package io.vertigo.vega.plugins.auth.oidc;

import com.nimbusds.oauth2.sdk.AuthorizationSuccessResponse;

import io.vertigo.vega.impl.auth.AppLoginHandler;

public interface OIDCAppLoginHandler extends AppLoginHandler<AuthorizationSuccessResponse> {
	//
}
