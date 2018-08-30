/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.ui.controller;

import java.io.File;
import java.time.ZoneId;
import java.util.Date;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import io.vertigo.core.locale.LocaleManager;
import io.vertigo.dynamo.domain.model.DtListState;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.dynamo.impl.file.model.FSFile;
import io.vertigo.lang.VUserException;
import io.vertigo.persona.security.VSecurityManager;
import io.vertigo.struts2.core.AbstractActionSupport.AcceptCtxQueryParam;
import io.vertigo.struts2.core.ContextForm;
import io.vertigo.struts2.core.GET;
import io.vertigo.ui.core.ContextList;
import io.vertigo.ui.core.ContextListModifiable;
import io.vertigo.ui.core.ContextMdl;
import io.vertigo.ui.core.ContextRef;
import io.vertigo.ui.core.ContextVFile;
import io.vertigo.ui.core.ContextVFiles;
import io.vertigo.ui.domain.DtDefinitions.MovieDisplayFields;
import io.vertigo.ui.domain.movies.Movie;
import io.vertigo.ui.domain.movies.MovieDisplay;
import io.vertigo.ui.domain.people.Casting;
import io.vertigo.ui.domain.reference.Commune;
import io.vertigo.ui.services.movies.MovieServices;
import io.vertigo.vega.webservice.validation.UiMessageStack.Level;

@AcceptCtxQueryParam
@Controller
public class AccueilController {

	private static final long serialVersionUID = 1L;

	private final ContextForm<Movie> movie = new ContextForm<>("movie", this);
	private final ContextForm<Casting> casting = new ContextForm<>("casting", this);
	private final ContextList<Movie> movieList = new ContextList<>("movies", this);
	private final ContextListModifiable<Movie> movieListModifiables = new ContextListModifiable<>("moviesModifiable", this);
	private final ContextMdl<Movie> moviesListMdl = new ContextMdl<>("moviesMdl", this);
	private final ContextRef<String> communeId = new ContextRef<>("communeId", String.class, this);
	private final ContextMdl<Commune> communeListMdl = new ContextMdl<>("communesMdl", this);

	private final ContextList<MovieDisplay> movieDisplayList = new ContextList<>("moviesDisplay", MovieDisplayFields.MOV_ID, this);

	private final ContextRef<String> currentDate = new ContextRef<>("currentDate", String.class, this);

	private final ContextVFile fileTestFileRef = new ContextVFile("fileTest", this);
	private final ContextVFiles filesTestFileRef = new ContextVFiles("filesTest", this);

	private final ContextRef<String> currentZoneId = new ContextRef<>("currentZoneId", String.class, this);
	private static final String[] timeZoneListStatic = { "Europe/Paris", "America/Cayenne", "Indian/Reunion" };
	private final ContextRef<String[]> timeZoneList = new ContextRef<>("timeZoneList", String[].class, this);
	private final ContextRef<String> zoneId = new ContextRef<>("zoneId", String.class, this);

	@Inject
	private MovieServices movieServices;

	@Inject
	private VSecurityManager securityManager;

	@Inject
	private LocaleManager localeManager;

	@GetMapping("/")
	protected void initContext() {
		movie.publish(new Movie());
		casting.publish(new Casting());
		movieList.publish(movieServices.getMovies(new DtListState(200, 0, null, null)));
		movieListModifiables.publish(movieServices.getMovies(new DtListState(200, 0, null, null)));
		moviesListMdl.publish(Movie.class, null);
		communeListMdl.publish(Commune.class, null);
		movieDisplayList.publish(movieServices.getMoviesDisplay(new DtListState(200, 0, null, null)));

		toModeCreate();
		currentDate.set(new Date().toString());

		currentZoneId.set(localeManager.getCurrentZoneId().getId());
		zoneId.set(timeZoneListStatic[0]);
		timeZoneList.set(timeZoneListStatic);
	}

	public String save() {
		movie.readDto();
		currentDate.set(new Date().toString());
		return NONE;
	}

	public String saveCasting() {
		casting.readDto();
		return NONE;
	}

	public String saveCommune() {
		communeId.set(communeId.get());
		return NONE;
	}

	public String saveInstant() {
		currentDate.set(movie.readDto().getLastModified().toString());

		final TestUserSession userSession = securityManager.<TestUserSession> getCurrentUserSession().get();
		userSession.setZoneId(ZoneId.of(zoneId.get()));
		currentZoneId.set(localeManager.getCurrentZoneId().getId());
		return NONE;
	}

	public String addMovieList() {
		movieListModifiables.getUiListModifiable().add(new Movie());
		return NONE;
	}

	public String saveList() {
		movieListModifiables.readDtList();
		return NONE;
	}

	public String uploadFile() {
		if (!fileTestFileRef.exists()) {
			throw new VUserException("Aucun fichier uploadé.");
		}
		final VFile vFile = fileTestFileRef.get();
		getUiMessageStack().addGlobalMessage(Level.INFO, "Fichier recu : " + vFile.getFileName() + " (" + vFile.getMimeType() + ")");
		return NONE;
	}

	public String uploadFiles() {
		if (!filesTestFileRef.exists()) {
			throw new VUserException("Aucun fichiers uploadé.");
		}
		final VFile[] vFiles = filesTestFileRef.get();
		getUiMessageStack().addGlobalMessage(Level.INFO, vFiles.length + " fichiers recus");
		for (final VFile vFile : vFiles) {
			getUiMessageStack().addGlobalMessage(Level.INFO, "Fichier recu : " + vFile.getFileName() + " (" + vFile.getMimeType() + ")");
		}
		return NONE;
	}

	/**
	 * Exporte l'annuaire utilisateur.
	 * @return redirection struts
	 */
	@GET
	public String downloadFile() {
		final String fullPath = getClass().getResource("/data/insee.csv").getFile();
		final File localFile = new File(fullPath);
		final VFile vFile = new FSFile("insee.csv", "text/csv", localFile);
		return createVFileResponseBuilder().send(vFile);
	}

	public String toRead() {
		toModeReadOnly();
		return NONE;
	}

	public String toEdit() {
		toModeEdit();
		return NONE;
	}

	public String getPageName() {
		return "Accueil";
	}
}
