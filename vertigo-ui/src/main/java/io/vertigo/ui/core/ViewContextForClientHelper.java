/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.ui.core;

import java.io.Serializable;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;

/**
 * Liste des couples (clé, object) enregistrés.
 * @author npiedeloup
 */
public final class ViewContextForClientHelper {

	public static final String CTX = "CTX";

	private final ViewContextMap viewContextMap;

	private final Map<String, Set<String>> keysForClient = new HashMap<>();
	private final Map<String, Map<String, Function<Serializable, String>>> valueTransformers = new HashMap<>();

	public ViewContextForClientHelper(final ViewContextMap viewContextMap) {
		this.viewContextMap = viewContextMap;
	}

	public ViewContextMap getFilteredViewContext() {
		return getFilteredViewContext(Collections.emptySet());
	}

	ViewContextMap getFilteredViewContext(final Set<String> subFilter) {
		final ViewContextMap viewContextMapForClient = new ViewContextMap();
		viewContextMapForClient.put(CTX, viewContextMap.get(CTX));
		for (final Map.Entry<String, Serializable> entry : viewContextMap.entrySet()) {
			final String key = entry.getKey();
			if (keysForClient.containsKey(key) && (subFilter.isEmpty() || subFilter.contains(key))) {
				if (entry.getValue() instanceof MapUiObject) {
					viewContextMapForClient.put(entry.getKey(), ((MapUiObject) entry.getValue()).mapForClient(keysForClient.get(key), valueTransformers.getOrDefault(key, Collections.emptyMap())));
				} else if (entry.getValue() instanceof AbstractUiListUnmodifiable) {
					//handle lists
					viewContextMapForClient.put(entry.getKey(), ((AbstractUiListUnmodifiable) entry.getValue()).listForClient(keysForClient.get(key), valueTransformers.getOrDefault(key, Collections.emptyMap())));
				} else if (entry.getValue() instanceof BasicUiListModifiable) {
					//handle lists modifiable
					viewContextMapForClient.put(entry.getKey(), ((BasicUiListModifiable) entry.getValue()).listForClient(keysForClient.get(key), valueTransformers.getOrDefault(key, Collections.emptyMap())));
				} else {
					// just copy it
					viewContextMapForClient.put(entry.getKey(), entry.getValue());
				}
			}
		}
		return viewContextMapForClient;
	}

	public void addKeyForClient(final String object, final String fieldName) {
		keysForClient.computeIfAbsent(object, k -> new HashSet<>()).add(fieldName);
	}

	public void addListValueTransformer(final String objectKey, final String objectFieldName, final String listKey, final String listKeyFieldName, final String listDisplayFieldName) {
		valueTransformers.computeIfAbsent(objectKey, k -> new HashMap<>()).put(objectFieldName,
				(value) -> ((AbstractUiListUnmodifiable) viewContextMap.getUiList(listKey)).getById(listKeyFieldName, value).getString(listDisplayFieldName));
	}

	public void addKeyForClient(final String object) {
		keysForClient.put(object, Collections.emptySet());// notmodifiable because used only for primitives
	}

}
