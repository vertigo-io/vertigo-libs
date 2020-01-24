package io.vertigo.datastore.task.data;

import io.vertigo.datamodel.smarttype.annotations.FormatterDefault;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;

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
