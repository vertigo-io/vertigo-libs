package io.vertigo.x.plugins.sql;

import java.util.List;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.x.impl.rules.RuleStorePlugin;
import io.vertigo.x.rules.RuleCriteria;
import io.vertigo.x.rules.dao.RuleConditionDefinitionDAO;
import io.vertigo.x.rules.dao.RuleDefinitionDAO;
import io.vertigo.x.rules.dao.RuleFilterDefinitionDAO;
import io.vertigo.x.rules.dao.SelectorDefinitionDAO;
import io.vertigo.x.rules.domain.DtDefinitions.RuleConditionDefinitionFields;
import io.vertigo.x.rules.domain.DtDefinitions.RuleDefinitionFields;
import io.vertigo.x.rules.domain.DtDefinitions.SelectorDefinitionFields;
import io.vertigo.x.rules.domain.RuleConditionDefinition;
import io.vertigo.x.rules.domain.RuleDefinition;
import io.vertigo.x.rules.domain.RuleFilterDefinition;
import io.vertigo.x.rules.domain.SelectorDefinition;

public class SQLRuleStorePlugin implements RuleStorePlugin {

	@Inject
	RuleDefinitionDAO ruleDefinitionDAO;

	@Inject
	RuleConditionDefinitionDAO ruleConditionDefinitionDAO;

	@Inject
	SelectorDefinitionDAO selectorDefinitionDAO;

	@Inject
	RuleFilterDefinitionDAO ruleFilterDefinitionDAO;

	@Override
	public void addRule(RuleDefinition ruleDefinition) {
		ruleDefinitionDAO.save(ruleDefinition);

	}

	@Override
	public List<RuleDefinition> findRulesByItemId(Long itemId) {
		final DtList<RuleDefinition> ruleDefinitionList = ruleDefinitionDAO
				.getListByDtField(RuleDefinitionFields.ITEM_ID.name(), itemId, Integer.MAX_VALUE);
		return ruleDefinitionList;
	}

	@Override
	public void addCondition(RuleConditionDefinition ruleConditionDefinition) {
		ruleConditionDefinitionDAO.save(ruleConditionDefinition);

	}

	@Override
	public List<RuleConditionDefinition> findConditionByRuleId(Long ruleId) {
		final DtList<RuleConditionDefinition> ruleConditionDefinitionList = ruleConditionDefinitionDAO
				.getListByDtField(RuleConditionDefinitionFields.RUD_ID.name(), ruleId, Integer.MAX_VALUE);
		return ruleConditionDefinitionList;
	}

	@Override
	public void addSelector(SelectorDefinition selectorDefinition) {
		selectorDefinitionDAO.save(selectorDefinition);

	}

	@Override
	public List<SelectorDefinition> findSelectorsByItemId(Long itemId) {
		final DtList<SelectorDefinition> selectorDefinitionList = selectorDefinitionDAO
				.getListByDtField(SelectorDefinitionFields.ITEM_ID.name(), itemId, Integer.MAX_VALUE);
		return selectorDefinitionList;
	}

	@Override
	public void addFilter(RuleFilterDefinition ruleFilterDefinition) {
		ruleFilterDefinitionDAO.save(ruleFilterDefinition);

	}

	@Override
	public void removeFilter(RuleFilterDefinition ruleFilterDefinition) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<RuleFilterDefinition> findFiltersBySelectorId(Long selectorId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RuleDefinition> findRulesByCriteria(RuleCriteria criteria, List<Long> items) {
		// TODO Auto-generated method stub
		return null;
	}

}
