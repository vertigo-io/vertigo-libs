/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2021, Vertigo.io, team@vertigo.io
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

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextKey;
import io.vertigo.ui.data.domain.stats.StatData;
import io.vertigo.ui.data.domain.users.Profil;
import io.vertigo.ui.data.services.stats.StatsServices;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewAttribute;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;

@Controller
@RequestMapping("/modifiableStats")
public class ModifiableStatsController extends AbstractVSpringMvcController {

	private final ViewContextKey<Profil> profilListMdl = ViewContextKey.of("profilMdl");
	private final ViewContextKey<StatData> statsListModifiables = ViewContextKey.of("stats");
	private final ViewContextKey<StatData> statsTargetKey = ViewContextKey.of("statsTotalTarget");

	@Inject
	private StatsServices statsServices;

	@GetMapping("/")
	public void initContext(final ViewContext viewContext) {
		viewContext.publishMdl(profilListMdl, Profil.class, null);

		final DtList<StatData> myList = statsServices.getStats();
		viewContext.publishDtListModifiable(statsListModifiables, myList);
		final StatData statsTarget = statsServices.getStatTarget();
		viewContext.publishDto(statsTargetKey, statsTarget);
		toModeEdit();
	}

	@PostMapping("/_saveList")
	public void doSaveListAutoValidation(@ViewAttribute("stats") final DtList<StatData> statData) {
		statsServices.save(statData);
	}

	@PostMapping("/_read")
	public void toRead() {
		toModeReadOnly();
	}

	@PostMapping("/_edit")
	public void toEdit() {
		toModeEdit();
	}
}
