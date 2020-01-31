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
package io.vertigo.dynamo.plugins.environment.registries.search;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.locale.MessageText;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.DefinitionSupplier;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.metamodel.ListFilterBuilder;
import io.vertigo.datafactory.collections.model.FacetValue;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.StudioDtDefinition;
import io.vertigo.dynamo.domain.metamodel.StudioDtField;
import io.vertigo.dynamo.plugins.environment.KspProperty;
import io.vertigo.dynamo.plugins.environment.dsl.dynamic.DslDefinition;
import io.vertigo.dynamo.plugins.environment.dsl.dynamic.DynamicRegistry;
import io.vertigo.dynamo.plugins.environment.dsl.entity.DslEntity;
import io.vertigo.dynamo.plugins.environment.dsl.entity.DslGrammar;
import io.vertigo.dynamo.search.StudioFacetDefinition;
import io.vertigo.dynamo.search.StudioFacetDefinition.FacetOrder;
import io.vertigo.dynamo.search.StudioFacetedQueryDefinition;
import io.vertigo.dynamo.search.StudioSearchIndexDefinition;

/**
 * @author pchretien
 */
public final class SearchDynamicRegistry implements DynamicRegistry {

	@Override
	public DslGrammar getGrammar() {
		return new SearchGrammar();
	}

	/** {@inheritDoc} */
	@Override
	public DefinitionSupplier supplyDefinition(final DslDefinition dslDefinition) {
		return defintionSpace -> createDefinition(defintionSpace, dslDefinition);
	}

	private static Definition createDefinition(final DefinitionSpace definitionSpace, final DslDefinition dslDefinition) {
		final DslEntity dslEntity = dslDefinition.getEntity();

		if (SearchGrammar.INDEX_DEFINITION_ENTITY.equals(dslEntity)) {
			return createIndexDefinition(definitionSpace, dslDefinition);
		} else if (SearchGrammar.FACET_DEFINITION_ENTITY.equals(dslEntity)) {
			return createFacetDefinition(definitionSpace, dslDefinition);
		} else if (SearchGrammar.FACETED_QUERY_DEFINITION_ENTITY.equals(dslEntity)) {
			return createFacetedQueryDefinition(definitionSpace, dslDefinition);
		}
		throw new IllegalStateException("The type of definition" + dslDefinition + " is not managed by me");
	}

	private static StudioSearchIndexDefinition createIndexDefinition(final DefinitionSpace definitionSpace, final DslDefinition xsearchObjet) {
		final StudioDtDefinition keyConceptDtDefinition = definitionSpace.resolve("St" + xsearchObjet.getDefinitionLinkName("keyConcept"), StudioDtDefinition.class);
		final StudioDtDefinition indexDtDefinition = definitionSpace.resolve("St" + xsearchObjet.getDefinitionLinkName("dtIndex"), StudioDtDefinition.class);
		final String definitionName = xsearchObjet.getName();

		//Déclaration des copyField
		final Map<StudioDtField, List<StudioDtField>> copyFields = populateCopyFields(xsearchObjet, indexDtDefinition);

		final String searchLoaderId = (String) xsearchObjet.getPropertyValue(SearchGrammar.SEARCH_LOADER_PROPERTY);
		return new StudioSearchIndexDefinition("St" + definitionName, keyConceptDtDefinition, indexDtDefinition, copyFields, searchLoaderId);
	}

	private static Map<StudioDtField, List<StudioDtField>> populateCopyFields(final DslDefinition xsearchObjet, final StudioDtDefinition indexDtDefinition) {
		final Map<StudioDtField, List<StudioDtField>> copyToFields = new HashMap<>(); //(map toField : [fromField, fromField, ...])
		final List<DslDefinition> copyToFieldNames = xsearchObjet.getChildDefinitions(SearchGrammar.INDEX_COPY_TO_PROPERTY);
		for (final DslDefinition copyToFieldDefinition : copyToFieldNames) {
			final String copyFromFieldNames = (String) copyToFieldDefinition.getPropertyValue(SearchGrammar.INDEX_COPY_FROM_PROPERTY);
			copyToFields.put(
					indexDtDefinition.getField(copyToFieldDefinition.getName()),
					Stream.of(copyFromFieldNames.split(",")).map(fieldName -> indexDtDefinition.getField(fieldName)).collect(Collectors.toList()));
		}
		return copyToFields;
	}

