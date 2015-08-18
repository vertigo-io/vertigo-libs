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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
	private static final String CODEC_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
	private final RedisConnector redisConnector;

	/**
	 * @param redisConnector Redis connector
	 */
	@Inject
	public RedisCommentPlugin(final RedisConnector redisConnector) {
		Assertion.checkNotNull(redisConnector);
		//-----
		this.redisConnector = redisConnector;
	}

	/** {@inheritDoc} */
	@Override
	public void emit(final CommentEvent commentEvent) {
		try (final Jedis jedis = redisConnector.getResource()) {
			final Comment comment = commentEvent.getComment();
			final Transaction tx = jedis.multi();
			tx.hmset("comment:" + comment.getUuid(), toMap(comment));
			tx.lpush("comments:" + commentEvent.getKeyConceptURI().getId(), comment.getUuid().toString());
			tx.exec();
		}

	}

	/** {@inheritDoc} */
	@Override
	public <S extends KeyConcept> List<Comment> getComments(final URI<S> keyConceptUri) {
		final List<Response<Map<String, String>>> responses = new ArrayList<>();
		try (final Jedis jedis = redisConnector.getResource()) {
			final List<String> uuids = jedis.lrange("comments:" + keyConceptUri.getId(), 0, -1);
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

	private static Map<String, String> toMap(final Comment comment) {
		final String creationDate = new SimpleDateFormat(CODEC_DATE_FORMAT).format(comment.getCreationDate());
		return new MapBuilder<String, String>()
				.put("uuid", comment.getUuid().toString())
				.put("author", String.valueOf(comment.getAuthor().getId()))
				.put("msg", comment.getMsg())
				.put("creationDate", creationDate)
				.build();
	}

	private static Comment fromMap(final Map<String, String> data) {
		try {
			final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(Account.class);
			final Date creationDate = new SimpleDateFormat(CODEC_DATE_FORMAT).parse(data.get("creationDate"));

			return new CommentBuilder(UUID.fromString(data.get("uuid")))
					.withAuthor(new URI<Account>(dtDefinition, data.get("author")))
					.withMsg(data.get("msg"))
					.withCreationDate(creationDate)
					.build();
		} catch (final ParseException e) {
			throw new RuntimeException("Can't parse comment", e);
		}
	}
}
