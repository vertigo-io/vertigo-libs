package io.vertigo.dashboard.services.data;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;

public final class TimeFilterBuilder implements Builder<TimeFilter> {

	private final String myFrom;
	private final String myTo;
	private String myDim;

	TimeFilterBuilder(
			final String from, final String to) {
		Assertion.checkArgNotEmpty(from);
		Assertion.checkArgNotEmpty(to);
		//---
		myFrom = from;
		myTo = to;
	}

	public TimeFilterBuilder withTimeDim(final String dim) {
		Assertion.checkArgNotEmpty(dim);
		//---
		myDim = dim;
		return this;
	}

	@Override
	public TimeFilter build() {
		return new TimeFilter(
				myFrom,
				myTo,
				myDim);
	}

}
