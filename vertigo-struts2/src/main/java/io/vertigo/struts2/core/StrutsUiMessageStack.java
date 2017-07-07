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
package io.vertigo.struts2.core;

import java.io.Serializable;

import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.lang.Assertion;
import io.vertigo.util.StringUtil;
import io.vertigo.vega.webservice.model.UiList;
import io.vertigo.vega.webservice.model.UiObject;
import io.vertigo.vega.webservice.validation.UiMessageStack;

/**
 * Class d'enregistrement des messages.
 *
 * @author npiedeloup
 */
public final class StrutsUiMessageStack implements UiMessageStack {

	private static final long serialVersionUID = 9216344511798624184L;

	private final AbstractActionSupport actionSupport;

	private static final String FIELD_LABEL_PREFIX = "<label>";
	private static final String FIELD_LABEL_SUFFIX = "</label>";

	/**
	 * Constructeur.
	 * @param actionSupport Action où déverser les messages
	 */
	public StrutsUiMessageStack(final AbstractActionSupport actionSupport) {
		Assertion.checkNotNull(actionSupport);
		//-----
		this.actionSupport = actionSupport;
	}

	/**
	 * @param message Message d'erreur
	 */
	@Override
	public void error(final String message) {
		addGlobalMessage(Level.ERROR, message);
	}

	/**
	 * @param message Message d'alerte
	 */
	@Override
	public void warning(final String message) {
		addGlobalMessage(Level.WARNING, message);
	}

	/**
	 * @param message Message d'info
	 */
	@Override
	public void info(final String message) {
		addGlobalMessage(Level.INFO, message);
	}

	@Override
	public void success(final String message) {
		addGlobalMessage(Level.SUCCESS, message);

	}

	/**
	 * Ajoute un message.
	 * @param level Niveau de message
	 * @param message Message
	 */
	@Override
	public void addGlobalMessage(final Level level, final String message) {
		if (level == Level.ERROR) {
			actionSupport.addActionError(message);
		} else {
			actionSupport.addActionMessage(getLevelPrefixMarker(level) + message);
		}
	}

	/**
	 * @param message Message d'erreur
	 * @param dto Objet portant les erreurs
	 * @param fieldName Champ portant l'erreur
	 */
	@Override
	public void error(final String message, final DtObject dto, final String fieldName) {
		addFieldMessage(Level.ERROR, message, dto, fieldName);
	}

	/**
	 * @param message Message d'alerte
	 * @param dto Objet portant les erreurs
	 * @param fieldName Champ portant l'erreur
	 */
	@Override
	public void warning(final String message, final DtObject dto, final String fieldName) {
		addFieldMessage(Level.WARNING, message, dto, fieldName);
	}

	/**
	 * @param message Message d'info
	 * @param dto Objet portant les erreurs
	 * @param fieldName Champ portant l'erreur
	 */
	@Override
	public void info(final String message, final DtObject dto, final String fieldName) {
		addFieldMessage(Level.INFO, message, dto, fieldName);
	}

	@Override
	public void addFieldMessage(final Level level, final String message, final DtObject dtObject, final String fieldName) {
		addObjectFieldMessage(actionSupport.getModel().findKey(dtObject), level, message, DtObjectUtil.findDtDefinition(dtObject), fieldName);
	}

	@Override
	public void addFieldMessage(final Level level, final String message, final String contextKey, final String fieldName) {
		final String rootContextKey = contextKey.split("\\.")[0];// We only support List and objects
		final Serializable object = actionSupport.getModel().get(rootContextKey);
		if (object instanceof UiObject) {
			addObjectFieldMessage(contextKey, level, message, ((UiObject) object).getDtDefinition(), fieldName);
		} else if (object instanceof UiList) {
			addObjectFieldMessage(contextKey, level, message, ((UiList) object).getDtDefinition(), fieldName);
		}

	}

	@Override
	public boolean hasErrors() {
		return actionSupport.hasActionErrors() || actionSupport.hasErrors() || actionSupport.hasFieldErrors();
	}

	private void addObjectFieldMessage(final String contextKey, final Level level, final String message, final DtDefinition dtDefinition, final String fieldName) {
		Assertion.checkArgNotEmpty(contextKey);
		Assertion.checkNotNull(level);
		Assertion.checkArgNotEmpty(message);
		Assertion.checkNotNull(dtDefinition);
		Assertion.checkArgNotEmpty(fieldName);
		//-----
		if (level == Level.ERROR) {
			actionSupport.addFieldError(contextKey + "." + fieldName, message);
		} else {
			final String constFieldName = StringUtil.camelToConstCase(fieldName);
			final DtField dtField = dtDefinition.getField(constFieldName);
			actionSupport.addActionMessage(getLevelPrefixMarker(level) + FIELD_LABEL_PREFIX + dtField.getLabel().getDisplay() + FIELD_LABEL_SUFFIX + message);
		}

	}

	private static String getLevelPrefixMarker(final Level level) {
		return level.toString() + ":";
	}
}
