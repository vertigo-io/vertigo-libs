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

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import javax.inject.Inject;

import io.vertigo.commons.transaction.Transactional;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.VUserException;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.node.component.Component;
import io.vertigo.datamodel.criteria.Criterions;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.DtListState;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.util.VCollectors;
import io.vertigo.planning.agenda.AgendaPAO;
import io.vertigo.planning.agenda.dao.AgendaDAO;
import io.vertigo.planning.agenda.dao.CreneauDAO;
import io.vertigo.planning.agenda.dao.PlageHoraireDAO;
import io.vertigo.planning.agenda.dao.ReservationCreneauDAO;
import io.vertigo.planning.agenda.dao.TrancheHoraireDAO;
import io.vertigo.planning.agenda.domain.AffectionReservation;
import io.vertigo.planning.agenda.domain.Agenda;
import io.vertigo.planning.agenda.domain.AgendaDisplayRange;
import io.vertigo.planning.agenda.domain.CreationPlageHoraireForm;
import io.vertigo.planning.agenda.domain.Creneau;
import io.vertigo.planning.agenda.domain.DateDisponibleDisplay;
import io.vertigo.planning.agenda.domain.DefaultPlageHoraire;
import io.vertigo.planning.agenda.domain.DuplicationSemaineForm;
import io.vertigo.planning.agenda.domain.PlageHoraire;
import io.vertigo.planning.agenda.domain.PlageHoraireDisplay;
import io.vertigo.planning.agenda.domain.PublicationTrancheHoraireForm;
import io.vertigo.planning.agenda.domain.ReservationCreneau;
import io.vertigo.planning.agenda.domain.TrancheHoraire;
import io.vertigo.planning.agenda.domain.TrancheHoraireDisplay;
import io.vertigo.planning.domain.DtDefinitions.CreationPlageHoraireFormFields;
import io.vertigo.planning.domain.DtDefinitions.CreneauFields;
import io.vertigo.planning.domain.DtDefinitions.DuplicationSemaineFormFields;
import io.vertigo.planning.domain.DtDefinitions.PlageHoraireFields;
import io.vertigo.planning.domain.DtDefinitions.PublicationTrancheHoraireFormFields;
import io.vertigo.planning.domain.DtDefinitions.TrancheHoraireFields;
import io.vertigo.vega.webservice.validation.UiErrorBuilder;

@Transactional
public class PlanningServices implements Component {

	private static final int CREATE_MIN_DUREE_PLAGE_MINUTE = 60;
	private static final int CREATE_MAX_DUREE_PLAGE_HEURE = 10;
	private static final int CREATE_MAX_NB_GUICHET = 9;
	private static final int CREATE_MAX_DAYS_FROM_NOW = 365; //maximum 1 an par rapport à aujourd'hui

	private static final int PUBLISH_MAX_DAYS_FROM_NOW = 365; //maximum 1 an par rapport à aujourd'hui
	private static final int PUBLISH_MAX_DAYS_PERIODE = 31 * 2; //maximum 2 mois publié à la fois
	private static final int PUBLISH_NOW_DELAY_S = 60; //1 minute de sécurité avant publication effective

	private static final int ORPHAN_RESERVATION_AGG_MINUTES = 30;

	private static final int DUPLICATE_MAX_DAYS_PERIODE = 31 * 3; //3 mois
	private static final int DUPLICATE_MAX_DAYS_FROM_NOW = 365; //maximum 1 an par rapport à aujourd'hui

	@Inject
	private AgendaDAO agendaDAO;
	@Inject
	private PlageHoraireDAO plageHoraireDAO;
	@Inject
	private TrancheHoraireDAO trancheHoraireDAO;
	@Inject
	private CreneauDAO creneauDAO;
	@Inject
	private ReservationCreneauDAO reservationCreneauDAO;
	@Inject
	private AgendaPAO agendaPAO;
	@Inject
	private VTransactionManager transactionManager;

	public Agenda createAgenda(final String name) {
		Assertion.check().isNotBlank(name, "A agenda must have a name");
		//---
		final var agenda = new Agenda();
		agenda.setNom(name);
		final var createdAgenda = agendaDAO.create(agenda);
		return createdAgenda;
	}

