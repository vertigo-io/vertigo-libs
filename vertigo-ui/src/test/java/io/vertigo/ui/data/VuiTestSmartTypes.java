package io.vertigo.ui.data;

import java.time.Instant;
import java.time.LocalDate;

import io.vertigo.datamodel.impl.smarttype.constraint.ConstraintNumberMinimum;
import io.vertigo.datamodel.impl.smarttype.constraint.ConstraintRegex;
import io.vertigo.datamodel.impl.smarttype.constraint.ConstraintStringLength;
import io.vertigo.datamodel.impl.smarttype.formatter.FormatterBoolean;
import io.vertigo.datamodel.impl.smarttype.formatter.FormatterDate;
import io.vertigo.datamodel.impl.smarttype.formatter.FormatterNumber;
import io.vertigo.datamodel.impl.smarttype.formatter.FormatterString;
import io.vertigo.datamodel.smarttype.annotations.Constraint;
import io.vertigo.datamodel.smarttype.annotations.Formatter;
import io.vertigo.datamodel.smarttype.annotations.FormatterDefault;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeProperty;

public enum VuiTestSmartTypes {

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(500)")
	@SmartTypeProperty(property = "indexType", value = "multiple_code")
	MultiValues,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(250)")
	@SmartTypeProperty(property = "indexType", value = "text_fr_not_tokenized")
	TextNotTokenized,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(10000)")
	@SmartTypeProperty(property = "indexType", value = "text_fr")
	Text,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterString.class, arg = "UPPER")
	@Constraint(clazz = ConstraintStringLength.class, arg = "30", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(30)")
	@SmartTypeProperty(property = "indexType", value = "code")
	Code,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintRegex.class, arg = "^[0-9]{5}$", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(5)")
	CodePostal,

	@SmartTypeDefinition(LocalDate.class)
	@Formatter(clazz = FormatterDate.class, arg = "dd/MM/yyyy")
	@SmartTypeProperty(property = "storeType", value = "DATE")
	Date,

	@SmartTypeDefinition(Instant.class)
	@Formatter(clazz = FormatterDate.class, arg = "dd/MM/yyyy HH:mm;dd/MM/yy HH:mm")
	@SmartTypeProperty(property = "storeType", value = "TIMESTAMP")
	LastModified,

	@SmartTypeDefinition(Integer.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintNumberMinimum.class, arg = "1500", msg = "")
	@Constraint(clazz = ConstraintNumberMinimum.class, arg = "2500", msg = "")
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	Year,

	@SmartTypeDefinition(Integer.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "NUMERIC")
	Duration,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintRegex.class, arg = "^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*\\.[a-zA-Z0-9-]{2,3}$", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(255)")
	Email,

	@SmartTypeDefinition(Long.class)
	@Formatter(clazz = FormatterNumber.class, arg = "###0")
	@SmartTypeProperty(property = "storeType", value = "BIGINT")
	Id,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "30", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(100)")
	@SmartTypeProperty(property = "indexType", value = "text_fr:facetable")
	Label,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "50", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(50)")
	@SmartTypeProperty(property = "indexType", value = "text_fr:facetable")
	LabelShort,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "250", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(250)")
	LabelLong,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "4000", msg = "")
	@SmartTypeProperty(property = "storeType", value = "TEXT")
	Comment,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "50", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(50)")
	Name,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "50", msg = "")
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(50)")
	Firstname,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(250)")
	Password,

	@SmartTypeDefinition(Integer.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "INT")
	Rating,

	@SmartTypeDefinition(Boolean.class)
	@Formatter(clazz = FormatterBoolean.class, arg = "Oui;Non")
	@SmartTypeProperty(property = "storeType", value = "BOOLEAN")
	OuiNon,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@SmartTypeProperty(property = "storeType", value = "VARCHAR(250)")
	MultipleIds;
}
