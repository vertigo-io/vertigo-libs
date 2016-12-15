/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2016, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

package io.vertigo.x.impl.rules;

import io.vertigo.app.config.Features;
import io.vertigo.commons.impl.script.ScriptManagerImpl;
import io.vertigo.commons.plugins.script.janino.JaninoExpressionEvaluatorPlugin;
import io.vertigo.commons.script.ScriptManager;
import io.vertigo.x.rules.RuleManager;

/**
 * Defines the 'workflow' extension
 * @author xdurand
 */
public final class RuleFeatures extends Features {

	/**
	 * Constructor.
	 */
	public RuleFeatures() {
		super("x-rules");
	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addDefinitionProvider(RuleProvider.class)
				.addComponent(RuleManager.class, RuleManagerImpl.class)
				.addComponent(ScriptManager.class, ScriptManagerImpl.class)
				/*.addComponent(AccountManager.class, AccountManagerImpl.class)
				.addComponent(FileManager.class, FileManagerImpl.class)
				.beginComponent(VSecurityManager.class, VSecurityManagerImpl.class)
				.addParam("userSessionClassName", "account")
				.endComponent()
				/*.addComponent(DaemonManager.class, DaemonManagerImpl.class)
				.beginComponent(LocaleManager.class, LocaleManagerImpl.class)
				.addParam("locales", "fr")
				.endComponent()*/
				.addPlugin(JaninoExpressionEvaluatorPlugin.class);
	}

}
