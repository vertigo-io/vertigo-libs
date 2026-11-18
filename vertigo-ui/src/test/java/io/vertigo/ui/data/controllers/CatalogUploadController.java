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

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import io.vertigo.datastore.filestore.model.FileInfoURI;
import io.vertigo.datastore.impl.filestore.model.FSFile;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextKey;
import io.vertigo.ui.data.domain.movies.Movie;
import io.vertigo.ui.data.services.support.SupportServices;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;

/**
 * Catalog of the v-fileupload components no other demo page shows, with files saved at load (upgrade tests).
 */
@Controller
@RequestMapping("/catalogUpload")
public class CatalogUploadController extends AbstractVSpringMvcController {

	private final ViewContextKey<Movie> movieKey = ViewContextKey.of("movie");
	private final ViewContextKey<Movie> movie2Key = ViewContextKey.of("movie2");
	private final ViewContextKey<FileInfoURI> filesKey = ViewContextKey.of("myFiles");

	@Inject
	private SupportServices supportServices;

	@GetMapping("/")
	public void initContext(final ViewContext viewContext) throws URISyntaxException, IOException {
		final var insee = Paths.get(getClass().getResource("/data/insee.csv").toURI());
		final FileInfoURI file1 = supportServices.saveFile(new FSFile("my1stFile.csv", "text/csv", insee)).getURI();
		final FileInfoURI file2 = supportServices.saveFile(new FSFile("my2ndFile.csv", "text/csv", insee)).getURI();
		final FileInfoURI file3 = supportServices.saveFile(new FSFile("my3rdFile.csv", "text/csv", insee)).getURI();

		final var movie = new Movie();
		movie.setPictures(new ArrayList<>(List.of(file1)));
		movie.setMainPicture(file3);
		final var movie2 = new Movie();
		movie2.setPictures(new ArrayList<>());
		viewContext.publishDto(movieKey, movie)
				.publishDto(movie2Key, movie2)
				.publishFileInfoURIs(filesKey, new ArrayList<>(List.of(file2)))
				.toModeEdit();
	}

	@PostMapping("/_edit")
	public void doEdit(final ViewContext viewContext) {
		viewContext.toModeEdit();
	}

	@PostMapping("/_read")
	public void doRead(final ViewContext viewContext) {
		viewContext.toModeReadOnly();
	}
}
