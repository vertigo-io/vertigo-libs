package io.vertigo.x.impl.notification;

import io.vertigo.app.config.Features;
import io.vertigo.x.notification.NotificationManager;
import io.vertigo.x.plugins.notification.redis.RedisNotificationPlugin;

/**
 * Defines the 'notification' extension
 * @author pchretien
 */
public final class NotificationFeatures extends Features {

	/**
	 * Constructor.
	 */
	public NotificationFeatures() {
		super("x-notification");
	}

	/** {@inheritDoc} */
	@Override
	protected void setUp() {
		getModuleConfigBuilder()
				.addComponent(NotificationManager.class, NotificationManagerImpl.class);
	}

	/**
	 * Defines REDIS as the database to store the notifications
	 * @return the features
	 */
	public NotificationFeatures withRedis() {
		getModuleConfigBuilder()
				.addPlugin(RedisNotificationPlugin.class);
		return this;
	}
}
