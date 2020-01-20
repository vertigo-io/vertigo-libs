package io.vertigo.dynamo.ngdomain;

import io.vertigo.core.node.component.Manager;
import io.vertigo.dynamo.domain.metamodel.ConstraintException;
import io.vertigo.dynamo.domain.metamodel.FormatterException;

public interface ModelManager extends Manager {

	void checkValue(SmartTypeDefinition smartTypeDefinition, Object value);

	void checkConstraints(SmartTypeDefinition smartTypeDefinition, Object value) throws ConstraintException;

	String valueToString(SmartTypeDefinition smartTypeDefinition, Object objValue);

	Object stringToValue(SmartTypeDefinition smartTypeDefinition, String strValue) throws FormatterException;

}
