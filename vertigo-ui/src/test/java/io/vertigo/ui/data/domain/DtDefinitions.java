/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.ui.data.domain;

import java.util.Arrays;
import java.util.Iterator;

import io.vertigo.dynamo.domain.metamodel.DtFieldName;
import io.vertigo.ui.data.domain.movies.MovieDisplay;
import io.vertigo.ui.data.domain.movies.MovieIndex;

/**
 * Attention cette classe est générée automatiquement !
 */
public final class DtDefinitions implements Iterable<Class<?>> {

	/**
	 * Enumération des DtDefinitions.
	 */
	public enum Definitions {
		/** Objet de données ApplicationUser. */
		ApplicationUser(io.vertigo.ui.data.domain.users.ApplicationUser.class),
		/** Objet de données Casting. */
		Casting(io.vertigo.ui.data.domain.people.Casting.class),
		/** Objet de données Commune. */
		Commune(io.vertigo.ui.data.domain.reference.Commune.class),
		/** Objet de données Dummy. */
		Dummy(io.vertigo.ui.data.domain.search.Dummy.class),
		/** Objet de données Movie. */
		Movie(io.vertigo.ui.data.domain.movies.Movie.class),
		/** Objet de données MovieDisplay. */
		MovieDisplay(io.vertigo.ui.data.domain.movies.MovieDisplay.class),
		/** Objet de données MovieIndex. */
		MovieIndex(io.vertigo.ui.data.domain.movies.MovieIndex.class),
		/** Objet de données OuiNonChoice. */
		OuiNonChoice(io.vertigo.ui.data.domain.reference.OuiNonChoice.class),
		/** Objet de données People. */
		People(io.vertigo.ui.data.domain.people.People.class),
		/** Objet de données Profil. */
		Profil(io.vertigo.ui.data.domain.users.Profil.class),
		/** Objet de données SecurityRole. */
		SecurityRole(io.vertigo.ui.data.domain.users.SecurityRole.class),
		/** Objet de données UserAuthentification. */
		UserAuthentification(io.vertigo.ui.data.domain.users.UserAuthentification.class),
		;

		private final Class<?> clazz;

		private Definitions(final Class<?> clazz) {
			this.clazz = clazz;
		}

		/**
		  * Classe associée.
		  * @return Class d'implémentation de l'objet
		  */
		public Class<?> getDtClass() {
			return clazz;
		}
	}

	/**
	 * Enumération des champs de ApplicationUser.
	 */
	public enum ApplicationUserFields implements DtFieldName {
		/** Propriété 'USR_ID'. */
		usrId,
		/** Propriété 'Last Name'. */
		lastName,
		/** Propriété 'First Name'. */
		firstName,
		/** Propriété 'email'. */
		email,
		/** Propriété 'Profil'. */
		proId,
	}

	/**
	 * Enumération des champs de Casting.
	 */
	public enum CastingFields implements DtFieldName {
		/** Propriété 'Cast_id'. */
		castId,
		/** Propriété 'Character name'. */
		characterName,
		/** Propriété 'People'. */
		peoId,
		/** Propriété 'Movie'. */
		movId,
	}

	/**
	 * Enumération des champs de Commune.
	 */
	public enum CommuneFields implements DtFieldName {
		/** Propriété 'ID INSEE'. */
		idInsee,
		/** Propriété 'Code postal'. */
		codePostal,
		/** Propriété 'Commune'. */
		commune,
		/** Propriété 'D�partement'. */
		departement,
	}

	/**
	 * Enumération des champs de Dummy.
	 */
	public enum DummyFields implements DtFieldName {
		/** Propriété 'Id'. */
		dummyLong,
	}

	/**
	 * Enumération des champs de Movie.
	 */
	public enum MovieFields implements DtFieldName {
		/** Propriété 'MOV_ID'. */
		movId,
		/** Propriété 'TITLE'. */
		title,
		/** Propriété 'Released'. */
		released,
		/** Propriété 'Year'. */
		year,
		/** Propriété 'Runtime'. */
		runtime,
		/** Propriété 'Description'. */
		description,
		/** Propriété 'Poster'. */
		poster,
		/** Propriété 'rated'. */
		rated,
	}

	/**
	 * Enumération des champs de MovieDisplay.
	 */
	public enum MovieDisplayFields implements DtFieldName<MovieDisplay> {
		/** Propriété 'MOV_ID'. */
		movId,
		/** Propriété 'TITLE'. */
		title,

	}

	/**
	 * Enumération des champs de MovieIndex.
	 */
	public enum MovieIndexFields implements DtFieldName<MovieIndex> {
		/** Propriété 'id'. */
		movId,
		/** Propriété 'Title'. */
		title,
		/** Propriété 'Title'. */
		titleSortOnly,
		/** Propriété 'Original Title'. */
		originalTitle,
		/** Propriété 'Synopsis'. */
		synopsis,
		/** Propriété 'shortSynopsis'. */
		shortSynopsis,
		/** Propriété 'keywords'. */
		keywords,
		/** Propriété 'poster'. */
		poster,
		/** Propriété 'runtime'. */
		runtime,
		/** Propriété 'Movie type'. */
		movieType,
		/** Propriété 'productionYear'. */
		productionYear,
		/** Propriété 'userRating'. */
		userRating,
		/** Propriété 'presRating'. */
		pressRating,
		/** Propriété 'Writers'. */
		writers,
		/** Propriété 'Camera'. */
		camera,
	}

	/**
	 * Enumération des champs de People.
	 */
	public enum PeopleFields implements DtFieldName {
		/** Propriété 'PEO_ID'. */
		peoId,
		/** Propriété 'Last Name'. */
		lastName,
		/** Propriété 'First Name'. */
		firstName,
		/** Propriété 'Peo Name'. */
		peoName,
		/** Propriété 'imdbID'. */
		imdbid,
	}

	/**
	 * Enumération des champs de Profil.
	 */
	public enum ProfilFields implements DtFieldName {
		/** Propriété 'PRO_ID'. */
		proId,
		/** Propriété 'Label'. */
		label,
	}

	/**
	 * Enumération des champs de SecurityRole.
	 */
	public enum SecurityRoleFields implements DtFieldName {
		/** Propriété 'SRO_CD'. */
		sroCd,
		/** Propriété 'Label'. */
		label,
	}

	/**
	 * Enumération des champs de UserAuthentification.
	 */
	public enum UserAuthentificationFields implements DtFieldName {
		/** Propriété 'AUTH_ID'. */
		authId,
		/** Propriété 'Login'. */
		login,
		/** Propriété 'Password'. */
		password,
		/** Propriété 'Application user'. */
		usrId,
	}

	/** {@inheritDoc} */
	@Override
	public Iterator<Class<?>> iterator() {
		return new Iterator<Class<?>>() {
			private final Iterator<Definitions> it = Arrays.asList(Definitions.values()).iterator();

			/** {@inheritDoc} */
			@Override
			public boolean hasNext() {
				return it.hasNext();
			}

			/** {@inheritDoc} */
			@Override
			public Class<?> next() {
				return it.next().getDtClass();
			}
		};
	}
}
