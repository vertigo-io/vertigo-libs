package io.vertigo.adapters.twitter;

import org.apache.log4j.Logger;

import io.vertigo.core.component.Plugin;
import io.vertigo.lang.WrappedException;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;

/**
 * Send a tweet
 * https://twitter.com/Vertigo_Twit
 * @author dt
 *
 */
public class TwitterAdapter implements Plugin {
	private static final Logger LOGGER = Logger.getLogger(TwitterAdapter.class);
	private static final Twitter TWITTER = TwitterFactory.getSingleton();

	public static void sendMessage(final String message) {
		try {
			final Status status = TWITTER.updateStatus("Message from TwitterNotificationPlugin:" + message);
			LOGGER.info("Successfully updated the status to [" + (status != null ? status.getText() : "") + "].");
		} catch (final TwitterException e) {
			LOGGER.error("Error while sending new status.", e);
			throw WrappedException.wrap(e);
		}
	}

}
