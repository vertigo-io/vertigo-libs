package io.vertigo.datafactory.search.data;

import java.math.BigDecimal;
import java.time.Instant;

import io.vertigo.dynamo.ngdomain.annotations.FormatterDefault;
import io.vertigo.dynamo.ngdomain.annotations.SmartTypeDefinition;
import io.vertigo.dynamo.ngdomain.annotations.SmartTypeProperty;

public enum TestSearchSmartTypes {

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	Identifiant,

	@SmartTypeDefinition(Integer.class)
	@FormatterDefault
	Integer,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "indexType", value = "text_fr:sortable")
	String,

	@SmartTypeDefinition(Instant.class)
	@FormatterDefault
	DateTime,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "indexType", value = "text_fr:facetable")
	FullText,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "indexType", value = "code:keyword")
	Keyword,

	@SmartTypeDefinition(BigDecimal.class)
	@FormatterDefault
	Conso;

}
