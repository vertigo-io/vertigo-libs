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
package io.vertigo.vortex.impl.bb;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.vortex.bb.BBKey;
import io.vertigo.vortex.bb.BlackBoard;
import io.vertigo.vortex.bb.BlackBoardManager;

public final class BlackBoardManagerImpl implements BlackBoardManager {
	private final Map<String, BlackBoardStorePlugin> blackBoardPluginByStore = new HashMap<>();

	@Inject
	public BlackBoardManagerImpl(final List<BlackBoardStorePlugin> blackBoardStorePlugins) {
		Assertion.check()
				.isNotNull(blackBoardStorePlugins);
		// ---
		blackBoardStorePlugins.forEach(
				plugin -> {
					final var storeName = plugin.getStoreName();
					Assertion.check()
							.isNotBlank(storeName)
							.isFalse(blackBoardPluginByStore.containsKey(storeName), "BlackBoard Store '{0}' already registered ", storeName)
							.isTrue(storeName.matches(STORE_NAME_REGEX), "the storename '{0}' must contain only a-z words", storeName);
					//---
					blackBoardPluginByStore.put(storeName, plugin);
				});
	}

	@Override
	public BlackBoard connect(final String storeName, final BBKey rootKey) {
		Assertion.check()
				.isNotBlank(storeName, "A storeName is mandatory to connect with a blackboard");
		//---
		return new BlackBoardImpl(getPlugin(storeName), rootKey);
	}

	//------------------------------------
	//- Utils                             -
	//------------------------------------

	private BlackBoardStorePlugin getPlugin(final String storeName) {
		Assertion.check()
				.isTrue(blackBoardPluginByStore.containsKey(storeName), " Store with name '{0}' doesn't exist", storeName);
		//---
		return blackBoardPluginByStore.get(storeName);
	}
}
