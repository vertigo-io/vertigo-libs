/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.adapters.twitter;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

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
	private static final Logger LOGGER = LogManager.getLogger(TwitterAdapter.class);
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