	public PlageHoraire createPlageHoraire(final UID<Agenda> agendaUid, final CreationPlageHoraireForm creationPlageHoraireForm) {
		final var agenda = agendaDAO.readOneForUpdate(agendaUid); //ForUpdate pour éviter les doublons
		//security filter

		/** Contrôles User */
		final var uiErrorBuilder = new UiErrorBuilder();
		final var decalageJours = ChronoUnit.DAYS.between(LocalDate.now(), creationPlageHoraireForm.getDateLocale());
		if (Math.abs(decalageJours) > CREATE_MAX_DAYS_FROM_NOW) {
			uiErrorBuilder.addError(creationPlageHoraireForm, CreationPlageHoraireFormFields.dateLocale,
					LocaleMessageText.of("La date de la plage horaire doit être à moins d'1 an"));
		}
		if (creationPlageHoraireForm.getNbGuichet() <= 0 || creationPlageHoraireForm.getNbGuichet() > CREATE_MAX_NB_GUICHET) {
			uiErrorBuilder.addError(creationPlageHoraireForm, CreationPlageHoraireFormFields.nbGuichet,
					LocaleMessageText.of("Le nombre de guichets doit être un nombre compris entre 1 et 9"));
		}

		if (creationPlageHoraireForm.getMinutesDebut() < 7 * 60 + 30) {
			uiErrorBuilder.addError(creationPlageHoraireForm, CreationPlageHoraireFormFields.minutesDebut,
					LocaleMessageText.of("La plage horaire doit débuter au plus tôt à 07:30"));
		}
		if (creationPlageHoraireForm.getMinutesFin() > 21 * 60) {
			uiErrorBuilder.addError(creationPlageHoraireForm, CreationPlageHoraireFormFields.minutesFin,
					LocaleMessageText.of("La plage horaire doit finir au plus tard à 21:00"));
		}

		final var dureePlageMinute = creationPlageHoraireForm.getMinutesFin() - creationPlageHoraireForm.getMinutesDebut();
		if (dureePlageMinute <= 0) {
			uiErrorBuilder.addError(creationPlageHoraireForm, CreationPlageHoraireFormFields.minutesFin,
					LocaleMessageText.of("L'heure de fin de la plage horaire doit être postérieur à l'heure de début"));
		} else if (dureePlageMinute < CREATE_MIN_DUREE_PLAGE_MINUTE) {
			uiErrorBuilder.addError(creationPlageHoraireForm, CreationPlageHoraireFormFields.minutesDebut,
					LocaleMessageText.of("La plage horaire doit avoir une durée d'au moins " + CREATE_MIN_DUREE_PLAGE_MINUTE + " minutes"));
		} else if (dureePlageMinute > CREATE_MAX_DUREE_PLAGE_HEURE * 60) {
			uiErrorBuilder.addError(creationPlageHoraireForm, CreationPlageHoraireFormFields.minutesDebut,
					LocaleMessageText.of("La plage horaire doit avoir une durée inférieure à " + CREATE_MAX_DUREE_PLAGE_HEURE + " heures"));
		}

		if (creationPlageHoraireForm.getDateLocale().getDayOfWeek() == DayOfWeek.SUNDAY) {
			uiErrorBuilder.addError(creationPlageHoraireForm, CreationPlageHoraireFormFields.dateLocale,
					LocaleMessageText.of("Il n'est pas possible de créer une plage le dimanche"));
		}

		final var firstPlageConflict = plageHoraireDAO.getExistsConflictingPlageHoraire(
				(Long) agendaUid.getId(),
				creationPlageHoraireForm.getDateLocale(),
				creationPlageHoraireForm.getMinutesDebut(),
				creationPlageHoraireForm.getMinutesFin());
		if (firstPlageConflict.isPresent()) {
			//TODO : libelle de la plage
			uiErrorBuilder.addError(creationPlageHoraireForm, CreationPlageHoraireFormFields.minutesDebut,
					LocaleMessageText.of("La plage horaire est en conflit avec une autre"));
		}

		uiErrorBuilder.throwUserExceptionIfErrors();
		/*****/

		final var plageHoraire = new PlageHoraire();
		plageHoraire.agenda().setUID(agenda.getUID());
		plageHoraire.setDateLocale(creationPlageHoraireForm.getDateLocale());
		plageHoraire.setMinutesDebut(creationPlageHoraireForm.getMinutesDebut());
		plageHoraire.setMinutesFin(creationPlageHoraireForm.getMinutesFin());
		plageHoraire.setNbGuichet(creationPlageHoraireForm.getNbGuichet());
		plageHoraireDAO.save(plageHoraire);

		final var trancheHoraires = createTrancheHoraires(plageHoraire, creationPlageHoraireForm.getDureeCreneau());
		trancheHoraireDAO.batchInsertTrancheHoraire(trancheHoraires);
		// On ne crée pas les créneaux : seulement à la publication

		return plageHoraire;
	}

