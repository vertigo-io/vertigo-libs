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
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonSyntaxException;

import io.vertigo.account.authorization.VSecurityException;
import io.vertigo.connectors.httpclient.HttpClientConnector;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.VUserException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.locale.MessageText;
import io.vertigo.core.node.component.amplifier.ProxyMethod;
import io.vertigo.vega.engines.webservice.json.JsonEngine;
import io.vertigo.vega.plugins.webservice.scanner.annotations.AnnotationsWebServiceScannerUtil;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition;
import io.vertigo.vega.webservice.definitions.WebServiceParam;
import io.vertigo.vega.webservice.exception.SessionException;

public final class WebServiceClientProxyMethod implements ProxyMethod {

	private final Map<String, HttpClientConnector> httpClientConnectorByName = new HashMap<>();
	private final JsonEngine jsonEngine;

	@Inject
	public WebServiceClientProxyMethod(
			final JsonEngine jsonEngine,
			final List<HttpClientConnector> httpClientConnectors) {
		Assertion.check()
				.isNotNull(jsonEngine)
				.isNotNull(httpClientConnectors);
		//---
		this.jsonEngine = jsonEngine;
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
	public Class<io.vertigo.vega.impl.webservice.client.WebServiceProxyAnnotation> getAnnotationType() {
		return io.vertigo.vega.impl.webservice.client.WebServiceProxyAnnotation.class;
	}

	@Override
	public Object invoke(final Method method, final Object[] args) {
		final WebServiceProxyAnnotation webServiceProxyAnnotation = method.getAnnotation(WebServiceProxyAnnotation.class);
		final WebServiceDefinition webServiceDefinition = createWebServiceDefinition(method);
		final HttpClientConnector httpClientConnector = Optional.ofNullable(httpClientConnectorByName.get(webServiceProxyAnnotation.connectorName()))
				.orElseThrow(() -> new VSystemException("Can't found HttpClientConnector with name {0}", webServiceProxyAnnotation.connectorName()));
		final HttpRequest httpRequest = createHttpRequest(webServiceDefinition, namedArgs(webServiceDefinition.getWebServiceParams(), args), httpClientConnector, jsonEngine);

		final HttpResponse response;
		try {
			response = httpClientConnector.getClient().send(httpRequest, BodyHandlers.ofString());
		} catch (IOException | InterruptedException e) {
			throw WrappedException.wrap(e);
		}
		final int responseStatus = response.statusCode();
		if (responseStatus / 100 == 2) {
			final Type returnType = webServiceDefinition.getMethod().getGenericReturnType();
			if (Void.TYPE.equals(returnType)) {
				return null;
			}
			return jsonEngine.fromJson((String) response.body(), returnType);
		} else if (responseStatus / 100 == 3) {
			throw WrappedException.wrap(new VUserException((String) response.body()));
		} else if (responseStatus / 100 == 4) {
			if (responseStatus == HttpServletResponse.SC_UNAUTHORIZED) {
				throw WrappedException.wrap(new SessionException((String) response.body()));
			} else if (responseStatus == HttpServletResponse.SC_FORBIDDEN) {
				throw new VSecurityException(MessageText.of((String) response.body()));
			} else if (responseStatus == HttpServletResponse.SC_BAD_REQUEST) {
				throw new JsonSyntaxException((String) response.body());
			} else {
				//UiMessageStack uiMessageStack = jsonEngine.fromJson((String) response.body(), UiMessageStack.class);
				throw WrappedException.wrap(new VUserException((String) response.body()));
			}
		} else {
			throw WrappedException.wrap(new VSystemException((String) response.body()));
		}
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

	private HttpRequest createHttpRequest(final WebServiceDefinition webServiceDefinition, final Map<String, Object> namedArgs, final HttpClientConnector httpClientConnector, final JsonEngine jsonEngine) {

		final HttpRequestBuilder httpRequestBuilder = new HttpRequestBuilder(httpClientConnector.getUrlPrefix(), webServiceDefinition.getPath(), jsonEngine);
		httpRequestBuilder.header("Content-Type", "application/json");
		httpRequestBuilder.verb(webServiceDefinition.getVerb());
		for (final WebServiceParam webServiceParam : webServiceDefinition.getWebServiceParams()) {
			switch (webServiceParam.getParamType()) {
				case Body:
					httpRequestBuilder.bodyParam(namedArgs.get(webServiceParam.getName()));
					break;
				case Header:
					httpRequestBuilder.header(webServiceParam.getName(), String.valueOf(namedArgs.get(webServiceParam.getName())));
					break;
				case Implicit:
					//nothing
					break;
				case InnerBody:
					httpRequestBuilder.innerBodyParam(webServiceParam.getName(), namedArgs.get(webServiceParam.getName()));
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
		return httpRequestBuilder.build();
	}

	private static WebServiceDefinition createWebServiceDefinition(final Method method) {
		return AnnotationsWebServiceScannerUtil.buildWebServiceDefinition(method).get();
	}
}
