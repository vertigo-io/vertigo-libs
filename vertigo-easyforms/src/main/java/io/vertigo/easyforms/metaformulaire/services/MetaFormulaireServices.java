package io.vertigo.easyforms.metaformulaire.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import javax.inject.Inject;

import io.vertigo.commons.transaction.Transactional;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.Component;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.util.VCollectors;
import io.vertigo.easyforms.domain.DtDefinitions.ChampUiFields;
import io.vertigo.easyforms.metaformulaire.dao.MetaFormulaireDAO;
import io.vertigo.easyforms.metaformulaire.domain.ChampUi;
import io.vertigo.easyforms.metaformulaire.domain.ControleDeChamp;
import io.vertigo.easyforms.metaformulaire.domain.ControleDeChampDefinitionProvider.ControleDeChampEnum;
import io.vertigo.easyforms.metaformulaire.domain.ControleDeChampUi;
import io.vertigo.easyforms.metaformulaire.domain.MetaFormulaire;
import io.vertigo.easyforms.metaformulaire.domain.ModeleFormulaireBuilder;
import io.vertigo.easyforms.metaformulaire.domain.TypeDeChamp;
import io.vertigo.easyforms.metaformulaire.domain.TypeDeChampUi;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.ValidationUserException;

@Transactional
public class MetaFormulaireServices implements Component {
	public static final String PREFIX_CODE_TYPE_CHAMP = "EfTch";
	public static final String RESOURCES_PREFIX = "EASYFORMS_FORMULAIRE_CONTROLE_";
	public static final String RESOURCES_SUFFIX_LABEL = "_LABEL";
	public static final String RESOURCES_SUFFIX_DESCRIPTION = "_DESCRIPTION";
	public static final String RESOURCES_SUFFIX_ERROR = "_ERROR";

	@Inject
	private MetaFormulaireDAO metaFormulaireDAO;

	public MetaFormulaire getMetaFormulaireById(final UID<MetaFormulaire> mfoUid) {
		Assertion.check().isNotNull(mfoUid);
		//---
		return metaFormulaireDAO.get(mfoUid);
	}

	public DtList<TypeDeChampUi> getTypesDeChampUi() {
		return Node.getNode().getDefinitionSpace().getAll(TypeDeChamp.class)
				.stream()
				.map(typeDeChamp -> {
					final var typeDeChampUi = new TypeDeChampUi();
					typeDeChampUi.setNom(typeDeChamp.id().shortName());
					typeDeChampUi.setLabel(typeDeChamp.getLabel());
					return typeDeChampUi;
				})
				.collect(VCollectors.toDtList(TypeDeChampUi.class));
	}

	public DtList<ControleDeChampUi> getControleDeChampUi() {
		return Node.getNode().getDefinitionSpace().getAll(ControleDeChamp.class)
				.stream()
				.sorted(Comparator.comparingInt(ControleDeChamp::getPriorite))
				.map(controleDeChamp -> {
					final var controleDeChampUi = new ControleDeChampUi();
					final var localName = controleDeChamp.id().shortName();
					final var resourcePrefix = RESOURCES_PREFIX + StringUtil.camelToConstCase(localName);

					controleDeChampUi.setCode(controleDeChamp.id().shortName());
					controleDeChampUi.setLabel(LocaleMessageText.of(() -> resourcePrefix + RESOURCES_SUFFIX_LABEL).getDisplay());
					controleDeChampUi.setDescription(LocaleMessageText.of(() -> resourcePrefix + RESOURCES_SUFFIX_DESCRIPTION).getDisplay());
					controleDeChampUi.setTypeDeChamps(new ArrayList<>(controleDeChamp.getTypeDeChamps()));
					return controleDeChampUi;
				})
				.collect(VCollectors.toDtList(ControleDeChampUi.class));
	}

