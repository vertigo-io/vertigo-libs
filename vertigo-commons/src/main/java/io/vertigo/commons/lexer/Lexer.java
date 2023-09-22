package io.vertigo.commons.lexer;

import java.util.ArrayList;
import java.util.List;

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
 * 
 * Boolean :
 * - true or false (case sensitive)
 * 	- ex : true
 *  ____________________________________________________________________________________
 * 
 * @author pchretien
 */
public final class Lexer {
	private static final char BEGIN_LITTERAL = '"';
	private static final char END_LITTERAL = '"';
	private static final char BEGIN_COMMENT = '#';
	private static final char ESCAPE_LITTERAL = '\\';
	//	private static final String EOL = System.lineSeparator();

	private final String source;
	private final List<Token> tokens = new ArrayList<>();
	private Mode mode = Mode.waiting;
	private int index = 0;
	private int beginWord = -1;
	private int beginLitteral = -1;
	private boolean escapingLitteral = false;

	private enum Mode {
		waiting,
		litteral, //beginning with '"', ending with '"'
		//	_boolean, // true or false
		word, //beginning with a letter, ending with a blank
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
			if (mode == Mode.litteral) {
				throw new VUserException("a litteral must be closed");
			}
			throw new VSystemException("mode is unexpected {0}", mode);
		}

		return tokens;
	}

	private void nextCar() {
		boolean isEOF = (index == (source.length() - 1));
		final var car = source.charAt(index);
		System.out.print(car);
		//System.out.print(car);

		final Separator separator = Separator.find(car);
		switch (mode) {
			case waiting:
				if (separator != null) {
					// we have found a separator 
					tokens.add(separator.getToken());
					mode = Mode.waiting;
				} else if (isBlank(car)) {
					mode = Mode.waiting;
				} else if (isLetter(car)) {
					System.out.println("begin word");
					mode = Mode.word;
					beginWord = index;
				} else if (car == BEGIN_LITTERAL) {
					System.out.println("begin litteral");
					escapingLitteral = false;
					mode = Mode.litteral;
					beginLitteral = index + 1;
				} else if (car == BEGIN_COMMENT) {
					System.out.println("begin comment");
					mode = Mode.comment;
				} else {
					throw new VUserException("Error at [" + index + "],  unexceped character");
				}
				break;
			case word:
				if (isBlank(car) || isEOF || separator != null) { //ending word

					tokens.add(new Token(TokenType.word, source.substring(beginWord, index - 1)));
					System.out.println("end word >" + source.substring(beginWord, index - 1));
					if (separator != null) {
						tokens.add(separator.getToken());
					}
					beginWord = -1;
					mode = Mode.waiting;
				} else {
					if (!isMiddleCharAcceptedinaWord(car)) {
						throw new VUserException("Error at [" + index + "],  a word (keyword, var..) must contain only letters,digits and _ or -");
					}

				}
				break;
			case comment:
				if (isEOL(car) || isEOF) { //ending comment
					System.out.println("end comment");
					mode = Mode.waiting;
				}
				break;
			case litteral:
				if (escapingLitteral) {
					if ((car != ESCAPE_LITTERAL) && (car != BEGIN_LITTERAL)) {
						throw new VUserException("Only \\ or \" characters are accepted after a \\ in a litteral");
					}
					escapingLitteral = false;
				} else if (car == ESCAPE_LITTERAL) {
					escapingLitteral = true;
				} else if (car == END_LITTERAL) { //ending litteral
					final var litteral = source.substring(beginLitteral, index - 1).replace("\\\"", "\"").replace("\\\\", "\\");
					tokens.add(new Token(TokenType.litteral, litteral));
					System.out.println("end litteral >" + litteral);
					beginLitteral = -1;
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

}
