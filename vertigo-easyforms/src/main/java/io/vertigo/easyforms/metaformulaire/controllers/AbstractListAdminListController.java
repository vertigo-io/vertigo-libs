package io.vertigo.easyforms.metaformulaire.controllers;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;

import io.vertigo.easyforms.metaformulaire.domain.TaxonomyType;
import io.vertigo.easyforms.metaformulaire.services.TaxonomyListServices;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextKey;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;

public class AbstractListAdminListController extends AbstractVSpringMvcController {

	private static final ViewContextKey<TaxonomyType> taxonomyTypesKey = ViewContextKey.of("taxonomyTypes");

	@Inject
	private TaxonomyListServices taxonomyListServices;

	@GetMapping("/")
	public void initContext(final ViewContext viewContext) {
		viewContext.publishDtList(taxonomyTypesKey, taxonomyListServices.getAllLists());
	}

}
