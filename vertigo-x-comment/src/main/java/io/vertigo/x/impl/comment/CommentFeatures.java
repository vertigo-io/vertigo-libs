package io.vertigo.x.impl.comment;

import io.vertigo.app.config.Features;
import io.vertigo.x.comment.CommentManager;
import io.vertigo.x.plugins.comment.redis.RedisCommentPlugin;

/**
 * Defines extension comment.
 * @author pchretien
 */
public final class CommentFeatures extends Features {

	public CommentFeatures() {
		super("x-comment");
	}

	@Override
	protected void setUp() {
		getModuleConfigBuilder()
				.addComponent(CommentManager.class, CommentManagerImpl.class);
	}

	/**
	 * @return Active redis plugin
	 */
	public CommentFeatures withRedis() {
		getModuleConfigBuilder()
				.addPlugin(RedisCommentPlugin.class);
		return this;
	}
}
