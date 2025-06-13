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
package io.vertigo.vega.plugins.webservice.handler;

import java.io.Serializable;
import java.util.Collection;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.account.authorization.VSecurityException;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.vega.engines.webservice.json.JsonEngine;
import io.vertigo.vega.engines.webservice.json.UiContext;
import io.vertigo.vega.engines.webservice.json.UiListDelta;
import io.vertigo.vega.engines.webservice.json.UiListModifiable;
import io.vertigo.vega.impl.webservice.WebServiceHandlerPlugin;
import io.vertigo.vega.token.TokenManager;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition;
import io.vertigo.vega.webservice.definitions.WebServiceParam;
import io.vertigo.vega.webservice.exception.SessionException;
import io.vertigo.vega.webservice.model.ExtendedObject;
import io.vertigo.vega.webservice.model.UiObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * ServerSide state handler.
 * On request : recover params serverState and merge user input
 * On response : keep result server side and add token to response
 * @author npiedeloup
 */
public final class ServerSideStateWebServiceHandlerPlugin implements WebServiceHandlerPlugin {

	/** Stack index of the handler for sorting at startup**/
	public static final int STACK_INDEX = 80;

	private static final LocaleMessageText SERVER_SIDE_MANDATORY = LocaleMessageText.of("ServerSideToken mandatory");
	private final TokenManager tokenManager;

	/**
	 * Constructor.
	 * @param tokenManager TokenManager
	 */
	@Inject
	public ServerSideStateWebServiceHandlerPlugin(final TokenManager tokenManager) {
		Assertion.check().isNotNull(tokenManager);
		//-----
		this.tokenManager = tokenManager;
	}

	/** {@inheritDoc} */
	@Override
	public boolean accept(final WebServiceDefinition webServiceDefinition) {
		if (webServiceDefinition.isServerSideSave()) {
			return true;
		}
		return webServiceDefinition.getWebServiceParams()
				.stream()
				.anyMatch(WebServiceParam::isNeedServerSideToken);
	}

	/** {@inheritDoc}  */
	@Override
	public Object handle(final HttpServletRequest request, final HttpServletResponse response, final WebServiceCallContext routeContext, final HandlerChain chain) throws SessionException {
		for (final WebServiceParam webServiceParam : routeContext.getWebServiceDefinition().getWebServiceParams()) {
			if (webServiceParam.isNeedServerSideToken()) {
				final Object webServiceValue = routeContext.getParamValue(webServiceParam);
				if (webServiceValue instanceof UiObject) {
					readServerSideUiObject((UiObject<DataObject>) webServiceValue, webServiceParam.isConsumeServerSideToken());
				} else if (webServiceValue instanceof UiListModifiable) {
					readServerSideUiList((UiListModifiable<DataObject>) webServiceValue, webServiceParam.isConsumeServerSideToken());
				} else if (webServiceValue instanceof UiListDelta) {
					readServerSideUiListDelta((UiListDelta<DataObject>) webServiceValue, webServiceParam.isConsumeServerSideToken());
				} else {
					throw new UnsupportedOperationException("Can't read serverSide state for this object type : " + webServiceParam.getGenericType());
				}
			}
		}

		final Object returnValue = chain.handle(request, response, routeContext);

		if (routeContext.getWebServiceDefinition().isServerSideSave()) {
			//On ecrit le résultat coté serveur, l'objet de retour est overridé avec les méta données de token
			//On garde la variable pour gagner en lisibilité et en sémentique
			final Serializable overridedReturnValue = writeServerSideObject(returnValue);
			return overridedReturnValue;
		}

		return returnValue;
	}

	private void readServerSideUiObject(final UiObject<DataObject> uiObject, final boolean consumeServerSideToken) {
		final String accessToken = uiObject.getServerSideToken();
		if (accessToken == null) {
			throw new VSecurityException(SERVER_SIDE_MANDATORY); //same message for no ServerSideToken or bad ServerSideToken
		}
		final Optional<Serializable> serverSideObjectOpt;
		if (consumeServerSideToken) {
			//if exception : token is consume. It's for security reason : no replay on bad request (brute force password)
			serverSideObjectOpt = tokenManager.getAndRemove(accessToken);
		} else {
			serverSideObjectOpt = tokenManager.get(accessToken);
		}
		final Serializable serverSideObject = serverSideObjectOpt
				//same message for no ServerSideToken or bad ServerSideToken
				.orElseThrow(() -> new VSecurityException(SERVER_SIDE_MANDATORY));

		uiObject.setServerSideObject((DataObject) serverSideObject);
	}

	private void readServerSideUiList(final Collection<UiObject<DataObject>> uiList, final boolean consumeServerSideToken) {
		for (final UiObject<DataObject> entry : uiList) {
			readServerSideUiObject(entry, consumeServerSideToken);
		}
	}

	private void readServerSideUiListDelta(final UiListDelta<DataObject> uiListDelta, final boolean consumeServerSideToken) {
		readServerSideUiList(uiListDelta.getCreatesMap().values(), consumeServerSideToken);
		readServerSideUiList(uiListDelta.getUpdatesMap().values(), consumeServerSideToken);
		readServerSideUiList(uiListDelta.getDeletesMap().values(), consumeServerSideToken);
	}

	private Serializable writeServerSideObject(final Object returnValue) {
		Assertion.check()
				.isNotNull(returnValue, "Return null value can't be saved ServerSide")
				.isTrue(DataObject.class.isInstance(returnValue)
						|| DtList.class.isInstance(returnValue)
						|| UiContext.class.isInstance(returnValue)
						|| ExtendedObject.class.isInstance(returnValue), "Return type can't be saved ServerSide : {0}", returnValue.getClass().getSimpleName());

		final Object savedObject; //Object sauvé coté serveur
		final Map<String, Serializable> overridedReturnValue; //Object retourné au client (globalement l'objet sauvé + le tokenId)

		if (returnValue instanceof UiContext) {
			overridedReturnValue = new UiContext();
			for (final Entry<String, Serializable> entry : ((UiContext) returnValue).entrySet()) {

				final Serializable overridedEntry;
				//On enregistre et on ajoute le token sur les objets qui le supportent mais on accepte les autres.
				if (DataObject.class.isInstance(entry.getValue())
						|| DtList.class.isInstance(entry.getValue())
						|| ExtendedObject.class.isInstance(entry.getValue())) {
					overridedEntry = writeServerSideObject(entry.getValue());
				} else {
					overridedEntry = entry.getValue();
				}
				overridedReturnValue.put(entry.getKey(), overridedEntry);
			}
			savedObject = overridedReturnValue;
		} else if (returnValue instanceof ExtendedObject) {
			overridedReturnValue = (ExtendedObject<Object>) returnValue;
			savedObject = ((ExtendedObject<Object>) returnValue).getInnerObject();
			Assertion.check().isTrue(DataObject.class.isInstance(savedObject)
					|| DtList.class.isInstance(savedObject)
					|| UiContext.class.isInstance(savedObject), "Return type can't be saved ServerSide : {0}", savedObject.getClass().getSimpleName());
		} else {
			overridedReturnValue = new ExtendedObject<>(returnValue);
			savedObject = returnValue;
		}

		final String tokenId = tokenManager.put(Serializable.class.cast(savedObject));
		overridedReturnValue.put(JsonEngine.SERVER_SIDE_TOKEN_FIELDNAME, tokenId);
		return Serializable.class.cast(overridedReturnValue);
	}

	@Override
	public int getStackIndex() {
		return STACK_INDEX;
	}
}
