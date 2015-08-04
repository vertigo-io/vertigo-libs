package io.vertigo.addons.plugins.notification.redis;

import io.vertigo.addons.account.Account;
import io.vertigo.addons.connectors.redis.RedisConnector;
import io.vertigo.addons.impl.notification.NotificationEvent;
import io.vertigo.addons.impl.notification.NotificationPlugin;
import io.vertigo.addons.notification.Notification;
import io.vertigo.addons.notification.NotificationBuilder;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
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
public final class RedisNotificationPlugin implements NotificationPlugin {
	private final RedisConnector redisConnector;

	@Inject
	public RedisNotificationPlugin(final RedisConnector redisConnector) {
		Assertion.checkNotNull(redisConnector);
		//-----
		this.redisConnector = redisConnector;
	}

	@Override
	public void emit(final NotificationEvent notificationEvent) {
		try (final Jedis jedis = redisConnector.getResource()) {
			final Notification notification = notificationEvent.getNotification();
			final String uuid = notification.getUuid().toString();
			final Transaction tx = jedis.multi();
			tx.hmset("notif:" + uuid, toMap(notification));
			if (notification.getTTLInSeconds() > 0) {
				tx.expire("notif:" + uuid, notification.getTTLInSeconds());
			}
			for (final URI<Account> accountURI : notificationEvent.getToAccountURIs()) {
				//On publie la notif
				tx.lpush("notifs:" + accountURI.getId(), uuid);
			}
			tx.exec();
		}
	}

	private static Map<String, String> toMap(final Notification notification) {
		return new MapBuilder<String, String>()
				.put("sender", notification.getSender().getId().toString())
				.put("uuid", notification.getUuid().toString())
				.put("title", notification.getTitle())
				.put("msg", notification.getMsg())
				.build();
	}

	private static Notification fromMap(final Map<String, String> data) {
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(Account.class);
		return new NotificationBuilder(UUID.fromString(data.get("uuid")))
				.withMsg(data.get("msg"))
				.withTitle(data.get("title"))
				.withSender(new URI<Account>(dtDefinition, data.get("sender")))
				.build();
	}

	@Override
	public List<Notification> getCurrentNotifications(final URI<Account> accountURI) {
		final List<Response<Map<String, String>>> responses = new ArrayList<>();
		try (final Jedis jedis = redisConnector.getResource()) {
			final List<String> uuids = jedis.lrange("notifs:" + accountURI.getId(), 0, -1);
			final Transaction tx = jedis.multi();
			for (final String uuid : uuids) {
				responses.add(tx.hgetAll("notif:" + uuid));
			}
			tx.exec();
		}
		//----- we are using tx to avoid roundtrips
		final List<Notification> notifications = new ArrayList<>();
		for (final Response<Map<String, String>> response : responses) {
			final Map<String, String> data = response.get();
			if (!data.isEmpty()) {
				notifications.add(fromMap(data));
			}
		}
		return notifications;
	}

	@Override
	public void remove(URI<Account> accountURI, UUID notificationUUID) {
		try (final Jedis jedis = redisConnector.getResource()) {
			jedis.lrem("notifs:" + accountURI.getId(), -1, notificationUUID.toString());
		}
	}
}
