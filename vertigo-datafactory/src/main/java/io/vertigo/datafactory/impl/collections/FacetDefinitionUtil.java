package io.vertigo.datafactory.impl.collections;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import io.vertigo.core.lang.Tuple;
import io.vertigo.core.locale.MessageText;
import io.vertigo.core.node.definition.DefinitionSupplier;
import io.vertigo.core.util.Selector;
import io.vertigo.core.util.Selector.ClassConditions;
import io.vertigo.core.util.Selector.MethodConditions;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.metamodel.FacetDefinition;
import io.vertigo.datafactory.collections.metamodel.FacetedQueryDefinition;
import io.vertigo.datafactory.collections.model.FacetValue;
import io.vertigo.datafactory.search.metamodel.SearchIndexDefinition;
import io.vertigo.datafactory.search.metamodel.annotation.FacetRange;
import io.vertigo.datafactory.search.metamodel.annotation.FacetTerm;
import io.vertigo.datafactory.search.metamodel.annotation.FacetedQueryAnnotation;
import io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo;
import io.vertigo.datafactory.search.metamodel.annotation.SearchIndexAnnotation;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.ngdomain.SmartTypeDefinition;

public class FacetDefinitionUtil {

	static List<DefinitionSupplier> scanComponents(final List<Class> componentClasses) {
		final Stream<DefinitionSupplier> indexDefinitionSuppliers = new Selector()
				.from(componentClasses)
				.filterClasses(ClassConditions.annotatedWith(SearchIndexAnnotation.class))
				.findClasses()
				.stream()
				.map(clazz -> readSearchIndexDefinition(clazz));

		final Stream<DefinitionSupplier> facetDefinitionSuppliers = new Selector()
				.from(componentClasses)
				.filterClasses(ClassConditions.annotatedWith(SearchIndexAnnotation.class))
				.filterMethods(MethodConditions.annotatedWith(FacetedQueryAnnotation.class))
				.findMethods()
				.stream()
				.flatMap(tuple -> readFacetedDefinition(tuple).stream());

		return Stream.concat(indexDefinitionSuppliers, facetDefinitionSuppliers)
				.collect(Collectors.toList());
	}

	private static DefinitionSupplier readSearchIndexDefinition(final Class clazz) {
		return definitionSpace -> {
			final SearchIndexAnnotation searchIndexAnnotation = (SearchIndexAnnotation) clazz.getAnnotation(SearchIndexAnnotation.class);
			final DtDefinition keyConceptDtDefinition = definitionSpace.resolve(searchIndexAnnotation.keyConcept(), DtDefinition.class);
			final DtDefinition indexDtDefinition = definitionSpace.resolve(searchIndexAnnotation.dtIndex(), DtDefinition.class);
			final Map<DtField, List<DtField>> copyToFields = new HashMap<>(); //(map fromField : [toField, toField, ...])

			for (final IndexCopyTo indexCopyTo : (IndexCopyTo[]) clazz.getAnnotationsByType(IndexCopyTo.class)) {
				final DtField dtFieldFrom = indexDtDefinition.getField(indexCopyTo.field());
				final List<DtField> dtFieldTos = Stream.of(indexCopyTo.to()).map(toField -> indexDtDefinition.getField(toField)).collect(Collectors.toList());
				copyToFields.put(dtFieldFrom, dtFieldTos);
			}

			return new SearchIndexDefinition(searchIndexAnnotation.name(), keyConceptDtDefinition, indexDtDefinition, copyToFields, searchIndexAnnotation.loaderId());
		};
	}

	private static List<DefinitionSupplier> readFacetedDefinition(final Tuple<Class, Method> tuple) {
		final List<DefinitionSupplier> definitionSuppliers = new ArrayList<>();

		final FacetedQueryAnnotation facetedQueryAnnotation = tuple.getVal2().getAnnotation(FacetedQueryAnnotation.class);
		for (final Annotation annotation : tuple.getVal2().getAnnotations()) {
			if (annotation instanceof FacetTerm) {
				definitionSuppliers.add(definitionSpace -> {
					final SearchIndexAnnotation searchIndexAnnotation = (SearchIndexAnnotation) tuple.getVal1().getAnnotation(SearchIndexAnnotation.class);
					final DtDefinition indexDtDefinition = definitionSpace.resolve(searchIndexAnnotation.dtIndex(), DtDefinition.class);
					final FacetTerm facetTermAnnotation = (FacetTerm) annotation;
					return FacetDefinition.createFacetDefinitionByTerm(
							facetTermAnnotation.name(),
							indexDtDefinition.getField(facetTermAnnotation.fieldName()),
							MessageText.of(facetTermAnnotation.label()),
							facetTermAnnotation.multiselectable(),
							facetTermAnnotation.order());
				});
			} else if (annotation instanceof FacetRange) {
				definitionSuppliers.add(definitionSpace -> {
					final SearchIndexAnnotation searchIndexAnnotation = (SearchIndexAnnotation) tuple.getVal1().getAnnotation(SearchIndexAnnotation.class);
					final DtDefinition indexDtDefinition = definitionSpace.resolve(searchIndexAnnotation.dtIndex(), DtDefinition.class);
					final FacetRange facetRangeAnnotation = (FacetRange) annotation;
					return FacetDefinition.createFacetDefinitionByRange(
							facetRangeAnnotation.name(),
							indexDtDefinition.getField(facetRangeAnnotation.fieldName()),
							MessageText.of(facetRangeAnnotation.label()),
							Stream.of(facetRangeAnnotation.ranges())
									.map(range -> new FacetValue(range.code(), ListFilter.of(range.filter()), MessageText.of(range.label())))
									.collect(Collectors.toList()),
							facetRangeAnnotation.multiselectable(),
							facetRangeAnnotation.order());
				});
			}
		}

		definitionSuppliers.add(definitionSpace -> {
			final SearchIndexAnnotation searchIndexAnnotation = (SearchIndexAnnotation) tuple.getVal1().getAnnotation(SearchIndexAnnotation.class);
			final DtDefinition keyConceptDtDefinition = definitionSpace.resolve(searchIndexAnnotation.keyConcept(), DtDefinition.class);
			final List<FacetDefinition> facetDefinitions = Stream.of(tuple.getVal2().getAnnotations())
					.filter(annotation -> annotation instanceof FacetTerm || annotation instanceof FacetRange)
					.map(annotation -> {
						if (annotation instanceof FacetTerm) {
							return definitionSpace.resolve(((FacetTerm) annotation).name(), FacetDefinition.class);
						}
						return definitionSpace.resolve(((FacetRange) annotation).name(), FacetDefinition.class);
					}).collect(Collectors.toList());
			final SmartTypeDefinition criteriaSmartType = definitionSpace.resolve(facetedQueryAnnotation.criteriaSmartType(), SmartTypeDefinition.class);
			return new FacetedQueryDefinition(
					facetedQueryAnnotation.name(),
					keyConceptDtDefinition,
					facetDefinitions,
					criteriaSmartType,
					facetedQueryAnnotation.listFilterBuilderClass(),
					facetedQueryAnnotation.listFilterBuilderQuery());
		});

		return definitionSuppliers;
	}

}
