package io.vertigo.dynamo.ngdomain.data;

import java.math.BigDecimal;
import java.time.LocalDate;

import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.ngdomain.annotations.Constraint;
import io.vertigo.dynamo.ngdomain.annotations.Formatter;
import io.vertigo.dynamo.ngdomain.annotations.FormatterDefault;
import io.vertigo.dynamo.ngdomain.annotations.Mapper;
import io.vertigo.dynamo.ngdomain.annotations.SmartTypeDefinition;
import io.vertigo.dynamox.domain.constraint.ConstraintNumberMaximum;
import io.vertigo.dynamox.domain.constraint.ConstraintNumberMinimum;
import io.vertigo.dynamox.domain.constraint.ConstraintRegex;
import io.vertigo.dynamox.domain.constraint.ConstraintStringLength;
import io.vertigo.dynamox.domain.formatter.FormatterDate;
import io.vertigo.dynamox.domain.formatter.FormatterId;
import io.vertigo.dynamox.domain.formatter.FormatterString;

public enum TestSmartTypes {

	@SmartTypeDefinition(Long.class)
	@Formatter(clazz = FormatterId.class)
	id,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	multipleIds,

	@SmartTypeDefinition(LocalDate.class)
	@Formatter(clazz = FormatterDate.class, arg = "dd/MM/yyyy")
	localdate,

	@SmartTypeDefinition(BigDecimal.class)
	@FormatterDefault
	currency,

	@SmartTypeDefinition(Integer.class)
	@Constraint(clazz = ConstraintNumberMinimum.class, arg = "0", msg = "")
	@Constraint(clazz = ConstraintNumberMaximum.class, arg = "100", msg = "")
	health,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "100", msg = "")
	label,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "350", msg = "")
	description,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintRegex.class, arg = "^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*(\\.[a-zA-Z0-9-]{2,3})+$", msg = "L'email n'est pas valide")
	email,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	url,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "100", msg = "")
	code,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	label2,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "14", msg = "")
	label3,

	@SmartTypeDefinition(Long.class)
	@FormatterDefault
	size,

	@SmartTypeDefinition(String.class)
	@FormatterDefault
	@Constraint(clazz = ConstraintStringLength.class, arg = "14", msg = "")
	siret,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterString.class, arg = "UPPER")
	@Constraint(clazz = ConstraintStringLength.class, arg = "14", msg = "")
	siret2,

	@SmartTypeDefinition(GeoPoint.class)
	@Mapper(dataType = DataType.String, clazz = GeoPointMapper.class)
	@FormatterDefault
	geoPoint;

}
