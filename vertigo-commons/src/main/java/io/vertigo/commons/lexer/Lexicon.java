package io.vertigo.commons.lexer;

/**
 * Contains the core elements of any structural grammar.
 * - Brackets
 * - Separators
 * - Boolean
 * 
 * @author pchretien
 *
 */
public final class Lexicon {
	//The markers are reserved words, they can not be used as keywords, separators
	static final char STRING_MARKER = '"';
	//	private static final char STRING2_MARKER = '\'';
	static final char COMMENT_MARKER = '#';

	public static Token LCURLY_BRACKET = Token.bracket('{');
	public static Token RCURLY_BRACKET = Token.bracket('}');
	public static Token LSQUARE_BRACKET = Token.bracket('[');
	public static Token RSQUARE_BRACKET = Token.bracket(']');
	public static Token LROUND_BRACKET = Token.bracket('(');
	public static Token RROUND_BRACKET = Token.bracket(')');
	//---
	public static Token COLON = Token.punctuation(':');
	public static Token SEMI_COLON = Token.punctuation(';');
	public static Token COMMA = Token.punctuation(',');
	//--
	public static Token TRUE = Token.bool("true");
	public static Token FALSE = Token.bool("false");

	public static Token textToToken(String text) {
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
			//---punctuations
			case ':' -> COLON;
			case ';' -> SEMI_COLON;
			case ',' -> COMMA;
			//---no token
			default -> null;
		};
	}

	static boolean isLeftBracket(Token token) {
		return token == Lexicon.LCURLY_BRACKET
				|| token == Lexicon.LSQUARE_BRACKET
				|| token == Lexicon.LROUND_BRACKET;
	}

	static boolean isPairOfBrackets(Token ltoken, Token rtoken) {
		return (rtoken == Lexicon.RCURLY_BRACKET && ltoken == Lexicon.LCURLY_BRACKET)
				|| (rtoken == Lexicon.RSQUARE_BRACKET && ltoken == Lexicon.LSQUARE_BRACKET)
				|| (rtoken == Lexicon.RROUND_BRACKET && ltoken == Lexicon.LROUND_BRACKET);
	}

}
