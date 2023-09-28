package io.vertigo.commons.lexer;

import java.util.regex.Pattern;

import io.vertigo.core.lang.Assertion;

public record Token(TokenType type, String value) {
	private static final String INTEGER_REGEX = "[0-9]+";

	@Override
	public String toString() {
		return "{ type:" + type + ", " + "value:" + value + " }";
	}

	static Token punctuation(char punctuation) {
		return new Token(TokenType.punctuation, Character.toString(punctuation));
	}

	static Token bracket(char bracket) {
		return new Token(TokenType.bracket, Character.toString(bracket));
	}

	static Token bool(String bool) {
		Assertion.check()
				.isTrue("true".equals(bool) || "false".equals(bool), "a bool must be true or false");
		//---
		return new Token(TokenType.bool, bool);
	}

	static Token integer(String integer) {
		Assertion.check()
				.isTrue(Pattern.matches(INTEGER_REGEX, integer), "an integer must contain only digits : " + integer);
		//---
		return new Token(TokenType.integer, integer);
	}

}
