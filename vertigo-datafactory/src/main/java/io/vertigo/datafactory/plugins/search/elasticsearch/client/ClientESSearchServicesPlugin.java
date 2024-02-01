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
package io.vertigo.datafactory.plugins.search.elasticsearch.client;

import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.net.URL;
import java.time.Instant;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.action.admin.cluster.health.ClusterHealthAction;
import org.elasticsearch.action.admin.cluster.health.ClusterHealthRequestBuilder;
import org.elasticsearch.action.admin.cluster.health.ClusterHealthResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.support.WriteRequest.RefreshPolicy;
import org.elasticsearch.action.support.master.AcknowledgedResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.IndicesAdminClient;
import org.elasticsearch.cluster.metadata.MappingMetadata;
import org.elasticsearch.common.Strings;
import org.elasticsearch.common.collect.ImmutableOpenMap;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.xcontent.XContentBuilder;
import org.elasticsearch.xcontent.XContentFactory;

import com.carrotsearch.hppc.cursors.ObjectObjectCursor;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.connectors.elasticsearch.ElasticSearchConnector;
import io.vertigo.core.analytics.health.HealthChecked;
import io.vertigo.core.analytics.health.HealthMeasure;
import io.vertigo.core.analytics.health.HealthMeasureBuilder;
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
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.definitions.DtField;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.model.DtObject;
import io.vertigo.datamodel.data.model.KeyConcept;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;

/**
 * Gestion de la connexion au serveur Solr de manière transactionnel.
 * @author dchallas, npiedeloup
 */
public final class ClientESSearchServicesPlugin implements SearchServicesPlugin, Activeable {
	private static final int DEFAULT_SCALING_FACTOR = 1000;
	private static final String DEFAULT_DATE_FORMAT = "dd/MM/yyyy||strict_date_optional_time||epoch_second";
	private static final int OPTIMIZE_MAX_NUM_SEGMENT = 32;
	/** field suffix for keyword fields added by this plugin. */
	public static final String SUFFIX_SORT_FIELD = ".keyword";

	private static final Logger LOGGER = LogManager.getLogger(ClientESSearchServicesPlugin.class);
	private final SmartTypeManager smartTypeManager;
	private final CodecManager codecManager;
	private final ElasticSearchConnector elasticSearchConnector;

	private ESDocumentCodec elasticDocumentCodec;
	private Map<Class, BasicTypeAdapter> typeAdapters;

	private Client esClient;
	private final DtListState defaultListState;
	private final int defaultMaxRows;
	private final String envIndexPrefix;
	private final Set<String> types = new HashSet<>();
	private final URL configFileUrl;
	private boolean indexSettingsValid;

