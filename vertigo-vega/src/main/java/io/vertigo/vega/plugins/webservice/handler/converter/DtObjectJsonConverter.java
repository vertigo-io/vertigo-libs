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
package io.vertigo.vega.plugins.webservice.handler.converter;

import java.lang.reflect.Type;
import java.util.Arrays;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.vega.engines.webservice.json.JsonEngine;
import io.vertigo.vega.engines.webservice.json.UiContext;
import io.vertigo.vega.engines.webservice.json.UiListDelta;
import io.vertigo.vega.plugins.webservice.handler.WebServiceCallContext;
import io.vertigo.vega.webservice.definitions.WebServiceParam;
import io.vertigo.vega.webservice.model.UiObject;

public final class DtObjectJsonConverter implements JsonConverter {
	private final JsonEngine jsonReaderEngine;

	/**
	 * @param jsonReaderEngine jsonReaderEngine
	 */
	@Inject
	public DtObjectJsonConverter(final JsonEngine jsonReaderEngine) {
		Assertion.check().isNotNull(jsonReaderEngine);
		//-----
		this.jsonReaderEngine = jsonReaderEngine;
	}

	/** {@inheritDoc} */
	@Override
	public boolean canHandle(final Class<?> paramClass) {
		return DataObject.class.isAssignableFrom(paramClass);
	}

	/** {@inheritDoc}*/
	@Override
	public void populateWebServiceCallContext(final Object input, final WebServiceParam webServiceParam, final WebServiceCallContext routeContext) {
		final Class<?> paramClass = webServiceParam.getType();
		Assertion.check()
				.isTrue(DataObject.class.isAssignableFrom(paramClass), "This JsonConverter can't read the asked type {0}. Only {1} is supported", paramClass.getSimpleName(),
						DataObject.class.getSimpleName())
				.isTrue(getSupportedInputs()[0].isInstance(input) || getSupportedInputs()[1].isInstance(input), "This JsonConverter doesn't support this input type {0}. Only {1} is supported",
						input.getClass().getSimpleName(), Arrays.toString(getSupportedInputs()));
		//-----
		final Type paramGenericType = webServiceParam.getGenericType();
		final String objectPath;
		final UiObject<DataObject> uiObject;
		if (input instanceof String) {
			uiObject = jsonReaderEngine.uiObjectFromJson((String) input, paramGenericType);
			objectPath = "";
		} else if (input instanceof UiContext) { //cas des innerBodyParam
			uiObject = (UiObject<DataObject>) ((UiContext) input).get(webServiceParam.getName());
			objectPath = webServiceParam.getName();
		} else {
			throw new IllegalArgumentException(String.format("This JsonConverter can't read the asked type %s. Only %s is supported", paramClass.getSimpleName(), UiListDelta.class.getSimpleName()));
		}
		//-----
		if (uiObject != null) { //uiObject peut être null ici si optional
			UiObjectUtil.postReadUiObject(uiObject, objectPath, webServiceParam);
		}
		routeContext.setParamValue(webServiceParam, uiObject);
	}

	/** {@inheritDoc} */
	@Override
	public Class[] getSupportedInputs() {
		return new Class[] { String.class, UiContext.class };
	}
}
