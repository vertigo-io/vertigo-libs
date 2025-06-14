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
package io.vertigo.vega;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.config.Feature;
import io.vertigo.core.node.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.vega.authentication.WebAuthenticationManager;
import io.vertigo.vega.engines.webservice.json.GoogleJsonEngine;
import io.vertigo.vega.engines.webservice.json.JsonEngine;
import io.vertigo.vega.impl.authentication.WebAuthenticationManagerImpl;
import io.vertigo.vega.impl.ratelimiting.RateLimitingManagerImpl;
import io.vertigo.vega.impl.token.TokenManagerImpl;
import io.vertigo.vega.impl.webservice.WebServiceManagerImpl;
import io.vertigo.vega.impl.webservice.catalog.CatalogWebServices;
import io.vertigo.vega.impl.webservice.catalog.SwaggerWebServices;
import io.vertigo.vega.impl.webservice.client.WebServiceClientAmplifierMethod;
import io.vertigo.vega.impl.webservice.healthcheck.HealthcheckWebServices;
import io.vertigo.vega.plugins.authentication.aad.AzureAdWebAuthenticationPlugin;
import io.vertigo.vega.plugins.authentication.local.LocalWebAuthenticationPlugin;
import io.vertigo.vega.plugins.authentication.oidc.OIDCWebAuthenticationPlugin;
import io.vertigo.vega.plugins.authentication.saml2.SAML2WebAuthenticationPlugin;
import io.vertigo.vega.plugins.ratelimiting.mem.RateLimitingMemStorePlugin;
import io.vertigo.vega.plugins.ratelimiting.redis.RateLimitingRedisStorePlugin;
import io.vertigo.vega.plugins.webservice.handler.AccessTokenWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.AnalyticsWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.ApiKeyWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.CorsAllowerWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.ExceptionWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.JsonConverterWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.RateLimitingWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.RestfulServiceWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.SecurityWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.ServerSideStateWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.SessionInvalidateWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.SessionWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.ValidatorWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.scanner.annotations.AnnotationsWebServiceScannerPlugin;
import io.vertigo.vega.plugins.webservice.webserver.javalin.JavalinWebServerPlugin;
import io.vertigo.vega.ratelimiting.RateLimitingManager;
import io.vertigo.vega.token.TokenManager;
import io.vertigo.vega.webservice.WebServiceManager;

/**
 * Defines module Vega.
 *
 * @author pchretien
 */
public final class VegaFeatures extends Features<VegaFeatures> {

	private Param[] jsonParams = new Param[0];

	public VegaFeatures() {
		super("vertigo-vega");
	}

	@Feature("webservices")
	public VegaFeatures withWebServices() {
		getModuleConfigBuilder()
				.addComponent(WebServiceManager.class, WebServiceManagerImpl.class)
				.addPlugin(AnnotationsWebServiceScannerPlugin.class)
				//-- Handlers plugins
				.addPlugin(ExceptionWebServiceHandlerPlugin.class)
				.addPlugin(AnalyticsWebServiceHandlerPlugin.class)
				.addPlugin(JsonConverterWebServiceHandlerPlugin.class)
				.addPlugin(ValidatorWebServiceHandlerPlugin.class)
				.addPlugin(RestfulServiceWebServiceHandlerPlugin.class);
		return this;
	}

	@Feature("rateLimiting")
	public VegaFeatures withRateLimiting(final Param... params) {
		getModuleConfigBuilder()
				.addComponent(RateLimitingManager.class, RateLimitingManagerImpl.class, params);
		return this;
	}

	@Feature("rateLimiting.redis")
	public VegaFeatures withRateLimitingRedisStore(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(RateLimitingRedisStorePlugin.class, params);
		return this;
	}

	@Feature("rateLimiting.mem")
	public VegaFeatures withRateLimitingMemStore(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(RateLimitingMemStorePlugin.class, params);
		return this;
	}

