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
package io.vertigo.commons.peg.rule;

import io.vertigo.commons.peg.PegNoMatchFoundException;
import io.vertigo.commons.peg.PegResult;

/**
 * Rule used in PEG. parsing expression grammar.
 *
 * @author pchretien
 * @param <R> Type of the product text parsing
 */
public interface PegRule<R> {
	/** Dummy class, used for rule that returns Void. */
	final class Dummy {
		/** singleton. */
		public static final Dummy INSTANCE = new Dummy();

		private Dummy() {
			super();
		}
	}

	/**
	* @return Expression de la règle.
	*/
	String getExpression();

	/**
	 * Parser produces an object <P> or throw an exception.
	 * A parser analyzes a text, according some rules.
	 * A parser is responsible for moving the index position or throw an exception.
	 * Returns the result of the parsing operation.
	 * @param text Text to parse
	 * @param start Start of the element of text to parse
	 * @throws PegNoMatchFoundException if parsing has failed.
	 * @return the new index and the result
	 */
	PegResult<R> parse(final String text, final int start) throws PegNoMatchFoundException;

	default PegResult<R> parse(final String text) throws PegNoMatchFoundException {
		return parse(text, 0);
	}
}
