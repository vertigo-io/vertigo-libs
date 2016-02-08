package io.vertigo.x.impl.comment;

import io.vertigo.app.config.Features;
import io.vertigo.x.comment.CommentManager;
import io.vertigo.x.plugins.comment.redis.RedisCommentPlugin;

/**
 * Defines the 'comment' extension
 * @author pchretien
 */
public final class CommentFeatures extends Features {

	/**
	 * cONSTRUCTOR;
	 */
	public CommentFeatures() {
		super("x-comment");
	}

	@Override
	protected void setUp() {
		getModuleConfigBuilder()
				.addComponent(CommentManager.class, CommentManagerImpl.class);
	}

	/**
	 * Defines REDIS as the database to store the comments
	 * @return the features
	 */
	public CommentFeatures withRedis() {
		getModuleConfigBuilder()
				.addPlugin(RedisCommentPlugin.class);
		return this;
	}
}
