/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import io.vertigo.account.authorization.annotations.Secured;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextKey;
import io.vertigo.ui.data.domain.movies.Movie;
import io.vertigo.ui.data.services.movies.MovieServices;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewAttribute;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;
import io.vertigo.vega.webservice.validation.UiMessageStack;

@Controller
@RequestMapping("/securedMovie")
@Secured("NoRights")
public class SecuredController extends AbstractVSpringMvcController {

	private static final ViewContextKey<Long> movIdKey = ViewContextKey.of("movId");
	private static final ViewContextKey<Movie> movieKey = ViewContextKey.of("movie");

	@Autowired
	private MovieServices movieServices;

	@GetMapping("/")
	public void initContext(final ViewContext viewContext) {
		viewContext.publishRef(movIdKey, 1000L);
		final Movie movie = movieServices.get(viewContext.getLong(movIdKey));
		viewContext
				.publishDto(movieKey, movie)
				.toModeEdit();
	}

	@PostMapping("/")
	public void doSave(@ViewAttribute("movie") final Movie movieDtObject, final UiMessageStack uiMessageStack) {
		System.out.println("Save done : " + movieDtObject.getMovId());
		uiMessageStack.info("Save done : " + movieDtObject.getMovId());
	}

}
