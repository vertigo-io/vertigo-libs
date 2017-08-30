package io.vertigo.dashboard.services;

import java.io.Serializable;

public class TimeFilter implements Serializable {

	private static final long serialVersionUID = -5930123598073570659L;

	private String from;
	private String to;
	private String dim;

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
