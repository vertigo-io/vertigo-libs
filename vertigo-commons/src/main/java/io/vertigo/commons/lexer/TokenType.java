package io.vertigo.commons.lexer;

import java.util.regex.Pattern;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VUserException;

public enum TokenType {
	// ---comments---
	comment(
			".*",
			"this comment is not allowed"),

	word(
			"[a-zA-Z][a-zA-Z0-9_\\-\\.]*",
			"a word must contain only letters, digits or '-', '_', '.'  >"),
	//	command,
	//	keyword
	//	identifier,

	//---separators---
	bracket(
			"(\\{)|(\\})|(\\[)|(\\])|(\\()|(\\))|<|>",
			"this bracket is not allowed : "),

	punctuation(
			":|;|,",
			"this punctuation is not allowed : "),

	// ---literals---
	string(
			".*",
			"this string is not allowed : "),
	integer(
			"[\\-]?\\d+",
			"an integer must contain only digits after an optional minus sign : "),
	bool(
			"true|false",
			"a bool must be true or false : "),

	//---pre-processing
	variable(
			"\\$[a-zA-Z]+",
			"a variable begins with '$' and contains only latin letters : "),
	directive(
			"\\/[a-zA-Z]+",
			"a directive begins with '/' and contains only latin letters : ");

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
				if (!Lexicon.isLetter(c)) {
					throw buildException(index, "a variable contains only latin letters : " + c);
				}
				break;
			case directive:
				if (!Lexicon.isLetter(c)) {
					throw buildException(index, "a directive contains only latin letters : " + c);
				}
				break;
			case word:
				if (!Lexicon.isMiddleCharAcceptedinaWord(c)) {
					throw buildException(index, "a word (keyword, var..) must contain only letters,digits and _ or -");
				}
				break;
			case bool:
			case bracket:
			case punctuation:
			case comment:
			case string:
		}
	}

	private static RuntimeException buildException(int index, String msg) {
		return new VUserException("Error at [" + index + "],  " + msg);
	}
}
