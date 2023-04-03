package io.vertigo.social.sms;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import io.vertigo.social.plugins.sms.ovh.OvhSmsWebServiceClient;
import io.vertigo.vega.webservice.WebServices;

public class OvhApiStub implements OvhSmsWebServiceClient, WebServices {

	@Override
	public void sendSms(final String serviceName, final String sender, final List<String> receivers, final String message, final boolean noStopClause) {
		System.out.println("envoi du sms : sender :" + sender + " message :" + message + "destinataires : " + receivers.stream().collect(Collectors.joining(", ")));

	}

	@Override
	public List<String> sms() {
		return Collections.emptyList();
	}

	@Override
	public Map smsService(final String serviceName) {
		return Collections.emptyMap();
	}

	@Override
	public List<String> smsServiceSenders(final String serviceName) {
		return Collections.emptyList();
	}

	@Override
	public String createSender(final String serviceName, final String sender, final String description, final String reason) {
		return "added";
	}

	@Override
	public Map getSenderDetail(final String serviceName, final String sender) {
		return Collections.emptyMap();
	}
}
