package io.vertigo.x.rules;




/**
 * 
 * @author xdurand
 *
 */
public class RuleConditionCriteria {

	private String field;
	private String value;

	/**
	 * @param field
	 * @param value
	 */
	public RuleConditionCriteria(String field, String value) {
		super();
		this.field = field;
		this.value = value;
	}
	/**
	 * @return the field
	 */
	public String getField() {
		return field;
	}
	/**
	 * @param field the field to set
	 */
	public void setField(String field) {
		this.field = field;
	}
	/**
	 * @return the value
	 */
	public String getValue() {
		return value;
	}
	/**
	 * @param value the value to set
	 */
	public void setValue(String value) {
		this.value = value;
	}

}
