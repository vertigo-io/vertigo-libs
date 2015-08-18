package io.vertigo.addons.notification;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;
import io.vertigo.util.DateUtil;

import java.util.Date;
import java.util.UUID;

/**
 * @author pchretien
 */
public final class NotificationBuilder implements Builder<Notification> {
	private String myType;
	private String myTitle;
	private String myMsg;
	private String mySender;
	private Date myCreationDate = DateUtil.newDateTime();
	private int myTtlInSeconds = -1;
	private final UUID uuid;

	public NotificationBuilder() {
		uuid = UUID.randomUUID();
	}

	public NotificationBuilder(final UUID uuid) {
		Assertion.checkNotNull(uuid);
		//-----
		this.uuid = uuid;
	}

	public NotificationBuilder withSender(final String sender) {
		Assertion.checkArgument(mySender == null, "sender already set");
		Assertion.checkArgNotEmpty(sender);
		//-----
		mySender = sender;
		return this;
	}

	public NotificationBuilder withType(final String type) {
		Assertion.checkArgument(myType == null, "type already set");
		Assertion.checkArgNotEmpty(type);
		//-----
		myType = type;
		return this;
	}

	public NotificationBuilder withCreationDate(final Date creationDate) {
		Assertion.checkArgument(myCreationDate == null, "creationDate already set");
		Assertion.checkNotNull(creationDate);
		//-----
		myCreationDate = creationDate;
		return this;
	}

	public NotificationBuilder withTitle(final String title) {
		Assertion.checkArgument(myTitle == null, "title already set");
		Assertion.checkArgNotEmpty(title);
		//-----
		myTitle = title;
		return this;
	}

	public NotificationBuilder withMsg(final String msg) {
		Assertion.checkArgument(myMsg == null, "msg already set");
		Assertion.checkArgNotEmpty(msg);
		//-----
		myMsg = msg;
		return this;
	}

	public NotificationBuilder withTTLinSeconds(final int ttlInSeconds) {
		Assertion.checkArgument(ttlInSeconds > 0, "ttl must be strictly positive or undefined.");
		//-----
		myTtlInSeconds = ttlInSeconds;
		return this;
	}

	@Override
	public Notification build() {
		return new Notification(uuid, mySender, myType, myTitle, myMsg, myCreationDate, myTtlInSeconds);
	}
}
