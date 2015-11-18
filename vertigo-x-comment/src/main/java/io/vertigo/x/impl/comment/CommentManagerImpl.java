package io.vertigo.x.impl.comment;

import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.util.DateUtil;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.comment.Comment;
import io.vertigo.x.comment.CommentBuilder;
import io.vertigo.x.comment.CommentManager;

import java.util.Date;
import java.util.List;

import javax.inject.Inject;

/**
 * @author pchretien
 */
public final class CommentManagerImpl implements CommentManager {
	private final CommentPlugin commentsPlugin;

	private final AccountManager accountManager;

	/**
	 * Constructor.
	 * @param commentsPlugin Comment plugin
	 */
	@Inject
	public CommentManagerImpl(final CommentPlugin commentsPlugin, final AccountManager accountManager) {
		Assertion.checkNotNull(commentsPlugin);
		Assertion.checkNotNull(accountManager);
		//-----
		this.commentsPlugin = commentsPlugin;
		this.accountManager = accountManager;
	}

	/** {@inheritDoc} */
	@Override
	public void publish(final Comment comment, final URI<? extends KeyConcept> keyConceptUri) {
		Assertion.checkNotNull(comment);
		Assertion.checkNotNull(keyConceptUri);
		//-----
		final URI<Account> loggedAccountURI = accountManager.getLoggedAccount();
		final Date creationDate = DateUtil.newDateTime();
		final Comment savedComment = new CommentBuilder()
				.withAuthor(loggedAccountURI)
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
	public void update(final Comment comment) {
		Assertion.checkNotNull(comment);
		//-----
		final URI<Account> loggedAccountURI = accountManager.getLoggedAccount();
		final Comment originalComment = commentsPlugin.get(comment.getUuid());
		if (!loggedAccountURI.equals(comment.getAuthor())
				|| !originalComment.getAuthor().equals(comment.getAuthor())) {
			throw new RuntimeException("The comment editing is only available for the comment's author.");
		}

		final Comment savedComment = new CommentBuilder(originalComment.getUuid(), loggedAccountURI, originalComment.getCreationDate())
				.withMsg(comment.getMsg())
				.withLastModified(DateUtil.newDateTime())
				.build();
		commentsPlugin.update(savedComment);
	}
}
