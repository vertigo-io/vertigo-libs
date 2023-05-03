package io.vertigo.social.plugins.sms.ovh;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import javax.inject.Inject;

import io.vertigo.connectors.httpclient.HttpClientConnector;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.component.Component;
import io.vertigo.core.param.ParamValue;
import io.vertigo.vega.impl.webservice.client.HttpRequestBuilder;
import io.vertigo.vega.impl.webservice.client.RequestSpecializer;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition;

public class OvhRequestSpecializer implements RequestSpecializer, Component {

	private final String appKey;
	private final String appSecret;
	private final String consumerKey;

	@Inject
	public OvhRequestSpecializer(
			final @ParamValue("appKey") String appKey,
			final @ParamValue("appSecret") String appSecret,
			final @ParamValue("consumerKey") String consumerKey) {
		this.appKey = appKey;
		this.appSecret = appSecret;
		this.consumerKey = consumerKey;

	}

	@Override
	public void specialize(
			final HttpRequestBuilder httpRequestBuilder,
			final WebServiceDefinition webServiceDefinition,
			final Map<String, Object> namedArgs,
			final HttpClientConnector httpClientConnector) {

		// get timestamp from local system
		final long timestamp = System.currentTimeMillis() / 1000;

		// build signature
		final String toSign = new StringBuilder(appSecret)
				.append("+")
				.append(consumerKey)
				.append("+")
				.append(webServiceDefinition.getVerb().name().toUpperCase())
				.append("+")
				.append(httpRequestBuilder.buildURI().toASCIIString())
				.append("+")
				.append(httpRequestBuilder.prepareBody())
				.append("+")
				.append(timestamp)
				.toString();

		final String signature = new StringBuilder("$1$").append(hashSHA1(toSign)).toString();

		httpRequestBuilder.header("X-Ovh-Application", appKey);
		httpRequestBuilder.header("X-Ovh-Consumer", consumerKey);
		httpRequestBuilder.header("X-Ovh-Signature", signature);
		httpRequestBuilder.header("X-Ovh-Timestamp", Long.toString(timestamp));
	}

	public static String hashSHA1(final String text) {

		try {
			MessageDigest md;
			md = MessageDigest.getInstance("SHA-1"); //SHA-1 : imposé par l'api OVH
			byte[] sha1hash = new byte[40];
			md.update(text.getBytes("iso-8859-1"), 0, text.length());//iso-8859-1 : imposé par l'api OVH
			sha1hash = md.digest();
			final StringBuffer sb = new StringBuffer();
			for (final byte element : sha1hash) {
				sb.append(Integer.toString((element & 0xff) + 0x100, 16).substring(1));
			}
			return sb.toString();
		} catch (final NoSuchAlgorithmException | UnsupportedEncodingException e) {
			throw WrappedException.wrap(e);
		}

	}

}
