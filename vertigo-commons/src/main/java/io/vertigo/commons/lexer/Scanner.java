package io.vertigo.commons.lexer;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import io.vertigo.core.lang.Assertion;
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
	private static final char ESCAPE_LITTERAL = '\\';

	private enum State {
		waiting,
		Separator,
		string, //beginning with '"', ending with '"'
		integer, //beginning with a digit '"', , ending with a blank/EOl/EOF or a separator 
		text, //beginning with a letter, ending with a blank/EOl/EOF or a separator 
		comment; //beginning with '#', ending with a EOL / EOF
	}
	//	private static final String EOL = System.lineSeparator();

	private final String source;
	private final List<Token> tokens = new ArrayList<>();

	//---Context
	private State state = State.waiting;
	private int index = 0;
	private int openingToken = -1;
	private boolean escapingLitteral = false;
	//---

	public Scanner(String source) {
		Assertion.check().isNotBlank(source);
		//---
		this.source = source;
	}

	public List<Token> tokenize() {
		do {
			nextCharacter();
			index++;
		} while (index < source.length());
		//---
		if (state != State.waiting) {
			if (state == State.string) {
				throw buildException("a litteral string must be closed");
			}
			throw buildException("this state is unexpected : " + state);
		}
		checkBlocks();
		return tokens;
	}

	private void nextCharacter() {
		final boolean isEOF = (index == (source.length() - 1));
		final var car = source.charAt(index);

		final Token separator = Lexicon.charToToken(car);
		//Is this character associated to a separator or a block

		//Opening a new Token
		if (state == State.waiting) {
			if (isBlank(car)) {
				//No token 
			} else {
				if (separator != null) {
					state = State.Separator;
				} else if (isLetter(car)) {
					state = State.text;
				} else if (car == Lexicon.STRING_MARKER) {
					escapingLitteral = false;
					state = State.string;
				} else if (isDigit(car)) {
					state = State.integer;
				} else if (car == Lexicon.COMMENT_MARKER) {
					state = State.comment;
				} else {
					throw buildException("unexceped character : " + car);
				}
				//We have "opened" a new token, yeah ! 
				openingToken = index;
			}
		}

		//Closing a Token
		switch (state) {
			case waiting:
				//nothing to do 
				break;
			case Separator:
				addToken(separator);
				break;
			case text:
				//inside a text-token
				if (!isBlank(car) && separator == null) {
					if (!isMiddleCharAcceptedinaWord(car)) {
						throw buildException("a word (keyword, var..) must contain only letters,digits and _ or -");
					}
				}
				//closing a text-token
				if (isBlank(car) || isEOF || separator != null) {
					final var text = source.substring(openingToken, isBlank(car) || separator != null ? index : index + 1);
					addToken(Lexicon.textToToken(text));
				}

				//separator ?
				if (separator != null) {
					addToken(separator);
				}
				break;
			case integer:
				//inside an integer-token
				if (!isBlank(car) && separator == null) {
					if (!isDigit(car)) {
						throw buildException("an integer must contain only digits");
					}
				}

				//closing a word-token
				if (isBlank(car) || isEOF || separator != null) {
					final var text = source.substring(openingToken, isBlank(car) || separator != null ? index : index + 1);
					addToken(Token.integer(text));
				}

				//separator ?
				if (separator != null) {
					addToken(separator);
				}
				break;
			case comment:
				//inside a comment-token
				//do anything you want

				//closing a comment-token
				if (isEOL(car) || isEOF) {
					addToken(new Token(TokenType.comment, source.substring(openingToken + 1, isEOL(car) ? index : index + 1).trim()));
				}
				break;
			case string:

				//inside a string-token
				if (escapingLitteral) {
					if ((car != ESCAPE_LITTERAL) && (car != Lexicon.STRING_MARKER)) {
						throw buildException("Only \\ or \" characters are accepted after a \\ in a litteral");
					}
					escapingLitteral = false;
				} else if (car == ESCAPE_LITTERAL) {
					escapingLitteral = true;
				}

				//closing a string-token
				//the index must be greater than the openingToken
				if (car == Lexicon.STRING_MARKER
						&& (openingToken < index)) {
					final var litteral = source.substring(openingToken + 1, index)
							.replace("\\\"", "\"")
							.replace("\\\\", "\\");
					if (litteral.isEmpty()) {
						throw buildException("a string must be fulfilled");
					}

					addToken(new Token(TokenType.string, litteral));
				} else if (isEOL(car) || isEOF) {
					throw buildException("a litteral must be defined on a single line ");
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
			throw buildException("a block is not well formed");
		}
	}

	private void addToken(Token token) {
		Assertion.check().isNotNull(token);
		//---
		tokens.add(token);
		if (token.type() == TokenType.bracket) {
			pushBracket(token);
		}
		//reset
		state = State.waiting;
		openingToken = -1;
	}

	private void pushBracket(Token token) {
		Assertion.check()
				.isNotNull(token);
		//---
		//---Brackets define blocks 
		if (Lexicon.isLeftBracket(token)) {
			stack.push(token);
		} else {
			final var last = stack.pop();
			//an ending bracket must follow an opening bracket ]=>[ ; }=>{ ; )=>(
			if (!Lexicon.isPairOfBrackets(last, token)) {
				throw buildException("a block is not well formed");
			}
		}
	}

	private RuntimeException buildException(String msg) {
		return new VUserException("Error at [" + index + "],  " + msg);
	}
}