	private static DtList<TrancheHoraire> createTrancheHoraires(final PlageHoraire plageHoraire, final int dureeTrancheMinute) {
		final var trancheHoraires = new DtList<TrancheHoraire>(TrancheHoraire.class);
		for (int i = plageHoraire.getMinutesDebut(); i < plageHoraire.getMinutesFin(); i += dureeTrancheMinute) {
			trancheHoraires.add(createTrancheHoraire(plageHoraire, i, dureeTrancheMinute, plageHoraire.getNbGuichet()));
		}
		return trancheHoraires;
	}

	private static TrancheHoraire createTrancheHoraire(final PlageHoraire plageHoraire, final int startMinuteOfDay, final int dureeTrancheMinute, final int nbGuichet) {
		final var trancheHoraire = new TrancheHoraire();
		trancheHoraire.plageHoraire().setUID(plageHoraire.getUID());
		trancheHoraire.agenda().setUID(plageHoraire.agenda().getUID());
		trancheHoraire.setDateLocale(plageHoraire.getDateLocale());
		trancheHoraire.setMinutesDebut(startMinuteOfDay);
		trancheHoraire.setMinutesFin(startMinuteOfDay + dureeTrancheMinute);
		trancheHoraire.setNbGuichet(nbGuichet);
		return trancheHoraire;
	}

