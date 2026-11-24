/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.data.controllers;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextKey;
import io.vertigo.ui.data.domain.catalog.CatalogForm;
import io.vertigo.ui.data.domain.catalog.CatalogNode;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewAttribute;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;

/**
 * Catalog of the Quasar inputs no other demo page shows, with data built in memory (upgrade tests).
 */
@Controller
@RequestMapping("/catalogInputs")
public class CatalogInputsController extends AbstractVSpringMvcController {

	private final ViewContextKey<CatalogForm> formKey = ViewContextKey.of("form");
	private final ViewContextKey<CatalogNode> nodesKey = ViewContextKey.of("nodes");

	@GetMapping("/")
	public void initContext(final ViewContext viewContext) {
		final var form = new CatalogForm();
		form.setNodeId(2L);
		form.setNodeIds(List.of(2L, 3L));
		form.setComment("<p>Catalog of the inputs</p>");
		form.setAccepted(Boolean.FALSE);
		form.setConfirmed(Boolean.FALSE);
		form.setConsented(Boolean.TRUE);
		form.setReference("REF-42");
		viewContext.publishDto(formKey, form)
				.publishDtList(nodesKey, DtList.of(
						CatalogNode.of(1, "Europe", null),
						CatalogNode.of(2, "France", 1L),
						CatalogNode.of(3, "Italia", 1L),
						CatalogNode.of(4, "Asia", null)))
				.toModeReadOnly();
	}

	@PostMapping("/_edit")
	public void doEdit(final ViewContext viewContext) {
		viewContext.toModeEdit();
	}

	@PostMapping("/_read")
	public void doRead(final ViewContext viewContext) {
		viewContext.toModeReadOnly();
	}

	@PostMapping("/_save")
	public void doSave(final ViewContext viewContext, @ViewAttribute("form") final CatalogForm form) {
		viewContext.publishDto(formKey, form)
				.toModeReadOnly();
	}
}
