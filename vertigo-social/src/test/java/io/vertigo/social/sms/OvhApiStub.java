/*
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
package io.vertigo.social.sms;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import io.vertigo.social.plugins.sms.ovh.OvhSmsWebServiceClient;
import io.vertigo.vega.webservice.WebServices;

public class OvhApiStub implements OvhSmsWebServiceClient, WebServices {

	@Override
	public Map sendSms(final String serviceName, final String sender, final List<String> receivers, final String message, final boolean noStopClause) {
		System.out.println("envoi du sms : sender :" + sender + " message :" + message + "destinataires : " + receivers.stream().collect(Collectors.joining(", ")));
		return Map.of(
				"validReceivers", receivers,
				"totalCreditsRemoved", 0.0);
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
