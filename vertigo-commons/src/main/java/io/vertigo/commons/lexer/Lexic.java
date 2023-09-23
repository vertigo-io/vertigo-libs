package io.vertigo.commons.lexer;

public final class Lexic {
	public static Token TRUE = new Token(TokenType.bool, "true");
	public static Token FALSE = new Token(TokenType.bool, "false");

	public static Token wordToTokenFromW(String word) {
		return switch (word) {
			case "true" -> Lexic.TRUE;
			case "false" -> Lexic.FALSE;
			default -> new Token(TokenType.word, word);
		};
	}

	public static Token separatorToToken(char sep) {
		for (Separator separator : Separator.values()) {
			if (separator.sep == sep) {
				return separator.getToken();
			}
		}
		return null;
	}

}
