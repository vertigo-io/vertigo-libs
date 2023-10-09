package io.vertigo.commons.lexer;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.VUserException;

/**
 * Quotes, brackets must be balanced
 * 
 * Comments :
 * 		- single line: begins with #, ends with EOL or EOF
 * 		- This kind of comment can easily be cut and pasted

 *  ____________________________________________________________________________________
 * Separators : 
 * 		- all separators are defined in only ONE character
 * 
 * 		Punctuation :
 * 			- ':' ';' ',' '$' '@'
 * 
 * 		Brackets :
 * 			- brackets must be balanced
 * 			- 4 types of brackets :
 * 				- curly brackets 	{} 
 * 				- round brackets 	()
 * 				- square brackets 	[]
 * 				- angle brackets 	<>
 * 
 *  ____________________________________________________________________________________
 * Words : 
 * 		- such as commands, keywords or identifiers
 * 		- words are case sensitive
 * 		- begins with [a-z] or [A-Z] 
 * 		- contains [a-z] or [A-Z] or [0-9] or '-' or '_' or '.'
 * 		- must be declared in a single line ( EOL or EOF is a separator)
 * 		- ex : toto # is a word
 *  
 *  ____________________________________________________________________________________
 * Literal :
 * 		String :
 * 			- begins AND ends with " for String with escape
 * 			- Quotes must be balanced
 * 			- must be declared in a single line ( EOL or EOF is a separator)
 * 			- ex : "toto" => toto
 * 			- ex : "to\\to" => to\to
 * 			- ex : "to\"to" => to"to
 *
 * 			- begins AND ends with """ for multiline String with escape
 * 			- must be declared in a single line ( EOL or EOF is a separator)
 * 			- ex : 'toto' => toto
 * 			- ex : 'to\to' => to\to
 * 			- ex : 'to"to' => to"to
 * 
 * 			- begins AND ends with ' for String with NO escape ( ' can't be used!)
 * 			- begins AND ends with ''' for multi line String with NO escape ( ' can't be used!)
 *   
 * 		Integer :
 * 			- begins AND ends with a digit [0-9] or '-' and a digit 
 * 			- must be declared in a single line ( EOL or EOF is a separator)
 * 			- you can use many 0 at the begin of an integer	
 * 			- ex : 56
 * 			- ex : 056
 * 			- ex : 00056
 * 			- ex : -56
 * 			- ex : -056  
 * 	
 * 
 * 		Boolean :
 * 			- true or false (case sensitive)
 * 			- ex : true
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
	private final List<Tuple<Token, Integer>> tokenPositions = new ArrayList<>();

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

	public Scan tokenize() {
		do {
			nextCharacter();
			index++;
		} while (index < source.length());
		//---
		if (state != State.waiting) {
			if (state == State.string) {
				throw buildException("a literal string must be closed");
			}
			throw buildException("this state is unexpected : " + state);
		}
		//---
		if (!bracketStack.isEmpty()) {
			throw buildException("some brackets must be closed");
		}
		//---
		return new Scan(source, tokenPositions);
	}

	private void nextCharacter() {
		final boolean isEOF = (index == (source.length() - 1));
		final var car = source.charAt(index);

		final Token separator = Lexicon.charToTokenOrNull(car);
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
				} else if (isDigit(car) || car == Lexicon.NEGATIVE_MARKER) {
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

			case comment:
				//inside a comment-token
				//do anything you want

				//closing a comment-token
				if (isEOL(car) || isEOF) {
					addToken(new Token(TokenType.comment, source.substring(openingToken + 1, isEOL(car) ? index : index + 1).trim()));
				}
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
					if (car == Lexicon.NEGATIVE_MARKER && openingToken == index) {
						//a negative marker must be at the opening 
					} else if (!isDigit(car)) {
						throw buildException("an integer must contain only digits");
					}
				}

				//closing a word-token
				if (isBlank(car) || isEOF || separator != null) {
					final var text = source.substring(openingToken, isBlank(car) || separator != null ? index : index + 1);
					addToken(new Token(TokenType.integer, text));
				}

				//separator ?
				if (separator != null) {
					addToken(separator);
				}
				break;

			case string:
				//inside a string-token
				if (escapingLitteral) {
					if ((car != ESCAPE_LITTERAL) && (car != Lexicon.STRING_MARKER)) {
						throw buildException("Only \\ or \" characters are accepted after a \\ in a literal");
					}
					escapingLitteral = false;
				} else if (car == ESCAPE_LITTERAL) {
					escapingLitteral = true;
				}

				//closing a string-token
				//the index must be greater than the openingToken
				if (car == Lexicon.STRING_MARKER
						&& (openingToken < index)) {
					final var literal = source.substring(openingToken + 1, index)
							.replace("\\\"", "\"")
							.replace("\\\\", "\\");
					if (literal.isEmpty()) {
						throw buildException("a string must be fulfilled");
					}

					addToken(new Token(TokenType.string, literal));
				} else if (isEOL(car) || isEOF) {
					throw buildException("a literal must be defined on a single line ");
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

	private static boolean isDigit(char car) {
		return car >= '0' && car <= '9';
	}

	private static boolean isLetter(char car) {
		return (car >= 'a' && car <= 'z')
				|| (car >= 'A' && car <= 'Z');

	}

	private static boolean isMiddleCharAcceptedinaWord(char car) {
		return isLetter(car)
				|| isDigit(car)
				|| car == '-'
				|| car == '_'
				|| car == '.';
	}

	private void addToken(Token token) {
		Assertion.check().isNotNull(token);
		//---
		tokenPositions.add(Tuple.of(token, index));
		if (token.isBracket()) {
			pushBracket(token);
		}
		//reset
		state = State.waiting;
		openingToken = -1;
	}

	private RuntimeException buildException(String msg) {
		return new VUserException("Error at [" + index + "],  " + msg);
	}

	private Stack<Tuple<Token, Integer>> bracketStack = new Stack<>(); // 

	/*
	* We put the opening brackets in this bracketStack 
	* we pop when a closing bracket is found
	* the two brackets must be balanced
	*/
	private void pushBracket(Token bracket) {
		Assertion.check().isNotNull(bracket);
		//---
		//---Brackets define blocks 
		if (Lexicon.isLeftBracket(bracket)) {
			bracketStack.push(Tuple.of(bracket, index));
		} else {
			final var last = bracketStack.pop();
			//an ending bracket must follow an opening bracket ]=>[ ; }=>{ ; )=>(
			if (!Lexicon.isPairOfBrackets(last.val1(), bracket)) {
				throw buildException("a block is not well formed, all brackets must be balanced");
			}
		}
	}

}
