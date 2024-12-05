/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.core;

import java.io.Serializable;
import java.lang.reflect.Type;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.google.gson.reflect.TypeToken;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datafactory.collections.definitions.FacetDefinition;
import io.vertigo.datafactory.collections.model.Facet;
import io.vertigo.datafactory.collections.model.FacetValue;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.collections.model.SelectedFacetValues;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.model.DtListURIForMasterData;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datastore.filestore.model.FileInfoURI;
import io.vertigo.vega.engines.webservice.json.JsonEngine;
import io.vertigo.vega.webservice.model.UiList;
import io.vertigo.vega.webservice.model.UiObject;
import io.vertigo.vega.webservice.validation.DefaultDtObjectValidator;
import io.vertigo.vega.webservice.validation.DtObjectValidator;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.ValidationUserException;

/**
 * Liste des couples (clé, object) enregistrés.
 *
 * @author npiedeloup
 */
public final class ViewContext implements Serializable {

	private static final long serialVersionUID = -8237448155016161135L;

	/** Clé de context du mode. */
	public static final ViewContextKey<FormMode> MODE_CONTEXT_KEY = ViewContextKey.of("mode");
	//TODO voir pour déléguer cette gestion des modes
	/** Clé de context du mode Edit. */
	public static final ViewContextKey<Boolean> MODE_EDIT_CONTEXT_KEY = ViewContextKey.of("modeEdit");
	/** Clé de context du mode ReadOnly. */
	public static final ViewContextKey<Boolean> MODE_READ_ONLY_CONTEXT_KEY = ViewContextKey.of("modeReadOnly");
	/** Clé de context du mode Create. */
	public static final ViewContextKey<Boolean> MODE_CREATE_CONTEXT_KEY = ViewContextKey.of("modeCreate");

	/** Clée de l'id de context dans le context. */
	public static final ViewContextKey<String> CTX = ViewContextKey.of("CTX");

	/** Clée de l'instant de creation de context dans le context. */
	public static final ViewContextKey<String> CTX_CREATION_INSTANT = ViewContextKey.of("CTX_CREATION_INSTANT");

	private final Set<String> modifiedKeys = new HashSet<>();

	private final ViewContextMap viewContextMap;

	private final JsonEngine jsonEngine;

	public ViewContext(final ViewContextMap viewContextMap, final JsonEngine jsonEngine) {
		Assertion.check()
				.isNotNull(viewContextMap)
				.isNotNull(jsonEngine);
		//---
		this.viewContextMap = viewContextMap;
		this.jsonEngine = jsonEngine;

		//if viewContextMap is new we set creation instant, else we set CTX_REUSE_INSTANT and keep previous in INPUT_CTX_REUSE_INSTANT
		viewContextMap.putIfAbsent(ViewContextMap.CTX_CREATION_INSTANT, Instant.now());
	}

	/* ================================== Life cycle =====================================*/

	/**
	 * @return Clé de ce context
	 */
	public String getId() {
		return getString(CTX);
	}

	public void setInputCtxId(final String ctxId) {
		viewContextMap.put(ViewContextMap.INPUT_CTX, ctxId);
	}

	public void setCtxId(final String prefix) {
		viewContextMap.put(CTX.get(), prefix + '$' + UUID.randomUUID().toString());

		//we set CTX_REUSE_INSTANT and keep previous in INPUT_CTX_REUSE_INSTANT
		final var previousInstant = (Instant) viewContextMap.put(ViewContextMap.CTX_REUSE_INSTANT, Instant.now());
		if (previousInstant != null) {
			viewContextMap.put(ViewContextMap.INPUT_CTX_REUSE_INSTANT, previousInstant);
		}
	}

	/**
	 * Génère un nouvel Id et passe le context en modifiable.
	 */
	public void makeModifiable() {
		viewContextMap.makeModifiable();
	}

	/**
	 * passe le context en non-modifiable.
	 */
	public void makeUnmodifiable() {
		viewContextMap.makeUnmodifiable();
		modifiedKeys.add(CTX.get());
	}

