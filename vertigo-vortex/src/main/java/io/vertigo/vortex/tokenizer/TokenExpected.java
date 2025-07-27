package io.vertigo.vortex.tokenizer;

import java.util.function.Consumer;

import io.vertigo.core.lang.Assertion;

public record TokenExpected(TokenType tokenType, String val, Consumer<String> consumer) {

	public TokenExpected {
		Assertion.check().isNotNull(tokenType);
	}

	//	public TokenExpected(TokenType tokenType, String val, Consumer<String> consumer) {
	//		this(tokenType, val, consumer, false);
	//	}

	public String toString() {
		return tokenType().name() + " : " + val();
	}
}
