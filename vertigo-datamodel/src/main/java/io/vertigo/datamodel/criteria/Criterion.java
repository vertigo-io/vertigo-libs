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
package io.vertigo.datamodel.criteria;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Objects;
import java.util.function.Predicate;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.util.DateUtil;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.util.DataModelUtil;

final class Criterion<D extends DataObject> extends Criteria<D> {
	private static final long serialVersionUID = -7797854063455062775L;

	private static final String DATE_PATTERN = "dd/MM/yyyy";
	private static final String INSTANT_PATTERN = "dd/MM/yyyy HH:mm:ss";

	private final DataFieldName<D> dataFieldName;
	private final CriterionOperator criterionOperator;
	private final Serializable[] values;

	Criterion(final DataFieldName<D> dtFieldName, final CriterionOperator criterionOperator, final Serializable... values) {
		Assertion.check()
				.isNotNull(dtFieldName)
				.isNotNull(criterionOperator)
				.isNotNull(values)
				.when(CriterionOperator.IN != criterionOperator, () -> Assertion.check()
						.isTrue(criterionOperator.getArity() == values.length, "Only {0} argument(s) functions are allowed for operator '{1}'",
								criterionOperator.getArity(),
								criterionOperator));
		//---
		this.criterionOperator = criterionOperator;
		this.dataFieldName = dtFieldName;
		this.values = values;
	}

	@Override
	String toString(final CriteriaCtx ctx, final CriteriaEncoder criteriaEncoder) {
		return criteriaEncoder.encodeOperator(ctx, criterionOperator, dataFieldName, values);
	}

	@Override
	public Predicate<D> toPredicate() {
		return this::test;
	}

	private boolean test(final D entity) {
		final DataDefinition entitytDefinition = DataModelUtil.findDataDefinition(entity.getClass());
		final DataField dtField = entitytDefinition.getField(dataFieldName);

		final Object value = dtField.getDataAccessor().getValue(entity);
		final Serializable[] criterionValues = new Serializable[values.length];
		for (int i = 0; i < values.length; i++) {
			final Serializable criterionValue = values[i];
			if (criterionValue instanceof String) {
				criterionValues[i] = valueOf(dtField.smartTypeDefinition().getBasicType(), (String) criterionValue);
			} else {
				criterionValues[i] = criterionValue;
			}
		}

		switch (criterionOperator) {
			case IS_NOT_NULL:
				return value != null;
			case IS_NULL:
				return value == null;
			case EQ:
				return Objects.equals(value, criterionValues[0]);
			case NEQ:
				return !Objects.equals(value, criterionValues[0]);
			//with Comparable(s)
			case GT:
				if (values[0] == null || value == null) {
					return false;
				}
				return ((Comparable) criterionValues[0]).compareTo(value) < 0;
			case GTE:
				if (values[0] == null || value == null) {
					return false;
				}
				return ((Comparable) criterionValues[0]).compareTo(value) <= 0;
			case LT:
				if (values[0] == null || value == null) {
					return false;
				}
				return ((Comparable) criterionValues[0]).compareTo(value) > 0;
			case LTE:
				if (values[0] == null || value == null) {
					return false;
				}
				return ((Comparable) criterionValues[0]).compareTo(value) >= 0;
			case BETWEEN:
				return testBetweenCase(value, criterionValues);
			//with String
			case STARTS_WITH:
				if (values[0] == null || value == null) {
					return false;
				}
				return String.class.cast(value).startsWith((String) values[0]);
			//with list of comparables
			case IN:
				return Arrays.asList(criterionValues).contains(value);
			default:
				throw new IllegalAccessError();
		}
	}

	private static boolean testBetweenCase(final Object value, final Serializable[] criterionValues) {
		if (value == null) {
			return false;
		}
		final CriterionLimit min = CriterionLimit.class.cast(criterionValues[0]);
		final CriterionLimit max = CriterionLimit.class.cast(criterionValues[1]);
		if (!min.isDefined() && !max.isDefined()) {
			return true;//there is no limit
		}
		boolean test = true;
		if (min.isDefined()) {
			if (min.isIncluded()) {
				test = test && min.getValue().compareTo(value) <= 0;
			} else {
				test = test && min.getValue().compareTo(value) < 0;
			}
		}
		if (max.isDefined()) {
			if (max.isIncluded()) {
				test = test && max.getValue().compareTo(value) >= 0;
			} else {
				test = test && max.getValue().compareTo(value) > 0;
			}
		}
		return test;
	}

	/**same as DtListPatternFilterUtil*/
	private static Serializable valueOf(final BasicType dataType, final String stringValue) {
		switch (dataType) {
			case Integer:
				return Integer.valueOf(stringValue);
			case Long:
				return Long.valueOf(stringValue);
			case BigDecimal:
				return new BigDecimal(stringValue);
			case Double:
				return Double.valueOf(stringValue);
			case LocalDate:
				return DateUtil.parseToLocalDate(stringValue, DATE_PATTERN);
			case Instant:
				return DateUtil.parseToInstant(stringValue, INSTANT_PATTERN);
			case Boolean:
				return Boolean.valueOf(stringValue);
			case String:
				return stringValue;
			case DataStream:
			default:
				throw new IllegalArgumentException("Type de données non comparable : " + dataType.name());
		}
	}
}
