package io.vertigo.x.plugins.rules.sql;

import java.util.List;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.util.VCollectors;
import io.vertigo.x.impl.rules.RuleStorePlugin;
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
	public void addRule(RuleDefinition ruleDefinition) {
		ruleDefinitionDAO.save(ruleDefinition);

	}

	@Override
	public List<RuleDefinition> findRulesByItemId(Long itemId) {
		final DtList<RuleDefinition> ruleDefinitionList = ruleDefinitionDAO
				.getListByDtFieldName(RuleDefinitionFields.ITEM_ID, itemId, Integer.MAX_VALUE);
		return ruleDefinitionList;
	}

	@Override
	public void addCondition(RuleConditionDefinition ruleConditionDefinition) {
		ruleConditionDefinitionDAO.save(ruleConditionDefinition);
	}

	@Override
	public List<RuleConditionDefinition> findConditionByRuleId(Long ruleId) {
		final DtList<RuleConditionDefinition> ruleConditionDefinitionList = ruleConditionDefinitionDAO
				.getListByDtFieldName(RuleConditionDefinitionFields.RUD_ID, ruleId, Integer.MAX_VALUE);
		return ruleConditionDefinitionList;
	}

	@Override
	public void addSelector(SelectorDefinition selectorDefinition) {
		selectorDefinitionDAO.save(selectorDefinition);
	}

	@Override
	public List<SelectorDefinition> findSelectorsByItemId(Long itemId) {
		final DtList<SelectorDefinition> selectorDefinitionList = selectorDefinitionDAO
				.getListByDtFieldName(SelectorDefinitionFields.ITEM_ID, itemId, Integer.MAX_VALUE);
		return selectorDefinitionList;
	}

	@Override
	public void addFilter(RuleFilterDefinition ruleFilterDefinition) {
		ruleFilterDefinitionDAO.save(ruleFilterDefinition);
	}

	@Override
	public List<RuleFilterDefinition> findFiltersBySelectorId(Long selectorId) {
		return ruleFilterDefinitionDAO.getListByDtFieldName(RuleFilterDefinitionFields.SEL_ID, selectorId, Integer.MAX_VALUE);
	}
	
	private static ItemId getItemId(long i) {
		ItemId itemId = new ItemId();
		itemId.setItemId(i);
		return itemId;
	}

	@Override
	public List<RuleDefinition> findRulesByCriteria(RuleCriteria criteria, List<Long> items) {
		DtList<ItemId> itemsIds = items.stream().map(SQLRuleStorePlugin::getItemId).collect(VCollectors.toDtList(ItemId.class));
		return ruleDefinitionDAO.findItemsByCriteria(criteria.getConditionCriteria1(), criteria.getConditionCriteria1(), itemsIds);
	}

}
