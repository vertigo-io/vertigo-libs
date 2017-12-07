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
package io.vertigo.struts2.domain;

import java.util.Arrays;
import java.util.Iterator;

import io.vertigo.dynamo.domain.metamodel.DtFieldName;
import io.vertigo.struts2.domain.movies.MovieDisplay;

/**
 * Attention cette classe est générée automatiquement !
 */
public final class DtDefinitions implements Iterable<Class<?>> {

	/**
	 * Enumération des DtDefinitions.
	 */
	public enum Definitions {
		/** Objet de données ApplicationUser. */
		ApplicationUser(io.vertigo.struts2.domain.users.ApplicationUser.class),
		/** Objet de données Casting. */
		Casting(io.vertigo.struts2.domain.people.Casting.class),
		/** Objet de données Commune. */
		Commune(io.vertigo.struts2.domain.reference.Commune.class),
		/** Objet de données Dummy. */
		Dummy(io.vertigo.struts2.domain.search.Dummy.class),
		/** Objet de données Movie. */
		Movie(io.vertigo.struts2.domain.movies.Movie.class),
		/** Objet de données MovieDisplay. */
		MovieDisplay(io.vertigo.struts2.domain.movies.MovieDisplay.class),
		/** Objet de données OuiNonChoice. */
		OuiNonChoice(io.vertigo.struts2.domain.reference.OuiNonChoice.class),
		/** Objet de données People. */
		People(io.vertigo.struts2.domain.people.People.class),
		/** Objet de données Profil. */
		Profil(io.vertigo.struts2.domain.users.Profil.class),
		/** Objet de données SecurityRole. */
		SecurityRole(io.vertigo.struts2.domain.users.SecurityRole.class),
		/** Objet de données UserAuthentification. */
		UserAuthentification(io.vertigo.struts2.domain.users.UserAuthentification.class),
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
		USR_ID,
		/** Propriété 'Last Name'. */
		LAST_NAME,
		/** Propriété 'First Name'. */
		FIRST_NAME,
		/** Propriété 'email'. */
		EMAIL,
		/** Propriété 'Profil'. */
		PRO_ID,
	}

	/**
	 * Enumération des champs de Casting.
	 */
	public enum CastingFields implements DtFieldName {
		/** Propriété 'Cast_id'. */
		CAST_ID,
		/** Propriété 'Character name'. */
		CHARACTER_NAME,
		/** Propriété 'People'. */
		PEO_ID,
		/** Propriété 'Movie'. */
		MOV_ID,
	}

	/**
	 * Enumération des champs de Commune.
	 */
	public enum CommuneFields implements DtFieldName {
		/** Propriété 'ID INSEE'. */
		ID_INSEE,
		/** Propriété 'Code postal'. */
		CODE_POSTAL,
		/** Propriété 'Commune'. */
		COMMUNE,
		/** Propriété 'D�partement'. */
		DEPARTEMENT,
	}

	/**
	 * Enumération des champs de Dummy.
	 */
	public enum DummyFields implements DtFieldName {
		/** Propriété 'Id'. */
		DUMMY_LONG,
	}

	/**
	 * Enumération des champs de Movie.
	 */
	public enum MovieFields implements DtFieldName {
		/** Propriété 'MOV_ID'. */
		MOV_ID,
		/** Propriété 'TITLE'. */
		TITLE,
		/** Propriété 'Released'. */
		RELEASED,
		/** Propriété 'Year'. */
		YEAR,
		/** Propriété 'Runtime'. */
		RUNTIME,
		/** Propriété 'Description'. */
		DESCRIPTION,
		/** Propriété 'Poster'. */
		POSTER,
		/** Propriété 'rated'. */
		RATED,
	}

	/**
	 * Enumération des champs de MovieDisplay.
	 */
	public enum MovieDisplayFields implements DtFieldName<MovieDisplay> {
		/** Propriété 'MOV_ID'. */
		MOV_ID,
		/** Propriété 'TITLE'. */
		TITLE,

	}

	/**
	 * Enumération des champs de People.
	 */
	public enum PeopleFields implements DtFieldName {
		/** Propriété 'PEO_ID'. */
		PEO_ID,
		/** Propriété 'Last Name'. */
		LAST_NAME,
		/** Propriété 'First Name'. */
		FIRST_NAME,
		/** Propriété 'Peo Name'. */
		PEO_NAME,
		/** Propriété 'imdbID'. */
		IMDBID,
	}

	/**
	 * Enumération des champs de Profil.
	 */
	public enum ProfilFields implements DtFieldName {
		/** Propriété 'PRO_ID'. */
		PRO_ID,
		/** Propriété 'Label'. */
		LABEL,
	}

	/**
	 * Enumération des champs de SecurityRole.
	 */
	public enum SecurityRoleFields implements DtFieldName {
		/** Propriété 'SRO_CD'. */
		SRO_CD,
		/** Propriété 'Label'. */
		LABEL,
	}

	/**
	 * Enumération des champs de UserAuthentification.
	 */
	public enum UserAuthentificationFields implements DtFieldName {
		/** Propriété 'AUTH_ID'. */
		AUTH_ID,
		/** Propriété 'Login'. */
		LOGIN,
		/** Propriété 'Password'. */
		PASSWORD,
		/** Propriété 'Application user'. */
		USR_ID,
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
