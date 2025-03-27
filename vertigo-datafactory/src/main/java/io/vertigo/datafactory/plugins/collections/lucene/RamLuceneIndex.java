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
package io.vertigo.datafactory.plugins.collections.lucene;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.document.DateTools;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.SortedDocValuesField;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.index.IndexableField;
import org.apache.lucene.search.BooleanQuery.TooManyClauses;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.Sort;
import org.apache.lucene.search.SortField;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.RAMDirectory;
import org.apache.lucene.util.BytesRef;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VUserException;
import io.vertigo.core.node.Node;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.model.DtListURIForMasterData;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datastore.entitystore.EntityStoreManager;

/**
 * Implémentation Ram de l'index Lucene.
 * Il existe une seule instance par JVM.
 * Il ne doit aussi exister qu'un seul writer.
 *
 * @author  pchretien, npiedeloup
 * @param <D> Type d'objet
 */
final class RamLuceneIndex<D extends DataObject> {

	//DtDefinition est non serializable
	private final DataDefinition dataDefinition;

	private final Optional<DataField> idFieldOpt;
	private final String idFieldName;

	private final Map<String, D> indexedObjectPerPk = new HashMap<>();
	private final Directory directory;

	private final Analyzer indexAnalyser;
	private final RamLuceneQueryFactory luceneQueryFactory;
	private final SmartTypeManager smartTypeManager;

	/**
	 * @param dataDefinition DataDefinition des objets indexés
	 * @throws IOException Exception I/O
	 */
	RamLuceneIndex(
			final DataDefinition dataDefinition,
			final SmartTypeManager smartTypeManager) throws IOException {
		Assertion.check()
				.isNotNull(dataDefinition)
				.isNotNull(smartTypeManager);
		//-----
		indexAnalyser = new DefaultAnalyzer(false); //les stop word marchent mal si asymétrique entre l'indexation et la query
		luceneQueryFactory = new RamLuceneQueryFactory(indexAnalyser);
		this.dataDefinition = dataDefinition;
		this.smartTypeManager = smartTypeManager;
		directory = new RAMDirectory();
		idFieldOpt = dataDefinition.getIdField();
		idFieldName = idFieldOpt.isPresent() ? idFieldOpt.get().name() : "_id";
		//l'index est crée automatiquement la premiere fois.
		buildIndex();
	}

	private void buildIndex() throws IOException {
		try (final IndexWriter indexWriter = createIndexWriter()) {
			// we are creating an empty index if it does not exist
		}
	}

	private IndexWriter createIndexWriter() throws IOException {
		final IndexWriterConfig config = new IndexWriterConfig(indexAnalyser); //sur une implé mémoire on peut utiliser la dernière version
		return new IndexWriter(directory, config);
	}

	/**
	 * @param id Clé de l'objet
	 * @return Objet associé dans cet index.
	 */
	private D getDataIndexed(final String id) {
		return indexedObjectPerPk.get(id);
	}

	/**
	 * Associe une clé à un objet.
	 * @param pkValue Valeur de la clé
	 * @param dto Objet associé
	 */
	private void mapDocument(final String pkValue, final D dto) {
		indexedObjectPerPk.put(pkValue, dto);
	}

	private DtList<D> executeQuery(
			final Query query,
			final int skip,
			final int top,
			final Optional<Sort> optSort) throws IOException {
		try (final IndexReader indexReader = DirectoryReader.open(directory)) {
			final IndexSearcher searcher = new IndexSearcher(indexReader);
			//1. Exécution des la Requête
			final TopDocs topDocs;
			if (optSort.isPresent()) {
				topDocs = searcher.search(query, skip + top, optSort.get());
			} else {
				topDocs = searcher.search(query, skip + top);
			}
			//2. Traduction du résultat Lucene en une Collection
			return translateDocs(searcher, topDocs, skip, top);
		} catch (final TooManyClauses e) {
			throw (VUserException) new VUserException(Resources.DYNAMO_COLLECTIONS_INDEXER_TOO_MANY_CLAUSES).initCause(e);
		}
	}

	private DtList<D> translateDocs(
			final IndexSearcher searcher,
			final TopDocs topDocs,
			final int skip,
			final int top) throws IOException {

		final DtList<D> dtcResult = new DtList<>(dataDefinition);
		final int resultLength = topDocs.scoreDocs.length;
		if (resultLength > skip) {
			for (int i = skip; i < Math.min(skip + top, resultLength); i++) {
				final ScoreDoc scoreDoc = topDocs.scoreDocs[i];
				final Document document = searcher.doc(scoreDoc.doc);
				dtcResult.add(getDataIndexed(document.get(idFieldName)));
			}
		}
		return dtcResult;
	}

