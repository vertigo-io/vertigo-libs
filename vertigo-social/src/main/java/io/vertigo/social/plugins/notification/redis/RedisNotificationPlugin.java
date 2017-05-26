/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.social.plugins.notification.redis;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;

import io.vertigo.account.identity.Account;
import io.vertigo.commons.daemon.Daemon;
import io.vertigo.commons.daemon.DaemonDefinition;
import io.vertigo.commons.daemon.DaemonManager;
import io.vertigo.commons.impl.connectors.redis.RedisConnector;
import io.vertigo.core.definition.Definition;
import io.vertigo.core.definition.DefinitionSpace;
import io.vertigo.core.definition.SimpleDefinitionProvider;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.WrappedException;
import io.vertigo.social.impl.notification.NotificationEvent;
import io.vertigo.social.impl.notification.NotificationPlugin;
import io.vertigo.social.services.notification.Notification;
import io.vertigo.util.MapBuilder;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Response;
import redis.clients.jedis.Transaction;

/**
 * @author pchretien
 */
public final class RedisNotificationPlugin implements NotificationPlugin, SimpleDefinitionProvider {
	private static final String CODEC_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
	private final RedisConnector redisConnector;

	/**
	 * Constructor.
	 * @param redisConnector the connector to REDIS database
	 * @param daemonManager Daemon Manager
	 */
	@Inject
	public RedisNotificationPlugin(final RedisConnector redisConnector, final DaemonManager daemonManager) {
		Assertion.checkNotNull(redisConnector);
		Assertion.checkNotNull(daemonManager);
		//-----
		this.redisConnector = redisConnector;
	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		return Collections.singletonList(new DaemonDefinition("DMN_CLEAN_TOO_OLD_REDIS_NOTIFICATIONS", () -> new RemoveTooOldElementsDaemon(this), 60 * 1000));
	}

	/** {@inheritDoc} */
	@Override
	public void send(final NotificationEvent notificationEvent) {
		//1 notif is store 5 times :
		// - data in map with key= notif:$uuid
		// - uuid in queue with key= notifs:all (for purge)
		// - uuid in queue with key= notifs:$accountId
		// - uuid in queue with key= type:$type;target:$target;uuid
		// - notifs:$accountId in queue with key= accounts:$uuid

		try (final Jedis jedis = redisConnector.getResource()) {
			final Notification notification = notificationEvent.getNotification();
			final String uuid = notification.getUuid().toString();
			final String typedTarget = "type:" + notification.getType() + ";target:" + notification.getTargetUrl() + ";uuid";
			try (final Transaction tx = jedis.multi()) {
				tx.hmset("notif:" + uuid, toMap(notification));

				//TODO add expire on data
				//retirer notifs:all qui ne sert plus à rien
				//loop on type:$type;target:$target;uuid et on déduit les autres queues de là
				if (notification.getTTLInSeconds() > 0) {
					tx.expire("notif:" + uuid, notification.getTTLInSeconds());
				}
				tx.lrem("notifs:all", 0, uuid);
				tx.lpush("notifs:all", uuid);

				for (final URI<Account> accountURI : notificationEvent.getToAccountURIs()) {
					final String notifiedAccount = "notifs:" + accountURI.getId();
					//On publie la notif (the last wins)
					tx.lrem(notifiedAccount, 0, uuid);
					tx.lpush(notifiedAccount, uuid);
					tx.lrem("accounts:" + uuid, 0, notifiedAccount);
					tx.lpush("accounts:" + uuid, notifiedAccount);
					tx.lrem(typedTarget, 0, uuid);
					tx.lpush(typedTarget, uuid);
				}
				tx.exec();
			} catch (final IOException ex) {
				throw WrappedException.wrap(ex);
			}

		}
	}

	private static Map<String, String> toMap(final Notification notification) {
		final String creationDate = new SimpleDateFormat(CODEC_DATE_FORMAT).format(notification.getCreationDate());
		return new MapBuilder<String, String>()
				.put("uuid", notification.getUuid().toString())
				.put("sender", notification.getSender())
				.putNullable("type", notification.getType())
				.put("title", notification.getTitle())
				.put("content", notification.getContent())
				.put("creationDate", creationDate)
				.put("ttlInSeconds", String.valueOf(notification.getTTLInSeconds()))
				.put("targetUrl", notification.getTargetUrl())
				.build();
	}

	private static Notification fromMap(final Map<String, String> data) {
		try {
			final Date creationDate = new SimpleDateFormat(CODEC_DATE_FORMAT)
					.parse(data.get("creationDate"));
			return Notification.builder(UUID.fromString(data.get("uuid")))
					.withSender(data.get("sender"))
					.withType(data.get("type"))
					.withTitle(data.get("title"))
					.withContent(data.get("content"))
					.withCreationDate(creationDate)
					.withTTLInSeconds(Integer.valueOf(data.get("ttlInSeconds")))
					.withTargetUrl(data.get("targetUrl"))
					.build();
		} catch (final ParseException e) {
			throw WrappedException.wrap(e, "Can't parse notification");
		}
	}

