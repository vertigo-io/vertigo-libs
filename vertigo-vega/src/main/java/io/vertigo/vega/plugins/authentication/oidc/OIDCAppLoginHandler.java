package io.vertigo.vega.plugins.authentication.oidc;

import com.nimbusds.oauth2.sdk.AuthorizationSuccessResponse;

import io.vertigo.vega.impl.authentication.AppLoginHandler;

public interface OIDCAppLoginHandler extends AppLoginHandler<AuthorizationSuccessResponse> {
	//
}
