package io.vertigo.social.impl.sms;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.social.sms.Sms;
import io.vertigo.social.sms.SmsManager;

public final class SmsManagerImpl implements SmsManager {

	private final List<SmsSendPlugin> smsSendPlugins;
	private final Boolean silentFail;;

	@Inject
	public SmsManagerImpl(
			final @ParamValue("silentFail") Optional<Boolean> silentFailOpt,
			final List<SmsSendPlugin> smsSendPlugins) {
		Assertion.check()
				.isNotNull(silentFailOpt)
				.isNotNull(smsSendPlugins);
		//---
		silentFail = silentFailOpt.orElse(false);
		this.smsSendPlugins = smsSendPlugins;
		//---
		Assertion.check()
				.when(!silentFail, () -> Assertion.check().isFalse(smsSendPlugins.isEmpty(), "At least one SmsSendPlugin is required"));

	}

	@Override
	public void sendSms(final Sms sms) {
		final Optional<SmsSendPlugin> pluginToUseOpt = smsSendPlugins.stream().filter(smsSendPlugin -> smsSendPlugin.acceptSms(sms)).findFirst();
		if (pluginToUseOpt.isPresent()) {
			pluginToUseOpt.get().sendSms(sms);
		} else if (!silentFail) {
			throw new VSystemException(
					"No plugin found to send mail with destinations : ",
					sms.getReceivers()
							.stream()
							.map(receiver -> receiver.substring(0, 5))
							.collect(Collectors.joining(", ")));
		}
	}
}
