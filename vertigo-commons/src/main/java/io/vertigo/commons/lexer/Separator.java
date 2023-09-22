package io.vertigo.commons.lexer;

public enum Separator {
	LPAR('{'),
	RPAR('}'),
	LARR('['),
	RARR(']'),
	COLON(':'),
	SEMI_COLON(';'),
	COMMA(',');

	private final char sep;
	private final Token token;

	Separator(char sep) {
		this.sep = sep;
		this.token = new Token(TokenType.separator, String.valueOf(sep));
	}

	public Token getToken() {
		return token;
	}

	public static Separator find(char sep) {
		for (Separator separator : Separator.values()) {
			if (separator.sep == sep) {
				return separator;
			}
		}
		return null;
	}
}
