package io.vertigo.ui.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import io.vertigo.dynamo.collections.CollectionsManager;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListState;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.VCollectors;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextKey;
import io.vertigo.ui.domain.DtDefinitions.MovieDisplayFields;
import io.vertigo.ui.domain.movies.MovieDisplay;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewAttribute;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;
import io.vertigo.ui.services.movies.MovieServices;
import io.vertigo.util.StringUtil;

@Controller
@RequestMapping("/movies")
public final class MoviesController extends AbstractVSpringMvcController {

	private static final ViewContextKey<MovieDisplay> MOVIES = ViewContextKey.of("movies");

	@Autowired
	private MovieServices movieServices;
	@Autowired
	private CollectionsManager collectionsManager;

	@GetMapping("/")
	public void initContext(final ViewContext viewContext) {
		viewContext.publishDtList(MOVIES, MovieDisplayFields.MOV_ID, movieServices.getMoviesDisplay(new DtListState(200, 0, null, null)));
	}

	@PostMapping("/")
	@ResponseBody
	public DtList<MovieDisplay> doPaginate(@ViewAttribute("movies") final DtList<MovieDisplay> moviesDisplay, final DtListState dtListState) {
		return applySortAndPagination(moviesDisplay, dtListState);
	}

	@PostMapping("/toto")
	public void doSomeAction() {
		//doNothing
	}

	private <D extends DtObject> DtList<D> applySortAndPagination(final DtList<D> unFilteredList, final DtListState dtListState) {
		final DtList<D> sortedList;
		if (dtListState.getSortFieldName().isPresent()) {
			sortedList = collectionsManager.sort(unFilteredList, StringUtil.camelToConstCase(dtListState.getSortFieldName().get()), dtListState.isSortDesc().get());
		} else {
			sortedList = unFilteredList;
		}
		if (dtListState.getSkipRows() >= sortedList.size()) {
			return new DtList<>(unFilteredList.getDefinition());
		} else if (dtListState.getMaxRows().isPresent()) {
			return sortedList
					.stream()
					.skip(dtListState.getSkipRows())
					.limit(dtListState.getMaxRows().get())
					.collect(VCollectors.toDtList(sortedList.getDefinition()));
		}
		return sortedList;
	}
}
