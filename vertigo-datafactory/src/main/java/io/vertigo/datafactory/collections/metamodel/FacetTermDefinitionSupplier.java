package io.vertigo.datafactory.collections.metamodel;

import io.vertigo.core.locale.MessageText;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.DefinitionSupplier;
import io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder;
import io.vertigo.datamodel.structure.metamodel.DtDefinition;

public final class FacetTermDefinitionSupplier implements DefinitionSupplier {

	private final String myName;
	private String myDtDefinitionName;
	private String myFieldName;
	private String myLabel;
	private boolean myMultiSelectable;
	private FacetOrder myOrder;

	public FacetTermDefinitionSupplier(final String name) {
		this.myName = name;
	}

	public FacetTermDefinitionSupplier withDtDefinition(final String dtDefinitionName) {
		this.myDtDefinitionName = dtDefinitionName;
		return this;
	}

	public FacetTermDefinitionSupplier withFieldName(final String fieldName) {
		this.myFieldName = fieldName;
		return this;
	}

	public FacetTermDefinitionSupplier withLabel(final String label) {
		this.myLabel = label;
		return this;
	}

	public FacetTermDefinitionSupplier withMultiSelectable() {
		myMultiSelectable = true;
		return this;
	}

	public FacetTermDefinitionSupplier withOrder(final FacetOrder order) {
		this.myOrder = order;
		return this;
	}

	@Override
	public FacetDefinition get(final DefinitionSpace definitionSpace) {
		final DtDefinition indexDtDefinition = definitionSpace.resolve(myDtDefinitionName, DtDefinition.class);
		return FacetDefinition.createFacetDefinitionByTerm(
				myName,
				indexDtDefinition.getField(myFieldName),
				MessageText.of(myLabel),
				myMultiSelectable,
				myOrder);
	}
}
