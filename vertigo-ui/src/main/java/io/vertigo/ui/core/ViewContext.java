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
import java.util.Optional;

import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtFieldName;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListURIForMasterData;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.lang.Assertion;
import io.vertigo.vega.engines.webservice.json.UiListModifiable;
import io.vertigo.vega.webservice.model.UiList;
import io.vertigo.vega.webservice.model.UiObject;
import io.vertigo.vega.webservice.validation.DefaultDtObjectValidator;
import io.vertigo.vega.webservice.validation.DtObjectValidator;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.ValidationUserException;

/**
 * Liste des couples (clé, object) enregistrés.
 * @author npiedeloup
 */
public final class ViewContext implements Serializable {

	private static final long serialVersionUID = -8237448155016161135L;

	/** Clée de l'id de context dans le context. */
	public static final String CTX = "CTX";

	private final ViewContextMap viewContextMap;

	public ViewContext(final ViewContextMap viewContextMap) {
		Assertion.checkNotNull(viewContextMap);
		//---
		this.viewContextMap = viewContextMap;
	}

	/* ================================== Life cycle =====================================*/

	/**
	 * @return Clé de ce context
	 */
	public String getId() {
		return getString(CTX);
	}

	public void setInputCtxId(final String ctxId) {
		viewContextMap.put(ViewContextMap.INPUT_CTX, ctxId);
	}

	/**
	 * Génère un nouvel Id et passe le context en modifiable.
	 */
	public void makeModifiable() {
		viewContextMap.makeModifiable();
	}

	/**
	 * passe le context en non-modifiable.
	 */
	public void makeUnmodifiable() {
		viewContextMap.makeUnmodifiable();
	}

	/**
	 * Mark this context as Dirty : shouldn't be stored and keep old id.
	 */
	public void markDirty() {
		viewContextMap.markDirty();
	}

	/**
	 * @return if context dirty : shouldn't be stored and keep old id
	 */
	public boolean isDirty() {
		return viewContextMap.isDirty();
	}

	public ViewContextMap asMap() {
		return viewContextMap;
	}

	/* ================================== Map =====================================*/

	public Serializable get(final Object key) {
		return viewContextMap.get(key);
	}

	/** {@inheritDoc} */
	public boolean containsKey(final Object key) {
		return viewContextMap.containsKey(key);
	}

	/**
	 * @param uiObject UiObject recherché
	 * @return Clé de context de l'élément (null si non trouvé)
	 */
	public String findKey(final UiObject<?> uiObject) {
		return viewContextMap.findKey(uiObject);
	}

	/**
	 * @param dtObject DtObject recherché
	 * @return Clé de context de l'élément (null si non trouvé)
	 */
	public String findKey(final DtObject dtObject) {
		return viewContextMap.findKey(dtObject);
	}

	/** {@inheritDoc} */
	public Serializable put(final String key, final Serializable value) {
		return viewContextMap.put(key, value);
	}

	/** {@inheritDoc} */
	public Serializable remove(final Object key) {
		return viewContextMap.remove(key);
	}

	/* ================================== ContextRef =====================================*/

