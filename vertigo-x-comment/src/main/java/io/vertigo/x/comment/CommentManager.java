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
	 * Gets a list of sorted comments published on this keyConcept.
	 * @param keyConceptUri the URI of the keyConcept
	 * @return the list of sorted comments 
	 */
	List<Comment> getComments(URI<? extends KeyConcept> keyConceptUri);

	/**
	 * Publishes a comment on a key concept.
	 * @param accountURI the account defined by its URI
	 * @param comment  the comment
	 * @param keyConceptUri the URI of the keyConcept
	 */
	void publish(final URI<Account> accountURI, Comment comment, URI<? extends KeyConcept> keyConceptUri);

	/**
	 * Updates a comment.
	 * @param accountURI the account defined by its URI
	 * @param comment the updated comment
	 */
	void update(final URI<Account> accountURI, Comment comment);
}
