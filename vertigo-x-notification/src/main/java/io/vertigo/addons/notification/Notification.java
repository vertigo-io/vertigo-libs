package io.vertigo.addons.notification;

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
	private final int ttlInSeconds;
	private final Date creationDate;

	public Notification(final UUID uuid, final String sender, final String type, final String title, final String msg, final Date creationDate, final int ttlInSeconds) {
		Assertion.checkNotNull(uuid);
		Assertion.checkArgNotEmpty(sender);
		Assertion.checkArgNotEmpty(title);
		Assertion.checkArgNotEmpty(msg);
		Assertion.checkArgument(ttlInSeconds == -1 || ttlInSeconds > 0, "ttl must be positive or undefined (-1).");
		Assertion.checkNotNull(creationDate);
		//-----
		this.uuid = uuid;
		this.sender = sender;
		this.type = type;
		this.title = title;
		this.msg = msg;
		this.creationDate = creationDate;
		this.ttlInSeconds = ttlInSeconds;
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

	public int getTTLInSeconds() {
		return ttlInSeconds;
	}
}
