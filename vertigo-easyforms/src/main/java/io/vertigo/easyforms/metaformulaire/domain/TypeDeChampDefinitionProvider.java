package io.vertigo.easyforms.metaformulaire.domain;

import java.util.List;

import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;

public class TypeDeChampDefinitionProvider implements SimpleDefinitionProvider {
	public static final String TYPE_VISA = "EfTchVisa";
	public static final String TYPE_TELEPHONE = "EfTchTelephone";
	public static final String TYPE_DATE_NAISSANCE = "EfTchDateNaissance";
	public static final String TYPE_NATIONALITE = "EfTchNationalite";
	public static final String TYPE_CODE_POSTAL = "EfTchCodePostal";
	public static final String TYPE_TAXONOMY = "EfTchTaxonomy";

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		return List.of(
				TypeDeChamp.of("EfTchNom", "STyEfNom", "textfield", "family-name"),
				TypeDeChamp.of("EfTchPrenom", "STyEfPrenom", "textfield", "given-name"),
				TypeDeChamp.of("EfTchEmail", "STyEfEmail", "textfield", "email"),
				TypeDeChamp.of("EfTchDate", "STyEfDate", "date", null),
				TypeDeChamp.of(TYPE_DATE_NAISSANCE, "STyEfDatePassee", "date", "bday"),
				TypeDeChamp.of(TYPE_TELEPHONE, "STyEfTelephone", "textfield", "tel"),
				TypeDeChamp.of(TYPE_VISA, "STyEfVisa", "textfield", null),
				TypeDeChamp.of(TYPE_NATIONALITE, "STyEfNationalite", "textfield", null),
				TypeDeChamp.of(TYPE_CODE_POSTAL, "STyEfCodePostal", "textfield", "postal-code"),
				TypeDeChamp.of(TYPE_TAXONOMY, "STyEfMotif", "select", null, TaxonomieType.class));
	}

}
