package io.vertigo.datamodel.smarttype.data;

import java.math.BigDecimal;
import java.time.LocalDate;

import io.vertigo.core.lang.BasicType;
import io.vertigo.datamodel.smarttype.annotations.Adapter;
import io.vertigo.datamodel.smarttype.annotations.Constraint;
import io.vertigo.datamodel.smarttype.annotations.Formatter;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.data.domain.GeoPoint;
import io.vertigo.datamodel.smarttype.data.domain.GeoPointMapper;

public enum TestSmartTypes {

	@SmartTypeDefinition(Long.class)
	Id,

	@SmartTypeDefinition(String.class)
	@Constraint(clazz = ConstraintTest.class, arg = "", msg = "")
	String,

	@SmartTypeDefinition(String.class)
	MultipleIds,

	@SmartTypeDefinition(LocalDate.class)
	Localdate,

	@SmartTypeDefinition(BigDecimal.class)
	Currency,

	@SmartTypeDefinition(Integer.class)
	Health,

	@SmartTypeDefinition(String.class)
	Label,

	@SmartTypeDefinition(String.class)
	Description,

	@SmartTypeDefinition(String.class)
	Email,

	@SmartTypeDefinition(String.class)
	Url,

	@SmartTypeDefinition(String.class)
	Code,

	@SmartTypeDefinition(String.class)
	Label2,

	@SmartTypeDefinition(String.class)
	Label3,

	@SmartTypeDefinition(Long.class)
	Size,

	@SmartTypeDefinition(String.class)
	Siret,

	@SmartTypeDefinition(String.class)
	@Formatter(clazz = FormatterTest.class)
	@Constraint(clazz = ConstraintTest.class, arg = "", msg = "")
	Siret2,

	@SmartTypeDefinition(GeoPoint.class)
	@Adapter(targetBasicType = BasicType.String, clazz = GeoPointMapper.class)
	GeoPoint
}
