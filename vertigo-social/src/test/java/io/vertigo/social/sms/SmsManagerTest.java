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

import java.util.List;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.connectors.httpclient.HttpClientFeatures;
import io.vertigo.connectors.javalin.JavalinFeatures;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.datamodel.DataModelFeatures;
import io.vertigo.social.MyNodeConfig;
import io.vertigo.social.SocialFeatures;
import io.vertigo.vega.VegaFeatures;

/**
 * Test de l'implémentation standard.
 *
 * @author mlaroche
 */
public final class SmsManagerTest {

	@Inject
	private SmsManager smsManager;

	private AutoCloseableNode node;

	@BeforeEach
	public void setUp() {
		node = new AutoCloseableNode(buildNodeConfig());
		DIInjector.injectMembers(this, node.getComponentSpace());
	}

	@AfterEach
	public void tearDown() {
		if (node != null) {
			node.close();
		}
	}

	private NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.withLocales("fr_FR")
						.build())
				.addModule(new HttpClientFeatures()
						.withHttpClient(
								Param.of("name", "ovhSms"),
								Param.of("urlPrefix", "http://localhost:" + MyNodeConfig.WS_PORT))
						.build())
				.addModule(new JavalinFeatures()
						.withEmbeddedServer(Param.of("port", MyNodeConfig.WS_PORT))
						.build())
				.addModule(new DataModelFeatures().build())
				.addModule(new VegaFeatures()
						.withWebServices()
						.withJavalinWebServerPlugin()
						.withWebServicesProxyClient()
						.build())
				.addModule(new SocialFeatures()
						.withSms(
								Param.of("silentFail", "false"))
						.withOvhSmsPlugin(
								Param.of("serviceName", "someService"),
								Param.of("whitelistPrefixes", "+33;06;07"))
						.withOvhRequestSpecializer(
								Param.of("appKey", "titi"),
								Param.of("appSecret", "toto"),
								Param.of("consumerKey", "tutu"))
						.build())
				.addModule(ModuleConfig.builder("my-module")
						.addComponent(OvhApiStub.class)
						.build())
				.build();
	}

	/**
	 * Test sending an SMS
	 */
	@Test
	public void testSendSms() {
		final Sms sms = new Sms("A Sender", List.of("+33612345678"), "Hello!", false);
		final var report = smsManager.sendSms(sms);
		Assertions.assertTrue(report.isSent());
	}

	@Test
	public void testSendUnsupportedReceiver() {
		final Sms sms = new Sms("A Sender", List.of("0112345678"), "Hello!", false);
		final var report = smsManager.sendSms(sms);
		Assertions.assertFalse(report.isSent());
	}

}
