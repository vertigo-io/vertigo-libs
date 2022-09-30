package io.vertigo.vega.plugins.authentication.aad;

import com.microsoft.aad.msal4j.IAuthenticationResult;

import io.vertigo.vega.impl.authentication.AppLoginHandler;

public interface AzureAdAppLoginHandler extends AppLoginHandler<IAuthenticationResult> {
	//
}
