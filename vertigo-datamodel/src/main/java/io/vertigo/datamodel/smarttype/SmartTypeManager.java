/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.datamodel.smarttype;

import java.util.Map;

import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.node.component.Manager;
import io.vertigo.datamodel.smarttype.definitions.ConstraintException;
import io.vertigo.datamodel.smarttype.definitions.FormatterException;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;

public interface SmartTypeManager extends Manager {
	/**
	 * Checks the type of a given value.
	 *
	 * This method is used to verify if the provided value matches the expected type defined by the SmartTypeDefinition.
	 * The Cardinality parameter is used to determine if the value can be a collection (multiple values) or a single value.
	 *
	 * @param smartTypeDefinition The definition of the smart type, which includes the expected type of the value.
	 * @param cardinality The cardinality of the value, which can be either single or multiple.
	 * @param value The value to be checked.
	 * @throws ClassCastException If the value does not match the expected type.
	 */
	void checkType(SmartTypeDefinition smartTypeDefinition, Cardinality cardinality, Object value);

	/**
	 * Validates the value by checking all the constraints.
	 *
	 * This method is used to verify if the provided value satisfies all the constraints defined by the SmartTypeDefinition.
	 * The Cardinality parameter is used to determine if the value can be a collection (multiple values) or a single value.
	 *
	 * @param smartTypeDefinition The definition of the smart type, which includes the constraints of the value.
	 * @param cardinality The cardinality of the value, which can be either single or multiple.
	 * @param value The value to be validated.
	 * @throws ConstraintException If the value does not satisfy the constraints.
	 */
	void validate(SmartTypeDefinition smartTypeDefinition, Cardinality cardinality, Object value) throws ConstraintException;

	/**
	 * Converts the value to a string representation.
	 *
	 * @param smartTypeDefinition The definition of the smart type, which includes the expected type of the value.
	 * @param objValue The value to be converted to a string.
	 * @return The string representation of the value.
	 */
	String valueToString(SmartTypeDefinition smartTypeDefinition, Object objValue);

	/**
	 * Converts a string to a value of the type defined by the SmartTypeDefinition.
	 *
	 * @param smartTypeDefinition The definition of the smart type, which includes the expected type of the value.
	 * @param strValue The string to be converted to a value.
	 * @return The value converted from the string.
	 * @throws FormatterException If the string cannot be converted to the expected type.
	 */
	Object stringToValue(SmartTypeDefinition smartTypeDefinition, String strValue) throws FormatterException;

	/**
	 * Retrieves the type adapters for a given adapter type.
	 *
	 * @param adapterType The type of the adapters to be retrieved.
	 * @return A map of classes to their corresponding basic type adapters.
	 */
	Map<Class, BasicTypeAdapter> getTypeAdapters(final String adapterType);

}
