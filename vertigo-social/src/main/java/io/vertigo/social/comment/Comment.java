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
package io.vertigo.social.comment;

import java.time.Instant;
import java.util.UUID;

import io.vertigo.account.account.Account;
import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.structure.model.UID;

/**
 * @author pchretien
 */
public record Comment(
		UUID uuid,
		UID<Account> author,
		String authorDisplayName,
		String msg,
		Instant creationDate,
		Instant lastModified) {

	public Comment {
		Assertion.check()
				.isNotNull(uuid)
				.isNotNull(author)
				.isNotBlank(authorDisplayName)
				.isNotBlank(msg)
				.isNotNull(creationDate);
		//lastModified is nullable
	}

	/**
	 * Static method factory for CommentBuilder
	 * @return CommentBuilder
	 */
	public static CommentBuilder builder() {
		return new CommentBuilder();
	}
}
