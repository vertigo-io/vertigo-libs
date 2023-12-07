package io.vertigo.easyforms.metaformulaire.domain;

import java.util.List;

import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;

public class ControleDeChampDefinitionProvider implements SimpleDefinitionProvider {

	private static final String DEFINITION_PREFIX = "EfCoc";

	public enum ControleDeChampEnum {
		Optionel, Unique, EmailNotInBlackList, GTE13ans, LT16ans, GTE16ans, LT18ans, LTE18ans, GTE18ans, TelephoneFr, TelephoneMobileSms
	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		return List.of(
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.Optionel.name(), "Optionnel", 1, "EfNom", "EfPrenom", "EfEmail", "EfTelephone", "EfPermisNeph"),

				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.Unique.name(), "Unique pour cette démarche", 5, "EfEmail", "EfTelephone", "EfVisa", "EfAgdref",
						"EfPermisNeph"),

				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.EmailNotInBlackList.name(), "Email non jetable", 20, "EfEmail"),

				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.GTE13ans.name(), ">= 13 ans révolus", 10, "EfDateNaissance"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.LT16ans.name(), "< 16 ans révolus", 20, "EfDateNaissance"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.GTE16ans.name(), ">= 16 ans révolus", 30, "EfDateNaissance"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.LT18ans.name(), "< 18 ans révolus", 40, "EfDateNaissance"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.LTE18ans.name(), "<= 18 ans révolus", 50, "EfDateNaissance"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.GTE18ans.name(), ">= 18 ans révolus", 60, "EfDateNaissance"),

				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.TelephoneFr.name(), "Numéro en france", 10, "EfTelephone"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.TelephoneMobileSms.name(), "Numéro mobile en france ou en outre-mer", 20, "EfTelephone"));
	}

}
