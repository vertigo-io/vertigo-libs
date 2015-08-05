package io.vertigo.addons.impl.comment;

import io.vertigo.addons.comment.Comment;
import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;

/**
 * @author pchretien
 */
public final class CommentEvent<S extends KeyConcept> {
	private final Comment comment;
	public final URI<S> subjectURI;

	CommentEvent(final Comment comment, final URI<S> subjectURI) {
		Assertion.checkNotNull(comment);
		Assertion.checkNotNull(subjectURI);
		//-----
		this.comment = comment;
		this.subjectURI = subjectURI;
	}

	public Comment getComment() {
		return comment;
	}

	public URI<S> getSubjectURI() {
		return subjectURI;
	}
}
