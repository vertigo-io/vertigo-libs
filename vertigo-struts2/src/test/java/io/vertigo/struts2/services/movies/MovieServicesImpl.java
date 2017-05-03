/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.struts2.services.movies;

import javax.inject.Inject;

import io.vertigo.dynamo.criteria.Criterions;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListState;
import io.vertigo.dynamo.domain.util.VCollectors;
import io.vertigo.dynamo.transaction.Transactional;
import io.vertigo.struts2.dao.movies.MovieDAO;
import io.vertigo.struts2.domain.movies.Movie;
import io.vertigo.struts2.domain.movies.MovieDisplay;

@Transactional
public class MovieServicesImpl implements MovieServices {

	@Inject
	private MovieDAO movieDAO;

	@Override
	public Movie get(final Long movId) {
		return movieDAO.get(movId);
	}

	@Override
	public void save(final Movie movie) {
		movieDAO.save(movie);
	}

	@Override
	@Transactional
	public DtList<Movie> getMovies(final DtListState dtListState) {
		return movieDAO.findAll(Criterions.alwaysTrue(), dtListState.getMaxRows().orElse(50));
	}

	@Override
	@Transactional
	public DtList<MovieDisplay> getMoviesDisplay(final DtListState dtListState) {
		return movieDAO.findAll(Criterions.alwaysTrue(), dtListState.getMaxRows().orElse(50))
				.stream()
				.map(movie -> new MovieDisplay(movie.getMovId(), movie.getTitle()))
				.collect(VCollectors.toDtList(MovieDisplay.class));
	}

}
