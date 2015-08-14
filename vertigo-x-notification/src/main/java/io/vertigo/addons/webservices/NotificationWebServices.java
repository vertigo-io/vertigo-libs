package io.vertigo.addons.webservices;

import io.vertigo.addons.account.Account;
import io.vertigo.addons.account.AccountManager;
import io.vertigo.addons.notification.Notification;
import io.vertigo.addons.notification.NotificationManager;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.DELETE;
import io.vertigo.vega.rest.stereotype.GET;
import io.vertigo.vega.rest.stereotype.PathParam;
import io.vertigo.vega.rest.stereotype.PathPrefix;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;

/**
 * Webservice for addon Notification.
 *
 * @author npiedeloup
 */
@PathPrefix("/x/notification")
public final class NotificationWebServices implements RestfulService {

	private static final String API_VERSION = "0.1.0";
	private static final String IMPL_VERSION = "0.8.2";

	@Inject
	private NotificationManager notificationManager;
	@Inject
	private AccountManager accountManager;

	/**
	 * Get messages for logged user.
	 * @return messages for logged user
	 */
	@GET("/api/messages")
	public List<Notification> getMessages() {
		final URI<Account> loggedAccountURI = accountManager.getLoggedAccount();
		return notificationManager.getCurrentNotifications(loggedAccountURI);
	}

	/**
	 * Remove a message.
	 * @param messageUuid message id.
	 */
	@DELETE("/api/messages/{uuid}")
	public void removeMessage(@PathParam("uuid") final String messageUuid) {
		final URI<Account> loggedAccountURI = accountManager.getLoggedAccount();
		notificationManager.remove(loggedAccountURI, UUID.fromString(messageUuid));
	}

	//-----
	/**
	 * Addon status (code 200 or 500)
	 * @return "OK" or error message
	 */
	@GET("/status")
	@AnonymousAccessAllowed
	public String getStatus() {
		return "OK";
	}

	/**
	 * Addon stats.
	 * @return "OK" or error message
	 */
	@GET("/stats")
	@AnonymousAccessAllowed
	public Map<String, Object> getStats() {
		final Map<String, Object> stats = new HashMap<>();
		final Map<String, Object> sizeStats = new HashMap<>();
		sizeStats.put("notifications", "not yet");
		stats.put("size", sizeStats);
		return stats;
	}

	/**
	 * Addon config.
	 * @return Config object
	 */
	@GET("/config")
	@AnonymousAccessAllowed
	public Map<String, Object> getConfig() {
		final Map<String, Object> config = new HashMap<>();
		config.put("api-version", API_VERSION);
		config.put("impl-version", IMPL_VERSION);
		return config;
	}

	/**
	 * Addon help.
	 * @return Help object
	 */
	@GET("/help")
	@AnonymousAccessAllowed
	public String getHelp() {
		return "##Notification addon"
				+ "\n This addon manage the notification center.";
	}

}
