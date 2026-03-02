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

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.Serializable;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.HealthStatus;
import co.elastic.clients.elasticsearch._types.mapping.DynamicTemplate;
import co.elastic.clients.elasticsearch._types.mapping.KeywordProperty;
import co.elastic.clients.elasticsearch.core.GetResponse;
import co.elastic.clients.elasticsearch.indices.IndexSettings;
import co.elastic.clients.elasticsearch.indices.PutMappingRequest;
import co.elastic.clients.elasticsearch.indices.PutMappingResponse;
import co.elastic.clients.elasticsearch.indices.get_mapping.IndexMappingRecord;
import co.elastic.clients.util.NamedValue;
import io.vertigo.commons.codec.CodecManager;
import io.vertigo.connectors.elasticsearch.RestElasticSearchConnector;
import io.vertigo.core.analytics.health.HealthChecked;
import io.vertigo.core.analytics.health.HealthMeasure;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.resource.ResourceManager;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.impl.search.SearchServicesPlugin;
import io.vertigo.datafactory.plugins.search.elasticsearch.ESDocumentCodec;
import io.vertigo.datafactory.plugins.search.elasticsearch.IndexType;
import io.vertigo.datafactory.search.definitions.SearchIndexDefinition;
import io.vertigo.datafactory.search.model.SearchIndex;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.model.KeyConcept;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import jakarta.json.spi.JsonProvider;
import jakarta.json.stream.JsonGenerator;

/**
 * Gestion de la connexion au serveur ElasticSearch.
 * 
 * @author dchallas, npiedeloup, mlaroche
 */
public final class RestClientESSearchServicesPlugin implements SearchServicesPlugin, Activeable {
	private static final int DEFAULT_SCALING_FACTOR = 1000;
	private static final String DEFAULT_DATE_FORMAT = "dd/MM/yyyy||strict_date_optional_time||epoch_second";
	private static final long OPTIMIZE_MAX_NUM_SEGMENT = 32;
	/** field suffix for keyword fields added by this plugin. */
	public static final String SUFFIX_SORT_FIELD = ".keyword";

	private static final Logger LOGGER = LogManager.getLogger(RestClientESSearchServicesPlugin.class);
	private final SmartTypeManager smartTypeManager;
	private final CodecManager codecManager;
	private final RestElasticSearchConnector elasticSearchConnector;

	private Map<Class, BasicTypeAdapter> typeAdapters;
	private ESDocumentCodec elasticDocumentCodec;

	private ElasticsearchClient esClient;
	private final DtListState defaultListState;
	private final int defaultMaxRows;
	private final String envIndexPrefix;
	private final URL configFileUrl;
	private boolean indexSettingsValid;

	/**
	 * Constructor.
	 * 
	 * @param envIndexPrefix ES index name
	 * @param indexNameIsPrefix indexName use as prefix
	 * @param defaultMaxRows Nombre de lignes
	 * @param codecManager Manager de codec
	 * @param configFile Fichier de configuration des indexs
	 * @param resourceManager Manager des resources
	 */
	@Inject
	public RestClientESSearchServicesPlugin(
			@ParamValue("envIndexPrefix") final String envIndexPrefix,
			@ParamValue("rowsPerQuery") final int defaultMaxRows,
			@ParamValue("config.file") final String configFile,
			@ParamValue("connectorName") final Optional<String> connectorNameOpt,
			final List<RestElasticSearchConnector> elasticSearchConnectors,
			final CodecManager codecManager,
			final SmartTypeManager smartTypeManager,
			final ResourceManager resourceManager) {
		Assertion.check()
				.isNotBlank(envIndexPrefix)
				.isNotNull(elasticSearchConnectors)
				.isFalse(elasticSearchConnectors.isEmpty(), "At least one ElasticSearchConnector espected");
		//Assertion.when(indexNameIsPrefix).check(() -> indexNameOrPrefix.endsWith("_"), "When envIndex is use as prefix, it must ends with _ (current : {0})", indexNameOrPrefix);
		//Assertion.when(!indexNameIsPrefix).check(() -> !indexNameOrPrefix.endsWith("_"), "When envIndex isn't declared as prefix, it can't ends with _ (current : {0})", indexNameOrPrefix);
		//-----
		this.smartTypeManager = smartTypeManager;
		this.codecManager = codecManager;
		this.defaultMaxRows = defaultMaxRows;
		defaultListState = DtListState.of(defaultMaxRows);
		//------
		this.envIndexPrefix = envIndexPrefix;
		configFileUrl = resourceManager.resolve(configFile);
		final var connectorName = connectorNameOpt.orElse("main");
		elasticSearchConnector = elasticSearchConnectors.stream()
				.filter(connector -> connectorName.equals(connector.getName()))
				.findFirst().orElseThrow(() -> new IllegalArgumentException("Can't found ElasticSearchConnector named '" + connectorName + "' in " + elasticSearchConnectors));
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		typeAdapters = smartTypeManager.getTypeAdapters("search");
		elasticDocumentCodec = new ESDocumentCodec(codecManager, typeAdapters);
		//Init ElasticSearch Client
		esClient = elasticSearchConnector.getClient();
		indexSettingsValid = true;
		//must wait yellow status to be sure prepareExists works fine (instead of returning false on a already exist index)
		waitForYellowStatus();
		//Init typeMapping IndexDefinition <-> Conf ElasticSearch
		for (final SearchIndexDefinition indexDefinition : Node.getNode().getDefinitionSpace().getAll(SearchIndexDefinition.class)) {
			final var myIndexName = obtainIndexName(indexDefinition);
			try {
				createIndex(myIndexName);
				updateTypeMapping(indexDefinition, hasSortableNormalizer(myIndexName));
				logMappings(myIndexName);
			} catch (final IOException e) {
				throw WrappedException.wrap(e, "Error on index {0}", myIndexName);
			}
		}
		waitForYellowStatus();

	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		// nothing
	}