	public void duplicateSemaine(final UID<Agenda> ageUid, final DuplicationSemaineForm duplicationSemaineForm) {
		final var agenda = agendaDAO.readOneForUpdate(ageUid); //ForUpdate pour éviter les doublons
		//security filter

		final var uiErrorBuilder = new UiErrorBuilder();
		uiErrorBuilder.checkFieldDateAfterOrEquals(duplicationSemaineForm, DuplicationSemaineFormFields.dateLocaleFromDebut, DuplicationSemaineFormFields.dateLocaleFromFin,
				LocaleMessageText.of("La date de fin de la selection à copier doit être postérieur à la date de début"));

		uiErrorBuilder.checkFieldDateAfterOrEquals(duplicationSemaineForm, DuplicationSemaineFormFields.dateLocaleToDebut, DuplicationSemaineFormFields.dateLocaleToFin,
				LocaleMessageText.of("La date de fin de la plage de copie doit être postérieur à la date de début"));

		final var dureeDuplicationJours = ChronoUnit.DAYS.between(duplicationSemaineForm.getDateLocaleToDebut(), duplicationSemaineForm.getDateLocaleToFin());
		if (dureeDuplicationJours > DUPLICATE_MAX_DAYS_PERIODE) {
			uiErrorBuilder.addError(duplicationSemaineForm, DuplicationSemaineFormFields.dateLocaleToFin,
					LocaleMessageText.of("Vous ne pouvez pas dupliquer une semaine sur plus de 3 mois"));
		}

		final var decalageJours = ChronoUnit.DAYS.between(LocalDate.now(), duplicationSemaineForm.getDateLocaleToDebut());
		if (decalageJours > DUPLICATE_MAX_DAYS_FROM_NOW) { //abs : on autorise la publication de creneau passé
			uiErrorBuilder.addError(duplicationSemaineForm, DuplicationSemaineFormFields.dateLocaleToDebut,
					LocaleMessageText.of("Vous ne pouvez pas dupliquer à plus d'1 an"));
		} else if (Math.abs(decalageJours) > DUPLICATE_MAX_DAYS_FROM_NOW) { //abs : on autorise la publication de creneau passé
			uiErrorBuilder.addError(duplicationSemaineForm, DuplicationSemaineFormFields.dateLocaleToDebut,
					LocaleMessageText.of("Vous ne pouvez pas dupliquer à plus d'1 an"));
		}

		if (duplicationSemaineForm.getDateLocaleToDebut().isBefore(LocalDate.now())) {
			uiErrorBuilder.addError(duplicationSemaineForm, DuplicationSemaineFormFields.dateLocaleToDebut,
					LocaleMessageText.of("Vous ne pouvez pas dupliquer avant la date du jour"));
		} else if (duplicationSemaineForm.getDateLocaleToDebut().isBefore(duplicationSemaineForm.getDateLocaleFromFin())) {
			uiErrorBuilder.addError(duplicationSemaineForm, DuplicationSemaineFormFields.dateLocaleToDebut,
					LocaleMessageText.of("Vous ne pouvez pas dupliquer avant la semaine utilisée comme modèle"));
		}

		uiErrorBuilder.throwUserExceptionIfErrors();
		/*****/

		final var plageHorairesFrom = plageHoraireDAO.findAll(
				Criterions.isEqualTo(PlageHoraireFields.ageId, ageUid.getId())
						.and(Criterions.isGreaterThanOrEqualTo(PlageHoraireFields.dateLocale, duplicationSemaineForm.getDateLocaleFromDebut()))
						.and(Criterions.isLessThanOrEqualTo(PlageHoraireFields.dateLocale, duplicationSemaineForm.getDateLocaleFromFin())),
				DtListState.of(null, 0, PlageHoraireFields.dateLocale.name(), false));
		if (plageHorairesFrom.isEmpty()) {
			//erreur bloquante
			throw new VUserException("La semaine que vous souhaitez dupliquer n'a aucune plage horaire");
		}

		final var previousPlageHorairesTo = plageHoraireDAO.findAll(
				Criterions.isEqualTo(PlageHoraireFields.ageId, ageUid.getId())
						.and(Criterions.isGreaterThanOrEqualTo(PlageHoraireFields.dateLocale, duplicationSemaineForm.getDateLocaleToDebut()))
						.and(Criterions.isLessThanOrEqualTo(PlageHoraireFields.dateLocale, duplicationSemaineForm.getDateLocaleToFin())),
				DtListState.of(null, 0, PlageHoraireFields.dateLocale.name(), false));

		final Map<DayOfWeek, List<PlageHoraire>> mapPlagesHorairesFromPerDayOfWeek = plageHorairesFrom.stream()
				.collect(Collectors.groupingBy(plh -> plh.getDateLocale().getDayOfWeek()));

		final Map<LocalDate, List<PlageHoraire>> mapPreviousPlagesHorairesToPerLocalDate = previousPlageHorairesTo.stream()
				.collect(Collectors.groupingBy(plh -> plh.getDateLocale()));

		final var plageHorairesToCreate = new DtList<PlageHoraire>(PlageHoraire.class);

		final int dureeTrancheMinute = duplicationSemaineForm.getDureeCreneau();
		for (var d = 0; d < dureeDuplicationJours + 1; ++d) { //+1 => date de fin incluse
			final var currentCopyDate = duplicationSemaineForm.getDateLocaleToDebut().plusDays(d);
			final var plageHorairesCopyFrom = mapPlagesHorairesFromPerDayOfWeek.get(currentCopyDate.getDayOfWeek());
			if (plageHorairesCopyFrom == null || plageHorairesCopyFrom.isEmpty()) {
				continue;
			}

			final var plageHorairesPreviousTo = mapPreviousPlagesHorairesToPerLocalDate.get(currentCopyDate);
			for (final PlageHoraire plageHoraireFrom : plageHorairesCopyFrom) {
				//on vérifie qu'il n'y a pas de conflit
				if (plageHorairesPreviousTo != null
						&& !plageHorairesPreviousTo.isEmpty()
						&& conflictPlageHoraire(plageHoraireFrom, plageHorairesPreviousTo)) {
					continue;
				}
				//sinon on crée la plage
				final var plageHoraire = new PlageHoraire();
				plageHoraire.agenda().setUID(agenda.getUID());
				plageHoraire.setDateLocale(currentCopyDate);
				plageHoraire.setMinutesDebut(plageHoraireFrom.getMinutesDebut());
				plageHoraire.setMinutesFin(plageHoraireFrom.getMinutesFin());
				plageHoraire.setNbGuichet(plageHoraireFrom.getNbGuichet());
				plageHorairesToCreate.add(plageHoraire);

				//(les tranches seront crées après l'insert pour pouvoir récupérer la PK générée)
			}
		}
		//le batch ne marche pas car l'id n'est pas setté
		//on le fait quand meme en dernier pour locker moins longtemps
		//Creation des tranches horaires associées
		final var trancheHoraires = new DtList<TrancheHoraire>(TrancheHoraire.class);
		for (final PlageHoraire plageHoraire : plageHorairesToCreate) {
			plageHoraireDAO.save(plageHoraire);
			//cette fois l'id de la plage existe et peut être associée dans la FK des tranches
			trancheHoraires.addAll(createTrancheHoraires(plageHoraire, dureeTrancheMinute));
		}
		trancheHoraireDAO.batchInsertTrancheHoraire(trancheHoraires);
	}

	private static boolean conflictPlageHoraire(final PlageHoraire plageHoraireFrom, final List<PlageHoraire> plhsPreviousTo) {
		for (final PlageHoraire plhPreviousTo : plhsPreviousTo) {
			Assertion.check().isTrue(plageHoraireFrom.getAgeId().equals(plhPreviousTo.getAgeId()), "Les plages comparées ne sont pas sur le même agenda");
			if (plageHoraireFrom.getMinutesDebut() < plhPreviousTo.getMinutesFin()
					&& plageHoraireFrom.getMinutesFin() > plhPreviousTo.getMinutesDebut()) {
				return true;
			}
		}
		return false;
	}

