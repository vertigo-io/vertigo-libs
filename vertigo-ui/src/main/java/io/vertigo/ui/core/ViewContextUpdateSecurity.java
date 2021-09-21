/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2021, Vertigo.io, team@vertigo.io
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

import io.vertigo.account.authorization.VSecurityException;
import io.vertigo.core.locale.MessageText;

/**
 * Keep the viewContext updatable data allowed.
 * A state securedUpdates, defined when this security is enabled (controllers could always update data).
 * @author npiedeloup
 */
public final class ViewContextUpdateSecurity implements Serializable {

	private static final long serialVersionUID = -4185584640736172927L;
	private static final MessageText FORBIDDEN_DATA_UPDATE_MESSAGE = MessageText.of("These data can't be accepted"); //no too sharp info here : may use log //TODO externalized msg

	private static final ViewContextUpdateSecurity UNMODIFIABLE_INSTANCE = new ViewContextUpdateSecurity();
	static {
		UNMODIFIABLE_INSTANCE.setCheckUpdates(true);
	}

	public static ViewContextUpdateSecurity unmodifiable() {
		return UNMODIFIABLE_INSTANCE;
	}

	private Boolean checkUpdates = Boolean.FALSE;
	private final Map<String, Set<String>> updatablesKeys = new HashMap<>();;

	public void assertIsUpdatable(final String object, final String fieldName) {
		if (checkUpdates
				&& !updatablesKeys.containsKey(object)
				&& !updatablesKeys.get(object).contains(fieldName)) {
			throw new VSecurityException(FORBIDDEN_DATA_UPDATE_MESSAGE);
		}
	}

	public void assertIsUpdatable(final String object) {
		if (checkUpdates && !updatablesKeys.containsKey(object)) {
			throw new VSecurityException(FORBIDDEN_DATA_UPDATE_MESSAGE);
		}
	}

	/**
	 * Fixe le mode d'update : filtré ou non (par les champs éditables de l'ihm).
	 */
	public void setCheckUpdates(final boolean checkUpdates) {
		this.checkUpdates = checkUpdates;
	}

	public void addUpdatableKey(final String object, final String fieldName) {
		updatablesKeys.computeIfAbsent(object, k -> new HashSet<>()).add(fieldName);
	}

	public void addUpdatableKey(final String object) {
		updatablesKeys.computeIfAbsent(object, k -> Collections.emptySet());
	}
}
