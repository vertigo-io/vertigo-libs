package io.vertigo.datafactory.collections.metamodel;

import io.vertigo.core.locale.MessageText;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.DefinitionSupplier;
import io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder;
import io.vertigo.datamodel.structure.metamodel.DtDefinition;

public final class FacetTermDefinitionSupplier implements DefinitionSupplier {

	private final String name;
	private String dtDefinitionName;
	private String fieldName;
	private String label;
	private boolean multiSelectable;
	private FacetOrder order;

	public FacetTermDefinitionSupplier(final String name) {
		this.name = name;
	}

	public FacetTermDefinitionSupplier withDtDefinition(final String dtDefinitionName) {
		this.dtDefinitionName = dtDefinitionName;
		return this;
	}

	public FacetTermDefinitionSupplier withFieldName(final String fieldName) {
		this.fieldName = fieldName;
		return this;
	}

	public FacetTermDefinitionSupplier withLabel(final String label) {
		this.label = label;
		return this;
	}

	public FacetTermDefinitionSupplier withMultiSelectable() {
		multiSelectable = true;
		return this;
	}

	public FacetTermDefinitionSupplier withOrder(final FacetOrder order) {
		this.order = order;
		return this;
	}

	@Override
	public FacetDefinition get(final DefinitionSpace definitionSpace) {
		final DtDefinition indexDtDefinition = definitionSpace.resolve(dtDefinitionName, DtDefinition.class);
		return FacetDefinition.createFacetDefinitionByTerm(
				name,
				indexDtDefinition.getField(fieldName),
				MessageText.of(label),
				multiSelectable,
				order);
	}
}
