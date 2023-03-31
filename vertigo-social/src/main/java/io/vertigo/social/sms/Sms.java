package io.vertigo.social.sms;

import java.util.List;

import io.vertigo.core.lang.Assertion;

public final class Sms {

	private final String sender;
	private final List<String> receivers;
	private final String textContent;
	private final boolean nonCommercialMessage;

	public Sms(final String sender, final List<String> receivers, final String textContent, final boolean nonCommercialMessage) {
		Assertion.check()
				.isNotNull(receivers)
				.isFalse(receivers.isEmpty(), "At least one receiver is needed for an sms")
				.isNotBlank(textContent);
		//---
		this.sender = sender;
		this.receivers = receivers;
		this.textContent = textContent;
		this.nonCommercialMessage = nonCommercialMessage;
	}

	public String getSender() {
		return sender;
	}

	public List<String> getReceivers() {
		return receivers;
	}

	public String getTextContent() {
		return textContent;
	}

	public boolean isNonCommercialMessage() {
		return nonCommercialMessage;
	}

}
