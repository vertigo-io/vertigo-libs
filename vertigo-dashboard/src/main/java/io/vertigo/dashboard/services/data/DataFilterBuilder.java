package io.vertigo.dashboard.services.data;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;

public final class DataFilterBuilder implements Builder<DataFilter> {

	private final String myMeasurement;
	private String myLocation;
	private String myName;
	private String myTopic;
	private String myAdditionalWhereClause;

	DataFilterBuilder(
			final String measurement) {
		Assertion.checkArgNotEmpty(measurement);
		//---
		myMeasurement = measurement;
	}

	public DataFilterBuilder withLocation(final String location) {
		Assertion.checkArgNotEmpty(location);
		//---
		myLocation = location;
		return this;
	}

	public DataFilterBuilder withName(final String name) {
		Assertion.checkArgNotEmpty(name);
		//---
		myName = name;
		return this;
	}

	public DataFilterBuilder withTopic(final String topic) {
		Assertion.checkArgNotEmpty(topic);
		//---
		myTopic = topic;
		return this;
	}

	public DataFilterBuilder withAdditionalWhereClause(final String additionalWhereClause) {
		Assertion.checkArgNotEmpty(additionalWhereClause);
		//---
		myAdditionalWhereClause = additionalWhereClause;
		return this;
	}

	@Override
	public DataFilter build() {
		if (myLocation == null) {
			myLocation = "*";
		}
		if (myName == null) {
			myName = "*";
		}
		if (myTopic == null) {
			myTopic = "*";
		}
		return new DataFilter(
				myMeasurement,
				myLocation,
				myName,
				myTopic,
				myAdditionalWhereClause);
	}

}
