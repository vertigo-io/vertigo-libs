package io.vertigo.dashboard.services.data;

import java.io.Serializable;

import io.vertigo.lang.Assertion;

public final class TimeFilter implements Serializable {

	private static final long serialVersionUID = -5930123598073570659L;

	private String from;
	private String to;
	private String dim;

	public TimeFilter(
			final String from,
			final String to,
			final String dim) {
		Assertion.checkNotNull(from);
		Assertion.checkNotNull(to);
		Assertion.checkNotNull(dim);
		//---
		this.from = from;
		this.to = to;
		this.dim = dim;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(final String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(final String to) {
		this.to = to;
	}

	public String getDim() {
		return dim;
	}

	public void setDim(final String dim) {
		this.dim = dim;
	}
}
