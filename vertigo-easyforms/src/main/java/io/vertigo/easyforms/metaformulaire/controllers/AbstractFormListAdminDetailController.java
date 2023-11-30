package io.vertigo.easyforms.metaformulaire.controllers;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import io.vertigo.core.lang.VUserException;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.easyforms.domain.DtDefinitions.TaxonomyTypeFields;
import io.vertigo.easyforms.metaformulaire.domain.Taxonomy;
import io.vertigo.easyforms.metaformulaire.domain.TaxonomyType;
import io.vertigo.easyforms.metaformulaire.services.TaxonomyListServices;
import io.vertigo.ui.core.BasicUiListModifiable;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextKey;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewAttribute;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.ValidationUserException;

public class AbstractFormListAdminDetailController extends AbstractVSpringMvcController {

	private static final ViewContextKey<TaxonomyType> taxonomyTypeKey = ViewContextKey.of("taxonomyType");
	private static final ViewContextKey<Taxonomy> taxonomysKey = ViewContextKey.of("taxonomys");

	@Inject
	private TaxonomyListServices taxonomyListServices;

	@GetMapping("/{motId}")
	public void initContext(final ViewContext viewContext, @PathVariable("motId") final Long motId) {
		final var motUid = UID.of(TaxonomyType.class, motId);
		final var taxonomyType = taxonomyListServices.getTaxonomyTypeById(motUid);
		viewContext.publishDto(taxonomyTypeKey, taxonomyType);
		viewContext.publishDtListModifiable(taxonomysKey, taxonomyListServices.getTaxonomysByType(motUid));
	}

	@GetMapping("/new")
	public void initContextNew(final ViewContext viewContext) {
		viewContext.publishDto(taxonomyTypeKey, taxonomyListServices.initTaxonomyType());
		viewContext.publishDtListModifiable(taxonomysKey, DtList.of(new Taxonomy()));
		toModeCreate();
	}

	@PostMapping("/_edit")
	public void edit() {
		toModeEdit();
	}

	@PostMapping("/_save")
	public String save(final ViewContext viewContext, @ViewAttribute("taxonomyType") final TaxonomyType taxonomyType, @ViewAttribute("taxonomys") final DtList<Taxonomy> taxonomys, final UiMessageStack uiMessageStack) {
		if (StringUtil.isBlank(taxonomyType.getLabel())) {
			uiMessageStack.error("Le titre de la liste de motifs doit être renseigné", taxonomyType,
					TaxonomyTypeFields.label.name());
			throw new ValidationUserException();
		}
		//taxonomyListServices.saveTaxonomyTypeAndValues(taxonomyType, viewContext.getUiListModifiable(taxonomysKey).getDtListDelta());//CHECKME with berkeley
		taxonomyListServices.saveTaxonomies(taxonomyType, taxonomys);
		return "redirect:/referentiel/formListAdmin/" + taxonomyType.getTatId();
	}

	@PostMapping("/_active")
	public String enable(@ViewAttribute("taxonomyType") final TaxonomyType taxonomyType) {
		taxonomyListServices.enableTaxonomyType(taxonomyType, true);
		return "redirect:/referentiel/formListAdmin/";
	}

	@PostMapping("/_inactive")
	public String disable(@ViewAttribute("taxonomyType") final TaxonomyType taxonomyType) {
		taxonomyListServices.enableTaxonomyType(taxonomyType, false);
		return "redirect:/referentiel/formListAdmin/";
	}

	@PostMapping("/_addItem")
	public ViewContext addNewItem(final ViewContext viewContext, @ViewAttribute("taxonomys") final BasicUiListModifiable<Taxonomy> taxonomys) {
		if (taxonomys.size() >= TaxonomyListServices.MAX_VALUE_PER_LIST) {
			throw new VUserException("Les listes de motifs sont limitées à " + TaxonomyListServices.MAX_VALUE_PER_LIST + " valeurs");
		}
		taxonomys.add(new Taxonomy());
		viewContext.markModifiedKeys(taxonomysKey);
		//viewContext.publishDtListModifiable(taxonomysKey, taxonomys);
		return viewContext;
	}

	@PostMapping("/_deleteItem")
	public ViewContext deleteItem(final ViewContext viewContext,
			@RequestParam("editIndex") final Integer editIndex,
			@ViewAttribute("taxonomys") final BasicUiListModifiable<Taxonomy> taxonomys) {
		taxonomys.remove(editIndex.intValue());
		viewContext.markModifiedKeys(taxonomysKey);
		//viewContext.publishDtListModifiable(taxonomysKey, taxonomys);
		return viewContext;
	}

	@PostMapping("/_moveItem")
	public ViewContext moveItem(final ViewContext viewContext,
			@RequestParam("editIndex") final int editIndex,
			@RequestParam("offset") final int offset,
			@ViewAttribute("taxonomys") final BasicUiListModifiable<Taxonomy> taxonomys) {
		final var toMove = taxonomys.remove(editIndex);
		taxonomys.add(editIndex + offset, toMove);
		viewContext.markModifiedKeys(taxonomysKey);
		//viewContext.publishDtListModifiable(taxonomysKey, taxonomys);
		return viewContext;
	}

}
