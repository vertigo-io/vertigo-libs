/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2021, Vertigo.io, team@vertigo.io
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
package io.vertigo.datamodel.smarttype.definitions;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.node.definition.AbstractDefinition;
import io.vertigo.core.node.definition.DefinitionPrefix;
import io.vertigo.datamodel.smarttype.AdapterConfig;
import io.vertigo.datamodel.smarttype.ConstraintConfig;
import io.vertigo.datamodel.smarttype.FormatterConfig;
import io.vertigo.datamodel.structure.definitions.Properties;

/**
 * A smarttype exists to enrich the primitive datatypes, giving them super powers.
 *
 * A smarttype has
 *  - a class that represent the value
 *  - an ability to be transformed in and from a primitive datatype
 *
 * Examples :
 *  A mail is not defined by a simple "String", but by a smartType called 'Mail'.
 *  Weights, currencies, codes, labels...
 *
 *  An application is built with some dozens of smartType.
 *
 * @author pchretien
 */
@DefinitionPrefix(SmartTypeDefinition.PREFIX)
public final class SmartTypeDefinition extends AbstractDefinition<SmartTypeDefinition> {
	public static final String PREFIX = "STy";

	public enum Scope {
		BASIC_TYPE, //
		VALUE_TYPE, //
		DATA_TYPE;

		/**
		 * @return if the smartType is a basic-type
		 */
		public boolean isBasicType() {
			return this == Scope.BASIC_TYPE;
		}

		/**
		 * @return if the smartType is a value-type
		 */
		public boolean isValueType() {
			return this == Scope.VALUE_TYPE;
		}

		/**
		 * @return if the smartType is a data-type
		 */
		public boolean isDataType() {
			return this == Scope.DATA_TYPE;
		}
	}

	private final Scope scope;
	private final Class javaClass;
	private final Optional<BasicType> basicTypeOpt;
	private final AdapterConfig wildCardAdapterConfig; //nullable
	private final Map<String, AdapterConfig> adapterConfigs;
	private final FormatterConfig formatterConfig;//nullable
	private final List<ConstraintConfig> constraintConfigs;

	private final Properties properties;

	public SmartTypeDefinition(
			final String name,
			final Scope scope,
			final Class javaClass,
			final List<AdapterConfig> adapterConfigs,
			final FormatterConfig formatterConfig,
			final List<ConstraintConfig> constraintConfigs,
			final Properties properties) {
		super(name);
		//---
		Assertion.check()
				.isNotNull(scope)
				.isNotNull(javaClass)
				.isNotNull(adapterConfigs)
				.isNotNull(constraintConfigs)
				.isNotNull(properties);
		//---
		this.scope = scope;
		this.javaClass = javaClass;
		basicTypeOpt = BasicType.of(javaClass);
		this.adapterConfigs = adapterConfigs
				.stream()
				.collect(Collectors.toMap(AdapterConfig::type, Function.identity(), (a, b) -> {
					throw new IllegalArgumentException("Only one adapter per type is supported. Smarttype '" + name + "' declares multiple adapters for type '" + a.type() + "'");
				}));
		wildCardAdapterConfig = this.adapterConfigs.get("*");
		this.properties = properties;
		this.formatterConfig = formatterConfig;
		this.constraintConfigs = List.copyOf(constraintConfigs);

	}

	/**
	 * @return the smartType scope
	 */
	public Scope getScope() {
		return scope;
	}

	public Class getJavaClass() {
		return javaClass;
	}

	public BasicType getBasicType() {
		Assertion.check().isTrue(basicTypeOpt.isPresent(), "Only smarttypes that are derived from BasicTypes have a basic type, use a dedicated adapter instead to convert the value into a BasicType");
		return basicTypeOpt.get();
	}

	public Map<String, AdapterConfig> getAdapterConfigs() {
		return adapterConfigs;
	}

	public AdapterConfig getAdapterConfig(final String type) {
		return adapterConfigs.getOrDefault(type, wildCardAdapterConfig);
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

	public static SmartTypeDefinitionBuilder builder(final String name, final BasicType basicType) {
		return new SmartTypeDefinitionBuilder(name, basicType);
	}

	public static SmartTypeDefinitionBuilder builder(final String name, final Class clazz) {
		return new SmartTypeDefinitionBuilder(name, clazz);
	}
}