	public void deletePlageHoraireCascade(final UID<Agenda> agendaUid, final UID<PlageHoraire> plageHoraireUid) {
		Assertion.check().isNotNull(agendaUid)
				.isNotNull(plageHoraireUid);
		//--
		agendaDAO.readOneForUpdate(agendaUid); //ForUpdate pour éviter les doublons
		agendaPAO.deletePlageHoraireCascadeByPlhId((Long) plageHoraireUid.getId());
	}

	public Agenda getAgenda(final UID<Agenda> ageUid) {
		Assertion.check().isNotNull(ageUid);
		//---
		return agendaDAO.get(ageUid);
	}

	public DtList<PlageHoraireDisplay> getPlageHoraireDisplayByAgenda(final UID<Agenda> agendaUid, final LocalDate firstDate, final LocalDate lastDate) {
		Assertion.check().isNotNull(agendaUid)
				.isNotNull(firstDate)
				.isNotNull(lastDate);
		//--
		return agendaPAO.getPlageHoraireDisplayByAgeId((Long) agendaUid.getId(), firstDate, lastDate, Instant.now());
	}

	/**
	 * Détermine les plages horaires par défaut d'un agenda.
	 * Pour l'instant en dur, plus tard pourrait analyser l'existant.
	 * @param agendaUid uid de l'agenda
	 * @param minusMonths Nombre de mois à analyser
	 * @param firstDate Première date de la période à simuler
	 * @return Liste des plages horaires par défaut
	 */
	public DtList<DefaultPlageHoraire> getDefaultPlageHoraireByAgenda(final UID<Agenda> agendaUid, final LocalDate minusMonths, final LocalDate firstDate) {

		//default
		final DtList<DefaultPlageHoraire> defaultPlageHoraires = new DtList<>(DefaultPlageHoraire.class);

		//A terme : regarder les creneaux du passé pour reproduire le pattern.
		//pour le moment valeur empirique
		defaultPlageHoraires.add(newDefaultPlageHoraire(1, 8, 30, 12, 0, 1));
		defaultPlageHoraires.add(newDefaultPlageHoraire(1, 14, 0, 16, 30, 1));
		defaultPlageHoraires.add(newDefaultPlageHoraire(2, 8, 30, 12, 0, 1));
		defaultPlageHoraires.add(newDefaultPlageHoraire(2, 14, 0, 16, 30, 1));
		defaultPlageHoraires.add(newDefaultPlageHoraire(3, 8, 30, 12, 0, 1));
		defaultPlageHoraires.add(newDefaultPlageHoraire(3, 14, 0, 16, 30, 1));
		defaultPlageHoraires.add(newDefaultPlageHoraire(4, 8, 30, 12, 0, 1));
		defaultPlageHoraires.add(newDefaultPlageHoraire(4, 14, 0, 16, 30, 1));
		defaultPlageHoraires.add(newDefaultPlageHoraire(5, 8, 30, 12, 0, 1));
		defaultPlageHoraires.add(newDefaultPlageHoraire(5, 14, 0, 16, 30, 1));

		return defaultPlageHoraires;
	}

	private static DefaultPlageHoraire newDefaultPlageHoraire(final int jour, final int hourDebut, final int minDebut, final int hourFin, final int minFin, final int nbGuichet) {
		DefaultPlageHoraire defaultPlageHoraire;
		defaultPlageHoraire = new DefaultPlageHoraire();
		defaultPlageHoraire.setJourDeSemaine(jour);
		defaultPlageHoraire.setMinutesDebut(hourDebut * 60 + minDebut);
		defaultPlageHoraire.setMinutesFin(hourFin * 60 + minFin);
		defaultPlageHoraire.setNbGuichet(nbGuichet);
		return defaultPlageHoraire;
	}

	public PlageHoraireDisplay getPlageHoraireDisplay(final UID<Agenda> agendaUid, final UID<PlageHoraire> plageUid) {
		Assertion.check()
				.isNotNull(agendaUid)
				.isNotNull(plageUid);
		//-----
		return agendaPAO.getPlageHoraireDisplayByPlhId((Long) plageUid.getId(), Instant.now());
	}

	public DtList<TrancheHoraireDisplay> getTrancheHoraireDisplayByPlage(final UID<Agenda> agendaUid, final UID<PlageHoraire> plageUid) {
		Assertion.check()
				.isNotNull(agendaUid)
				.isNotNull(plageUid);
		//-----
		return agendaPAO.getTrancheHoraireDisplayByPlhId((Long) plageUid.getId(), Instant.now());
	}

	public DtList<PlageHoraireDisplay> getReservationOrphelines(final UID<Agenda> ageUid, final LocalDate firstDate, final LocalDate lastDate) {
		return agendaPAO.countUnlinkReservationPerXminByAgeId((Long) ageUid.getId(), firstDate, lastDate, ORPHAN_RESERVATION_AGG_MINUTES);
	}

