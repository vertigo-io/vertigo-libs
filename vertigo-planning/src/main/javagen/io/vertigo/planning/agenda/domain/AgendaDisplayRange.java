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
package io.vertigo.planning.agenda.domain;

import io.vertigo.core.lang.Generated;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
public final class AgendaDisplayRange implements DtObject {
	private static final long serialVersionUID = 1L;

	private Long demId;
	private Long ageId;
	private java.time.LocalDate showDate;
	private java.time.LocalDate firstDate;
	private java.time.LocalDate lastDate;
	private Boolean mondayLock;
	private Integer showDays;
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Id démarche'.
	 * @return Long demId
	 */
	@Field(smartType = "STyPId", label = "Id démarche")
	public Long getDemId() {
		return demId;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Id démarche'.
	 * @param demId Long
	 */
	public void setDemId(final Long demId) {
		this.demId = demId;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Id agenda'.
	 * @return Long ageId
	 */
	@Field(smartType = "STyPId", label = "Id agenda")
	public Long getAgeId() {
		return ageId;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Id agenda'.
	 * @param ageId Long
	 */
	public void setAgeId(final Long ageId) {
		this.ageId = ageId;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Date sélectionnée'.
	 * @return LocalDate showDate
	 */
	@Field(smartType = "STyPLocalDate", label = "Date sélectionnée")
	public java.time.LocalDate getShowDate() {
		return showDate;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Date sélectionnée'.
	 * @param showDate LocalDate
	 */
	public void setShowDate(final java.time.LocalDate showDate) {
		this.showDate = showDate;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Date de début'.
	 * @return LocalDate firstDate
	 */
	@Field(smartType = "STyPLocalDate", label = "Date de début")
	public java.time.LocalDate getFirstDate() {
		return firstDate;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Date de début'.
	 * @param firstDate LocalDate
	 */
	public void setFirstDate(final java.time.LocalDate firstDate) {
		this.firstDate = firstDate;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Date de fin (incluse)'.
	 * @return LocalDate lastDate
	 */
	@Field(smartType = "STyPLocalDate", label = "Date de fin (incluse)")
	public java.time.LocalDate getLastDate() {
		return lastDate;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Date de fin (incluse)'.
	 * @param lastDate LocalDate
	 */
	public void setLastDate(final java.time.LocalDate lastDate) {
		this.lastDate = lastDate;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Si commence toujours par lundi'.
	 * @return Boolean mondayLock
	 */
	@Field(smartType = "STyPBooleen", label = "Si commence toujours par lundi")
	public Boolean getMondayLock() {
		return mondayLock;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Si commence toujours par lundi'.
	 * @param mondayLock Boolean
	 */
	public void setMondayLock(final Boolean mondayLock) {
		this.mondayLock = mondayLock;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Nombre de jour affichés'.
	 * @return Integer showDays
	 */
	@Field(smartType = "STyPNombre", label = "Nombre de jour affichés")
	public Integer getShowDays() {
		return showDays;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nombre de jour affichés'.
	 * @param showDays Integer
	 */
	public void setShowDays(final Integer showDays) {
		this.showDays = showDays;
	}
	
	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
