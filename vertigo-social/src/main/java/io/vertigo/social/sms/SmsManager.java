package io.vertigo.social.sms;

import io.vertigo.core.node.component.Manager;

public interface SmsManager extends Manager {
	/**
	 * Send a SMS.
	 * @param sms sms to send
	 * @return a sending report
	 */
	SmsSendingReport sendSms(Sms sms);
}
