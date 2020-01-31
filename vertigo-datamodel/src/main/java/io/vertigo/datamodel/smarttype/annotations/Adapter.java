package io.vertigo.datamodel.smarttype.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;

@Retention(RetentionPolicy.RUNTIME)
@Repeatable(Adapters.class)
@Target({ ElementType.FIELD, ElementType.TYPE })
public @interface Adapter {

	BasicType targetBasicType();

	Class<? extends BasicTypeAdapter> clazz();

	String type() default "*";

}
