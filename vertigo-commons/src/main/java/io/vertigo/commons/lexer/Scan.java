package io.vertigo.commons.lexer;

import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;

public final class Scan {
	//	private final String source;
	private final List<Tuple<Token, Integer>> tokenPositions;

	public Scan(String source, List<Tuple<Token, Integer>> tokenPositions) {
		Assertion.check()
				.isNotBlank(source)
				.isNotNull(tokenPositions);
		//---
		//		this.source = source;
		this.tokenPositions = tokenPositions;
	}

	//	public void check(boolean checkPair) {
	//		bracketStack = new Stack<>();
	//		// We put the opening brackets in this bracketStack 
	//		// we pop when a closing bracket is found
	//		// the two brackets must be well balanced
	//		for (var i = 0; i < tokenPositions.size(); i++) {
	//			var tokenPosition = tokenPositions.get(i);
	//			if (tokenPosition.val1().isBracket()) {
	//				pushBracket(tokenPosition);
	//			} else if (checkPair && tokenPosition.val1().isLiteral()) {
	//				// we have to check that the litteral is contained in a pair
	//				checkPair(i);
	//			}
	//		}
	//		if (!bracketStack.isEmpty()) {
	//			throw buildException(bracketStack.firstElement(), "some brackets must be closed");
	//		}
	//
	//	}
	//
	//	private void checkPair(int n) {
	//		//A pair must be like this 
	//		// token (identifier) : n-2
	//		// token (punctuation ':' ) : n-1
	//		// token (literal ':' ) : n
	//
	//		if (n < 2) {
	//			throw buildException(tokenPositions.get(n), "a literal must be in a pair");
	//		}
	//
	//		if (!(tokenPositions.get(n - 2).val1().isWord()
	//				&& tokenPositions.get(n - 1).val1() == Lexicon.COLON
	//				&& tokenPositions.get(n).val1().isLiteral()))
	//			throw buildException(tokenPositions.get(n), "a literal must be in a pair well formed [identifier : literal] ");
	//
	//	}

	//	private static RuntimeException buildException(Tuple<Token, Integer> tokenPosition, String msg) {
	//		return new VUserException("Error at [" + tokenPosition.val2() + "], for token '" + tokenPosition.val2() + "' :" + msg);
	//	}

	List<Token> tokens() {
		return tokenPositions
				.stream()
				.map(Tuple::val1)
				.collect(Collectors.toList());
	}
}
