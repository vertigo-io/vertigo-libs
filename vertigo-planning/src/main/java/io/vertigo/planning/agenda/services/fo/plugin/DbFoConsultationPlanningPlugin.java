package io.vertigo.planning.agenda.services.fo.plugin;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.core.node.config.discovery.NotDiscoverable;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.planning.agenda.AgendaPAO;
import io.vertigo.planning.agenda.dao.TrancheHoraireDAO;
import io.vertigo.planning.agenda.domain.Agenda;
import io.vertigo.planning.agenda.domain.CritereTrancheHoraire;
import io.vertigo.planning.agenda.domain.PublicationRange;
import io.vertigo.planning.agenda.domain.TrancheHoraire;
import io.vertigo.planning.agenda.services.fo.FoConsultationPlanningPlugin;

@NotDiscoverable
public class DbFoConsultationPlanningPlugin implements FoConsultationPlanningPlugin {
	@Inject
	private TrancheHoraireDAO trancheHoraireDAO;
	@Inject
	private AgendaPAO agendaPAO;

	@Override
	public DtList<TrancheHoraire> getTrancheHoraireDisponibles(final CritereTrancheHoraire critereTrancheHoraire) {
		return trancheHoraireDAO.getTrancheHorairesDisponibleByAgeIds(critereTrancheHoraire.getAgeIds(), critereTrancheHoraire.getPremierJour(), critereTrancheHoraire.getPremierJour().plusDays(6), Instant.now(),
				critereTrancheHoraire.getDateMin(), critereTrancheHoraire.getMinutesMin());
	}

	@Override
	public Optional<LocalDate> getDateDePremiereDisponibilite(final CritereTrancheHoraire critereTrancheHoraire) {
		return agendaPAO.getDatePremiereDisponibiliteByAgeIds(
				critereTrancheHoraire.getAgeIds(), critereTrancheHoraire.getPremierJour(), critereTrancheHoraire.getDateMax(), Instant.now(),
				critereTrancheHoraire.getDateMin(), critereTrancheHoraire.getMinutesMin());
	}

	@Override
	public Optional<LocalDate> getDateDeDernierePublication(final List<UID<Agenda>> ageUids) {
		return agendaPAO.getDateDernierePublicationByAgeId(
				ageUids.stream().map(UID::getId).map(Long.class::cast).collect(Collectors.toList()),
				Instant.now());
	}

	@Override
	public Optional<PublicationRange> getPrecedentePublication(final List<UID<Agenda>> ageUids) {
		return agendaPAO.getPrecedentePublicationByAgeId(
				ageUids.stream().map(UID::getId).map(Long.class::cast).collect(Collectors.toList()),
				Instant.now());
	}

	@Override
	public Optional<PublicationRange> getProchainePublication(final List<UID<Agenda>> ageUids) {
		return agendaPAO.getProchainePublicationByAgeId(
				ageUids.stream().map(UID::getId).map(Long.class::cast).collect(Collectors.toList()),
				Instant.now());
	}

}
