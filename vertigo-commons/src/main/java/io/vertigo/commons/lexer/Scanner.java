package io.vertigo.commons.lexer;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.VUserException;

/**
 * This scanner split a text into tokens to read a 'command grammar'.
 * To be fast, furious and simple, only one character is necessary to identify the type of tokens.  
 * 
 * 
 * All token types are defined by their first character.
 * Quotes, brackets must be balanced
 * EOF is equivalent to an EOL 
 *  ____________________________________________________________________________________
 * Comments :
 * 		- single line: begins with #, ends with EOL or EOF
 * 		- This kind of comment can easily be cut and pasted
 *  ____________________________________________________________________________________
 * Separators : 
 * 		- all separators are defined in only ONE character
 * 
 * 		Punctuation :
 * 			- ':' ';' ','
 * 
 * 		Brackets :
 * 			- brackets must be balanced
 * 			- 4 types of brackets :
 * 				- curly brackets 	{} 
 * 				- round brackets 	()
 * 				- square brackets 	[]
 * 				- angle brackets 	<>
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
 * Literals :
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
 * 		Boolean :
 * 			- true or false (case sensitive)
 * 			- ex : true
 *  ____________________________________________________________________________________
 *  ____________________________________________________________________________________
 * Pre-processing 
 * 	transforms source with some directives to include/exclude parts or include some other sources with conditions.
 * 	these directives can be viewed as pre-processor commands
 * 	+ variables 
 *  + directives to allow a pre-processing of source (directives )
 *  
 * 		Variable :
 * 			- begins with $ 
 * 			- contains [a-z] or [A-Z]
 * 			- must be declared in a single line ( EOL or EOF is a separator)
 * 			- ex : $hidden # is a variable
 * 	
 * 		Directive :
 * 			- begins with / 
 * 			- contains [a-z] or [A-Z]
 * 			- must be declared in a single line ( EOL or EOF is a separator)
 * 			- ex : /set  # is a directive
 * 
 * @author pchretien
 */
public final class Scanner {
	private static final char ESCAPE_LITTERAL = '\\';

	private enum State {
		waiting,
		separator,
		//---
		string, //beginning with '"', ending with '"'
		integer, //beginning with a digit '"', , ending with a blank/EOl/EOF or a separator 
		text, //beginning with a letter, ending with a blank/EOl/EOF or a separator
		//---
		comment, //beginning with '#', ending with a EOL / EOF

		//Pre-processing
		variable, //beginning with '$', ending with blank/EOl/EOF or a separator
		directive; //beginning with '/', ending with blank/EOl/EOF or a separator
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
	//	//---Context
	//	private static class Context {
	//		State state = State.waiting;
	//		int index = 0;
	//		int openingToken = -1;
	//		boolean escapingLitteral = false;
	//	}

	public Scanner(String source) {
		Assertion.check().isNotBlank(source);
		//---
		this.source = source;
	}

	public Scan tokenize() {
		do {
			nextCharacter();
			index++;
		} while (index <= source.length());
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
		//To obtain a standard behavior, we add a break line at the end of the file 
		final var car = index < source.length()
				? source.charAt(index)
				: '\r';

		final Token separator = Lexicon.charToSeparatorTokenOrNull(car);
		//Is this character associated to a separator ( a punctuation or a bracket)

		//---------------------------------------------------------------------
		//-- Opening a new Token
		//---------------------------------------------------------------------
		if (state == State.waiting) {
			if (Lexicon.isBlank(car)) {
				//No token 
			} else {
				if (separator != null) {
					state = State.separator;
				} else if (Lexicon.isLetter(car)) {
					state = State.text;
				} else if (car == Lexicon.STRING_MARKER) {
					escapingLitteral = false;
					state = State.string;
				} else if (Lexicon.isDigit(car) || car == Lexicon.NEGATIVE_MARKER) {
					state = State.integer;
				} else if (car == Lexicon.COMMENT_MARKER) {
					state = State.comment;
				} else if (car == Lexicon.VARIABLE_MARKER) {
					state = State.variable;
				} else if (car == Lexicon.DIRECTIVE_MARKER) {
					state = State.directive;
				} else {
					throw buildException("unexceped character : " + car);
				}
				//We have "opened" a new token, yeah ! 
				openingToken = index;
			}
		}

		//---------------------------------------------------------------------
		//-- Closing a Token
		//---------------------------------------------------------------------
		final boolean closing;
		switch (state) {
			case waiting:
				//nothing to do 
				break;

			case comment:
				closing = Lexicon.isEOL(car);
				//inside a comment-token
				//do anything you want

				//closing a comment-token
				if (closing) {
					addToken(new Token(TokenType.comment, source.substring(openingToken + 1, index).trim()));
				}
				break;

			case separator:
				addToken(separator);
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
				} else if (Lexicon.isEOL(car)) {
					throw buildException("a literal must be defined on a single line ");
				}
				break;

			case text:
				closing = Lexicon.isBlank(car) || separator != null;
				//inside a text-token
				if (!closing) {
					if (!isMiddleCharAcceptedinaWord(car)) {
						throw buildException("a word (keyword, var..) must contain only letters,digits and _ or -");
					}
				}
				//closing a text-token
				if (closing) {
					final var text = source.substring(openingToken, index);
					addToken(Lexicon.textToToken(text));
				}

				//separator ?
				if (separator != null) {
					addToken(separator);
				}
				break;

			case integer:
				closing = Lexicon.isBlank(car) || separator != null;
				//inside an integer-token
				if (!closing) {
					if (car == Lexicon.NEGATIVE_MARKER && openingToken == index) {
						//a negative marker must be at the opening 
					} else if (!Lexicon.isDigit(car)) {
						throw buildException("an integer must contain only digits");
					}
				}

				//closing a word-token
				if (closing) {
					final var text = source.substring(openingToken, index);
					addToken(new Token(TokenType.integer, text));
				}

				//separator ?
				if (separator != null) {
					addToken(separator);
				}
				break;

			case variable:
				closing = Lexicon.isBlank(car) || separator != null;

				//inside a variable-token
				if (!closing && index > openingToken) { // not the first character
					if (!Lexicon.isLetter(car)) {
						throw buildException("a variable contains only latin letters : " + car);
					}
				}
				//closing a variable-token
				if (closing) {
					final var text = source.substring(openingToken, index);
					addToken(new Token(TokenType.variable, text));
				}

				//separator ?
				if (separator != null) {
					addToken(separator);
				}
				break;
			case directive:
				closing = Lexicon.isBlank(car) || separator != null;
				//inside a directive-token
				if (!closing && index > openingToken) { // not the first character
					if (!Lexicon.isLetter(car)) {
						throw buildException("a directive contains only latin letters : " + car);
					}
				}
				//closing a directive-token
				if (closing) {
					final var text = source.substring(openingToken, index);
					addToken(new Token(TokenType.directive, text));
				}

				//separator ?
				if (separator != null) {
					addToken(separator);
				}
				break;
		}

	}

	private static boolean isMiddleCharAcceptedinaWord(char car) {
		return Lexicon.isLetter(car)
				|| Lexicon.isDigit(car)
				|| car == '-'
				|| car == '_'
				|| car == '.';
	}

	private void addToken(Token token) {
		Assertion.check().isNotNull(token);
		//---
		tokenPositions.add(Tuple.of(token, index));
		if (token.type() == TokenType.bracket) {
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