	private boolean hasSortableNormalizer(final String myIndexName) {
		try {
			final var getIndexResponse = esClient.indices().getSettings(b -> b.index(myIndexName));
			final var currentSettings = getIndexResponse.get(myIndexName).settings();
			return currentSettings.index().analysis().normalizer().containsKey("sortable");
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error on index {0}", myIndexName);
		}
	}

	private String obtainIndexName(final SearchIndexDefinition indexDefinition) {
		return StringUtil.camelToConstCase(envIndexPrefix + indexDefinition.getName()).toLowerCase(Locale.ROOT);
	}

	private void createIndex(final String myIndexName) throws IOException {
		if (!esClient.indices().exists(b -> b.index(myIndexName)).value()) {
			final var createIndexResponse = esClient.indices().create(b -> {
				b.index(myIndexName);
				if (configFileUrl != null) {
					try (var is = configFileUrl.openStream()) {
						// 2. Construire la requête en utilisant withJson au niveau des settings (qui sait aussi lire le yaml)
						b.settings(s -> s.withJson(is));
					} catch (final IOException e) {
						// Gestion des erreurs (IOException, ElasticSearchException)
						e.printStackTrace();
					}
				}
				return b;
			});
			Assertion.check().isTrue(createIndexResponse.acknowledged(), "Can't create index settings of {0}", myIndexName);
		} else if (configFileUrl != null) {
			// If we use local config file, we check config against ES server
			try (var is = configFileUrl.openStream()) {
				// 1. Charger les settings locaux depuis le flux YAML
				// On utilise IndexSettings._DESERIALIZER pour transformer le flux en objet typé
				IndexSettings expectedSettings = IndexSettings._DESERIALIZER.deserialize(
						esClient._jsonpMapper().jsonProvider().createParser(is),
						esClient._jsonpMapper());

				indexSettingsValid = indexSettingsValid && !isIndexSettingsDirty(myIndexName, expectedSettings);
			}
		}
	}

