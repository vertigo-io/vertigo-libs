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

public final class Scanner {
	//	
	//	private void addToken(Token token) {
	//		Assertion.check().isNotNull(token);
	//		//---
	//		tokenPositions.add(Tuple.of(token, index));
	//		if (token.type() == TokenType.bracket) {
	//			pushBracket(token);
	//		}
	//		//reset
	//		state = State.waiting;
	//		openingToken = -1;
	//	}
	//
	//	private RuntimeException buildException(String msg) {
	//		return new VUserException("Error at [" + index + "],  " + msg);
	//	}
	//
	//	private Stack<Tuple<Token, Integer>> bracketStack = new Stack<>(); // 
	//
	//	/*
	//	* We put the opening brackets in this bracketStack 
	//	* we pop when a closing bracket is found
	//	* the two brackets must be balanced
	//	*/
	//	private void pushBracket(Token bracket) {
	//		Assertion.check().isNotNull(bracket);
	//		//---
	//		//---Brackets define blocks 
	//		if (Lexicon.isLeftBracket(bracket)) {
	//			bracketStack.push(Tuple.of(bracket, index));
	//		} else {
	//			final var last = bracketStack.pop();
	//			//an ending bracket must follow an opening bracket ]=>[ ; }=>{ ; )=>(
	//			if (!Lexicon.isPairOfBrackets(last.val1(), bracket)) {
	//				throw buildException("a block is not well formed, all brackets must be balanced");
	//			}
	//		}
	//	}

}
