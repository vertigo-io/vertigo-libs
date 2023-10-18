package io.vertigo.vortex.impl.bb;

import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.vortex.bb.BBKey;
import io.vertigo.vortex.bb.BBKeyPattern;
import io.vertigo.vortex.bb.BBKeyTemplate;
import io.vertigo.vortex.bb.BlackBoard;

final class BlackBoardImpl implements BlackBoard {
	private final BlackBoardStorePlugin blackBoardStorePlugin;
	private final BBKey rootKey;

	BlackBoardImpl(final BlackBoardStorePlugin blackBoardStorePlugin, final BBKey rootKey) {
		Assertion.check()
				.isNotNull(blackBoardStorePlugin)
				.isNotNull(rootKey);
		//---
		this.blackBoardStorePlugin = blackBoardStorePlugin;
		this.rootKey = rootKey;
	}

	//------------------------------------
	//--- Keys
	//------------------------------------
	@Override
	public boolean exists(final BBKey key) {
		Assertion.check().isNotNull(key);
		//---
		return blackBoardStorePlugin
				.exists(rootKey.add(key));
	}

	@Override
	public Set<BBKey> keys(final BBKeyPattern keyPattern) {
		//---
		return blackBoardStorePlugin
				.keys(keyPattern.indent(rootKey.key()))
				.stream()
				.map(k -> BBKey.of(k.key().substring(rootKey.key().length())))
				.collect(Collectors.toSet());
	}

	@Override
	public void delete(final BBKeyPattern keyPattern) {
		//---
		blackBoardStorePlugin
				.delete(keyPattern.indent(rootKey.key()));
	}

	@Override
	public Type getType(final BBKey key) {
		Assertion.check().isNotNull(key);
		//---
		return blackBoardStorePlugin.getType(rootKey.add(key));
	}

	//------------------------------------
	//--- KV
	//------------------------------------
	@Override
	public String format(final String msg) {
		return format(msg, key -> blackBoardStorePlugin.get(rootKey.add(key)));
	}

	@Override
	public BBKey eval(final BBKeyTemplate keyTemplate) {
		return BBKey.of(format(keyTemplate.keyTemplate(), key -> blackBoardStorePlugin.get(rootKey.add(key))));
	}

	//--- KV String
	@Override
	public String getString(final BBKey key) {
		checkKey(key, Type.String);
		//---
		return blackBoardStorePlugin
				.getString(rootKey.add(key));
	}

	@Override
	public void putString(final BBKey key, final String value) {
		checkKey(key, Type.String);
		//---
		blackBoardStorePlugin
				.putString(rootKey.add(key), value);
	}

	@Override
	public void append(final BBKey key, final String something) {
		String value = getString(key); // getString includes type checking
		if (value == null) {
			value = "";
		}
		putString(key, value + something);
	}

	@Override
	public boolean eq(final BBKey key, final String compare) {
		final String value = getString(key); // getString includes type checking
		return value == null ? compare == null : value.equals(compare);
	}

	@Override
	public boolean eqCaseInsensitive(final BBKey key, final String compare) {
		final String value = getString(key); // getString includes type checking
		return value == null ? compare == null : value.equalsIgnoreCase(compare);
	}

	@Override
	public boolean startsWith(final BBKey key, final String compare) {
		final String value = getString(key); // getString includes type checking
		return value == null
				? compare == null
				: value.startsWith(compare);
	}

	//--- KV Integer

	@Override
	public Integer getInteger(final BBKey key) {
		checkKey(key, Type.Integer);
		//---
		return blackBoardStorePlugin
				.getInteger(rootKey.add(key));
	}

	@Override
	public void putInteger(final BBKey key, final Integer value) {
		checkKey(key, Type.Integer);
		//---
		blackBoardStorePlugin
				.putInteger(rootKey.add(key), value);
	}

