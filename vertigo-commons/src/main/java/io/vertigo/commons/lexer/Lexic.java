package io.vertigo.commons.lexer;

public final class Lexic {
	public static Token LPAR = Token.blockSeparator('{');
	public static Token RPAR = Token.blockSeparator('}');
	public static Token LARR = Token.blockSeparator('[');
	public static Token RARR = Token.blockSeparator(']');
	//---
	public static Token COLON = Token.separator(':');
	public static Token SEMI_COLON = Token.separator(';');
	public static Token COMMA = Token.separator(',');
	//--

	public static Token TRUE = new Token(TokenType.bool, "true");
	public static Token FALSE = new Token(TokenType.bool, "false");

	public static Token CREATE = new Token(TokenType.keyword, "create");
	public static Token ALTER = new Token(TokenType.keyword, "alter");

	public static Token wordToTokenFromW(String word) {
		return switch (word) {
			case "true" -> Lexic.TRUE;
			case "false" -> Lexic.FALSE;
			//--
			case "create" -> Lexic.CREATE;
			case "alter" -> Lexic.ALTER;
			//--
			default -> new Token(TokenType.identifier, word);
		};
	}

	public static Token charToToken(char sep) {
		return switch (sep) {
			case '{' -> LPAR;
			case '}' -> RPAR;
			case '[' -> LPAR;
			case ']' -> RPAR;
			case ':' -> COLON;
			case ';' -> SEMI_COLON;
			case ',' -> COMMA;
			default -> null;
		};
	}

}
