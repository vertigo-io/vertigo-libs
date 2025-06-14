/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.datamodel.data.model;

import java.io.Serializable;
import java.util.AbstractList;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.DefinitionId;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.util.DataModelUtil;

/**
 * Classe de stockage des listes.
 * Une dtList est une liste constituée avec un seul type d'objet.
 * Les objets null ne sont pas autorisés.
 *
 * @author fconstantin
 * @param <D> Type du DtObject
 */
public final class DtList<D extends DataObject> extends AbstractList<D> implements Serializable {
	private static final int TO_STRING_MAX_ELEMENTS = 50;
	private static final long serialVersionUID = -8059200549636099190L;
	/**
	 * total count
	 */
	public static final String TOTAL_COUNT_META = "totalCount";

	private final DtListURI uri;

	/** Reéférence vers la Définition. */
	private final DefinitionId<DataDefinition> dataDefinitionId;

	/** List des dto contenus. */
	private final List<D> datas;

	/** List des dto contenus. */
	private final Map<String, Serializable> metaDatas;

	/**
	 * Constructor.
	 *
	 * @param dataDefinition Définition de DT
	 */
	public DtList(final DataDefinition dataDefinition) {
		this.dataDefinitionId = dataDefinition.id();
		this.uri = null; //new DtListURIForValueObject(dataDefinition);
		this.datas = new ArrayList<>(); //
		this.metaDatas = new LinkedHashMap<>();
	}

	/**
	 * Constructor.
	 *
	 * @param dtList DtList to clone
	 * @param uri DtList uri
	 */
	public DtList(final DtList<D> dtList, final DtListURI uri) {
		Assertion.check().isNotNull(uri);
		//---
		this.dataDefinitionId = dtList.dataDefinitionId; //The same DtDefinition
		this.uri = uri;
		this.datas = new ArrayList<>(dtList.datas); //Clone
		this.metaDatas = new LinkedHashMap<>(dtList.metaDatas); //clone
	}

	/**
	 * Constructor.
	 *
	 * @param dtObjectClass Type d'objet
	 */
	public DtList(final Class<D> dtObjectClass) {
		this(DataModelUtil.findDataDefinition(dtObjectClass));
	}

	/**
	 * Static method factory for convenient creation of DtList using 'of' pattern.
	 *
	 * @param dto the mandatory dto to add which defines the type.
	 * @param dtos Dtos to add.
	 * @return the created DtList.
	 * @param <D> Type of this list
	 */
	@SafeVarargs
	public static <D extends DataObject> DtList<D> of(final D dto, final D... dtos) {
		return DtList.of(dto, Arrays.asList(dtos));
	}

	/**
	 * Static method factory for convenient creation of DtList using 'of' pattern.
	 *
	 * @param dto the mandatory dto to add which defines the type.
	 * @param dtos Dtos to add.
	 * @return the created DtList.
	 * @param <D> Type of this list
	 */
	public static <D extends DataObject> DtList<D> of(final D dto, final List<D> dtos) {
		Assertion.check()
				.isNotNull(dto)
				.isNotNull(dtos);

		dtos.stream()
				.forEach(other -> Assertion.check().isTrue(dto.getClass().equals(other.getClass()), "all dtos must have the same type"));
		//---
		final DtList<D> dtList = new DtList<>(DataModelUtil.findDataDefinition(dto));
		//---
		dtList.add(dto);
		dtList.addAll(dtos);
		return dtList;
	}

	/** {@inheritDoc} */
	@Override
	public D get(final int row) {
		return datas.get(row);
	}

	/** {@inheritDoc} */
	@Override
	public D set(final int row, final D object) {
		//Implementation de set, pour que la collection soit modifiable
		//Et donc pour que le Collections.sort(List<?> ) fonctionne
		return datas.set(row, object);
	}

