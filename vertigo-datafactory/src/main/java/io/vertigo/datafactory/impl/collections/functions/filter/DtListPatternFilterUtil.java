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
package io.vertigo.datafactory.impl.collections.functions.filter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.util.DateUtil;
import io.vertigo.datafactory.collections.model.IndexType;
import io.vertigo.datamodel.criteria.CriterionLimit;
import io.vertigo.datamodel.criteria.Criterions;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;

/**
 * Parser des filtres utilisant une syntaxe définie.
 */
public final class DtListPatternFilterUtil {
	private static final String DATE_PATTERN = "dd/MM/yyyy";

	private static final Map<String, Pattern> TOKENIZED_INDEX_TYPES = new HashMap<>();

	static {
		TOKENIZED_INDEX_TYPES.put("sep_comma", Pattern.compile("\\s*,\\s*"));
		TOKENIZED_INDEX_TYPES.put("sep_pipe", Pattern.compile("\\s*\\|\\s*"));
		TOKENIZED_INDEX_TYPES.put("text_fr", Pattern.compile("[\\s\\p{Punct}]+"));
		TOKENIZED_INDEX_TYPES.put("sep_punct", Pattern.compile("\\s*\\p{Punct}+\\s*"));
	}

	/**
	 * Pattern types : Range or Term.
	 */
	public enum FilterPattern {
		/** range. */
		Range("([a-z][a-zA-Z0-9]*):([\\[\\{\\]])(.*) TO (.*)([\\]\\}\\[])"), //[] : include, ][ or {} : exclude
		/** term. */
		Term("([a-z][a-zA-Z0-9]*):\"(.*)\"");

		private final Pattern pattern;

		FilterPattern(final String patternString) {
			pattern = Pattern.compile(patternString);
		}

		Pattern getPattern() {
			return pattern;
		}
	}

	/**
	 * Constructor.
	 */
	private DtListPatternFilterUtil() {
		//private constructor
	}

	static <D extends DataObject> Predicate<D> createDtListFilterForPattern(final FilterPattern filterPattern, final String[] parsedFilter, final DataDefinition dataDefinition) {
		Assertion.check()
				.isNotNull(filterPattern)
				.isNotNull(parsedFilter)
				.isNotNull(dataDefinition);
		//-----
		//Si on trouve un pattern, on passe sur du code spécifique
		final String fieldName = parsedFilter[1]; //attention parsedFilter[0] = filtre entier
		final DataField dtField = dataDefinition.getField(fieldName);
		Assertion.check().isTrue(dtField.smartTypeDefinition().getScope().isBasicType(), "Only primitive types can be used in pattern");
		final BasicType dataType = dtField.smartTypeDefinition().getBasicType();

		return switch (filterPattern) {
			case Range -> createDtListRangeFilter(parsedFilter, fieldName, dataType);
			case Term -> createDtListTermFilter(parsedFilter, fieldName, dataType, dtField);
			default -> throw new VSystemException("La chaine de filtrage: {0} , ne respecte pas la syntaxe {1}.", parsedFilter[0], filterPattern.getPattern().pattern());
		};
	}

	/**
	 * Retourne les éléments parsés du filtre.
	 * index 0 : filtre d'origine.
	 * index 1 : nom du champs (par convention)
	 * ensuite dépend du pattern
	 * 
	 * @param filterString Filter string to parse
	 * @param parsingPattern Pattern use to parse
	 * @return Resulting String array (Optional)
	 **/
	public static Optional<String[]> parseFilter(final String filterString, final Pattern parsingPattern) {
		Assertion.check()
				.isNotNull(filterString)
				.isNotNull(parsingPattern);
		//-----
		final Matcher matcher = parsingPattern.matcher(filterString);
		if (!matcher.matches()) {
			return Optional.empty();
		}

		final int nbGroup = matcher.groupCount() + 1;
		final String[] groups = new String[nbGroup];
		for (int i = 0; i < nbGroup; i++) {
			groups[i] = matcher.group(i);
		}
		return Optional.of(groups);
	}

	/**
	 * Retourne true si le type d'index est un type d'index tokenisé (ex: sep_comma, sep_pipe:facetable...).
	 * 
	 * @param smartTypeDefinition SmartType à tester
	 * @return true si le type d'index est un type d'index tokenisé, false sinon
	 */
	public static boolean isTokenizedIndexType(final SmartTypeDefinition smartTypeDefinition) {
		Assertion.check().isNotNull(smartTypeDefinition);
		return IndexType.readIndexType(smartTypeDefinition)
				.getIndexAnalyzer()
				.map(TOKENIZED_INDEX_TYPES::containsKey)
				.orElse(false);
	}

