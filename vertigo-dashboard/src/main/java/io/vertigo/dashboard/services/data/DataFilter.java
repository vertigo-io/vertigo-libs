package io.vertigo.dashboard.services.data;

import java.io.Serializable;

import io.vertigo.lang.Assertion;

public final class DataFilter implements Serializable {

	private static final long serialVersionUID = 8368099477041555767L;

	private final String measurement;
	private final String location;
	private final String name;
	private final String module;
	private final String feature;
	private final String additionalWhereClause;// may be null

	DataFilter(
			final String measurement,
			final String location,
			final String name,
			final String module,
			final String feature,
			final String additionalWhereClause) {
		Assertion.checkNotNull(location);
		Assertion.checkNotNull(name);
		Assertion.checkNotNull(module);
		Assertion.checkNotNull(feature);
		//---
		this.measurement = measurement;
		this.location = location;
		this.name = name;
		this.module = module;
		this.feature = feature;
		this.additionalWhereClause = additionalWhereClause;
	}

	public static DataFilterBuilder builder(final String measurement) {
		return new DataFilterBuilder(measurement);
	}

	public String getMeasurement() {
		return measurement;
	}

	public String getLocation() {
		return location;
	}

	public String getName() {
		return name;
	}

	public String getModule() {
		return module;
	}

	public String getFeature() {
		return feature;
	}

	public String getAdditionalWhereClause() {
		return additionalWhereClause;
	}

}