	/** {@inheritDoc} */
	@Override
	public int size() {
		return datas.size();
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		final StringBuilder buf = new StringBuilder()
				.append("(def=").append(getDefinition()).append(", size=").append(datas.size());
		if (datas.size() > TO_STRING_MAX_ELEMENTS) {
			buf.append(" show only the ").append(TO_STRING_MAX_ELEMENTS).append(" firsts");
		}
		buf.append(")\n");
		for (int i = 0; i < Math.min(datas.size(), TO_STRING_MAX_ELEMENTS); i++) { //pas plus de TO_STRING_MAX_ELEMENTS elements dans le toString
			buf.append("\tRow #").append(i).append(" : ")
					.append(get(i)).append('\n');
		}

		return buf.toString();
	}

	//==========================================================================

	/** {@inheritDoc} */
	@Override
	public boolean add(final D dto) {
		Assertion.check().isNotNull(dto);
		final DataDefinition foundDtDefinition = DataModelUtil.findDataDefinition(dto);
		Assertion.check().isTrue(getDefinition().equals(foundDtDefinition), "Ne peut pas inserer un dto '{0}' dans une collection '{1}'", foundDtDefinition, getDefinition());
		//-----
		return datas.add(dto);
	}

	/** {@inheritDoc} */
	@Override
	public void add(final int index, final D dto) {
		Assertion.check().isNotNull(dto);
		final DataDefinition foundDtDefinition = DataModelUtil.findDataDefinition(dto);
		Assertion.check().isTrue(getDefinition().equals(foundDtDefinition), "Ne peut pas inserer un dto '{0}' dans une collection '{1}'", foundDtDefinition, getDefinition());
		//-----
		datas.add(index, dto);
	}

	/** {@inheritDoc} */
	@Override
	public D remove(final int row) {
		return datas.remove(row);
	}

	/** {@inheritDoc} */
	@Override
	public List<D> subList(final int start, final int end) {
		if (start == end) {
			return new DtList<>(getDefinition());
		}
		return DtList.of(datas.get(start), datas.subList(start + 1, end));
	}

	//==========================================================================
	//================================ Méthodes supplémentaires=================
	//==========================================================================

	/**
	 * @return Définition de la liste.
	 */
	public DataDefinition getDefinition() {
		return dataDefinitionId.get();
	}

	/**
	 * @return URI de la ressource
	 */
	public DtListURI getURI() {
		return uri;
	}

	//==========================================================================
	//================================ Metadatas management ====================
	//==========================================================================

	// There is no all MetaData with values getter.
	// Developers should always knows which metadata they needs. It's intended use.
	//

	/**
	 * @return MetaData names (only not null ones)
	 */
	public Set<String> getMetaDataNames() {
		return Collections.unmodifiableSet(metaDatas.keySet());
	}

	/**
	 * @param metaDataName MetaData name
	 * @return if this metadata is known and not null
	 */
	public boolean containsMetaData(final String metaDataName) {
		return metaDatas.containsKey(metaDataName);
	}

	/**
	 * @param metaDataName MetaData name
	 * @param metaDataClass MetaData value class
	 * @param <O> MetaData value type
	 * @return MetaData value
	 */
	public <O extends Serializable> Optional<O> getMetaData(final String metaDataName, final Class<O> metaDataClass) {
		Assertion.check().isNotBlank(metaDataName);
		//-----
		final Object value = metaDatas.get(metaDataName);
		if (value == null) {
			return Optional.empty();
		}
		return Optional.of(metaDataClass.cast(value));
	}

	/**
	 * Set a metaData on this list. If value is null, the metadata is remove.
	 * <b>WARN</b>
	 * <b>Developers must ensure</b> this metaData keep coherent with current list datas, <b>all the time</b>.
	 * <b>WARN</b>
	 *
	 * @param metaDataName MetaData name
	 * @param value MetaData value
	 */
	public void setMetaData(final String metaDataName, final Serializable value) {
		Assertion.check().isNotBlank(metaDataName);
		//-----
		if (value == null) {
			metaDatas.remove(metaDataName);
		}
		metaDatas.put(metaDataName, value);
	}

	/** {@inheritDoc} */
	@Override
	public boolean equals(final Object o) {
		/* A list equals only the same list */
		return o == this;
	}

	/** {@inheritDoc} */
	@Override
	public int hashCode() {
		/* A list equals only the same list, so hashCode is simpler */
		return System.identityHashCode(this);
	}
}
