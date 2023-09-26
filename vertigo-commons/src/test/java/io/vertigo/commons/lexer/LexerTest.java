package io.vertigo.commons.lexer;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

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

	@ParameterizedTest
	@ValueSource(strings = { "lorem ip-s_u.m", " lorem   ip-s_u.m ", " lorem   ip-s_u.m\r\n" })
	public void test00(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(2, tokenize(src).size());
		assertEquals("lorem", tokens.get(0).value());
		assertEquals(TokenType.word, tokens.get(0).type());
		assertEquals("ip-s_u.m", tokens.get(1).value());
		assertEquals(TokenType.word, tokens.get(1).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "999 88", " 999 88 ", " 999 88\r\n" })
	public void test10(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(2, tokenize(src).size());
		assertEquals("999", tokens.get(0).value());
		assertEquals(TokenType.integer, tokens.get(0).type());
		assertEquals("88", tokens.get(1).value());
		assertEquals(TokenType.integer, tokens.get(1).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "true", " true ", " true\r\n", "false", " false ", " false\r\n" })
	public void test20(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(1, tokenize(src).size());
		assertTrue(List.of("true", "false").contains(tokens.get(0).value()));
		assertEquals(TokenType.bool, tokens.get(0).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "\"lorem\"", " \"lorem\" ", "\"lorem\"\r\n" })
	public void test30(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(1, tokenize(src).size());
		assertEquals("lorem", tokens.get(0).value());
		assertEquals(TokenType.string, tokens.get(0).type());
	}

	//	@Test
	//	public void test40() {
	//		var src = "create";
	//		List<Token> tokens = tokenize(src);
	//		assertEquals(1, tokenize(src).size());
	//		assertEquals(src, tokens.get(0).value());
	//		assertEquals(TokenType.word, tokens.get(0).type());
	//	}

	@ParameterizedTest
	@ValueSource(strings = { "#lorem", " #lorem", "    #lorem\r\n" })
	public void test50(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(1, tokenize(src).size());
		assertEquals("lorem", tokens.get(0).value());
		assertEquals(TokenType.comment, tokens.get(0).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "{}", " {}", "  {}  ", "  {   }  ", " {}\r\n", "  {}  \r\n" })
	public void test60(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(2, tokenize(src).size());
		assertEquals("{", tokens.get(0).value());
		assertEquals("}", tokens.get(1).value());
		assertEquals(TokenType.bracket, tokens.get(0).type());
		assertEquals(TokenType.bracket, tokens.get(1).type());
	}

	@Test
	public void test200() {
		var src = FileUtil.read(resourceManager.resolve("io/vertigo/commons/lexer/data/src1.txt"));
		assertEquals(124, tokenize(src).size());
	}

	@Test
	public void test100() {
		var src = "[]{};,: []{}";
		assertEquals(11, tokenize(src).size());

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

	private List<Token> tokenize(String src) {
		var scanner = new Scanner(src);
		List<Token> tokens = scanner.tokenize();
		//---
		var formatter = new Formatter();
		formatter.toText(tokens);
		return tokens;
	}
}