	private boolean isIndexSettingsDirty(final String myIndexName, final IndexSettings expectedSettings) throws IOException {
		final var getIndexResponse = esClient.indices().getSettings(b -> b.index(myIndexName));
		final var currentSettings = getIndexResponse.settings().get(myIndexName).settings();
		if (currentSettings == null) {
			return true;
		}

		// 3. Comparaison logique
		// Note : Le client Java ne permet pas facilement une comparaison "flat" comme en v7.
		// L'astuce consiste à comparer les "analysis" ou les réglages spécifiques.

		var indexSettingsDirty = false;
		// Comparaison des analyseurs (la partie la plus critique dans votre YAML)
		boolean analysisChanged = !Objects.equals(currentSettings.analysis(), expectedSettings.analysis());
		if (analysisChanged) {
			boolean subSettingsDirty = false;
			subSettingsDirty = subSettingsDirty || isSubSettingsChanges(myIndexName, "analysis.normalizer", currentSettings.analysis().normalizer(), expectedSettings.analysis().normalizer());
			subSettingsDirty = subSettingsDirty || isSubSettingsChanges(myIndexName, "analysis.tokenizer", currentSettings.analysis().tokenizer(), expectedSettings.analysis().tokenizer());
			subSettingsDirty = subSettingsDirty || isSubSettingsChanges(myIndexName, "analysis.analyzer", currentSettings.analysis().analyzer(), expectedSettings.analysis().analyzer());
			subSettingsDirty = subSettingsDirty || isSubSettingsChanges(myIndexName, "analysis.filter", currentSettings.analysis().filter(), expectedSettings.analysis().filter());
			if (!subSettingsDirty) {
				LOGGER.warn("[{}] : settings changed on others properties current={}, expected={}", currentSettings.analysis(), expectedSettings.analysis());
			}
		}
		indexSettingsDirty = indexSettingsDirty || analysisChanged;
		return indexSettingsDirty;
	}

	private static boolean isSubSettingsChanges(String myIndexName, String settingsName, Map<String, ?> currentSettings, Map<String, ?> espectedSettings) {
		boolean subSettingsDirty = false;
		final var propertiesNames = espectedSettings.keySet();
		for (final String propertyName : propertiesNames) {
			final var currentValue = currentSettings.get(propertyName);
			final Object expectedValue = espectedSettings.get(propertyName);
			if (currentValue == null) {
				subSettingsDirty = true;
				LOGGER.warn("[{}] {}.{} : missing, expected={}", myIndexName, settingsName, propertyName, expectedValue);
				break;
			}
			if (!currentValue.equals(expectedValue)) {
				subSettingsDirty = true;
				LOGGER.warn("[{}] {}.{} : current={}, expected={}", myIndexName, settingsName, propertyName, currentValue, expectedValue);
				break;
			}
		}

		return subSettingsDirty;
	}

	private void logMappings(final String myIndexName) throws IOException {
		final var getMappingsResponse = esClient.indices().getMapping(b -> b.index(myIndexName));

		final var indexMappings = getMappingsResponse.mappings();
		LOGGER.info("Index {} CurrentMapping:", myIndexName);
		for (final Entry<String, IndexMappingRecord> dtoMapping : indexMappings.entrySet()) {
			LOGGER.info(" {} -> {}", dtoMapping.getKey(), dtoMapping.getValue().toString());
		}
	}

	/** {@inheritDoc} */
	@Override
	public <S extends KeyConcept, I extends DataObject> void putAll(final SearchIndexDefinition indexDefinition, final Collection<SearchIndex<S, I>> indexCollection) {
		Assertion.check().isNotNull(indexCollection);
		//-----
		final ESStatement<S, I> statement = createElasticStatement(indexDefinition);
		statement.putAll(indexCollection);
	}

	/** {@inheritDoc} */
	@Override
	public <S extends KeyConcept, I extends DataObject> void put(final SearchIndexDefinition indexDefinition, final SearchIndex<S, I> index) {
		//On vérifie la cohérence des données SO et SOD.
		Assertion.check()
				.isNotNull(indexDefinition)
				.isNotNull(index)
				.isTrue(indexDefinition.equals(index.getDefinition()), "les Définitions ne sont pas conformes");
		//-----
		final ESStatement<S, I> statement = createElasticStatement(indexDefinition);
		statement.put(index);
	}

	/** {@inheritDoc} */
	@Override
	public <S extends KeyConcept> void remove(final SearchIndexDefinition indexDefinition, final UID<S> uri) {
		Assertion.check()
				.isNotNull(uri)
				.isNotNull(indexDefinition);
		//-----
		createElasticStatement(indexDefinition).remove(uri);
		markToOptimize(obtainIndexName(indexDefinition));
	}

	/** {@inheritDoc} */
	@Override
	public <R extends DataObject> FacetedQueryResult<R, SearchQuery> loadList(final List<SearchIndexDefinition> indexDefinitions, final SearchQuery searchQuery, final DtListState listState) {
		Assertion.check().isNotNull(searchQuery);
		//-----
		final ESStatement<KeyConcept, R> statement = createElasticStatement(indexDefinitions.get(0));
		final var usedListState = listState != null ? listState : defaultListState;
		return statement.loadList(obtainIndexDtDefinition(indexDefinitions), obtainIndicesNames(indexDefinitions), searchQuery, usedListState, defaultMaxRows);
	}

