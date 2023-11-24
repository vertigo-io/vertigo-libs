package io.vertigo.vortex.tokenizer;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

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

public class TokenizerTest {
	private final Tokenizer tokenizer = new Tokenizer(List.of(TokenType.values()));

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

	private List<Token> tokenize(String src) {
		List<Token> tokens = tokenizer.tokenize(src);
		System.out.println(tokens);
		return tokens;
	}

	//=========================================================================
	//=== KEYWORDS
	//=========================================================================
	@ParameterizedTest
	@ValueSource(strings = { "lorem" })
	public void test000(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertEquals("lorem", tokens.get(0).value());
		assertEquals(TokenType.keyword, tokens.get(0).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "lorem ipsum est", "lorem   ipsum est" })
	public void test00(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(5, tokens.size());
		assertEquals("lorem", tokens.get(0).value());
		assertEquals(TokenType.keyword, tokens.get(0).type());
		assertEquals("ipsum", tokens.get(2).value());
		assertEquals(TokenType.keyword, tokens.get(2).type());
		assertEquals("est", tokens.get(4).value());
		assertEquals(TokenType.keyword, tokens.get(4).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "lorem-ipsum" })
	public void test01(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertEquals("lorem-ipsum", tokens.get(0).value());
		assertEquals(TokenType.keyword, tokens.get(0).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "lorém", " lorém ", "lor%m", "&lorem" })
	public void testFail01(final String src) {
		Assertions.assertThrows(VUserException.class, () -> tokenize(src));
	}

	@ParameterizedTest
	@ValueSource(strings = { "lorem,", "lorem;", "lorem:" })
	public void test03(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(2, tokens.size());
		assertEquals(TokenType.keyword, tokens.get(0).type());
		assertEquals(TokenType.punctuation, tokens.get(1).type());
	}

	//=========================================================================
	//=== KEYWORDS
	//=========================================================================
	@ParameterizedTest
	@ValueSource(strings = { "Lorem" })
	public void test100(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertEquals("Lorem", tokens.get(0).value());
		assertEquals(TokenType.identifier, tokens.get(0).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "LoremIpsum" })
	public void test101(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertEquals("LoremIpsum", tokens.get(0).value());
		assertEquals(TokenType.identifier, tokens.get(0).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "Lorem", "LoremIpsum", "LoremIpsum99" })
	public void test102(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertEquals(TokenType.identifier, tokens.get(0).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "Lorém", "Lorem_Ipsum", "Lorem-Ipsum" })
	public void testFail103(final String src) {
		Assertions.assertThrows(VUserException.class, () -> tokenize(src));
	}

