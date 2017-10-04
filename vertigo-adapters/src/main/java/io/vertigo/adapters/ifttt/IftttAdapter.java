package io.vertigo.adapters.ifttt;

import java.util.Optional;

import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation.Builder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status.Family;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.VSystemException;

/**
 *
 * @author dt
 *
 */
public class IftttAdapter {
	private static final Logger LOGGER = LogManager.getLogger(IftttAdapter.class);

	public static void sendMakerEvent(
			final MakerEvent event,
			final String baseUrl, final String apiKey,
			final Optional<String> proxyHost,
			final Optional<String> proxyPort) {
		Assertion.checkNotNull(event);
		Assertion.checkArgNotEmpty(event.getEventName(), "A makerEvent must have a eventName");
		Assertion.checkArgNotEmpty(apiKey, "Apikey must not be empty");
		Assertion.checkNotNull(proxyHost);
		Assertion.checkNotNull(proxyPort);
		Assertion.checkArgument(
				(proxyHost.isPresent() && proxyPort.isPresent()) || (!proxyHost.isPresent() && proxyPort.isPresent()),
				"les deux paramètres host et port doivent être tous les deux remplis ou vides");
		// ----
		if (proxyHost.isPresent()) {
			System.setProperty("https.proxyHost", proxyHost.get()); // "172.20.0.9"
			System.setProperty("https.proxyPort", proxyPort.get()); // "3128"
		}
		final String url = new StringBuilder(baseUrl)
				.append("/")
				.append(event.getEventName())
				.append("/with/key/")
				.append(apiKey)
				.toString();
		final WebTarget resource = ClientBuilder.newClient().target(url);
		final Builder request = resource.request().accept(MediaType.APPLICATION_JSON);
		final Response response = request.post(Entity.<MakerEventMetadatas> entity(event.getEventMetadatas(), MediaType.APPLICATION_JSON));

		if (response.getStatusInfo().getFamily() == Family.SUCCESSFUL) {
			LOGGER.info("Success! " + response.getStatus());
		} else {
			LOGGER.error("Error! " + response.getStatus());
			throw new VSystemException("Error while sending Ifttt maker event:" + response.getStatus());
		}
	}

}
