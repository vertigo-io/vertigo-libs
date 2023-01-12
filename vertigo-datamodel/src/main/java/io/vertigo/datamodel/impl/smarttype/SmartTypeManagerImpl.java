/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.datamodel.impl.smarttype;

import java.lang.reflect.Constructor;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.lang.MapBuilder;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.node.definition.DefinitionId;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.smarttype.AdapterConfig;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.structure.definitions.Constraint;
import io.vertigo.datamodel.structure.definitions.ConstraintException;
import io.vertigo.datamodel.structure.definitions.Formatter;
import io.vertigo.datamodel.structure.definitions.FormatterException;
import io.vertigo.datamodel.structure.model.DtList;

public class SmartTypeManagerImpl implements SmartTypeManager, Activeable {

	private Map<DefinitionId<SmartTypeDefinition>, Formatter> formatterBySmartType;
	private Map<DefinitionId<SmartTypeDefinition>, List<Constraint>> constraintsBySmartType;
	//--
	private final Map<String, Map<Class, BasicTypeAdapter>> adaptersByType = new HashMap<>();
	private final Map<Class, BasicTypeAdapter> wildcardAdapters = new HashMap<>();

	@Override
	public void start() {
		formatterBySmartType = Node.getNode().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.filter(smartTypeDefinition -> smartTypeDefinition.getFormatterConfig() != null)
				.collect(Collectors.toMap(SmartTypeDefinition::id, SmartTypeManagerImpl::createFormatter));

		constraintsBySmartType = Node.getNode().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.collect(Collectors.toMap(SmartTypeDefinition::id, SmartTypeManagerImpl::createConstraints));

		Node.getNode().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.filter(smartTypeDefinition -> smartTypeDefinition.getAdapterConfigs().containsKey("*"))
				.forEach(smartTypeDefinition -> {
					final AdapterConfig wildcardAdapterConfig = smartTypeDefinition.getAdapterConfigs().get("*");
					Assertion.check()
							.when(wildcardAdapters.containsKey(smartTypeDefinition.getJavaClass()), () -> Assertion.check()
									.isTrue(wildcardAdapterConfig.adapterClass().equals(wildcardAdapters.get(smartTypeDefinition.getJavaClass()).getClass()),
											"SmartType {0} defines an adapter for the class {1} and the type {2}. An adapter for the same type and class is already registered",
											smartTypeDefinition.getName(), smartTypeDefinition.getJavaClass(), wildcardAdapterConfig.type()));
					//--
					wildcardAdapters.put(smartTypeDefinition.getJavaClass(), createBasicTypeAdapter(wildcardAdapterConfig));
				});

		Node.getNode().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.flatMap(smartTypeDefinition -> smartTypeDefinition.getAdapterConfigs().values().stream().map(adapterConfig -> Tuple.of(smartTypeDefinition, adapterConfig)))
				.filter(tuple -> !"*".equals(tuple.val2().type()))
				.forEach(tuple -> {
					final Map<Class, BasicTypeAdapter> registeredAdapaters = adaptersByType.computeIfAbsent(tuple.val2().type(), k -> new HashMap<>());
					Assertion.check()
							.when(registeredAdapaters.containsKey(tuple.val1()), () -> Assertion.check()
									.isTrue(tuple.val2().adapterClass().equals(registeredAdapaters.get(tuple.val1()).getClass()),
											"SmartType {0} defines an adapter for the class {1} and the type {2}. An adapter for the same type and class is already registered",
											tuple.val1().getName(), tuple.val1(), tuple.val2().type()));
					registeredAdapaters.put(tuple.val1().getJavaClass(), createBasicTypeAdapter(tuple.val2()));
				});

	}

	private static Formatter createFormatter(final SmartTypeDefinition smartTypeDefinition) {
		final Constructor<? extends Formatter> constructor = ClassUtil.findConstructor(smartTypeDefinition.getFormatterConfig().formatterClass(), new Class[] { String.class });
		return ClassUtil.newInstance(constructor, new Object[] { smartTypeDefinition.getFormatterConfig().arg() });
	}

