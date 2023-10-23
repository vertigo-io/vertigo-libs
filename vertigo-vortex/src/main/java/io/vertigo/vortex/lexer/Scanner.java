package io.vertigo.vortex.lexer;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.VUserException;

/**
 * This scanner splits a text into tokens to read a 'command grammar'.
 * To be fast, furious and simple, only one character is necessary to identify the type of tokens.  
 * 
 * All token types are defined by their first character
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
 * 		Punctuation :O
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
 * 	transforms source with some directives to include/exclude parts of text or include some other sources with conditions.
 * 	these directives can be viewed as pre-processor commands
 * 	+ variables 
 *  + directives to allow pre-processing of source
 *  
 * 		Variable :
 * 			- is a path of simple keys 
 * 			- begins with '$'
 * 			- contains the pattern /[a-z]+  that can be repeated
 * 			- must be declared in a single line ( EOL or EOF is a separator)
 * 			- ex : $/test/hidden # is a variable
 * 	
 * 		Directive :
 * 			- begins with / 
 * 			- contains [a-z] and '-' as a separator ( snake-case)
 * 			- must be declared in a single line ( EOL or EOF is a separator)
 * 			- ex : /set  # is a directive
 * 
 * @author pchretien
 */
public final class Scanner {
	private static final char ESCAPE_LITERAL = '\\';

	private enum State {
		waiting,
		separator, // in only one character ( brackets or punctuation)
		//---
		//	openingString,
		string, //beginning with '"', ending with '"' 
		//	closingString,
		integer, //beginning with a digit or a minus sign,ending with a [blank or a separator] 
		text, //beginning with a letter, ending with a [blank or a separator]
		//---
		comment, //beginning with '#', ending with a EOL 

		//Pre-processing
		variable, //beginning with '$', ending with [blank or a separator]
		directive; //beginning with '/', ending with [blank or a separator]
	}
	//	private static final String EOL = System.lineSeparator();

	private final String source;
	private final List<Tuple<Token, Integer>> tokenPositions = new ArrayList<>();

	//---Context
	private State state = State.waiting;
	private int index = 0;
	private int openingToken = -1;
	private boolean escapingString = false;

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
					escapingString = false;
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
		// ! Some tokens (text, boolean, variable, directive) can be closed by a separator or a blank ( ws, tab, or lr)
		// If a separator is used then two tokens must be declared
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
				//We have to manage the escape character'\' =>  \\ or \"
				if (escapingString) {
					if ((car != ESCAPE_LITERAL) && (car != Lexicon.STRING_MARKER)) {
						throw buildException("Only \\\\ or \" characters are accepted after a \\ in a string");
					}
					escapingString = false;
				} else if (car == ESCAPE_LITERAL) {
					escapingString = true;
				}

				//closing a string-token
				//the index must be greater than the openingToken
				else if (car == Lexicon.STRING_MARKER && (openingToken < index)) {
					final var literal = source.substring(openingToken + 1, index)
							.replace("\\\"", "\"")
							.replace("\\\\", "\\");
					addToken(new Token(TokenType.string, literal));
				} else if (Lexicon.isEOL(car)) {
					throw buildException("a literal must be defined on a single line ");
				}
				break;

			case text:
				closing = Lexicon.isBlank(car) || separator != null;
				//inside a text-token
				if (!closing && index > openingToken) { // not the first character
					TokenType.word.checkAfterFirstCharacter(index, car);
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
				if (!closing && index > openingToken) { // not the first character
					TokenType.integer.checkAfterFirstCharacter(index, car);
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
					TokenType.variable.checkAfterFirstCharacter(index, car);
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

				//inside a variable-token
				if (!closing && index > openingToken) { // not the first character
					//TokenType.variable.checkAfterFirstCharacter(index, car);
				}
				//closing a variable-token
				if (closing) {
					final var text = source.substring(openingToken, index);
					addToken(new Token(TokenType.directive, text));
				}

				//separator ?
				if (separator != null) {
					addToken(separator);
				}
				break; //			case command:
			//				closing = Lexicon.isBlank(car) || separator != null;
			//
			//				//inside a directive-token
			//				if (!closing && index > openingToken) { // not the first character
			//					TokenType.command.checkAfterFirstCharacter(index, car);
			//				}
			//				//closing a directive-token
			//				if (closing) {
			//					final var text = source.substring(openingToken, index);
			//					addToken(new Token(TokenType.command, text));
			//				}
			//
			//				//separator ?
			//				if (separator != null) {
			//					addToken(separator);
			//				}
			//				break;
			default:
				throw new IllegalStateException();
		}

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
