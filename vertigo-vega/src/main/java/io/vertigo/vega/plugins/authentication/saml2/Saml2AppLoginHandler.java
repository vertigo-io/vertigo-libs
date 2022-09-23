package io.vertigo.vega.plugins.authentication.saml2;

import org.opensaml.saml.saml2.core.Assertion;

import io.vertigo.vega.impl.authentication.AppLoginHandler;

public interface Saml2AppLoginHandler extends AppLoginHandler<Assertion> {
	//
}
