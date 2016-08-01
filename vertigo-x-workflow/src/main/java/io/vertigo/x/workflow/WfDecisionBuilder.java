package io.vertigo.x.workflow;

import java.util.Date;

import io.vertigo.lang.Builder;

/**
 * Builder for a decision
 * @author xdurand
 *
 */
public class WfDecisionBuilder implements Builder<WfDecision> {

	private final Integer myChoice;
	private final String myUser;
	private Date myBusinessDate;
	private String myComment;

	/**
	 * Build a new builder for WfDecision.
	 * "choice" and "user" are mandatory
	 * @param choice
	 * @param user
	 */
	public WfDecisionBuilder(final Integer choice, final String user) {
		super();
		this.myChoice = choice;
		this.myUser = user;
	}

	/**
	 * Optionnal value BusinessDate
	 * @param businessDate
	 * @return the curernt builder
	 */
	public WfDecisionBuilder withBusinessDate(final Date businessDate) {
		this.myBusinessDate = businessDate;
		return this;
	}

	/**
	 * Optionnal value comment
	 * @param comment
	 * @return the curernt builder
	 */
	public WfDecisionBuilder withComment(final String comment) {
		this.myComment = comment;
		return this;
	}

	@Override
	public WfDecision build() {
		return new WfDecision(myChoice, myUser, myBusinessDate, myComment);
	}


}