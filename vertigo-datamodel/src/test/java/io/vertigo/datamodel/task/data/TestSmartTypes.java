package io.vertigo.datamodel.task.data;

import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;

public enum TestSmartTypes {

	@SmartTypeDefinition(String.class)
	String,

	@SmartTypeDefinition(Long.class)
	Id,

	@SmartTypeDefinition(Integer.class)
	Integer,

}
