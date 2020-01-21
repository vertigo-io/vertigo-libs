package io.vertigo.dynamo.task.data;

import io.vertigo.dynamo.ngdomain.annotations.FormatterDefault;
import io.vertigo.dynamo.ngdomain.annotations.SmartTypeDefinition;

public enum TestSmartTypes {

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	String,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	Id,

	@SmartTypeDefinition(Integer.class)
	@FormatterDefault
	Integer,

}
