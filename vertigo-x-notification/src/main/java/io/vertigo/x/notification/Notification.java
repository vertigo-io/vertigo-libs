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
	private final String msg;
	private final String targetUrl;
	private final Date creationDate;

	public Notification(final UUID uuid, final String sender, final String type, final String title, final String msg, final Date creationDate, final String targetUrl) {
		Assertion.checkNotNull(uuid);
		Assertion.checkArgNotEmpty(sender);
		Assertion.checkArgNotEmpty(type);
		Assertion.checkArgNotEmpty(title);
		Assertion.checkArgNotEmpty(msg);
		Assertion.checkArgNotEmpty(targetUrl);
		Assertion.checkNotNull(creationDate);
		//-----
		this.uuid = uuid;
		this.sender = sender;
		this.type = type;
		this.title = title;
		this.msg = msg;
		this.creationDate = creationDate;
		this.targetUrl = targetUrl;
	}

	public UUID getUuid() {
		return uuid;
	}

	public String getSender() {
		return sender;
	}

	public String getType() {
		return type;
	}

	public String getTitle() {
		return title;
	}

	public String getMsg() {
		return msg;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public String getTargetUrl() {
		return targetUrl;
	}
}
