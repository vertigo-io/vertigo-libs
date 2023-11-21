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
package io.vertigo.planning.agenda;

import io.vertigo.core.node.config.Feature;
import io.vertigo.core.node.config.discovery.ModuleDiscoveryFeatures;
import io.vertigo.core.param.Param;
import io.vertigo.planning.agenda.services.fo.plugin.DbFoConsultationPlanningPlugin;
import io.vertigo.planning.agenda.services.fo.plugin.Redis2FoConsultationPlanningPlugin;
import io.vertigo.planning.agenda.services.fo.plugin.RedisFoConsultationPlanningPlugin;
import io.vertigo.planning.agenda.services.fo.plugin.RedisUnifiedFoConsultationPlanningPlugin;

public class AgendaFeatures extends ModuleDiscoveryFeatures<AgendaFeatures> {

	public AgendaFeatures() {
		super("vertigo-planning-agenda");
	}

	@Feature("foConsultation.db")
	public AgendaFeatures withDbFoConsultationPlanningPlugin(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(DbFoConsultationPlanningPlugin.class, params);
		return this;
	}

	@Feature("foConsultation.redis")
	public AgendaFeatures withRedisFoConsultationPlanningPlugin(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(RedisFoConsultationPlanningPlugin.class, params);
		return this;
	}

	@Feature("foConsultation.redis2")
	public AgendaFeatures withRedis2FoConsultationPlanningPlugin(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(Redis2FoConsultationPlanningPlugin.class, params);
		return this;
	}

	@Feature("foConsultation.redis2Unified")
	public AgendaFeatures withRedis2UnifiedFoConsultationPlanningPlugin(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(RedisUnifiedFoConsultationPlanningPlugin.class, params);
		return this;
	}

	@Override
	protected String getPackageRoot() {
		return this.getClass().getPackage().getName();
	}

}
