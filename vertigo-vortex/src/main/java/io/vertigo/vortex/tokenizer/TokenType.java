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
	blanks("(\\s)+"), // \s is the whitespace character: [ \t\n\x0B\f\r]

	comment("#.*"),

	//	//---separators---
	bracket("(\\{)|(\\})|(\\[)|(\\])|(\\()|(\\))|<|>"), // regex {}[]()<>

	punctuation(":|;|,"),
	//
	//	// ---literals---
	identifier("[A-Z][a-zA-Z0-9]*"),

	string("\"(\\\\\\\\|\\\\\\\"|[^\\\"])*\""), //regex >>  \" or \\ OR any char except (" or \)  

	integer("[\\-]?\\d+"), //an integer must contain only digits after an optional minus sign

	bool("(true|false)\\b"), // regex to accept true or false and exclude keywords beginning with true or false like trueliness

	// Keyword must be placed AFTER bool 
	keyword("[a-z](\\-[a-z]|[a-z0-9])*"); //a keyword must be like this 'name' or 'first-name'  > ")

	//	//---pre-processing
	//	variable(
	//			"\\$(/[a-z0-9]+)+", //regex
	//			"a variable looks like '$/xxx/yyy' starting with '$' and followed only by a path in lowercase latin letters or digits > "),
	//	directive(
	//			"/[a-z]+", //regex
	//			"a directive begins with '/' and contains only lowercase latin letters > ");

	final Pattern pattern;

	TokenType(String regex) {
		Assertion.check()
				.isNotNull(regex);
		//---
		this.pattern = Pattern.compile(regex);
	}
}
