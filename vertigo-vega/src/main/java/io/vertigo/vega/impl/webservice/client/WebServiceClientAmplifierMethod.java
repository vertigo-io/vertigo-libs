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
package io.vertigo.vega.impl.webservice.client;

import java.io.IOException;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.google.gson.JsonSyntaxException;

import io.vertigo.account.authorization.VSecurityException;
import io.vertigo.connectors.httpclient.HttpClientConnector;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.VUserException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.amplifier.AmplifierMethod;
import io.vertigo.core.util.StringUtil;
import io.vertigo.vega.engines.webservice.json.JsonEngine;
import io.vertigo.vega.plugins.webservice.scanner.annotations.AnnotationsWebServiceScannerUtil;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition;
import io.vertigo.vega.webservice.definitions.WebServiceParam;
import io.vertigo.vega.webservice.exception.SessionException;
import jakarta.servlet.http.HttpServletResponse;

public final class WebServiceClientAmplifierMethod implements AmplifierMethod {

	/** WARN : with debug level, some sensible data can be logged. */
	private static final Logger LOGGER = LogManager.getLogger(WebServiceClientAmplifierMethod.class);

	private final Map<String, HttpClientConnector> httpClientConnectorByName = new HashMap<>();
	private final JsonEngine jsonReaderEngine;
	private final AnalyticsManager analyticsManager;

	/**
	 * @param jsonReaderEngine jsonReaderEngine
	 */
	@Inject
	public WebServiceClientAmplifierMethod(final JsonEngine jsonReaderEngine,
			final List<HttpClientConnector> httpClientConnectors,
			final AnalyticsManager analyticsManager) {
		Assertion.check().isNotNull(jsonReaderEngine)
				.isNotNull(httpClientConnectors);
		//-----
		this.jsonReaderEngine = jsonReaderEngine;
		this.analyticsManager = analyticsManager;

		httpClientConnectors.forEach(
				connector -> {
					final var connectorName = connector.getName();
					Assertion.check()
							.isNotBlank(connectorName)
							.isFalse(httpClientConnectorByName.containsKey(connectorName), "A HttpClientConnector with name '{0}' is already registered ", connectorName);
					//---
					httpClientConnectorByName.put(connectorName, connector);
				});

	}

	@Override
	public Class<WebServiceProxyAnnotation> getAnnotationType() {
		return WebServiceProxyAnnotation.class;
	}

	@Override
	public Object invoke(final Method method, final Object[] args) {
		final WebServiceProxyAnnotation webServiceProxyAnnotation = obtainWebServiceProxyAnnotation(method);
		final String connectorName = webServiceProxyAnnotation.connectorName();
		final Optional<RequestSpecializer> requestSpecializerOpt = obtainRequestSpecializer(webServiceProxyAnnotation.requestSpecializer());
		final WebServiceDefinition webServiceDefinition = createWebServiceDefinition(method);
		final HttpClientConnector httpClientConnector = Optional.ofNullable(httpClientConnectorByName.get(connectorName))
				.orElseThrow(() -> new VSystemException("Can't found HttpClientConnector with name {0}", connectorName));

		final HttpRequest httpRequest = createHttpRequest(webServiceDefinition, namedArgs(webServiceDefinition.getWebServiceParams(), args), httpClientConnector, requestSpecializerOpt);

		final HttpResponse<String> response;
		//same name for WS that  Vega (AnalyticsWebServiceHandlerPlugin);
		final String name = "/" + webServiceDefinition.getVerb().name() + "/" + webServiceDefinition.getPath();
		response = analyticsManager.traceWithReturn("wsclient", name, tracer -> {
			try {
				final var res = httpClientConnector.getClient().send(httpRequest, BodyHandlers.ofString());
				if (LOGGER.isDebugEnabled()) {
					LOGGER.debug("Response of {}\n{}", name, httpResponseToString(res));
				}
				return res;
			} catch (final IOException e) {
				throw WrappedException.wrap(e);
			} catch (final InterruptedException e) {
				Thread.currentThread().interrupt();
				throw WrappedException.wrap(e);
			}
		});

		final int responseStatus = response.statusCode();
		if (responseStatus / 100 == 2) {
			final Type returnType = webServiceDefinition.getMethod().getGenericReturnType();
			if (Void.TYPE.equals(returnType)) {
				return null;
			}
			return convertResultFromJson(response.body(), returnType);
		} else if (responseStatus / 100 == 3) {
			throw new VUserException(response.body());
		} else if (responseStatus / 100 == 4) {
			switch (responseStatus) {
				case HttpServletResponse.SC_UNAUTHORIZED:
					throw WrappedException.wrap(new SessionException(response.body()));
				case HttpServletResponse.SC_FORBIDDEN:
					throw new VSecurityException(LocaleMessageText.of(response.body()));
				case HttpServletResponse.SC_BAD_REQUEST:
					throw new JsonSyntaxException(response.body());
				default:
					final Map errorMessages = convertErrorFromJson(response.body(), Map.class);
					throw new WebServiceUserException(responseStatus, errorMessages);
			}
		} else {
			throw WrappedException.wrap(new VSystemException(response.body()));
		}
	}

