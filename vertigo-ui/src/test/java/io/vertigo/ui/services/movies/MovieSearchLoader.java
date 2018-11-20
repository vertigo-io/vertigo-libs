package io.vertigo.ui.services.movies;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.UID;
import io.vertigo.dynamo.search.SearchManager;
import io.vertigo.dynamo.search.metamodel.SearchChunk;
import io.vertigo.dynamo.search.metamodel.SearchIndexDefinition;
import io.vertigo.dynamo.search.model.SearchIndex;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.dynamox.search.AbstractSqlSearchLoader;
import io.vertigo.ui.domain.movies.Movie;
import io.vertigo.ui.domain.movies.MovieIndex;

public final class MovieSearchLoader extends AbstractSqlSearchLoader<Long, Movie, MovieIndex> {

	private final MovieServices movieServices;
	private final SearchManager searchManager;

	@Inject
	public MovieSearchLoader(final TaskManager taskManager, final SearchManager searchManager, final VTransactionManager transactionManager, final MovieServices movieServices) {
		super(taskManager, transactionManager);
		this.searchManager = searchManager;
		this.movieServices = movieServices;
	}

	@Override
	public List<SearchIndex<Movie, MovieIndex>> loadData(final SearchChunk<Movie> searchChunk) {
		final SearchIndexDefinition indexDefinition = searchManager.findFirstIndexDefinitionByKeyConcept(Movie.class);
		final List<Long> movieIds = new ArrayList<>();
		for (final UID<Movie> uri : searchChunk.getAllURIs()) {
			movieIds.add((Long) uri.getId());
		}
		final DtList<MovieIndex> movieIndexes = movieServices.getMovieIndex(movieIds);
		final List<SearchIndex<Movie, MovieIndex>> movieSearchIndexes = new ArrayList<>(searchChunk.getAllURIs().size());
		for (final MovieIndex movieIndex : movieIndexes) {
			movieSearchIndexes.add(SearchIndex.createIndex(indexDefinition,
					UID.of(indexDefinition.getKeyConceptDtDefinition(), movieIndex.getMovId()), movieIndex));
		}
		return movieSearchIndexes;
	}

}
