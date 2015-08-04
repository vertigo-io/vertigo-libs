package io.vertigo.addons.plugins.comment.redis;

import io.vertigo.addons.account.Account;
import io.vertigo.addons.comment.Comment;
import io.vertigo.addons.comment.CommentBuilder;
import io.vertigo.addons.connectors.redis.RedisConnector;
import io.vertigo.addons.impl.comment.CommentEvent;
import io.vertigo.addons.impl.comment.CommentPlugin;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.lang.Assertion;
import io.vertigo.util.MapBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.Response;
import redis.clients.jedis.Transaction;

/**
 * @author pchretien
 */
public final class RedisCommentPlugin implements CommentPlugin {
	private final RedisConnector redisConnector;

	@Inject
	public RedisCommentPlugin(final RedisConnector redisConnector) {
		Assertion.checkNotNull(redisConnector);
		//-----
		this.redisConnector = redisConnector;
	}

	@Override
	public void emit(final CommentEvent commentEvent) {
		try (final Jedis jedis = redisConnector.getResource()) {
			final Comment comment = commentEvent.getComment();
			final Transaction tx = jedis.multi();
			tx.hmset("comment:" + comment.getUuid(), toMap(comment));
			tx.lpush("comments:" + commentEvent.getSubjectURI().getId(), comment.getUuid().toString());
			tx.exec();
		}

	}

	private static Map<String, String> toMap(final Comment comment) {
		return new MapBuilder<String, String>()
				.put("author", comment.getAuthor().getId().toString())
				.put("msg", comment.getMsg())
				.put("uuid", comment.getUuid().toString())
				.build();
		//			data.put("creationDate", comment.getCreationDate());
	}

	private static Comment fromMap(final Map<String, String> data) {
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(Account.class);

		return new CommentBuilder()
				.withAuthor(new URI<Account>(dtDefinition, data.get("author")))
				.withUUID(UUID.fromString(data.get("uuid")))
				.withMsg(data.get("msg"))
				.build();
	}

	@Override
	public <S extends KeyConcept> List<Comment> getComments(final URI<S> subjectURI) {
		final List<Response<Map<String, String>>> responses = new ArrayList<>();
		try (final Jedis jedis = redisConnector.getResource()) {
			final List<String> uuids = jedis.lrange("comments:" + subjectURI.getId(), 0, -1);
			final Transaction tx = jedis.multi();
			for (final String uuid : uuids) {
				responses.add(tx.hgetAll("comment:" + uuid));
			}
			tx.exec();
		}
		//----- we are using tx to avoid roundtrips
		final List<Comment> comments = new ArrayList<>();
		for (final Response<Map<String, String>> response : responses) {
			final Map<String, String> data = response.get();
			if (!data.isEmpty()) {
				comments.add(fromMap(data));
			}
		}
		return comments;
	}
}
