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
package io.vertigo.datamodel.impl.bb;

import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.bb.BBCommandBoolean;
import io.vertigo.datamodel.bb.BBCommandInteger;
import io.vertigo.datamodel.bb.BBCommandKeys;
import io.vertigo.datamodel.bb.BBCommandList;
import io.vertigo.datamodel.bb.BBCommandString;
import io.vertigo.datamodel.bb.BBKey;
import io.vertigo.datamodel.bb.BBKeyPattern;
import io.vertigo.datamodel.bb.BBKeyTemplate;
import io.vertigo.datamodel.bb.BBType;
import io.vertigo.datamodel.bb.BlackBoard;

final class BlackBoardImpl implements BlackBoard {
	private final BlackBoardStorePlugin blackBoardStorePlugin;
	private final BBKey rootKey;
	private BBCommandKeys commandKeys;
	private BBCommandBoolean commandBoolean;
	private BBCommandString commandString;
	private BBCommandInteger commandInteger;
	private BBCommandList commandList;

	BlackBoardImpl(final BlackBoardStorePlugin blackBoardStorePlugin, final BBKey rootKey) {
		Assertion.check()
				.isNotNull(blackBoardStorePlugin)
				.isNotNull(rootKey);
		//---
		this.blackBoardStorePlugin = blackBoardStorePlugin;
		this.rootKey = rootKey;
		this.commandKeys = new BBCommandKeysImpl();
		this.commandBoolean = new BBCommandBooleanImpl();
		this.commandString = new BBCommandStringImpl();
		this.commandInteger = new BBCommandIntegerImpl();
		this.commandList = new BBCommandListImpl();
	}

	@Override
	public BBCommandKeys keys() {
		return commandKeys;
	}

	@Override
	public BBCommandBoolean bool() {
		return commandBoolean;
	}

	@Override
	public BBCommandString string() {
		return commandString;
	}

	@Override
	public BBCommandInteger integer() {
		return commandInteger;
	}

	@Override
	public BBCommandList list() {
		return commandList;
	}

	//------------------------------------
	//--- Keys
	//------------------------------------
	private class BBCommandKeysImpl implements BBCommandKeys {
		@Override

		public boolean exists(final BBKey key) {
			Assertion.check().isNotNull(key);
			//---
			return blackBoardStorePlugin
					.keysExists(rootKey.add(key));
		}

		@Override
		public Set<BBKey> findAll(final BBKeyPattern keyPattern) {
			Assertion.check().isNotNull(keyPattern);
			//---
			return blackBoardStorePlugin
					.keysFindAll(keyPattern.indent(rootKey.key()))
					.stream()
					.map(k -> BBKey.of(k.key().substring(rootKey.key().length())))
					.collect(Collectors.toSet());
		}

		@Override
		public void deleteAll(final BBKeyPattern keyPattern) {
			Assertion.check().isNotNull(keyPattern);
			//---
			blackBoardStorePlugin
					.keysDeleteAll(keyPattern.indent(rootKey.key()));
		}

		@Override
		public BBType getType(final BBKey key) {
			Assertion.check().isNotNull(key);
			//---
			return blackBoardStorePlugin
					.keysGetType(rootKey.add(key));
		}
	}

	//--- KV String
	private class BBCommandStringImpl implements BBCommandString {
		@Override
		public String get(final BBKey key) {
			checkKey(key, BBType.String);
			//---
			return blackBoardStorePlugin
					.stringGet(rootKey.add(key));
		}

		@Override
		public void put(final BBKey key, final String value) {
			checkKey(key, BBType.String);
			//---
			blackBoardStorePlugin
					.stringPut(rootKey.add(key), value);
		}

		@Override
		public void append(final BBKey key, final String something) {
			String value = get(key); // getString includes type checking
			if (value == null) {
				value = "";
			}
			put(key, value + something);
		}

		@Override
		public boolean eqCaseInsensitive(final BBKey key, final String compare) {
			final String value = get(key); // getString includes type checking
			return value == null ? compare == null : value.equalsIgnoreCase(compare);
		}

