/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublisher;
import java.net.http.HttpRequest.BodyPublishers;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Builder;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.vega.engines.webservice.json.JsonEngine;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition.Verb;
import io.vertigo.vega.webservice.definitions.WebServiceParam;
import io.vertigo.vega.webservice.model.ExtendedObject;

public final class HttpRequestBuilder implements Builder<HttpRequest> {

	private final JsonEngine jsonWriterEngine;

	private final String urlPrefix;
	private final String resourcePath;

	private final java.net.http.HttpRequest.Builder httpRequestBuilder = HttpRequest.newBuilder();
	private final Map<String, String> pathParams = new HashMap<>();
	private final Map<String, String> queryParams = new HashMap<>();
	private Verb myVerb = null;
	private Object body = null;
	private String jsonBody = null;

	private final Set<String> includedFields = new HashSet<>();
	private final Set<String> excludedFields = new HashSet<>();

	public HttpRequestBuilder(final String urlPrefix, final String resourcePath, final JsonEngine jsonWriterEngine) {
		Assertion.check()
				.isTrue(resourcePath.startsWith("/"), "resourcePath ({0}) must starts with /", resourcePath)
				.isNotNull(jsonWriterEngine);
		//---
		this.urlPrefix = urlPrefix;
		this.resourcePath = resourcePath;
		this.jsonWriterEngine = jsonWriterEngine;

	}

	public String prepareBody() {
		if (body != null) {
			if (body instanceof ExtendedObject) {
				final ExtendedObject extendedObject = (ExtendedObject) body;
				return jsonWriterEngine.toJsonWithMeta(extendedObject.getInnerObject(), extendedObject, includedFields, excludedFields);
			} else {
				return jsonWriterEngine.toJsonWithMeta(body, Collections.emptyMap(), includedFields, excludedFields);
			}
		}
		return "";
	}

	@Override
	public HttpRequest build() {
		httpRequestBuilder.uri(buildURI());

		BodyPublisher bodyPublisher = BodyPublishers.noBody();
		if (body != null) {
			if (jsonBody == null) {
				jsonBody = prepareBody();
			}
			bodyPublisher = BodyPublishers.ofString(jsonBody);
		}

		switch (myVerb) {
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

	public void innerBodyParam(final String name, final Object object, final WebServiceParam webServiceParam) {
		// reset prepared JsonBody
		jsonBody = null;
		//---
		if (body == null) {
			body = new HashMap<>();
		}
		Assertion.check().isTrue(body instanceof Map, "Can't merge body content");
		//---
		final Map<String, Object> innerBody = (Map<String, Object>) body;

		includedFields.addAll(webServiceParam.getIncludedFields().stream()
				.map(n -> name + "." + n)
				.collect(Collectors.toSet()));
		excludedFields.addAll(webServiceParam.getExcludedFields().stream()
				.map(n -> name + "." + n)
				.collect(Collectors.toSet()));
		innerBody.put(name, object);
	}

	public void bodyParam(final Object object, final WebServiceParam webServiceParam) {
		// reset prepared JsonBody
		jsonBody = null;
		//---
		final ExtendedObject extendedObject = new ExtendedObject(object);
		includedFields.addAll(webServiceParam.getIncludedFields());
		excludedFields.addAll(webServiceParam.getExcludedFields());
		if (body != null) {
			Assertion.check().isTrue(body instanceof Map, "Can't merge two bodies {0}", webServiceParam.getName());
			extendedObject.putAll((Map<String, Object>) body);
		}
		body = extendedObject;
	}

	public void verb(final Verb verb) {
		this.myVerb = verb;
	}

}
