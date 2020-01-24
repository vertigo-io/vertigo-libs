package io.vertigo.datafactory.collections.data;

import io.vertigo.datamodel.smarttype.annotations.FormatterDefault;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;

public enum TestCollectionsSmartTypes {

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	Id,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	Text,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	Keyword,

	@SmartTypeDefinition(Integer.class)
	@FormatterDefault
	Integer;
}
