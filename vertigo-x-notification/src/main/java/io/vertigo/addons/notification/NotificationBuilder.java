package io.vertigo.addons.notification;

import io.vertigo.addons.account.Account;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;

import java.util.UUID;

/**
 * @author pchretien
 */
public final class NotificationBuilder implements Builder<Notification> {
	private String myTitle;
	private String myMsg;
	private URI<Account> mySender;
	private int myTtlInSeconds = -1;
	private final UUID uuid;

	public NotificationBuilder() {
		this.uuid = UUID.randomUUID();
	}

	public NotificationBuilder(final UUID uuid) {
		Assertion.checkNotNull(uuid);
		//-----
		this.uuid = uuid;
	}

	public NotificationBuilder withSender(final URI<Account> sender) {
		Assertion.checkArgument(mySender == null, "sender already set");
		Assertion.checkNotNull(sender);
		//-----
		this.mySender = sender;
		return this;
	}

	public NotificationBuilder withTitle(final String title) {
		Assertion.checkArgument(myTitle == null, "title already set");
		Assertion.checkArgNotEmpty(title);
		//-----
		this.myTitle = title;
		return this;
	}

	public NotificationBuilder withMsg(final String msg) {
		Assertion.checkArgument(myMsg == null, "msg already set");
		Assertion.checkArgNotEmpty(msg);
		//-----
		this.myMsg = msg;
		return this;
	}

	public NotificationBuilder withTTLinSeconds(final int ttlInSeconds) {
		Assertion.checkArgument(ttlInSeconds > 0, "ttl must be strictly positive or undefined.");
		//-----
		this.myTtlInSeconds = ttlInSeconds;
		return this;
	}

	@Override
	public Notification build() {
		return new Notification(uuid, mySender, myTitle, myMsg, myTtlInSeconds);
	}
}
