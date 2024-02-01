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
package io.vertigo.datafactory.plugins.search.elasticsearch;

import java.io.IOException;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.elasticsearch.search.SearchHit;
import org.elasticsearch.xcontent.XContentBuilder;
import org.elasticsearch.xcontent.XContentFactory;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.datafactory.search.model.SearchIndex;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.structure.definitions.DataAccessor;
import io.vertigo.datamodel.structure.definitions.DataDefinition;
import io.vertigo.datamodel.structure.definitions.DtField;
import io.vertigo.datamodel.structure.definitions.DtField.FieldType;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.datamodel.structure.model.KeyConcept;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.util.DtObjectUtil;

/**
 * Traduction bi directionnelle des objets SOLR en objets logique de recherche.
 * Pseudo Codec : asymétrique par le fait que ElasticSearch gère un objet différent en écriture et lecture.
 * L'objet lu ne contient pas les données indexées non stockées !
 * @author pchretien, npiedeloup
 */
public final class ESDocumentCodec {
	/** FieldName containing Full result object. */
	public static final String FULL_RESULT = "fullResult";
	public static final String DOC_ID = "docId";

	//-----
	private final CodecManager codecManager;
	private final Map<Class, BasicTypeAdapter> typeAdapters;

	/**
	 * Constructor.
	 * @param codecManager Manager des codecs
	 * @param codecManager Manager de la modelisation (SmartTypes)
	 */
	public ESDocumentCodec(final CodecManager codecManager, final Map<Class, BasicTypeAdapter> typeAdapters) {
		Assertion.check()
				.isNotNull(codecManager)
				.isNotNull(typeAdapters);
		//-----
		this.codecManager = codecManager;
		this.typeAdapters = typeAdapters;
	}

	private <I extends DtObject> String encode(final I dto) {
		Assertion.check().isNotNull(dto);
		//-----
		final byte[] data = codecManager.getCompressedSerializationCodec().encode(dto);
		return codecManager.getBase64Codec().encode(data);
	}

	private <R extends DtObject> R decode(final String base64Data) {
		Assertion.check().isNotNull(base64Data);
		//-----
		final byte[] data = codecManager.getBase64Codec().decode(base64Data);
		return (R) codecManager.getCompressedSerializationCodec().decode(data);
	}

	/**
	 * Transformation d'un resultat ElasticSearch en un index.
	 * Les highlights sont ajoutés avant ou après (non determinable).
	 * @param <S> Type du sujet représenté par ce document
	 * @param <I> Type d'object indexé
	 * @param indexDefinition DtDefinition de l'index
	 * @param searchHit Resultat ElasticSearch
	 * @return Objet logique de recherche
	 */
	public <I extends DtObject> I searchHit2DtIndex(final DataDefinition indexDtDefinition, final SearchHit searchHit) {
		/* On lit du document les données persistantes. */
		/* 1. UID */
		final String urn = searchHit.getId();
		final UID uid = io.vertigo.datamodel.structure.model.UID.of(urn);
		/* 2 : Result stocké */
		final I resultDtObjectdtObject;
		if (searchHit.field(FULL_RESULT) == null) {
			resultDtObjectdtObject = decode((String) searchHit.getSourceAsMap().get(FULL_RESULT));
		} else {
			resultDtObjectdtObject = decode(searchHit.field(FULL_RESULT).getValue());
		}
		//-----
		final DataDefinition resultDtDefinition = DtObjectUtil.findDtDefinition(resultDtObjectdtObject);
		Assertion.check()
				.isNotNull(uid)
				.isNotNull(indexDtDefinition)
				.isNotNull(resultDtObjectdtObject)
				//On vérifie la consistance des données.
				.isTrue(indexDtDefinition.equals(resultDtDefinition),
						"Le type l'objet indexé ({1}) ne correspond pas à celui de l'index ({1})", resultDtDefinition.getName(), indexDtDefinition.getName());
		//-----
		return resultDtObjectdtObject;
	}

