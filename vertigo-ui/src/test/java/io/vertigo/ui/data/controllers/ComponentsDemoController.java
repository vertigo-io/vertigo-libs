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
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Paths;
import java.time.Instant;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import io.vertigo.account.security.VSecurityManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VUserException;
import io.vertigo.core.locale.LocaleManager;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.DtListState;
import io.vertigo.datastore.filestore.model.FileInfo;
import io.vertigo.datastore.filestore.model.FileInfoURI;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.model.FSFile;
import io.vertigo.ui.core.UiFileInfoList;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextKey;
import io.vertigo.ui.data.domain.DtDefinitions.MovieDisplayFields;
import io.vertigo.ui.data.domain.movies.Movie;
import io.vertigo.ui.data.domain.movies.MovieDisplay;
import io.vertigo.ui.data.domain.people.Casting;
import io.vertigo.ui.data.domain.reference.Commune;
import io.vertigo.ui.data.services.movies.MovieServices;
import io.vertigo.ui.data.services.support.SupportServices;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewAttribute;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;
import io.vertigo.vega.webservice.model.UiObject;
import io.vertigo.vega.webservice.stereotype.QueryParam;
import io.vertigo.vega.webservice.validation.DefaultDtObjectValidator;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.UiMessageStack.Level;
import io.vertigo.vega.webservice.validation.ValidationUserException;

@Controller
@RequestMapping("/componentsDemo")
public class ComponentsDemoController extends AbstractVSpringMvcController {

	private final ViewContextKey<Movie> movieKey = ViewContextKey.of("movie");
	private final ViewContextKey<Casting> castingKey = ViewContextKey.of("casting");
	private final ViewContextKey<Movie> movieList = ViewContextKey.of("movies");
	private final ViewContextKey<Movie> movieListModifiables = ViewContextKey.of("moviesModifiable");
	private final ViewContextKey<Movie> moviesListMdl = ViewContextKey.of("moviesMdl");

	private final ViewContextKey<String> communeId = ViewContextKey.of("communeId");
	private final ViewContextKey<Commune> communeListMdl = ViewContextKey.of("communesMdl");
	private final ViewContextKey<MovieDisplay> movieDisplayList = ViewContextKey.of("moviesDisplay");

	private final ViewContextKey<Instant> currentInstant = ViewContextKey.of("currentInstant");
	private final ViewContextKey<String> currentZoneId = ViewContextKey.of("currentZoneId");

	private static final String[] timeZoneListStatic = { "Europe/Paris", "America/Cayenne", "Indian/Reunion" };
	private final ViewContextKey<String[]> timeZoneList = ViewContextKey.of("timeZoneList");
	private final ViewContextKey<String> selectedTimeZoneList = ViewContextKey.of("selectedTimeZoneList");
	private final ViewContextKey<String> zoneId = ViewContextKey.of("zoneId");

	public static final ViewContextKey<FileInfo> storedFileInfo = ViewContextKey.of("storedFiles");
	public static final ViewContextKey<ArrayList<FileInfoURI>> fileUrisKey = ViewContextKey.of("myFilesUris");

	@Inject
	private VSecurityManager securityManager;

	@Inject
	private LocaleManager localeManager;

	@Inject
	private MovieServices movieServices;

	@Inject
	private SupportServices supportServices;

	@GetMapping("/")
	public void initContext(final ViewContext viewContext) throws URISyntaxException, IOException {
		final Movie myMovie = new Movie();
		viewContext.publishDto(movieKey, myMovie);
		viewContext.publishDto(castingKey, new Casting());
		viewContext.publishDtList(movieList, movieServices.getMovies(DtListState.defaultOf(Movie.class)));
		viewContext.publishDtListModifiable(movieListModifiables, movieServices.getMovies(DtListState.defaultOf(Movie.class)));
		viewContext.publishMdl(moviesListMdl, Movie.class, null);
		viewContext.publishDtList(movieDisplayList, MovieDisplayFields.movId, movieServices.getMoviesDisplay(DtListState.defaultOf(Movie.class)));

		viewContext.publishMdl(communeListMdl, Commune.class, null);

		viewContext.publishRef(currentInstant, Instant.now());
		viewContext.publishRef(currentZoneId, localeManager.getCurrentZoneId().getId());
		viewContext.publishRef(zoneId, timeZoneListStatic[0]);
		viewContext.publishRef(timeZoneList, timeZoneListStatic);
		viewContext.publishRef(selectedTimeZoneList, "");

		final List<FileInfo> storeFiles = new ArrayList<>();
		final URI fullPath = getClass().getResource("/data/insee.csv").toURI();
		final VFile dummyFile1 = new FSFile("my1stFile.csv", "text/csv", Paths.get(fullPath));
		final VFile dummyFile2 = new FSFile("my2ndFile.csv", "text/csv", Paths.get(fullPath));

		//in common case, files are just load from FileStore and uris were already in place
		final FileInfo fileInfoTmp1 = supportServices.saveFile(dummyFile1);
		storeFiles.add(fileInfoTmp1);
		final FileInfo fileInfoTmp2 = supportServices.saveFile(dummyFile2);
		storeFiles.add(fileInfoTmp2);
		viewContext.publishFileInfo(storedFileInfo, storeFiles);

		final ArrayList<FileInfoURI> fileUris = new ArrayList<>();
		fileUris.add(fileInfoTmp1.getURI());
		fileUris.add(fileInfoTmp2.getURI());
		viewContext.publishJsonRef(fileUrisKey, fileUris, new CustomParameterizedType(ArrayList.class, FileInfoURI.class));
		//myMovie.setPictures(fileUris);

		toModeCreate();
	}

