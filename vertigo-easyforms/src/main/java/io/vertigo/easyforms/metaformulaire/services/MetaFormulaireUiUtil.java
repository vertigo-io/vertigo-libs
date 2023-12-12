package io.vertigo.easyforms.metaformulaire.services;

import java.io.Serializable;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import io.vertigo.core.node.Node;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.structure.definitions.DtProperty;
import io.vertigo.easyforms.metaformulaire.domain.ModeleFormulaire;
import io.vertigo.easyforms.metaformulaire.domain.ModeleFormulaire.Champ;
import io.vertigo.easyforms.metaformulaire.domain.TypeDeChamp;
import io.vertigo.easyforms.smarttypes.Formulaire;

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

	public LinkedHashMap<String, String> getFormulaireDisplay(final ModeleFormulaire modeleFormulaire, final Formulaire formulaire) {
		final var formulaireDisplay = new LinkedHashMap<String, String>();
		final Map<String, String> horsMetaFormulaire = new HashMap<>(formulaire);

		for (final Champ champ : modeleFormulaire.getChamps()) { // order is important
			final var codeChamp = champ.getCodeChamp();
			formulaireDisplay.put(champ.getLibelle(), horsMetaFormulaire.get(codeChamp));
			horsMetaFormulaire.remove(codeChamp);
		}
		for (final Entry<String, String> champ : horsMetaFormulaire.entrySet()) {
			formulaireDisplay.put(champ.getKey() + " (old)", champ.getValue());
		}
		return formulaireDisplay;
	}

}
