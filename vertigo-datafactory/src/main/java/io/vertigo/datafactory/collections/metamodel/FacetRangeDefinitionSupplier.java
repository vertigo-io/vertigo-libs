package io.vertigo.datafactory.collections.metamodel;

import java.util.ArrayList;
import java.util.List;

import io.vertigo.core.locale.MessageText;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.DefinitionSupplier;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder;
import io.vertigo.datafactory.collections.model.FacetValue;
import io.vertigo.datamodel.structure.metamodel.DtDefinition;

public final class FacetRangeDefinitionSupplier implements DefinitionSupplier {

	private final String name;
	private String dtDefinitionName;
	private String fieldName;
	private String label;
	private boolean multiSelectable;
	private final List<FacetValue> facetValues = new ArrayList<>();
	private FacetOrder order;

	public FacetRangeDefinitionSupplier(final String name) {
		this.name = name;
	}

	public FacetRangeDefinitionSupplier withDtDefinition(final String dtDefinitionName) {
		this.dtDefinitionName = dtDefinitionName;
		return this;
	}

	public FacetRangeDefinitionSupplier withFieldName(final String fieldName) {
		this.fieldName = fieldName;
		return this;
	}

	public FacetRangeDefinitionSupplier withLabel(final String label) {
		this.label = label;
		return this;
	}

	public FacetRangeDefinitionSupplier withMultiSelectable() {
		multiSelectable = true;
		return this;
	}

	public FacetRangeDefinitionSupplier withRange(final String code, final String filter, final String label) {
		facetValues.add(new FacetValue(code, ListFilter.of(filter), MessageText.of(label)));
		return this;
	}

	public FacetRangeDefinitionSupplier withOrder(final FacetOrder order) {
		this.order = order;
		return this;
	}

	@Override
	public FacetDefinition get(final DefinitionSpace definitionSpace) {
		final DtDefinition indexDtDefinition = definitionSpace.resolve(dtDefinitionName, DtDefinition.class);
		return FacetDefinition.createFacetDefinitionByRange(
				name,
				indexDtDefinition.getField(fieldName),
				MessageText.of(label),
				facetValues,
				multiSelectable,
				order);
	}
}
