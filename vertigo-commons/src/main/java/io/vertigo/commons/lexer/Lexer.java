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

 * Separators : see Separator.class ( all in only ONE character)
 * 	- ex : [ ] # are 3 different separators
 * 
 * Words : 
 * - are keywords or identifiers
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
public final class Lexer {
	private static final char STRING_MARKER = '"';
	//	private static final char STRING2_MARKER = '\'';
	private static final char BEGIN_COMMENT = '#';

	private static final char ESCAPE_LITTERAL = '\\';

	//	private static final String EOL = System.lineSeparator();

	private final String source;
	private Mode mode = Mode.waiting;
	private int index = 0;
	private int beginWord = -1;
	private int beginString = -1;
	private int beginInteger = -1;
	private boolean escapingLitteral = false;
	private final List<Token> tokens = new ArrayList<>();
	//	private final Tokens tokens = new Tokens();

	private enum Mode {
		waiting,
		string, //beginning with '"', ending with '"'
		//	_boolean, // true or false
		integer, //beginning with a digit '"', , ending with a blank/EOl/EOF or a separator 
		word, //beginning with a letter, ending with a blank/EOl/EOF or a separator 
		comment; //beginning with '#', ending with a EOL / EOF
	}

	public Lexer(String source) {
		Assertion.check().isNotBlank(source);
		//---
		this.source = source;
	}

	public List<Token> tokenize() {
		do {
			nextCar();
			index++;
		} while (hasCharacters());
		//---
		if (mode != Mode.waiting) {
			if (mode == Mode.string) {
				throw new VUserException("a litteral string must be closed");
			}
			throw new VSystemException("mode is unexpected {0}", mode);
		}
		checkBlocks();
		return tokens;
	}

	private void nextCar() {
		boolean isEOF = (index == (source.length() - 1));
		final var car = source.charAt(index);

		final Token separator = Lexic.separatorToToken(car);
		switch (mode) {
			case waiting:
				if (separator != null) {
					// we have found a separator 
					addToken(separator);
					mode = Mode.waiting;
				} else if (isBlank(car)) {
					mode = Mode.waiting;
				} else if (isLetter(car)) {
					mode = Mode.word;
					beginWord = index;
				} else if (car == STRING_MARKER) {
					escapingLitteral = false;
					mode = Mode.string;
					beginString = index + 1;
				} else if (isDigit(car)) {
					mode = Mode.integer;
					beginInteger = index;
				} else if (car == BEGIN_COMMENT) {
					mode = Mode.comment;
				} else {
					throw new VUserException("Error at [" + index + "],  unexceped character");
				}
				break;
			case word:
				if (isBlank(car) || isEOF || separator != null) { //ending word
					var word = source.substring(beginWord, index - 1);
					addToken(Lexic.wordToTokenFromW(word));

					if (separator != null) {
						addToken(separator);
					}
					beginWord = -1;
					mode = Mode.waiting;
				} else {
					if (!isMiddleCharAcceptedinaWord(car)) {
						throw new VUserException("Error at [" + index + "],  a word (keyword, var..) must contain only letters,digits and _ or -");
					}

				}
				break;
			case integer:
				if (isBlank(car) || isEOF || separator != null) { //ending word
					addToken(new Token(TokenType.integer, source.substring(beginInteger, index - 1)));
					if (separator != null) {
						addToken(separator);
					}
					beginInteger = -1;
					mode = Mode.waiting;
				} else {
					if (!isDigit(car)) {
						throw new VUserException("Error at [" + index + "],  an integer must contain only digits");
					}
				}
				break;
			case comment:
				if (isEOL(car) || isEOF) { //ending comment
					mode = Mode.waiting;
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
					final var litteral = source.substring(beginString, index - 1)
							.replace("\\\"", "\"")
							.replace("\\\\", "\\");
					addToken(new Token(TokenType.string, litteral));
					beginString = -1;
					mode = Mode.waiting;
				} else if (isEOL(car) || isEOF) {
					throw new VUserException("Error at [" + index + "],  a litteral must be defined on a single line ");
				}
				break;
		}
	}

	private boolean hasCharacters() {
		return index < source.length();
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

	private Stack<String> stack = new Stack();

	void checkBlocks() {
		if (!stack.isEmpty()) {
			throw new VUserException("a block is not well formed");
		}
	}

	void addToken(Token token) {
		Assertion.check().isNotNull(token);
		//---
		tokens.add(token);

		if (token.type() == TokenType.separator) {
			var value = token.value();
			switch (value) {
				case "{":
				case "[":
					stack.push(value);
					break;
				case "}":
					var last = stack.pop();
					if (!"{".equals(last)) {
						throw new VUserException("Error at [" + index + "],  a block is not well formed");
					}
					break;
				case "]":
					last = stack.pop();
					if (!"[".equals(last)) {
						throw new VUserException("Error at [" + index + "],  a block is not well formed");
					}
			}
		}
	}

}
