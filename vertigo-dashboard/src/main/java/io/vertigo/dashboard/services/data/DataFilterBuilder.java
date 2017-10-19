package io.vertigo.dashboard.services.data;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;

public final class DataFilterBuilder implements Builder<DataFilter> {

	private final String myMeasurement;
	private String myLocation;
	private String myName;
	private String myModule;
	private String myFeature;
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

	public DataFilterBuilder withModule(final String module) {
		Assertion.checkArgNotEmpty(module);
		//---
		myModule = module;
		return this;
	}

	public DataFilterBuilder withFeature(final String feature) {
		Assertion.checkArgNotEmpty(feature);
		//---
		myFeature = feature;
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
		if (myModule == null) {
			myModule = "*";
		}
		if (myFeature == null) {
			myFeature = "*";
		}
		return new DataFilter(
				myMeasurement,
				myLocation,
				myName,
				myModule,
				myFeature,
				myAdditionalWhereClause);
	}

}
