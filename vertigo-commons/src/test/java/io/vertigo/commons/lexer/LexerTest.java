package io.vertigo.commons.lexer;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.core.lang.VUserException;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.core.resource.ResourceManager;
import io.vertigo.core.util.FileUtil;

public class LexerTest {
	@Inject
	private ResourceManager resourceManager;

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

	@Test
	public void test() {
		var lexer = new Scanner("lorem ipsum");
		assertEquals(2, lexer.tokenize().size());

		lexer = new Scanner("lor-e-m ip__s.um");
		assertEquals(2, lexer.tokenize().size());

		lexer = new Scanner("  lorem ipsum   ");
		assertEquals(2, lexer.tokenize().size());

		lexer = new Scanner("  \"lorem\" ipsum   ");
		assertEquals(2, lexer.tokenize().size());

		lexer = new Scanner("  { lorem ipsum }");
		assertEquals(4, lexer.tokenize().size());

		lexer = new Scanner("  { lorem, ipsum }");
		assertEquals(5, lexer.tokenize().size());

		lexer = new Scanner("  lorem ipsum #jhdfjdhfjd");
		assertEquals(2, lexer.tokenize().size());

		lexer = new Scanner("  lorem 123 ");
		assertEquals(2, lexer.tokenize().size());

		lexer = new Scanner("0 1 2 3 456");
		assertEquals(5, lexer.tokenize().size());

		lexer = new Scanner("[]{};,: []{}");
		assertEquals(11, lexer.tokenize().size());

		lexer = new Scanner("true false");
		assertEquals(2, lexer.tokenize().size());
	}

	@Test
	public void testFile() {
		final String source = FileUtil.read(resourceManager.resolve("io/vertigo/commons/lexer/data/src1.txt"));
		var lexer = new Scanner(source);
		assertEquals(11, lexer.tokenize().size());
	}

	@Test
	public void testFail0() {
		var lexer = new Scanner("  lorém ipsum"); //word can't contain é
		Assertions.assertThrows(VUserException.class, () -> lexer.tokenize());
	}

	@Test
	public void testFail1() {
		var lexer = new Scanner("  \"lorem"); //litteral must be closed
		Assertions.assertThrows(VUserException.class, () -> lexer.tokenize());
	}

	@Test
	public void testFail2() {
		var lexer = new Scanner("  &test "); //Unexpected Char
		Assertions.assertThrows(VUserException.class, () -> lexer.tokenize());
	}

	@Test
	public void testFail3() {
		var lexer = new Scanner("  \"test \r\n"
				+ " second line\" "); //Unexpected Char
		Assertions.assertThrows(VUserException.class, () -> lexer.tokenize());
	}

	private static NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.addPlugin(ClassPathResourceResolverPlugin.class)
						.build())
				.build();
	}
}
