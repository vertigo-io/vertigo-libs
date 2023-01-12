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
package io.vertigo.account.impl.authorization.dsl.translator;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.account.authorization.definitions.SecurityDimension;
import io.vertigo.account.authorization.definitions.rulemodel.RuleExpression;
import io.vertigo.account.authorization.definitions.rulemodel.RuleExpression.ValueOperator;
import io.vertigo.account.authorization.definitions.rulemodel.RuleFixedValue;
import io.vertigo.account.authorization.definitions.rulemodel.RuleMultiExpression;
import io.vertigo.account.authorization.definitions.rulemodel.RuleMultiExpression.BoolOperator;
import io.vertigo.account.authorization.definitions.rulemodel.RuleUserPropertyValue;
import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.criteria.Criteria;
import io.vertigo.datamodel.criteria.Criterions;
import io.vertigo.datamodel.structure.definitions.DtField;
import io.vertigo.datamodel.structure.definitions.DtFieldName;
import io.vertigo.datamodel.structure.model.Entity;

/**
 * Translate a security rule into a criteria to be used in SQL queries and as a Java predicate.
 *
 * @param <E> The type of entity we are protecting
 * @author npiedeloup
 */
public final class CriteriaSecurityRuleTranslator<E extends Entity> extends AbstractSecurityRuleTranslator<CriteriaSecurityRuleTranslator<E>> {

	/**
	 * @return This security rule as search Query
	 */
	public Criteria<E> toCriteria() {
		Criteria<E> mainCriteria = null;
		for (final RuleMultiExpression expression : getMultiExpressions()) {
			mainCriteria = orCriteria(mainCriteria, toCriteria(expression));
		}
		//null if always true
		if (mainCriteria == null) {
			return Criterions.alwaysTrue();
		}
		return mainCriteria;
	}

	private Criteria<E> toCriteria(final RuleMultiExpression multiExpression) {
		if (multiExpression.isAlwaysTrue()) {
			return Criterions.alwaysTrue();
		}

		Criteria<E> mainCriteria = null;
		for (final RuleExpression expression : multiExpression.getExpressions()) {
			if (multiExpression.getBoolOperator() == BoolOperator.AND) {
				mainCriteria = andCriteria(mainCriteria, toCriteria(expression));
			} else {
				mainCriteria = orCriteria(mainCriteria, toCriteria(expression));
			}
		}
		for (final RuleMultiExpression expression : multiExpression.getMultiExpressions()) {
			if (multiExpression.getBoolOperator() == BoolOperator.AND) {
				mainCriteria = andCriteria(mainCriteria, toCriteria(expression));
			} else {
				mainCriteria = orCriteria(mainCriteria, toCriteria(expression));
			}
		}
		//null if always true
		return mainCriteria;
	}

	private Criteria<E> toCriteria(final RuleExpression expression) {
		if (expression.getValue() instanceof RuleUserPropertyValue) {
			final RuleUserPropertyValue userPropertyValue = (RuleUserPropertyValue) expression.getValue();
			final List<Serializable> userValues = getUserCriteria(userPropertyValue.getUserProperty());
			if (!userValues.isEmpty()) {
				Criteria<E> mainCriteria = null; //comment collecter en stream ?
				for (final Serializable userValue : userValues) {
					//userValue can be null : a user may don't have a key needed for some modules
					Assertion.check()
							.isNotNull(userValue, "Null security key : {0}={1}", userPropertyValue.getUserProperty(), userValues)
							.when(!userValue.getClass().isArray(), () -> Assertion.check()
									.isTrue(userValue instanceof Comparable,
											"Security keys must be serializable AND comparable (key : {0})", userValues.getClass().getSimpleName()))
							.when(userValue.getClass().isArray(), () -> Assertion.check()
									.isTrue(Comparable.class.isAssignableFrom(userValue.getClass().getComponentType()),
											"Security keys must be serializable AND comparable (key : {0})", userValue.getClass().getComponentType()));
					//----
					mainCriteria = orCriteria(mainCriteria, toCriteria(expression.getFieldName(), expression.getOperator(), userValue));
				}
				return mainCriteria;
			}
			return Criterions.alwaysFalse();
		} else if (expression.getValue() instanceof RuleFixedValue) {
			return toCriteria(expression.getFieldName(), expression.getOperator(), ((RuleFixedValue) expression.getValue()).getFixedValue());
		} else {
			throw new IllegalArgumentException("value type not supported " + expression.getValue().getClass().getName());
		}
	}

