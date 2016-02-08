package io.vertigo.x.impl.comment;

import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Plugin;
import io.vertigo.x.comment.Comment;

import java.util.List;
import java.util.UUID;

/**
 * @author pchretien
 */
public interface CommentPlugin extends Plugin {

	/**
	 * Publishes a comment about a key concept.
	 * @param comment the comment 
	 * @param keyConceptURI the key concept defined by its URI
	 */
	<S extends KeyConcept> void publish(Comment comment, URI<S> keyConceptURI);

	/**
	 * Gets the comment by its uuid. 
	 * @param uuid the uuid of the comment
	 * @return the comment
	 */
	Comment get(UUID uuid);

	/**
	 * Lists the comments as a key concerned is concerned
	 * @param keyConceptURI the key concept defined by its URI
	 * @return the list of comments
	 */
	<S extends KeyConcept> List<Comment> getComments(URI<S> keyConceptURI);

	/**
	 * Updates a comment.
	 * @param comment the comment
	 */
	void update(Comment comment);

}
