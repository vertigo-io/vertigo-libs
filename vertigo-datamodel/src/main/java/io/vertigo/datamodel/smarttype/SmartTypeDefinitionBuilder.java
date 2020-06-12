/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.Builder;
import io.vertigo.datamodel.smarttype.SmartTypeDefinition.Scope;
import io.vertigo.datamodel.structure.metamodel.Properties;

/**
 * This class must be used to build a Domain.
 * @author pchretien
 */
public final class SmartTypeDefinitionBuilder implements Builder<SmartTypeDefinition> {
	private final String myName;
	private SmartTypeDefinition.Scope myScope;

	private final Class myValueObjectClass;
	private final List<AdapterConfig> myAdapterConfigs = new ArrayList<>();

	/** Formatter. */
	private FormatterConfig myformatterConfig;

	/** list of constraints */
	private List<ConstraintConfig> myConstraintConfigs;

	/** List of property-value tuples */
	private Properties myProperties;

	/**
	 * Constructor.
	 * @param name the name of the smartType
	 * @param dataType the dataType of the smartType
	 */
	SmartTypeDefinitionBuilder(final String name, final BasicType dataType) {
		Assertion.check()
				.argNotEmpty(name)
				.notNull(dataType);
		//---
		myName = name;
		myScope = SmartTypeDefinition.Scope.PRIMITIVE;

		myValueObjectClass = dataType.getJavaClass();
	}

	/**
	 * Constructor.
	 * @param name the name of the smartType
	 * @param valueObjectClass the value-object class of the smartType
	 */
	SmartTypeDefinitionBuilder(final String name, final Class valueObjectClass) {
		Assertion.check()
				.argNotEmpty(name)
				.notNull(valueObjectClass);
		//---
		myName = name;
		myScope = SmartTypeDefinition.Scope.VALUE_OBJECT;
		myValueObjectClass = valueObjectClass;
	}

	/**
	 * @param formatterDefinition the FormatterDefinition
	 * @return this builder
	 */
	public SmartTypeDefinitionBuilder withScope(final Scope scope) {
		Assertion.check().notNull(scope);
		//---
		myScope = scope;
		return this;
	}

	/**
	 * @param formatterDefinition the FormatterDefinition
	 * @return this builder
	 */
	public SmartTypeDefinitionBuilder withFormatter(final FormatterConfig formatterConfig) {
		Assertion.check().notNull(formatterConfig);
		//---
		myformatterConfig = formatterConfig;
		return this;
	}

	/**
	 * @param constraintDefinitions the list of constraintDefinitions
	 * @return this builder
	 */
	public SmartTypeDefinitionBuilder withConstraints(final List<ConstraintConfig> constraintConfigs) {
		Assertion.check().notNull(constraintConfigs);
		//---
		myConstraintConfigs = constraintConfigs;
		return this;
	}

	/**
	* @param properties the properties
	* @return this builder
	*/
	public SmartTypeDefinitionBuilder withProperties(final Properties properties) {
		Assertion.check().notNull(properties);
		//---
		myProperties = properties;
		return this;
	}

	/**
	* @param properties the properties
	* @return this builder
	*/
	public SmartTypeDefinitionBuilder addAdapter(final String type, final Class<? extends BasicTypeAdapter> adapterClass, final BasicType targetDataType) {
		Assertion.check()
				.notNull(adapterClass)
				.notNull(targetDataType);
		//---
		myAdapterConfigs.add(new AdapterConfig(type, adapterClass, targetDataType));
		return this;
	}

	@Override
	public SmartTypeDefinition build() {
		return new SmartTypeDefinition(
				myName,
				myScope,
				myValueObjectClass.getName(),
				myAdapterConfigs,
				myformatterConfig,
				myConstraintConfigs == null ? Collections.emptyList() : myConstraintConfigs,
				myProperties == null ? Properties.builder().build() : myProperties);
	}
}
