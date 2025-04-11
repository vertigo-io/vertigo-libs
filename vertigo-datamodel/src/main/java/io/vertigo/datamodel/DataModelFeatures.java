/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.datamodel;

import io.vertigo.core.node.config.Feature;
import io.vertigo.core.node.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.datamodel.bb.BlackBoardManager;
import io.vertigo.datamodel.impl.bb.BlackBoardManagerImpl;
import io.vertigo.datamodel.impl.data.metrics.DataMetricsProvider;
import io.vertigo.datamodel.impl.smarttype.SmartTypeManagerImpl;
import io.vertigo.datamodel.impl.task.TaskManagerImpl;
import io.vertigo.datamodel.impl.task.metrics.TaskMetricsProvider;
import io.vertigo.datamodel.plugins.bb.memory.MemoryBlackBoardStorePlugin;
import io.vertigo.datamodel.plugins.bb.redis.RedisBlackBoardStorePlugin;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.task.TaskManager;

/**
 * Defines dynamo features.
 *
 * @author pchretien
 */
public final class DataModelFeatures extends Features<DataModelFeatures> {

	/**
	 * Constructor.
	 */
	public DataModelFeatures() {
		super("vertigo-datamodel");
	}

	/**
	 * Activates BlackBoard.
	 *
	 * @return these features
	 */
	@Feature("blackboard")
	public DataModelFeatures withBlackboard() {
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
	public DataModelFeatures withMemoryBlackboard(final Param... params) {
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
	public DataModelFeatures withRedisBlackboard(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(RedisBlackBoardStorePlugin.class, params);
		return this;
	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addComponent(SmartTypeManager.class, SmartTypeManagerImpl.class)
				.addComponent(DataMetricsProvider.class)
				.addComponent(TaskManager.class, TaskManagerImpl.class)
				.addComponent(TaskMetricsProvider.class);

	}
}
