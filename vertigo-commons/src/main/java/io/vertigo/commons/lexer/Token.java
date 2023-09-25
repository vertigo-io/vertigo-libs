package io.vertigo.commons.lexer;

public record Token(TokenType type, String value) {

	public static Token separator(char sep) {
		return new Token(TokenType.separator, Character.toString(sep));
	}

	public static Token blockSeparator(char sep) {
		return new Token(TokenType.blockSeparator, Character.toString(sep));
	}
}
