/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.datafactory.collections.data.domain;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;

public final class SmartItemCd implements Entity {
	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	@Field(smartType = "STyKeyword", type = "ID", cardinality = Cardinality.ONE, label = "cd")
	private String cd;

	@Field(smartType = "STyText", label = "label")
	private String label;

	/** {@inheritDoc} */
	@Override
	public UID<SmartItemCd> getUID() {
		return UID.of(this);
	}

	public String getCd() {
		return cd;
	}

	public void setCd(final String cd) {
		this.cd = cd;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(final String label) {
		this.label = label;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