	private static List<Constraint> createConstraints(final SmartTypeDefinition smartTypeDefinition) {
		return smartTypeDefinition.getConstraintConfigs()
				.stream()
				.map(constraintConfig -> {
					final Optional<String> msgOpt = StringUtil.isBlank(constraintConfig.msg()) ? Optional.empty() : Optional.of(constraintConfig.msg());
					final Optional<String> resourceMsgOpt = StringUtil.isBlank(constraintConfig.resourceMsg()) ? Optional.empty() : Optional.of(constraintConfig.resourceMsg());
					final Constructor<? extends Constraint> constructor = ClassUtil.findConstructor(constraintConfig.constraintClass(),
							new Class[] { String.class, Optional.class, Optional.class });
					return ClassUtil.newInstance(constructor, new Object[] { constraintConfig.arg(), msgOpt, resourceMsgOpt });
				})
				.collect(Collectors.toList());
	}

	private static BasicTypeAdapter createBasicTypeAdapter(final AdapterConfig adapterConfig) {
		return ClassUtil.newInstance(adapterConfig.adapterClass());
	}

	@Override
	public void stop() {
		// nothing
	}

	private static void checkType(final SmartTypeDefinition smartTypeDefinition, final Object value) {
		if (value != null && !smartTypeDefinition.getJavaClass().isInstance(value)) {
			throw new ClassCastException("Value " + value + " doesn't match :" + smartTypeDefinition.getJavaClass());
		}
	}

	@Override
	public void checkType(final SmartTypeDefinition smartTypeDefinition, final Cardinality cardinality, final Object value) {
		Assertion.check()
				.isNotNull(smartTypeDefinition)
				.isNotNull(cardinality);
		//---
		switch (cardinality) {
			case MANY:
				switch (smartTypeDefinition.getScope()) {
					case DATA_TYPE:
						if (!(value instanceof DtList)) {
							throw new ClassCastException("Value " + value + " must be a data-list");
						}
						for (final Object element : DtList.class.cast(value)) {
							checkType(smartTypeDefinition, element);
						}
						break;
					case BASIC_TYPE:
					case VALUE_TYPE:
						if (!(value instanceof List)) {
							throw new ClassCastException("Value " + value + " must be a list");
						}
						break;
					default:
						throw new IllegalStateException();
				}
				break;
			case ONE:
			case OPTIONAL_OR_NULLABLE:
				checkType(smartTypeDefinition, value);
				break;
			default:
				throw new IllegalStateException();
		}
	}

	@Override
	public void validate(final SmartTypeDefinition smartTypeDefinition, final Cardinality cardinality, final Object value) throws ConstraintException {
		Assertion.check()
				.isNotNull(smartTypeDefinition)
				.isNotNull(cardinality);
		//---
		switch (cardinality) {
			case MANY:
				if (!(value instanceof List)) {
					throw new ClassCastException("Value " + value + " must be a list");
				}
				for (final Object element : List.class.cast(value)) {
					checkConstraints(smartTypeDefinition, element);
				}
				break;
			case ONE:
				if (value == null) {
					throw new ConstraintException(LocaleMessageText.of("A non-null value is required for {0}", smartTypeDefinition.id()));
				}
			case OPTIONAL_OR_NULLABLE:
				checkConstraints(smartTypeDefinition, value);
				break;
			default:
				throw new UnsupportedOperationException();
		}

	}

	private void checkConstraints(final SmartTypeDefinition smartTypeDefinition, final Object value) throws ConstraintException {
		checkType(smartTypeDefinition, value);
		//---
		final List<Constraint> constraints = constraintsBySmartType.get(smartTypeDefinition.id());
		if (constraints != null) {
			for (final Constraint constraint : constraints) {
				//when a constraint fails, there is no validation
				if (!constraint.checkConstraint(value)) {
					throw new ConstraintException(constraint.getErrorMessage());
				}
			}
		}
	}

	@Override
	public String valueToString(final SmartTypeDefinition smartTypeDefinition, final Object objValue) {
		return formatterBySmartType.get(smartTypeDefinition.id()).valueToString(objValue, smartTypeDefinition.getBasicType());
	}

	@Override
	public Object stringToValue(final SmartTypeDefinition smartTypeDefinition, final String strValue) throws FormatterException {
		return formatterBySmartType.get(smartTypeDefinition.id()).stringToValue(strValue, smartTypeDefinition.getBasicType());
	}

	@Override
	public Map<Class, BasicTypeAdapter> getTypeAdapters(final String adapterType) {
		return new MapBuilder<Class, BasicTypeAdapter>()
				.putAll(wildcardAdapters)// we start with basic ones
				.putAll(adaptersByType.getOrDefault(adapterType, Collections.emptyMap())) // we add specialized ones
				.unmodifiable() // we dont want modifs
				.build();
	}

}
