package io.vertigo.commons.lexer;

public record Token(TokenType type, String value) {
	public Token {
		type.check(value);
	}

	@Override
	public String toString() {
		return "{ type:" + type + ", " + "value:" + value + " }";
	}
}
