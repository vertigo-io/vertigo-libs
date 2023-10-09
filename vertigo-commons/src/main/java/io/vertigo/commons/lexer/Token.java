package io.vertigo.commons.lexer;

import java.util.regex.Pattern;

import io.vertigo.core.lang.Assertion;

public record Token(TokenType type, String value) {

	private static final String INTEGER_REGEX = "[\\-]?\\d+";
	private static final String WORD_REGEX = "[a-zA-Z][a-zA-Z0-9_\\-\\.]*";

	public Token {
		switch (type) {
			case comment:
				break;
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
						.isTrue("true".equals(value) || "false".equals(value), "a bool must be true or false");
				break;
			default:
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
