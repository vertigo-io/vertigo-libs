package io.vertigo.x.workflow;

import java.util.List;

import io.vertigo.x.rules.RuleConditionCriteria;

/**
 * 
 * @author xdurand
 *
 */
public class WfActivityCriteria {

	private List<RuleConditionCriteria> conditionCriteria;

	/**
	 * @return the conditionCriteria
	 */
	public List<RuleConditionCriteria> getConditionCriteria() {
		return conditionCriteria;
	}

	/**
	 * @param conditionCriteria the conditionCriteria to set
	 */
	public void setConditionCriteria(List<RuleConditionCriteria> conditionCriteria) {
		this.conditionCriteria = conditionCriteria;
	}
	
}