package io.vertigo.addons.impl.comment;

import io.vertigo.addons.comment.Comment;
import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Plugin;

import java.util.List;

/**
 * @author pchretien
 */
public interface CommentPlugin extends Plugin {
	void emit(CommentEvent commentEvent);

	<S extends KeyConcept> List<Comment> getComments(URI<S> subjectURI);
}
