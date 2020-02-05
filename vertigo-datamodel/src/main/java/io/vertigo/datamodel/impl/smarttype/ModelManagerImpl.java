package io.vertigo.datamodel.impl.smarttype;

import java.lang.reflect.Constructor;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.node.Home;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.core.util.MapBuilder;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.smarttype.AdapterConfig;
import io.vertigo.datamodel.smarttype.ModelManager;
import io.vertigo.datamodel.smarttype.SmartTypeDefinition;
import io.vertigo.datamodel.structure.metamodel.Constraint;
import io.vertigo.datamodel.structure.metamodel.ConstraintException;
import io.vertigo.datamodel.structure.metamodel.Formatter;
import io.vertigo.datamodel.structure.metamodel.FormatterException;

public class ModelManagerImpl implements ModelManager, Activeable {

	private Map<String, Formatter> formatterBySmartType;
	private Map<String, List<Constraint>> constraintsBySmartType;
	private final Map<String, Map<Class, BasicTypeAdapter>> adaptersByType = new HashMap<>();
	private Map<Class, BasicTypeAdapter> wildcardAdapters;

	@Override
	public void start() {
		formatterBySmartType = Home.getApp().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.filter(smartTypeDefinition -> smartTypeDefinition.getFormatterConfig() != null)
				.collect(Collectors.toMap(SmartTypeDefinition::getName, smartTypeDefinition -> createFormatter(smartTypeDefinition)));

		constraintsBySmartType = Home.getApp().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.collect(Collectors.toMap(SmartTypeDefinition::getName, smartTypeDefinition -> createConstraints(smartTypeDefinition)));

		wildcardAdapters = Home.getApp().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.filter(smartTypeDefinition -> smartTypeDefinition.getAdapterConfigs().containsKey("*"))
				.map(smartTypeDefinition -> Tuple.of(smartTypeDefinition.getJavaClass(), smartTypeDefinition.getAdapterConfigs().get("*")))
				.collect(Collectors.toMap(Tuple::getVal1, tuple -> createBasicTypeAdapter(tuple.getVal2())));

		Home.getApp().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.flatMap(smartTypeDefinition -> smartTypeDefinition.getAdapterConfigs().values().stream().map(adapterConfig -> Tuple.of(smartTypeDefinition.getJavaClass(), adapterConfig)))
				.filter(tuple -> !"*".equals(tuple.getVal2().getType()))
				.forEach(tuple -> adaptersByType.putIfAbsent(tuple.getVal2().getType(), new HashMap<>())
						.put(tuple.getVal1(), createBasicTypeAdapter(tuple.getVal2())));

	}

	private static Formatter createFormatter(final SmartTypeDefinition smartTypeDefinition) {
		final Constructor<? extends Formatter> constructor = ClassUtil.findConstructor(smartTypeDefinition.getFormatterConfig().getFormatterClass(), new Class[] { String.class });
		return ClassUtil.newInstance(constructor, new Object[] { smartTypeDefinition.getFormatterConfig().getArg() });
	}

	private static List<Constraint> createConstraints(final SmartTypeDefinition smartTypeDefinition) {
		return smartTypeDefinition.getConstraintConfigs()
				.stream()
				.map(constraintConfig -> {
					final Optional<String> msgOpt = StringUtil.isEmpty(constraintConfig.getMsg()) ? Optional.empty() : Optional.of(constraintConfig.getMsg());
					final Constructor<? extends Constraint> constructor = ClassUtil.findConstructor(constraintConfig.getConstraintClass(), new Class[] { String.class, Optional.class });
					return ClassUtil.newInstance(constructor, new Object[] { constraintConfig.getArg(), msgOpt });
				})
				.collect(Collectors.toList());
	}

	private static BasicTypeAdapter createBasicTypeAdapter(final AdapterConfig adapterConfig) {
		return ClassUtil.newInstance(adapterConfig.getAdapterClass());
	}

	@Override
	public void stop() {
		// nothing
	}

	@Override
	public void checkValue(final SmartTypeDefinition smartTypeDefinition, final Object value) {
		if (smartTypeDefinition.getScope().isPrimitive()) {
			smartTypeDefinition.getBasicType().checkValue(value);
		}

	}

	@Override
	public void checkConstraints(final SmartTypeDefinition smartTypeDefinition, final Object value) throws ConstraintException {
		checkValue(smartTypeDefinition, value);
		//---
		if (constraintsBySmartType.containsKey(smartTypeDefinition.getName())) {
			for (final Constraint constraint : constraintsBySmartType.get(smartTypeDefinition.getName())) {
				//when a constraint fails, there is no validation
				if (!constraint.checkConstraint(value)) {
					throw new ConstraintException(constraint.getErrorMessage());
				}
			}
		}

	}

	@Override
	public String valueToString(final SmartTypeDefinition smartTypeDefinition, final Object objValue) {
		return formatterBySmartType.get(smartTypeDefinition.getName()).valueToString(objValue, smartTypeDefinition.getBasicType());
	}

	@Override
	public Object stringToValue(final SmartTypeDefinition smartTypeDefinition, final String strValue) throws FormatterException {
		return formatterBySmartType.get(smartTypeDefinition.getName()).stringToValue(strValue, smartTypeDefinition.getBasicType());
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
