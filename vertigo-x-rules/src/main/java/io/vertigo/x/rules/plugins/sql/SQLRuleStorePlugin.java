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
package io.vertigo.x.rules.plugins.sql;

import java.util.List;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.util.VCollectors;
import io.vertigo.x.rules.ItemId;
import io.vertigo.x.rules.RuleCriteria;
import io.vertigo.x.rules.dao.RuleConditionDefinitionDAO;
import io.vertigo.x.rules.dao.RuleDefinitionDAO;
import io.vertigo.x.rules.dao.RuleFilterDefinitionDAO;
import io.vertigo.x.rules.dao.SelectorDefinitionDAO;
import io.vertigo.x.rules.domain.DtDefinitions.RuleConditionDefinitionFields;
import io.vertigo.x.rules.domain.DtDefinitions.RuleDefinitionFields;
import io.vertigo.x.rules.domain.DtDefinitions.RuleFilterDefinitionFields;
import io.vertigo.x.rules.domain.DtDefinitions.SelectorDefinitionFields;
import io.vertigo.x.rules.impl.RuleStorePlugin;
import io.vertigo.x.rules.domain.RuleConditionDefinition;
import io.vertigo.x.rules.domain.RuleDefinition;
import io.vertigo.x.rules.domain.RuleFilterDefinition;
import io.vertigo.x.rules.domain.SelectorDefinition;

/**
 * Plugin SQL pour le store des Rules
 * @author OHJAJI
 * @author xdurand
 *
 */
public class SQLRuleStorePlugin implements RuleStorePlugin {

	@Inject
	private RuleDefinitionDAO ruleDefinitionDAO;

	@Inject
	private RuleConditionDefinitionDAO ruleConditionDefinitionDAO;

	@Inject
	private SelectorDefinitionDAO selectorDefinitionDAO;

	@Inject
	private RuleFilterDefinitionDAO ruleFilterDefinitionDAO;

	@Override
	public void addRule(final RuleDefinition ruleDefinition) {
		ruleDefinitionDAO.save(ruleDefinition);

	}

	@Override
	public List<RuleDefinition> findRulesByItemId(final Long itemId) {
		final DtList<RuleDefinition> ruleDefinitionList = ruleDefinitionDAO
				.getListByDtFieldName(RuleDefinitionFields.ITEM_ID, itemId, Integer.MAX_VALUE);
		return ruleDefinitionList;
	}

	@Override
	public void addCondition(final RuleConditionDefinition ruleConditionDefinition) {
		ruleConditionDefinitionDAO.save(ruleConditionDefinition);
	}

	@Override
	public List<RuleConditionDefinition> findConditionByRuleId(final Long ruleId) {
		final DtList<RuleConditionDefinition> ruleConditionDefinitionList = ruleConditionDefinitionDAO
				.getListByDtFieldName(RuleConditionDefinitionFields.RUD_ID, ruleId, Integer.MAX_VALUE);
		return ruleConditionDefinitionList;
	}

	@Override
	public void addSelector(final SelectorDefinition selectorDefinition) {
		selectorDefinitionDAO.save(selectorDefinition);
	}

	@Override
	public List<SelectorDefinition> findSelectorsByItemId(final Long itemId) {
		final DtList<SelectorDefinition> selectorDefinitionList = selectorDefinitionDAO
				.getListByDtFieldName(SelectorDefinitionFields.ITEM_ID, itemId, Integer.MAX_VALUE);
		return selectorDefinitionList;
	}

	@Override
	public void addFilter(final RuleFilterDefinition ruleFilterDefinition) {
		ruleFilterDefinitionDAO.save(ruleFilterDefinition);
	}

	@Override
	public List<RuleFilterDefinition> findFiltersBySelectorId(final Long selectorId) {
		return ruleFilterDefinitionDAO.getListByDtFieldName(RuleFilterDefinitionFields.SEL_ID, selectorId, Integer.MAX_VALUE);
	}

	private static ItemId getItemId(final long i) {
		final ItemId itemId = new ItemId();
		itemId.setItemId(i);
		return itemId;
	}

	@Override
	public List<RuleDefinition> findRulesByCriteria(final RuleCriteria criteria, final List<Long> items) {
		final DtList<ItemId> itemsIds = items.stream()
				.map(SQLRuleStorePlugin::getItemId)
				.collect(VCollectors.toDtList(ItemId.class));
		return ruleDefinitionDAO.findItemsByCriteria(criteria.getConditionCriteria1(), criteria.getConditionCriteria1(), itemsIds);
	}

}