	private Criteria<E> toCriteria(final String fieldName, final ValueOperator operator, final Serializable value) {
		if (isSimpleSecurityField(fieldName)) {
			//field normal
			return toCriteria(fieldName::toString, operator, value);
		}
		final SecurityDimension securityDimension = getSecurityDimension(fieldName);
		switch (securityDimension.getType()) {
			case SIMPLE: //TODO not use yet ?
				return toCriteria(fieldName::toString, operator, value);
			case ENUM:
				Assertion.check().isTrue(value instanceof String, "Enum criteria must be a code String ({0})", value);
				//----
				return enumToCriteria(securityDimension, operator, String.class.cast(value));
			case TREE:
				return treeToCriteria(securityDimension, operator, value);
			default:
				throw new IllegalArgumentException("securityDimensionType not supported " + securityDimension.getType());
		}
	}

	private Criteria<E> toCriteria(final DtFieldName<E> fieldName, final ValueOperator operator, final Serializable value) {
		switch (operator) {
			case EQ:
				return Criterions.isEqualTo(fieldName, value);
			case GT:
				return Criterions.isGreaterThan(fieldName, value);
			case GTE:
				return Criterions.isGreaterThanOrEqualTo(fieldName, value);
			case LT:
				return Criterions.isLessThan(fieldName, value);
			case LTE:
				return Criterions.isLessThanOrEqualTo(fieldName, value);
			case NEQ:
				return Criterions.isNotEqualTo(fieldName, value);
			default:
				throw new IllegalArgumentException("Operator not supported " + operator.name());
		}
	}

	private Criteria<E> enumToCriteria(final SecurityDimension securityDimension, final ValueOperator operator, final String value) {
		final DtFieldName<E> fieldName = securityDimension::getName;
		switch (operator) {
			case EQ:
				return Criterions.isEqualTo(fieldName, value);
			case GT:
				return Criterions.in(fieldName, toStringArray(subValues(securityDimension.getValues(), false, value, false)));
			case GTE:
				return Criterions.in(fieldName, toStringArray(subValues(securityDimension.getValues(), false, value, true)));
			case LT:
				return Criterions.in(fieldName, toStringArray(subValues(securityDimension.getValues(), true, value, false)));
			case LTE:
				return Criterions.in(fieldName, toStringArray(subValues(securityDimension.getValues(), true, value, true)));
			case NEQ:
				return Criterions.isNotEqualTo(fieldName, value);
			default:
				throw new IllegalArgumentException("Operator not supported " + operator.name());
		}
	}

	private static Serializable[] toStringArray(final List<Serializable> subValues) {
		return subValues.toArray(new String[subValues.size()]);
	}

	private Criteria<E> treeToCriteria(final SecurityDimension securityDimension, final ValueOperator operator, final Serializable value) {
		Assertion.check().isTrue(value instanceof String[]
				|| value instanceof Integer[]
				|| value instanceof Long[], "Security TREE axe ({0}) must be set in UserSession as Arrays (current:{1})", securityDimension.getName(), value.getClass().getName());
		if (value instanceof String[]) {
			return treeToCriteria(securityDimension, operator, (String[]) value);
		} else if (value instanceof Integer[]) {
			return treeToCriteria(securityDimension, operator, (Integer[]) value);
		} else {
			return treeToCriteria(securityDimension, operator, (Long[]) value);
		}
	}

