/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Paths;
import java.util.ArrayList;

import javax.inject.Inject;

import org.elasticsearch.core.List;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.DtListState;
import io.vertigo.datastore.filestore.model.FileInfo;
import io.vertigo.datastore.filestore.model.FileInfoURI;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.model.FSFile;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextKey;
import io.vertigo.ui.data.domain.movies.Movie;
import io.vertigo.ui.data.domain.movies.MovieDisplay;
import io.vertigo.ui.data.services.movies.MovieServices;
import io.vertigo.ui.data.services.support.SupportServices;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewAttribute;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;
import io.vertigo.vega.webservice.validation.ValidationUserException;

@Controller
@RequestMapping("/modifiableTableDemo")
public class ModifiableTableDemoController extends AbstractVSpringMvcController {

	private final ViewContextKey<Movie> movieListModifiables = ViewContextKey.of("moviesModifiable");
	private final ViewContextKey<MovieDisplay> movieDisplayList = ViewContextKey.of("movies");
	private final ViewContextKey<MovieDisplay> movieDisplayListModifiable = ViewContextKey.of("moviesDisplayModifiable");

	public static final ViewContextKey<ArrayList<FileInfoURI>> fileUrisKey1 = ViewContextKey.of("myFilesUris1");
	public static final ViewContextKey<ArrayList<FileInfoURI>> fileUrisKey2 = ViewContextKey.of("myFilesUris2");
	public static final ViewContextKey<ArrayList<FileInfoURI>> fileUrisKey3 = ViewContextKey.of("myFilesUris3");

	@Inject
	private MovieServices movieServices;

	@Inject
	private SupportServices supportServices;

	@GetMapping("/")
	public void initContext(final ViewContext viewContext) throws URISyntaxException, IOException {

		viewContext.publishDtList(movieDisplayList, movieServices.getMoviesDisplay(DtListState.defaultOf(Movie.class)));

		final DtList<Movie> myList = movieServices.getMovies(DtListState.defaultOf(Movie.class));

		final DtList<Movie> mySubList = DtList.of(myList.get(0), myList.get(0));
		mySubList.get(0).setTestBoolean(true);

		viewContext.publishDtListModifiable(movieListModifiables, mySubList);

		final URI fullPath = getClass().getResource("/data/insee.csv").toURI();
		final VFile dummyFile1 = new FSFile("my1stFile.csv", "text/csv", Paths.get(fullPath));
		final VFile dummyFile2 = new FSFile("my2ndFile.csv", "text/csv", Paths.get(fullPath));
		final VFile dummyFile3 = new FSFile("my3ndFile.csv", "text/csv", Paths.get(fullPath));

		//in common case, files are just load from FileStore and uris were already in place
		final FileInfo fileInfoTmp1 = supportServices.saveFile(dummyFile1);
		final FileInfo fileInfoTmp2 = supportServices.saveFile(dummyFile2);
		final FileInfo fileInfoTmp3 = supportServices.saveFile(dummyFile3);

		final ArrayList<FileInfoURI> fileUris = new ArrayList<>();
		fileUris.add(fileInfoTmp1.getURI());
		fileUris.add(fileInfoTmp2.getURI());

		final var movieDisplay1 = new MovieDisplay();
		movieDisplay1.setMovIds(List.of(1004L, 1003L));
		final var movieDisplay2 = new MovieDisplay();
		movieDisplay2.setMovIds(List.of(1002L));
		viewContext.publishDtListModifiable(movieDisplayListModifiable, DtList.of(movieDisplay1, movieDisplay2));

		mySubList.get(0).setMainPicture(fileInfoTmp3.getURI());
		mySubList.get(1).setPictures(fileUris);
		toModeCreate();
	}

	@PostMapping("/_saveList")
	public void doSaveListAutoValidation(final ViewContext viewContext, @ViewAttribute("moviesModifiable") final DtList<Movie> movies) {
		for (final Movie movie : movies) {
			if (movie.getTitle().contains("error")) {
				getUiMessageStack().error("There is an error", movie, "title");
			}
		}
		if (getUiMessageStack().hasErrors()) {
			throw new ValidationUserException();
		}
		//we may save files on a more persistent space
		nop(movies);
	}

	@PostMapping("/_read")
	public void toRead() {
		toModeReadOnly();
	}

	@PostMapping("/_edit")
	public void toEdit() {
		toModeEdit();
	}

	@GetMapping("/myFiles")
	public VFile downloadFile() throws IOException, URISyntaxException {
		final URI fullPath = getClass().getResource("/data/insee.csv").toURI();
		return new FSFile("insee.csv", "text/csv", Paths.get(fullPath));
	}

	@GetMapping("/myFiles/{protectedUri}")
	public VFile loadFile(@PathVariable("protectedUri") final FileInfoURI fileInfoURI) {
		//final FileInfoURI fileInfoURI = ProtectedValueUtil.readProtectedValue(protectedUri, FileInfoURI.class);
		return supportServices.getFile(fileInfoURI).getVFile();
	}

	private void nop(final Object obj) {
		//just nothing
	}
}
