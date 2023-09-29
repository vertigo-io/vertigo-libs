package io.vertigo.commons.lexer;

public enum TokenType {
	word,
	//	command,
	//	identifier,
	//	keyword
	//---
	//---separator---
	bracket,
	punctuation,
	// ---literal---
	string,
	integer,
	bool,
	// ---comment---
	comment
}
