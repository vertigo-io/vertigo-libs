package io.vertigo.x.impl.comment;

import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.util.DateUtil;
import io.vertigo.x.account.Account;
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

		final Comment savedComment = new CommentBuilder(originalComment.getUuid(), accountURI, originalComment.getCreationDate())
				.withMsg(comment.getMsg())
				.withLastModified(DateUtil.newDateTime())
				.build();
		commentsPlugin.update(savedComment);
	}
}
