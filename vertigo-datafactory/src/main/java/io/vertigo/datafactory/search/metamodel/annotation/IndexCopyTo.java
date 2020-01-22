package io.vertigo.datafactory.search.metamodel.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Repeatable(value = IndexCopyTos.class)
@Target({ ElementType.TYPE })
public @interface IndexCopyTo {

	String field();

	String[] to();

}
