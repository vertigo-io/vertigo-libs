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
package io.vertigo.x.audit;

import io.vertigo.app.config.AppConfig;
import io.vertigo.x.impl.audit.AuditFeatures;
import io.vertigo.x.plugins.audit.memory.MemoryAuditTraceStorePlugin;

/**
 * Config for test
 * @author xdurand
 *
 */
public class MyAppConfig {

	/**
	 * Configure the app for testing
	 * @return the application config for testing
	 */
	public static AppConfig config() {
		return AppConfig.builder()
				.addModule(new AuditFeatures()
						.withAuditStorePlugin(MemoryAuditTraceStorePlugin.class)
						.build())
				.build();
	}

}
