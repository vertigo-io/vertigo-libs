package io.vertigo.studio.plugins.mda.search.model;

import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.dynamo.search.StudioSearchIndexDefinition;

public class SearchIndexDefinitionModel {

	private final StudioSearchIndexDefinition studioSearchIndexDefinition;
	private final List<IndexCopyToModel> copyToModels;

	public SearchIndexDefinitionModel(final StudioSearchIndexDefinition studioSearchIndexDefinition) {
		Assertion.checkNotNull(studioSearchIndexDefinition);
		//---
		this.studioSearchIndexDefinition = studioSearchIndexDefinition;
		copyToModels = studioSearchIndexDefinition.getIndexCopyFromFields().stream()
				.map(fromField -> new IndexCopyToModel(fromField, studioSearchIndexDefinition.getIndexCopyToFields(fromField)))
				.collect(Collectors.toList());
	}

	public String getName() {
		return studioSearchIndexDefinition.getName();
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
