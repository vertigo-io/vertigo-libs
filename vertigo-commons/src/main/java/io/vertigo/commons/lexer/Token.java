package io.vertigo.commons.lexer;

public record Token(TokenType type, String value) {

	@Override
	public String toString() {
		return "{ type:" + type + ", " + "value:" + value + " }";
	}

	static Token separator(char sep) {
		return new Token(TokenType.separator, Character.toString(sep));
	}

	static Token bracket(char sep) {
		return new Token(TokenType.bracket, Character.toString(sep));
	}

	static Token bool(String bool) {
		return new Token(TokenType.bool, bool);
	}

}
