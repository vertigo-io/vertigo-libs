package io.vertigo.x.audit;


import java.util.Date;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;

public final class AuditTrailCriteriaBuilder implements Builder<AuditTrailCriteria> {

	private String myCategory;
	private String myUser;
	private Date myDateBusinessStart;
	private Date myDateBusinessEnd;
	private Date myDateExecutionStart;
	private Date myDateExecutionEnd;
	private Long myItem;
	
	/**
	 * Optionnal category 
	 * @param myItem
	 * @return
	 */
	public AuditTrailCriteriaBuilder withCategory(String category) {
		Assertion.checkNotNull(category);
		this.myCategory = category;
		return this;
	}

	/**
	 * Optionnal user 
	 * @param myItem
	 * @return
	 */
	public AuditTrailCriteriaBuilder withUser(String user) {
		Assertion.checkNotNull(user);
		this.myUser = user;
		return this;
	}
	
	/**
	 * Optionnal starting business date range 
	 * @param dateBusinessStart
	 * @return
	 */
	public AuditTrailCriteriaBuilder withDateBusinessStart(Date dateBusinessStart) {
		Assertion.checkNotNull(dateBusinessStart);
		this.myDateBusinessStart = dateBusinessStart;
		return this;
	}

	/**
	 * Optionnal ending business date range
	 * @param dateBusinessEnd
	 * @return
	 */
	public AuditTrailCriteriaBuilder withDateBusinessEnd(Date dateBusinessEnd) {
		Assertion.checkNotNull(dateBusinessEnd);
		this.myDateBusinessEnd = dateBusinessEnd;
		return this;
	}
	
	/**
	 * Optionnal starting execution date range
	 * @param dateBusiness
	 * @return
	 */
	public AuditTrailCriteriaBuilder withDateExecutionStart(Date dateExecution) {
		Assertion.checkNotNull(dateExecution);
		this.myDateExecutionStart = dateExecution;
		return this;
	}
	
	/**
	 * Optionnal ending business date range
	 * @param dateBusiness
	 * @return
	 */
	public AuditTrailCriteriaBuilder withDateExecutionEnd(Date dateExecution) {
		Assertion.checkNotNull(dateExecution);
		this.myDateExecutionEnd = dateExecution;
		return this;
	}

	/**
	 * Optionnal item id 
	 * @param item
	 * @return
	 */
	public AuditTrailCriteriaBuilder withItem(Long item) {
		Assertion.checkNotNull(item);
		this.myItem = item;
		return this;
	}

	@Override
	public AuditTrailCriteria build() {
		return new AuditTrailCriteria(this.myCategory, this.myUser, this.myDateBusinessStart, 
				this.myDateBusinessEnd, this.myDateExecutionStart, this.myDateExecutionEnd, this.myItem);
	}
	
}