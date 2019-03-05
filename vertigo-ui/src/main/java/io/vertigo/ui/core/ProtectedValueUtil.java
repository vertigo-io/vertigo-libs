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

import io.vertigo.app.Home;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.dynamo.kvstore.KVStoreManager;

/**
 * @author npiedeloup
 */
public final class ProtectedValueUtil {
	public static final String PROTECTED_VALUE_COLLECTION_NAME = "protected-value";

	/**
	 * Genere et conserve une URL protégée.
	 */
	public static String generateProtectedValue(final Serializable unprotectedValue) {
		if (unprotectedValue == null) {
			return null;
		}
		//unprotectedValue is not null here
		final String protectedUrl = "Prot-" + unprotectedValue.hashCode() + "-Prot";
		try (VTransactionWritable transactionWritable = getTransactionManager().createCurrentTransaction()) {
			getKVStoreManager().put(PROTECTED_VALUE_COLLECTION_NAME, protectedUrl, unprotectedValue);
			transactionWritable.commit();
		}
		return protectedUrl;
	}

	/**
	 * Resoud une value protégée.
	 */
	public static <V extends Serializable> V readProtectedValue(final String protectedValue, final Class<V> clazz) {
		if (protectedValue == null) {
			return null;
		}
		final V unprotectedValue;
		try (VTransactionWritable transactionWritable = getTransactionManager().createCurrentTransaction()) {
			unprotectedValue = getKVStoreManager().find(PROTECTED_VALUE_COLLECTION_NAME, protectedValue, clazz).orElse(null);
		}
		return unprotectedValue;
	}

	private static VTransactionManager getTransactionManager() {
		return Home.getApp().getComponentSpace().resolve(VTransactionManager.class);
	}

	private static KVStoreManager getKVStoreManager() {
		return Home.getApp().getComponentSpace().resolve(KVStoreManager.class);
	}

}
