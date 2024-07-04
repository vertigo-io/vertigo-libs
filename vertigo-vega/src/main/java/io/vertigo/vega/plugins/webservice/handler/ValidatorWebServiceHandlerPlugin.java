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
package io.vertigo.vega.plugins.webservice.handler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import io.vertigo.core.util.ClassUtil;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.vega.engines.webservice.json.UiListDelta;
import io.vertigo.vega.engines.webservice.json.UiListModifiable;
import io.vertigo.vega.impl.webservice.WebServiceHandlerPlugin;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition;
import io.vertigo.vega.webservice.definitions.WebServiceParam;
import io.vertigo.vega.webservice.exception.SessionException;
import io.vertigo.vega.webservice.model.DtListDelta;
import io.vertigo.vega.webservice.model.ExtendedObject;
import io.vertigo.vega.webservice.model.UiObject;
import io.vertigo.vega.webservice.validation.DtObjectValidator;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.ValidationUserException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Params handler. Extract and Json convert.
 *
 * @author npiedeloup
 */
public final class ValidatorWebServiceHandlerPlugin implements WebServiceHandlerPlugin {

	/** Stack index of the handler for sorting at startup **/
	public static final int STACK_INDEX = 110;

	/** {@inheritDoc} */
	@Override
	public boolean accept(final WebServiceDefinition webServiceDefinition) {
		return true;
	}

	/** {@inheritDoc} */
	@Override
	public Object handle(final HttpServletRequest request, final HttpServletResponse response, final WebServiceCallContext routeContext, final HandlerChain chain) throws SessionException {
		final WebServiceDefinition webServiceDefinition = routeContext.getWebServiceDefinition();
		final UiMessageStack uiMessageStack = routeContext.getUiMessageStack();
		for (final WebServiceParam webServiceParam : webServiceDefinition.getWebServiceParams()) {
			final Object value = routeContext.getParamValue(webServiceParam);
			validateParam(value, uiMessageStack, webServiceParam, routeContext);
		}
		if (uiMessageStack.hasErrors()) {
			throw new ValidationUserException();
		}
		return chain.handle(request, response, routeContext);
	}