	/**
	 * @param key Clé de context
	 * @return UiObject du context
	 */
	public <O extends DtObject> UiObject<O> getUiObject(final String key) {
		return (UiObject<O>) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return UiList du context
	 */
	public <O extends DtObject> UiList<O> getUiList(final String key) {
		return (UiList<O>) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return UiListModifiable du context
	 */
	public <O extends DtObject> UiListModifiable<O> getUiListModifiable(final String key) {
		return (UiListModifiable<O>) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return String du context
	 */
	public String getString(final String key) {
		final Object value = get(key);
		if (value instanceof String[] && ((String[]) value).length > 0) {
			//Struts set des String[] au lieu des String
			//on prend le premier
			return ((String[]) value)[0];
		}
		return (String) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return Long du context
	 */
	public Long getLong(final String key) {
		return (Long) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return Integer du context
	 */
	public Integer getInteger(final String key) {
		return (Integer) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return Boolean du context
	 */
	public Boolean getBoolean(final String key) {
		return (Boolean) get(key);
	}

	/* ================================ ContextForm ==================================*/
	/**
	 * Ajoute un objet de type form au context.
	 * @param dto Objet à publier
	 */
	public <O extends DtObject> void publishDto(final String contextKey, final O dto) {
		final UiObject<O> strutsUiObject = new MapUiObject<>(dto);
		strutsUiObject.setInputKey(contextKey);
		put(contextKey, strutsUiObject);
	}

	/**
	 * Vérifie les erreurs de l'objet. Celles-ci sont ajoutées à l'uiMessageStack si nécessaire.
	 */
	public void checkDtoErrors(final String contextKey, final UiMessageStack uiMessageStack) {
		getUiObject(contextKey).checkFormat(uiMessageStack);
		if (uiMessageStack.hasErrors()) {
			throw new ValidationUserException();
		}
	}

	/**
	 * @return objet métier valid�. Lance une exception si erreur.
	 */
	public <O extends DtObject> O readDto(final String contextKey, final UiMessageStack uiMessageStack) {
		return readDto(contextKey, new DefaultDtObjectValidator<>(), uiMessageStack);
	}

	/**
	 * @return objet métier valid�. Lance une exception si erreur.
	 */
	public <O extends DtObject> O readDto(final String contextKey, final DtObjectValidator<O> validator, final UiMessageStack uiMessageStack) {
		checkDtoErrors(contextKey, uiMessageStack);
		// ---
		final O validatedDto = ((UiObject<O>) getUiObject(contextKey)).mergeAndCheckInput(Collections.singletonList(validator), uiMessageStack);
		if (uiMessageStack.hasErrors()) {
			throw new ValidationUserException();
		}
		return validatedDto;
	}

	/* ================================ ContextList ==================================*/

	/**
	 * Ajoute une liste au context.
	 * @param dtList List à publier
	 */
	public <O extends DtObject> void publishDtList(final String contextKey, final Optional<DtFieldName<O>> keyFieldNameOpt, final DtList<O> dtList, final boolean modifiable) {
		if (modifiable) {
			put(contextKey, new BasicUiListModifiable<>(dtList, contextKey));
		} else {
			put(contextKey, new UiListUnmodifiable<>(dtList, keyFieldNameOpt));
		}
	}

	/**
	 * Ajoute une liste au context.
	 * @param dtList List à publier
	 */
	public <O extends DtObject> void publishDtList(final String contextKey, final Optional<DtFieldName<O>> keyFieldNameOpt, final DtList<O> dtList) {
		publishDtList(contextKey, keyFieldNameOpt, dtList, false);
	}

	/**
	 * Ajoute une liste au context.
	 * @param dtList List à publier
	 */
	public <O extends DtObject> void publishDtList(final String contextKey, final DtList<O> dtList) {
		publishDtList(contextKey, Optional.empty(), dtList);
	}

	/**
	 * @return List des objets métiers validée. Lance une exception si erreur.
	 */
	public <O extends DtObject> DtList<O> readDtList(final String contextKey, final DtObjectValidator<O> validator, final UiMessageStack uiMessageStack) {
		return ((UiListUnmodifiable<O>) getUiList(contextKey)).mergeAndCheckInput(Collections.singletonList(validator), uiMessageStack);
	}

	/**
	 * @return List des objets métiers validée. Lance une exception si erreur.
	 */
	public <O extends DtObject> DtList<O> readDtList(final String contextKey, final UiMessageStack uiMessageStack) {
		return readDtList(contextKey, new DefaultDtObjectValidator<>(), uiMessageStack);
	}

	/* ================================ ContextListModifiable ==================================*/

	/**
	 * Ajoute une liste au context.
	 * @param dtList List à publier
	 */
	public <O extends DtObject> void publishDtListModifiable(final String contextKey, final DtList<O> dtList) {
		publishDtList(contextKey, Optional.empty(), dtList, true);
	}

	/**
	 * Vérifie les erreurs de la liste. Celles-ci sont ajoutées à l'uiMessageStack si nécessaire.
	 */
	public void checkDtListErrors(final String contextKey, final UiMessageStack uiMessageStack) {
		getUiListModifiable(contextKey).checkFormat(uiMessageStack);
		if (uiMessageStack.hasErrors()) {
			throw new ValidationUserException();
		}
	}

	/**
	 * @return List des objets métiers validée. Lance une exception si erreur.
	 */
	public <O extends DtObject> DtList<O> readDtListModifiable(final String contextKey, final UiMessageStack uiMessageStack) {
		return readDtListModifiable(contextKey, new DefaultDtObjectValidator<>(), uiMessageStack);
	}

	/**
	 * @return List des objets métiers validée. Lance une exception si erreur.
	 */
	public <O extends DtObject> DtList<O> readDtListModifiable(final String contextKey, final DtObjectValidator<O> validator, final UiMessageStack uiMessageStack) {
		checkDtListErrors(contextKey, uiMessageStack);
		// ---
		final DtList<O> validatedList = ((UiListModifiable) getUiListModifiable(contextKey)).mergeAndCheckInput(Collections.singletonList(validator), uiMessageStack);
		if (uiMessageStack.hasErrors()) {
			throw new ValidationUserException();
		}
		return validatedList;
	}

	/* ================================ ContextMdList ==================================*/

	/**
	 * Publie une liste de référence.
	 * @param entityClass Class associée
	 * @param code Code
	 */
	public <E extends Entity> void publish(final String contextKey, final Class<E> entityClass, final String code) {
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(entityClass);
		put(contextKey, new UiMdList<E>(new DtListURIForMasterData(dtDefinition, code)));
	}
}
