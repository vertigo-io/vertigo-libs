package io.vertigo.ui.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.WebApplicationContext;

import io.vertigo.ui.core.AbstractVSpringMvcController;
import io.vertigo.ui.core.ContextForm;
import io.vertigo.ui.core.ContextRef;
import io.vertigo.ui.domain.movies.Movie;
import io.vertigo.ui.services.movies.MovieServices;

@Controller
@Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.NO)
@RequestMapping("/my")
public class MyController extends AbstractVSpringMvcController {

	@Autowired
	private MovieServices movieServices;

	private final ContextRef<Long> movIdRef = new ContextRef<>("movId", Long.class, this);
	private final ContextRef<String> messageRef = new ContextRef<>("message", String.class, this);
	private final ContextForm<Movie> movieForm = new ContextForm<>("movie", this);

	@Override
	protected void initContext() {
		movIdRef.set(1000L);
		final Movie movie = movieServices.get(getModel().getLong("movId"));
		movieForm.publish(movie);
		messageRef.set("Hello!  movie id :" + movIdRef.get());

	}

	@PostMapping("/")
	public String testPost(final Model model) {
		final Movie movie = movieForm.readDto();
		messageRef.set("Movie retrieved in storedContext : " + movie.getTitle());
		return refresh();
	}

	@Override
	public String getPageName() {
		return "index";
	}

}
