/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.commons.peg;

/**
 * Used when a value can't be parsed.
 */
public class PegParsingValueException extends Exception {

	private static final long serialVersionUID = 1L;

	public PegParsingValueException(final String message) {
		super(message);
	}

	public PegParsingValueException(final String message, final Object o1, final Object o2, final String operator) {
		super(message + " : " + buildMessageDetail(o1, o2, operator));
	}

	private static String buildMessageDetail(final Object o1, final Object o2, final String operator) {
		return "'" + o1 + "' (" + o1.getClass().getSimpleName() + ") " + operator + " '" + o2 + "' (" + o2.getClass().getSimpleName() + ")";
	}

}
