package io.vertigo.dashboard.services.data;

import java.io.Serializable;
import java.util.List;

public class DataFilter implements Serializable {

	private static final long serialVersionUID = 8368099477041555767L;

	private String measurement;
	private String location;
	private String name;
	private String topic;
	private List<String> measures;

	public String getMeasurement() {
		return measurement;
	}

	public void setMeasurement(final String measurement) {
		this.measurement = measurement;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(final String location) {
		this.location = location;
	}

	public String getName() {
		return name;
	}

	public void setName(final String name) {
		this.name = name;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public List<String> getMeasures() {
		return measures;
	}

	public void setMeasures(final List<String> measures) {
		this.measures = measures;
	}

}
