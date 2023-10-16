package io.vertigo.commons.lexer;

import java.util.regex.Pattern;

import io.vertigo.core.lang.Assertion;

public record Token(TokenType type, String value) {

	private static final String INTEGER_REGEX = "[\\-]?\\d+";
	private static final String WORD_REGEX = "[a-zA-Z][a-zA-Z0-9_\\-\\.]*";
	private static final String BOOL_REGEX = "true|false";

	public Token {
		switch (type) {
			case word:
				Assertion.check()
						.isTrue(Pattern.matches(WORD_REGEX, value), "a word must contain only letters, digits or '-', '_', '.'  >" + value);
				break;
			case string:
				break;
			case integer:
				Assertion.check()
						.isTrue(Pattern.matches(INTEGER_REGEX, value), "an integer must contain only digits after an optional minus sign : " + value);
				break;
			case bool:
				Assertion.check()
						.isTrue(Pattern.matches(BOOL_REGEX, value), "a bool must be true or false");
				break;
			case comment:
			case bracket:
			case punctuation:
		}
	}

	boolean isWord() {
		return type == TokenType.word;
	}

	boolean isBracket() {
		return type == TokenType.bracket;
	}

	boolean isLiteral() {
		return switch (type()) {
			case string -> true;
			case integer -> true;
			case bool -> true;
			default -> false;
		};
	}

	@Override
	public String toString() {
		return "{ type:" + type + ", " + "value:" + value + " }";
	}
}
