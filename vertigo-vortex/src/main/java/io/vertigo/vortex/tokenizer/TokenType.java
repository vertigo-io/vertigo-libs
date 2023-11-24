/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.vortex.tokenizer;

import java.util.regex.Pattern;

import io.vertigo.core.lang.Assertion;

public enum TokenType {
	blanks(
			"(\\s|\\n|\\r)+", //regex
			"only blank"),

	comment(
			"#.*", //regex
			"this comment is not allowed > "),

	//	//---separators---
	bracket(
			"(\\{)|(\\})|(\\[)|(\\])|(\\()|(\\))|<|>", // regex {}[]()<>
			"this bracket is not allowed > "),

	punctuation(
			":|;|,", //regex
			"this punctuation is not allowed > "),
	//
	//	// ---literals---
	identifier(
			"[A-Z][a-zA-Z0-9]*", //regex
			"an identifier must be like this 'MySpace' or 'MySpace99'  > "),
	string(
			"\"(\\\\|\\\"|[^\\\"])*\"", //regex >>  \" or \\ OR any char except (" or \)  
			"a string must be escaped > "),
	integer(
			"[\\-]?\\d+", //regex
			"an integer must contain only digits after an optional minus sign > "),
	bool(
			"(true|false)[a-z\\-]?", // regex to accept true or false and exclude keywords beginning with true or false like trueliness
			"a bool must be true or false > "),

	// Keyword must be placed AFTER bool 
	keyword(
			"[a-z][a-z\\-]*[a-z]", //regex
			"a keyword must be like this 'name' or 'first-name'  > ");

	//	//---pre-processing
	//	variable(
	//			"\\$(/[a-z0-9]+)+", //regex
	//			"a variable looks like '$/xxx/yyy' starting with '$' and followed only by a path in lowercase latin letters or digits > "),
	//	directive(
	//			"/[a-z]+", //regex
	//			"a directive begins with '/' and contains only lowercase latin letters > ");

	final Pattern pattern;
	final String error;

	TokenType(String regex, String error) {
		Assertion.check()
				.isNotNull(regex)
				.isNotBlank(error);
		//---
		this.pattern = Pattern.compile("^(" + regex + ")");
		this.error = error;
	}

	void check(String value) {
		Assertion.check()
				.isTrue(pattern.matcher(value).matches(), error + value);
	}

	//	void checkAfterFirstCharacter(int index, char c) {
	//		switch (this) {
	//			case integer:
	//				if (!Lexicon.isDigit(c)) {
	//					throw buildException(index, "an integer must contain only digits");
	//				}
	//				break;
	//			case variable:
	//				if (!Lexicon.isLowerCaseLetter(c) && c != '/') {
	//					throw buildException(index, "a variable contains only lowercase latin letters separated with '/' : " + c);
	//				}
	//				break;
	//			//			case command:
	//			//				if (!Lexicon.isLetter(c)) {
	//			//					throw buildException(index, "a directive contains only latin letters : " + c);
	//			//				}
	//			//				break;
	//			case word:
	//				if (!Lexicon.isMiddleCharAcceptedinaWord(c)) {
	//					throw buildException(index, "a word must contain only letters,digits and _ or -");
	//				}
	//				break;
	//			case bool:
	//			case bracket:
	//			case punctuation:
	//			case comment:
	//			case string:
	//			default:
	//		}
	//	}

	//	private static RuntimeException buildException(int index, String msg) {
	//		return new VUserException("Error at [" + index + "],  " + msg);
	//	}
}
