package io.vertigo.commons.lexer;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.VUserException;

/**
 * 
 * Comments :
 * single line: begins with #, ends with EOL or EOF

 * Separators : all in only ONE character
 * 	- ex : ; ,  are 3 different separators
 * 
 * Blocks : block separator  all in only ONE character
 * - must be well formed
 * 
 * 	- ex : ; ,  are 3 different separators
 * 
 * Words : 
 * - are commands or keywords or identifiers
 * - begins with [a-z] or [A-Z] 
 * - contains [a-z] or [A-Z] or [0-9] or '-' or '_' or '.'
 * - must be declared in a single line ( EOL or EOF is a separator)
 * 	- ex : toto # is a word
 *  
 *  ____________________________________________________________________________________
 * Litteral :
 * String :
 * - begins AND ends with " for String with escape
 * - must be declared in a single line ( EOL or EOF is a separator)
 * 	- ex : "toto" => toto
 * 	- ex : "to\\to" => to\to
 * 	- ex : "to\"to" => to"to
 *
 * - begins AND ends with """ for multiline String with escape
 * 
 * - begins AND ends with ' for String with NO escape ( ' can't be used!)
 * - must be declared in a single line ( EOL or EOF is a separator)
 * 	- ex : 'toto' => toto
 * 	- ex : 'to\to' => to\to
 * 	- ex : 'to"to' => to"to
 * 
 * - begins AND ends with ''' for multi line String with NO escape ( ' can't be used!)
 *   
 * Integer :
 * - begins AND ends with a digit [0-9] 
 * - must be declared in a single line ( EOL or EOF is a separator)
 * 	- ex : 56
 * 	- ex : 056
 * 	- ex : -56
 * 
 * Boolean :
 * - true or false (case sensitive)
 * 	- ex : true
 *  ____________________________________________________________________________________
 * 
 * @author pchretien
 */
public final class Scanner {
	private static final char STRING_MARKER = '"';
	//	private static final char STRING2_MARKER = '\'';
	private static final char BEGIN_COMMENT = '#';

	private static final char ESCAPE_LITTERAL = '\\';

	private enum State {
		waiting,
		string, //beginning with '"', ending with '"'
		integer, //beginning with a digit '"', , ending with a blank/EOl/EOF or a separator 
		word, //beginning with a letter, ending with a blank/EOl/EOF or a separator 
		comment; //beginning with '#', ending with a EOL / EOF
	}
	//	private static final String EOL = System.lineSeparator();

	private final String source;
	private final List<Token> tokens = new ArrayList<>();

	//---Context
	private State state = State.waiting;
	private int index = 0;
	private int beginToken = -1;
	private boolean escapingLitteral = false;
	//---

	public Scanner(String source) {
		Assertion.check().isNotBlank(source);
		//---
		this.source = source;
	}

	public List<Token> tokenize() {
		do {
			nextCar();
			index++;
		} while (index < source.length());
		//---
		if (state != State.waiting) {
			if (state == State.string) {
				throw new VUserException("a litteral string must be closed");
			}
			throw new VSystemException("state is unexpected {0}", state);
		}
		checkBlocks();
		return tokens;
	}

