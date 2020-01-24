package io.vertigo.datafactory.collections.data;

import io.vertigo.dynamo.ngdomain.annotations.FormatterDefault;
import io.vertigo.dynamo.ngdomain.annotations.SmartTypeDefinition;

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
