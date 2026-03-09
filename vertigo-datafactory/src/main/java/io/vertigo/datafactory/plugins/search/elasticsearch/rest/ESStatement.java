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
package io.vertigo.datafactory.plugins.search.elasticsearch.rest;

import java.io.IOException;
import java.io.Serializable;
import java.time.Instant;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.ElasticsearchException;
import co.elastic.clients.elasticsearch._types.Refresh;
import co.elastic.clients.elasticsearch._types.Result;
import co.elastic.clients.elasticsearch.core.BulkRequest;
import co.elastic.clients.elasticsearch.core.BulkResponse;
import co.elastic.clients.elasticsearch.core.CountResponse;
import co.elastic.clients.elasticsearch.core.DeleteByQueryResponse;
import co.elastic.clients.elasticsearch.core.DeleteResponse;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.VUserException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.impl.search.SearchResource;
import io.vertigo.datafactory.plugins.search.elasticsearch.ESDocumentCodec;
import io.vertigo.datafactory.plugins.search.elasticsearch.ESFacetedQueryResultBuilder;
import io.vertigo.datafactory.search.model.SearchIndex;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.model.KeyConcept;
import io.vertigo.datamodel.data.model.UID;

//vérifier
/**
 * Requête physique d'accès à ElasticSearch.
 * Le driver exécute les requêtes de façon synchrone dans le contexte transactionnelle de la ressource.
 * 
 * @author pchretien, npiedeloup
 * @param <I> Type de l'objet représentant l'index
 * @param <K> Type du keyConcept métier indexé
 */
final class ESStatement<K extends KeyConcept, I extends DataObject> {

	private static final Refresh DEFAULT_REFRESH = Refresh.False; //mettre a true pour TU uniquement
	private static final Refresh BULK_REFRESH = Refresh.False; //mettre a RefreshPolicy.IMMEDIATE pour TU uniquement
	private static final Logger LOGGER = LogManager.getLogger(ESStatement.class);

	private final String indexName;
	private final ElasticsearchClient esClient;
	private final ESDocumentCodec esDocumentCodec;
	private final Map<Class, BasicTypeAdapter> typeAdapters;

	/**
	 * Constructor.
	 * 
	 * @param esDocumentCodec Codec de traduction (bi-directionnelle) des objets métiers en document
	 * @param indexName Index name
	 * @param esClient Client ElasticSearch.
	 */
	ESStatement(final ESDocumentCodec esDocumentCodec, final String indexName, final ElasticsearchClient esClient, final Map<Class, BasicTypeAdapter> typeAdapters) {
		Assertion.check()
				.isNotBlank(indexName)
				.isNotNull(esDocumentCodec)
				.isNotNull(esClient)
				.isNotNull(typeAdapters);
		//-----
		this.indexName = indexName;
		this.esClient = esClient;
		this.esDocumentCodec = esDocumentCodec;
		this.typeAdapters = typeAdapters;
	}

	/**
	 * @param indexCollection Collection des indexes à insérer
	 */
	void putAll(final Collection<SearchIndex<K, I>> indexCollection) {
		//Injection spécifique au moteur d'indexation.
		try {
			final BulkRequest.Builder br = new BulkRequest.Builder().refresh(BULK_REFRESH);

			for (final SearchIndex<K, I> index : indexCollection) {
				final var document = esDocumentCodec.index2Json(index);
				br.operations(op -> op
						.index(idx -> idx
								.index(indexName)
								.id(index.getUID().urn())
								.document(document)));
			}
			final BulkResponse bulkResponse = esClient.bulk(br.build());
			if (bulkResponse.errors()) {
				throw new VSystemException("Can't putAll into {0} index.\nCause by {1}", indexName, bulkResponse.items());
			}
		} catch (final IOException e) {
			handleIOException(e);
		}
	}

	private static void handleIOException(final IOException e) {
		throw WrappedException.wrap(e, "Serveur ElasticSearch indisponible");
	}

	/**
	 * @param index index à insérer
	 */
	void put(final SearchIndex<K, I> index) {
		//Injection spécifique au moteur d'indexation.
		try {
			final var document = esDocumentCodec.index2Json(index);
			final var indexeResponse = esClient.index(i -> i
					.index(indexName)
					.id(index.getUID().urn())
					.refresh(DEFAULT_REFRESH)
					.document(document));
			//-----
			Assertion.check().isTrue(indexeResponse.result() == Result.Created
					|| indexeResponse.result() == Result.Updated, "Can't put on {0}", indexName);
		} catch (final IOException e) {
			handleIOException(e);
		}
	}

	/**
	 * Supprime des documents.
	 * 
	 * @param query Requete de filtrage des documents à supprimer
	 */
	void remove(final ListFilter query) {
		Assertion.check().isNotNull(query);
		//-----
		try {
			//final QueryBuilder queryBuilder = AsbtractESSearchRequestBuilder.translateToQueryBuilder(query);
			final DeleteByQueryResponse deleteByQueryResponse = esClient.deleteByQuery(d -> d
					.index(indexName)
					.query(q -> q.queryString(qs -> qs.query(query.getFilterValue()).analyzeWildcard(true))) // TODO a refactorer avec AsbtractESSearchRequestBuilder.translateToQueryBuilder(query)
			);

			final long deleted = deleteByQueryResponse.deleted();
			LOGGER.debug("Removed {} elements", deleted);
		} catch (final ElasticsearchException e) {
			throw handleElasticsearchException("remove()", e);
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error in remove() on {0}", indexName);
		}
	}

