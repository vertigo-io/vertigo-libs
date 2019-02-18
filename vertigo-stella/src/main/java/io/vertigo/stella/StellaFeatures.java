package io.vertigo.stella;

import io.vertigo.app.config.Feature;
import io.vertigo.app.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.stella.impl.master.MasterManagerImpl;
import io.vertigo.stella.impl.workers.WorkersManagerImpl;
import io.vertigo.stella.master.MasterManager;
import io.vertigo.stella.plugins.work.redis.master.RedisMasterPlugin;
import io.vertigo.stella.plugins.work.redis.workers.RedisWorkersPlugin;
import io.vertigo.stella.plugins.work.rest.master.RestMasterPlugin;
import io.vertigo.stella.plugins.work.rest.workers.RestWorkersPlugin;
import io.vertigo.stella.workers.WorkersManager;

/**
 * Defines the 'stella' extension
 *
 * @author mlaroche
 */
public final class StellaFeatures extends Features<StellaFeatures> {

	/**
	 * Constructor.
	 */
	public StellaFeatures() {
		super("vertigo-stella");
	}

	@Feature("master")
	public StellaFeatures withMaster() {
		getModuleConfigBuilder().addComponent(MasterManager.class, MasterManagerImpl.class);
		return this;
	}

	@Feature("master.redis")
	public StellaFeatures withRedisMasterPlugin() {
		getModuleConfigBuilder().addPlugin(RedisMasterPlugin.class);
		return this;
	}

	@Feature("master.rest")
	public StellaFeatures withRestMasterPlugin(final Param... params) {
		getModuleConfigBuilder().addPlugin(RestMasterPlugin.class, params);
		return this;
	}

	@Feature("worker")
	public StellaFeatures withWorker() {
		getModuleConfigBuilder().addComponent(WorkersManager.class, WorkersManagerImpl.class);
		return this;
	}

	@Feature("worker.redis")
	public StellaFeatures withRedisWorkerPlugin() {
		getModuleConfigBuilder().addPlugin(RedisWorkersPlugin.class);
		return this;
	}

	@Feature("worker.rest")
	public StellaFeatures withRestWorkerPlugin(final Param... params) {
		getModuleConfigBuilder().addPlugin(RestWorkersPlugin.class, params);
		return this;
	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		// nothing by default (either master or worker or both)
	}

}
