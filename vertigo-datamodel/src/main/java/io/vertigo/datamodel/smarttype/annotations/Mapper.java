package io.vertigo.datamodel.smarttype.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import io.vertigo.core.lang.DataType;
import io.vertigo.datamodel.smarttype.DataTypeMapper;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.FIELD, ElementType.TYPE })
public @interface Mapper {

	DataType dataType();

	Class<? extends DataTypeMapper> clazz();

}