	public LocalDate getPremierJourLibrePourDuplication(final UID<Agenda> ageUid, final AgendaDisplayRange agendaRange) {
		//on prend soit la date du jour soit la date de début de la source + 1 semaine
		final var localDateTo = LocalDate.now().isAfter(agendaRange.getLastDate()) ? LocalDate.now() : agendaRange.getFirstDate().plusWeeks(1);

		final var firsts = agendaPAO.getFirstLocalDatesFreeOfPlageHorairePerDayOfWeek(
				(Long) ageUid.getId(),
				agendaRange.getFirstDate(),
				agendaRange.getLastDate(),
				localDateTo,
				LocalDate.now().plusYears(1));
		if (firsts.isEmpty()) {
			return localDateTo;
		}
		return firsts.get(0);
	}

	public DtList<Creneau> getAvailableCreneaux(final UID<TrancheHoraire> trhUid, final int maxAvailabilities) {
		// Here we don't lock lines we just show the state at that time
		final var availableCreneaux = creneauDAO.findAll(Criterions.isEqualTo(CreneauFields.trhId, trhUid.getId()).and(Criterions.isNull(CreneauFields.recId)), DtListState.of(maxAvailabilities));
		return availableCreneaux;
	}

	public Optional<ReservationCreneau> reserverCreneau(final UID<TrancheHoraire> trhUid) {
		// Trouver un créneau sur une tranche : on utilise le mecanisme de lock de la BDD (for update skip locks)
		final var creneauOpt = creneauDAO.selectCreneauForUpdateByTrhId((Long) trhUid.getId());
		if (creneauOpt.isEmpty()) {
			//on a pas trouvé de creneau disponible à cette date
			return Optional.empty();

		}

		final var creneau = creneauOpt.get();
		creneau.trancheHoraire().load();
		final var trancheHoraire = creneau.trancheHoraire().get();
		//---

		final var reservationCreneau = prepareReservationCreneau(trancheHoraire);
		reservationCreneauDAO.create(reservationCreneau);

		creneau.reservationCreneau().setUID(reservationCreneau.getUID());
		creneauDAO.save(creneau);
		//---
		return Optional.of(reservationCreneau);
	}

	public ReservationCreneau reserverCreneauWithOverbooking(final UID<TrancheHoraire> trhUid) {
		final var reservationCreneauOpt = reserverCreneau(trhUid);
		if (reservationCreneauOpt.isPresent()) {
			return reservationCreneauOpt.get();
		}
		final var trancheHoraire = trancheHoraireDAO.get(trhUid);
		final var reservationCreneau = prepareReservationCreneau(trancheHoraire);
		reservationCreneauDAO.create(reservationCreneau);
		return reservationCreneau;
	}

	public DtList<ReservationCreneau> reserverCreneaux(final UID<TrancheHoraire> trhUid, final DtList<Creneau> creneaux) {
		Assertion.check()
				.isNotNull(trhUid)
				.isNotNull(creneaux);
		//---
		try (final VTransactionWritable tx = transactionManager.createAutonomousTransaction()) {
			final DtList<ReservationCreneau> reservationsCreneau = new DtList<>(ReservationCreneau.class);
			final var trancheHoraire = trancheHoraireDAO.get(trhUid);
			creneaux.stream()
					// First we ensure that all creneaux are associated with the provided tranche
					.peek(creneau -> {
						if (!trhUid.equals(creneau.trancheHoraire().getUID())) {
							throw new VSystemException("All creneau must be associated with the same tranche, the creneau with creId '{0}' doesn't", creneau.getCreId());
						}
					})
					.map(creneau -> prepareReservationCreneau(trancheHoraire))
					.collect(VCollectors.toDtList(ReservationCreneau.class));

			reservationCreneauDAO.insertReservationsCreneau(reservationsCreneau);
			IntStream.range(0, creneaux.size()).forEach(idx -> {
				final var creneau = creneaux.get(idx);
				creneau.reservationCreneau().setUID(reservationsCreneau.get(idx).getUID());
			});
			final var modifiedRows = agendaPAO.reserverCreneaux(creneaux);
			if (modifiedRows != creneaux.size()) {
				throw new VSystemException("Error reserving the provided creneau, none is reserved");
			}
			tx.commit();
			return reservationsCreneau;
		}

	}