	/** {@inheritDoc} */
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
		cleanTooOldNotifications(notifications);
		return notifications;
	}

	/** {@inheritDoc} */
	@Override
	public void remove(final URI<Account> accountURI, final UUID notificationUUID) {
		try (final Jedis jedis = redisConnector.getResource()) {
			final String notifiedAccount = "notifs:" + accountURI.getId();
			final String uuid = notificationUUID.toString();
			//we remove notif from account stack and account from notif stack
			jedis.lrem(notifiedAccount, -1, uuid);
			jedis.lrem("accounts:" + uuid, -1, notifiedAccount);

			final List<String> notifiedAccounts = jedis.lrange("accounts:" + uuid, 0, -1);
			if (notifiedAccounts.isEmpty()) { //if no more account ref this notif we remove it
				//we remove list account for this notif
				jedis.del("accounts:" + uuid);

				//we remove uuid from queue by type and targetUrl
				final Notification notification = fromMap(jedis.hgetAll("notif:" + uuid));
				jedis.lrem("type:" + notification.getType() + ";target:" + notification.getTargetUrl() + ";uuid", -1, uuid);

				//we remove data of this notif
				jedis.del("notif:" + uuid);

				//we remove notif from global index (looking from tail)
				jedis.lrem("notifs:all", -1, uuid);
			}
		}
	}

	/** {@inheritDoc} */
	@Override
	public void removeAll(final String type, final String targetUrl) {
		try (final Jedis jedis = redisConnector.getResource()) {
			final List<String> uuids = jedis.lrange("type:" + type + ";target:" + targetUrl + ";uuid", 0, -1);
			for (final String uuid : uuids) {
				//we search accounts for this notif
				final List<String> notifiedAccounts = jedis.lrange("accounts:" + uuid, 0, -1);
				for (final String notifiedAccount : notifiedAccounts) {
					//we remove this notifs from accounts queue
					jedis.lrem(notifiedAccount, -1, uuid);
				}
				//we remove list account for this notif
				jedis.del("accounts:" + uuid);
				//we remove data of this notif
				jedis.del("notif:" + uuid);

				//we remove notif from global index (looking from tail)
				jedis.lrem("notifs:all", -1, uuid);
			}
			//we remove list notifId for this type and targetUrl
			jedis.del("type:" + type + ";target:" + targetUrl + ";uuid");
		}
	}

	/**
	 * @author npiedeloup
	 */
	public static final class RemoveTooOldElementsDaemon implements Daemon {
		private final RedisNotificationPlugin redisNotificationPlugin;

		/**
		 * @param redisNotificationPlugin This plugin
		 */
		public RemoveTooOldElementsDaemon(final RedisNotificationPlugin redisNotificationPlugin) {
			Assertion.checkNotNull(redisNotificationPlugin);
			//------
			this.redisNotificationPlugin = redisNotificationPlugin;
		}

		/** {@inheritDoc} */
		@Override
		public void run() {
			redisNotificationPlugin.cleanTooOldElements();
		}
	}

	void cleanTooOldElements() {

		boolean foundOneTooYoung = false;
		do {
			try (final Jedis jedis = redisConnector.getResource()) {
				final List<String> uuids = jedis.lrange("notifs:all", -1, 10); //return last (older) 10 uuid (but not sorted)
				for (final String uuid : uuids) {
					final Notification notification = fromMap(jedis.hgetAll("notif:" + uuid));
					if (isTooOld(notification)) {
						//we search accounts for this notif
						final List<String> notifiedAccounts = jedis.lrange("accounts:" + uuid, 0, -1);
						for (final String notifiedAccount : notifiedAccounts) {
							//we remove this notifs from accounts queue (looking from tail)
							jedis.lrem(notifiedAccount, -1, uuid);
						}
						//we remove list account for this notif
						jedis.del("accounts:" + uuid);
						//we remove data of this notif
						jedis.del("notif:" + uuid);
						//we remove notif from global index (looking from tail)
						jedis.lrem("notifs:all", -1, uuid);
						//we remove uuid from queue by type and targetUrl (looking from tail)
						jedis.lrem("type:" + notification.getType() + ";target:" + notification.getTargetUrl() + ";uuid", -1, uuid);
					} else {
						foundOneTooYoung = true; //we found one too recent, we stop after this loop
					}
				}
			}
		} while (!foundOneTooYoung);
	}

	private static void cleanTooOldNotifications(final List<Notification> notifications) {
		notifications.removeIf(RedisNotificationPlugin::isTooOld);
	}

	private static boolean isTooOld(final Notification notification) {
		return notification.getTTLInSeconds() >= 0 && notification.getCreationDate().getTime() + notification.getTTLInSeconds() * 1000 < System.currentTimeMillis();
	}
}
