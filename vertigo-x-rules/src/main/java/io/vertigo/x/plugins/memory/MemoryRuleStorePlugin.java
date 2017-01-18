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

package io.vertigo.x.plugins.memory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Function;
import java.util.stream.Collectors;

import io.vertigo.lang.Assertion;
import io.vertigo.x.impl.rules.RuleStorePlugin;
import io.vertigo.x.rules.RuleCriteria;
import io.vertigo.x.rules.domain.RuleConditionDefinition;
import io.vertigo.x.rules.domain.RuleDefinition;
import io.vertigo.x.rules.domain.RuleFilterDefinition;
import io.vertigo.x.rules.domain.SelectorDefinition;

/**
 *
 * @author xdurand
 *
 */
public final class MemoryRuleStorePlugin implements RuleStorePlugin {

	private final Map<Long, RuleDefinition> inMemoryRuleStore = new ConcurrentHashMap<>();
	private final AtomicLong memoryRuleSequenceGenerator = new AtomicLong(0);

	private final Map<Long, RuleConditionDefinition> inMemoryConditionStore = new ConcurrentHashMap<>();
	private final AtomicLong memoryConditionSequenceGenerator = new AtomicLong(0);

	private final Map<Long, SelectorDefinition> inMemorySelectorStore = new ConcurrentHashMap<>();
	private final AtomicLong memorySelectorSequenceGenerator = new AtomicLong(0);

	private final Map<Long, RuleFilterDefinition> inMemoryFilterStore = new ConcurrentHashMap<>();
	private final AtomicLong memoryFilterSequenceGenerator = new AtomicLong(0);

	/**
	 *
	 * @param ruleDefinition
	 */
	@Override
	public void addRule(final RuleDefinition ruleDefinition) {
		Assertion.checkNotNull(ruleDefinition);
		Assertion.checkNotNull(ruleDefinition.getItemId());
		Assertion.checkState(ruleDefinition.getId() == null, "A new rule must not have an id");
		// ---
		final Long generatedId = memoryRuleSequenceGenerator.addAndGet(1);
		ruleDefinition.setId(generatedId);
		inMemoryRuleStore.put(generatedId, ruleDefinition);
	}

	@Override
	public void addCondition(final RuleConditionDefinition ruleConditionDefinition) {
		Assertion.checkNotNull(ruleConditionDefinition);
		Assertion.checkState(ruleConditionDefinition.getId() == null, "A new condition must not have an id");
		// ---
		final Long generatedId = memoryConditionSequenceGenerator.addAndGet(1);
		ruleConditionDefinition.setId(generatedId);
		inMemoryConditionStore.put(generatedId, ruleConditionDefinition);
	}

	@Override
	public List<RuleConditionDefinition> findConditionByRuleId(final Long ruleId) {
		Assertion.checkNotNull(ruleId);
		// ---
		final List<RuleConditionDefinition> ret = new ArrayList<>();

		for (final RuleConditionDefinition ruleDefinition : inMemoryConditionStore.values()) {
			if (ruleId.equals(ruleDefinition.getRudId())) {
				// Collect
				ret.add(ruleDefinition);
			}
		}

		return ret;
	}

	/**
	 *
	 * @param selectorDefinition
	 */
	@Override
	public void addSelector(final SelectorDefinition selectorDefinition) {
		Assertion.checkNotNull(selectorDefinition);
		Assertion.checkNotNull(selectorDefinition.getItemId());
		Assertion.checkState(selectorDefinition.getId() == null, "A new rule must not have an id");
		// ---
		final Long generatedId = memorySelectorSequenceGenerator.addAndGet(1);
		selectorDefinition.setId(generatedId);
		inMemorySelectorStore.put(generatedId, selectorDefinition);
	}

	@Override
	public List<SelectorDefinition> findSelectorsByItemId(final Long itemId) {
		Assertion.checkNotNull(itemId);
		// ---
		final List<SelectorDefinition> ret = new ArrayList<>();

		for (final SelectorDefinition selectorDefinition : inMemorySelectorStore.values()) {
			if (itemId.equals(selectorDefinition.getItemId())) {
				// Collect
				ret.add(selectorDefinition);
			}
		}

		return ret;
	}

	@Override
	public void addFilter(final RuleFilterDefinition ruleFilterDefinition) {
		Assertion.checkNotNull(ruleFilterDefinition);
		Assertion.checkNotNull(ruleFilterDefinition.getSelId());
		Assertion.checkState(ruleFilterDefinition.getId() == null, "A new filter must not have an id");
		// ---
		final Long generatedId = memoryFilterSequenceGenerator.addAndGet(1);
		ruleFilterDefinition.setId(generatedId);
		inMemoryFilterStore.put(generatedId, ruleFilterDefinition);

	}

	@Override
	public void removeFilter(final RuleFilterDefinition ruleFilterDefinition) {
		Assertion.checkNotNull(ruleFilterDefinition);
		Assertion.checkNotNull(ruleFilterDefinition.getId());
		// ---
		inMemoryFilterStore.remove(ruleFilterDefinition.getId());

	}

	@Override
	public List<RuleFilterDefinition> findFiltersBySelectorId(final Long selectorId) {
		Assertion.checkNotNull(selectorId);
		// ---
		final List<RuleFilterDefinition> ret = new ArrayList<>();

		for (final RuleFilterDefinition ruleFilterDefinition : inMemoryFilterStore.values()) {
			if (selectorId.equals(ruleFilterDefinition.getSelId())) {
				// Collect
				ret.add(ruleFilterDefinition);
			}
		}

		return ret;
	}

	@Override
	public List<RuleDefinition> findRulesByCriteria(RuleCriteria criteria, List<Long> items) {
		Assertion.checkNotNull(criteria);
		// ---
		List<RuleDefinition> ret = new ArrayList<>();
		for (Long itemId : items) {

			List<RuleDefinition> rules = inMemoryRuleStore.entrySet().stream()
					.filter(r -> r.getValue().getItemId().equals(itemId)).map(es -> es.getValue())
					.collect(Collectors.toList());
			for (RuleDefinition rule : rules) {

				Map<String, RuleConditionDefinition> mapConditions = inMemoryConditionStore.entrySet().stream()
						.filter(r -> r.getValue().getRudId().equals(rule.getId())).map(es -> es.getValue())
						.collect(Collectors.toMap(RuleConditionDefinition::getField, Function.identity()));

				int match = 0;
				RuleConditionDefinition currentRule1 = mapConditions.get(criteria.getConditionCriteria1().getField());

				if (currentRule1 != null
						&& currentRule1.getExpression().equals(criteria.getConditionCriteria1().getValue())) {
					match++;
				}

				if (criteria.getConditionCriteria2() != null) {
					RuleConditionDefinition currentRule2 = mapConditions
							.get(criteria.getConditionCriteria2().getField());
					if (currentRule2 != null
							&& currentRule2.getExpression().equals(criteria.getConditionCriteria2().getValue())) {
						match++;
					}
				}

				int expectedMatch = criteria.getConditionCriteria2() != null ? 2 : 1;

				if (match == expectedMatch) {
					ret.add(rule);
					break;
				}
			}
		}

		return ret;
	}

	@Override
	public List<RuleDefinition> findRulesByItemId(final Long itemId) {
		Assertion.checkNotNull(itemId);
		// ---
		final List<RuleDefinition> ret = new ArrayList<>();

		for (final RuleDefinition ruleDefinition : inMemoryRuleStore.values()) {
			if (itemId.equals(ruleDefinition.getItemId())) {
				// Collect
				ret.add(ruleDefinition);
			}
		}

		return ret;
	}
}
