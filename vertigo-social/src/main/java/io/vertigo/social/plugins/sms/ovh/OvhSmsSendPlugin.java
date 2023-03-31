package io.vertigo.social.plugins.sms.ovh;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.param.ParamValue;
import io.vertigo.social.impl.sms.SmsSendPlugin;
import io.vertigo.social.sms.Sms;

public class OvhSmsSendPlugin implements SmsSendPlugin {

	private final OvhSmsWebServiceClient ovhSmsWebServiceClient;
	private final String serviceName;

	private final boolean acceptAll;
	private final List<String> whitelistPrefixes;

	@Inject
	public OvhSmsSendPlugin(
			final @ParamValue("whitelistPrefixes") Optional<String> whitelistPrefixesOpt,
			final @ParamValue("serviceName") String serviceName,
			final OvhSmsWebServiceClient ovhSmsWebServiceClient) {
		Assertion.check()
				.isNotNull(whitelistPrefixesOpt)
				.isNotNull(ovhSmsWebServiceClient);
		//---
		this.ovhSmsWebServiceClient = ovhSmsWebServiceClient;
		this.serviceName = serviceName;
		if (whitelistPrefixesOpt.isPresent()) {
			acceptAll = false;
			whitelistPrefixes = Arrays.asList(whitelistPrefixesOpt.get().split(";"));
		} else {
			acceptAll = true;
			whitelistPrefixes = Collections.emptyList();
		}

	}

	@Override
	public boolean acceptSms(final Sms sms) {
		return acceptAll ||
				sms.getReceivers().stream().allMatch(receiver -> whitelistPrefixes.stream().anyMatch(prefix -> receiver.startsWith(prefix)));
	}

	@Override
	public void sendSms(final Sms sms) {
		ovhSmsWebServiceClient.sendSms(
				serviceName,
				sms.getSender(),
				sms.getReceivers(),
				sms.getTextContent(),
				sms.isNonCommercialMessage());

	}

}