	Map<UID<K>, Serializable> loadVersions(final DataField versionField, final ListFilter listFilter, final int maxElements) {
		Assertion.check().isNotNull(versionField).isNotNull(listFilter);
		//-----
		try {
			// On précise Map.class car on veut récupérer le JSON brut sous forme de Map
			final SearchResponse<Map> searchResponse = esClient.search(s -> s
					.index(indexName)
					.size(maxElements)
					.trackTotalHits(t -> t.count(10_000))
					.query(q -> q.queryString(qs -> qs.query(listFilter.getFilterValue()).analyzeWildcard(true)))
					.source(src -> src.filter(f -> f.includes(versionField.name()))), Map.class);

			final Map<UID<K>, Serializable> result = new HashMap<>();
			for (final Hit<Map> hit : searchResponse.hits().hits()) {
				final String urn = hit.id();
				final Serializable value = decodeVersionValue(versionField, hit.source().get(versionField.name()));
				result.put(UID.of(urn), value);
			}
			return result;
		} catch (final ElasticsearchException e) {
			throw handleElasticsearchException("loadVersions()", e);
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error in loadVersions() on {0}", indexName);
		}
	}

	private Serializable decodeVersionValue(final DataField versionField, final Object value) {
		Assertion.check().isTrue(
				versionField.smartTypeDefinition().getScope().isBasicType(),
				"Field use for iterate must be primitives : versionField '{0}' has the smartType '{2}'", versionField.name(), versionField.smartTypeDefinition());
		//---
		if (value == null) {
			return null;
		}
		final BasicType versionFieldDataType = versionField.smartTypeDefinition().getBasicType();
		return switch (versionFieldDataType) {
			case Integer -> value instanceof final Integer i ? i : Integer.valueOf(String.valueOf(value));
			case Long -> value instanceof final Long l ? l : Long.valueOf(String.valueOf(value));
			case Instant -> value instanceof final Instant i ? i : Instant.parse(String.valueOf(value));
			case String -> String.valueOf(value);
			default -> throw new IllegalArgumentException("Type's versionField " + versionFieldDataType.name() + " from "
					+ indexName + " is not supported, prefer int, long, Instant or String.");
		};
	}

	/**
	 * Supprime un document.
	 * 
	 * @param uid UID du document à supprimer
	 */
	void remove(final UID uid) {
		Assertion.check().isNotNull(uid);
		//-----
		try {
			final DeleteResponse deleteResponse = esClient.delete(d -> d
					.index(indexName)
					.id(uid.urn())
					.refresh(DEFAULT_REFRESH));
			//----
			Assertion.check().isTrue(deleteResponse.result() == Result.Deleted,
					"Can't remove on {0}", indexName);
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error in remove() on {0}", indexName);
		}
	}

	/**
	 * @param indexDefinition Index de recherche
	 * @param searchQuery Mots clés de recherche
	 * @param listState Etat de la liste (tri et pagination)
	 * @param defaultMaxRows Nombre de ligne max par defaut
	 * @return Résultat de la recherche
	 */
	FacetedQueryResult<I, SearchQuery> loadList(final DataDefinition indexDtDefinition, final String[] indexNames, final SearchQuery searchQuery, final DtListState listState,
			final int defaultMaxRows) {
		Assertion.check().isNotNull(searchQuery);
		//-----
		final ESSearchRequestBuilder builder = new ESSearchRequestBuilder(indexNames, esClient, typeAdapters)
				.withIndexDtDefinition(indexDtDefinition)
				.withSearchQuery(searchQuery)
				.withListState(listState, defaultMaxRows);
		if (searchQuery.isUseHighlight()) {
			builder.withHighlight();
		}
		final SearchRequest searchRequest = builder.build();
		LOGGER.info("loadList {}", searchRequest);
		try {
			final SearchResponse<Map> searchResponse = esClient.search(searchRequest, Map.class);
			return new ESFacetedQueryResultBuilder(esDocumentCodec, indexDtDefinition, searchResponse, searchQuery)
					.build();
		} catch (final ElasticsearchException e) {
			throw handleElasticsearchException("loadList()", e);
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error in loadList() on {0}", indexName);
		}
	}

	private RuntimeException handleElasticsearchException(final String methodName, final ElasticsearchException e) {
		final String errorMessage = e.error() != null && e.error().causedBy() != null && e.error().causedBy().reason() != null ? e.error().causedBy().reason()
				: e.getMessage() != null ? e.getMessage() : "";
		if (errorMessage.contains("set fielddata=true")) {
			final VUserException vue = new VUserException(SearchResource.DATAFACTORY_SEARCH_INDEX_FIELDDATA_ERROR);
			vue.initCause(e);
			return vue;
		} else if (errorMessage.contains("Failed to parse") || errorMessage.contains("search_phase_execution_exception")) {
			final VUserException vue = new VUserException(SearchResource.DATAFACTORY_SEARCH_QUERY_SYNTAX_ERROR);
			vue.initCause(e);
			return vue;
		}
		return WrappedException.wrap(e, "Error in {0} on {1} : {2}", methodName, indexName, errorMessage);
	}

	/**
	 * @return Nombre de document indexés
	 */
	public long count() {
		try {
			final CountResponse countResponse = esClient.count(c -> c
					.index(indexName));
			return countResponse.count();
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error in count() on {0}", indexName);
		}
	}

}