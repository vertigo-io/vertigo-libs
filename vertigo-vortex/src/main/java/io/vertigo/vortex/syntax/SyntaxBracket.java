package io.vertigo.vortex.syntax;

import java.util.stream.Stream;

import io.vertigo.core.lang.VSystemException;

public enum SyntaxBracket {
	LeftCurly('{'), //
	RightCurly('}'), //
	LeftRound('('), //
	RightRound(')'), //
	LeftSquare('['), //
	RightSquare(']'), //
	LeftAngle('<'), // 
	RightAngle('>');

	private final char value;

	private SyntaxBracket(char bracket) {
		this.value = bracket;
	}

	public String value() {
		return Character.valueOf(value).toString();
	}

	public static SyntaxBracket of(char c) {
		return Stream.of(SyntaxBracket.values())
				.filter(bracket -> bracket.value == c)
				.findFirst()
				.orElseThrow(() -> new VSystemException("Unrecognized bracket '{0}' not found in {1}", c, values()));
	}
}
