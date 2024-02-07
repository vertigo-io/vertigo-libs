/*
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
package io.vertigo.account.impl.account;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Pattern;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.data.definitions.DataDefinition;

/**
 * @author npiedeloup
 * @param <S> Source type
 * @param <D> Destination type
 */
public final class AccountMapperHelper<S, D> {
	private static final Pattern ATTRIBUTES_PATTERN = Pattern.compile("\\s*,\\s*");
	private static final Pattern ATTRIBUTE_VALUE_PATTERN = Pattern.compile("\\s*:\\s*");

	private final Optional<DataDefinition> sourceDataDefinition;
	private final Optional<Class<? extends Enum>> destEnum;
	private final Optional<DataDefinition> destDataDefinition;

	private final String sourceToDestMappingStr;
	private final Set<String> reservedDestField = new HashSet<>();
	private final Set<D> mandatoryDestField = new HashSet<>();

	private final Map<D, S> destToSourceMapping = new HashMap<>(); //DestAttribute from SourceAttribute
	private final Map<String, S> reservedToSourceMapping = new HashMap<>(); //reservedField from SourceAttribute

	/**
	 * Constructor.
	 * @param destDataDefinition Destination dataDefinition
	 * @param sourceToDestMappingStr source to dest mapping
	 */
	public AccountMapperHelper(final DataDefinition destDataDefinition, final String sourceToDestMappingStr) {
		sourceDataDefinition = Optional.empty();
		destEnum = Optional.empty();
		this.destDataDefinition = Optional.of(destDataDefinition);
		this.sourceToDestMappingStr = sourceToDestMappingStr;
	}

	/**
	 * Constructor.
	 * @param sourceDataDefinition Source dataDefinition
	 * @param destEnum Destination enum
	 * @param sourceToDestMappingStr source to dest mapping
	 */
	public AccountMapperHelper(final DataDefinition sourceDataDefinition, final Class<? extends Enum> destEnum, final String sourceToDestMappingStr) {
		this.sourceDataDefinition = Optional.of(sourceDataDefinition);
		this.destEnum = Optional.of(destEnum);
		destDataDefinition = Optional.empty();
		this.sourceToDestMappingStr = sourceToDestMappingStr;
	}

	public AccountMapperHelper<S, D> withReservedDestField(final String... fieldNames) {
		Assertion.check().isNotNull(fieldNames);
		//-----
		reservedDestField.addAll(Arrays.asList(fieldNames));
		return this;
	}

	public AccountMapperHelper<S, D> withMandatoryDestField(final D... fields) {
		Assertion.check().isNotNull(fields);
		//-----
		mandatoryDestField.addAll(Arrays.asList(fields));
		return this;
	}

	public AccountMapperHelper<S, D> parseAttributeMapping() {
		for (final String mapping : ATTRIBUTES_PATTERN.split(sourceToDestMappingStr)) {
			final String[] splitedMapping = ATTRIBUTE_VALUE_PATTERN.split(mapping);
			Assertion.check()
					.isTrue(splitedMapping.length == 2,
							"Mapping should respect the pattern sourceFields:destFields :(like sourceAttr1:destAttr1, sourceAttr2:destAttr2, ... (check : {0})", sourceToDestMappingStr)
					.when(sourceDataDefinition.isPresent(), () -> Assertion.check()
							.isTrue(sourceDataDefinition.get().contains(splitedMapping[1]), "sourceField {0} must be in DtDefinition {1}", splitedMapping[1], sourceDataDefinition.orElse(null)));
			//It's reverse compared to config String : we keep a map of key:destAttribute -> value:sourceAttribute
			final S source;
			if (sourceDataDefinition.isPresent()) {
				source = (S) sourceDataDefinition.get().getField(splitedMapping[1]);
			} else {
				source = (S) splitedMapping[1];
			}
			if (!reservedDestField.contains(splitedMapping[0])) {
				Assertion.check()
						.when(destDataDefinition.isPresent(), () -> Assertion.check()
								.isTrue(destDataDefinition.get().contains(splitedMapping[0]), "destField {0} must be in DtDefinition {1}", splitedMapping[0], destDataDefinition.orElse(null)));
				final D dest;
				if (destDataDefinition.isPresent()) {
					dest = (D) destDataDefinition.get().getField(splitedMapping[0]);
				} else if (destEnum.isPresent()) {
					dest = (D) Enum.valueOf(destEnum.get(), splitedMapping[0]);
				} else {
					dest = (D) splitedMapping[0];
				}

				destToSourceMapping.put(dest, source);
			} else {
				reservedToSourceMapping.put(splitedMapping[0], source);
			}
		}
		for (final D destField : mandatoryDestField) {
			Assertion.check().isNotNull(destToSourceMapping.get(destField), "Mapping must declare mapping for destProperty {0}" + destField);
		}

		return this;
	}

	public Collection<D> destAttributes() {
		return destToSourceMapping.keySet();
	}

	public Collection<S> sourceAttributes() {
		return destToSourceMapping.values();
	}

	public S getSourceAttribute(final D dest) {
		return destToSourceMapping.get(dest);
	}

	public S getReservedSourceAttribute(final String reservedField) {
		return reservedToSourceMapping.get(reservedField);
	}

	public DataDefinition getDestDefinition() {
		return destDataDefinition.get();
	}

	public S getSourceIdField() {
		Assertion.check().isTrue(destDataDefinition.isPresent() || sourceDataDefinition.isPresent(), "Can't determine id field, if nor source nor dest are Entity");
		if (destDataDefinition.isPresent() && destDataDefinition.get().getIdField().isPresent()) {
			return getSourceAttribute((D) destDataDefinition.get().getIdField().get());
		} else if (sourceDataDefinition.isPresent()) {
			Assertion.check().isTrue(sourceDataDefinition.get().getIdField().isPresent(), "Can't determine id field, if nor source nor dest are Entity");
			return (S) sourceDataDefinition.get().getIdField().get();
		}
		throw new IllegalArgumentException("Can't determine id field, if nor source nor dest are Entity");
	}

}
