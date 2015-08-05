package io.vertigo.addons.impl.comment;

import io.vertigo.addons.comment.Comment;
import io.vertigo.addons.comment.CommentManager;
import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;

import java.util.List;

import javax.inject.Inject;

/**
 * @author pchretien
 */
public final class CommentManagerImpl implements CommentManager {
	private final CommentPlugin commentsPlugin;

	@Inject
	public CommentManagerImpl(final CommentPlugin commentsPlugin) {
		Assertion.checkNotNull(commentsPlugin);
		//-----
		this.commentsPlugin = commentsPlugin;
	}

	@Override
	public void publish(final Comment comment, final URI<? extends KeyConcept> subjectURI) {
		final CommentEvent notificationEvent = new CommentEvent(comment, subjectURI);
		commentsPlugin.emit(notificationEvent);
	}

	@Override
	public List<Comment> getComments(final URI<? extends KeyConcept> subjectURI) {
		Assertion.checkNotNull(subjectURI);
		//-----
		return commentsPlugin.getComments(subjectURI);
	}
	//
	//	@Override
	//	public <S extends DtSubject> void publishResponse(final Comment comment, final UUID uuid) {
	//		final CommentEvent notificationEvent = new CommentEvent(comment, final UUID uuid subjectURI, );
	//
	//		Assertion.checkNotNull(comment);
	//		Assertion.checkNotNull(subjectURI);
	//		//-----
	//		final CommentEvent notificationEvent = new CommentEvent(comment, subjectURI);
	//		commentsPlugin.emit(notificationEvent);
	//
	//	}
}
