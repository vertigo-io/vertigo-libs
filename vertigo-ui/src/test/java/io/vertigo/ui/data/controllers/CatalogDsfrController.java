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

import java.util.ArrayList;
import java.util.Optional;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.collections.model.SelectedFacetValues;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextKey;
import io.vertigo.ui.data.domain.DtDefinitions.MovieIndexFields;
import io.vertigo.ui.data.domain.movies.Movie;
import io.vertigo.ui.data.domain.movies.MovieIndex;
import io.vertigo.ui.data.services.movies.MovieServices;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewAttribute;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;

/**
 * Catalog of the DSFR components componentsDemoDsfr doesn't show (upgrade tests).
 */
@Controller
@RequestMapping("/catalogDsfr")
public class CatalogDsfrController extends AbstractVSpringMvcController {

	private static final ViewContextKey<Movie> MOVIE = ViewContextKey.of("movie");
	private static final ViewContextKey<String> CRITERIA = ViewContextKey.of("criteria");
	private static final ViewContextKey<FacetedQueryResult<MovieIndex, SearchQuery>> RESULT = ViewContextKey.of("result");

	@Inject
	private MovieServices movieServices;

	@GetMapping("/")
	public void initContext(final ViewContext viewContext) {
		final var movie = new Movie();
		movie.setTitle("Catalog movie");
		movie.setPictures(new ArrayList<>());
		final var result = movieServices.searchMovies("", SelectedFacetValues.empty().build(), DtListState.defaultOf(Movie.class), Optional.empty());
		viewContext.publishDto(MOVIE, movie)
				.publishRef(CRITERIA, "")
				.publishFacetedQueryResult(RESULT, MovieIndexFields.movId, result, CRITERIA)
				.toModeEdit();
	}

	@PostMapping("/_search")
	public ViewContext doSearch(
			final ViewContext viewContext,
			@ViewAttribute("criteria") final String criteria,
			@ViewAttribute("result") final SelectedFacetValues selectedFacetValues,
			final DtListState dtListState) {
		final var result = movieServices.searchMovies(criteria, selectedFacetValues, dtListState, Optional.empty());
		viewContext.publishFacetedQueryResult(RESULT, MovieIndexFields.movId, result, CRITERIA);
		return viewContext;
	}
}
