package io.vertigo.ui.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import io.vertigo.ui.domain.movies.Movie;
import io.vertigo.ui.services.movies.MovieServices;

@Controller
public class MyController {

	@Autowired
	private MovieServices movieServices;

	@GetMapping("/")
	public String index(final Model model) {
		final Movie movie = movieServices.get(1000L);
		model.addAttribute("message", "Hello Spring MVC 5!" + movie.getTitle());
		return "index";
	}
}
