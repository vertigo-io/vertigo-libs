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
import org.elasticsearch.ElasticsearchStatusException;
import org.elasticsearch.action.DocWriteResponse;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchPhaseExecutionException;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.action.support.WriteRequest.RefreshPolicy;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.core.CountRequest;
import org.elasticsearch.client.core.CountResponse;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.reindex.BulkByScrollResponse;
import org.elasticsearch.index.reindex.DeleteByQueryRequest;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.xcontent.XContentBuilder;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.VUserException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.impl.search.SearchResource;
import io.vertigo.datafactory.plugins.search.elasticsearch.AsbtractESSearchRequestBuilder;
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
 * @author pchretien, npiedeloup
 * @param <I> Type de l'objet représentant l'index
 * @param <K> Type du keyConcept métier indexé
 */
final class ESStatement<K extends KeyConcept, I extends DataObject> {

	private static final RefreshPolicy DEFAULT_REFRESH = RefreshPolicy.NONE; //mettre a true pour TU uniquement
	private static final RefreshPolicy BULK_REFRESH = RefreshPolicy.NONE; //mettre a RefreshPolicy.IMMEDIATE pour TU uniquement
	private static final Logger LOGGER = LogManager.getLogger(ESStatement.class);

	private final String indexName;
	private final RestHighLevelClient esClient;
	private final ESDocumentCodec esDocumentCodec;
	private final Map<Class, BasicTypeAdapter> typeAdapters;

