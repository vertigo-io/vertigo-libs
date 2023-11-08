/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.vortex;

import io.vertigo.core.node.config.Feature;
import io.vertigo.core.node.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.vortex.bb.BlackBoardManager;
import io.vertigo.vortex.impl.bb.BlackBoardManagerImpl;
import io.vertigo.vortex.plugins.bb.memory.MemoryBlackBoardStorePlugin;
import io.vertigo.vortex.plugins.bb.redis.RedisBlackBoardStorePlugin;

public class VortexFeatures extends Features<VortexFeatures> {

	/**
	 * Constructor.
	 */
	public VortexFeatures() {
		super("vertigo-vortex");
	}

	//	/**
	//	 * Activates Behavior Tree.
	//	 *
	//	 * @return these features
	//	 */
	//	@Feature("parser")
	//	public AiFeatures withParser() {
	//		getModuleConfigBuilder()
	//				.addComponent(BtCommandManager.class, BtCommandManagerImpl.class);
	//		return this;
	//	}
	//
	/**
	 * Activates BlackBoard.
	 *
	 * @return these features
	 */
	@Feature("blackboard")
	public VortexFeatures withBlackboard() {
		getModuleConfigBuilder()
				.addComponent(BlackBoardManager.class, BlackBoardManagerImpl.class);
		return this;
	}

	/**
	 * Add ability to use memory plugin to store Blackboards.
	 *
	 * @return these features
	 */
	@Feature("blackboard.memory")
	public VortexFeatures withMemoryBlackboard(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(MemoryBlackBoardStorePlugin.class, params);
		return this;
	}

	/**
	 * Add ability to use redis plugin to store Blackboards.
	 *
	 * @return these features
	 */
	@Feature("blackboard.redis")
	public VortexFeatures withRedisBlackboard(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(RedisBlackBoardStorePlugin.class, params);
		return this;
	}

	//	/**
	//	 * Activates NLU.
	//	 *
	//	 * @return these features
	//	 */
	//	@Feature("nlu")
	//	public AiFeatures withNLU() {
	//		getModuleConfigBuilder()
	//				.addComponent(NluManager.class, NluManagerImpl.class);
	//		return this;
	//	}

	//	/**
	//	 * Activates NLU.
	//	 *
	//	 * @return these features
	//	 */
	//	@Feature("nlu.rasa")
	//	public AiFeatures withRasaNLU(final Param... params) {
	//		getModuleConfigBuilder()
	//				.addPlugin(RasaNluEnginePlugin.class, params);
	//		return this;
	//	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder();
		//				.addComponent(BehaviorTreeManager.class, BehaviorTreeManagerImpl.class); // no params or plugin so always here!
		//
	}
}
