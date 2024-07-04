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
package io.vertigo.vortex.tokenizer;

import io.vertigo.core.lang.Assertion;

public record Token(TokenType type, String value, int start) {

	public Token(TokenType type, String value, int start) {
		Assertion.check()
				.isNotNull(type)
				.isNotNull(value);
		switch (type) {
			// we have to remove the " or """ or ' or '''
			case string_basic:
				this.value = value
						.substring(1, value.length() - 1)
						.replace("\\\\", "\\") //   // -> /
						.replace("\\\"", "\""); //  /" -> "
				break;
			case string_basic_multi_line:
				this.value = value
						.substring(3, value.length() - 3)
						.replace("\\\\", "\\") //   // -> /
						.replace("\\\"", "\""); //  /" -> "
				break;
			case string_strict:
				this.value = value
						.substring(1, value.length() - 1);
				break;
			case string_strict_multi_line:
				this.value = value
						.substring(3, value.length() - 3);
				break;
			default:
				this.value = value;
		}
		this.type = type;
		this.start = start;
	}

	@Override
	public String toString() {
		return type + "[" + start + "] : " + value;
	}
}
