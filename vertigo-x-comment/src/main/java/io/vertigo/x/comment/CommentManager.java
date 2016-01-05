package io.vertigo.x.comment;

import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Component;
import io.vertigo.x.account.Account;

import java.util.List;

/**
 * @author pchretien
 */
public interface CommentManager extends Component {

	/**
	 * Get ordered comments list published on this keyConcept.
	 * @param keyConceptUri keyConcept's uri
	 * @return ordered comments list
	 */
	List<Comment> getComments(URI<? extends KeyConcept> keyConceptUri);

	/**
	 * Publish a comment on a key concept.
	 * @param comment Comment
	 * @param keyConceptUri keyConcept's uri
	 */
	void publish(final URI<Account> accountURI, Comment comment, URI<? extends KeyConcept> keyConceptUri);

	/**
	 * Update comment.
	 * @param comment updated comment
	 */
	void update(final URI<Account> accountURI, Comment comment);
}
