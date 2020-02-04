package io.vertigo.datafactory.search.data;

import java.math.BigDecimal;
import java.time.Instant;

import io.vertigo.core.lang.BasicType;
import io.vertigo.datafactory.search.data.domain.GeoPoint;
import io.vertigo.datafactory.search.data.domain.GeoPointAdapter;
import io.vertigo.datamodel.smarttype.annotations.Adapter;
import io.vertigo.datamodel.smarttype.annotations.FormatterDefault;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeProperty;

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
	Conso,

	@SmartTypeDefinition(GeoPoint.class)
	@Adapter(targetBasicType = BasicType.String, clazz = GeoPointAdapter.class)
	@FormatterDefault
	@SmartTypeProperty(property = "indexType", value = ":geo_point")
	GeoPoint;

}