	private static final class CustomParameterizedType implements ParameterizedType, Serializable {
		private final Type fieldType;
		private final Type[] typeArguments;

		CustomParameterizedType(final Type fieldType, final Type paramType) {
			this.fieldType = fieldType;
			typeArguments = new Type[] { paramType };
		}

		/** {@inheritDoc} */
		@Override
		public Type[] getActualTypeArguments() {
			return typeArguments;
		}

		/** {@inheritDoc} */
		@Override
		public Type getOwnerType() {
			return fieldType instanceof ParameterizedType ? ((ParameterizedType) fieldType).getOwnerType() : null;
		}

		/** {@inheritDoc} */
		@Override
		public Type getRawType() {
			return fieldType instanceof ParameterizedType ? ((ParameterizedType) fieldType).getRawType() : fieldType;
		}
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

		viewContext.publishRef(currentInstant, Instant.now());
	}

	@PostMapping("/_save")
	public void doSaveAutoValidation(final ViewContext viewContext, @ViewAttribute("movie") final Movie movie, @QueryParam("myFilesUris") final List<FileInfoURI> pictures) {
		viewContext.publishDto(movieKey, movie);
		//we may save files on a more persistent space
		nop(pictures);
	}

	@PostMapping("/_saveFilesOnly")
	public void doSaveAutoValidation(final ViewContext viewContext, @ViewAttribute("myFilesUris") final List<FileInfoURI> pictures) {
		Assertion.check().isTrue(pictures.size() > 0, "No files send");
		Assertion.check().isNotNull(pictures.get(0), "FileUri can't be read");
		//we may save files on a more persistent space
		nop(pictures);
	}

	@PostMapping("/movies/_add")
	public void addMovieList(final ViewContext viewContext, @ViewAttribute("movieListModifiables") final DtList<Movie> movies) {
		movies.add(new Movie());
		viewContext.publishDtListModifiable(movieListModifiables, movies);
	}

	@PostMapping("/movies")
	public void saveList(final ViewContext viewContext, @ViewAttribute("movieListModifiables") final DtList<Movie> movies) {
		viewContext.publishDtListModifiable(movieListModifiables, movies);
	}

	@PostMapping("/casting")
	public void doSaveCasting(@ViewAttribute("casting") final Casting casting) {
		nop(casting);
	}

	@PostMapping("/commune")
	public void doSaveCommune(final ViewContext viewContext, @ViewAttribute("communeId") final String _communeId) {
		viewContext.publishRef(communeId, _communeId);
	}

	@PostMapping("/_saveInstant")
	public void saveInstant(final ViewContext viewContext, @ViewAttribute("movie") final Movie movie) {
		viewContext.publishRef(currentInstant, movie.getLastModified());

		final TestUserSession userSession = securityManager.<TestUserSession> getCurrentUserSession().get();
		userSession.setZoneId(ZoneId.of(zoneId.get()));
		viewContext.publishRef(currentZoneId, localeManager.getCurrentZoneId().getId());
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

	@PostMapping("/upload")
	public ViewContext uploadFile(final ViewContext viewContext, @QueryParam("file") final VFile vFile) {
		getUiMessageStack().addGlobalMessage(Level.INFO, "Fichier recu : " + vFile.getFileName() + " (" + vFile.getMimeType() + ")");
		//No need to protectPath, FileInfoURI are always protected
		//final String protectedPath = ProtectedValueUtil.generateProtectedValue(VFileUtil.obtainReadOnlyPath(vFile).toFile().getAbsolutePath());
		if (vFile.getFileName().toLowerCase().contains("virus")) {
			throw new VUserException("Il y a un virus dans votre PJ " + vFile.getFileName());
		}
		final FileInfo storeFile = supportServices.saveFile(vFile);
		final UiFileInfoList<FileInfo> storeFiles = viewContext.getUiFileInfoList(storedFileInfo);
		storeFiles.add(storeFile);
		viewContext.markModifiedKeys(storedFileInfo);
		final List<FileInfoURI> myFileURI = (List<FileInfoURI>) viewContext.get(fileUrisKey);
		myFileURI.add(storeFile.getURI());
		viewContext.markModifiedKeys(fileUrisKey);
		return viewContext;
	}

	@DeleteMapping("/upload")
	public ViewContext removeFile(final ViewContext viewContext, @QueryParam("file") final FileInfoURI fileInfoUri) {
		supportServices.removeFile(fileInfoUri);
		final UiFileInfoList<FileInfo> storeFiles = viewContext.getUiFileInfoList(storedFileInfo);
		storeFiles.remove(fileInfoUri);
		viewContext.markModifiedKeys(storedFileInfo);

		final List<FileInfoURI> myFileURI = (List<FileInfoURI>) viewContext.get(fileUrisKey);
		myFileURI.remove(fileInfoUri);
		viewContext.markModifiedKeys(fileUrisKey);
		return viewContext; //if no return, you must get the response. Prefer to return old uri.
	}

	@PostMapping("/_ajaxArray")
	public ViewContext doAjaxValidation(final ViewContext viewContext, @ViewAttribute("selectedTimeZoneList") final String selected) {
		getUiMessageStack().addGlobalMessage(Level.INFO, "selected " + selected);
		viewContext.publishRef(selectedTimeZoneList, selected);
		return viewContext;
	}

	private void nop(final Object obj) {
		//just nothing
	}
}
