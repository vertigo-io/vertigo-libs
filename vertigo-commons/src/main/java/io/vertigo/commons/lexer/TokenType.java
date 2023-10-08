package io.vertigo.commons.lexer;

public enum TokenType {
	word,
	//	command,
	//	identifier,
	//	keyword

	//---separators---
	bracket,
	punctuation,

	// ---literal---
	string,
	integer,
	bool,

	// ---comment---
	comment
}