	private ReservationCreneau prepareReservationCreneau(final TrancheHoraire trancheHoraire) {
		final var reservationCreneau = new ReservationCreneau();
		reservationCreneau.agenda().setUID(trancheHoraire.agenda().getUID());
		reservationCreneau.setDateLocale(trancheHoraire.getDateLocale());
		reservationCreneau.setMinutesDebut(trancheHoraire.getMinutesDebut());
		reservationCreneau.setMinutesFin(trancheHoraire.getMinutesFin());
		reservationCreneau.setInstantCreation(Instant.now());

		return reservationCreneau;
	}

	public void publishPlageHorairesAndRelinkReservation(final UID<Agenda> ageUid, final PublicationTrancheHoraireForm publicationTrancheHoraireForm) {

		//On change le status des trancheHoraires non publiées en masse (y compris celles planifiées)
		publishPlageHoraires(ageUid, publicationTrancheHoraireForm);

		//On pose le lien vers une reservation depuis le creneau
		relinkReservationsToCreneaux(ageUid, publicationTrancheHoraireForm.getDateLocaleDebut(), publicationTrancheHoraireForm.getDateLocaleFin());
	}

	private void publishPlageHoraires(final UID<Agenda> ageUid, final PublicationTrancheHoraireForm publicationTrancheHoraireForm) {
		//On change le status des trancheHoraires non publiées en masse (y compris celles planifiées)
		final var uiErrorBuilder = new UiErrorBuilder();
		final var decalageJours = ChronoUnit.DAYS.between(LocalDate.now(), publicationTrancheHoraireForm.getDateLocaleDebut());
		if (Math.abs(decalageJours) > PUBLISH_MAX_DAYS_FROM_NOW) { //abs : on autorise la publication de creneau passé
			uiErrorBuilder.addError(publicationTrancheHoraireForm, PublicationTrancheHoraireFormFields.dateLocaleDebut,
					LocaleMessageText.of("Vous ne pouvez pas publier des créneaux à plus d'1 an"));
		} else if (decalageJours < 0) { //on n'autorise pas la publication de creneau passé RDV-154
			uiErrorBuilder.addError(publicationTrancheHoraireForm, PublicationTrancheHoraireFormFields.dateLocaleDebut,
					LocaleMessageText.of("Vous ne pouvez pas publier des créneaux du passé"));
		}

		final var dureeJours = ChronoUnit.DAYS.between(publicationTrancheHoraireForm.getDateLocaleDebut(), publicationTrancheHoraireForm.getDateLocaleFin());
		if (dureeJours < 0) {//inferieur strictement
			uiErrorBuilder.addError(publicationTrancheHoraireForm, PublicationTrancheHoraireFormFields.dateLocaleFin,
					LocaleMessageText.of("La date de fin de la selection doit être postérieur à la date de début"));
		} else if (dureeJours > PUBLISH_MAX_DAYS_PERIODE) {
			uiErrorBuilder.addError(publicationTrancheHoraireForm, PublicationTrancheHoraireFormFields.dateLocaleFin,
					LocaleMessageText.of("Vous ne pouvez pas publier plus de 2 mois à la fois"));
		}
		if (!publicationTrancheHoraireForm.getPublishNow()) {
			uiErrorBuilder.checkFieldNotNull(publicationTrancheHoraireForm, PublicationTrancheHoraireFormFields.publicationDateLocale,
					LocaleMessageText.of("La date de publication est obligatoire"));
			uiErrorBuilder.checkFieldNotNull(publicationTrancheHoraireForm, PublicationTrancheHoraireFormFields.publicationMinutesDebut,
					LocaleMessageText.of("L'heure de publication est obligatoire"));
			if (publicationTrancheHoraireForm.getPublicationDateLocale() != null) {
				final var decalageJoursPublish = ChronoUnit.DAYS.between(LocalDate.now(), publicationTrancheHoraireForm.getPublicationDateLocale());
				if (decalageJoursPublish < 0) {
					uiErrorBuilder.addError(publicationTrancheHoraireForm, PublicationTrancheHoraireFormFields.publicationDateLocale,
							LocaleMessageText.of("Vous ne pouvez pas planifier la publication à une date dans le passé"));
				}
			}
		}
		uiErrorBuilder.throwUserExceptionIfErrors();

		Instant datePublication;
		if (publicationTrancheHoraireForm.getPublishNow()) {
			datePublication = Instant.now().plusSeconds(PUBLISH_NOW_DELAY_S);
		} else {

			final var localTime = LocalTime.ofSecondOfDay(publicationTrancheHoraireForm.getPublicationMinutesDebut() * 60l);
			final var publishLocalDateTime = LocalDateTime.of(publicationTrancheHoraireForm.getPublicationDateLocale(), localTime);

			//on suppose l'heure exprimée à paris par défaut
			String zonCd = "Europe/Paris";
			if (publicationTrancheHoraireForm.getPublicationZonCd() != null) {
				zonCd = publicationTrancheHoraireForm.getPublicationZonCd();
			}
			datePublication = publishLocalDateTime.atZone(ZoneId.of(zonCd)).toInstant();
		}
		uiErrorBuilder.throwUserExceptionIfErrors();
		/*****/
		//on planifie
		agendaPAO.publishTrancheHoraireByAgeId((Long) ageUid.getId(),
				publicationTrancheHoraireForm.getDateLocaleDebut(), publicationTrancheHoraireForm.getDateLocaleFin(),
				Instant.now(), datePublication);

		//on crée les créneaux en masse
		agendaPAO.createCreneauOfPublishedTrancheHoraireByAgeId((Long) ageUid.getId(),
				publicationTrancheHoraireForm.getDateLocaleDebut(), publicationTrancheHoraireForm.getDateLocaleFin(),
				datePublication);
	}

