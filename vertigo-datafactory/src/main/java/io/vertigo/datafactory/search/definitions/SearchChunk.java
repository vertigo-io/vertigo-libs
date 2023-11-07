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
package io.vertigo.datafactory.search.definitions;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.datamodel.structure.model.KeyConcept;
import io.vertigo.datamodel.structure.model.UID;

/**
 * Chunk of keyConcept uris.
 * @author npiedeloup, pchretien
 * @param <K> the type of the KeyConcept
 * @param <P> the type of the version field value
 */
public final class SearchChunk<K extends KeyConcept> {
	private final Serializable lastValue;
	private final List<Tuple<UID<K>, Serializable>> uids;

	/**
	 * @param uids the list of keyConcept uids with version
	 * @param lastValue the list of keyConcept uids
	 */
	public SearchChunk(final List<Tuple<UID<K>, Serializable>> uids, final Serializable lastValue) {
		Assertion.check().isNotNull(uids);
		//---
		this.uids = Collections.unmodifiableList(uids); // pas de clone pour l'instant
		this.lastValue = lastValue;
	}

	/**
	 * @return All KeyConcept's uids of this chunk
	 */
	public List<UID<K>> getAllUIDs() {
		return uids.stream().map(Tuple::val1).toList();
	}

	/**
	 * @return Last iterator value
	 */
	public Serializable getLastValue() {
		Assertion.check().isNotNull(lastValue, "This SearchChunck wasn't created for rolling indexations. Check used constructor and set lastValue of this chunk.");
		return lastValue;
	}

	/**
	 * @return Tuple of modified elements based on version value, and set of removed uid
	 */
	public Tuple<SearchChunk<K>, Set<UID<K>>> compare(final Map<UID<K>, Serializable> indexedVersions) {
		final List<Tuple<UID<K>, Serializable>> modifiedUids = new ArrayList<>();
		final Set<UID<K>> removedUids = indexedVersions.keySet();
		for (final Tuple<UID<K>, Serializable> uid : uids) {
			final Serializable version = indexedVersions.get(uid.val1());
			if (version != null) {
				removedUids.remove(uid.val1()); //element found
				if (!version.equals(uid.val2())) {
					modifiedUids.add(uid); // element modified
				}
			} else {
				modifiedUids.add(uid); // added element
			}
		}
		return Tuple.of(new SearchChunk<>(modifiedUids, lastValue), removedUids);
	}
}
