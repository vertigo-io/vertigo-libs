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

import java.util.Map;

import io.vertigo.connectors.httpclient.HttpClientConnector;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition;

/**
 * When using an Amplifier as a client for REST Webservices it may be required to specialize the request that will be created.
 * For exemple adding special Headers, additionals parameters in the body etc...
 * The specializer will be applied on all the webservices methods present in the Amplifier class.
 *
 * @author mlaroche
 *
 */
public interface RequestSpecializer {

	/**
	 * Specialize the request that will be created by the amplifier
	 * @param httpRequestBuilder the builder to customize the request
	 * @param webServiceDefinition the webservice definition
	 * @param namedArgs the actual parameters that are provided by the caller
	 * @param httpClientConnector the connector that will be used to perform the actual HttpRequest
	 */
	void specialize(
			final HttpRequestBuilder httpRequestBuilder,
			final WebServiceDefinition webServiceDefinition,
			final Map<String, Object> namedArgs,
			final HttpClientConnector httpClientConnector);

}
