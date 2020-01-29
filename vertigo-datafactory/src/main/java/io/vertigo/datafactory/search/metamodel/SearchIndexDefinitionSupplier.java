package io.vertigo.datafactory.search.metamodel;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.DefinitionSupplier;
import io.vertigo.datamodel.structure.metamodel.DtDefinition;
import io.vertigo.datamodel.structure.metamodel.DtField;

public final class SearchIndexDefinitionSupplier implements DefinitionSupplier {

	private final String name;
	private String keyConceptDtDefinitionName;
	private String indexDtDefinitionName;
	private String indexLoaderId;
	private final Map<String, String[]> indexCopyTo = new HashMap<>();

	public SearchIndexDefinitionSupplier(final String name) {
		this.name = name;
	}

	public SearchIndexDefinitionSupplier withKeyConcept(final String keyConceptDtDefinitionName) {
		this.keyConceptDtDefinitionName = keyConceptDtDefinitionName;
		return this;
	}

	public SearchIndexDefinitionSupplier withIndexDtDefinition(final String indexDtDefinitionName) {
		this.indexDtDefinitionName = indexDtDefinitionName;
		return this;
	}

	public SearchIndexDefinitionSupplier withCopyToFields(final String fromField, final String... toFields) {
		indexCopyTo.put(fromField, toFields);
		return this;
	}

	public SearchIndexDefinitionSupplier withLoaderId(final String indexLoaderId) {
		this.indexLoaderId = indexLoaderId;
		return this;
	}

	@Override
	public SearchIndexDefinition get(final DefinitionSpace definitionSpace) {
		final DtDefinition keyConceptDtDefinition = definitionSpace.resolve(keyConceptDtDefinitionName, DtDefinition.class);
		final DtDefinition indexDtDefinition = definitionSpace.resolve(indexDtDefinitionName, DtDefinition.class);

		final Map<DtField, List<DtField>> copyToFields = new HashMap<>(); //(map fromField : [toField, toField, ...])
		for (final Map.Entry<String, String[]> indexCopyTo : indexCopyTo.entrySet()) {
			final DtField dtFieldFrom = indexDtDefinition.getField(indexCopyTo.getKey());
			final List<DtField> dtFieldTos = Stream.of(indexCopyTo.getValue()).map(toField -> indexDtDefinition.getField(toField)).collect(Collectors.toList());
			copyToFields.put(dtFieldFrom, dtFieldTos);
		}
		return new SearchIndexDefinition(name, keyConceptDtDefinition, indexDtDefinition, copyToFields, indexLoaderId);
	}
}
