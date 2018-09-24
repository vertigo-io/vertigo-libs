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
package io.vertigo.ui.domain.movies;

import java.time.Instant;

import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Movie
 */
public final class Movie implements KeyConcept {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long movId;
	private String title;
	private java.util.Date released;
	private Integer year;
	private Integer runtime;
	private String description;
	private String poster;
	private String rated;
	private Instant lastModified;

	/** {@inheritDoc} */
	@Override
	public URI<Movie> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'MOV_ID'.
	 * @return Long movId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "ID", required = true, label = "MOV_ID")
	public Long getMovId() {
		return movId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'MOV_ID'.
	 * @param movId Long <b>Obligatoire</b>
	 */
	public void setMovId(final Long movId) {
		this.movId = movId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'TITLE'.
	 * @return String title
	 */
	@Field(domain = "DO_LABEL_LONG", label = "TITLE")
	public String getTitle() {
		return title;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'TITLE'.
	 * @param title String
	 */
	public void setTitle(final String title) {
		this.title = title;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Released'.
	 * @return java.util.Date released
	 */
	@Field(domain = "DO_DATE", label = "Released")
	public java.util.Date getReleased() {
		return released;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Released'.
	 * @param released java.util.Date
	 */
	public void setReleased(final java.util.Date released) {
		this.released = released;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Year'.
	 * @return Integer year
	 */
	@Field(domain = "DO_YEAR", label = "Year")
	public Integer getYear() {
		return year;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Year'.
	 * @param year Integer
	 */
	public void setYear(final Integer year) {
		this.year = year;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Runtime'.
	 * @return Integer runtime
	 */
	@Field(domain = "DO_DURATION", label = "Runtime")
	public Integer getRuntime() {
		return runtime;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Runtime'.
	 * @param runtime Integer
	 */
	public void setRuntime(final Integer runtime) {
		this.runtime = runtime;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Description'.
	 * @return String description
	 */
	@Field(domain = "DO_COMMENT", label = "Description")
	public String getDescription() {
		return description;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Description'.
	 * @param description String
	 */
	public void setDescription(final String description) {
		this.description = description;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Poster'.
	 * @return String poster
	 */
	@Field(domain = "DO_LABEL_LONG", label = "Poster")
	public String getPoster() {
		return poster;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Poster'.
	 * @param poster String
	 */
	public void setPoster(final String poster) {
		this.poster = poster;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'rated'.
	 * @return String rated
	 */
	@Field(domain = "DO_LABEL_LONG", label = "rated")
	public String getRated() {
		return rated;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'rated'.
	 * @param rated String
	 */
	public void setRated(final String rated) {
		this.rated = rated;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'lastModified'.
	 * @return Instant lastModified
	 */
	@Field(domain = "DO_LAST_MODIFIED", label = "lastModified")
	public Instant getLastModified() {
		return lastModified;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Released'.
	 * @param lastModified Instant
	 */
	public void setLastModified(final Instant lastModified) {
		this.lastModified = lastModified;
	}

	// Association : Casting non navigable

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