	private DataDefinition obtainIndexDtDefinition(final List<SearchIndexDefinition> indexDefinitions) {
		DataDefinition indexDtDefinition = null;
		for (final SearchIndexDefinition indexDefinition : indexDefinitions) {
			if (indexDtDefinition == null) {
				indexDtDefinition = indexDefinition.getIndexDtDefinition();
			} else {
				Assertion.check().isTrue(indexDtDefinition.equals(indexDefinition.getIndexDtDefinition()),
						"When searching multi-indices IndexDtDefinitions must be the same : {0} != {1} in {2}",
						indexDtDefinition.getName(), indexDefinition.getIndexDtDefinition().getName(), indexDefinition.getName());
			}
		}
		Assertion.check().isNotNull(indexDtDefinition);
		return indexDtDefinition;
	}

	private String[] obtainIndicesNames(final List<SearchIndexDefinition> indexDefinitions) {
		var indiceNames = new String[indexDefinitions.size()];
		indiceNames = indexDefinitions.stream()
				.map(this::obtainIndexName)
				.collect(Collectors.toList())
				.toArray(indiceNames);
		return indiceNames;
	}

	/** {@inheritDoc} */
	@Override
	public long count(final SearchIndexDefinition indexDefinition) {
		Assertion.check().isNotNull(indexDefinition);
		//-----
		return createElasticStatement(indexDefinition).count();
	}

	/** {@inheritDoc} */
	@Override
	public <K extends KeyConcept> Map<UID<K>, Serializable> loadVersions(final SearchIndexDefinition indexDefinition, final DataFieldName<K> versionFieldName, final ListFilter listFilter,
			final int maxElements) {
		final var indexDtDefinition = indexDefinition.getIndexDtDefinition();
		return ((ESStatement<K, ?>) createElasticStatement(indexDefinition)).loadVersions(indexDtDefinition.getField(versionFieldName), listFilter, maxElements);
	}

	/** {@inheritDoc} */
	@Override
	public void remove(final SearchIndexDefinition indexDefinition, final ListFilter listFilter) {
		Assertion.check()
				.isNotNull(indexDefinition)
				.isNotNull(listFilter);
		//-----
		createElasticStatement(indexDefinition).remove(listFilter);
		markToOptimize(obtainIndexName(indexDefinition));
	}

	/** {@inheritDoc} */
	@Override
	public Serializable getMetaData(final SearchIndexDefinition indexDefinition, final String dataPath) {
		Assertion.check()
				.isNotNull(indexDefinition)
				.isNotBlank(dataPath);
		//-----
		final var metaDataIndex = obtainIndexName(indexDefinition) + ".metadata";
		try {
			if (esClient.indices().exists(b -> b.index(metaDataIndex)).value()) {
				final GetResponse<Map> response = esClient.get(b -> b.index(metaDataIndex).id(dataPath), Map.class);
				if (response.found()) {
					final String type = (String) response.source().get("type");
					final Serializable rawValue = Serializable.class.cast(response.source().get("value"));
					// rawValue peut être un Integer ou un Long selon sa taille dans le JSON
					if (rawValue instanceof Number && "Long".equals(type)) {
						return ((Number) rawValue).longValue(); //ES use integer to store short long : and forget the source type
					} else if (rawValue instanceof Number && "Double".equals(type)) {
						return ((Number) rawValue).doubleValue(); //ES use integer to store short long : and forget the source type
					} else if (rawValue instanceof String && "Instant".equals(type)) {
						return Instant.parse(String.valueOf(rawValue)); //ES use String to Instant
					} else if (rawValue instanceof String && "LocalDate".equals(type)) {
						return java.time.LocalDate.parse(String.valueOf(rawValue)); //ES use String to LocalDate
					}
					return rawValue;
				}
			} //no metadata index => return null
			return null;
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error getMetaData on index {0}", metaDataIndex);
		}
	}