	private void nextCar() {
		final boolean isEOF = (index == (source.length() - 1));
		final var car = source.charAt(index);
		if (isEOF)
			System.out.println(">>>" + car);
		final Token separator = Lexicon.charToToken(car);
		//Is this character associated to a separator or a block
		switch (state) {
			case waiting:
				if (separator != null) {
					// we have found a separator 
					addToken(separator);
					state = State.waiting;
				} else if (isBlank(car)) {
					state = State.waiting;
				} else if (isLetter(car)) {
					state = State.word;
					beginToken = index;
				} else if (car == STRING_MARKER) {
					escapingLitteral = false;
					state = State.string;
					beginToken = index + 1;
				} else if (isDigit(car)) {
					state = State.integer;
					beginToken = index;
				} else if (car == BEGIN_COMMENT) {
					state = State.comment;
					beginToken = index + 1;
				} else {
					throw new VUserException("Error at [" + index + "],  unexceped character");
				}
				break;
			case word:
				if (isBlank(car) || isEOF || separator != null) { //ending word
					final var word = source.substring(beginToken, isBlank(car) || separator != null ? index : index + 1);
					addToken(Lexicon.wordToTokenFromW(word));

					if (separator != null) {
						addToken(separator);
					}
					beginToken = -1;
					state = State.waiting;
				} else {
					if (!isMiddleCharAcceptedinaWord(car)) {
						throw new VUserException("Error at [" + index + "],  a word (keyword, var..) must contain only letters,digits and _ or -");
					}

				}
				break;
			case integer:
				if (isBlank(car) || isEOF || separator != null) { //ending word
					final var text = source.substring(beginToken, isBlank(car) || separator != null ? index : index + 1);
					addToken(new Token(TokenType.integer, text));
					if (separator != null) {
						addToken(separator);
					}
					beginToken = -1;
					state = State.waiting;
				} else {
					if (!isDigit(car)) {
						throw new VUserException("Error at [" + index + "],  an integer must contain only digits");
					}
				}
				break;
			case comment:
				if (isEOL(car) || isEOF) { //ending comment
					addToken(new Token(TokenType.comment, source.substring(beginToken, isEOL(car) ? index : index + 1)));
					beginToken = -1;
					state = State.waiting;
				}
				break;
			case string:
				if (escapingLitteral) {
					if ((car != ESCAPE_LITTERAL) && (car != STRING_MARKER)) {
						throw new VUserException("Only \\ or \" characters are accepted after a \\ in a litteral");
					}
					escapingLitteral = false;
				} else if (car == ESCAPE_LITTERAL) {
					escapingLitteral = true;
				} else if (car == STRING_MARKER) { //ending litteral
					final var litteral = source.substring(beginToken, index)
							.replace("\\\"", "\"")
							.replace("\\\\", "\\");
					if (litteral.isEmpty()) {
						throw new VUserException("Error at [" + index + "],  a string must be fulfilled");
					}

					addToken(new Token(TokenType.string, litteral));
					beginToken = -1;
					state = State.waiting;
				} else if (isEOL(car) || isEOF) {
					throw new VUserException("Error at [" + index + "],  a litteral must be defined on a single line ");
				}
				break;
		}
	}

	private static boolean isEOL(char car) {
		switch (car) {
			case '\n':
			case '\r':
				return true;
			default:
				return false;
		}
	}

	private static boolean isBlank(char car) {
		switch (car) {
			case ' ':
			case '\t':
			case '\n':
			case '\r':
				return true;
			default:
				return false;
		}
	}

	private static boolean isLetter(char car) {
		return (car >= 'a' && car <= 'z')
				|| (car >= 'A' && car <= 'Z');

	}

	private static boolean isDigit(char car) {
		return car >= '0' && car <= '9';
	}

	private static boolean isMiddleCharAcceptedinaWord(char car) {
		return isLetter(car)
				|| isDigit(car)
				|| car == '-'
				|| car == '_'
				|| car == '.';
	}

	private Stack<Token> stack = new Stack<>();

	private void checkBlocks() {
		if (!stack.isEmpty()) {
			throw new VUserException("a block is not well formed");
		}
	}

	private void addToken(Token token) {
		Assertion.check().isNotNull(token);
		//---
		tokens.add(token);
		if (token.type() == TokenType.bracket) {
			pushBracket(token);
		}
	}

	private void pushBracket(Token token) {
		Assertion.check()
				.isNotNull(token);
		//---
		//---Brackets define blocks 
		if (token == Lexicon.LCURLY_BRACKET
				|| token == Lexicon.LSQUARE_BRACKET
				|| token == Lexicon.LROUND_BRACKET) {
			stack.push(token);
		} else {
			final var last = stack.pop();
			//an ending bracket must follow an opening bracket ]=>[ ; }=>{ ; )=>(
			if (!((token == Lexicon.RCURLY_BRACKET && last == Lexicon.LCURLY_BRACKET)
					|| (token == Lexicon.RSQUARE_BRACKET && last == Lexicon.LSQUARE_BRACKET)
					|| (token == Lexicon.RROUND_BRACKET && last == Lexicon.LROUND_BRACKET))) {
				throw new VUserException("Error at [" + index + "],  a block is not well formed");
			}
		}
	}
}
