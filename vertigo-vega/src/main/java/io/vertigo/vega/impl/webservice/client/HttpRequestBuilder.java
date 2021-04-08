package io.vertigo.vega.impl.webservice.client;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublisher;
import java.net.http.HttpRequest.BodyPublishers;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Builder;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.vega.engines.webservice.json.JsonEngine;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition.Verb;
import io.vertigo.vega.webservice.model.ExtendedObject;

public final class HttpRequestBuilder implements Builder<HttpRequest> {

	private final JsonEngine jsonEngine;

	private final String urlPrefix;
	private final String resourcePath;

	private final java.net.http.HttpRequest.Builder httpRequestBuilder = HttpRequest.newBuilder();
	private final Map<String, String> pathParams = new HashMap<>();
	private final Map<String, String> queryParams = new HashMap<>();
	private Verb verb = null;
	private Object body = null;

	public HttpRequestBuilder(final String urlPrefix, final String resourcePath, final JsonEngine jsonEngine) {
		Assertion.check().isTrue(resourcePath.startsWith("/"), "resourcePath ({0}) must starts with /", resourcePath);
		Assertion.check().isNotNull(jsonEngine);
		//---
		this.urlPrefix = urlPrefix;
		this.resourcePath = resourcePath;
		this.jsonEngine = jsonEngine;
	}

	@Override
	public HttpRequest build() {
		httpRequestBuilder.uri(buildURI());

		BodyPublisher bodyPublisher = BodyPublishers.noBody();
		if (body != null) {
			bodyPublisher = BodyPublishers.ofString(jsonEngine.toJson(body));
		}

		switch (verb) {
			case Delete:
				httpRequestBuilder.DELETE();
				break;
			case Get:
				httpRequestBuilder.GET();
				break;
			case Patch:
				httpRequestBuilder.method("patch", bodyPublisher);
				break;
			case Post:
				httpRequestBuilder.POST(bodyPublisher);
				break;
			case Put:
				httpRequestBuilder.PUT(bodyPublisher);
				break;
			default:
				break;
		}

		return httpRequestBuilder.build();
	}

	public URI buildURI() {
		final StringBuilder resourceQuery = new StringBuilder(urlPrefix);
		String resourcePathMerged = resourcePath;
		for (final Entry<String, String> param : pathParams.entrySet()) {
			resourcePathMerged = resourcePathMerged.replace("{" + param.getKey() + "}", encodeURL(param.getValue()));
		}
		resourceQuery.append(resourcePathMerged);
		char sep = '?';
		for (final Entry<String, String> param : queryParams.entrySet()) {
			resourceQuery.append(sep)
					.append(encodeURL(param.getKey()))
					.append('=')
					.append(encodeURL(param.getValue()));
			sep = '&';
		}
		return URI.create(resourceQuery.toString());
	}

	public void header(final String name, final String value) {
		httpRequestBuilder.setHeader(name, value);
	}

	public void pathParam(final String name, final String value) {
		pathParams.put(name, value);
	}

	public void queryParam(final String name, final String value) {
		queryParams.put(name, value);
	}

	private String encodeURL(final String value) {
		try {
			return URLEncoder.encode(value, StandardCharsets.UTF_8.toString());
		} catch (final UnsupportedEncodingException e) {
			throw WrappedException.wrap(e);
		}
	}

	public void innerBodyParam(final String name, final Object object) {
		if (body == null) {
			body = new HashMap<>();
		}
		Assertion.check().isTrue(body instanceof Map, "Can't merge body content");
		//---
		final Map<String, Object> bodyContent = (Map<String, Object>) body;
		bodyContent.put(name, object);
	}

	public void bodyParam(final Object object) {
		final ExtendedObject extendedObject = new ExtendedObject(object);
		if (body != null) {
			extendedObject.putAll((Map<String, Object>) body);
		}
		body = extendedObject;
	}

	public void verb(final Verb verb) {
		this.verb = verb;
	}

}
