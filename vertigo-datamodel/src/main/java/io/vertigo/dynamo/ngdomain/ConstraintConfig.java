package io.vertigo.dynamo.ngdomain;

import io.vertigo.dynamo.domain.metamodel.Constraint;

public class ConstraintConfig {

	private final Class<? extends Constraint> clazz;
	private final String arg;
	private final String msg;

	public ConstraintConfig(final Class<? extends Constraint> clazz, final String arg, final String msg) {
		this.clazz = clazz;
		this.arg = arg;
		this.msg = msg;
	}

	public Class<? extends Constraint> getConstraintClass() {
		return clazz;
	}

	public String getArg() {
		return arg;
	}

	public String getMsg() {
		return msg;
	}

}
