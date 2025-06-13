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
package io.vertigo.ui.core;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;

import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.vega.engines.webservice.json.AbstractUiListModifiable;
import io.vertigo.vega.webservice.model.UiObject;

public class BasicUiListModifiable<D extends DataObject> extends AbstractUiListModifiable<D> {

	private static final long serialVersionUID = -6612061761970992295L;
	private ViewContextUpdateSecurity viewContextUpdateSecurity;

	BasicUiListModifiable(final DtList<D> dtList, final String inputKey, final ViewContextUpdateSecurity viewContextUpdateSecurity) {
		super(dtList, inputKey, t -> ((BasicUiListModifiable) t).viewContextUpdateSecurity = viewContextUpdateSecurity);
	}

	@Override
	protected UiObject<D> createUiObject(final D dto) {
		return new MapUiObject<>(dto, viewContextUpdateSecurity);
	}

	public ArrayList<HashMap<String, Serializable>> listForClient(final Set<String> fieldsForClient, final Map<String, Function<Serializable, String>> valueTransformers) {
		final ArrayList<HashMap<String, Serializable>> listForClient = new ArrayList<>();
		for (final UiObject uiObject : this) {
			listForClient.add(((MapUiObject) uiObject).mapForClient(fieldsForClient, valueTransformers));
		}
		return listForClient;
	}

	@Override
	protected String toContextKey(final String inputKey, final int index) {
		return inputKey + "[" + index + "]";
	}

}
