package io.vertigo.datamodel.impl.smarttype.dynamic;

import java.util.List;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.DefinitionSupplier;

/**
 *
 * @author  mlaroche
 */
public final class DynamicDefinition {
	private final String name;
	private final DefinitionSupplier definitionSupplier;
	private final List<String> definitionLinkNames;

	public DynamicDefinition(
			final String name,
			final List<String> definitionLinkNames,
			final DefinitionSupplier definitionSupplier) {
		Assertion.check()
				.isNotBlank(name)
				.isNotNull(definitionLinkNames)
				.isNotNull(definitionSupplier);
		//---
		this.name = name;
		this.definitionLinkNames = definitionLinkNames;
		this.definitionSupplier = definitionSupplier;
	}

	public String getName() {
		return name;
	}

	public List<String> getDefinitionLinkNames() {
		return definitionLinkNames;
	}

	public DefinitionSupplier getDefinitionSupplier() {
		return definitionSupplier;
	}

}
