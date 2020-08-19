/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
import io.vertigo.core.util.ListBuilder;
import io.vertigo.vega.engines.webservice.json.GoogleJsonEngine;
import io.vertigo.vega.engines.webservice.json.JsonEngine;
import io.vertigo.vega.impl.token.TokenManagerImpl;
import io.vertigo.vega.impl.webservice.WebServiceManagerImpl;
import io.vertigo.vega.impl.webservice.catalog.CatalogWebServices;
import io.vertigo.vega.impl.webservice.catalog.SwaggerWebServices;
import io.vertigo.vega.plugins.webservice.handler.AccessTokenWebServiceHandlerPlugin;
import io.vertigo.vega.plugins.webservice.handler.AnalyticsWebServiceHandlerPlugin;
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
import io.vertigo.vega.plugins.webservice.webserver.javalin.JavalinEmbeddedWebServerPlugin;
import io.vertigo.vega.plugins.webservice.webserver.javalin.JavalinServletFilterWebServerPlugin;
import io.vertigo.vega.token.TokenManager;
import io.vertigo.vega.webservice.WebServiceManager;

/**
 * Defines module Vega.
 * @author pchretien
 */
public final class VegaFeatures extends Features<VegaFeatures> {

	private String myApiPrefix;
	private String myPort;
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
	public VegaFeatures withWebServicesRateLimiting() {
		getModuleConfigBuilder()
				.addPlugin(RateLimitingWebServiceHandlerPlugin.class);
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

	@Feature("webservices.apiPrefix")
	public VegaFeatures withWebServicesApiPrefix(final Param... params) {
		Assertion.check().isTrue(params.length == 1 && "apiPrefix".equals(params[0].getName()), "apiPrefix param should be provided ");
		myApiPrefix = params[0].getValue();
		return this;
	}

	@Feature("webservices.json")
	public VegaFeatures withWebServicesJson(final Param... params) {
		jsonParams = params;
		return this;
	}

	@Feature("webservices.embeddedServer")
	public VegaFeatures withWebServicesEmbeddedServer(final Param... params) {
		Assertion.check().isTrue(params.length == 1 && "port".equals(params[0].getName()), "port param should be provided ");
		myPort = params[0].getValue();
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

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		if (myPort != null) {
			final ListBuilder<Param> params = new ListBuilder()
					.add(Param.of("port", myPort));
			if (myApiPrefix != null) {
				params.add(Param.of("apiPrefix", myApiPrefix));
			}
			getModuleConfigBuilder().addPlugin(JavalinEmbeddedWebServerPlugin.class, params.build());
		} else {
			final ListBuilder<Param> params = new ListBuilder<>();
			if (myApiPrefix != null) {
				params.add(Param.of("apiPrefix", myApiPrefix));
			}
			getModuleConfigBuilder().addPlugin(JavalinServletFilterWebServerPlugin.class, params.build());
		}

		getModuleConfigBuilder()
				.addComponent(JsonEngine.class, GoogleJsonEngine.class, jsonParams);

	}
}
