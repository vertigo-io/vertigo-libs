package io.vertigo.addons.notification;

import io.vertigo.addons.account.Account;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;

import java.util.UUID;

/**
 * @author pchretien
 */
public final class Notification {
	private final URI<Account> sender;
	private final String title;
	private final String msg;
	private final int ttlInSeconds;
	private final UUID uuid;

	//	private final Date creationDate;

	public Notification(final UUID uuid, final URI<Account> sender, final String title, final String msg, final int ttlInSeconds) {
		Assertion.checkNotNull(uuid);
		Assertion.checkNotNull(sender);
		Assertion.checkArgNotEmpty(title);
		Assertion.checkArgNotEmpty(msg);
		Assertion.checkArgument(ttlInSeconds == -1 || ttlInSeconds > 0, "ttl must be positive or undefined (-1).");
		//-----
		this.uuid = uuid;
		this.sender = sender;
		this.title = title;
		this.msg = msg;
		this.ttlInSeconds = ttlInSeconds;
	}

	public UUID getUuid() {
		return uuid;
	}

	public URI<Account> getSender() {
		return sender;
	}

	//	public Date getCreationDate() {
	//		return creationDate;
	//	}

	public String getTitle() {
		return title;
	}

	public String getMsg() {
		return msg;
	}

	public int getTTLInSeconds() {
		return ttlInSeconds;
	}
}