	/**
	 * Reassocie les creneaux publiés aux ReservationCreneaux existant.
	 * Utilisé après une publication de plage horaire pour rattacher les réservations préexistantes.
	 * ou après un import de réservation.
	 * @param ageUid Uid de l'agenda
	 * @param dateLocaleDebut Date de début
	 * @param dateLocaleFin Date de fin
	 */
	public void relinkReservationsToCreneaux(final UID<Agenda> ageUid, final LocalDate dateLocaleDebut, final LocalDate dateLocaleFin) {
		final var affectations = agendaPAO.getLinkReservationAfterPublishByAgeId((Long) ageUid.getId(), dateLocaleDebut, dateLocaleFin);
		final Set<String> affectedCreneau = new HashSet<>();
		for (final AffectionReservation affectation : affectations) {
			final var creIdsAsString = affectation.getCreIds().split(";");
			for (final String creIdAsString : creIdsAsString) {
				if (affectedCreneau.add(creIdAsString)) {
					affectation.setCreId(Long.valueOf(creIdAsString));
					break;
				}
			}
		}
		agendaPAO.linkCreneauToReservation(affectations);
	}

	public void supprimerReservationCreneau(final List<UID<ReservationCreneau>> recUids) {
		Assertion.check().isNotNull(recUids);
		//---
		agendaPAO.supprimerReservationsCreneau(
				recUids.stream()
						.map(UID::getId)
						.map(Long.class::cast)
						.collect(Collectors.toList()));
	}

	public Optional<TrancheHoraire> getTrancheHoraireIfExists(final UID<TrancheHoraire> trhUid) {
		return trancheHoraireDAO.findOptional(Criterions.isEqualTo(TrancheHoraireFields.trhId, trhUid.getId()));
	}

	/**
	 * Récupère les date disponibles d'un mois.
	 * N'affiche pas les disponibilités < date du jour.
	 *
	 * @param ageUid l'id d'agenda
	 * @param yearMonth le mois à afficher.
	 * @return la liste d'affichage
	 */
	public DtList<DateDisponibleDisplay> getDateDisponibleDisplayFuturOnly(final UID<Agenda> ageUid, final YearMonth yearMonth) {
		Assertion.check()
				.isNotNull(ageUid)
				.isNotNull(yearMonth);
		//-----
		if (yearMonth.isBefore(YearMonth.now())) { // mois passé, on affiche rien (et s'économise un appel base)
			return new DtList<>(DateDisponibleDisplay.class);
		}

		final var firstDayOfMonth = yearMonth.atDay(1);
		final LocalDate today = LocalDate.now();
		final var startLocaldate = firstDayOfMonth.isBefore(today) ? today : firstDayOfMonth; // on commence pas avant la date du jour

		return getDateDisponibleDisplay(ageUid, startLocaldate, yearMonth.atEndOfMonth());
	}

	public DtList<DateDisponibleDisplay> getDateDisponibleDisplay(final UID<Agenda> ageUid, final LocalDate startDate, final LocalDate endDate) {
		Assertion.check()
				.isNotNull(ageUid)
				.isNotNull(startDate)
				.isNotNull(endDate);
		//-----
		return agendaPAO.getDateDisponibleDisplayByAgeId((Long) ageUid.getId(), startDate, endDate, Instant.now());
	}

	public DtList<TrancheHoraireDisplay> getTrancheHoraireDisplayByDate(final UID<Agenda> agendaUid, final LocalDate localDate) {
		Assertion.check()
				.isNotNull(agendaUid)
				.isNotNull(localDate);
		//-----
		return agendaPAO.getTrancheHoraireDisplayByDate(agendaUid.getId(), localDate, Instant.now());
	}

	public void deleteEmptyAgenda(final UID<Agenda> agendaUid) {
		agendaDAO.delete(agendaUid);
	}

}