	/**
	 * Constructor.
	 * @param envIndexPrefix ES index name
	 * @param defaultMaxRows Nombre de lignes
	 * @param codecManager Manager de codec
	 * @param configFile Fichier de configuration des indexs
	 * @param resourceManager Manager des resources
	 */
	@Inject
	public ClientESSearchServicesPlugin(
			@ParamValue("envIndexPrefix") final String envIndexPrefix,
			@ParamValue("rowsPerQuery") final int defaultMaxRows,
			@ParamValue("config.file") final String configFile,
			@ParamValue("connectorName") final Optional<String> connectorNameOpt,
			final List<ElasticSearchConnector> elasticSearchConnectors,
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
		final String connectorName = connectorNameOpt.orElse("main");
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
			final String myIndexName = obtainIndexName(indexDefinition);
			createIndex(myIndexName);
			updateTypeMapping(indexDefinition, hasSortableNormalizer(myIndexName));
			logMappings(myIndexName);
			types.add(indexDefinition.getName());
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
			final Settings currentSettings = esClient.admin()
					.indices()
					.prepareGetIndex()
					.addIndices(myIndexName)
					.get()
					.getSettings()
					.get(myIndexName);
			return !currentSettings.getAsSettings("index.analysis.normalizer.sortable").isEmpty();
		} catch (final ElasticsearchException e) {
			throw WrappedException.wrap(e, "Error on index {0}", myIndexName);
		}
	}

	private String obtainIndexName(final SearchIndexDefinition indexDefinition) {
		return StringUtil.camelToConstCase(envIndexPrefix + indexDefinition.getName()).toLowerCase(Locale.ROOT);
	}

	private void createIndex(final String myIndexName) {
		try {
			if (!esClient.admin().indices().prepareExists(myIndexName).get().isExists()) {
				if (configFileUrl == null) {
					esClient.admin().indices().prepareCreate(myIndexName).get();
				} else {
					try (InputStream is = configFileUrl.openStream()) {
						final Settings settings = Settings.builder().loadFromStream(configFileUrl.getFile(), is, false).build();
						esClient.admin().indices().prepareCreate(myIndexName).setSettings(settings).get();
					}
				}
			} else if (configFileUrl != null) {
				// If we use local config file, we check config against ES server
				try (InputStream is = configFileUrl.openStream()) {
					final Settings settings = Settings.builder().loadFromStream(configFileUrl.getFile(), is, false).build();
					indexSettingsValid = indexSettingsValid && !isIndexSettingsDirty(myIndexName, settings);
				}
			}
		} catch (final ElasticsearchException | IOException e) {
			throw WrappedException.wrap(e, "Error on index {0}", myIndexName);
		}
	}

	private boolean isIndexSettingsDirty(final String myIndexName, final Settings settings) {
		final Settings currentSettings = esClient.admin()
				.indices()
				.prepareGetIndex()
				.addIndices(myIndexName)
				.get()
				.getSettings()
				.get(myIndexName);
		boolean indexSettingsDirty = false;
		final Set<String> settingsNames = settings.keySet();
		for (final String settingsName : settingsNames) {
			final String currentValue = currentSettings.get(settingsName);
			if (currentValue == null) {
				indexSettingsDirty = true;
				break;
			}
			final Object expectedValue = settings.get(settingsName);
			if (!currentValue.equals(expectedValue)) {
				indexSettingsDirty = true;
				LOGGER.warn("[{}] {} :  current={}, expected= {}", myIndexName, settingsName, currentValue, expectedValue);
				break;
			}
		}
		return indexSettingsDirty;
	}

	private void logMappings(final String myIndexName) {
		final IndicesAdminClient indicesAdmin = esClient.admin().indices();
		final ImmutableOpenMap<String, ImmutableOpenMap<String, MappingMetadata>> indexMappings = indicesAdmin.prepareGetMappings(myIndexName).get().getMappings();
		for (final ObjectObjectCursor<String, ImmutableOpenMap<String, MappingMetadata>> indexMapping : indexMappings) {
			LOGGER.info("Index {} CurrentMapping:", indexMapping.key);
			for (final ObjectObjectCursor<String, MappingMetadata> dtoMapping : indexMapping.value) {
				LOGGER.info(" {} -> {}", dtoMapping.key, dtoMapping.value.source());
			}
		}
	}

	/** {@inheritDoc} */
	@Override
	public <S extends KeyConcept, I extends DtObject> void putAll(final SearchIndexDefinition indexDefinition, final Collection<SearchIndex<S, I>> indexCollection) {
		Assertion.check().isNotNull(indexCollection);
		//-----
		final ESStatement<S, I> statement = createElasticStatement(indexDefinition);
		statement.putAll(indexCollection);
	}

	/** {@inheritDoc} */
	@Override
	public <S extends KeyConcept, I extends DtObject> void put(final SearchIndexDefinition indexDefinition, final SearchIndex<S, I> index) {
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
	public <R extends DtObject> FacetedQueryResult<R, SearchQuery> loadList(final List<SearchIndexDefinition> indexDefinitions, final SearchQuery searchQuery, final DtListState listState) {
		Assertion.check().isNotNull(searchQuery);
		//-----
		final ESStatement<KeyConcept, R> statement = createElasticStatement(indexDefinitions.get(0));
		final DtListState usedListState = listState != null ? listState : defaultListState;
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
		String[] indiceNames = new String[indexDefinitions.size()];
		indiceNames = indexDefinitions.stream()
				.map(d -> obtainIndexName(d))
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
	public <K extends KeyConcept> Map<UID<K>, Serializable> loadVersions(final SearchIndexDefinition indexDefinition, final DataFieldName<K> versionFieldName, final ListFilter listFilter, final int maxElements) {
		final DataDefinition indexDtDefinition = indexDefinition.getIndexDtDefinition();
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
	public void putMetaData(final SearchIndexDefinition indexDefinition, final String dataPath, final Serializable dataValue) {
		Assertion.check()
				.isNotNull(indexDefinition)
				.isNotBlank(dataPath);
		//-----
		final String metaDataIndex = obtainIndexName(indexDefinition) + ".metadata";
		ensureIndiceMetadataExists(metaDataIndex);

		if (dataValue == null) {
			esClient.prepareDelete().setRefreshPolicy(RefreshPolicy.NONE)
					.setIndex(metaDataIndex)
					.setId(dataPath)
					.get(); //get wait exec
		} else {
			try (final XContentBuilder xContentBuilder = XContentFactory.jsonBuilder()) {
				xContentBuilder.startObject()
						.field("value", dataValue)
						.field("type", dataValue.getClass().getSimpleName())
						.endObject();

				esClient.prepareIndex().setRefreshPolicy(RefreshPolicy.NONE)
						.setIndex(metaDataIndex)
						.setId(dataPath)
						.setSource(xContentBuilder)
						.get(); //get wait exec

			} catch (final IOException e) {
				throw WrappedException.wrap(e, "Error on index {0}", metaDataIndex);
			}
		}
	}

	/** {@inheritDoc} */
	@Override
	public Serializable getMetaData(final SearchIndexDefinition indexDefinition, final String dataPath) {
		Assertion.check()
				.isNotNull(indexDefinition)
				.isNotBlank(dataPath);
		//-----
		final String metaDataIndex = obtainIndexName(indexDefinition) + ".metadata";
		if (esClient.admin().indices().prepareExists(metaDataIndex).get().isExists()) {
			final GetResponse response = esClient.prepareGet()
					.setIndex(metaDataIndex)
					.setId(dataPath)
					.execute() //execute asynchrone
					.actionGet(); //get wait exec

			if (response.isExists()) {
				final String type = (String) response.getSource().get("type");
				final Serializable value = Serializable.class.cast(response.getSource().get("value"));
				if (value instanceof Integer && "Long".equals(type)) {
					return Long.valueOf((Integer) value); //ES use integer to store short long : and forget the source type
				} else if (value instanceof String && "Instant".equals(type)) {
					return Instant.parse(String.valueOf(value)); //ES use String to Instant
				}
				return value;
			}
		}
		return null;
	}

	private void ensureIndiceMetadataExists(final String metaDataIndex) {
		if (!esClient.admin().indices().prepareExists(metaDataIndex).get().isExists()) {
			try (final XContentBuilder mappingXContentBuilder = XContentFactory.jsonBuilder()) {
				mappingXContentBuilder.startObject()
						.startArray("dynamic_templates")
						.startObject()
						.startObject("all_metadata")
						.field("match", "*")
						.startObject("mapping")
						.field("type", "keyword")
						.field("ignore_above", 256)
						.endObject()
						.endObject()
						.endObject()
						.endArray()
						.endObject();

				esClient.admin().indices().prepareCreate(metaDataIndex)
						.addMapping("_doc", mappingXContentBuilder).get();
				/*to rebuild index :
				  else {
					esClient.admin().indices().prepareDelete(metaDataIndex).get();
					esClient.admin().indices().prepareCreate(metaDataIndex)
							.addMapping("_doc", mappingXContentBuilder).get();
				}*/

				logMappings(metaDataIndex);
			} catch (final IOException e) {
				throw WrappedException.wrap(e, "Error on create index {0}", metaDataIndex);
			}
		}
	}

	private <S extends KeyConcept, I extends DtObject> ESStatement<S, I> createElasticStatement(final SearchIndexDefinition indexDefinition) {
		Assertion.check()
				.isTrue(indexSettingsValid,
						"Index settings have changed and are no more compatible, you must recreate your index : stop server, delete your index data folder, restart server and launch indexation job.")
				.isNotNull(indexDefinition)
				.isTrue(types.contains(indexDefinition.getName()), "Type {0} hasn't been registered (Registered type: {1}).", indexDefinition.getName(), types);
		//-----
		return new ESStatement<>(elasticDocumentCodec, obtainIndexName(indexDefinition), esClient, typeAdapters);
	}

	private static String obtainPkIndexDataType(final SmartTypeDefinition smartTypeDefinition) {
		// On peut préciser pour chaque smartType le type d'indexation
		// Calcul automatique  par default.
		Assertion.check().isTrue(smartTypeDefinition.getScope().isBasicType(), "Type de donnée non pris en charge comme PK pour le keyconcept indexé [" + smartTypeDefinition + "].");
		switch (smartTypeDefinition.getBasicType()) {
			case Boolean:
			case Double:
			case Integer:
			case Long:
				return smartTypeDefinition.getBasicType().name().toLowerCase(Locale.ROOT);
			case String:
				return "keyword";
			case LocalDate:
			case Instant:
			case BigDecimal:
			case DataStream:
			default:
				throw new IllegalArgumentException("Type de donnée non pris en charge comme PK pour le keyconcept indexé [" + smartTypeDefinition + "].");
		}
	}

	/**
	 * Update template definition of this type.
	 * @param indexDefinition Index concerné
	 */
	private void updateTypeMapping(final SearchIndexDefinition indexDefinition, final boolean sortableNormalizer) {
		Assertion.check().isNotNull(indexDefinition);
		//-----
		final String myIndexName = obtainIndexName(indexDefinition);

		try (final XContentBuilder typeMapping = XContentFactory.jsonBuilder()) {
			typeMapping.startObject()
					.startObject("properties")
					.startObject(ESDocumentCodec.FULL_RESULT)
					.field("type", "binary")
					.endObject();

			typeMapping.startObject(ESDocumentCodec.DOC_ID)
					.field("type", obtainPkIndexDataType(indexDefinition.getKeyConceptDtDefinition().getIdField().get().smartTypeDefinition()))
					.endObject();

			/* 3 : Les champs du dto index */
			final Set<DtField> copyFromFields = indexDefinition.getIndexCopyFromFields();
			final DataDefinition indexDtDefinition = indexDefinition.getIndexDtDefinition();
			for (final DtField dtField : indexDtDefinition.getFields()) {
				final IndexType indexType = IndexType.readIndexType(dtField.smartTypeDefinition());
				typeMapping.startObject(dtField.name());
				appendIndexTypeMapping(typeMapping, indexType);
				if (copyFromFields.contains(dtField)) {
					appendIndexCopyToMapping(indexDefinition, typeMapping, dtField);
				}
				if (indexType.isIndexSubKeyword()) {
					typeMapping.startObject("fields");
					typeMapping.startObject("keyword");
					typeMapping.field("type", "keyword");
					if (sortableNormalizer) {
						typeMapping.field("normalizer", indexType.getSortableNormalizer());
					}
					typeMapping.endObject();
					typeMapping.endObject();
				}
				if (indexType.isIndexFieldData()) {
					typeMapping.field("fielddata", true);
				}
				typeMapping.endObject();
			}
			typeMapping.endObject().endObject(); //end properties

			LOGGER.info("set index mapping of {} as {}", myIndexName, Strings.toString(typeMapping));
			final AcknowledgedResponse putMappingResponse = esClient.admin()
					.indices()
					.preparePutMapping(myIndexName)
					.setType("_doc")
					.setSource(typeMapping.prettyPrint())
					.get();
			Assertion.check().isTrue(putMappingResponse.isAcknowledged(), "Can't put index mapping of {0}", myIndexName);
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Serveur ElasticSearch indisponible");
		}
	}

	private static void appendIndexCopyToMapping(final SearchIndexDefinition indexDefinition, final XContentBuilder typeMapping, final DtField dtField) throws IOException {
		final List<DtField> copyToFields = indexDefinition.getIndexCopyToFields(dtField);
		if (copyToFields.size() == 1) {
			typeMapping.field("copy_to", copyToFields.get(0).name());
		} else {
			final String[] copyToFieldNames = new String[copyToFields.size()];
			for (int i = 0; i < copyToFieldNames.length; i++) {
				copyToFieldNames[i] = copyToFields.get(i).name();
			}
			typeMapping.field("copy_to", copyToFieldNames);
		}
	}

	private static void appendIndexTypeMapping(final XContentBuilder typeMapping, final IndexType indexType) throws IOException {
		typeMapping.field("type", indexType.getIndexDataType());
		if (indexType.getIndexAnalyzer().isPresent()) {
			typeMapping.field("keyword".equals(indexType.getIndexDataType()) ? "normalizer" : "analyzer", indexType.getIndexAnalyzer().get());
		}
		if ("scaled_float".equals(indexType.getIndexDataType())) {
			typeMapping.field("scaling_factor", DEFAULT_SCALING_FACTOR);
		}
		if ("date".equals(indexType.getIndexDataType())) {
			typeMapping.field("format", DEFAULT_DATE_FORMAT);
		}
	}

	private void markToOptimize(final String myIndexName) {
		esClient.admin()
				.indices()
				.prepareForceMerge(myIndexName)
				.setFlush(true)
				.setMaxNumSegments(OPTIMIZE_MAX_NUM_SEGMENT)//32 files : empirique
				.execute()
				.actionGet();
	}

	private void waitForYellowStatus() {
		esClient.admin().cluster().prepareHealth().setWaitForYellowStatus().execute().actionGet();
	}

	@HealthChecked(name = "clusterHealth", feature = "search")
	public HealthMeasure checkClusterHealth() {
		final HealthMeasureBuilder healthMeasureBuilder = HealthMeasure.builder();
		try {
			final ClusterHealthResponse clusterHealthResponse = esClient
					.admin()
					.cluster()
					.health(new ClusterHealthRequestBuilder(esClient, ClusterHealthAction.INSTANCE).request())
					.get();
			switch (clusterHealthResponse.getStatus()) {
				case GREEN:
					healthMeasureBuilder.withGreenStatus();
					break;
				case YELLOW:
					healthMeasureBuilder.withYellowStatus(null);
					break;
				case RED:
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
