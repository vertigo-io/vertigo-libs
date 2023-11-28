package io.vertigo.easyforms.metaformulaire.domain;

import java.util.ArrayList;
import java.util.List;

import io.vertigo.core.lang.Builder;
import io.vertigo.easyforms.metaformulaire.domain.ModeleFormulaire.Champ;

public class ModeleFormulaireBuilder implements Builder<ModeleFormulaire> {

	private final List<Champ> champs = new ArrayList<>();

	public ModeleFormulaireBuilder ajouterChamp(
			final String codeChamp,
			final TypeDeChamp typeDeChamp,
			final Long listId,
			final String libelle,
			final String infobulle,
			final boolean isDefault,
			final boolean isDisplay,
			final List<String> controleDeChamps) {
		final var champ = new Champ();
		champ.setCodeChamp(codeChamp);
		champ.setTypeChamp(typeDeChamp.getName());
		if (typeDeChamp.isList() && listId != null) {
			champ.setListId(listId);
		}
		champ.setLibelle(libelle);
		champ.setInfobulle(infobulle);
		champ.setOrdre(champs.size() + 1);
		champ.setDefault(isDefault);
		champ.setDisplay(isDisplay);
		champ.setControleDeChamps(controleDeChamps);
		//-- ajouter à la list
		champs.add(champ);
		return this;
	}

	@Override
	public ModeleFormulaire build() {
		return new ModeleFormulaire(champs);
	}

}
