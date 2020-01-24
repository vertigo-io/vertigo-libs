package io.vertigo.quarto.services.publisher.data;

import java.time.LocalDate;

import io.vertigo.core.lang.DataStream;
import io.vertigo.dynamo.ngdomain.annotations.Constraint;
import io.vertigo.dynamo.ngdomain.annotations.FormatterDefault;
import io.vertigo.dynamo.ngdomain.annotations.SmartTypeDefinition;
import io.vertigo.dynamo.ngdomain.annotations.SmartTypeProperty;
import io.vertigo.dynamox.domain.constraint.ConstraintStringLength;

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
