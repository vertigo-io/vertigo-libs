package io.vertigo.vega.plugins.auth.saml2;

import org.opensaml.saml.saml2.core.Assertion;

import io.vertigo.vega.impl.auth.AppLoginHandler;

public interface Saml2AppLoginHandler extends AppLoginHandler<Assertion> {
	//
}
