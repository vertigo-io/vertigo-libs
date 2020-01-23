package io.vertigo.vega.webservice.data;

import java.time.Instant;
import java.time.LocalDate;

import io.vertigo.dynamo.ngdomain.annotations.Constraint;
import io.vertigo.dynamo.ngdomain.annotations.FormatterDefault;
import io.vertigo.dynamo.ngdomain.annotations.SmartTypeDefinition;
import io.vertigo.dynamox.domain.constraint.ConstraintRegex;
import io.vertigo.dynamox.domain.constraint.ConstraintStringLength;

public enum VegaTestSmartTypes {

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "50", msg = "")
	Texte50,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintRegex.class, arg = "^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*(\\.[a-zA-Z0-9-]{2,3})+$", msg = "Le courriel n'est pas valide")
	Email,

	@SmartTypeDefinition(Instant.class)
	@FormatterDefault
	Instant,

	@SmartTypeDefinition(LocalDate.class)
	@FormatterDefault
	LocalDate,

	@SmartTypeDefinition(Boolean.class)
	@FormatterDefault
	Boolean,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	Id,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	Code;

}