	/** {@inheritDoc} */
	@Override
	public void putMetaData(final SearchIndexDefinition indexDefinition, final String dataPath, final Serializable dataValue) {
		Assertion.check()
				.isNotNull(indexDefinition)
				.isNotBlank(dataPath);
		//-----
		final var metaDataIndex = obtainIndexName(indexDefinition) + ".metadata";
		ensureIndiceMetadataExists(metaDataIndex);
		try {
			if (dataValue == null) {
				esClient.delete(b -> b.index(metaDataIndex).id(dataPath));
			} else {
				final var doc = Map.of(
						"value", dataValue,
						"type", dataValue.getClass().getSimpleName());

				esClient.index(b -> b.index(metaDataIndex).id(dataPath).document(doc));
			}
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error putMetaData on index {0}", metaDataIndex);
		}
	}

	private void ensureIndiceMetadataExists(final String metaDataIndex) {
		try {
			if (!esClient.indices().exists(b -> b.index(metaDataIndex)).value()) {
				esClient.indices().create(b -> b.index(metaDataIndex)
						.mappings(mb -> mb.dynamicTemplates(
								NamedValue.of("all_metadata", DynamicTemplate.of(dt -> dt.match("*").mapping(dtmb -> dtmb.keyword(KeywordProperty.of(kp -> kp.ignoreAbove(256)))))))));
				logMappings(metaDataIndex);
			}
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error on create index {0}", metaDataIndex);
		}
	}

	private <S extends KeyConcept, I extends DataObject> ESStatement<S, I> createElasticStatement(final SearchIndexDefinition indexDefinition) {
		Assertion.check()
				.isTrue(indexSettingsValid,
						"Index settings have changed and are no more compatible, you must recreate your index : stop server, delete your index data folder, restart server and launch indexation job.")
				.isNotNull(indexDefinition, "SearchIndexDefinition is mandatory");
		//-----
		return new ESStatement<>(elasticDocumentCodec, obtainIndexName(indexDefinition), esClient, typeAdapters);
	}

	private static String obtainPkIndexDataType(final SmartTypeDefinition smartTypeDefinition) {
		// On peut préciser pour chaque smartType le type d'indexation
		// Calcul automatique  par default.
		Assertion.check().isTrue(smartTypeDefinition.getScope().isBasicType(), "Type de donnée non pris en charge comme PK pour le keyconcept indexé [" + smartTypeDefinition + "].");
		return switch (smartTypeDefinition.getBasicType()) {
			case Boolean, Double, Integer, Long -> smartTypeDefinition.getBasicType().name().toLowerCase(Locale.ROOT);
			case String -> "keyword";
			case LocalDate, Instant, BigDecimal, DataStream -> throw new IllegalArgumentException(
					"Type de donnée non pris en charge comme PK pour le keyconcept indexé [" + smartTypeDefinition + "].");
			default -> throw new IllegalArgumentException("Type de donnée non pris en charge comme PK pour le keyconcept indexé [" + smartTypeDefinition + "].");
		};
	}

	/**
	 * Update template definition of this type.
	 * 
	 * @param indexDefinition Index concerné
	 * @throws IOException
	 */
	private void updateTypeMapping(final SearchIndexDefinition indexDefinition, final boolean sortableNormalizer) throws IOException {
		Assertion.check().isNotNull(indexDefinition);
		//-----
		final var myIndexName = obtainIndexName(indexDefinition);

		//final XContentBuilder typeMapping = XContentFactory.jsonBuilder();
		JsonProvider jsonProvider = esClient._jsonpMapper().jsonProvider();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();

		try (JsonGenerator typeMapping = jsonProvider.createGenerator(baos)) {
			typeMapping.writeStartObject()
					.writeStartObject("properties")
					.writeStartObject(ESDocumentCodec.FULL_RESULT)
					.write("type", "binary")
					.writeEnd();

			typeMapping.writeStartObject(ESDocumentCodec.DOC_ID)
					.write("type", obtainPkIndexDataType(indexDefinition.getKeyConceptDtDefinition().getIdField().get().smartTypeDefinition()))
					.writeEnd();

			/* 3 : Les champs du dto index */
			final Set<DataField> copyFromFields = indexDefinition.getIndexCopyFromFields();
			final DataDefinition indexDtDefinition = indexDefinition.getIndexDtDefinition();
			for (final DataField dtField : indexDtDefinition.getFields()) {
				final IndexType indexType = IndexType.readIndexType(dtField.smartTypeDefinition());
				typeMapping.writeStartObject(dtField.name());
				appendIndexTypeMapping(typeMapping, indexType);
				if (copyFromFields.contains(dtField)) {
					appendIndexCopyToMapping(indexDefinition, typeMapping, dtField);
				}
				if (indexType.isIndexSubKeyword()) {
					typeMapping.writeStartObject("fields");
					typeMapping.writeStartObject("keyword");
					typeMapping.write("type", "keyword");
					if (sortableNormalizer) {
						typeMapping.write("normalizer", indexType.getSortableNormalizer());
					}
					typeMapping.writeEnd();
					typeMapping.writeEnd();
				}
				if (indexType.isIndexFieldData()) {
					typeMapping.write("fielddata", true);
				}
				typeMapping.writeEnd();
			}
			typeMapping.writeEnd().writeEnd(); //end properties
		}

		String jsonMapping = baos.toString(StandardCharsets.UTF_8);
		LOGGER.info("Set index mapping of {} as {}", myIndexName, jsonMapping);

		PutMappingRequest request = PutMappingRequest.of(m -> m
				.index(myIndexName)
				.withJson(new ByteArrayInputStream(baos.toByteArray())));
		PutMappingResponse putMappingResponse = esClient.indices().putMapping(request);
		Assertion.check().isTrue(putMappingResponse.acknowledged(), "Can't put index mapping of {0}", myIndexName);
	}

