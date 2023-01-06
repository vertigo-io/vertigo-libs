package io.vertigo.audit.impl.trace;

import java.time.Instant;

import io.vertigo.basics.constraint.ConstraintStringLength;
import io.vertigo.basics.formatter.FormatterDate;
import io.vertigo.basics.formatter.FormatterDefault;
import io.vertigo.datamodel.smarttype.annotations.Constraint;
import io.vertigo.datamodel.smarttype.annotations.Formatter;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeProperty;

public enum AuditTraceSmartTypes {

	@SmartTypeDefinition(Long.class)
	@Formatter(clazz = FormatterDefault.class)
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	ATraceId,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@Constraint(clazz = ConstraintStringLength.class, arg = "100", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(100)")
	ATraceCategory,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@Constraint(clazz = ConstraintStringLength.class, arg = "100", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(100)")
	ATraceUsername,

	@SmartTypeDefinition(Instant.class)
	@Formatter(clazz = FormatterDate.class, arg = "dd/MM/yyyy HH:mm")
	@SmartTypeProperty(property = "storeType", value = "TIMESTAMP")
	ATraceInstant,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@Constraint(clazz = ConstraintStringLength.class, arg = "250", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(250)")
	ATraceItem,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@SmartTypeProperty(property = "storeType", value = "TEXT")
	ATraceMessage,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterDefault.class)
	@SmartTypeProperty(property = "storeType", value = "TEXT")
	ATraceContext
}
