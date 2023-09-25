package io.vertigo.commons.lexer;

public enum TokenType {
	keyword,
	identifier,
	//---
	blockSeparator,
	separator,
	// ---litteral---
	string,
	integer,
	bool
}
