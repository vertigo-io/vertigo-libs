package io.vertigo.x.impl.comment;

import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.util.DateUtil;
import io.vertigo.x.comment.Comment;
import io.vertigo.x.comment.CommentBuilder;
import io.vertigo.x.comment.CommentManager;

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
	public void publish(final Comment comment, final URI<? extends KeyConcept> keyConceptUri) {
		Assertion.checkNotNull(comment);
		Assertion.checkNotNull(keyConceptUri);
		//-----
		commentsPlugin.publish(comment, keyConceptUri);
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
		final Comment originalComment = commentsPlugin.get(comment.getUuid());
		if (!originalComment.getAuthor().equals(comment.getAuthor())) {
			throw new RuntimeException("The comment editing is only available for the comment's author.");
		}
		final Comment savedComment = new CommentBuilder(originalComment.getUuid(), originalComment.getAuthor(), originalComment.getCreationDate())
				.withMsg(comment.getMsg())
				.withLastModified(DateUtil.newDateTime())
				.build();
		commentsPlugin.update(savedComment);
	}
}
