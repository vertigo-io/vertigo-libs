/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.social.impl.sms;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.param.ParamValue;
import io.vertigo.social.sms.Sms;
import io.vertigo.social.sms.SmsManager;
import io.vertigo.social.sms.SmsSendingReport;

public final class SmsManagerImpl implements SmsManager {

	private final List<SmsSendPlugin> smsSendPlugins;
	private final Boolean silentFail;
	private final AnalyticsManager analyticsManager;
	private static final Logger LOGGER = LogManager.getLogger(SmsManagerImpl.class);

	private static final SmsSendingReport NON_SENT_SMS_REPORT = new SmsSendingReport(0.0, false);

	@Inject
	public SmsManagerImpl(
			final @ParamValue("silentFail") Optional<Boolean> silentFailOpt,
			final List<SmsSendPlugin> smsSendPlugins,
			final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotNull(silentFailOpt)
				.isNotNull(smsSendPlugins)
				.isNotNull(analyticsManager);
		//---
		silentFail = silentFailOpt.orElse(false);
		this.smsSendPlugins = smsSendPlugins;
		this.analyticsManager = analyticsManager;
		//---
		Assertion.check()
				.when(!silentFail, () -> Assertion.check().isFalse(smsSendPlugins.isEmpty(), "At least one SmsSendPlugin is required"));

	}

	@Override
	public SmsSendingReport sendSms(final Sms sms) {
		return analyticsManager.traceWithReturn(
				"sms",
				"/send",
				tracer -> {
					final Optional<SmsSendPlugin> pluginToUseOpt = smsSendPlugins.stream().filter(smsSendPlugin -> smsSendPlugin.acceptSms(sms)).findFirst();
					final SmsSendingReport smsSendingReport;
					tracer.setTag("senderName", sms.sender())
							.incMeasure("cost", 0)
							.incMeasure("sent", 0.0);
					if (pluginToUseOpt.isPresent()) {
						smsSendingReport = pluginToUseOpt.get().sendSms(sms);
					} else {
						smsSendingReport = NON_SENT_SMS_REPORT;
						if (!silentFail) {
							LOGGER.warn("No plugin found to send mail with destinations : {}",
									() -> sms.receivers() //param supplier
											.stream()
											.map(receiver -> receiver.substring(0, 5))
											.collect(Collectors.joining(", ")));
						}
					}
					tracer
							.incMeasure("cost", smsSendingReport.getCost())
							.incMeasure("sent", smsSendingReport.isSent() ? 100.0 : 0.0);
					return smsSendingReport;
				});
	}
}
