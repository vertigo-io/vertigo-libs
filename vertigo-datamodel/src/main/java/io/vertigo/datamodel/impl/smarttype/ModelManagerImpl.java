package io.vertigo.datamodel.impl.smarttype;

import java.lang.reflect.Constructor;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import io.vertigo.core.node.Home;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.smarttype.DataTypeMapper;
import io.vertigo.datamodel.smarttype.ModelManager;
import io.vertigo.datamodel.smarttype.SmartTypeDefinition;
import io.vertigo.datamodel.structure.metamodel.Constraint;
import io.vertigo.datamodel.structure.metamodel.ConstraintException;
import io.vertigo.datamodel.structure.metamodel.Formatter;
import io.vertigo.datamodel.structure.metamodel.FormatterException;

public class ModelManagerImpl implements ModelManager, Activeable {

	private Map<String, Formatter> formatterBySmartType;
	private Map<String, List<Constraint>> constraintsBySmartType;
	private Map<String, DataTypeMapper> mapperBySmartType;

	@Override
	public void start() {
		formatterBySmartType = Home.getApp().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.filter(smartTypeDefinition -> smartTypeDefinition.getFormatterConfig() != null)
				.collect(Collectors.toMap(SmartTypeDefinition::getName, smartTypeDefinition -> createFormatter(smartTypeDefinition)));

		constraintsBySmartType = Home.getApp().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.collect(Collectors.toMap(SmartTypeDefinition::getName, smartTypeDefinition -> createConstraints(smartTypeDefinition)));

		mapperBySmartType = Home.getApp().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.filter(smartTypeDefinition -> smartTypeDefinition.getMapperClassOpt().isPresent())
				.collect(Collectors.toMap(SmartTypeDefinition::getName, smartTypeDefinition -> createDataTypeMapper(smartTypeDefinition)));

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

	private static DataTypeMapper createDataTypeMapper(final SmartTypeDefinition smartTypeDefinition) {
		return ClassUtil.newInstance(smartTypeDefinition.getMapperClassOpt().get());
	}

	@Override
	public void stop() {
		// nothing
	}

	@Override
	public void checkValue(final SmartTypeDefinition smartTypeDefinition, final Object value) {
		if (smartTypeDefinition.getScope().isPrimitive()) {
			smartTypeDefinition.getTargetDataType().checkValue(value);
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
		final Object valueToFormat = smartTypeDefinition.getMapperClassOpt().isPresent() ? mapperBySmartType.get(smartTypeDefinition.getName()).to(objValue, smartTypeDefinition.getJavaClass()) : objValue;
		return formatterBySmartType.get(smartTypeDefinition.getName()).valueToString(valueToFormat, smartTypeDefinition.getTargetDataType());
	}

	@Override
	public Object stringToValue(final SmartTypeDefinition smartTypeDefinition, final String strValue) throws FormatterException {
		final Object rawValue = formatterBySmartType.get(smartTypeDefinition.getName()).stringToValue(strValue, smartTypeDefinition.getTargetDataType());
		return smartTypeDefinition.getMapperClassOpt().isPresent() ? mapperBySmartType.get(smartTypeDefinition.getName()).from(rawValue, smartTypeDefinition.getJavaClass()) : rawValue;
	}

}
