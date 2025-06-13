/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.vortex.parser;

public final class PairValidator {

	//	public void check(boolean checkPair) {
	//		for (var i = 0; i < tokenPositions.size(); i++) {
	//			var tokenPosition = tokenPositions.get(i);
	//			if (checkPair && tokenPosition.val1().isLiteral()) {
	//				// we have to check that the litteral is contained in a pair
	//				checkPair(i);
	//			}
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
}