	@Feature("webservices.token")
	public VegaFeatures withWebServicesTokens(final Param... params) {
		//-----
		Assertion.check().isTrue(params.length == 1 && "tokens".equals(params[0].getName()), "tokens param should be provided ");
		final String myTokens = params[0].getValue();
		Assertion.check().isNotBlank(myTokens);
		//---
		getModuleConfigBuilder()
				.addPlugin(ServerSideStateWebServiceHandlerPlugin.class)
				.addPlugin(AccessTokenWebServiceHandlerPlugin.class)
				.addComponent(TokenManager.class, TokenManagerImpl.class,
						Param.of("collection", myTokens));
		return this;
	}

	@Feature("webservices.rateLimiting")
	public VegaFeatures withWebServicesRateLimiting(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(RateLimitingWebServiceHandlerPlugin.class, params);
		return this;
	}

	@Feature("webservices.security")
	public VegaFeatures withWebServicesSecurity() {
		getModuleConfigBuilder()
				.addPlugin(SessionInvalidateWebServiceHandlerPlugin.class)
				.addPlugin(SessionWebServiceHandlerPlugin.class)
				.addPlugin(SecurityWebServiceHandlerPlugin.class);
		return this;
	}

	@Feature("webservices.auth.apiKey")
	public VegaFeatures withApiKey(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(ApiKeyWebServiceHandlerPlugin.class, params);
		return this;
	}

	@Feature("webservices.javalin")
	public VegaFeatures withJavalinWebServerPlugin(final Param... params) {
		getModuleConfigBuilder().addPlugin(JavalinWebServerPlugin.class, params);
		return this;
	}

	@Feature("webservices.json")
	public VegaFeatures withWebServicesJson(final Param... params) {
		jsonParams = params;
		return this;
	}

	@Feature("webservices.cors")
	public VegaFeatures withWebServicesOriginCORSFilter(final Param... params) {
		Assertion.check().isTrue(params.length == 1 && "originCORSFilter".equals(params[0].getName()), "originCORSFilter param should be provided ");
		final String myOriginCORSFilter = params[0].getValue();
		//---
		if (myOriginCORSFilter != null) {
			getModuleConfigBuilder().addPlugin(CorsAllowerWebServiceHandlerPlugin.class);
		} else {
			getModuleConfigBuilder().addPlugin(CorsAllowerWebServiceHandlerPlugin.class, Param.of("originCORSFilter", myOriginCORSFilter));
		}
		return this;
	}

	@Feature("webservices.swagger")
	public VegaFeatures withWebServicesSwagger() {
		getModuleConfigBuilder()
				.addComponent(SwaggerWebServices.class);
		return this;
	}

	@Feature("webservices.catalog")
	public VegaFeatures withWebServicesCatalog() {
		getModuleConfigBuilder()
				.addComponent(CatalogWebServices.class);
		return this;
	}

	@Feature("webservices.healthcheck")
	public VegaFeatures withWebServicesHealthcheck() {
		getModuleConfigBuilder()
				.addComponent(HealthcheckWebServices.class);
		return this;
	}

	@Feature("webservices.proxyclient")
	public VegaFeatures withWebServicesProxyClient() {
		getModuleConfigBuilder()
				.addAmplifierMethod(WebServiceClientAmplifierMethod.class);
		return this;
	}

	@Feature("authentication")
	public VegaFeatures withWebAuthentication(final Param... params) {
		getModuleConfigBuilder()
				.addComponent(WebAuthenticationManager.class, WebAuthenticationManagerImpl.class, params);
		return this;
	}

	@Feature("authentication.saml2")
	public VegaFeatures withSAML2WebAuthentication(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(SAML2WebAuthenticationPlugin.class, params);
		return this;
	}

	@Feature("authentication.oidc")
	public VegaFeatures withOIDCWebAuthentication(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(OIDCWebAuthenticationPlugin.class, params);
		return this;
	}

	@Feature("authentication.aad")
	public VegaFeatures withAzureAdWebAuthentication(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(AzureAdWebAuthenticationPlugin.class, params);
		return this;
	}

	@Feature("authentication.local")
	public VegaFeatures withLocalWebAuthentication(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(LocalWebAuthenticationPlugin.class, params);
		return this;
	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addComponent(JsonEngine.class, GoogleJsonEngine.class, jsonParams);

	}
}
