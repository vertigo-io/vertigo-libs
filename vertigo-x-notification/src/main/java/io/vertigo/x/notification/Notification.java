package io.vertigo.x.notification;

import io.vertigo.lang.Assertion;

import java.util.Date;
import java.util.UUID;

/**
 * @author pchretien
 */
public final class Notification {
	private final UUID uuid;
	private final String sender;
	private final String type;
	private final String title;
	private final String content;
	private final String targetUrl;
	private final Date creationDate;

	/**
	 * Constructor.
	 * @param uuid Uuid
	 * @param sender Sender name
	 * @param type Type
	 * @param title Title
	 * @param content Content
	 * @param creationDate Create date
	 * @param targetUrl Target URL of this notification
	 */
	Notification(final UUID uuid, final String sender, final String type, final String title, final String content, final Date creationDate, final String targetUrl) {
		Assertion.checkNotNull(uuid);
		Assertion.checkArgNotEmpty(sender);
		Assertion.checkArgNotEmpty(type);
		Assertion.checkArgNotEmpty(title);
		Assertion.checkArgNotEmpty(content);
		Assertion.checkArgNotEmpty(targetUrl);
		Assertion.checkNotNull(creationDate);
		//-----
		this.uuid = uuid;
		this.sender = sender;
		this.type = type;
		this.title = title;
		this.content = content;
		this.creationDate = creationDate;
		this.targetUrl = targetUrl;
	}

	/**
	 * @return Uuid
	 */
	public UUID getUuid() {
		return uuid;
	}

	/**
	 * @return Sender's name
	 */
	public String getSender() {
		return sender;
	}

	/**
	 * @return Notification's type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @return Notification's type
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @return Notification's content
	 */
	public String getContent() {
		return content;
	}

	/**
	 * @return Creation date
	 */
	public Date getCreationDate() {
		return creationDate;
	}

	/**
	 * @return Notification's target url
	 */
	public String getTargetUrl() {
		return targetUrl;
	}
}
