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
package io.vertigo.struts2.domain.people;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Casting
 */
public final class Casting implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long castId;
	private String characterName;
	private Long peoId;
	private Long movId;
	private io.vertigo.struts2.domain.people.People people;
	private io.vertigo.struts2.domain.movies.Movie movie;

	/** {@inheritDoc} */
	@Override
	public URI<Casting> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Cast_id'.
	 * @return Long castId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "ID", required = true, label = "Cast_id")
	public Long getCastId() {
		return castId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Cast_id'.
	 * @param castId Long <b>Obligatoire</b>
	 */
	public void setCastId(final Long castId) {
		this.castId = castId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Character name'.
	 * @return String characterName
	 */
	@Field(domain = "DO_LABEL_LONG", label = "Character name")
	public String getCharacterName() {
		return characterName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Character name'.
	 * @param characterName String
	 */
	public void setCharacterName(final String characterName) {
		this.characterName = characterName;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'People'.
	 * @return Long peoId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "FOREIGN_KEY", required = true, label = "People")
	public Long getPeoId() {
		return peoId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'People'.
	 * @param peoId Long <b>Obligatoire</b>
	 */
	public void setPeoId(final Long peoId) {
		this.peoId = peoId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Movie'.
	 * @return Long movId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "FOREIGN_KEY", required = true, label = "Movie")
	public Long getMovId() {
		return movId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Movie'.
	 * @param movId Long <b>Obligatoire</b>
	 */
	public void setMovId(final Long movId) {
		this.movId = movId;
	}

	/**
	 * Association : People.
	 * @return io.vertigo.struts2.domain.people.People
	 */
	public io.vertigo.struts2.domain.people.People getPeople() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.struts2.domain.people.People> fkURI = getPeopleURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (people == null || !fkURI.equals(people.getURI())) {
			people = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return people;
	}

	/**
	 * Retourne l'URI: People.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(name = "A_CAST_PEO", fkFieldName = "PEO_ID", primaryDtDefinitionName = "DT_PEOPLE", primaryIsNavigable = true, primaryRole = "People", primaryLabel = "People", primaryMultiplicity = "1..1", foreignDtDefinitionName = "DT_CASTING", foreignIsNavigable = false, foreignRole = "Casting", foreignLabel = "Casting", foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.struts2.domain.people.People> getPeopleURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_CAST_PEO", io.vertigo.struts2.domain.people.People.class);
	}

	/**
	 * Association : Movie.
	 * @return io.vertigo.struts2.domain.movies.Movie
	 */
	public io.vertigo.struts2.domain.movies.Movie getMovie() {
		final io.vertigo.dynamo.domain.model.URI<io.vertigo.struts2.domain.movies.Movie> fkURI = getMovieURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (movie == null || !fkURI.equals(movie.getURI())) {
			movie = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return movie;
	}

	/**
	 * Retourne l'URI: Movie.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(name = "A_CAST_MOV", fkFieldName = "MOV_ID", primaryDtDefinitionName = "DT_MOVIE", primaryIsNavigable = true, primaryRole = "Movie", primaryLabel = "Movie", primaryMultiplicity = "1..1", foreignDtDefinitionName = "DT_CASTING", foreignIsNavigable = false, foreignRole = "Casting", foreignLabel = "Casting", foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.URI<io.vertigo.struts2.domain.movies.Movie> getMovieURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createURI(this, "A_CAST_MOV", io.vertigo.struts2.domain.movies.Movie.class);
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