	private <K extends Serializable> Criteria<E> treeToCriteria(final SecurityDimension securityDimension, final ValueOperator operator, final K[] treeKeys) {
		//on vérifie qu'on a bien toutes les clées.
		final List<String> strDimensionfields = securityDimension.getFields().stream()
				.map(DtField::name)
				.collect(Collectors.toList());
		Assertion.check()
				.isTrue(strDimensionfields.size() <= treeKeys.length, "Entity security tree must have the same or at least the {0} firsts fields ({1}) of User securityKey {2}", strDimensionfields.size(), strDimensionfields, securityDimension.getName());
		//		.when(strDimensionfields.size() < treeKeys.length,
		//				() -> Assertion.check() //TODO a tester
		//				.isTrue(true,"When entity security tree have only the first field of user securityField, only operators '=', ' are accepted (can't use {0})", operator));
		Criteria<E> mainCriteria = null;

		//cas particuliers du == et du !=
		if (operator == ValueOperator.EQ) {
			for (int i = 0; i < strDimensionfields.size(); i++) {
				final DtFieldName<E> fieldName = strDimensionfields.get(i)::toString;
				mainCriteria = andCriteria(mainCriteria, Criterions.isEqualTo(fieldName, treeKeys[i]));
			}
		} else if (operator == ValueOperator.NEQ) {
			for (int i = 0; i < strDimensionfields.size(); i++) {
				final DtFieldName<E> fieldName = strDimensionfields.get(i)::toString;
				mainCriteria = andCriteria(mainCriteria, Criterions.isNotEqualTo(fieldName, treeKeys[i]));
			}
		} else { //cas des < , <= , > et >=
			//le < signifie au-dessus dans la hierachie et > en-dessous

			//on détermine le dernier field non null du user, les règles pivotent sur ce point là
			//au max le dernier index de clé dans l'entity
			final int lastIndexNotNull = Math.min(strDimensionfields.size() - 1, lastIndexNotNull(treeKeys));

			//1- règles avant le point de pivot : 'Eq' pout tous les opérateurs
			for (int i = 0; i < lastIndexNotNull; i++) {
				final DtFieldName<E> fieldName = strDimensionfields.get(i)::toString;
				mainCriteria = andCriteria(mainCriteria, Criterions.isEqualTo(fieldName, treeKeys[i]));
			}

			//2- règles pour le point de pivot
			if (lastIndexNotNull >= 0) {
				final DtFieldName<E> fieldName = strDimensionfields.get(lastIndexNotNull)::toString;
				switch (operator) {
					case GT:
						//pour > : doit être null (car non inclus)
						mainCriteria = andCriteria(mainCriteria, Criterions.isNull(fieldName));
						break;
					case GTE:
						//pour >= : doit être égale à la clé du user ou null (supérieur)
						final Criteria<E> equalsCriteria = Criterions.isEqualTo(fieldName, treeKeys[lastIndexNotNull]);
						final Criteria<E> greaterCriteria = Criterions.isNull(fieldName);
						final Criteria<E> gteCriteria = greaterCriteria.or(equalsCriteria);
						mainCriteria = andCriteria(mainCriteria, gteCriteria);
						break;
					case LT:
					case LTE:
						//pour < et <= on test l'égalité
						mainCriteria = andCriteria(mainCriteria, Criterions.isEqualTo(fieldName, treeKeys[lastIndexNotNull]));
						break;
					case EQ:
					case NEQ:
					default:
						throw new IllegalArgumentException("Operator not supported " + operator.name());
				}
			}

			//3- règles après le point de pivot (les null du user donc)
			for (int i = lastIndexNotNull + 1; i < strDimensionfields.size(); i++) {
				final DtFieldName<E> fieldName = strDimensionfields.get(i)::toString;
				switch (operator) {
					case GT:
					case GTE:
						//pour > et >= on test l'égalité (isNull donc)
						mainCriteria = andCriteria(mainCriteria, Criterions.isNull(fieldName));
						break;
					case LT:
						//pout < : le premier non null, puis pas de filtre : on accepte toutes valeurs
						if (i == lastIndexNotNull + 1) {
							mainCriteria = andCriteria(mainCriteria, Criterions.isNotNull(fieldName));
						}
						break;
					case LTE:
						//pour <= : pas de filtre on accepte toutes valeurs
						break;
					case EQ:
					case NEQ:
					default:
						throw new IllegalArgumentException("Operator not supported " + operator.name());
				}
			}
		}
		//can be null if <= et
		return mainCriteria;
	}

	private Criteria<E> andCriteria(final Criteria<E> oldCriteria, final Criteria<E> newCriteria) {
		if (oldCriteria == null) {
			return newCriteria;
		}
		return oldCriteria.and(newCriteria);
	}

	private Criteria<E> orCriteria(final Criteria<E> oldCriteria, final Criteria<E> newCriteria) {
		if (oldCriteria == null) {
			return newCriteria;
		}
		return oldCriteria.or(newCriteria);
	}
}
