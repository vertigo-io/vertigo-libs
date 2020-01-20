package io.vertigo.dynamo.ngdomain.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.FIELD })
@Repeatable(Constraints.class)
public @interface Constraint {
	Class<? extends io.vertigo.dynamo.domain.metamodel.Constraint> clazz();

	String arg() default "";

	String msg();
}
