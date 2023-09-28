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

public class ScannerTest {
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

	private static NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.addPlugin(ClassPathResourceResolverPlugin.class)
						.build())
				.build();
	}

	//=========================================================================
	//=== WORDS 
	//=========================================================================
	@ParameterizedTest
	@ValueSource(strings = { "lorem ip-s_u.m test", " lorem   ip-s_u.m t", " lorem   ip-s_u.m\r\nt" })
	public void test00(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(3, tokens.size());
		assertEquals("lorem", tokens.get(0).value());
		assertEquals(TokenType.word, tokens.get(0).type());
		assertEquals("ip-s_u.m", tokens.get(1).value());
		assertEquals(TokenType.word, tokens.get(1).type());
		assertEquals(TokenType.word, tokens.get(2).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "test99", "t99678", " test88   ", "   t_-.__", "   t_-.__   ", "   t_12-.   " })
	public void test01(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertEquals(6, tokens.get(0).value().length());
		assertEquals(TokenType.word, tokens.get(0).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "lorém", " lorém ", "lor%m", "&lorem" })
	public void testFail01(String src) {
		Assertions.assertThrows(VUserException.class, () -> tokenize(src));
	}

	@ParameterizedTest
	@ValueSource(strings = { "test,", " test;", "test:" })
	public void test03(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(2, tokens.size());
		assertEquals(TokenType.word, tokens.get(0).type());
		assertEquals(TokenType.separator, tokens.get(1).type());
	}

	//=========================================================================
	//=== INTEGERS 
	//=========================================================================
	@ParameterizedTest
	@ValueSource(strings = { "1 999 8", " 1 999 8 ", " 1 999 8\r\n", " 1 999 \r\n8" })
	public void test10(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(3, tokens.size());
		assertEquals("1", tokens.get(0).value());
		assertEquals(TokenType.integer, tokens.get(0).type());
		assertEquals("999", tokens.get(1).value());
		assertEquals(TokenType.integer, tokens.get(1).type());
		assertEquals("8", tokens.get(2).value());
		assertEquals(TokenType.integer, tokens.get(2).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "1A", "  99A", "9." })
	public void test11(String src) {
		Assertions.assertThrows(VUserException.class, () -> tokenize(src));
	}

	@ParameterizedTest
	@ValueSource(strings = { "1,", " 1;", "1:" })
	public void test12(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(2, tokens.size());
		assertEquals(TokenType.integer, tokens.get(0).type());
		assertEquals(TokenType.separator, tokens.get(1).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "1{8}", " 1(5)", "1[21]" })
	public void test13(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(4, tokens.size());
		assertEquals(TokenType.integer, tokens.get(0).type());
		assertEquals(TokenType.bracket, tokens.get(1).type());
		assertEquals(TokenType.integer, tokens.get(2).type());
		assertEquals(TokenType.bracket, tokens.get(3).type());
	}

	//=========================================================================
	//=== BOOLEANS 
	//=========================================================================
	@ParameterizedTest
	@ValueSource(strings = { "true", " true ", " true\r\n", "false", " false ", " false\r\n" })
	public void test20(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertTrue(List.of("true", "false").contains(tokens.get(0).value()));
		assertEquals(TokenType.bool, tokens.get(0).type());
	}

	//=========================================================================
	//=== STRINGS 
	//=========================================================================
	@ParameterizedTest
	@ValueSource(strings = { "\"lorem\"", " \"lorem\" ", "\"lorem\"\r\n" })

	public void test30(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertEquals("lorem", tokens.get(0).value());
		assertEquals(TokenType.string, tokens.get(0).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "\"lorem", " lorem\" ", "\"lorem\r\n", "\"\"" })
	public void testFail31(String src) {
		Assertions.assertThrows(VUserException.class, () -> tokenize(src));
	}

	//=========================================================================
	//=== COMMENTS 
	//=========================================================================
	@ParameterizedTest
	@ValueSource(strings = { "#lorem", " #lorem", "    #lorem\r\n" })
	public void test50(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertEquals("lorem", tokens.get(0).value());
		assertEquals(TokenType.comment, tokens.get(0).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "#", " #", "    #", "    #\r\n" })
	public void test51(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertEquals("", tokens.get(0).value());
		assertEquals(TokenType.comment, tokens.get(0).type());
	}

	//=========================================================================
	//=== BRACKETS 
	//=========================================================================
	@ParameterizedTest
	@ValueSource(strings = { "{}", " {}", "  {}  ", "  {   }  ", " {}\r\n", "  {  \r\n }", })
	public void test60(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(2, tokens.size());
		assertEquals("{", tokens.get(0).value());
		assertEquals("}", tokens.get(1).value());
		assertEquals(TokenType.bracket, tokens.get(0).type());
		assertEquals(TokenType.bracket, tokens.get(1).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "[]", "{}", "()", "  [   ]  ", "  {   }  ", "  (   )  " })
	public void test61(String src) {
		List<Token> tokens = tokenize(src);
		assertEquals(2, tokens.size());
		assertEquals(TokenType.bracket, tokens.get(0).type());
		assertEquals(TokenType.bracket, tokens.get(1).type());

	}

	@Test
	public void test200() {
		var src = FileUtil.read(resourceManager.resolve("io/vertigo/commons/lexer/data/src1.txt"));
		assertEquals(124, tokenize(src).size());
	}

	private static List<Token> tokenize(String src) {
		var scanner = new Scanner(src);
		List<Token> tokens = scanner.tokenize();
		//---
		var formatter = new Formatter();
		formatter.toText(tokens);
		return tokens;
	}
}
