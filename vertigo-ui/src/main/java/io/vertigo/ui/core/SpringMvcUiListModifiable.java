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

import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.vega.engines.webservice.json.AbstractUiListModifiable;
import io.vertigo.vega.webservice.model.UiObject;

public class SpringMvcUiListModifiable<D extends DtObject> extends AbstractUiListModifiable<D> {

	private static final long serialVersionUID = -6612061761970992295L;

	SpringMvcUiListModifiable(final DtList<D> dtList, final String inputKey) {
		super(dtList, inputKey);

	}

	/* (non-Javadoc)
	 * @see io.vertigo.struts2.core.AbstractUiListModifiable#createUiObject(io.vertigo.dynamo.domain.model.DtObject)
	 */
	@Override
	protected UiObject<D> createUiObject(final D dto) {
		return new SpringMvcUiObject<>(dto);
	}

}
