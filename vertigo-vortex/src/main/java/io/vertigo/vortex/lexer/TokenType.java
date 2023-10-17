package io.vertigo.vortex.lexer;

import java.util.regex.Pattern;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VUserException;

public enum TokenType {
	// ---comments---
	comment(
			".*",
			"this comment is not allowed > "),

	word(
			"[a-zA-Z][a-zA-Z0-9_\\-\\.]*",
			"a word start with letters and contains only letters, digits or '-', '_', '.'  > "),
	//	command,
	//	keyword
	//	identifier,

	//---separators---
	bracket(
			"(\\{)|(\\})|(\\[)|(\\])|(\\()|(\\))|<|>",
			"this bracket is not allowed > "),

	punctuation(
			":|;|,",
			"this punctuation is not allowed > "),

	// ---literals---
	string(
			".+",
			"a string must no be empty > "),
	integer(
			"[\\-]?\\d+",
			"an integer must contain only digits after an optional minus sign > "),
	bool(
			"true|false",
			"a bool must be true or false > "),

	//---pre-processing
	variable(
			"(/[a-z0-9]+)+",
			"a variable looks like '/xxx/yyy' starting with '/' and followed only by lowercase latin letters > ");
	//	command(
	//			"/[a-zA-Z]+",
	//			"a directive begins with '/' and contains only latin letters > ");

	private final Pattern pattern;
	private final String error;

	TokenType(String regex, String error) {
		Assertion.check()
				.isNotBlank(regex)
				.isNotBlank(error);
		//---
		this.pattern = Pattern.compile(regex);
		this.error = error;
	}

	void check(String value) {
		Assertion.check()
				.isTrue(pattern.matcher(value).matches(), error + value);
	}

	void checkAfterFirstCharacter(int index, char c) {
		switch (this) {
			case integer:
				if (!Lexicon.isDigit(c)) {
					throw buildException(index, "an integer must contain only digits");
				}
				break;
			case variable:
				if (!Lexicon.isLowerCaseLetter(c) && c != '/') {
					throw buildException(index, "a variable contains only lowercase latin letters separated with '/' : " + c);
				}
				break;
			//			case command:
			//				if (!Lexicon.isLetter(c)) {
			//					throw buildException(index, "a directive contains only latin letters : " + c);
			//				}
			//				break;
			case word:
				if (!Lexicon.isMiddleCharAcceptedinaWord(c)) {
					throw buildException(index, "a word must contain only letters,digits and _ or -");
				}
				break;
			case bool:
			case bracket:
			case punctuation:
			case comment:
			case string:
			default:
		}
	}

	private static RuntimeException buildException(int index, String msg) {
		return new VUserException("Error at [" + index + "],  " + msg);
	}
}
