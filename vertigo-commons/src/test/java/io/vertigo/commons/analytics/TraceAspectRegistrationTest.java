/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.commons.analytics;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.commons.analytics.data.TestTraceConnectorPlugin;
import io.vertigo.commons.analytics.data.TraceTestServices;
import io.vertigo.core.impl.analytics.trace.TraceAspect;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;

/**
 * Test that {@link CommonsFeatures} registers the core {@code TraceAspect} so that {@code @Trace} components work without any manual aspect declaration.
 *
 * @author npiedeloup
 */
public final class TraceAspectRegistrationTest {

	@Inject
	private TraceTestServices traceTestServices;

	private AutoCloseableNode node;

	@BeforeEach
	public final void setUp() throws Exception {
		node = new AutoCloseableNode(buildNodeConfig());
		DIInjector.injectMembers(this, node.getComponentSpace());
	}

	@AfterEach
	public final void tearDown() throws Exception {
		if (node != null) {
			node.close();
		}
	}

	private NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.addAnalyticsConnectorPlugin(TestTraceConnectorPlugin.class)
						.build())
				.addModule(new CommonsFeatures()
						.build())
				.addModule(ModuleConfig.builder("vertigo-test")
						.addComponent(TraceTestServices.class)
						.build())
				.build();
	}

	/**
	 * The TraceAspect must be registered by CommonsFeatures : the @Trace component (declared in a module after vertigo-commons) is intercepted without any manual aspect declaration.
	 */
	@Test
	public void testTraceAspectRegisteredByCommonsFeatures() {
		TestTraceConnectorPlugin.reset();
		final int result = traceTestServices.add(1, 2);
		Assertions.assertEquals(3, result);
		Assertions.assertEquals(1, TestTraceConnectorPlugin.getCount());
		Assertions.assertEquals("test", TestTraceConnectorPlugin.getLastCategory());
	}

	/**
	 * Declaring TraceAspect a second time (in an app module) must fail at boot : the aspect is already registered by CommonsFeatures.
	 */
	@Test
	public void testDuplicateAspectDeclarationFailsAtBoot() {
		Assertions.assertThrows(IllegalStateException.class, () -> {
			try (final AutoCloseableNode duplicateNode = new AutoCloseableNode(buildNodeConfigWithDuplicateAspect())) {
				duplicateNode.close();
			}
		});
	}

	private NodeConfig buildNodeConfigWithDuplicateAspect() {
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.addAnalyticsConnectorPlugin(TestTraceConnectorPlugin.class)
						.build())
				.addModule(new CommonsFeatures()
						.build())
				.addModule(ModuleConfig.builder("vertigo-dup")
						.addAspect(TraceAspect.class)
						.build())
				.addModule(ModuleConfig.builder("vertigo-test")
						.addComponent(TraceTestServices.class)
						.build())
				.build();
	}
}