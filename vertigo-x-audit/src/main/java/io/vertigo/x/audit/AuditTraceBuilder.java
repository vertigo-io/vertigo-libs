package io.vertigo.x.audit;


import java.util.Date;
import java.util.List;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;

/**
 * Builder for an audit trace
 * @author xdurand
 *
 */
public class AuditTraceBuilder implements Builder<AuditTrace> {

	private Long id;
	private final String category;
	private final String user;
	private Date businessDate;
	private final Date executionDate;
	private final Long item;
	private final String message;
	private String context;

	/**
	 * Builder for AuditTrace
	 * @param id
	 * @param category
	 * @param user
	 * @param item
	 */
	AuditTraceBuilder(final String category, final String user, final Long item, final String message) {
		Assertion.checkNotNull(item);
		Assertion.checkArgNotEmpty(category);
		Assertion.checkArgNotEmpty(user);
		//---
		this.category = category;
		this.user = user;
		this.message = message;
		this.item = item;
		this.executionDate = new Date();
	}

	/**
	 * Optionnal business date
	 * @param dateBusiness
	 * @return the builder (for fluent style)
	 */
	public AuditTraceBuilder withDateBusiness(final Date dateBusiness) {
		Assertion.checkNotNull(dateBusiness);
		//---
		this.businessDate = dateBusiness;
		return this;
	}

	/**
	 * Optionnal business date
	 * @param context context for metadata
	 * @param dateBusiness
	 * @return the builder (for fluent style)
	 */
	public AuditTraceBuilder withContext(final List<String> context) {
		Assertion.checkNotNull(context);
		Assertion.checkArgument(context.isEmpty() == false, "The provided context is empty");
		//---
		final StringBuilder sb = new StringBuilder();
		for (final String string : context) {
			sb.append(string).append("|");
		}
		this.context = sb.toString();
		return this;
	}

	@Override
	public AuditTrace build() {
		return new AuditTrace(this.id, this.category, this.user, this.businessDate, this.executionDate, this.item, this.message, this.context);
	}

}