	//=========================================================================
	//=== INTEGERS
	//=========================================================================
	@ParameterizedTest
	@ValueSource(strings = { "1 999 -6 8", "1 999  \r\n  -6  8", "1 999 -6\r\n8" })
	public void test10(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(7, tokens.size());

		assertEquals("1", tokens.get(0).value());
		assertEquals(TokenType.integer, tokens.get(0).type());

		assertEquals("999", tokens.get(2).value());
		assertEquals(TokenType.integer, tokens.get(2).type());

		assertEquals("-6", tokens.get(4).value());
		assertEquals(TokenType.integer, tokens.get(4).type());

		assertEquals("8", tokens.get(6).value());
		assertEquals(TokenType.integer, tokens.get(6).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { /*"1A", "  99A",*/ "9.", "-", "--7", "- 6" })
	public void test11(final String src) {
		Assertions.assertThrows(Throwable.class, () -> tokenize(src));
	}

	@ParameterizedTest
	@ValueSource(strings = { "1,", "1;", "1:" })
	public void test12(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(2, tokens.size());
		assertEquals(TokenType.integer, tokens.get(0).type());
		assertEquals(TokenType.punctuation, tokens.get(1).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "1{8}", "1(5)", "1[21]" })
	public void test13(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(4, tokens.size());
		assertEquals(TokenType.integer, tokens.get(0).type());
		assertEquals(TokenType.bracket, tokens.get(1).type());
		assertEquals(TokenType.integer, tokens.get(2).type());
		assertEquals(TokenType.bracket, tokens.get(3).type());
	}

	//	//pair not well formed
	//	@ParameterizedTest
	//	@ValueSource(strings = { "1", "test 1" })
	//	public void test14(String src) {
	//		Assertions.assertThrows(VUserException.class, () -> tokenize(src));
	//	}
	//
	//	//pair well formed
	//	@ParameterizedTest
	//	@ValueSource(strings = { "test:1", "test :1", " test : 1 " })
	//	public void test15(String src) {
	//		List<Token> tokens = tokenize(src);
	//		assertEquals(3, tokens.size());
	//	}

	//=========================================================================
	//=== BOOLEANS
	//=========================================================================
	@ParameterizedTest
	@ValueSource(strings = { "true", "false" })
	public void test20(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertEquals(TokenType.bool, tokens.get(0).type());
	}

	//
	//		//	//pair not well formed
	//		//	@ParameterizedTest
	//		//	@ValueSource(strings = { "true", "test true" })
	//		//	public void test21(String src) {
	//		//		Assertions.assertThrows(VUserException.class, () -> tokenize(src, true));
	//		//	}
	//		//
	//		//	//pair well formed
	//		//	@ParameterizedTest
	//		//	@ValueSource(strings = { "test:true", "test :true", " test : true ", "test:false", "test :false", " test : false " })
	//		//	public void test22(String src) {
	//		//		List<Token> tokens = tokenize(src, true);
	//		//		assertEquals(3, tokens.size());
	//		//	}
	//
	//=========================================================================
	//=== STRINGS
	//=========================================================================
	@ParameterizedTest
	@ValueSource(strings = { "\"lorem\"" })
	public void test30(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertEquals("\"lorem\"", tokens.get(0).value());
		assertEquals(TokenType.string, tokens.get(0).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "\"lo\\\"rem\"" }) // a token with a double quote
	public void test31(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertEquals("\"lo\\\"rem\"", tokens.get(0).value());
		assertEquals(TokenType.string, tokens.get(0).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "\"lorem\" \"IPSUM\"", "\"lorem\"     \"IPSUM\"", "\"lorem\"   \r\n  \"IPSUM\"" })
	public void test32(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(3, tokens.size());
		assertEquals("\"lorem\"", tokens.get(0).value());
		assertEquals(TokenType.string, tokens.get(0).type());
		assertEquals("\"IPSUM\"", tokens.get(2).value());
		assertEquals(TokenType.string, tokens.get(2).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "\"lorem", " lorem\" ", "\"lorem\r\n" })
	public void testFail33(final String src) {
		Assertions.assertThrows(Throwable.class, () -> tokenize(src));
	}

	//		//	//pair not well formed
	//		//	@ParameterizedTest
	//		//	@ValueSource(strings = { "\"lorem\"", "test \"lorem\" " })
	//		//	public void test32(String src) {
	//		//		Assertions.assertThrows(VUserException.class, () -> tokenize(src, true));
	//		//	}
	//
	//		//pair well formed
	//		//	@ParameterizedTest
	//		//	@ValueSource(strings = { "test:\"lorem\"", "test: \"lorem\" ", "test : \"lorem\" " })
	//		//	public void test33(String src) {
	//		//		List<Token> tokens = tokenize(src, true);
	//		//		assertEquals(3, tokens.size());
	//		//	}
	//
	//=========================================================================
	//=== COMMENTS
	//=========================================================================
	@ParameterizedTest
	@ValueSource(strings = { "#lorem", "# lorem", "# lorem  ", "#lorem", "#lorem    " })
	public void test50(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(1, tokens.size());
		assertTrue(tokens.get(0).value().trim().endsWith("lorem"));
		assertEquals(TokenType.comment, tokens.get(0).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { " #", " #test", "    #test", "    #", "\r\n# test" })
	public void test51(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(2, tokens.size());
		assertEquals(TokenType.comment, tokens.get(1).type());
	}

	//=========================================================================
	//=== BRACKETS
	//=========================================================================
	@ParameterizedTest
	@ValueSource(strings = { "{ }", "{   }", "{\r\n}" })
	public void test60(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(3, tokens.size());
		assertEquals("{", tokens.get(0).value());
		assertEquals("}", tokens.get(2).value());
		assertEquals(TokenType.bracket, tokens.get(0).type());
		assertEquals(TokenType.bracket, tokens.get(2).type());
	}

	@ParameterizedTest
	@ValueSource(strings = { "[]", "{}", "()", "<>" })
	public void test61(final String src) {
		final List<Token> tokens = tokenize(src);
		assertEquals(2, tokens.size());
		assertEquals(TokenType.bracket, tokens.get(0).type());
		assertEquals(TokenType.bracket, tokens.get(1).type());

	}

	//
	//		//=========================================================================
	//		//=== VARIABLES
	//		//=========================================================================
	//		@ParameterizedTest
	//		@ValueSource(strings = { "$/lorem", " $/lorem", "$/lorem  ", " $/lorem ", "    $/lorem\r\n" })
	//		public void test70(final String src) {
	//			final List<Token> tokens = tokenize(src, true);
	//			assertEquals(1, tokens.size());
	//			assertEquals("$/lorem", tokens.get(0).value());
	//			assertEquals(TokenType.variable, tokens.get(0).type());
	//		}
	//
	//		@ParameterizedTest
	//		@ValueSource(strings = { "$/lorem ipsum est", " $/lorem ipsum 99", "$/lorem, ipsum", " $/lorem { }", "    $/lorem\r\n ipsum est" })
	//		public void test71(final String src) {
	//			final List<Token> tokens = tokenize(src, true);
	//			assertEquals(3, tokens.size());
	//			assertEquals("$/lorem", tokens.get(0).value());
	//			assertEquals(TokenType.variable, tokens.get(0).type());
	//		}
	//
	//		//=========================================================================
	//		//=== DIRECTIVES
	//		//=========================================================================
	//		@ParameterizedTest
	//		@ValueSource(strings = { "/lorem", " /lorem", "/lorem  ", " /lorem ", "    /lorem\r\n" })
	//		public void test80(final String src) {
	//			final List<Token> tokens = tokenize(src, true);
	//			assertEquals(1, tokens.size());
	//			assertEquals("/lorem", tokens.get(0).value());
	//			assertEquals(TokenType.directive, tokens.get(0).type());
	//		}
	//
	//		@ParameterizedTest
	//		@ValueSource(strings = { "/lorem ipsum est", " /lorem ipsum 99", "/lorem, ipsum", " /lorem { }", "    /lorem\r\n ipsum est" })
	//		public void test81(final String src) {
	//			final List<Token> tokens = tokenize(src, true);
	//			assertEquals(3, tokens.size());
	//			assertEquals("/lorem", tokens.get(0).value());
	//			assertEquals(TokenType.directive, tokens.get(0).type());
	//		}
	//
	//=========================================================================
	//=== FULL
	//=========================================================================
	@Test
	public void test200() {
		final var src = FileUtil.read(resourceManager.resolve("io/vertigo/vortex/tokenizer/data/src1.txt"));
		assertEquals(80522, tokenize(src).size());
	}
}
