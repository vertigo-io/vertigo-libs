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
package io.vertigo.datastore.entitystore.data.domain.famille;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.lang.DataType;
import io.vertigo.core.lang.Generated;
import io.vertigo.datamodel.smarttype.annotations.Mapper;
import io.vertigo.datamodel.structure.metamodel.DtFieldName;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;
import io.vertigo.datamodel.structure.util.JsonMapper;
import io.vertigo.datastore.entitystore.data.domain.car.Car;
import io.vertigo.datastore.impl.entitystore.StoreListVAccessor;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
@Mapper(clazz = JsonMapper.class, dataType = DataType.String)
public final class Famille implements Entity {

	public enum CarFields implements DtFieldName<Car> {
		id, manufacturer, model, description, year, kilo, price, consomation, mtyCd, famId
	}

	private static final long serialVersionUID = 1L;

	private Long famId;
	private String libelle;

	@io.vertigo.datamodel.structure.stereotype.Association(
			name = "AFamCarFamille",
			fkFieldName = "famId",
			primaryDtDefinitionName = "DtFamille",
			primaryIsNavigable = false,
			primaryRole = "Famille",
			primaryLabel = "Famille",
			primaryMultiplicity = "1..1",
			foreignDtDefinitionName = "DtCar",
			foreignIsNavigable = true,
			foreignRole = "VoituresFamille",
			foreignLabel = "Voitures de la famille",
			foreignMultiplicity = "0..*")
	private final StoreListVAccessor<Car> voituresFamilleAccessor = new StoreListVAccessor<>(this, "AFamCarFamille", "VoituresFamille");

	@io.vertigo.datamodel.structure.stereotype.AssociationNN(
			name = "AnnFamCarLocation",
			tableName = "FAM_CAR_LOCATION",
			dtDefinitionA = "DtFamille",
			dtDefinitionB = "DtCar",
			navigabilityA = false,
			navigabilityB = true,
			roleA = "Famille",
			roleB = "VoituresLocation",
			labelA = "Famille",
			labelB = "Voitures de location")
	private final StoreListVAccessor<Car> voituresLocationAccessor = new StoreListVAccessor<>(this, "AnnFamCarLocation", "VoituresLocation");

	/** {@inheritDoc} */
	@Override
	public UID<Famille> getUID() {
		return UID.of(this);
	}

	/**
	 * Champ : id.
	 * Récupère la valeur de la propriété 'identifiant de la famille'.
	 * @return Long famId <b>Obligatoire</b>
	 */
	@Field(smartType = "STyId", type = "ID", cardinality = Cardinality.ONE, label = "identifiant de la famille")
	public Long getFamId() {
		return famId;
	}

	/**
	 * Champ : id.
	 * Définit la valeur de la propriété 'identifiant de la famille'.
	 * @param famId Long <b>Obligatoire</b>
	 */
	public void setFamId(final Long famId) {
		this.famId = famId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Libelle'.
	 * @return String libelle
	 */
	@Field(smartType = "STyString", label = "Libelle")
	public String getLibelle() {
		return libelle;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Libelle'.
	 * @param libelle String
	 */
	public void setLibelle(final String libelle) {
		this.libelle = libelle;
	}

	/**
	 * Champ : COMPUTED.
	 * Récupère la valeur de la propriété calculée 'Libelle'.
	 * @return String description
	 */
	@Field(smartType = "STyLibelleLong", type = "COMPUTED", persistent = false, label = "Libelle")
	public String getDescription() {
		final StringBuilder builder = new StringBuilder();
		builder.append(getLibelle());
		builder.append('[');
		builder.append(getFamId());
		builder.append(']');
		return builder.toString();
	}

	/**
	 * Association : Voitures de la famille.
	 * @return l'accesseur vers la propriété 'Voitures de la famille'
	 */
	public StoreListVAccessor<Car> voituresFamille() {
		return voituresFamilleAccessor;
	}

	/**
	 * Association : Voitures de la famille.
	 * @return io.vertigo.dynamo.domain.model.DtList<Car>
	 */
	@Deprecated
	public io.vertigo.datamodel.structure.model.DtList<Car> getVoituresFamilleList() {
		// we keep the lazyness
		if (!voituresFamilleAccessor.isLoaded()) {
			voituresFamilleAccessor.load();
		}
		return voituresFamilleAccessor.get();
	}

	/**
	 * Association URI: Voitures de la famille.
	 * @return URI de l'association
	 */
	@Deprecated
	public io.vertigo.datamodel.structure.metamodel.association.DtListURIForSimpleAssociation getVoituresFamilleDtListURI() {
		return (io.vertigo.datamodel.structure.metamodel.association.DtListURIForSimpleAssociation) voituresFamilleAccessor.getDtListURI();
	}

	/**
	 * Association : Voitures de location.
	 * @return l'accesseur vers la propriété 'Voitures de location'
	 */
	public StoreListVAccessor<Car> voituresLocation() {
		return voituresLocationAccessor;
	}

	/**
	 * Association : Voitures de location.
	 * @return io.vertigo.dynamo.domain.model.DtList<Car>
	 */
	@Deprecated
	public io.vertigo.datamodel.structure.model.DtList<Car> getVoituresLocationList() {
		// we keep the lazyness
		if (!voituresLocationAccessor.isLoaded()) {
			voituresLocationAccessor.load();
		}
		return voituresLocationAccessor.get();
	}

	/**
	 * Association URI: Voitures de location.
	 * @return URI de l'association
	 */
	@Deprecated
	public io.vertigo.datamodel.structure.metamodel.association.DtListURIForNNAssociation getVoituresLocationDtListURI() {
		return (io.vertigo.datamodel.structure.metamodel.association.DtListURIForNNAssociation) voituresLocationAccessor.getDtListURI();
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
