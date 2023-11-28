package io.vertigo.easyforms.metaformulaire.services;

import java.io.Serializable;

import io.vertigo.core.node.Node;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.structure.definitions.DtProperty;
import io.vertigo.easyforms.metaformulaire.domain.TypeDeChamp;

public class MetaFormulaireUiUtil implements Serializable {

	private static final long serialVersionUID = 1L;

	public TypeDeChamp getTypeDeChampByNom(final String nomTypeDeChamp) {
		return Node.getNode().getDefinitionSpace().resolve(nomTypeDeChamp, TypeDeChamp.class);
	}

	/**
	 * @param fieldPath Chemin du champ
	 * @return maxLength of the field
	 */
	public Integer smartTypeMaxLength(final String nomTypeDeChamp) {
		if (nomTypeDeChamp != null) {
			return Node.getNode().getDefinitionSpace().resolve(getTypeDeChampByNom(nomTypeDeChamp).getSmartType(), SmartTypeDefinition.class)
					.getProperties().getValue(DtProperty.MAX_LENGTH);
		}
		return null;
	}

}
