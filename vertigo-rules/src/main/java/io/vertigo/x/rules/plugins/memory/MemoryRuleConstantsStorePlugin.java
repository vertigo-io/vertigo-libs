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
package io.vertigo.x.rules.plugins.memory;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import io.vertigo.lang.Assertion;
import io.vertigo.x.rules.impl.RuleConstantsStorePlugin;
import io.vertigo.x.rules.services.RuleConstants;

/**
 *
 * @author xdurand
 *
 */
public final class MemoryRuleConstantsStorePlugin implements RuleConstantsStorePlugin {

	private final Map<Long, RuleConstants> inMemoryConstantsStore = new ConcurrentHashMap<>();

	@Override
	public void addConstants(final Long key, final RuleConstants ruleConstants) {
		Assertion.checkNotNull(key);
		Assertion.checkNotNull(ruleConstants);
		//---
		inMemoryConstantsStore.put(key, ruleConstants);
	}

	@Override
	public void removeConstants(final Long key) {
		Assertion.checkNotNull(key);
		//---
		inMemoryConstantsStore.remove(key);
	}

	@Override
	public void updateConstants(final Long key, final RuleConstants ruleConstants) {
		Assertion.checkNotNull(key);
		Assertion.checkNotNull(ruleConstants);
		Assertion.checkState(inMemoryConstantsStore.containsKey(key), "Cannot update this RuleConstant : Its id is unknown in the store");
		//---
		inMemoryConstantsStore.put(key, ruleConstants);
	}

	@Override
	public RuleConstants readConstants(final Long key) {
		return inMemoryConstantsStore.get(key);
	}

}