	private String httpResponseToString(final HttpResponse response) {
		final StringBuilder sb = new StringBuilder();
		sb.append("Response Status: ").append(response.statusCode()).append("\n");
		sb.append("Response Headers: ").append(response.headers().map()).append("\n");
		final var responseBody = response.body();
		if (responseBody != null && !"".equals(responseBody)) {
			sb.append("Response Body: ").append(responseBody).append("\n");
		}
		return sb.toString();
	}

	private Map convertErrorFromJson(final String json, final Type type) {
		return jsonReaderEngine.fromJson(json, type);
	}

	private Object convertResultFromJson(final String json, final Type returnType) {
		return jsonReaderEngine.fromJson(json, returnType);
	}

	private WebServiceProxyAnnotation obtainWebServiceProxyAnnotation(final Method method) {
		WebServiceProxyAnnotation webServiceProxyAnnotation = method.getAnnotation(WebServiceProxyAnnotation.class);
		if (webServiceProxyAnnotation == null) {
			webServiceProxyAnnotation = method.getDeclaringClass().getAnnotation(WebServiceProxyAnnotation.class);
		}
		return webServiceProxyAnnotation;
	}

	private Optional<RequestSpecializer> obtainRequestSpecializer(final String requestSpecializer) {
		if (StringUtil.isBlank(requestSpecializer)) {
			return Optional.empty();
		}
		return Optional.of(Node.getNode().getComponentSpace().resolve(requestSpecializer, RequestSpecializer.class));
	}

	private Map<String, Object> namedArgs(final List<WebServiceParam> params, final Object[] args) {
		if (args == null) {
			return Collections.emptyMap();
		}
		final Map<String, Object> namedArgs = new HashMap<>();
		for (int i = 0; i < args.length; i++) {
			namedArgs.put(params.get(i).getName(), args[i]);
		}
		return namedArgs;
	}

	private HttpRequest createHttpRequest(final WebServiceDefinition webServiceDefinition, final Map<String, Object> namedArgs, final HttpClientConnector httpClientConnector,
			final Optional<RequestSpecializer> requestSpecializerOpt) {
		final HttpRequestBuilder httpRequestBuilder = new HttpRequestBuilder(httpClientConnector.getUrlPrefix(), webServiceDefinition.getPath(), jsonReaderEngine);
		httpRequestBuilder.verb(webServiceDefinition.getVerb());
		boolean hasBody = false;
		for (final WebServiceParam webServiceParam : webServiceDefinition.getWebServiceParams()) {
			switch (webServiceParam.getParamType()) {
				case Body:
					httpRequestBuilder.bodyParam(namedArgs.get(webServiceParam.getName()), webServiceParam);
					hasBody = true;
					break;
				case Header:
					httpRequestBuilder.header(webServiceParam.getName(), String.valueOf(namedArgs.get(webServiceParam.getName())));
					break;
				case Implicit:
					//nothing
					break;
				case InnerBody:
					httpRequestBuilder.innerBodyParam(webServiceParam.getName(), namedArgs.get(webServiceParam.getName()), webServiceParam);
					hasBody = true;
					break;
				case Path:
					httpRequestBuilder.pathParam(webServiceParam.getName(), String.valueOf(namedArgs.get(webServiceParam.getName())));
					break;
				case Query:
					httpRequestBuilder.queryParam(webServiceParam.getName(), String.valueOf(namedArgs.get(webServiceParam.getName())));
					break;
				default:
					break;
			}
		}
		if (hasBody) {
			httpRequestBuilder.header("Content-Type", "application/json;charset=UTF-8");
		}

		requestSpecializerOpt.ifPresent(
				requestSpecializer -> requestSpecializer.specialize(httpRequestBuilder, webServiceDefinition, namedArgs, httpClientConnector));
		final var req = httpRequestBuilder.build();
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("Call WS {}", httpRequestBuilder.requestString());
		}
		return req;
	}

	private static WebServiceDefinition createWebServiceDefinition(final Method method) {
		return AnnotationsWebServiceScannerUtil.buildWebServiceDefinition(method).get();
	}

}