	/**
	 * Transformation d'un index en un document ElasticSearch.
	 * @param <S> Type du sujet représenté par ce document
	 * @param <I> Type d'object indexé
	 * @param index Objet logique de recherche
	 * @return Document SOLR
	 * @throws IOException Json exception
	 */
	public <S extends KeyConcept, I extends DtObject> XContentBuilder index2XContentBuilder(final SearchIndex<S, I> index) throws IOException {
		Assertion.check().isNotNull(index);
		//-----

		final DataDefinition dataDefinition = index.getDefinition().getIndexDtDefinition();
		final List<DtField> notStoredFields = getNotStoredFields(dataDefinition); //on ne copie pas les champs not stored dans le domain
		notStoredFields.addAll(index.getDefinition().getIndexCopyToFields()); //on ne copie pas les champs (copyTo)
		final I dtResult;
		if (notStoredFields.isEmpty()) {
			dtResult = index.getIndexDtObject();
		} else {
			dtResult = cloneDto(dataDefinition, index.getIndexDtObject(), notStoredFields);
		}

		/* 2: Result stocké */
		final String result = encode(dtResult);

		/* 1 : UID */
		try (final XContentBuilder xContentBuilder = XContentFactory.jsonBuilder()) {
			xContentBuilder.startObject()
					.field(FULL_RESULT, result)
					.field(DOC_ID, Serializable.class.cast(index.getUID().getId()));

			/* 3 : Les champs du dto index */
			final DtObject dtIndex = index.getIndexDtObject();
			final DataDefinition indexDtDefinition = DtObjectUtil.findDtDefinition(dtIndex);
			final Set<DtField> copyToFields = index.getDefinition().getIndexCopyToFields();
			for (final DtField dtField : indexDtDefinition.getFields()) {
				if (!copyToFields.contains(dtField)) {//On index pas les copyFields
					final Object value = dtField.getDataAccessor().getValue(dtIndex);
					if (value != null) { //les valeurs null ne sont pas indexées => conséquence : on ne peut pas les rechercher
						xContentBuilder.field(dtField.name(), encodeValue(value, dtField.smartTypeDefinition()));
					}
				}
			}
			return xContentBuilder.endObject();
		}
	}

	public Object encodeValue(final Object value, final SmartTypeDefinition smartTypeDefinition) {
		Assertion.check()
				.isNotNull(value)
				.isNotNull(smartTypeDefinition);
		//-----
		Object encodedValue = value;
		switch (smartTypeDefinition.getScope()) {
			case BASIC_TYPE:
				if (value instanceof String) {
					encodedValue = escapeInvalidUTF8Char((String) value);
				}
				break;
			case VALUE_TYPE:
				final BasicTypeAdapter basicTypeAdapter = typeAdapters.get(smartTypeDefinition.getJavaClass());
				encodedValue = basicTypeAdapter.toBasic(value);
				break;
			default:
				throw new IllegalArgumentException("Type de donnée non pris en charge pour l'indexation [" + smartTypeDefinition.getName() + "].");
		}
		return encodedValue;
	}

	private static List<DtField> getNotStoredFields(final DataDefinition dataDefinition) {
		return dataDefinition.getFields().stream()
				//We don't store (in Result) computed fields and fields with a "notStored" domain
				.filter(dtField -> !isIndexStoredDomain(dtField.smartTypeDefinition()) || dtField.getType() == FieldType.COMPUTED)
				.collect(Collectors.toList());
	}

	private static <I extends DtObject> I cloneDto(final DataDefinition dataDefinition, final I dto, final List<DtField> excludedFields) {
		final I clonedDto = (I) DtObjectUtil.createDtObject(dataDefinition);
		for (final DtField dtField : dataDefinition.getFields()) {
			if (!excludedFields.contains(dtField)) {
				final DataAccessor dataAccessor = dtField.getDataAccessor();
				dataAccessor.setValue(clonedDto, dataAccessor.getValue(dto));
			}
		}
		return clonedDto;
	}

	private static boolean isIndexStoredDomain(final SmartTypeDefinition smartTypeDefinition) {
		final IndexType indexType = IndexType.readIndexType(smartTypeDefinition);
		return indexType.isIndexStored(); //is no specific indexType, the field should be stored
	}

	private static String escapeInvalidUTF8Char(final String value) {
		return value.replace('\uFFFF', ' ').replace('\uFFFE', ' '); //testé comme le plus rapide pour deux cas
	}
}
