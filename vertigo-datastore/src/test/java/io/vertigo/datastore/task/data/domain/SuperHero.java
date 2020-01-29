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
package io.vertigo.datastore.task.data.domain;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.lang.DataType;
import io.vertigo.datamodel.smarttype.annotations.Mapper;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;
import io.vertigo.datamodel.structure.util.JsonMapper;

/**
 * SuperHero
 */
@Mapper(clazz = JsonMapper.class, dataType = DataType.String)
public final class SuperHero implements Entity {
	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	@Field(smartType = "STyId", type = "ID", cardinality = Cardinality.ONE, label = "superHero ID")
	private Long id;

	@Field(smartType = "STyString", label = "name")
	private String name;

	/** {@inheritDoc} */
	@Override
	public UID<SuperHero> getUID() {
		return UID.of(this);
	}

	public final Long getId() {
		return id;
	}

	public final void setId(final Long id) {
		this.id = id;
	}

	public final String getName() {
		return name;
	}

	public void setName(final String name) {
		this.name = name;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
