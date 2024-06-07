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
package io.vertigo.ui.core;

import java.io.Serializable;
import java.util.UUID;
import java.util.WeakHashMap;

import io.vertigo.account.authorization.VSecurityException;
import io.vertigo.account.security.UserSession;
import io.vertigo.account.security.VSecurityManager;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.node.Node;
import io.vertigo.datastore.kvstore.KVCollection;
import io.vertigo.datastore.kvstore.KVStoreManager;

/**
 * @author npiedeloup
 */
public final class ProtectedValueUtil {
	public static final KVCollection PROTECTED_VALUE_COLLECTION_NAME = new KVCollection("protected-value");

	//we keep a cache of already protected value.
	//weak ref are kept as long as the instance are kept : so no clean during request
	//- Dev MUST use the same instance for the same value
	//- Might be kept too long (multiple requests)
	private static final WeakHashMap<Serializable, String> PREVIOUSLY_GENERATED_PROTECTED_VALUE = new WeakHashMap<>();

	/**
	 * Genere et conserve une URL protégée.
	 */
	public static String generateProtectedValue(final Serializable unprotectedValue) {
		if (unprotectedValue == null) {
			return null;
		}
		final var transactionManager = getTransactionManager();
		//unprotectedValue is not null here
		final String protectedUrl = protectValue(unprotectedValue);
		if (transactionManager.hasCurrentTransaction()) {
			getKVStoreManager().put(PROTECTED_VALUE_COLLECTION_NAME, protectedUrl + getSessionIdIfExists(), unprotectedValue);
		} else {
			try (VTransactionWritable transactionWritable = transactionManager.createCurrentTransaction()) {
				getKVStoreManager().put(PROTECTED_VALUE_COLLECTION_NAME, protectedUrl + getSessionIdIfExists(), unprotectedValue);
				transactionWritable.commit();
			}
		}
		return protectedUrl;
	}

	/**
	 * @param unprotectedValue value to protect (may or may not used)
	 */
	private static String protectValue(final Serializable unprotectedValue) {
		return PREVIOUSLY_GENERATED_PROTECTED_VALUE.computeIfAbsent(unprotectedValue, k -> UUID.randomUUID().toString());
	}

	/**
	 * Resoud une value protégée.
	 */
	public static <V extends Serializable> V readProtectedValue(final String protectedValue, final Class<V> clazz) {
		if (protectedValue == null) {
			return null;
		}
		final var transactionManager = getTransactionManager();
		if (transactionManager.hasCurrentTransaction()) {
			return getKVStoreManager()
					.find(PROTECTED_VALUE_COLLECTION_NAME, protectedValue + getSessionIdIfExists(), clazz)
					.orElseThrow(() -> new VSecurityException(LocaleMessageText.of("Resources not found.")));
		} else {
			try (VTransactionWritable transactionWritable = getTransactionManager().createCurrentTransaction()) {
				final V unprotectedValue;
				unprotectedValue = getKVStoreManager()
						.find(PROTECTED_VALUE_COLLECTION_NAME, protectedValue + getSessionIdIfExists(), clazz)
						.orElseThrow(() -> new VSecurityException(LocaleMessageText.of("Resources not found.")));
				return unprotectedValue;
			}
		}
	}

	private static String getSessionIdIfExists() {
		return getSecurityManager().getCurrentUserSession()
				.map(UserSession::getSessionUUID)
				.map(u -> "-" + u)
				.orElse("");
	}

	private static VTransactionManager getTransactionManager() {
		return Node.getNode().getComponentSpace().resolve(VTransactionManager.class);
	}

	private static KVStoreManager getKVStoreManager() {
		return Node.getNode().getComponentSpace().resolve(KVStoreManager.class);
	}

	private static VSecurityManager getSecurityManager() {
		return Node.getNode().getComponentSpace().resolve(VSecurityManager.class);
	}

}
