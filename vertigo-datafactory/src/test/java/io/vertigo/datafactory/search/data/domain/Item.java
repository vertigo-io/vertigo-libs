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
package io.vertigo.datafactory.search.data.domain;

import java.time.Instant;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.datamodel.structure.model.KeyConcept;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;

public final class Item implements KeyConcept {
	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long id;
	private String manufacturer;
	private String model;
	private String description;
	private Integer year;
	private Integer kilo;
	private Integer price;
	private java.math.BigDecimal consommation;
	private String motorType;
	private Long famId;
	private Long optionalNumber;
	private String optionalString;
	private Instant lastModified;

	/** {@inheritDoc} */
	@Override
	public UID<Item> getUID() {
		return UID.of(this);
	}

	@Field(smartType = "STyIdentifiant", type = "ID", cardinality = Cardinality.ONE, label = "identifiant de la voiture")
	public final Long getId() {
		return id;
	}

	public final void setId(final Long id) {
		this.id = id;
	}

	@Field(smartType = "STyKeyword", cardinality = Cardinality.ONE, label = "Constructeur")
	public final String getManufacturer() {
		return manufacturer;
	}

	public final void setManufacturer(final String manufacturer) {
		this.manufacturer = manufacturer;
	}

	@Field(smartType = "STyString", cardinality = Cardinality.ONE, label = "Modéle")
	public final String getModel() {
		return model;
	}

	public final void setModel(final String model) {
		this.model = model;
	}

	@Field(smartType = "STyFullText", cardinality = Cardinality.ONE, label = "Descriptif")
	public final String getDescription() {
		return description;
	}

	public final void setDescription(final String description) {
		this.description = description;
	}

	@Field(smartType = "STyInteger", cardinality = Cardinality.ONE, label = "Année")
	public final Integer getYear() {
		return year;
	}

	public final void setYear(final Integer year) {
		this.year = year;
	}

	@Field(smartType = "STyInteger", cardinality = Cardinality.ONE, label = "Kilométrage")
	public final Integer getKilo() {
		return kilo;
	}

	public final void setKilo(final Integer kilo) {
		this.kilo = kilo;
	}

	@Field(smartType = "STyInteger", cardinality = Cardinality.ONE, label = "Prix")
	public final Integer getPrice() {
		return price;
	}

	public final void setPrice(final Integer price) {
		this.price = price;
	}

	@Field(smartType = "STyConso", cardinality = Cardinality.ONE, label = "Consomation")
	public java.math.BigDecimal getConsommation() {
		return consommation;
	}

	public void setConsommation(final java.math.BigDecimal consommation) {
		this.consommation = consommation;
	}

	@Field(smartType = "STyKeyword", cardinality = Cardinality.ONE, label = "Type de moteur")
	public final String getMotorType() {
		return motorType;
	}

	public final void setMotorType(final String motorType) {
		this.motorType = motorType;
	}

	@Field(smartType = "STyIdentifiant", type = "FOREIGN_KEY", cardinality = Cardinality.ONE, label = "Famille")
	public final Long getFamId() {
		return famId;
	}

	public final void setFamId(final Long famId) {
		this.famId = famId;
	}

	@Field(smartType = "STyIdentifiant", label = "OptionalNumber")
	public final Long getOptionalNumber() {
		return optionalNumber;
	}

	public final void setOptionalNumber(final Long optionalNumber) {
		this.optionalNumber = optionalNumber;
	}

	@Field(smartType = "STyKeyword", label = "OptionalString")
	public final String getOptionalString() {
		return optionalString;
	}

	public final void setOptionalString(final String optionalString) {
		this.optionalString = optionalString;
	}

	@Field(smartType = "STyDateTime", label = "LastModified")
	public final Instant getLastModified() {
		return lastModified;
	}

	public final void setLastModified(final Instant lastModified) {
		this.lastModified = lastModified;
	}

	/*@Field(domain = "STy_KEYWORD", type = "COMPUTED", persistent = false, label = "model sort")
	public String getModelSort() {
		throw new VSystemException("Can't use index copyTo field");
	}*/

	@Field(smartType = "STyFullText", type = "COMPUTED", persistent = false, label = "index all")
	public String getAllText() {
		throw new VSystemException("Can't use index copyTo field");
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