	private static void validateParam(final Object value, final UiMessageStack uiMessageStack, final WebServiceParam webServiceParam, final WebServiceCallContext routeContext) {
		final Map<String, DataObject> contextKeyMap = new HashMap<>();
		if (value instanceof UiObject && DataObject.class.isAssignableFrom(webServiceParam.getType())) {
			final UiObject<DataObject> uiObject = (UiObject<DataObject>) value;
			final List<DtObjectValidator<DataObject>> dtObjectValidators = obtainDtObjectValidators(webServiceParam);
			//Only authorized fields have already been checked (JsonConverterHandler)
			final DataObject updatedDto = uiObject.mergeAndCheckInput(dtObjectValidators, uiMessageStack);
			contextKeyMap.put(uiObject.getInputKey(), updatedDto);
			routeContext.registerUpdatedDtObjects(webServiceParam, updatedDto, contextKeyMap);
		} else if (value instanceof UiListDelta && DtListDelta.class.isAssignableFrom(webServiceParam.getType())) {
			final UiListDelta<DataObject> uiListDelta = (UiListDelta<DataObject>) value;
			final List<DtObjectValidator<DataObject>> dtObjectValidators = obtainDtObjectValidators(webServiceParam);

			//Only authorized fields have already been checked (JsonConverterHandler)
			final DtList<DataObject> dtListCreates = mergeAndCheckInput(uiListDelta.getObjectType(), uiListDelta.getCreatesMap(), dtObjectValidators, uiMessageStack, contextKeyMap);
			final DtList<DataObject> dtListUpdates = mergeAndCheckInput(uiListDelta.getObjectType(), uiListDelta.getUpdatesMap(), dtObjectValidators, uiMessageStack, contextKeyMap);
			final DtList<DataObject> dtListDeletes = mergeAndCheckInput(uiListDelta.getObjectType(), uiListDelta.getDeletesMap(), dtObjectValidators, uiMessageStack, contextKeyMap);
			final DtListDelta<DataObject> dtListDelta = new DtListDelta<>(dtListCreates, dtListUpdates, dtListDeletes);
			routeContext.registerUpdatedDtObjects(webServiceParam, dtListDelta, contextKeyMap);
		} else if (value instanceof UiListModifiable && DtList.class.isAssignableFrom(webServiceParam.getType())) {
			final UiListModifiable<DataObject> uiList = (UiListModifiable<DataObject>) value;
			final List<DtObjectValidator<DataObject>> dtObjectValidators = obtainDtObjectValidators(webServiceParam);

			//Only authorized fields have already been checked (JsonConverterHandler)
			final DtList<DataObject> dtList = mergeAndCheckInput(uiList.getObjectType(), uiList, dtObjectValidators, uiMessageStack, contextKeyMap);
			routeContext.registerUpdatedDtObjects(webServiceParam, dtList, contextKeyMap);
		} else if (value instanceof ExtendedObject) {
			final ExtendedObject<?> extendedObject = (ExtendedObject) value;
			validateParam(extendedObject.getInnerObject(), uiMessageStack, webServiceParam, routeContext);
			final Object updatedValue = routeContext.getParamValue(webServiceParam);
			final ExtendedObject<?> updatedExtendedObject = new ExtendedObject(updatedValue);
			updatedExtendedObject.putAll(extendedObject);
			routeContext.setParamValue(webServiceParam, updatedExtendedObject);
		} else if (value instanceof Optional && ((Optional) value).isPresent()) {
			validateParam(((Optional) value).get(), uiMessageStack, webServiceParam, routeContext);
		}
	}

	private static List<DtObjectValidator<DataObject>> obtainDtObjectValidators(final WebServiceParam webServiceParam) {
		final List<Class<? extends DtObjectValidator>> dtObjectValidatorClasses = webServiceParam.getDtObjectValidatorClasses();
		final List<DtObjectValidator<DataObject>> dtObjectValidators = new ArrayList<>(dtObjectValidatorClasses.size());
		for (final Class<? extends DtObjectValidator> dtObjectValidatorClass : dtObjectValidatorClasses) {
			dtObjectValidators.add(ClassUtil.newInstance(dtObjectValidatorClass));
		}
		return dtObjectValidators;
	}

	private static <D extends DataObject> DtList<D> mergeAndCheckInput(
			final Class<D> objectType,
			final Map<String, UiObject<D>> uiObjectMap,
			final List<DtObjectValidator<D>> dtObjectValidators,
			final UiMessageStack uiMessageStack,
			final Map<String, DataObject> contextKeyMap) {
		final DtList<D> dtList = new DtList<>(objectType);
		for (final Map.Entry<String, UiObject<D>> entry : uiObjectMap.entrySet()) {
			final D dto = entry.getValue().mergeAndCheckInput(dtObjectValidators, uiMessageStack);
			dtList.add(dto);
			contextKeyMap.put(entry.getValue().getInputKey(), dto);
		}
		return dtList;
	}

	private static <D extends DataObject> DtList<D> mergeAndCheckInput(
			final Class<D> objectType,
			final UiListModifiable<D> uiList,
			final List<DtObjectValidator<D>> dtObjectValidators,
			final UiMessageStack uiMessageStack,
			final Map<String, DataObject> contextKeyMap) {
		final DtList<D> dtList = new DtList<>(objectType);
		for (final UiObject<D> element : uiList) {
			final D dto = element.mergeAndCheckInput(dtObjectValidators, uiMessageStack);
			dtList.add(dto);
			contextKeyMap.put(element.getInputKey(), dto);
		}
		return dtList;
	}

	@Override
	public int getStackIndex() {
		return STACK_INDEX;
	}
}
