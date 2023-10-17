package io.vertigo.vortex.lexer;

import java.util.List;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;

public record Scan(String source, List<Tuple<Token, Integer>> tokenPositions) {

	public Scan {
		Assertion.check()
				.isNotBlank(source)
				.isNotNull(tokenPositions);
	}

}
