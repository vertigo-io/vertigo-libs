/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.quarto.services.export.data.domain;

import java.time.Instant;
import java.time.LocalDate;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.UID;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.domain.util.JsonMapper;
import io.vertigo.dynamo.ngdomain.annotations.Mapper;

/**
 * Country.
 */
@Mapper(clazz = JsonMapper.class, dataType = DataType.String)
public final class Country implements Entity {
	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long id;
	private Long conId;
	private String name;
	private Boolean active;
	private LocalDate localDate;
	private Instant instant;

	@Override
	public UID getUID() {
		return UID.of(this);
	}

	@Field(domain = "STyId", type = "ID", cardinality = Cardinality.ONE, label = "id of the country")
	public final Long getId() {
		return id;
	}

	public Country setId(final Long id) {
		this.id = id;
		return this;
	}

	@Field(domain = "STyId", cardinality = Cardinality.ONE, label = "id of the continent")
	public final Long getConId() {
		return conId;
	}

	public Country setConId(final Long conId) {
		this.conId = conId;
		return this;
	}

	@Field(domain = "STyString", label = "name")
	public final String getName() {
		return name;
	}

	public Country setName(final String name) {
		this.name = name;
		return this;
	}

	@Field(domain = "STyBoolean", label = "active")
	public final Boolean getActive() {
		return active;
	}

	public Country setActive(final boolean active) {
		this.active = active;
		return this;
	}

	@Field(domain = "STyLocalDate", label = "local date")
	public final LocalDate getLocalDate() {
		return localDate;
	}

	public Country setLocalDate(final LocalDate localDate) {
		this.localDate = localDate;
		return this;
	}

	@Field(domain = "STyInstant", label = "instant")
	public final Instant getInstant() {
		return instant;
	}

	public Country setInstant(final Instant instant) {
		this.instant = instant;
		return this;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
