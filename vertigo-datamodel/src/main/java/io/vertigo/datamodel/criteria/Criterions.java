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
import java.util.function.Predicate;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.model.DataObject;

/**
 *
 * This class provides criterions (aka where clause) for a field of an entity.
 *
 * @author pchretien
 *
 */
public final class Criterions {
	private Criterions() {
		//stateless
	}

	/**
	 * @param dtFieldName the field
	 * @return is null
	 */
	public static <D extends DataObject> Criteria<D> isNull(final DataFieldName<D> dtFieldName) {
		return new Criterion<>(dtFieldName, CriterionOperator.IS_NULL);
	}

	/**
	 * @param dtFieldName the field
	 * @return is not null
	 */
	public static <D extends DataObject> Criteria<D> isNotNull(final DataFieldName<D> dtFieldName) {
		return new Criterion<>(dtFieldName, CriterionOperator.IS_NOT_NULL);
	}

	/**
	 * @param dtFieldName the field
	 * @return is equal to the value
	 * @param value the value
	 */
	public static <D extends DataObject> Criteria<D> isEqualTo(final DataFieldName<D> dtFieldName, final Serializable value) {
		return new Criterion<>(dtFieldName, CriterionOperator.EQ, value);
	}

	/**
	 * @param dtFieldName the field
	 * @return is not equal to the value
	 * @param value the value
	 */
	public static <D extends DataObject> Criteria<D> isNotEqualTo(final DataFieldName<D> dtFieldName, final Serializable value) {
		return new Criterion<>(dtFieldName, CriterionOperator.NEQ, value);
	}

	/**
	 * @param dtFieldName the field
	 * @return is greater than the value
	 * @param value the value
	 */
	public static <D extends DataObject> Criteria<D> isGreaterThan(final DataFieldName<D> dtFieldName, final Serializable value) {
		Assertion.check().isTrue(value == null || value instanceof Comparable, "value must be comparable");
		//---
		return new Criterion<>(dtFieldName, CriterionOperator.GT, value);
	}

	/**
	 * @param dtFieldName the field
	 * @return is greater than or equal to the value
	 * @param value the value
	 */
	public static <D extends DataObject> Criteria<D> isGreaterThanOrEqualTo(final DataFieldName<D> dtFieldName, final Serializable value) {
		Assertion.check().isTrue(value == null || value instanceof Comparable, "value must be comparable");
		//---
		return new Criterion<>(dtFieldName, CriterionOperator.GTE, value);
	}

	/**
	 * @param dtFieldName the field
	 * @return is less than the value
	 * @param value the value
	 */
	public static <D extends DataObject> Criteria<D> isLessThan(final DataFieldName<D> dtFieldName, final Serializable value) {
		Assertion.check().isTrue(value == null || value instanceof Comparable, "value must be comparable");
		//---
		return new Criterion<>(dtFieldName, CriterionOperator.LT, value);
	}

	/**
	 * @param dtFieldName the field
	 * @return is less than or equal to the value
	 * @param value the value
	 */
	public static <D extends DataObject> Criteria<D> isLessThanOrEqualTo(final DataFieldName<D> dtFieldName, final Serializable value) {
		Assertion.check().isTrue(value == null || value instanceof Comparable, "value must be comparable");
		//---
		return new Criterion<>(dtFieldName, CriterionOperator.LTE, value);
	}

	/**
	 * @param dtFieldName the field
	 * @return starts with the value
	 * @param value the value
	 */
	public static <D extends DataObject> Criteria<D> startsWith(final DataFieldName<D> dtFieldName, final String value) {
		return new Criterion<>(dtFieldName, CriterionOperator.STARTS_WITH, value);
	}

	/**
	 * @param dtFieldName the field
	 * @return is between min and max
	 * @param min the min value
	 * @param max the max value
	 */
	public static <D extends DataObject> Criteria<D> isBetween(final DataFieldName<D> dtFieldName, final CriterionLimit<D> min, final CriterionLimit<D> max) {
		Assertion.check()
				.isNotNull(min)
				.isNotNull(max);
		return new Criterion<>(dtFieldName, CriterionOperator.BETWEEN, min, max);
	}

	/**
	 * @param dtFieldName the field
	 * @return is in a list of values
	 * @param values list of allowed values
	 */
	public static <D extends DataObject> Criteria<D> in(final DataFieldName<D> dtFieldName, final Serializable... values) {
		return new Criterion<>(dtFieldName, CriterionOperator.IN, values);
	}

	/**
	 * An always true criteria.
	 * @return true
	 */
	public static <D extends DataObject> Criteria<D> alwaysTrue() {
		return AlwaysCriteria.ALWAYS_TRUE;
	}

	/**
	 * An always false criteria.
	 * @return true
	 */
	public static <D extends DataObject> Criteria<D> alwaysFalse() {
		return AlwaysCriteria.ALWAYS_FALSE;
	}

	private static class AlwaysCriteria<D extends DataObject> extends Criteria<D> {
		private static final long serialVersionUID = 2967018427662007659L;
		private static final Criteria ALWAYS_TRUE = new AlwaysCriteria<>(true);
		private static final Criteria ALWAYS_FALSE = new AlwaysCriteria<>(false);
		private final boolean result;

		private AlwaysCriteria(final boolean result) {
			this.result = result;
		}

		@Override
		public Predicate<D> toPredicate() {
			return entity -> result;
		}

		@Override
		String toString(final CriteriaCtx ctx, final CriteriaEncoder criteriaEncoder) {
			return result ? "1=1" : "0=1";
		}

		@Override
		public String toString() {
			return result ? "true" : "false";
		}
	}
}
