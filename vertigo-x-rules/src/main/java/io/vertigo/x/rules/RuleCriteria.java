package io.vertigo.x.rules;

/**
 * 
 * @author xdurand
 *
 */
public class RuleCriteria {

	private long wfwdId;

	private RuleConditionCriteria conditionCriteria1;

	private RuleConditionCriteria conditionCriteria2;

	/**
	 * @param wfwdId
	 * @param conditionCriteria1
	 * @param conditionCriteria2
	 */
	public RuleCriteria(int wfwdId, RuleConditionCriteria conditionCriteria1,
			RuleConditionCriteria conditionCriteria2) {
		super();
		this.wfwdId = wfwdId;
		this.conditionCriteria1 = conditionCriteria1;
		this.conditionCriteria2 = conditionCriteria2;
	}

	/**
	 * @return the wfwdId
	 */
	public long getWfwdId() {
		return wfwdId;
	}

	/**
	 * @param wfwdId the wfwdId to set
	 */
	public void setWfwdId(long wfwdId) {
		this.wfwdId = wfwdId;
	}

	/**
	 * @return the conditionCriteria1
	 */
	public RuleConditionCriteria getConditionCriteria1() {
		return conditionCriteria1;
	}

	/**
	 * @param conditionCriteria1 the conditionCriteria1 to set
	 */
	public void setConditionCriteria1(RuleConditionCriteria conditionCriteria1) {
		this.conditionCriteria1 = conditionCriteria1;
	}

	/**
	 * @return the conditionCriteria2
	 */
	public RuleConditionCriteria getConditionCriteria2() {
		return conditionCriteria2;
	}

	/**
	 * @param conditionCriteria2 the conditionCriteria2 to set
	 */
	public void setConditionCriteria2(RuleConditionCriteria conditionCriteria2) {
		this.conditionCriteria2 = conditionCriteria2;
	}

}
