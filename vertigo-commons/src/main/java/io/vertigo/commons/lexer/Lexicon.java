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
	static final char NEGATIVE_MARKER = '-';

	public static Token LCURLY_BRACKET = bracket('{');
	public static Token RCURLY_BRACKET = bracket('}');
	public static Token LSQUARE_BRACKET = bracket('[');
	public static Token RSQUARE_BRACKET = bracket(']');
	public static Token LROUND_BRACKET = bracket('(');
	public static Token RROUND_BRACKET = bracket(')');
	public static Token LANGLE_BRACKET = bracket('<');
	public static Token RANGLE_BRACKET = bracket('>');
	//---
	public static Token COLON = punctuation(':');
	public static Token SEMI_COLON = punctuation(';');
	public static Token COMMA = punctuation(',');
	public static Token AT = punctuation('@');
	public static Token DOLLAR = punctuation('$');

	//--
	public static Token TRUE = new Token(TokenType.bool, "true");
	public static Token FALSE = new Token(TokenType.bool, "false");

	static Token textToToken(String text) {
		return switch (text) {
			//---Token : boolean
			case "true" -> Lexicon.TRUE;
			case "false" -> Lexicon.FALSE;
			//---Token : word
			default -> new Token(TokenType.word, text);
		};
	}

	static Token charToSeparatorTokenOrNull(char sep) {
		return switch (sep) {
			//---brackets
			case '{' -> LCURLY_BRACKET;
			case '}' -> RCURLY_BRACKET;
			case '[' -> LSQUARE_BRACKET;
			case ']' -> RSQUARE_BRACKET;
			case '(' -> LROUND_BRACKET;
			case ')' -> RROUND_BRACKET;
			case '<' -> LANGLE_BRACKET;
			case '>' -> RANGLE_BRACKET;
			//---punctuations
			case ':' -> COLON;
			case ';' -> SEMI_COLON;
			case ',' -> COMMA;
			case '@' -> AT;
			case '$' -> DOLLAR;
			//---no token
			default -> null;
		};
	}

	static boolean isLeftBracket(Token token) {
		return token == Lexicon.LCURLY_BRACKET
				|| token == Lexicon.LSQUARE_BRACKET
				|| token == Lexicon.LROUND_BRACKET
				|| token == Lexicon.LANGLE_BRACKET;
	}

	static boolean isPairOfBrackets(Token ltoken, Token rtoken) {
		return (rtoken == Lexicon.RCURLY_BRACKET && ltoken == Lexicon.LCURLY_BRACKET)
				|| (rtoken == Lexicon.RSQUARE_BRACKET && ltoken == Lexicon.LSQUARE_BRACKET)
				|| (rtoken == Lexicon.RROUND_BRACKET && ltoken == Lexicon.LROUND_BRACKET)
				|| (rtoken == Lexicon.RANGLE_BRACKET && ltoken == Lexicon.LANGLE_BRACKET);
	}

	private static Token punctuation(char punctuation) {
		return new Token(TokenType.punctuation, Character.toString(punctuation));
	}

	private static Token bracket(char bracket) {
		return new Token(TokenType.bracket, Character.toString(bracket));
	}
}
