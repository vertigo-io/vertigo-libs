package io.vertigo.commons.lexer;

public enum TokenType {
	// ---comment---
	comment,

	word,
	//	command,
	//	keyword
	//	identifier,

	//---separators---
	bracket,
	punctuation,

	// ---literal---
	string,
	integer,
	bool,

}
