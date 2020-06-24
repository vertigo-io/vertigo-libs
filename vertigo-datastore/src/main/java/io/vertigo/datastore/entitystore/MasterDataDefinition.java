/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.datastore.entitystore;

import java.util.function.Predicate;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionPrefix;
import io.vertigo.datamodel.structure.model.DtListURIForMasterData;

@DefinitionPrefix("Md")
public class MasterDataDefinition implements Definition {

	private final String name;
	private final DtListURIForMasterData uri;
	private final Predicate predicate;

	public MasterDataDefinition(
			final String name,
			final DtListURIForMasterData uri,
			final Predicate predicate) {
		Assertion.check()
				.isNotBlank(name)
				.notNull(uri)
				.notNull(predicate);
		//---
		this.name = name;
		this.uri = uri;
		this.predicate = predicate;
	}

	@Override
	public String getName() {
		return name;
	}

	public DtListURIForMasterData getUri() {
		return uri;
	}

	public Predicate getPredicate() {
		return predicate;
	}

}
