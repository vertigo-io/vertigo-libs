package io.vertigo.easyforms.metaformulaire.domain;

import java.util.List;

import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;

public class ControleDeChampDefinitionProvider implements SimpleDefinitionProvider {

	private static final String DEFINITION_PREFIX = "RdvCoc";

	public enum ControleDeChampEnum {
		Optionel, Unique, EmailNotInBlackList, EmailGouvFr, AgdrefPresent, FinValiditeAgdref6mois, GTE13ans, LT16ans, GTE16ans, LT18ans, LTE18ans, GTE18ans, TelephoneFr, TelephoneMobileSms, CodeDepartement
	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		return List.of(
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.Optionel.name(), "Optionnel", 1, "RdvTchNom", "RdvTchPrenom", "RdvTchEmail", "RdvTchTelephone", "RdvTchPermisNeph"),

				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.Unique.name(), "Unique pour cette démarche", 5, "RdvTchEmail", "RdvTchTelephone", "RdvTchVisa", "RdvTchAgdref", "RdvTchPermisNeph"),

				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.EmailGouvFr.name(), "Email en .gouv.fr", 10, "RdvTchEmail"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.EmailNotInBlackList.name(), "Email non jetable", 20, "RdvTchEmail"),

				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.AgdrefPresent.name(), "N° Agdref reconnu", 10, "RdvTchAgdref"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.FinValiditeAgdref6mois.name(), "Fin de validité Agdref dans moins de 6 mois", 20, "RdvTchAgdref"),

				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.GTE13ans.name(), ">= 13 ans révolus à la date du rendez-vous", 10, "RdvTchDateNaissance"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.LT16ans.name(), "< 16 ans révolus à la date du rendez-vous", 20, "RdvTchDateNaissance"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.GTE16ans.name(), ">= 16 ans révolus à la date du rendez-vous", 30, "RdvTchDateNaissance"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.LT18ans.name(), "< 18 ans révolus à la date du rendez-vous", 40, "RdvTchDateNaissance"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.LTE18ans.name(), "<= 18 ans révolus à la date du rendez-vous", 50, "RdvTchDateNaissance"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.GTE18ans.name(), ">= 18 ans révolus à la date du rendez-vous", 60, "RdvTchDateNaissance"),

				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.TelephoneFr.name(), "Numéro en france", 10, "RdvTchTelephone"),
				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.TelephoneMobileSms.name(), "Numéro mobile en france ou en outre-mer", 20, "RdvTchTelephone"),

				ControleDeChamp.of(DEFINITION_PREFIX + ControleDeChampEnum.CodeDepartement.name(), "Code postal correspond au département", 10, "RdvTchCodePostal"));
	}

}