	@Override
	public void incrBy(final BBKey key, final int value) {
		checkKey(key, Type.Integer);
		//---
		blackBoardStorePlugin.incrBy(rootKey.add(key), value);
	}

	@Override
	public void incr(final BBKey key) {
		incrBy(key, 1);
	}

	@Override
	public void decr(final BBKey key) {
		incrBy(key, -1);
	}

	@Override
	public boolean lt(final BBKey key, final Integer compare) {
		return compareInteger(key, compare) < 0;
	}

	@Override
	public boolean eq(final BBKey key, final Integer compare) {
		return compareInteger(key, compare) == 0;
	}

	@Override
	public boolean gt(final BBKey key, final Integer compare) {
		return compareInteger(key, compare) > 0;
	}

	private int compareInteger(final BBKey key, final Integer compare) {
		checkKey(key, Type.Integer);
		//---
		final Integer value = getInteger(key);
		return compareInteger(value, compare);
	}

	//------------------------------------
	//- List
	//- All methods are prefixed with list
	//------------------------------------
	@Override
	public int listSize(final BBKey key) {
		checkKey(key, Type.List);
		//---
		return blackBoardStorePlugin
				.listSize(rootKey.add(key));
	}

	@Override
	public void listPush(final BBKey key, final String value) {
		checkKey(key, Type.List);
		//---
		blackBoardStorePlugin
				.listPush(rootKey.add(key), value);
	}

	@Override
	public String listPop(final BBKey key) {
		checkKey(key, Type.List);
		//---
		return blackBoardStorePlugin
				.listPop(rootKey.add(key));
	}

	@Override
	public String listPeek(final BBKey key) {
		checkKey(rootKey.add(key), Type.List);
		//---
		return blackBoardStorePlugin
				.listPeek(rootKey.add(key));
	}

	@Override
	public String listGet(final BBKey key, final int idx) {
		checkKey(rootKey.add(key), Type.List);
		//---
		return blackBoardStorePlugin
				.listGet(rootKey.add(key), idx);
	}

	//------------------------------------
	//- Utils                             -
	//------------------------------------

	/**
	 * Checks
	 * - the key is following the regex
	 * - the type is ok
	 *
	 * @param key
	 * @param type
	 */
	private void checkKey(final BBKey key, final Type type) {
		Assertion.check()
				.isNotNull(key)
				.isNotNull(type);
		//---
		final Type t = getType(key);
		if (t != null && !type.equals(t)) {
			throw new IllegalStateException("the type of the key " + t + " is not the one expected " + type);
		}
	}

	private static int compareInteger(final Integer value, final Integer compare) {
		if (value == null) {
			return compare == null
					? 0
					: -1;
		}
		if (compare == null) {
			return value == null
					? 0
					: -1;
		}
		return value.compareTo(compare);
	}

	public static String format(final String msg, final Function<BBKey, String> kv) {
		Assertion.check()
				.isNotNull(msg)
				.isNotNull(kv);
		//---
		final String START_TOKEN = "{{";
		final String END_TOKEN = "}}";

		final StringBuilder builder = new StringBuilder(msg);
		int start = 0;
		int end;
		while ((end = builder.indexOf(END_TOKEN, start)) >= 0) {
			start = builder.lastIndexOf(START_TOKEN, end);
			if (start < 0) {
				throw new IllegalStateException("An end token '" + END_TOKEN + "+'has been found without a start token " + START_TOKEN);
			}
			final var paramName = builder.substring(start + START_TOKEN.length(), end);
			final var paramVal = Optional.ofNullable(kv.apply(BBKey.of(paramName)))
					.orElse("not found:" + paramName);
			builder.replace(start, end + END_TOKEN.length(), paramVal);
		}
		if (builder.indexOf(START_TOKEN) > 0) {
			throw new IllegalStateException("A start token '" + START_TOKEN + "+'has been found without an end token " + END_TOKEN);
		}
		return builder.toString();
	}
}
