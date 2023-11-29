/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.easyforms.metaformulaire.controllers;

import java.util.Comparator;
import java.util.Optional;
import java.util.regex.Pattern;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.util.VCollectors;
import io.vertigo.easyforms.domain.DtDefinitions.ControleDeChampUiFields;
import io.vertigo.easyforms.metaformulaire.domain.ChampUi;
import io.vertigo.easyforms.metaformulaire.domain.ControleDeChampDefinitionProvider.ControleDeChampEnum;
import io.vertigo.easyforms.metaformulaire.domain.ControleDeChampUi;
import io.vertigo.easyforms.metaformulaire.domain.MetaFormulaire;
import io.vertigo.easyforms.metaformulaire.domain.TaxonomieType;
import io.vertigo.easyforms.metaformulaire.domain.TypeDeChampUi;
import io.vertigo.easyforms.metaformulaire.services.MetaFormulaireServices;
import io.vertigo.easyforms.metaformulaire.services.TaxonomyListServices;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextKey;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewAttribute;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;
import io.vertigo.vega.webservice.validation.UiMessageStack;

public class AbstractFormsController extends AbstractVSpringMvcController {

	private static final ViewContextKey<TypeDeChampUi> typeDeChampsKey = ViewContextKey.of("typeDeChamps");
	private static final ViewContextKey<ControleDeChampUi> controleDeChampsKey = ViewContextKey.of("controleDeChamps");
	private static final ViewContextKey<ChampUi> champsKey = ViewContextKey.of("champs");
	private static final ViewContextKey<ControleDeChampUi> controleDeChampsEditKey = ViewContextKey.of("controleDeChampsEdit");
	private static final ViewContextKey<ChampUi> champEditKey = ViewContextKey.of("champEdit");
	private static final ViewContextKey<TaxonomieType> taxonomyTypesKey = ViewContextKey.of("taxonomyTypes");

	@Inject
	private MetaFormulaireServices metaFormulaireServices;
	@Inject
	private TaxonomyListServices formListServices;

	public void initContext(final ViewContext viewContext, final UID<MetaFormulaire> mfoId) {
		viewContext.publishDtList(typeDeChampsKey, metaFormulaireServices.getTypesDeChampUi());
		viewContext.publishDtList(controleDeChampsKey, ControleDeChampUiFields.code, metaFormulaireServices.getControleDeChampUi());
		viewContext.publishDtList(controleDeChampsEditKey, new DtList<ControleDeChampUi>(ControleDeChampUi.class));
		//---
		viewContext.publishDtList(champsKey, metaFormulaireServices.getListChampUiByMetaFormulaireId(mfoId));
		viewContext.publishDto(champEditKey, buildChampUi());
		viewContext.publishDtList(taxonomyTypesKey, formListServices.getAllLists());
	}

	private static ChampUi buildChampUi() {
		final var champUi = new ChampUi();
		champUi.setIsDefault(false);
		champUi.setIsDisplay(false);
		return champUi;
	}

	@PostMapping("/_deleteItem")
	public ViewContext deleteItem(final ViewContext viewContext,
			@RequestParam("editIndex") final Integer editIndex,
			@ViewAttribute("champs") final DtList<ChampUi> champs) {

		champs.remove(editIndex.intValue());
		viewContext.publishDtList(champsKey, champs);
		return viewContext;
	}

	@PostMapping("/_addItem")
	public ViewContext addNewItem(final ViewContext viewContext) {
		viewContext.publishDto(champEditKey, buildChampUi());
		viewContext.publishDtList(controleDeChampsEditKey, new DtList<ControleDeChampUi>(ControleDeChampUi.class));
		return viewContext;
	}

	@PostMapping("/_editItem")
	public ViewContext editItem(final ViewContext viewContext,
			@RequestParam("editIndex") final Integer editIndex,
			@ViewAttribute("champs") final DtList<ChampUi> champs) {
		final var editedChamp = champs.get(editIndex);
		viewContext.publishDto(champEditKey, editedChamp);
		loadControlesByType(viewContext, metaFormulaireServices.getControleDeChampUi(), editedChamp);
		return viewContext;
	}

