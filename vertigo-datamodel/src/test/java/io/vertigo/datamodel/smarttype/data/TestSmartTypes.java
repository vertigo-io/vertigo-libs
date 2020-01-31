package io.vertigo.datamodel.smarttype.data;

import java.math.BigDecimal;
import java.time.LocalDate;

import io.vertigo.core.lang.BasicType;
import io.vertigo.datamodel.impl.smarttype.constraint.ConstraintNumberMaximum;
import io.vertigo.datamodel.impl.smarttype.constraint.ConstraintNumberMinimum;
import io.vertigo.datamodel.impl.smarttype.constraint.ConstraintRegex;
import io.vertigo.datamodel.impl.smarttype.constraint.ConstraintStringLength;
import io.vertigo.datamodel.impl.smarttype.formatter.FormatterDate;
import io.vertigo.datamodel.impl.smarttype.formatter.FormatterId;
import io.vertigo.datamodel.impl.smarttype.formatter.FormatterString;
import io.vertigo.datamodel.smarttype.annotations.Constraint;
import io.vertigo.datamodel.smarttype.annotations.Formatter;
import io.vertigo.datamodel.smarttype.annotations.FormatterDefault;
import io.vertigo.datamodel.smarttype.annotations.Adapter;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.data.domain.GeoPoint;
import io.vertigo.datamodel.smarttype.data.domain.GeoPointMapper;

public enum TestSmartTypes {

	@SmartTypeDefinition(Long.class)
	@Formatter(clazz = FormatterId.class)
	Id,

	@SmartTypeDefinition(String.class)
	String,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	MultipleIds,

	@SmartTypeDefinition(LocalDate.class)
	@Formatter(clazz = FormatterDate.class, arg = "dd/MM/yyyy")
	Localdate,

	@SmartTypeDefinition(BigDecimal.class)
	@FormatterDefault
	Currency,

	@SmartTypeDefinition(Integer.class)
	@Constraint(clazz = ConstraintNumberMinimum.class, arg = "0", msg = "")
	@Constraint(clazz = ConstraintNumberMaximum.class, arg = "100", msg = "")
	Health,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "100", msg = "")
	Label,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "350", msg = "")
	Description,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintRegex.class, arg = "^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*(\\.[a-zA-Z0-9-]{2,3})+$", msg = "L'email n'est pas valide")
	Email,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	Url,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "100", msg = "")
	Code,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	Label2,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "14", msg = "")
	Label3,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	Size,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "14", msg = "")
	Siret,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterString.class, arg = "UPPER")
	@Constraint(clazz = ConstraintStringLength.class, arg = "14", msg = "")
	Siret2,

	@SmartTypeDefinition(GeoPoint.class)
	@Adapter(targetBasicType = BasicType.String, clazz = GeoPointMapper.class)
	@FormatterDefault
	GeoPoint;
}
