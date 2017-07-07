/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.workflow.plugin;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.stream.Collectors;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.impl.workflow.ItemStorePlugin;

/**
 *
 * @author xdurand
 *
 */
public class MemoryItemStorePlugin implements ItemStorePlugin {

	private final Map<Long, DtObject> inMemoryItemStore = new ConcurrentHashMap<>();

	@Override
	public void addItem(final Long itemId, final DtObject item) {
		inMemoryItemStore.put(itemId, item);
	}

	@Override
	public DtObject readItem(final Long itemId) {
		return inMemoryItemStore.get(itemId);
	}

	@Override
	public Map<Long, DtObject> readItems(List<Long> itemIds) {
		return itemIds.stream()
				.collect(
						Collectors.toMap(Function.identity(), this::readItem));
	}

}
