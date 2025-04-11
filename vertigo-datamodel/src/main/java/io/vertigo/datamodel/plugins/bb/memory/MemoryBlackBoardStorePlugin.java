/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.datamodel.plugins.bb.memory;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.param.ParamValue;
import io.vertigo.datamodel.bb.BBKey;
import io.vertigo.datamodel.bb.BBKeyPattern;
import io.vertigo.datamodel.bb.BBType;
import io.vertigo.datamodel.bb.BlackBoardManager;
import io.vertigo.datamodel.impl.bb.BlackBoardStorePlugin;

public final class MemoryBlackBoardStorePlugin implements BlackBoardStorePlugin {
	private final Map<BBKey, BBType> keys = Collections.synchronizedMap(new LinkedHashMap<>());
	private final Map<BBKey, Object> values = Collections.synchronizedMap(new LinkedHashMap<>());
	private final Map<BBKey, BBList> lists = Collections.synchronizedMap(new LinkedHashMap<>());

	private final Optional<String> storeNameOpt;

	@Inject
	public MemoryBlackBoardStorePlugin(final @ParamValue("storeName") Optional<String> storeNameOpt) {
		Assertion.check()
				.isNotNull(storeNameOpt);
		// ---
		this.storeNameOpt = storeNameOpt;
	}

	//------------------------------------
	//--- Keys
	//------------------------------------
	@Override
	public boolean keysExists(final BBKey key) {
		Assertion.check().isNotNull(key);
		// ---
		return keys.containsKey(key);
	}

	@Override
	public Set<BBKey> keysFindAll(final BBKeyPattern keyPattern) {
		Assertion.check().isNotNull(keyPattern);
		final var keyPatternString = keyPattern.keyPattern();
		//---
		if ("/*".equals(keyPatternString)) {
			return keys();
		}
		if (keyPatternString.endsWith("*")) {
			final var prefix = keyPatternString.replaceAll("\\*", "");
			return keys.keySet().stream()
					.filter(s -> s.key().startsWith(prefix))
					.collect(Collectors.toSet());
		}
		final var key = BBKey.of(keyPatternString);
		return keys.containsKey(key)
				? Set.of(key)
				: Collections.emptySet();
	}

	private Set<BBKey> keys() {
		return keys.keySet();
	}

	@Override
	public void keysDeleteAll(final BBKeyPattern keyPattern) {
		Assertion.check().isNotNull(keyPattern);
		final var keyPatternString = keyPattern.keyPattern();
		if ("/*".equals(keyPatternString)) {
			values.clear();
			keys.clear();
			lists.clear();
		} else if (keyPatternString.endsWith("*")) {
			final var prefix = keyPatternString.replaceAll("\\*", "");
			values.keySet().removeIf(s -> s.key().startsWith(prefix));
			lists.keySet().removeIf(s -> s.key().startsWith(prefix));
			keys.keySet().removeIf(s -> s.key().startsWith(prefix));
		} else {
			final var key = BBKey.of(keyPatternString);
			values.remove(key);
			lists.remove(key);
			keys.remove(key);
		}
	}

	//------------------------------------
	//--- KV
	//------------------------------------

	@Override
	public String get(final BBKey key) {
		return String.valueOf(values.get(key));
	}

	@Override
	public String stringGet(final BBKey key) {
		Assertion.check().isNotNull(key);
		// ---
		return (String) values.get(key);
	}

	@Override
	public Integer integerGet(final BBKey key) {
		Assertion.check().isNotNull(key);
		// ---
		return (Integer) values.get(key);
	}

	@Override
	public Boolean boolGet(final BBKey key) {
		Assertion.check().isNotNull(key);
		// ---
		return (Boolean) values.get(key);
	}

	@Override
	public void stringPut(final BBKey key, final String value) {
		doPut(key, BBType.String, value);
	}

	@Override
	public void integerPut(final BBKey key, final Integer value) {
		doPut(key, BBType.Integer, value);
	}

	@Override
	public void boolPut(final BBKey key, final Boolean value) {
		doPut(key, BBType.Boolean, value);
	}

	private void doPut(final BBKey key, final BBType type, final Object value) {
		Assertion.check()
				.isNotNull(key)
				.isNotNull(type);
		// ---
		//---
		final BBType previousType = keys.put(key, type);
		if (previousType != null && type != previousType) {
			throw new IllegalStateException("the type is already defined" + previousType);
		}
		values.put(key, value);
	}

	@Override
	public void integerIncrBy(final BBKey key, final int value) {
		Assertion.check()
				.isNotNull(key);
		//---
		Integer i = integerGet(key);
		if (i == null) {
			i = 0;
		}
		integerPut(key, i + value);
	}

	@Override
	public BBType keysGetType(final BBKey key) {
		return keys.get(key);
	}

	//------------------------------------
	//- List                             -
	//- All methods are prefixed with l  -
	//------------------------------------
	private BBList getListOrCreate(final BBKey key) {
		Assertion.check()
				.isNotNull(key);
		//---
		BBList list = lists.get(key);
		if (list != null) {
			return list;
		}
		list = new BBList();
		lists.put(key, list);
		return list;
	}

	private BBList getListOrEmpty(final BBKey key) {
		Assertion.check()
				.isNotNull(key);
		//---
		final BBList list = lists.get(key);
		return list == null
				? BBList.EMPTY
				: list;
	}

	@Override
	public int listSize(final BBKey key) {
		return getListOrEmpty(key)
				.size();
	}

	@Override
	public void listPush(final BBKey key, final String value) {
		getListOrCreate(key)
				.push(value);
	}

	@Override
	public String listPop(final BBKey key) {
		return getListOrEmpty(key)
				.pop();
	}

	@Override
	public String listPeek(final BBKey key) {
		return getListOrEmpty(key)
				.peek();
	}

	@Override
	public String listGet(final BBKey key, final int idx) {
		return getListOrEmpty(key)
				.get(idx);
	}

	@Override
	public String getStoreName() {
		return storeNameOpt.orElse(BlackBoardManager.MAIN_STORE_NAME);
	}
}