	/**
	 * Add element to index.
	 * @param fullDtc Full Dtc to index
	 * @param storeValue if data are store in index
	 * @throws IOException Indexation error
	 */
	public void addAll(final DtList<D> fullDtc, final boolean storeValue) throws IOException {
		Assertion.check().isNotNull(fullDtc)
				.isTrue(dataDefinition.equals(fullDtc.getDefinition()), "Indexed DtList's definition ({0}) must equals the same definition than index ({1}", fullDtc.getDefinition().getName(), dataDefinition.getName());

		//-----
		try (final IndexWriter indexWriter = createIndexWriter()) {
			final Collection<DataField> dtFields = fullDtc.getDefinition().getFields();

			for (final D dto : fullDtc) {
				final Document document = new Document();
				final String indexedPkValue = obtainIndexedIdValue(dto);

				addKeyword(document, idFieldName, indexedPkValue, true);
				for (final DataField dtField : dtFields) {
					final Object value = dtField.getDataAccessor().getValue(dto);
					if (value != null && (idFieldOpt.isEmpty() || !dtField.equals(idFieldOpt.get()))) {
						if (value instanceof String) {
							final String valueAsString = getStringValue(dto, dtField, smartTypeManager);
							addIndexed(document, dtField.name(), valueAsString, storeValue);
						} else if (value instanceof Date) {
							final String valueAsString = DateTools.dateToString((Date) value, DateTools.Resolution.DAY);
							addKeyword(document, dtField.name(), valueAsString, storeValue);
						} else {
							addKeyword(document, dtField.name(), value.toString(), storeValue);
						}
					}
				}
				indexWriter.addDocument(document);
				mapDocument(indexedPkValue, dto);
			}
		}
	}

	private String obtainIndexedIdValue(final D dto) {
		if (idFieldOpt.isPresent()) {
			final Object pkValue = idFieldOpt.get().getDataAccessor().getValue(dto);
			Assertion.check().isNotNull(pkValue, "Indexed DataObject must have a not null primary key. {0}.{1} was null.", dataDefinition.getName(), idFieldOpt.get().name());
			return String.valueOf(pkValue);
		} else {
			return String.valueOf(dto.hashCode());
		}
	}

	private static EntityStoreManager getEntityStoreManager() {
		return Node.getNode().getComponentSpace().resolve(EntityStoreManager.class);
	}

	private static String getStringValue(final DataObject dto, final DataField field, final SmartTypeManager smartTypeManager) {
		final String stringValue;
		final Object value = field.getDataAccessor().getValue(dto);
		if (value != null) {
			if (field.getType() == DataField.FieldType.FOREIGN_KEY && getEntityStoreManager().getMasterDataConfig().containsMasterData(field.getFkDtDefinition())) {
				//TODO voir pour mise en cache de cette navigation
				final DtListURIForMasterData mdlUri = getEntityStoreManager().getMasterDataConfig().getDtListURIForMasterData(field.getFkDtDefinition());
				final DataField displayField = mdlUri.getDataDefinition().getDisplayField().get();
				final UID<Entity> uid = UID.of(field.getFkDtDefinition(), value);
				final DataObject fkDto = getEntityStoreManager().readOne(uid);
				final Object displayValue = displayField.getDataAccessor().getValue(fkDto);
				stringValue = smartTypeManager.valueToString(displayField.smartTypeDefinition(), displayValue);
			} else {
				stringValue = String.valueOf(field.getDataAccessor().getValue(dto));
			}
			return stringValue.trim();
		}
		return null;
	}

	/**
	 * Querying index.
	 * @param keywords Keywords
	 * @param searchedFields Searched field list
	 * @param listFilters Added filters
	 * @param dtListState Sort and page list state
	 * @param boostedField Field use for boosting score
	 * @return Filtered ordered list
	 * @throws IOException Query error
	 */
	public DtList<D> getCollection(
			final String keywords,
			final Collection<DataField> searchedFields,
			final List<ListFilter> listFilters,
			final DtListState dtListState,
			final Optional<DataField> boostedField) throws IOException {
		Assertion.check()
				.isNotNull(searchedFields)
				.isNotNull(dtListState)
				.isTrue(dtListState.getMaxRows().isPresent(), "MaxRows is mandatory, can't get all data :(");
		//-----

		final Query filterQuery = luceneQueryFactory.createFilterQuery(keywords, searchedFields, listFilters, dataDefinition.getIdField(), boostedField);
		final Optional<Sort> sortOpt = createSort(dtListState);
		return executeQuery(filterQuery, dtListState.getSkipRows(), dtListState.getMaxRows().get(), sortOpt);
	}

	private static void addKeyword(
			final Document document,
			final String fieldName,
			final String fieldValue,
			final boolean storeValue) {
		final IndexableField keywordField = new StringField(fieldName, fieldValue, storeValue ? Field.Store.YES : Field.Store.NO);
		keywordField.fieldType().storeTermVectorPositions();
		final IndexableField sortedDocValuesField = new SortedDocValuesField(fieldName, new BytesRef(fieldValue));
		document.add(keywordField);
		document.add(sortedDocValuesField);
	}

	private static void addIndexed(
			final Document document,
			final String fieldName,
			final String fieldValue,
			final boolean storeValue) {
		final IndexableField textField = new TextField(fieldName, fieldValue, storeValue ? Field.Store.YES : Field.Store.NO);
		final IndexableField sortedDocValuesField = new SortedDocValuesField(fieldName, new BytesRef(fieldValue.toLowerCase(Locale.ROOT)));
		document.add(textField);
		document.add(sortedDocValuesField);
	}

	private static Optional<Sort> createSort(final DtListState dtListState) {
		return dtListState.getSortFieldName().map(
				sortFieldName -> {
					final boolean sortDesc = dtListState.isSortDesc().get();
					final SortField.Type luceneType = SortField.Type.STRING; //TODO : check if other type are necessary
					final SortField sortField = new SortField(sortFieldName, luceneType, sortDesc);
					sortField.setMissingValue(SortField.STRING_LAST);
					return new Sort(sortField);
				});
	}
}
