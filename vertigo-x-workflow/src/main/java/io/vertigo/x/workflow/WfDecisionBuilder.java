package io.vertigo.x.workflow;

import java.util.Date;

import io.vertigo.lang.Builder;

/**
 * Builder for a decision
 * @author xdurand
 *
 */
public class WfDecisionBuilder implements Builder<WfDecision> {

	private final String choice;
	private final String user;
	private Date businessDate;
	private String comment;

	/**
	 * Build a new builder for WfDecision.
	 * "choice" and "user" are mandatory
	 * @param choice
	 * @param user
	 */
	public WfDecisionBuilder(final String choice, final String user) {
		super();
		this.choice = choice;
		this.user = user;
	}

	/**
	 * Optionnal value BusinessDate
	 * @param businessDate
	 * @return the curernt builder
	 */
	public WfDecisionBuilder withBusinessDate(final Date businessDate) {
		this.businessDate = businessDate;
		return this;
	}

	/**
	 * Optionnal value comment
	 * @param comment
	 * @return the curernt builder
	 */
	public WfDecisionBuilder withComment(final String comment) {
		this.comment = comment;
		return this;
	}

	@Override
	public WfDecision build() {
		return new WfDecision(choice, user, businessDate, comment);
	}


}