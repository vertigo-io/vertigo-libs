package io.vertigo.datastore.entitystore.data;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.DataStream;
import io.vertigo.datamodel.impl.smarttype.constraint.ConstraintStringLength;
import io.vertigo.datamodel.smarttype.annotations.Adapter;
import io.vertigo.datamodel.smarttype.annotations.Constraint;
import io.vertigo.datamodel.smarttype.annotations.FormatterDefault;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeProperty;
import io.vertigo.datastore.entitystore.data.domain.GeoPoint;
import io.vertigo.datastore.entitystore.data.domain.GeoPointAdapter;

public enum TestSmartTypes {

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	String,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	Long,

	@SmartTypeDefinition(Double.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	Double,

	@SmartTypeDefinition(Integer.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	Integer,

	@SmartTypeDefinition(LocalDate.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "DATE")
	Date,

	@SmartTypeDefinition(Instant.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "TIMESTAMP")
	Instant,

	@SmartTypeDefinition(Boolean.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	Boolean,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	Id,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "250", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(250)")
	LibelleLong,

	@SmartTypeDefinition(DataStream.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "BLOB")
	Stream,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(2000)")
	FullText,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(150)")
	@SmartTypeProperty(property = "indexType", value = "code")
	Keyword,

	@SmartTypeDefinition(BigDecimal.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC(8,2)")
	Conso,

	@SmartTypeDefinition(GeoPoint.class)
	@FormatterDefault
	@Adapter(clazz = GeoPointAdapter.class, targetBasicType = BasicType.String)
	@SmartTypeProperty(property = "storeType", value = "TEXT")
	GeoPoint;

}