	private static void appendIndexCopyToMapping(final SearchIndexDefinition indexDefinition, final JsonGenerator typeMapping, final DataField dtField) throws IOException {
		final var copyToFields = indexDefinition.getIndexCopyToFields(dtField);
		if (copyToFields.size() == 1) {
			typeMapping.write("copy_to", copyToFields.get(0).name());
		} else {
			typeMapping.writeStartArray("copy_to");
			for (var i = 0; i < copyToFields.size(); i++) {
				typeMapping.write(copyToFields.get(i).name());
			}
			typeMapping.writeEnd();
		}
	}

	private static void appendIndexTypeMapping(final JsonGenerator typeMapping, final IndexType indexType) throws IOException {
		typeMapping.write("type", indexType.getIndexDataType());
		if (indexType.getIndexAnalyzer().isPresent()) {
			typeMapping.write("keyword".equals(indexType.getIndexDataType()) ? "normalizer" : "analyzer", indexType.getIndexAnalyzer().get());
		}
		if ("scaled_float".equals(indexType.getIndexDataType())) {
			typeMapping.write("scaling_factor", DEFAULT_SCALING_FACTOR);
		}
		if ("date".equals(indexType.getIndexDataType())) {
			typeMapping.write("format", DEFAULT_DATE_FORMAT);
		}
	}

	private void markToOptimize(final String indexName) {
		CompletableFuture.runAsync(() -> {
			try {
				esClient.indices().forcemerge(f -> f
						.index(indexName)
						.maxNumSegments(OPTIMIZE_MAX_NUM_SEGMENT)
						.flush(true));
				LOGGER.debug("markToOptimize ok");
			} catch (final Exception e) {
				LOGGER.error("Error on markToOptimize", e);
			}
		});
	}

	private void waitForYellowStatus() {
		try {
			final var response = esClient.cluster().health(b -> b
					.timeout(t -> t.time("30s"))
					.waitForStatus(HealthStatus.Yellow));
			//-----
			Assertion.check().isFalse(response.timedOut(), "ElasticSearch cluster waiting yellow status Timedout");
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Error on waitForYellowStatus");
		}
	}

	@HealthChecked(name = "clusterHealth", feature = "search")
	public HealthMeasure checkClusterHealth() {
		final var healthMeasureBuilder = HealthMeasure.builder();
		try {
			final var clusterHealthResponse = esClient
					.cluster()
					.health();
			switch (clusterHealthResponse.status()) {
				case Green:
					healthMeasureBuilder.withGreenStatus();
					break;
				case Yellow, Unknown:
					healthMeasureBuilder.withYellowStatus(null);
					break;
				case Red, Unavailable:
					healthMeasureBuilder.withRedStatus(null);
					break;
				default:
					break;
			}
		} catch (final Exception e) {
			healthMeasureBuilder.withRedStatus(e.getMessage());
		}
		return healthMeasureBuilder.build();
	}

}
