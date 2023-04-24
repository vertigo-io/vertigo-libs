package io.vertigo.social.plugins.sms.ovh;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.param.ParamValue;
import io.vertigo.social.impl.sms.SmsSendPlugin;
import io.vertigo.social.sms.Sms;
import io.vertigo.social.sms.SmsSendingReport;

public class OvhSmsSendPlugin implements SmsSendPlugin {

	private final AnalyticsManager analyticsManager;
	private final OvhSmsWebServiceClient ovhSmsWebServiceClient;
	private final String serviceName;

	private final boolean acceptAll;
	private final List<String> whitelistPrefixes;

	@Inject
	public OvhSmsSendPlugin(
			final @ParamValue("whitelistPrefixes") Optional<String> whitelistPrefixesOpt,
			final @ParamValue("serviceName") String serviceName,
			final OvhSmsWebServiceClient ovhSmsWebServiceClient,
			final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotNull(whitelistPrefixesOpt)
				.isNotNull(ovhSmsWebServiceClient)
				.isNotNull(analyticsManager);
		//---
		this.analyticsManager = analyticsManager;
		this.ovhSmsWebServiceClient = ovhSmsWebServiceClient;
		this.serviceName = serviceName;
		if (whitelistPrefixesOpt.isPresent() && !whitelistPrefixesOpt.get().isBlank()) {
			acceptAll = false;
			whitelistPrefixes = Arrays.asList(whitelistPrefixesOpt.get().split(";"))
					.stream()
					.map(prefix -> prefix.replace(" ", ""))
					.collect(Collectors.toList());
		} else {
			acceptAll = true;
			whitelistPrefixes = Collections.emptyList();
		}

	}

	@Override
	public boolean acceptSms(final Sms sms) {
		return acceptAll ||
				sms.getReceivers().stream()
						.map(receiver -> receiver.replace(" ", ""))
						.allMatch(receiver -> whitelistPrefixes.stream().anyMatch(prefix -> receiver.startsWith(prefix)));
	}

	@Override
	public SmsSendingReport sendSms(final Sms sms) {
		final var ovhSendingReportMap = ovhSmsWebServiceClient.sendSms(
				serviceName,
				sms.getSender(),
				sms.getReceivers(),
				sms.getTextContent(),
				sms.isNonCommercialMessage());

		analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer.addTag("ovh-serviceName", serviceName));

		final List<String> validReceivers = (List<String>) ovhSendingReportMap.getOrDefault("validReceivers", Collections.emptyList());
		final Double totalCreditsRemoved = (Double) ovhSendingReportMap.getOrDefault("totalCreditsRemoved", 0.0);

		return new SmsSendingReport(totalCreditsRemoved, !validReceivers.isEmpty());

	}

}
