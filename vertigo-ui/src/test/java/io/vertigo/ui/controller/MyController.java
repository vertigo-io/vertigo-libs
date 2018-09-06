package io.vertigo.ui.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import io.vertigo.ui.core.AbstractVSpringMvcController;
import io.vertigo.ui.core.ViewAttribute;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.domain.movies.Movie;
import io.vertigo.ui.services.movies.MovieServices;
import io.vertigo.vega.webservice.model.UiObject;

@Controller
@RequestMapping("/my")
public class MyController extends AbstractVSpringMvcController {

	@Autowired
	private MovieServices movieServices;

	@ModelAttribute
	public void test(final Model model) {
		model.addAttribute("postInit", "it works");
		// we are after vertigo initialization
	}

	@GetMapping("/")
	public void initContext(@ModelAttribute("model") final ViewContext viewContext) {
		viewContext.put("movId", 1000L);
		final Movie movie = movieServices.get(viewContext.getLong("movId"));
		viewContext.publish("movie", movie);
		viewContext.put("message", "Hello!  movie id :" + viewContext.getLong("movId"));

	}

	@PostMapping("/")
	public void testPost(final ViewContext viewContext, @ViewAttribute("movie") final UiObject<Movie> movieUiObject, @ViewAttribute("movie") final Movie movieDtObject) {
		final Movie movie = viewContext.readDto("movie", getUiMessageStack());
		viewContext.put("message", "Movie retrieved in storedContext : " + movie.getTitle());
	}

}
