package io.vertigo.quarto.publisher.data;

import java.time.LocalDate;

import io.vertigo.core.lang.DataStream;
import io.vertigo.datamodel.impl.smarttype.constraint.ConstraintStringLength;
import io.vertigo.datamodel.smarttype.annotations.Constraint;
import io.vertigo.datamodel.smarttype.annotations.FormatterDefault;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeProperty;

public enum TestPublisherSmartTypes {

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "indexType", value = "text.fr")
	String,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	Long,

	@SmartTypeDefinition(Double.class)
	@FormatterDefault
	Double,

	@SmartTypeDefinition(Integer.class)
	@FormatterDefault
	Integer,

	@SmartTypeDefinition(LocalDate.class)
	@FormatterDefault
	Date,

	@SmartTypeDefinition(Boolean.class)
	@FormatterDefault
	Boolean,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	Identifiant,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "250", msg = "")
	LibelleLong,

	@SmartTypeDefinition(DataStream.class)
	@FormatterDefault
	Stream;

}
