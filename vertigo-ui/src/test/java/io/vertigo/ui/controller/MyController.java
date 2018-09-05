package io.vertigo.ui.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.WebApplicationContext;

import io.vertigo.ui.core.AbstractVSpringMvcController;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.domain.movies.Movie;
import io.vertigo.ui.services.movies.MovieServices;

@Controller
@Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.NO)
@RequestMapping("/my")
public class MyController extends AbstractVSpringMvcController {

	@Autowired
	private MovieServices movieServices;

	@GetMapping("/")
	public void initContext(@ModelAttribute("model") final ViewContext viewContext) {
		viewContext.put("movId", 1000L);
		final Movie movie = movieServices.get(viewContext.getLong("movId"));
		viewContext.publish("movie", movie);
		viewContext.put("message", "Hello!  movie id :" + viewContext.getLong("movId"));

	}

	@PostMapping("/")
	public String testPost(@ModelAttribute("model") final ViewContext viewContext) {
		final Movie movie = viewContext.readDto("movie", getUiMessageStack());
		viewContext.put("message", "Movie retrieved in storedContext : " + movie.getTitle());
		return refresh();
	}

}