	@PostMapping("/_refreshItem")
	public ViewContext refreshItem(final ViewContext viewContext,
			@RequestParam("typeDeChamp") final String typeDeChamp,
			@ViewAttribute("champEdit") final ChampUi champEdit,
			@ViewAttribute("champs") final DtList<ChampUi> champs) {

		champEdit.setTypeDeChamp(typeDeChamp);
		loadControlesByType(viewContext, metaFormulaireServices.getControleDeChampUi(), champEdit);
		champEdit.setCodeChamp(computeDefaultCodeChamp(champs, champEdit));
		viewContext.publishDto(champEditKey, champEdit);
		return viewContext;
	}

	@PostMapping("/_moveItem")
	public ViewContext moveItem(final ViewContext viewContext,
			@RequestParam("editIndex") final int editIndex,
			@RequestParam("offset") final int offset,
			@ViewAttribute("champs") final DtList<ChampUi> champs) {
		final var toMove = champs.remove(editIndex);
		champs.add(editIndex + offset, toMove);
		viewContext.publishDtList(champsKey, champs);
		return viewContext;
	}

	@PostMapping("/_saveItem")
	public ViewContext saveItem(final ViewContext viewContext,
			@RequestParam("editIndex") final Integer editIndex,
			@ViewAttribute("champs") final DtList<ChampUi> champs,
			@ViewAttribute("champEdit") final ChampUi champEdit,
			final UiMessageStack uiMessageStack) {

		metaFormulaireServices.checkUpdateChamp(champs, editIndex, champEdit, uiMessageStack);

		if (editIndex == -1) {
			champs.add(champEdit);
		} else {
			champs.set(editIndex, champEdit);
		}

		viewContext.publishDtList(champsKey, champs);
		viewContext.publishDto(champEditKey, buildChampUi());
		return viewContext;
	}

	public void save(final UID<MetaFormulaire> mfoId, @ViewAttribute("champs") final DtList<ChampUi> champs) {
		metaFormulaireServices.sauverNouveauFormulaire(mfoId, champs);
		toModeReadOnly();
	}

	protected static void loadControlesByType(final ViewContext viewContext,
			final DtList<ControleDeChampUi> controleDeChamps,
			final ChampUi champEdit) {
		final var isMandatory = champEdit.getIsDefault() || champEdit.getIsDisplay();
		final DtList<ControleDeChampUi> controleDeChampsByType = controleDeChamps.stream()
				.filter(c -> c.getTypeDeChamps().contains(MetaFormulaireServices.PREFIX_CODE_TYPE_CHAMP + champEdit.getTypeDeChamp())
						&& !(ControleDeChampEnum.Optionel.name().equals(c.getCode()) && isMandatory))
				.collect(VCollectors.toDtList(ControleDeChampUi.class));

		viewContext.publishDtList(controleDeChampsEditKey, controleDeChampsByType);
	}

	protected static String computeDefaultCodeChamp(final DtList<ChampUi> champs, final ChampUi editedChamp) {
		final var prefixCodeChamp = StringUtil.first2LowerCase(editedChamp.getTypeDeChamp());
		final var pattern = Pattern.compile("^" + prefixCodeChamp + "[0-9]*$");
		final Optional<Integer> lastMatchingOpt = champs.stream()
				.filter(champ -> pattern.matcher(champ.getCodeChamp()).matches())
				.map(champ -> {
					if (prefixCodeChamp.length() == champ.getCodeChamp().length()) {
						return 1;
					}
					return Integer.valueOf(champ.getCodeChamp().substring(prefixCodeChamp.length()));
				})
				.sorted(Comparator.reverseOrder())
				.findFirst();
		if (lastMatchingOpt.isPresent()) {
			return prefixCodeChamp + (lastMatchingOpt.get() + 1);
		} else {
			return prefixCodeChamp;
		}
	}

}
