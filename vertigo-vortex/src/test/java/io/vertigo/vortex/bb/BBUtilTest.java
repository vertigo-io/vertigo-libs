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
		blackBoard.putString(BBKey.of("/name"), "joe");
		blackBoard.putString(BBKey.of("/lastname"), "diMagio");
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
		blackBoard.putString(BBKey.of("/u/1/name"), "alan");
		blackBoard.putString(BBKey.of("/u/2/name"), "ada");
		blackBoard.putString(BBKey.of("/u/idx"), "2");
		Assertions.assertEquals("hello ada", blackBoard.format("hello {{/u/{{/u/idx}}/name}}"));
	}
}
