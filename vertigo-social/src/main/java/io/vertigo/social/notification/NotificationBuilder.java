/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.social.notification;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Builder;
import io.vertigo.core.util.DateUtil;

/**
 * @author pchretien
 */
public final class NotificationBuilder implements Builder<Notification> {
	private String myType;
	private String myTitle;
	private String myContent;
	private String mySender;
	private Instant myCreationInstant;
	private int myTtlInSeconds = -1;
	private String myTargetUrl;
	private final UUID uuid;
	private String myUserContent;

	/**
	 * Constructor.
	 */
	NotificationBuilder() {
		uuid = UUID.randomUUID();
	}

	/**
	 * Constructor.
	 * @param uuid Notification uuid
	 */
	NotificationBuilder(final UUID uuid) {
		Assertion.checkNotNull(uuid);
		//-----
		this.uuid = uuid;
	}

	/**
	 * @param sender Sender's name
	 * @return this builder
	 */
	public NotificationBuilder withSender(final String sender) {
		Assertion.checkArgument(mySender == null, "sender already set");
		Assertion.checkArgNotEmpty(sender);
		//-----
		mySender = sender;
		return this;
	}

	/**
	 * @param type Notification's type
	 * @return this builder
	 */
	public NotificationBuilder withType(final String type) {
		Assertion.checkArgument(myType == null, "type already set");
		//type is nullable
		//-----
		myType = type;
		return this;
	}

	/**
	 * @param creationInstant Creation date
	 * @return this builder
	 */
	public NotificationBuilder withCreationDate(final Instant creationInstant) {
		Assertion.checkArgument(myCreationInstant == null, "creationDate already set");
		Assertion.checkNotNull(creationInstant);
		//-----
		myCreationInstant = creationInstant;
		return this;
	}

	/**
	 * @param title Notification's title
	 * @return this builder
	 */
	public NotificationBuilder withTitle(final String title) {
		Assertion.checkArgument(myTitle == null, "title already set");
		Assertion.checkArgNotEmpty(title);
		//-----
		myTitle = title;
		return this;
	}

	/**
	 * @param content Notification's content
	 * @return this builder
	 */
	public NotificationBuilder withContent(final String content) {
		Assertion.checkArgument(myContent == null, "content already set");
		Assertion.checkArgNotEmpty(content);
		//-----
		myContent = content;
		return this;
	}

	/**
	 * @param ttlInSeconds Notification's TimeToLive
	 * @return this builder
	 */
	public NotificationBuilder withTTLInSeconds(final int ttlInSeconds) {
		Assertion.checkArgument(ttlInSeconds > 0 || ttlInSeconds == -1, "ttl must be strictly positive or undefined.");
		//-----
		myTtlInSeconds = ttlInSeconds;
		return this;
	}

	/**
	 * @param targetUrl Notification's target url
	 * @return this builder
	 */
	public NotificationBuilder withTargetUrl(final String targetUrl) {
		Assertion.checkArgument(myTargetUrl == null, "targetUrl already set");
		Assertion.checkArgNotEmpty(targetUrl);
		//-----
		myTargetUrl = targetUrl;
		return this;
	}

	/**
	 * @param userContent Notification's userContent ("" and null are translated to Optional.empty)
	 * @return this builder
	 */
	public NotificationBuilder withUserContent(final String userContent) {
		Assertion.checkArgument(myUserContent == null, "userContent already set");
		Assertion.checkNotNull(userContent);
		//-----
		myUserContent = ("".equals(userContent) ? null : userContent);// "" translated to Optional.empty
		return this;
	}

	/** {@inheritDoc} */
	@Override
	public Notification build() {
		if (myCreationInstant == null) {
			myCreationInstant = DateUtil.newInstant();
		}

		return new Notification(uuid, mySender, myType, myTitle, myContent, myTtlInSeconds, myCreationInstant, myTargetUrl, Optional.ofNullable(myUserContent));
	}
}
