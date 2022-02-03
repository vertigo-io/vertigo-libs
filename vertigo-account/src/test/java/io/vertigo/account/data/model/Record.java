/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
package io.vertigo.account.data.model;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;

/**
 * Dossier.
 */
public final class Record implements Entity {
	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long dosId;

	private Long regId;
	private Long depId;
	private Long comId;

	private Long typId;
	private String title;
	private Double amount;
	private Long utiIdOwner;

	private String etaCd;

	/** {@inheritDoc}*/
	@Override
	public UID<Record> getUID() {
		return UID.of(this);
	}

	@Field(smartType = "STyId", type = "ID", cardinality = Cardinality.ONE, label = "Id")
	public Long getDosId() {
		return dosId;
	}

	public void setDosId(final Long dosId) {
		this.dosId = dosId;
	}

	@Field(smartType = "STyId", label = "Region")
	public Long getRegId() {
		return regId;
	}

	public void setRegId(final Long regId) {
		this.regId = regId;
	}

	@Field(smartType = "STyId", label = "Département")
	public Long getDepId() {
		return depId;
	}

	public void setDepId(final Long depId) {
		this.depId = depId;
	}

	@Field(smartType = "STyId", label = "Commune")
	public Long getComId() {
		return comId;
	}

	public void setComId(final Long comId) {
		this.comId = comId;
	}

	@Field(smartType = "STyId", cardinality = Cardinality.ONE, label = "Type dossier")
	public Long getTypId() {
		return typId;
	}

	public void setTypId(final Long typId) {
		this.typId = typId;
	}

	@Field(smartType = "STyLabel", cardinality = Cardinality.ONE, label = "Title")
	public String getTitle() {
		return title;
	}

	public void setTitle(final String title) {
		this.title = title;
	}

	@Field(smartType = "STyMontant", cardinality = Cardinality.ONE, label = "Amount")
	public Double getAmount() {
		return amount;
	}

	public void setAmount(final Double amount) {
		this.amount = amount;
	}

	@Field(smartType = "STyId", cardinality = Cardinality.ONE, label = "Créateur")
	public Long getUtiIdOwner() {
		return utiIdOwner;
	}

	public void setUtiIdOwner(final Long utiIdOwner) {
		this.utiIdOwner = utiIdOwner;
	}

	@Field(smartType = "STyCode", cardinality = Cardinality.ONE, label = "Etat dossier")
	public String getEtaCd() {
		return etaCd;
	}

	public void setEtaCd(final String etaCd) {
		this.etaCd = etaCd;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