		@Override
		public boolean startsWith(final BBKey key, final String compare) {
			final String value = get(key); // getString includes type checking
			return value == null
					? compare == null
					: value.startsWith(compare);
		}

		@Override
		public boolean eq(final BBKey key, final String compare) {
			final String value = get(key); // getString includes type checking
			return Objects.equals(value, compare);
		}
	}

	//--- KV Integer
	private class BBCommandIntegerImpl implements BBCommandInteger {
		@Override
		public void incr(final BBKey key) {
			incrBy(key, 1);
		}

		@Override
		public void decr(final BBKey key) {
			incrBy(key, -1);
		}

		@Override
		public boolean eq(final BBKey key, final Integer compare) {
			return compareInteger(key, compare) == 0;
		}

		@Override
		public boolean lt(final BBKey key, final Integer compare) {
			return compareInteger(key, compare) < 0;
		}

		@Override
		public boolean gt(final BBKey key, final Integer compare) {
			return compareInteger(key, compare) > 0;
		}

		private int compareInteger(final BBKey key, final Integer compare) {
			final Integer value = get(key);
			return compareInteger(value, compare);
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

		@Override
		public Integer get(final BBKey key) {
			checkKey(key, BBType.Integer);
			//---
			return blackBoardStorePlugin
					.integerGet(rootKey.add(key));
		}

		@Override
		public void put(final BBKey key, final Integer value) {
			checkKey(key, BBType.Integer);
			//---
			blackBoardStorePlugin
					.integerPut(rootKey.add(key), value);
		}

		@Override
		public void incrBy(final BBKey key, final int value) {
			checkKey(key, BBType.Integer);
			//---
			blackBoardStorePlugin.integerIncrBy(rootKey.add(key), value);
		}
	}

	//--- KV Boolean
	private class BBCommandBooleanImpl implements BBCommandBoolean {
		@Override
		public boolean eq(final BBKey key, final Boolean compare) {
			return compareBoolean(key, compare) == 0;
		}

		private int compareBoolean(final BBKey key, final Boolean compare) {
			final Boolean value = get(key);
			return compareBoolean(value, compare);
		}

		private static int compareBoolean(final Boolean value, final Boolean compare) {
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

		@Override
		public Boolean get(final BBKey key) {
			checkKey(key, BBType.Boolean);
			//---
			return blackBoardStorePlugin
					.boolGet(rootKey.add(key));
		}

		@Override
		public void put(final BBKey key, final Boolean value) {
			checkKey(key, BBType.Boolean);
			//---
			blackBoardStorePlugin
					.boolPut(rootKey.add(key), value);
		}
	}

	//------------------------------------
	//- List
	//- All methods are prefixed with list
	//------------------------------------
	private class BBCommandListImpl implements BBCommandList {
		@Override
		public int size(final BBKey key) {
			checkKey(key, BBType.List);
			//---
			return blackBoardStorePlugin
					.listSize(rootKey.add(key));
		}

		@Override
		public void push(final BBKey key, final String value) {
			checkKey(key, BBType.List);
			//---
			blackBoardStorePlugin
					.listPush(rootKey.add(key), value);
		}

		@Override
		public String pop(final BBKey key) {
			checkKey(key, BBType.List);
			//---
			return blackBoardStorePlugin
					.listPop(rootKey.add(key));
		}

		@Override
		public String peek(final BBKey key) {
			checkKey(rootKey.add(key), BBType.List);
			//---
			return blackBoardStorePlugin
					.listPeek(rootKey.add(key));
		}

		@Override
		public String get(final BBKey key, final int idx) {
			checkKey(rootKey.add(key), BBType.List);
			//---
			return blackBoardStorePlugin
					.listGet(rootKey.add(key), idx);
		}
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
	private void checkKey(final BBKey key, final BBType type) {
		Assertion.check()
				.isNotNull(key)
				.isNotNull(type);
		//---
		final BBType t = keys().getType(key);
		if (t != null && !type.equals(t)) {
			throw new IllegalStateException("the type of the key " + t + " is not the one expected " + type);
		}
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

	private static String format(final String msg, final Function<BBKey, String> kv) {
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
