/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2021, Vertigo.io, team@vertigo.io
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
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

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
import io.vertigo.ui.data.services.movies.MovieServices;
import io.vertigo.ui.data.services.support.SupportServices;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewAttribute;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;
import io.vertigo.vega.webservice.model.UiObject;
import io.vertigo.vega.webservice.validation.DefaultDtObjectValidator;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.ValidationUserException;

@Controller
@RequestMapping("/fileUploadDemo")
public class FileUploadDemoController extends AbstractVSpringMvcController {

	private final ViewContextKey<Movie> movieKey = ViewContextKey.of("movie");

	public static final ViewContextKey<FileInfoURI> fileUriKeyMono = ViewContextKey.of("myFilesUriMono");
	public static final ViewContextKey<FileInfoURI> fileUrisKey1 = ViewContextKey.of("myFilesUris1");
	public static final ViewContextKey<FileInfoURI> fileUrisKey2 = ViewContextKey.of("myFilesUris2");
	public static final ViewContextKey<FileInfoURI> fileUrisKey3 = ViewContextKey.of("myFilesUris3");

	@Inject
	private MovieServices movieServices;

	@Inject
	private SupportServices supportServices;

	@GetMapping("/")
	public void initContext(final ViewContext viewContext) throws URISyntaxException, IOException {
		final Movie myMovie = new Movie();
		viewContext.publishDto(movieKey, myMovie);
		final DtList<Movie> myList = movieServices.getMovies(DtListState.defaultOf(Movie.class));
		final DtList<Movie> mySubList = DtList.of(myList.get(0), myList.get(1));
		mySubList.get(0).setTestBoolean(true);

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
		viewContext.publishFileInfoURI(fileUriKeyMono, null);
		viewContext.publishFileInfoURIs(fileUrisKey1, fileUris);
		viewContext.publishFileInfoURIs(fileUrisKey2, fileUris);
		viewContext.publishFileInfoURIs(fileUrisKey3, fileUris);

		final ArrayList<FileInfoURI> fileUris2 = new ArrayList<>();
		fileUris2.add(fileInfoTmp1.getURI());
		fileUris2.add(fileInfoTmp2.getURI());
		fileUris2.add(fileInfoTmp3.getURI());
		myMovie.setPictures(fileUris2); //TODO
		mySubList.get(0).setMainPicture(fileInfoTmp1.getURI());
		toModeCreate();
	}

	@PostMapping("/movies/{movieId}")
	public void doSaveMovieManualValidation(final ViewContext viewContext,
			@ViewAttribute("movie") final UiObject<Movie> movieUiObject,
			@PathVariable("movieId") final Long movieId,
			final UiMessageStack uiMessageStack) {
		movieUiObject.mergeAndCheckInput(Collections.singletonList(new DefaultDtObjectValidator<Movie>()), uiMessageStack);
		if (uiMessageStack.hasErrors()) {
			throw new ValidationUserException();
		}
	}

	@PostMapping("/_save")
	public void doSaveAutoValidation(final ViewContext viewContext, @ViewAttribute("movie") final Movie movie, @ViewAttribute("myFilesUris1") final List<FileInfoURI> pictures) {
		viewContext.publishDto(movieKey, movie);
		//we may save files on a more persistent space
		nop(pictures);
	}

	@PostMapping("/_saveFilesOnly")
	public void doSaveAutoValidation(
			@ViewAttribute("myFilesUriMono") final Optional<FileInfoURI> pictureOpt,
			@ViewAttribute("myFilesUriMono") final FileInfoURI picture,
			@ViewAttribute("myFilesUris1") final List<FileInfoURI> pictures1,
			@ViewAttribute("myFilesUris2") final List<FileInfoURI> pictures2,
			@ViewAttribute("myFilesUris3") final List<FileInfoURI> pictures3) {
		//Assertion.check().isTrue(pictures.size() > 0, "No files send");
		//Assertion.check().isNotNull(pictures.get(0), "FileUri can't be read");
		if (picture == null) {
			getUiMessageStack().warning("FileUploaderMono No files send");
		}
		if (pictureOpt.isEmpty()) {
			getUiMessageStack().warning("FileUploaderMono No files send");
		}
		if (pictures1.size() == 0) {
			getUiMessageStack().warning("FileUploader1 No files send");
		}
		if (pictures2.size() == 0) {
			getUiMessageStack().warning("FileUploader2 No files send");
		}
		if (pictures3.size() == 0) {
			getUiMessageStack().warning("FileUploader3 No files send");
		}
		//we may save files on a more persistent space
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
