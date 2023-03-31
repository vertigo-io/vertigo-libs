package io.vertigo.social.sms;

import java.util.List;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
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
	public final void setUp() {
		node = new AutoCloseableNode(buildNodeConfig());
		DIInjector.injectMembers(this, node.getComponentSpace());
	}

	@AfterEach
	public final void tearDown() {
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
						.withSms()
						.withOvhSmsPlugin(
								Param.of("serviceName", "someService"))
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
		smsManager.sendSms(sms);
	}

}
