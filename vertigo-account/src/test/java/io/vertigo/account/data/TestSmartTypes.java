package io.vertigo.account.data;

import io.vertigo.dynamo.ngdomain.annotations.Constraint;
import io.vertigo.dynamo.ngdomain.annotations.FormatterDefault;
import io.vertigo.dynamo.ngdomain.annotations.SmartTypeDefinition;
import io.vertigo.dynamo.ngdomain.annotations.SmartTypeProperty;
import io.vertigo.dynamox.domain.constraint.ConstraintStringLength;

public enum TestSmartTypes {

	@SmartTypeDefinition(Double.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	Montant,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	Id,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "10", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(10)")
	Code,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "100", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(100)")
	Label,

}