	private static StudioFacetDefinition createFacetDefinition(final DefinitionSpace definitionSpace, final DslDefinition xdefinition) {
		final String definitionName = "St" + xdefinition.getName();
		final StudioDtDefinition indexDtDefinition = definitionSpace.resolve("St" + xdefinition.getDefinitionLinkName("dtDefinition"), StudioDtDefinition.class);
		final String dtFieldName = (String) xdefinition.getPropertyValue(SearchGrammar.FIELD_NAME);
		final StudioDtField dtField = indexDtDefinition.getField(dtFieldName);
		final String label = (String) xdefinition.getPropertyValue(KspProperty.LABEL);

		//Déclaration des ranges
		final List<DslDefinition> rangeDefinitions = xdefinition.getChildDefinitions("range");
		final MessageText labelMsg = MessageText.of(label);
		final StudioFacetDefinition facetDefinition;
		if (rangeDefinitions.isEmpty()) {
			facetDefinition = StudioFacetDefinition.createFacetDefinitionByTerm(
					definitionName,
					indexDtDefinition,
					dtField,
					labelMsg,
					isMultiSelectable(xdefinition, false),
					getFacetOrder(xdefinition, FacetOrder.count));
		} else {
			final List<FacetValue> facetValues = rangeDefinitions.stream()
					.map(SearchDynamicRegistry::createFacetValue)
					.collect(Collectors.toList());
			facetDefinition = StudioFacetDefinition.createFacetDefinitionByRange(
					definitionName,
					indexDtDefinition,
					dtField,
					labelMsg,
					facetValues,
					isMultiSelectable(xdefinition, false),
					getFacetOrder(xdefinition, FacetOrder.definition));
		}
		return facetDefinition;
	}

	private static FacetOrder getFacetOrder(final DslDefinition xdefinition, final FacetOrder defaultOrder) {
		final String orderStr = (String) xdefinition.getPropertyValue(SearchGrammar.FACET_ORDER);
		Assertion.checkArgument(orderStr == null
				|| FacetOrder.alpha.name().equals(orderStr)
				|| FacetOrder.count.name().equals(orderStr)
				|| FacetOrder.definition.name().equals(orderStr), "Facet order must be one of {0}", Arrays.toString(FacetOrder.values()));
		return orderStr != null ? FacetOrder.valueOf(orderStr) : defaultOrder;
	}

	private static boolean isMultiSelectable(final DslDefinition xdefinition, final boolean defaultValue) {
		final Boolean multiSelectable = (Boolean) xdefinition.getPropertyValue(SearchGrammar.FACET_MULTISELECTABLE);
		return multiSelectable != null ? multiSelectable : defaultValue;
	}

	private static FacetValue createFacetValue(final DslDefinition rangeDefinition) {
		final String listFilterString = (String) rangeDefinition.getPropertyValue(SearchGrammar.RANGE_FILTER_PROPERTY);
		final ListFilter listFilter = ListFilter.of(listFilterString);
		final String label = (String) rangeDefinition.getPropertyValue(KspProperty.LABEL);
		final MessageText labelMsg = MessageText.of(label);
		final String code = rangeDefinition.getName();
		return new FacetValue(code, listFilter, labelMsg);
	}

	private static StudioFacetedQueryDefinition createFacetedQueryDefinition(final DefinitionSpace definitionSpace, final DslDefinition xdefinition) {
		final String definitionName = "St" + xdefinition.getName();
		final StudioDtDefinition keyConceptDtDefinition = definitionSpace.resolve("St" + xdefinition.getDefinitionLinkName("keyConcept"), StudioDtDefinition.class);
		final List<String> dynamicFacetDefinitionNames = xdefinition.getDefinitionLinkNames("facets");
		final List<StudioFacetDefinition> facetDefinitions = dynamicFacetDefinitionNames.stream()
				.map(dynamicDefinitionName -> definitionSpace.resolve("St" + dynamicDefinitionName, StudioFacetDefinition.class))
				.collect(Collectors.toList());
		final String listFilterBuilderQuery = (String) xdefinition.getPropertyValue(SearchGrammar.LIST_FILTER_BUILDER_QUERY);
		final Class<? extends ListFilterBuilder> listFilterBuilderClass = getListFilterBuilderClass(xdefinition);
		final String criteriaDomainName = xdefinition.getDefinitionLinkName("domainCriteria");
		final Domain criteriaDomain = definitionSpace.resolve(criteriaDomainName, Domain.class);

		return new StudioFacetedQueryDefinition(
				definitionName,
				keyConceptDtDefinition,
				facetDefinitions,
				criteriaDomain,
				listFilterBuilderClass,
				listFilterBuilderQuery);
	}

	private static Class<? extends ListFilterBuilder> getListFilterBuilderClass(final DslDefinition xtaskDefinition) {
		final String listFilterBuilderClassName = (String) xtaskDefinition.getPropertyValue(SearchGrammar.LIST_FILTER_BUILDER_CLASS);
		return ClassUtil.classForName(listFilterBuilderClassName, ListFilterBuilder.class);
	}

}
