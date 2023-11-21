/*
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
package io.vertigo.planning.agenda.services;

import java.time.LocalDate;
import java.util.List;

import io.vertigo.commons.eventbus.Event;
import io.vertigo.core.lang.Assertion;

/**
 * This class defines the event that is emitted when the store deals with an object identified by an uri.
 *
 * @author pchretien
 */
public final class TrancheHoraireEvent implements Event {
	/**
	 * Type of event.
	 */
	public enum Type {
		/** Supprimé. */
		SUPPRIME,
		/** Consommé. */
		CONSOMME,
		/** Libéré */
		LIBERE
	}

	private final Type type;
	private final List<HoraireImpacte> horaires;

	public static final class HoraireImpacte {
		private final Long ageId;
		private final LocalDate localDate;
		private final Integer minutesDebut;

		public HoraireImpacte(
				final Long ageId,
				final LocalDate localDate,
				final Integer minutesDebut) {

			this.ageId = ageId;
			this.localDate = localDate;
			this.minutesDebut = minutesDebut;
		}

		public Long getAgeId() {
			return ageId;
		}

		public LocalDate getLocalDate() {
			return localDate;
		}

		public Integer getMinutesDebut() {
			return minutesDebut;
		}
	}

	/**
	 * Constructor.
	 * @param type Store type
	 * @param uid UID of stored element
	 */
	public TrancheHoraireEvent(final Type type, final List<HoraireImpacte> horaires) {
		Assertion.check()
				.isNotNull(type)
				.isNotNull(horaires);
		//-----
		this.type = type;
		this.horaires = horaires;
	}

	public List<HoraireImpacte> getHoraires() {
		return horaires;
	}

	/**
	 * @return Store type
	 */
	public Type getType() {
		return type;
	}
}
