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

import java.util.List;
import java.util.Optional;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionPrefix;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.datamodel.structure.metamodel.DataType;
import io.vertigo.datamodel.structure.metamodel.Properties;

/**
 * A smarttype exists to enrich the primitive datatypes, giving them super powers.
 *
 * A smarttype has
 *  - a class that represent the value
 *  - an ability to be transformed in and from a primitive datatype
 *
 * Examples :
 *  A mail is not defined by a simple "String", but by a domain called 'Mail'.
 *  Weights, currencies, codes, labels...
 *
 *  An application is built with some dozens of domains.
 *
 * @author pchretien
 */
@DefinitionPrefix("STy")
public final class SmartTypeDefinition implements Definition {
	public enum Scope {
		PRIMITIVE,
		VALUE_OBJECT,
		DATA_OBJECT;

		/**
		 * @return if the domain is a primitive type
		 */
		public boolean isPrimitive() {
			return this == Scope.PRIMITIVE;
		}

		/**
		 * @return if the domain is a value-object
		 */
		public boolean isValueObject() {
			return this == Scope.VALUE_OBJECT;
		}

		/**
		 * @return if the domain is a data-object
		 */
		public boolean isDataObject() {
			return this == Scope.DATA_OBJECT;
		}
	}

	private final String name;
	private final Scope scope;
	private final String valueObjectClassName;
	private final DataType targetDataType;
	private final Optional<Class<? extends DataTypeMapper>> mapperClassOpt;
	private final FormatterConfig formatterConfig;
	private final List<ConstraintConfig> constraintConfigs;

	private final Properties properties;

	public SmartTypeDefinition(
			final String name,
			final Scope scope,
			final String valueObjectClassName,
			final DataType targetDataType,
			final Optional<Class<? extends DataTypeMapper>> mapperClassOpt,
			final FormatterConfig formatterConfig,
			final List<ConstraintConfig> constraintConfigs,
			final Properties properties) {
		Assertion.checkArgNotEmpty(name);
		Assertion.checkNotNull(scope);
		Assertion.checkNotNull(valueObjectClassName);
		Assertion.checkNotNull(targetDataType);
		Assertion.checkNotNull(mapperClassOpt);
		Assertion.checkNotNull(constraintConfigs);
		Assertion.checkNotNull(properties);
		//-----
		this.name = name;
		this.scope = scope;
		this.valueObjectClassName = valueObjectClassName;
		this.targetDataType = targetDataType;
		this.mapperClassOpt = mapperClassOpt;
		this.properties = properties;
		this.formatterConfig = formatterConfig;
		this.constraintConfigs = constraintConfigs;

	}

	/** {@inheritDoc} */
	@Override
	public String getName() {
		return name;
	}

	/**
	 * @return the domain scope
	 */
	public Scope getScope() {
		return scope;
	}

	public String getValueObjectClassName() {
		return valueObjectClassName;
	}

	public Class getJavaClass() {
		return ClassUtil.classForName(valueObjectClassName);
	}

	public DataType getTargetDataType() {
		return targetDataType;
	}

	public Optional<Class<? extends DataTypeMapper>> getMapperClassOpt() {
		return mapperClassOpt;
	}

	public Properties getProperties() {
		return properties;
	}

	/**
	 * Returns the formatter of the domain.
	 *
	 * @return the formatter.
	 */
	public FormatterConfig getFormatterConfig() {
		return formatterConfig;
	}

	public List<ConstraintConfig> getConstraintConfigs() {
		return constraintConfigs;
	}

	public static SmartTypeDefinitionBuilder builder(final String name, final DataType dataType) {
		return new SmartTypeDefinitionBuilder(name, dataType);
	}

	public static SmartTypeDefinitionBuilder builder(final String name, final Class clazz) {
		return new SmartTypeDefinitionBuilder(name, clazz);
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return name;
	}

}
