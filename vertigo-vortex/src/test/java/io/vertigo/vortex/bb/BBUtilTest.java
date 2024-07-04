/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.vortex.bb;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.vortex.VortexFeatures;

public class BBUtilTest {

	@Inject
	private BlackBoardManager blackBoardManager;

	private AutoCloseableNode node;

	@BeforeEach
	public final void setUp() throws Exception {
		node = new AutoCloseableNode(buildNodeConfig());
		DIInjector.injectMembers(this, node.getComponentSpace());
	}

	private NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.addModule(
						new VortexFeatures()
								.withBlackboard()
								.withMemoryBlackboard()
								.build())
				.build();
	}

	@AfterEach
	public final void tearDown() throws Exception {
		if (node != null) {
			node.close();
		}
	}

	@Test
	public void testFormatter0() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		Assertions.assertEquals("hello world", blackBoard.format("hello world"));
	}

	@Test
	public void testFormatter1() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		Assertions.assertEquals("hello world", blackBoard.format("hello world"));
		blackBoard.string().put(BBKey.of("/name"), "joe");
		blackBoard.string().put(BBKey.of("/lastname"), "diMagio");
		//---
		Assertions.assertEquals("joe", blackBoard.format("{{/name}}"));
		Assertions.assertEquals("hello joe", blackBoard.format("hello {{/name}}"));
		Assertions.assertEquals("hello joe...", blackBoard.format("hello {{/name}}..."));
		Assertions.assertEquals("hello joe diMagio", blackBoard.format("hello {{/name}} {{/lastname}}"));
		Assertions.assertThrows(IllegalStateException.class,
				() -> blackBoard.format("hello {{/name}"));
		Assertions.assertThrows(IllegalStateException.class,
				() -> blackBoard.format("hello {{/name"));
		Assertions.assertThrows(IllegalStateException.class,
				() -> blackBoard.format("hello name}}"));
	}

	@Test
	public void testFormatter2() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		blackBoard.string().put(BBKey.of("/u/1/name"), "alan");
		blackBoard.string().put(BBKey.of("/u/2/name"), "ada");
		blackBoard.string().put(BBKey.of("/u/idx"), "2");
		Assertions.assertEquals("hello ada", blackBoard.format("hello {{/u/{{/u/idx}}/name}}"));
	}
}
