package io.vertigo.commons.lexer;

public record Token(TokenType type, String value) {

	@Override
	public String toString() {
		return "{ type:" + type + ", " + "value:" + value + " }";
	}

	static Token punctuation(char sep) {
		return new Token(TokenType.punctuation, Character.toString(sep));
	}

	static Token bracket(char sep) {
		return new Token(TokenType.bracket, Character.toString(sep));
	}

	static Token bool(String bool) {
		return new Token(TokenType.bool, bool);
	}

}
