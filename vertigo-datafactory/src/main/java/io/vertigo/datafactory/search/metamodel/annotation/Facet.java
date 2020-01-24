package io.vertigo.datafactory.search.metamodel.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder;

@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Target({ ElementType.TYPE })
public @interface Facet {

	String type();

	String name();

	String dtDefinition();

	String fieldName();

	String label();

	FacetOrder order();

	boolean multiselectable() default false;

	Range[] ranges() default {};

}
