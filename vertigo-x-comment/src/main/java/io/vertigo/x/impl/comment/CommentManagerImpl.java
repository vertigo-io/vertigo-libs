/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.x.impl.comment;

import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.util.DateUtil;
import io.vertigo.x.account.Account;
import io.vertigo.x.comment.Comment;
import io.vertigo.x.comment.CommentBuilder;
import io.vertigo.x.comment.CommentManager;

/**
 * @author pchretien
 */
public final class CommentManagerImpl implements CommentManager {
	private final CommentPlugin commentsPlugin;

	/**
	 * Constructor.
	 * @param commentsPlugin Comment plugin
	 */
	@Inject
	public CommentManagerImpl(final CommentPlugin commentsPlugin) {
		Assertion.checkNotNull(commentsPlugin);
		//-----
		this.commentsPlugin = commentsPlugin;
	}

	/** {@inheritDoc} */
	@Override
	public void publish(final URI<Account> accountURI, final Comment comment, final URI<? extends KeyConcept> keyConceptUri) {
		Assertion.checkNotNull(comment);
		Assertion.checkNotNull(keyConceptUri);
		//-----
		final Date creationDate = DateUtil.newDateTime();
		final Comment savedComment = new CommentBuilder()
				.withAuthor(accountURI)
				.withCreationDate(creationDate)
				.withLastModified(creationDate)
				.withMsg(comment.getMsg())
				.build();
		commentsPlugin.publish(savedComment, keyConceptUri);
	}

	/** {@inheritDoc} */
	@Override
	public List<Comment> getComments(final URI<? extends KeyConcept> keyConceptUri) {
		Assertion.checkNotNull(keyConceptUri);
		//-----
		return commentsPlugin.getComments(keyConceptUri);
	}

	/** {@inheritDoc} */
	@Override
	public void update(final URI<Account> accountURI, final Comment comment) {
		Assertion.checkNotNull(comment);
		//-----
		final Comment originalComment = commentsPlugin.get(comment.getUuid());
		final boolean authorized = accountURI.equals(comment.getAuthor()) && originalComment.getAuthor().equals(comment.getAuthor());
		Assertion.checkState(authorized, "The comment editing is only available for the comment's author.");

		final Comment savedComment = new CommentBuilder(originalComment.getUuid(), accountURI, originalComment.getCreationDate())
				.withMsg(comment.getMsg())
				.withLastModified(DateUtil.newDateTime())
				.build();
		commentsPlugin.update(savedComment);
	}
}