	/**
	 * Retourne les tokens d'une valeur d'index tokenisé.
	 * 
	 * @param smartTypeDefinition SmartType (ex: sep_comma, sep_pipe:facetable...)
	 * @param value Valeur à tokeniser
	 * @return Tableau de tokens
	 */
	public static String[] tokenizedIndexValue(final SmartTypeDefinition smartTypeDefinition, final Object value) {
		Assertion.check().isNotNull(smartTypeDefinition);
		final String indexAnalyzer = IndexType.readIndexType(smartTypeDefinition).getIndexAnalyzer().orElse(null);
		final Pattern pattern = TOKENIZED_INDEX_TYPES.get(indexAnalyzer);
		Assertion.check().isNotNull(pattern, "IndexType {0} is not tokenized", smartTypeDefinition.getName());
		if (value == null) {
			return new String[0];
		}
		return pattern.split(String.valueOf(value));
	}

	private static <D extends DataObject> Predicate<D> createDtListTermFilter(final String[] parsedFilter, final String fieldName, final BasicType dataType, final DataField dtField) {
		final SmartTypeDefinition smartTypeDefinition = dtField.smartTypeDefinition();
		if (isTokenizedIndexType(smartTypeDefinition)) {
			return createDtListTermTokenizedFilter(parsedFilter, dtField, dataType, smartTypeDefinition);
		}
		return createDtListTermKeywordFilter(parsedFilter, fieldName, dataType);
	}

	private static <D extends DataObject> Predicate<D> createDtListTermKeywordFilter(final String[] parsedFilter, final String fieldName, final BasicType dataType) {
		final Serializable filterValue = convertToValue(parsedFilter[2], dataType, false);
		final Predicate predicate;
		if (filterValue != null) {
			predicate = Criterions.isEqualTo(() -> fieldName, filterValue).toPredicate();
		} else {
			predicate = Criterions.isNotNull(() -> fieldName).toPredicate();
		}
		return predicate;
	}

	private static <D extends DataObject> Predicate<D> createDtListTermTokenizedFilter(final String[] parsedFilter, final DataField dtField, final BasicType dataType, final SmartTypeDefinition smartTypeDefinition) {
		Assertion.check().isTrue(dataType == BasicType.String, "Only String types can be used with tokenized indexType");

		final String filterValue = parsedFilter[2];
		return (final D item) -> {
			final Object value = dtField.getDataAccessor().getValue(item);

			if (!(value instanceof String)) {
				return false;
			}

			for (final String subValue : tokenizedIndexValue(smartTypeDefinition, value)) {
				if (filterValue.equals(subValue)) {
					return true;
				}
			}

			return false;
		};
	}

	private static <D extends DataObject> Predicate<D> createDtListRangeFilter(
			final String[] parsedFilter,
			final String fieldName,
			final BasicType dataType) {
		final boolean minIncluded = "[".equals(parsedFilter[2]);
		final Serializable minValue = convertToValue(parsedFilter[3], dataType, true);
		final Serializable maxValue = convertToValue(parsedFilter[4], dataType, true);
		final boolean maxIncluded = "]".equals(parsedFilter[5]);

		final CriterionLimit min = minIncluded ? CriterionLimit.ofIncluded(minValue) : CriterionLimit.ofExcluded(minValue);
		final CriterionLimit max = maxIncluded ? CriterionLimit.ofIncluded(maxValue) : CriterionLimit.ofExcluded(maxValue);
		return Criterions.isBetween(() -> fieldName, min, max).toPredicate();
	}

	private static Serializable convertToValue(final String valueToConvert, final BasicType dataType, final boolean acceptJoker) {
		final String stringValue = valueToConvert.trim();
		if (acceptJoker && "*".equals(stringValue) || "".equals(stringValue)) {
			return null;//pas de test
		}
		//--
		return valueOf(dataType, stringValue);
	}

	/** Same as Criterion. */
	private static Serializable valueOf(final BasicType dataType, final String stringValue) {
		return switch (dataType) {
			case Integer -> Integer.valueOf(stringValue);
			case Long -> Long.valueOf(stringValue);
			case BigDecimal -> new BigDecimal(stringValue);
			case Double -> Double.valueOf(stringValue);
			case LocalDate -> DateUtil.parseToLocalDate(stringValue, DATE_PATTERN);
			case Instant -> DateUtil.parseToInstant(stringValue, DATE_PATTERN);
			case String -> stringValue;
			case Boolean, DataStream -> throw new IllegalArgumentException("Type de données non comparable : " + dataType.name());
			default -> throw new IllegalArgumentException("Type de données non comparable : " + dataType.name());
		};
	}

}
