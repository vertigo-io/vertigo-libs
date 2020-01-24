package io.vertigo.quarto.services.export.data;

import java.time.Instant;
import java.time.LocalDate;

import io.vertigo.dynamo.ngdomain.annotations.FormatterDefault;
import io.vertigo.dynamo.ngdomain.annotations.SmartTypeDefinition;

public enum TestExporterSmartTypes {

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	String,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	Id,

	@SmartTypeDefinition(Boolean.class)
	@FormatterDefault
	Boolean,

	@SmartTypeDefinition(LocalDate.class)
	@FormatterDefault
	LocalDate,

	@SmartTypeDefinition(Instant.class)
	@FormatterDefault
	Instant;
}
