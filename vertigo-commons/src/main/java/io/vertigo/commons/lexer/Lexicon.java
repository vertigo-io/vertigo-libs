package io.vertigo.commons.lexer;

public final class Lexicon {
	public static Token LCURLY_BRACKET = Token.bracket('{');
	public static Token RCURLY_BRACKET = Token.bracket('}');
	public static Token LSQUARE_BRACKET = Token.bracket('[');
	public static Token RSQUARE_BRACKET = Token.bracket(']');
	public static Token LROUND_BRACKET = Token.bracket('(');
	public static Token RROUND_BRACKET = Token.bracket(')');
	//---
	public static Token COLON = Token.separator(':');
	public static Token SEMI_COLON = Token.separator(';');
	public static Token COMMA = Token.separator(',');
	//--
	public static Token TRUE = Token.bool("true");
	public static Token FALSE = Token.bool("false");

	public static Token textdToToken(String text) {
		return switch (text) {
			//---Token : boolean
			case "true" -> Lexicon.TRUE;
			case "false" -> Lexicon.FALSE;
			//---Token : word
			default -> new Token(TokenType.word, text);
		};
	}

	public static Token charToToken(char sep) {
		return switch (sep) {
			//---brackets
			case '{' -> LCURLY_BRACKET;
			case '}' -> RCURLY_BRACKET;
			case '[' -> LSQUARE_BRACKET;
			case ']' -> RSQUARE_BRACKET;
			case '(' -> LROUND_BRACKET;
			case ')' -> RROUND_BRACKET;
			//---separators
			case ':' -> COLON;
			case ';' -> SEMI_COLON;
			case ',' -> COMMA;
			//---no token
			default -> null;
		};
	}

}
