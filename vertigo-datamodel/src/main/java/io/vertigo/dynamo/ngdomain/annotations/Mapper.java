package io.vertigo.dynamo.ngdomain.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.ngdomain.DataTypeMapper;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.FIELD, ElementType.TYPE })
public @interface Mapper {

	DataType dataType();

	Class<? extends DataTypeMapper> clazz();

}
