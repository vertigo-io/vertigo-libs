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
