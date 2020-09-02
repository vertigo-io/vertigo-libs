package io.vertigo.datamodel.smarttype.data;

import io.vertigo.datamodel.smarttype.annotations.Formatter;
import io.vertigo.datamodel.smarttype.annotations.SmartTypeDefinition;
import io.vertigo.datamodel.smarttype.data.domain.Base;

public enum TestOverride {

	@SmartTypeDefinition(Base.class)
	@Formatter(clazz = FormatterTest.class)
	DtBase;

}
