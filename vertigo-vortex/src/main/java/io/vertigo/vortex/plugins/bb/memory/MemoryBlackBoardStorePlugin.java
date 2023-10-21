package io.vertigo.vortex.plugins.bb.memory;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.param.ParamValue;
import io.vertigo.vortex.bb.BBKey;
import io.vertigo.vortex.bb.BBKeyPattern;
import io.vertigo.vortex.bb.BlackBoard.Type;
import io.vertigo.vortex.bb.BlackBoardManager;
import io.vertigo.vortex.impl.bb.BlackBoardStorePlugin;

public final class MemoryBlackBoardStorePlugin implements BlackBoardStorePlugin {
	private final Map<BBKey, Type> keys = Collections.synchronizedMap(new LinkedHashMap<>());
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
	public boolean exists(final BBKey key) {
		Assertion.check().isNotNull(key);
		// ---
		return keys.containsKey(key);
	}

	@Override
	public Set<BBKey> keys(final BBKeyPattern keyPattern) {
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
	public void delete(final BBKeyPattern keyPattern) {
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
	public String getString(final BBKey key) {
		Assertion.check().isNotNull(key);
		// ---
		return (String) values.get(key);
	}

	@Override
	public Integer getInteger(final BBKey key) {
		Assertion.check().isNotNull(key);
		// ---
		return (Integer) values.get(key);
	}

	@Override
	public Boolean getBoolean(final BBKey key) {
		Assertion.check().isNotNull(key);
		// ---
		return (Boolean) values.get(key);
	}

	@Override
	public void putString(final BBKey key, final String value) {
		doPut(key, Type.String, value);
	}

	@Override
	public void putInteger(final BBKey key, final Integer value) {
		doPut(key, Type.Integer, value);
	}

	@Override
	public void putBoolean(final BBKey key, final Boolean value) {
		doPut(key, Type.Boolean, value);
	}

	private void doPut(final BBKey key, final Type type, final Object value) {
		Assertion.check()
				.isNotNull(key)
				.isNotNull(type);
		// ---
		//---
		final Type previousType = keys.put(key, type);
		if (previousType != null && type != previousType) {
			throw new IllegalStateException("the type is already defined" + previousType);
		}
		values.put(key, value);
	}

	@Override
	public void incrBy(final BBKey key, final int value) {
		Assertion.check()
				.isNotNull(key);
		//---
		Integer i = getInteger(key);
		if (i == null) {
			i = 0;
		}
		putInteger(key, i + value);
	}

	@Override
	public Type getType(final BBKey key) {
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
