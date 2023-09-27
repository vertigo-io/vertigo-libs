package io.vertigo.commons.lexer;

public final class Lexicon {
	public static Token LCURLY_BRACKET = bracket('{');
	public static Token RCURLY_BRACKET = bracket('}');
	public static Token LSQUARE_BRACKET = bracket('[');
	public static Token RSQUARE_BRACKET = bracket(']');
	public static Token LROUND_BRACKET = bracket('(');
	public static Token RROUND_BRACKET = bracket(')');
	//---
	public static Token COLON = separator(':');
	public static Token SEMI_COLON = separator(';');
	public static Token COMMA = separator(',');
	//--
	public static Token TRUE = new Token(TokenType.bool, "true");
	public static Token FALSE = new Token(TokenType.bool, "false");
	//---
	public static Token PACKAGE = new Token(TokenType.word, "package");
	public static Token CREATE = new Token(TokenType.word, "create");
	public static Token ALTER = new Token(TokenType.word, "alter");
	public static Token DECLARE = new Token(TokenType.word, "declare");

	public static Token wordToTokenFromW(String word) {
		return switch (word) {
			//---Token : boolean
			case "true" -> Lexicon.TRUE;
			case "false" -> Lexicon.FALSE;
			//---Token : keyword
			case "create" -> Lexicon.CREATE;
			case "alter" -> Lexicon.ALTER;
			//Token : identifier (nor boolean, nor keyword)
			default -> new Token(TokenType.word, word);
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

	private static Token separator(char sep) {
		return new Token(TokenType.separator, Character.toString(sep));
	}

	private static Token bracket(char sep) {
		return new Token(TokenType.bracket, Character.toString(sep));
	}

}
