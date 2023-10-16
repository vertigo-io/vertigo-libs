package io.vertigo.commons.lexer;

import java.util.regex.Pattern;

import io.vertigo.core.lang.Assertion;

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
}