	/**
	 * Constructor.
	 * @param esDocumentCodec Codec de traduction (bi-directionnelle) des objets métiers en document
	 * @param indexName Index name
	 * @param esClient Client ElasticSearch.
	 */
	ESStatement(final ESDocumentCodec esDocumentCodec, final String indexName, final RestHighLevelClient esClient, final Map<Class, BasicTypeAdapter> typeAdapters) {
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
			final BulkRequest bulkRequest = new BulkRequest()
					.setRefreshPolicy(BULK_REFRESH);

			for (final SearchIndex<K, I> index : indexCollection) {
				try (final XContentBuilder xContentBuilder = esDocumentCodec.index2XContentBuilder(index)) {
					final IndexRequest indexRequest = new IndexRequest(indexName)
							.id(index.getUID().urn())
							.source(xContentBuilder);
					bulkRequest.add(indexRequest);
				}
			}
			final BulkResponse bulkResponse = esClient.bulk(bulkRequest, RequestOptions.DEFAULT);
			if (bulkResponse.hasFailures()) {
				throw new VSystemException("Can't putAll into {1} index.\nCause by {2}", indexName, bulkResponse.buildFailureMessage());
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
		try (final XContentBuilder xContentBuilder = esDocumentCodec.index2XContentBuilder(index)) {
			final IndexRequest indexRequest = new IndexRequest(indexName)
					.id(index.getUID().urn())
					.source(xContentBuilder)
					.setRefreshPolicy(DEFAULT_REFRESH);
			final IndexResponse indexeResponse = esClient.index(indexRequest, RequestOptions.DEFAULT);
			//-----
			Assertion.check().isTrue(indexeResponse.getResult() == DocWriteResponse.Result.CREATED
					|| indexeResponse.getResult() == DocWriteResponse.Result.UPDATED, "Can't put on {0}", indexName);
		} catch (final IOException e) {
			handleIOException(e);
		}
	}

	/**
	 * Supprime des documents.
	 * @param query Requete de filtrage des documents à supprimer
	 */
	void remove(final ListFilter query) {
		Assertion.check().isNotNull(query);
		//-----
		try {
			final QueryBuilder queryBuilder = AsbtractESSearchRequestBuilder.translateToQueryBuilder(query);
			final DeleteByQueryRequest request = new DeleteByQueryRequest(indexName)
					.setQuery(queryBuilder);
			final BulkByScrollResponse response = esClient.deleteByQuery(request, RequestOptions.DEFAULT);
			final long deleted = response.getDeleted();
			LOGGER.debug("Removed {} elements", deleted);
		} catch (final SearchPhaseExecutionException e) {
			final VUserException vue = new VUserException(SearchResource.DATAFACTORY_SEARCH_QUERY_SYNTAX_ERROR);
			vue.initCause(e);
			throw vue;
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error in remove() on {0}", indexName);
		}
	}

	Map<UID<K>, Serializable> loadVersions(final DataField versionField, final ListFilter listFilter, final int maxElements) {
		Assertion.check().isNotNull(versionField).isNotNull(listFilter);
		//-----
		try {
			final QueryBuilder queryfilterBuilder = QueryBuilders
					.queryStringQuery(listFilter.getFilterValue())
					.analyzeWildcard(true);

			final var searchRequest = new SearchRequest(indexName)
					.searchType(SearchType.QUERY_THEN_FETCH)
					.source(new SearchSourceBuilder()
							.size(maxElements)
							.trackTotalHitsUpTo(10_000)
							.query(queryfilterBuilder)
							.fetchSource(new String[] { versionField.name() }, null));

			final SearchResponse searchResponse = esClient.search(searchRequest, RequestOptions.DEFAULT);
			final Map<UID<K>, Serializable> result = new HashMap<>();
			for (final SearchHit searchHit : searchResponse.getHits()) {
				final String urn = searchHit.getId();
				final Serializable value = decodeVersionValue(versionField, searchHit.getSourceAsMap().get(versionField.name()));
				result.put(UID.of(urn), value);
			}
			return result;
		} catch (final SearchPhaseExecutionException e) {
			final VUserException vue = new VUserException(SearchResource.DATAFACTORY_SEARCH_QUERY_SYNTAX_ERROR);
			vue.initCause(e);
			throw vue;
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
			case Integer -> value instanceof Integer ? (Integer) value : Integer.valueOf(String.valueOf(value));
			case Long -> value instanceof Long ? (Long) value : Long.valueOf(String.valueOf(value));
			case Instant -> value instanceof Instant ? (Instant) value : Instant.parse(String.valueOf(value));
			case String -> String.valueOf(value);
			case BigDecimal, DataStream, Boolean, Double, LocalDate -> throw new IllegalArgumentException("Type's versionField " + versionFieldDataType.name() + " from "
					+ indexName + " is not supported, prefer int, long, Instant or String.");
		};
	}

	/**
	 * Supprime un document.
	 * @param uid UID du document à supprimer
	 */
	void remove(final UID uid) {
		Assertion.check().isNotNull(uid);
		//-----
		try {
			final DeleteRequest request = new DeleteRequest(indexName, uid.urn()) //index, doc_id
					.setRefreshPolicy(DEFAULT_REFRESH);
			final DeleteResponse deleteResponse = esClient.delete(request, RequestOptions.DEFAULT);
			//----
			Assertion.check().isTrue(deleteResponse.getResult() == DocWriteResponse.Result.DELETED,
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
	FacetedQueryResult<I, SearchQuery> loadList(final DataDefinition indexDtDefinition, final String[] indexNames, final SearchQuery searchQuery, final DtListState listState, final int defaultMaxRows) {
		Assertion.check().isNotNull(searchQuery);
		//-----
		final SearchRequest searchRequest = new ESSearchRequestBuilder(indexNames, esClient, typeAdapters)
				.withIndexDtDefinition(indexDtDefinition)
				.withSearchQuery(searchQuery)
				.withListState(listState, defaultMaxRows)
				.build();
		LOGGER.info("loadList {}", searchRequest);
		try {
			final SearchResponse searchResponse = esClient.search(searchRequest, RequestOptions.DEFAULT);
			return new ESFacetedQueryResultBuilder(esDocumentCodec, indexDtDefinition, searchResponse, searchQuery)
					.build();
		} catch (final ElasticsearchStatusException e) {
			final String errorMessage = e.getCause() != null ? e.getCause().getMessage() : e.getMessage();
			if (errorMessage.contains("set fielddata=true")) {
				final VUserException vue = new VUserException(SearchResource.DATAFACTORY_SEARCH_INDEX_FIELDDATA_ERROR);
				vue.initCause(e);
				throw vue;
			} else if (errorMessage.contains("Failed to parse query") || errorMessage.contains("type=search_phase_execution_exception")) {
				final VUserException vue = new VUserException(SearchResource.DATAFACTORY_SEARCH_QUERY_SYNTAX_ERROR);
				vue.initCause(e);
				throw vue;
			}
			throw WrappedException.wrap(e, "Error in loadList() on {0}", indexName);
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error in loadList() on {0}", indexName);
		}
	}

	/**
	 * @return Nombre de document indexés
	 */
	public long count() {
		try {
			final CountRequest countRequest = new CountRequest(indexName);
			final CountResponse countResponse = esClient.count(countRequest, RequestOptions.DEFAULT);
			return countResponse.getCount();
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error in count() on {0}", indexName);
		}
	}

}
