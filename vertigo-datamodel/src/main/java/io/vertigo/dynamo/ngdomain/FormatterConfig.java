package io.vertigo.dynamo.ngdomain;

import io.vertigo.dynamo.domain.metamodel.Formatter;

public class FormatterConfig {

	private final Class<? extends Formatter> clazz;
	private final String arg;

	public FormatterConfig(final Class<? extends Formatter> clazz, final String arg) {
		this.clazz = clazz;
		this.arg = arg;
	}

	public Class<? extends Formatter> getFormatterClass() {
		return clazz;
	}

	public String getArg() {
		return arg;
	}

}
