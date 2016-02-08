package io.vertigo.x.notification;

import io.vertigo.app.config.Features;
import io.vertigo.x.impl.notification.NotificationManagerImpl;
import io.vertigo.x.plugins.notification.redis.RedisNotificationPlugin;

/**
 * Defines extension notification.
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
	 * @return Active redis plugin
	 */
	public NotificationFeatures withRedis() {
		getModuleConfigBuilder()
				.addPlugin(RedisNotificationPlugin.class);
		return this;
	}
}
