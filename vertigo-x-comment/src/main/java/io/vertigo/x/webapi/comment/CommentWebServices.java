package io.vertigo.x.webapi.comment;

import io.vertigo.core.Home;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.Option;
import io.vertigo.util.StringUtil;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.ExcludedFields;
import io.vertigo.vega.rest.stereotype.GET;
import io.vertigo.vega.rest.stereotype.POST;
import io.vertigo.vega.rest.stereotype.PUT;
import io.vertigo.vega.rest.stereotype.PathParam;
import io.vertigo.vega.rest.stereotype.PathPrefix;
import io.vertigo.vega.rest.stereotype.QueryParam;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.comment.Comment;
import io.vertigo.x.comment.CommentManager;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

/**
 * Webservice for addon Notification.
 *
 * @author npiedeloup
 */
@PathPrefix("/x/comment")
public final class CommentWebServices implements RestfulService {

	private static final String API_VERSION = "0.1.0";
	private static final String IMPL_VERSION = "0.8.2";

	@Inject
	private CommentManager commentManager;
	@Inject
	private AccountManager accountManager;

	/**
	 * Get comments for keyConcept.
	 * @param keyConcept KeyConcept type
	 * @param id KeyConcept id
	 * @return comments for keyConcept
	 */
	@GET("/api/comments")
	public List<Comment> getComments(@QueryParam("concept") final String keyConcept, @QueryParam("id") final String id) {
		final URI<KeyConcept> keyConceptURI = readKeyConceptURI(keyConcept, id);
		return commentManager.getComments(keyConceptURI);
	}

	/**
	 * Publish a new comment.
	 * @param comment Comment msg
	 * @param keyConcept KeyConcept type
	 * @param id KeyConcept id
	 */
	@POST("/api/comments")
	public void publishComment(@ExcludedFields("uuid") final Comment comment, @QueryParam("concept") final String keyConcept, @QueryParam("id") final String id) {
		final URI<Account> loggedAccountURI = accountManager.getLoggedAccount();
		if (!loggedAccountURI.equals(comment.getAuthor())) {
			throw new RuntimeException("The comment editing is only available for the comment's author.");
		}
		final URI<KeyConcept> keyConceptURI = readKeyConceptURI(keyConcept, id);
		commentManager.publish(comment, keyConceptURI);
	}

	/**
	 * Update a comment.
	 * @param uuid Comment uuid
	 * @param comment Comment msg
	 */
	@PUT("/api/comments/{uuid}")
	public void updateComment(@PathParam("uuid") final String uuid, final Comment comment) {
		final URI<Account> loggedAccountURI = accountManager.getLoggedAccount();
		if (!loggedAccountURI.equals(comment.getAuthor())) {
			throw new RuntimeException("The comment editing is only available for the comment's author.");
		}
		if (!uuid.equals(comment.getUuid().toString())) {
			throw new RuntimeException("Comment uuid (" + comment.getUuid().toString() + ") must match WebService route (" + uuid + ")");
		}
		commentManager.update(comment);
	}

	//-----
	/**
	 * Addon status (code 200 or 500)
	 * @return "OK" or error message
	 */
	@GET("/status")
	@AnonymousAccessAllowed
	public String getStatus() {
		return "OK";
	}

	/**
	 * Addon stats.
	 * @return "OK" or error message
	 */
	@GET("/stats")
	@AnonymousAccessAllowed
	public Map<String, Object> getStats() {
		final Map<String, Object> stats = new HashMap<>();
		final Map<String, Object> sizeStats = new HashMap<>();
		sizeStats.put("notifications", "not yet");
		stats.put("size", sizeStats);
		return stats;
	}

	/**
	 * Addon config.
	 * @return Config object
	 */
	@GET("/config")
	@AnonymousAccessAllowed
	public Map<String, Object> getConfig() {
		final Map<String, Object> config = new HashMap<>();
		config.put("api-version", API_VERSION);
		config.put("impl-version", IMPL_VERSION);
		return config;
	}

	/**
	 * Addon help.
	 * @return Help object
	 */
	@GET("/help")
	@AnonymousAccessAllowed
	public String getHelp() {
		return "##Notification addon"
				+ "\n This addon manage the notification center.";
	}

	private URI<KeyConcept> readKeyConceptURI(final String keyConcept, @QueryParam("id") final String id) {
		final DtDefinition dtDefinition = Home.getDefinitionSpace().resolve("DT_" + StringUtil.camelToConstCase(keyConcept), DtDefinition.class);
		final Object keyConceptId = stringToId(id, dtDefinition);
		return new URI<>(dtDefinition, keyConceptId);
	}

	private Object stringToId(final String id, final DtDefinition dtDefinition) {
		final Option<DtField> keyField = dtDefinition.getIdField();
		Assertion.checkArgument(keyField.isDefined(), "KeyConcept {0} must have an key field, in order to support Comment extension", dtDefinition.getLocalName());

		final DataType dataType = keyField.get().getDomain().getDataType();
		if (dataType == DataType.String) {
			return id;
		} else if (dataType == DataType.Integer) {
			return Integer.valueOf(id);
		} else if (dataType == DataType.Long) {
			return Long.valueOf(id);
		}
		throw new IllegalArgumentException("Key of KeyConcept " + dtDefinition.getLocalName() + " must be String, Long or Integer");
	}

}
