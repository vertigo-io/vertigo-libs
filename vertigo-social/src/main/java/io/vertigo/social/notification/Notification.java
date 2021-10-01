/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2021, Vertigo.io, team@vertigo.io
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
package io.vertigo.social.notification;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import io.vertigo.core.lang.Assertion;

/**
 * @author pchretien, npiedeloup, btounkara
 * @param uuid Uuid
 * @param sender Sender name
 * @param type Type
 * @param title Title
 * @param content Content
 * @param ttlInSeconds TimeToLive in seconds
 * @param creationDate Create date
 * @param targetUrl Target URL of this notification
 * @param userContentOpt Reader's specific content of this notification (can't be empty)
 */
public record Notification(
		UUID uuid,
		String sender,
		String type,
		String title,
		String content,
		int ttlInSeconds,
		Instant creationDate,
		String targetUrl,
		Optional<String> userContentOpt) {

	public Notification {
		Assertion.check()
				.isNotNull(uuid)
				.isNotBlank(sender)
				.isNotBlank(type)
				.isNotBlank(title)
				.isNotBlank(content)
				.isTrue(ttlInSeconds == -1 || ttlInSeconds > 0, "ttl must be positive or undefined (-1).")
				.isNotBlank(targetUrl)
				.isNotNull(creationDate)
				.isNotNull(userContentOpt)
				.when(userContentOpt.isPresent(), () -> Assertion.check()
						.isTrue(userContentOpt.get().length() > 0, "userContent can't be empty if set"));
	}

	/**
	 * Static method factory for NotificationBuilder
	 * @return NotificationBuilder
	 */
	public static NotificationBuilder builder() {
		return new NotificationBuilder();
	}

	/**
	 * Static method factory for NotificationBuilder
	 * @param uuid Notification uuid
	 * @return NotificationBuilder
	 */
	public static NotificationBuilder builder(final UUID uuid) {
		return new NotificationBuilder(uuid);
	}
}
