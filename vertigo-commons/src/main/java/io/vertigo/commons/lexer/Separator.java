package io.vertigo.commons.lexer;

public enum Separator {
	LPAR('{'),
	RPAR('}'),
	LARR('['),
	RARR(']'),
	COLON(':'),
	SEMI_COLON(';'),
	COMMA(',');

	final char sep;
	private final Token token;

	Separator(char sep) {
		this.sep = sep;
		this.token = new Token(TokenType.separator, String.valueOf(sep));
	}

	public Token getToken() {
		return token;
	}

}
