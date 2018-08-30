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

import java.util.Collections;
import java.util.Optional;

import io.vertigo.dynamo.domain.metamodel.DtFieldName;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.lang.Assertion;
import io.vertigo.vega.webservice.validation.DefaultDtObjectValidator;
import io.vertigo.vega.webservice.validation.DtObjectValidator;
import io.vertigo.vega.webservice.validation.UiMessageStack;

/**
 * Liste des couples (clé, object) enregistrés.
 * @author npiedeloup
 * @param <O> Type d'objet
 */
public final class ContextList<O extends DtObject> {
	private final AbstractVSpringMvcController controller;
	private final UiMessageStack uiMessageStack;
	private final String contextKey;
	private final DtObjectValidator<O> validator;
	private final Optional<DtFieldName<O>> keyFieldNameOpt;

	/**
	* Constructeur.
	* @param contextKey Clé dans le context
	* @param controller Action struts
	*/
	public ContextList(final String contextKey, final AbstractVSpringMvcController controller) {
		this(contextKey, new DefaultDtObjectValidator<O>(), Optional.empty(), controller);
	}

	/**
	* Constructeur.
	* @param contextKey Clé dans le context
	* @param controller Action struts
	*/
	public ContextList(final String contextKey, final DtFieldName<O> keyFieldName, final AbstractVSpringMvcController controller) {
		this(contextKey, new DefaultDtObjectValidator<O>(), Optional.of(keyFieldName), controller);
	}

	/**
	 * Constructeur.
	 * @param contextKey Clé dans le context
	 * @param validator Validator a utiliser
	 * @param controller Action struts
	 */
	public ContextList(final String contextKey, final DtObjectValidator<O> validator, final AbstractVSpringMvcController controller) {
		this(contextKey, new DefaultDtObjectValidator<O>(), Optional.empty(), controller);
	}

	/**
	 * Constructeur.
	 * @param contextKey Clé dans le context
	 * @param validator Validator a utiliser
	 * @param controller Action struts
	 */
	public ContextList(final String contextKey, final DtObjectValidator<O> validator, final Optional<DtFieldName<O>> keyFieldNameOpt, final AbstractVSpringMvcController controller) {
		Assertion.checkArgNotEmpty(contextKey);
		Assertion.checkNotNull(controller);
		Assertion.checkNotNull(validator);
		Assertion.checkNotNull(keyFieldNameOpt);
		//-----
		this.contextKey = contextKey;
		this.controller = controller;
		this.uiMessageStack = controller.getUiMessageStack();
		this.validator = validator;
		this.keyFieldNameOpt = keyFieldNameOpt;
	}

	/**
	 * Ajoute une liste au context.
	 * @param dtList List à publier
	 */
	public void publish(final DtList<O> dtList) {
		controller.getModel().put(contextKey, new UiListUnmodifiable<>(dtList, keyFieldNameOpt));
	}

	/**
	 * @return List des objets métiers validée. Lance une exception si erreur.
	 */
	public DtList<O> readDtList() {
		return ((UiListUnmodifiable<O>) controller.getModel().<O> getUiList(contextKey)).mergeAndCheckInput(Collections.singletonList(validator), uiMessageStack);
	}

}