	public DtList<ChampUi> getListChampUiByMetaFormulaireId(final UID<MetaFormulaire> mfoUid) {
		final var metaFormulaire = getMetaFormulaireById(mfoUid);
		return metaFormulaire.getModele().getChamps().stream()
				.map(champ -> {
					var tchamp = TypeDeChamp.of(champ.getTypeChamp());
					final var champUi = new ChampUi();
					champUi.setCodeChamp(champ.getCodeChamp());
					champUi.setTypeDeChamp(tchamp.id().shortName());
					champUi.setTypeDeChampLabel(tchamp.getLabel());
					champUi.setListId(champ.getListId());
					champUi.setListValue(champ.getListValue());
					champUi.setLibelle(champ.getLibelle());
					champUi.setInfobulle(champ.getInfobulle());
					champUi.setIsDefault(champ.isDefault());
					champUi.setIsDisplay(champ.isDisplay());
					champUi.setControleDeChamps(champ.getControleDeChamps() != null ? champ.getControleDeChamps() : Collections.emptyList()); //TODO normalement pas util
					return champUi;
				})
				.collect(VCollectors.toDtList(ChampUi.class));
	}

	public void checkUpdateChamp(final DtList<ChampUi> champs, final Integer editIndex, final ChampUi champEdit, final UiMessageStack uiMessageStack) {
		for (int i = 0; i < champs.size(); i++) {
			if (i != editIndex && champs.get(i).getCodeChamp().equals(champEdit.getCodeChamp())) {
				//si le code n'est pas unique ce n'est pas bon.
				throw new ValidationUserException(LocaleMessageText.of("Le code du champ doit être unique dans le formulaire."),
						champEdit, ChampUiFields.codeChamp);
			}
		}

		if (champEdit.getIsDisplay() && champEdit.getControleDeChamps().contains(ControleDeChampEnum.Optionel.name())) {
			//si il est marqué display, il ne peut pas être optionnel
			throw new ValidationUserException(LocaleMessageText.of("Le champ ne peut pas être à la fois optionnel et inclus dans la recherche des réservations "),
					champEdit, ChampUiFields.isDisplay);
		}

		if (!champEdit.getIsDefault() && champEdit.getIsDisplay()) {
			//on retire tous les autres qui auraient isDisplay (sauf les defaults)
			for (var champIndex = 0; champIndex < champs.size(); ++champIndex) {
				final var champUi = champs.get(champIndex);
				if (champIndex != editIndex && champUi.getIsDisplay() && !champUi.getIsDefault()) {
					champUi.setIsDisplay(false);
					uiMessageStack.warning("Il ne peut y avoir qu'un seul champ complémentaire affiché dans les réservations.\nLe champ \"" + champUi.getCodeChamp() + "\" n'est plus inclus");
				}
			}
		}
	}

	public void sauverNouveauFormulaire(final UID<MetaFormulaire> mfoUid, final DtList<ChampUi> champs) {

		final var modeleFormulaireBuilder = new ModeleFormulaireBuilder();
		for (final ChampUi champUi : champs) {
			final TypeDeChamp typeChamp = TypeDeChamp.of(PREFIX_CODE_TYPE_CHAMP + champUi.getTypeDeChamp());
			Assertion.check().isNotNull(typeChamp, "Field type can't be null");
			modeleFormulaireBuilder.ajouterChamp(
					champUi.getCodeChamp(),
					typeChamp,
					champUi.getListId(),
					champUi.getLibelle(),
					champUi.getInfobulle(),
					champUi.getIsDefault(),
					champUi.getIsDisplay(),
					champUi.getControleDeChamps());
		}
		final var metaFormulaire = getMetaFormulaireById(mfoUid);
		metaFormulaire.setModele(modeleFormulaireBuilder.build());
		metaFormulaireDAO.save(metaFormulaire);
	}

	public MetaFormulaire creerMetaFormulaire(final MetaFormulaire metaFormulaire) {
		Assertion.check().isNotNull(metaFormulaire);
		//---
		return metaFormulaireDAO.create(metaFormulaire);
	}

}
