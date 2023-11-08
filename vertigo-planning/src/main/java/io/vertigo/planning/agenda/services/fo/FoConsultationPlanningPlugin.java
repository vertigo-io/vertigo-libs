package io.vertigo.planning.agenda.services.fo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import io.vertigo.core.node.component.Plugin;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.planning.agenda.domain.Agenda;
import io.vertigo.planning.agenda.domain.CritereTrancheHoraire;
import io.vertigo.planning.agenda.domain.PublicationRange;
import io.vertigo.planning.agenda.domain.TrancheHoraire;

public interface FoConsultationPlanningPlugin extends Plugin {

	DtList<TrancheHoraire> getTrancheHoraireDisponibles(final CritereTrancheHoraire critereTrancheHoraire);

	Optional<LocalDate> getDateDePremiereDisponibilite(final CritereTrancheHoraire critereTrancheHoraire);

	Optional<LocalDate> getDateDeDernierePublication(final List<UID<Agenda>> ageUids);

	Optional<PublicationRange> getPrecedentePublication(final List<UID<Agenda>> ageUids);

	Optional<PublicationRange> getProchainePublication(final List<UID<Agenda>> ageUids);

}
