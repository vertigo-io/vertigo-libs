package io.vertigo.addons.comment;

import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Component;

import java.util.List;

/**
 * @author pchretien
 */
public interface CommentManager extends Component {
	void publish(Comment comment, URI<? extends KeyConcept> subjectURI);

	//	<S extends DtSubject> void publishResponse(Comment comment, URI<S> subjectURI, UUID uuid);

	List<Comment> getComments(URI<? extends KeyConcept> subjectURI);
}
