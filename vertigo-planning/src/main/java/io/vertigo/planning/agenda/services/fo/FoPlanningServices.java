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
package io.vertigo.planning.agenda.services.fo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.commons.transaction.Transactional;
import io.vertigo.core.node.component.Component;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.planning.agenda.domain.Agenda;
import io.vertigo.planning.agenda.domain.CritereTrancheHoraire;
import io.vertigo.planning.agenda.domain.PublicationRange;
import io.vertigo.planning.agenda.domain.TrancheHoraire;

@Transactional
public class FoPlanningServices implements Component {

	@Inject
	private FoConsultationPlanningPlugin foConsultationPlanningPlugin;

	public DtList<TrancheHoraire> getTrancheHoraireDisponibles(final CritereTrancheHoraire critereTrancheHoraire) {
		return foConsultationPlanningPlugin.getTrancheHoraireDisponibles(critereTrancheHoraire);
	}

	public Optional<LocalDate> getDateDePremiereDisponibilite(final CritereTrancheHoraire critereTrancheHoraire) {
		return foConsultationPlanningPlugin.getDateDePremiereDisponibilite(critereTrancheHoraire);
	}

	public Optional<LocalDate> getDateDeDernierePublication(final List<UID<Agenda>> ageUids) {
		return foConsultationPlanningPlugin.getDateDeDernierePublication(ageUids);
	}

	public Optional<PublicationRange> getPrecedentePublication(final List<UID<Agenda>> ageUids) {
		return foConsultationPlanningPlugin.getPrecedentePublication(ageUids);
	}

	public Optional<PublicationRange> getProchainePublication(final List<UID<Agenda>> ageUids) {
		return foConsultationPlanningPlugin.getProchainePublication(ageUids);
	}

}
