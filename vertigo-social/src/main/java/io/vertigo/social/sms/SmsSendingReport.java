package io.vertigo.social.sms;

public final class SmsSendingReport {

	private final double cost;
	private final boolean sent;

	public SmsSendingReport(final double cost, final boolean sent) {
		this.cost = cost;
		this.sent = sent;
	}

	public double getCost() {
		return cost;
	}

	public boolean isSent() {
		return sent;
	}

}
