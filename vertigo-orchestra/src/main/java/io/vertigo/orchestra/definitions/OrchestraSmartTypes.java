package io.vertigo.orchestra.definitions;

import java.time.Instant;

import io.vertigo.datamodel.impl.smarttype.constraint.ConstraintRegex;
import io.vertigo.datamodel.impl.smarttype.constraint.ConstraintStringLength;
import io.vertigo.datamodel.impl.smarttype.formatter.FormatterBoolean;
import io.vertigo.datamodel.impl.smarttype.formatter.FormatterDate;
import io.vertigo.datamodel.smarttype.annotations.Constraint;
import io.vertigo.datamodel.smarttype.annotations.Formatter;
import io.vertigo.datamodel.smarttype.annotations.FormatterDefault;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeProperty;

public enum OrchestraSmartTypes {

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	OIdentifiant,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintRegex.class, arg = "([0-9A-Z_-]+)*$", msg = "La liste des identifiants n'est pas valide")
	@Constraint(clazz = ConstraintStringLength.class, arg = "20", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(20)")
	OCodeIdentifiant,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "100", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(100)")
	OLibelle,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "100", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(100)")
	OToken,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "200", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(200)")
	OClasse,

	@SmartTypeDefinition(Boolean.class)
	@Formatter(clazz = FormatterBoolean.class, arg = "Oui;Non")
	@SmartTypeProperty(property = "storeType", value = "BOOL")
	OBooleen,

	@SmartTypeDefinition(Instant.class)
	@Formatter(clazz = FormatterDate.class, arg = "dd/MM/yyyy HH:mm")
	@SmartTypeProperty(property = "storeType", value = "TIMESTAMP")
	OTimestamp,

	@SmartTypeDefinition(Integer.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	ONombre,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "TEXT")
	OJsonText,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "TEXT")
	OMetadatas,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "TEXT")
	OText;

}