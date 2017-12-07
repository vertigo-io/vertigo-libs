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
package io.vertigo.rules.services;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 *
 * @author xdurand
 *
 */
public final class RuleContext {

	private final Map<String, Object> context;

	/**
	 *
	 * @param dtObject
	 * @param constants
	 */
	public RuleContext(final DtObject dtObject, final RuleConstants constants) {
		// Merging Object fields with constants

		final Map<String, Object> mapMerge = new HashMap<>();

		//Merge of data fields
		final DtDefinition definition = DtObjectUtil.findDtDefinition(dtObject);
		final List<DtField> fields = definition.getFields();

		for (final DtField dtField : fields) {

			final Object val = dtField.getDataAccessor().getValue(dtObject);
			if (val != null) {
				if (val instanceof List) {
					final List<Object> valList = (List<Object>) val;
					final List<String> valListString = valList
							.stream()
							.map(Object::toString)
							.collect(Collectors.toList());
					mapMerge.put(dtField.getName(), valListString);
				} else {
					mapMerge.put(dtField.getName(), val.toString());
				}
			}

		}

		//Merge of constants
		if (constants != null) {
			for (final Map.Entry<String, String> entry : constants.getValues()) {
				mapMerge.put(entry.getKey(), entry.getValue());
			}
		}

		context = Collections.unmodifiableMap(mapMerge);
	}

	/**
	 * @return the context
	 */
	public Map<String, Object> getContext() {
		return context;
	}

}
