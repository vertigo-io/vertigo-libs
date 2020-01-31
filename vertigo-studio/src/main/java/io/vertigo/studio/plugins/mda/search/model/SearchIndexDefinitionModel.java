package io.vertigo.studio.plugins.mda.search.model;

import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.DefinitionUtil;
import io.vertigo.datafactory.search.metamodel.SearchIndexDefinition;
import io.vertigo.dynamo.search.StudioSearchIndexDefinition;

public class SearchIndexDefinitionModel {

	private final StudioSearchIndexDefinition studioSearchIndexDefinition;
	private final List<IndexCopyToModel> copyToModels;

	public SearchIndexDefinitionModel(final StudioSearchIndexDefinition studioSearchIndexDefinition) {
		Assertion.checkNotNull(studioSearchIndexDefinition);
		//---
		this.studioSearchIndexDefinition = studioSearchIndexDefinition;
		copyToModels = studioSearchIndexDefinition.getIndexCopyToFields().stream()
				.map(fromField -> new IndexCopyToModel(fromField, studioSearchIndexDefinition.getIndexCopyToFromFields(fromField)))
				.collect(Collectors.toList());
	}

	public String getName() {
		return DefinitionUtil.getPrefix(SearchIndexDefinition.class) + DefinitionUtil.getLocalName(studioSearchIndexDefinition.getName(), StudioSearchIndexDefinition.class);
	}

	public String getLoaderId() {
		return studioSearchIndexDefinition.getSearchLoaderId();
	}

	public String getIndexDtDefinition() {
		return "Dt" + studioSearchIndexDefinition.getIndexDtDefinition().getLocalName();
	}

	public String getKeyConceptDtDefinition() {
		return "Dt" + studioSearchIndexDefinition.getKeyConceptDtDefinition().getLocalName();
	}

	public List<IndexCopyToModel> getCopyToModels() {
		return copyToModels;
	}

}
