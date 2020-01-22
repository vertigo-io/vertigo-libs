package io.vertigo.datafactory.search.metamodel.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder;

@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Repeatable(FacetRanges.class)
@Target({ ElementType.METHOD })
public @interface FacetRange {

	String name();

	String fieldName();

	String label();

	FacetOrder order();

	boolean multiselectable() default false;

	Range[] ranges();

}