	/**
	 * Mark this context as Dirty : shouldn't be stored and keep old id.
	 */
	public void markDirty() {
		viewContextMap.markDirty();
	}

	/**
	 * @return if context dirty : shouldn't be stored and keep old id
	 */
	public boolean isDirty() {
		return viewContextMap.isDirty();
	}

	public ViewContextMap asMap() {
		return viewContextMap;
	}

	public ViewContextMap asUpdatesMap() {
		return viewContextMap.getFilteredViewContext(Optional.of(modifiedKeys));
	}

	public String getFilteredViewContextAsJson() {
		return jsonEngine.toJson(viewContextMap.getFilteredViewContext(Optional.empty()));
	}

	public void markModifiedKeys(final ViewContextKey... newModifiedKeys) {
		modifiedKeys.addAll(Arrays.stream(newModifiedKeys)
				.map(ViewContextKey::get)
				.collect(Collectors.toSet()));
	}

	public void markModifiedKeys(final String... newModifiedKeys) {
		modifiedKeys.addAll(Arrays.asList(newModifiedKeys));
	}

	/* ================================== Map =====================================*/

	public Serializable get(final Object key) {
		var sKey = key;
		if (key instanceof ViewContextKey) {
			sKey = ((ViewContextKey<?>) key).get();
		}
		return viewContextMap.get(sKey);

	}

	/** {@inheritDoc} */
	public boolean containsKey(final Object key) {
		if (key instanceof ViewContextKey) {
			return viewContextMap.containsKey(((ViewContextKey<?>) key).get());
		}
		return viewContextMap.containsKey(key);
	}

	/**
	 * @param uiObject UiObject recherché
	 * @return Clé de context de l'élément (null si non trouvé)
	 */
	public String findKey(final UiObject<?> uiObject) {
		return viewContextMap.findKey(uiObject);
	}

	/**
	 * @param dtObject DtObject recherché
	 * @return Clé de context de l'élément (null si non trouvé)
	 */
	public String findKey(final DataObject dtObject) {
		return viewContextMap.findKey(dtObject);
	}

	private Serializable put(final ViewContextKey<?> key, final Serializable value) {
		modifiedKeys.add(key.get());
		return viewContextMap.put(key.get(), value);
	}

	/* ================================== ContextRef =====================================*/

	/**
	 * @param key Clé de context
	 * @return UiObject du context
	 */
	public <O extends Serializable> ViewContext publishRef(final ViewContextKey<O> key, final O value) {
		put(key, value);
		return this;
	}

	/**
	 * @param key Clé de context
	 * @return UiObject du context
	 */
	public <O extends Serializable> void publishTypedRef(final ViewContextKey<O> key, final O value, final Type paramType) {
		viewContextMap.addTypeForKey(key.get(), paramType);
		put(key, value);
	}

