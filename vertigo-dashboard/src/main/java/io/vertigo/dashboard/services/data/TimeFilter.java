package io.vertigo.dashboard.services.data;

import java.io.Serializable;

import io.vertigo.lang.Assertion;

public final class TimeFilter implements Serializable {

	private static final long serialVersionUID = -5930123598073570659L;

	private final String from;
	private final String to;
	private final String dim; // may be null

	TimeFilter(
			final String from,
			final String to,
			final String dim) {
		Assertion.checkNotNull(from);
		Assertion.checkNotNull(to);
		//---
		this.from = from;
		this.to = to;
		this.dim = dim;
	}

	public static TimeFilterBuilder builder(final String from, final String to) {
		return new TimeFilterBuilder(from, to);
	}

	public String getFrom() {
		return from;
	}

	public String getTo() {
		return to;
	}

	public String getDim() {
		return dim;
	}
}
