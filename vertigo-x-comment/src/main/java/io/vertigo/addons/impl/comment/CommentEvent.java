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
	private final URI<S> keyConceptUri;

	/**
	 * @param comment Comment
	 * @param keyConceptUri  keyConcept's uri
	 */
	CommentEvent(final Comment comment, final URI<S> keyConceptUri) {
		Assertion.checkNotNull(comment);
		Assertion.checkNotNull(keyConceptUri);
		//-----
		this.comment = comment;
		this.keyConceptUri = keyConceptUri;
	}

	/**
	 * @return Comment
	 */
	public Comment getComment() {
		return comment;
	}

	/**
	 * @return keyConcept's uri
	 */
	public URI<S> getKeyConceptURI() {
		return keyConceptUri;
	}
}