	/**
	 * @param key Clé de context
	 * @return UiObject du context
	 */
	public <O extends DataObject> UiObject<O> getUiObject(final ViewContextKey<O> key) {
		return (UiObject<O>) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return UiList du context
	 */
	public <O extends DataObject> UiList<O> getUiList(final ViewContextKey<O> key) {
		return (UiList<O>) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return UiListModifiable du context
	 */
	public <O extends DataObject> BasicUiListModifiable<O> getUiListModifiable(final ViewContextKey<O> key) {
		return (BasicUiListModifiable<O>) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return String du context
	 */
	public String getString(final ViewContextKey<String> key) {
		final Object value = get(key);
		if (value instanceof String[] && ((String[]) value).length > 0) {
			//Struts set des String[] au lieu des String
			//on prend le premier
			return ((String[]) value)[0];
		}
		return (String) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return Long du context
	 */
	public Long getLong(final ViewContextKey<Long> key) {
		return (Long) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return Integer du context
	 */
	public Integer getInteger(final ViewContextKey<Integer> key) {
		return (Integer) get(key);
	}

	/**
	 * @param key Clé de context
	 * @return Boolean du context
	 */
	public Boolean getBoolean(final ViewContextKey<Boolean> key) {
		return (Boolean) get(key);
	}

	/* ================================ ContextForm ==================================*/
	/**
	 * Ajoute un objet de type form au context.
	 *
	 * @param dto Objet à publier
	 */
	public <O extends DataObject> ViewContext publishDto(final ViewContextKey<O> contextKey, final O dto) {
		final UiObject<O> strutsUiObject = new MapUiObject<>(dto, viewContextMap.viewContextUpdateSecurity());
		strutsUiObject.setInputKey(contextKey.get());
		put(contextKey, strutsUiObject);
		return this;
	}

	/**
	 * Vérifie les erreurs de l'objet. Celles-ci sont ajoutées à l'uiMessageStack si nécessaire.
	 */
	public <O extends DataObject> void checkDtoErrors(final ViewContextKey<O> contextKey, final UiMessageStack uiMessageStack) {
		getUiObject(contextKey).checkFormat(uiMessageStack);
		if (uiMessageStack.hasErrors()) {
			throw new ValidationUserException();
		}
	}

	/**
	 * @return objet métier valid�. Lance une exception si erreur.
	 */
	public <O extends DataObject> O readDto(final ViewContextKey<O> contextKey, final UiMessageStack uiMessageStack) {
		return readDto(contextKey, new DefaultDtObjectValidator<>(), uiMessageStack);
	}

	/**
	 * @return objet métier validé. Lance une exception si erreur.
	 */
	public <O extends DataObject> O readDto(final ViewContextKey<O> contextKey, final DtObjectValidator<O> validator, final UiMessageStack uiMessageStack) {
		checkDtoErrors(contextKey, uiMessageStack);
		// ---
		final var validatedDto = getUiObject(contextKey).mergeAndCheckInput(Collections.singletonList(validator), uiMessageStack);
		if (uiMessageStack.hasErrors()) {
			throw new ValidationUserException();
		}
		return validatedDto;
	}

	/* ================================ ContextList ==================================*/

	/**
	 * Ajoute une liste au context.
	 *
	 * @param dtList List à publier
	 */
	private <O extends DataObject> void publishDtList(final ViewContextKey<O> contextKey, final Optional<DataFieldName<O>> keyFieldNameOpt, final DtList<O> dtList, final boolean modifiable) {
		if (modifiable) {
			put(contextKey, new BasicUiListModifiable<>(dtList, contextKey.get(), viewContextMap.viewContextUpdateSecurity()));
		} else {
			put(contextKey, new UiListUnmodifiable<>(dtList, keyFieldNameOpt));
		}
	}

	/**
	 * Ajoute une liste au context.
	 *
	 * @param dtList List à publier
	 */
	public <O extends DataObject> ViewContext publishDtList(final ViewContextKey<O> contextKey, final DataFieldName<O> keyFieldName, final DtList<O> dtList) {
		publishDtList(contextKey, Optional.of(keyFieldName), dtList, false);
		return this;
	}

	/**
	 * Ajoute une liste au context.
	 *
	 * @param dtList List à publier
	 */
	public <O extends DataObject> ViewContext publishDtList(final ViewContextKey<O> contextKey, final DtList<O> dtList) {
		publishDtList(contextKey, Optional.empty(), dtList, false);
		return this;
	}

	/**
	 * @return List des objets métiers validée. Lance une exception si erreur.
	 */
	public <O extends DataObject> DtList<O> readDtList(final ViewContextKey<O> contextKey, final DtObjectValidator<O> validator, final UiMessageStack uiMessageStack) {
		return ((UiListUnmodifiable<O>) getUiList(contextKey)).mergeAndCheckInput(Collections.singletonList(validator), uiMessageStack);
	}

	/**
	 * @return List des objets métiers validée. Lance une exception si erreur.
	 */
	public <O extends DataObject> DtList<O> readDtList(final ViewContextKey<O> contextKey, final UiMessageStack uiMessageStack) {
		return readDtList(contextKey, new DefaultDtObjectValidator<>(), uiMessageStack);
	}

	/* ================================ ContextListModifiable ==================================*/

	/**
	 * Ajoute une liste au context.
	 *
	 * @param dtList List à publier
	 */
	public <O extends DataObject> ViewContext publishDtListModifiable(final ViewContextKey<O> contextKey, final DtList<O> dtList) {
		publishDtList(contextKey, Optional.empty(), dtList, true);
		return this;
	}

	/**
	 * Vérifie les erreurs de la liste. Celles-ci sont ajoutées à l'uiMessageStack si nécessaire.
	 */
	public <O extends DataObject> void checkDtListErrors(final ViewContextKey<O> contextKey, final UiMessageStack uiMessageStack) {
		getUiListModifiable(contextKey).checkFormat(uiMessageStack);
		if (uiMessageStack.hasErrors()) {
			throw new ValidationUserException();
		}
	}

	/**
	 * @return List des objets métiers validée. Lance une exception si erreur.
	 */
	public <O extends DataObject> DtList<O> readDtListModifiable(final ViewContextKey<O> contextKey, final UiMessageStack uiMessageStack) {
		return readDtListModifiable(contextKey, new DefaultDtObjectValidator<>(), uiMessageStack);
	}

	/**
	 * @return List des objets métiers validée. Lance une exception si erreur.
	 */
	public <O extends DataObject> DtList<O> readDtListModifiable(final ViewContextKey<O> contextKey, final DtObjectValidator<O> validator, final UiMessageStack uiMessageStack) {
		checkDtListErrors(contextKey, uiMessageStack);
		// ---
		final DtList<O> validatedList = getUiListModifiable(contextKey).mergeAndCheckInput(Collections.singletonList(validator), uiMessageStack);
		if (uiMessageStack.hasErrors()) {
			throw new ValidationUserException();
		}
		return validatedList;
	}

	/* ================================ ContextMdList ==================================*/

	/**
	 * Publie une liste de référence.
	 *
	 * @param contextKey Context key
	 * @param entityClass Class associée
	 * @param code Code
	 */
	public <E extends Entity> ViewContext publishMdl(final ViewContextKey<E> contextKey, final Class<E> entityClass, final String code) {
		final var dtDefinition = DataModelUtil.findDataDefinition(entityClass);
		return publishMdl(contextKey, dtDefinition, code);
	}

	/**
	 * Publie une liste de référence.
	 *
	 * @param contextKey Context key
	 * @param entityClass Class associée
	 * @param code Code
	 */
	public <E extends Entity> ViewContext publishMdl(final ViewContextKey<E> contextKey, final DataDefinition entityDefinition, final String code) {
		put(contextKey, new UiMdList<>(new DtListURIForMasterData(entityDefinition, code)));
		return this;
	}

	/* ================================ FileInfo ==================================*/

	/**
	 * Get UI file uri.
	 *
	 * @param contextKey Context key
	 */
	public Optional<FileInfoURI> getFileInfoURI(final ViewContextKey<FileInfoURI> contextKey) {
		final var list = getFileInfoURIs(contextKey);
		Assertion.check().isTrue(list.size() <= 1, "Can't list a list of {0} elements to Option", list.size());
		return list.isEmpty() ? Optional.empty() : Optional.of(list.iterator().next());
	}

	/**
	 * Get UI file info uri list.
	 *
	 * @param contextKey Context key
	 */
	public ArrayList<FileInfoURI> getFileInfoURIs(final ViewContextKey<FileInfoURI> contextKey) {
		return (ArrayList<FileInfoURI>) get(contextKey);
	}

	/**
	 * Publish file's info.
	 *
	 * @param contextKey Context key
	 * @param fileInfo file's info
	 */
	public ViewContext publishFileInfoURI(final ViewContextKey<FileInfoURI> contextKey, final FileInfoURI fileInfoURI) {
		final var list = new ArrayList<FileInfoURI>();
		if (fileInfoURI != null) {
			list.add(fileInfoURI);
		}
		publishFileInfoURIs(contextKey, list);
		return this;
	}

	/**
	 * Publish list of file's info.
	 *
	 * @param contextKey Context key
	 * @param fileInfos list of file's info.
	 */
	public ViewContext publishFileInfoURIs(final ViewContextKey<FileInfoURI> contextKey, final ArrayList<FileInfoURI> fileInfoURIs) {
		viewContextMap.addTypeForKey(contextKey.get(), TypeToken.getParameterized(ArrayList.class, FileInfoURI.class).getType());
		put(contextKey, fileInfoURIs);
		return this;
	}

	/* ================================ FacetedQueryResult ==================================*/

	/**
	 * Publie une FacetedQueryResult.
	 *
	 * @param contextKey Context key
	 * @param keyFieldName Id's fieldName
	 * @param facetedQueryResult Result
	 */
	public <O extends DataObject> ViewContext publishFacetedQueryResult(final ViewContextKey<FacetedQueryResult<O, SearchQuery>> contextKey,
			final DataFieldName<O> keyFieldName, final FacetedQueryResult<O, SearchQuery> facetedQueryResult, final ViewContextKey<?> criteriaContextKey) {
		if (facetedQueryResult.getClusterFacetDefinition().isPresent()) {
			publishDtList(() -> contextKey.get() + "_list", Optional.of(keyFieldName), new DtList<O>(facetedQueryResult.getDtList().getDefinition()), false);
			put(() -> contextKey.get() + "_cluster", translateClusters(facetedQueryResult, Optional.of(keyFieldName)));
			//publishClustersList(contextKey.get() + "_list", facetedQueryResult, Optional.of(keyFieldName));
		} else {
			publishDtList(() -> contextKey.get() + "_list", Optional.of(keyFieldName), facetedQueryResult.getDtList(), false);
			put(() -> contextKey.get() + "_cluster", new HashMap<>());
		}
		put(() -> contextKey.get() + "_facets", translateFacets(facetedQueryResult.getFacets()));

		final var facetedQuery = facetedQueryResult.getSource().getFacetedQuery().get();
		put(() -> contextKey.get() + "_selectedFacets", new UiSelectedFacetValues(
				facetedQuery.getSelectedFacetValues(),
				facetedQuery.getDefinition().getFacetDefinitions()
						.stream()
						.map(FacetDefinition::getName)
						.collect(Collectors.toList())));
		put(() -> contextKey.get() + "_totalcount", facetedQueryResult.getCount());
		put(() -> contextKey.get() + "_criteriaContextKey", criteriaContextKey.get());
		return this;
	}

	private <O extends DataObject> ArrayList<ClusterUiList> translateClusters(final FacetedQueryResult<O, SearchQuery> facetedQueryResult, final Optional<DataFieldName<O>> keyFieldNameOpt) {
		//if it's a cluster add data's cluster
		final var clusters = facetedQueryResult.getClusters();
		final var jsonCluster = new ArrayList<ClusterUiList>();
		for (final Entry<FacetValue, DtList<O>> cluster : clusters.entrySet()) {
			final var dtList = cluster.getValue();
			if (!dtList.isEmpty()) {
				final var clusterElement = new ClusterUiList(
						dtList, keyFieldNameOpt,
						cluster.getKey().code(),
						cluster.getKey().label().getDisplay(),
						dtList.getDefinition().getClassSimpleName(),
						getFacetCount(cluster.getKey(), facetedQueryResult));
				jsonCluster.add(clusterElement);
			}
		}
		return jsonCluster;

	}
	/* private <O extends Data> void publishClustersList(final String prefix, final FacetedQueryResult<O, SearchQuery> facetedQueryResult, final Optional<DataFieldName<O>> keyFieldNameOpt) {
			//if it's a cluster add data's cluster
			final Map<FacetValue, DtList<O>> clusters = facetedQueryResult.getClusters();
			for (final Entry<FacetValue, DtList<O>> cluster : clusters.entrySet()) {
				final DtList<O> dtList = cluster.getValue();
				if (!dtList.isEmpty()) {
					publishDtList(() -> prefix + "_" + cluster.getKey().getCode(), keyFieldNameOpt, dtList, false);
				}
			}
		}*/

	private static Long getFacetCount(final FacetValue key, final FacetedQueryResult<?, ?> facetedQueryResult) {
		final var clusterFacetDefinition = facetedQueryResult.getClusterFacetDefinition().get();
		return facetedQueryResult.getFacets()
				.stream()
				.filter(facet -> clusterFacetDefinition.equals(facet.getDefinition()))
				.flatMap(facet -> facet.getFacetValues().entrySet().stream())
				.filter(facetEntry -> key.code().equals(facetEntry.getKey().code()))
				.findFirst()
				.orElseThrow(() -> new IllegalArgumentException("Can't found facet for search cluster"))
				.getValue();
	}

	private static ArrayList<Serializable> translateFacets(final List<Facet> facets) {
		final var facetsList = new ArrayList<Serializable>();
		for (final Facet facet : facets) {
			final var facetValues = new ArrayList<HashMap<String, Serializable>>();
			for (final Entry<FacetValue, Long> entry : facet.getFacetValues().entrySet()) {
				if (entry.getValue() > 0) {
					final var facetValue = new HashMap<String, Serializable>();
					facetValue.put("code", entry.getKey().code());
					facetValue.put("count", entry.getValue());
					facetValue.put("label", entry.getKey().label().getDisplay());
					facetValues.add(facetValue);
				}
			}
			final var facetAsMap = new HashMap<String, Serializable>();
			facetAsMap.put("code", facet.getDefinition().getName());
			facetAsMap.put("multiple", facet.getDefinition().isMultiSelectable());
			facetAsMap.put("label", facet.getDefinition().getLabel().getDisplay());
			facetAsMap.put("values", facetValues);
			facetsList.add(facetAsMap);
		}
		return facetsList;
	}

	/**
	 * Returns selectedFacetValues of a given facetedQuery.
	 *
	 * @param contextKey Context key
	 * @return selectedFacetValues
	 */
	public <O extends DataObject> SelectedFacetValues getSelectedFacetValues(final ViewContextKey<FacetedQueryResult<O, SearchQuery>> contextKey) {
		return ((UiSelectedFacetValues) get(contextKey.get() + "_selectedFacets")).toSelectedFacetValues();
	}

	//////////////////////////////////
	/**
	 * Passe en mode edition.
	 */
	public void toModeEdit() {
		this
				.publishRef(MODE_CONTEXT_KEY, FormMode.edit)
				.publishRef(MODE_READ_ONLY_CONTEXT_KEY, false)
				.publishRef(MODE_EDIT_CONTEXT_KEY, true)
				.publishRef(MODE_CREATE_CONTEXT_KEY, false);
	}

	/**
	 * Passe en mode creation.
	 */
	public void toModeCreate() {
		this
				.publishRef(MODE_CONTEXT_KEY, FormMode.create)
				.publishRef(MODE_READ_ONLY_CONTEXT_KEY, false)
				.publishRef(MODE_EDIT_CONTEXT_KEY, false)
				.publishRef(MODE_CREATE_CONTEXT_KEY, true);
	}

	/**
	 * Passe en mode readonly.
	 */
	public void toModeReadOnly() {
		this
				.publishRef(MODE_CONTEXT_KEY, FormMode.readOnly)
				.publishRef(MODE_READ_ONLY_CONTEXT_KEY, true)
				.publishRef(MODE_EDIT_CONTEXT_KEY, false)
				.publishRef(MODE_CREATE_CONTEXT_KEY, false);
	}

	/**
	 * @return Si on est en mode edition
	 */
	public boolean isModeEdit() {
		return FormMode.edit.equals(get(MODE_CONTEXT_KEY));
	}

	/**
	 * @return Si on est en mode readOnly
	 */
	public boolean isModeRead() {
		return FormMode.readOnly.equals(get(MODE_CONTEXT_KEY));
	}

	/**
	 * @return Si on est en mode create
	 */
	public boolean isModeCreate() {
		return FormMode.create.equals(get(MODE_CONTEXT_KEY));
	}

}
