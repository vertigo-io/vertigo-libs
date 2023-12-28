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
package io.vertigo.datafactory.impl.search.loader;

import java.io.Serializable;
import java.time.Instant;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.Tuple;
import io.vertigo.datafactory.search.definitions.SearchChunk;
import io.vertigo.datafactory.search.definitions.SearchLoader;
import io.vertigo.datamodel.structure.definitions.DtDefinition;
import io.vertigo.datamodel.structure.definitions.DtField;
import io.vertigo.datamodel.structure.definitions.DtFieldName;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.datamodel.structure.model.KeyConcept;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.util.DtObjectUtil;

/**
 * Abstract SearchLoader with default chunk implementation.
 * @author npiedeloup
 * @param <K> KeyConcept type
 * @param <I> Index type
 */
public abstract class AbstractSearchLoader<K extends KeyConcept, I extends DtObject> implements
		SearchLoader<K, I> {

	/** {@inheritDoc} */
	@Override
	public final Iterable<SearchChunk<K>> chunk(final Class<K> keyConceptClass) {
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(keyConceptClass);
		final DtField idField = dtDefinition.getIdField().get();
		final Serializable firstId = getLowestIteratorValue(idField, dtDefinition);

		return () -> createIterator(firstId, false, dtDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public final Iterable<SearchChunk<K>> chunk(final Optional<Serializable> startValue, final Class<K> keyConceptClass) {
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(keyConceptClass);
		final DtField versionField = getVersionField(dtDefinition);

		return () -> createIterator(startValue.orElse(getLowestIteratorValue(versionField, dtDefinition)), true, dtDefinition);
	}

	public DtField getVersionField(final DtDefinition dtDefinition) {
		if (getVersionFieldName().isEmpty()) {
			return dtDefinition.getIdField().get();
		}
		return dtDefinition.getField(getVersionFieldName().get());
	}

	/**
	 * Load uris of next chunk.
	 * @param lastValue Last chunk value
	 * @param orderByVersion Order chunk by version or by id (if versionFieldName not empty, we could crawl data by version or by id)
	 * @param dtDefinition KeyConcept definition
	 * @return Uris of next chunk.
	 */
	protected abstract List<Tuple<UID<K>, Serializable>> loadNextURI(final Serializable lastValue, final boolean orderByVersion, final DtDefinition dtDefinition);

	/** {@inheritDoc} */
	@Override
	public Optional<DtFieldName<K>> getVersionFieldName() {
		return Optional.empty(); //Overridable
	}

	private Serializable getLowestIteratorValue(final DtField iteratorField, final DtDefinition dtDefinition) {
		Assertion.check().isTrue(
				iteratorField.smartTypeDefinition().getScope().isBasicType(),
				"Field use for iterate must be primitives : iteratorField '{0}' on dtDefinition '{1}' has the smartType '{2}'", dtDefinition, iteratorField.name(), iteratorField.smartTypeDefinition());
		//---

		final BasicType iteratorFieldDataType = iteratorField.smartTypeDefinition().getBasicType();
		return switch (iteratorFieldDataType) {
			case Integer -> Integer.valueOf(-1);
			case Long -> Long.valueOf(-1);
			case Instant -> Instant.ofEpochMilli(0);
			case String -> "";
			case BigDecimal, DataStream, Boolean, Double, LocalDate -> throw new IllegalArgumentException("Type's iteratorField " + iteratorFieldDataType.name() + " of "
					+ dtDefinition.getClassSimpleName() + " is not supported, prefer int, long, Instant or String.");
		};
	}

	private Iterator<SearchChunk<K>> createIterator(final Serializable firstValue, final boolean orderByVersion, final DtDefinition dtDefinition) {
		return new Iterator<>() {
			private SearchChunk<K> current;
			private SearchChunk<K> next = firstChunk();

			/** {@inheritDoc} */
			@Override
			public boolean hasNext() {
				if (next == null) {
					next = nextChunk(current);
				}
				return !next.getAllUIDs().isEmpty();
			}

			/** {@inheritDoc} */
			@Override
			public SearchChunk<K> next() {
				if (!hasNext()) {
					throw new NoSuchElementException("no next chunk found");
				}
				current = next;
				next = null;
				return current;
			}

			private SearchChunk<K> nextChunk(final SearchChunk<K> previousChunk) {
				final Serializable lastValue = previousChunk.getLastValue();
				// call loader service
				final List<Tuple<UID<K>, Serializable>> uris = loadNextURI(lastValue, orderByVersion, dtDefinition);
				return new SearchChunk<>(uris, getLastValue(uris));
			}

			private SearchChunk<K> firstChunk() {
				// call loader service
				final List<Tuple<UID<K>, Serializable>> uris = loadNextURI(firstValue, orderByVersion, dtDefinition);
				return new SearchChunk<>(uris, getLastValue(uris));
			}

			private Serializable getLastValue(final List<Tuple<UID<K>, Serializable>> uris) {
				Serializable nextLastValue;
				if (!uris.isEmpty()) {
					Tuple<UID<K>, Serializable> lastElement;
					lastElement = uris.get(uris.size() - 1);
					nextLastValue = orderByVersion ? lastElement.val2() : lastElement.val1().getId();
				} else {
					nextLastValue = null;
				}
				return nextLastValue;
			}

		};
	}
}
