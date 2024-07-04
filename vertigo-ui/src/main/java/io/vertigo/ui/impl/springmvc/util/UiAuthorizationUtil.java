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
package io.vertigo.ui.impl.springmvc.util;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

import javax.inject.Inject;

import io.vertigo.account.authorization.AuthorizationManager;
import io.vertigo.account.authorization.definitions.Authorization;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.util.InjectorUtil;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.vega.webservice.model.UiObject;

/**
 * Class utilitaire pour les droits dans les pages en thymeleaf/jsp/ftl.
 * @author npiedeloup
 */
public final class UiAuthorizationUtil extends HashSet<String> {

	private static final long serialVersionUID = -2526131218305222904L;

	private static final String OPERATION_KEY_SEP = "$ope:";

	@Inject
	private AuthorizationManager authorizationManager;

	//this cache is reset at every page
	private final Map<String, Boolean> cacheAuthorizations = new HashMap<>();
	private final Map<String, Boolean> cacheOperations = new HashMap<>();

	/**
	 * Constructor.
	 */
	//can't be private, because an instance must be put into struts context, for access from tags.
	//instant keep currently allowed authorizations and operations
	public UiAuthorizationUtil() {
		InjectorUtil.injectMembers(this);
	}

	/*private void registerPriorAuthorizations() {
		final AuthorizationManager authorizationManager = Node.getNode().getComponentSpace().resolve(AuthorizationManager.class);
		priorAuthorizations = authorizationManager.getPriorAuthorizations();
	}
	
	private <E extends Entity> void registerOperations(final UiObject<E> uiObject) {
		final AuthorizationManager authorizationManager = Node.getNode().getComponentSpace().resolve(AuthorizationManager.class);
		allowedOperations.put(uiObject.getInputKey(), authorizationManager.getAuthorizedOperations(uiObject.getServerSideObject()));
	}*/

	// ----------------- Security ---------------------------------

	public boolean hasAuthorization(final String... authorizationNames) {
		for (final String authorizationName : authorizationNames) {
			if (cacheAuthorizations.computeIfAbsent(authorizationName, k -> computeHasAuthorization(authorizationName))) {
				return true;
			}
		}
		return false;
	}

	public <E extends Entity> boolean hasOperation(final UiObject<E> uiObject, final String operationName) {
		Assertion.check().isNotNull(uiObject, "UiObject not load in context (null), can't check operation {0}", operationName);
		//----
		final String operationKey = uiObject.getInputKey() + OPERATION_KEY_SEP + operationName;
		return cacheOperations.computeIfAbsent(operationKey, k -> computeHasOperation(uiObject, operationName, operationKey));
	}

	private boolean computeHasAuthorization(final String authorizationName) {
		final boolean authorized = authorizationManager.hasAuthorization(() -> Authorization.PREFIX + authorizationName);
		if (authorized) {
			add(authorizationName); //add to this HashSet for json serialization
		}
		return authorized;
	}

	private <E extends Entity> boolean computeHasOperation(final UiObject<E> uiObject, final String operationName, final String operationKey) {
		final boolean authorized = authorizationManager.isAuthorized(uiObject.getServerSideObject(), () -> operationName);
		if (authorized) {
			add(operationKey); //add to this HashSet for json serialization
		}
		return authorized;
	}

	/*public static void preparePriorAuthorizations() {
		final ViewContext viewContext = UiRequestUtil.getCurrentViewContext();
		final UiAuthorizationUtil uiAuthorizationUtil = (UiAuthorizationUtil) viewContext.get(AbstractVSpringMvcController.AUTHZ_CONTEXT_KEY);
		uiAuthorizationUtil.registerPriorAuthorizations();
	}
	
	public static void prepareOperations(final ViewContextKey contextKey) {
		final ViewContext viewContext = UiRequestUtil.getCurrentViewContext();
		final UiAuthorizationUtil uiAuthorizationUtil = (UiAuthorizationUtil) viewContext.get(AbstractVSpringMvcController.AUTHZ_CONTEXT_KEY);
		uiAuthorizationUtil.registerOperations(viewContext.getUiObject(contextKey));
	}*/
}
