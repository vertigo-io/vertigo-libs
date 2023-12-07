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
package io.vertigo.planning.agenda.controllers;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import io.vertigo.core.lang.VUserException;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.planning.agenda.domain.Agenda;
import io.vertigo.planning.agenda.domain.AgendaDisplayRange;
import io.vertigo.planning.agenda.domain.CreationPlageHoraireForm;
import io.vertigo.planning.agenda.domain.DefaultPlageHoraire;
import io.vertigo.planning.agenda.domain.DuplicationSemaineForm;
import io.vertigo.planning.agenda.domain.PlageHoraire;
import io.vertigo.planning.agenda.domain.PlageHoraireDisplay;
import io.vertigo.planning.agenda.domain.PublicationTrancheHoraireForm;
import io.vertigo.planning.agenda.domain.TrancheHoraire;
import io.vertigo.planning.agenda.domain.TrancheHoraireDisplay;
import io.vertigo.planning.agenda.services.PlanningServices;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextKey;
import io.vertigo.ui.impl.springmvc.argumentresolvers.ViewAttribute;
import io.vertigo.ui.impl.springmvc.controller.AbstractVSpringMvcController;

public class AbstractAgendaController extends AbstractVSpringMvcController {

	private static final int NB_JOURS_DUPLICATE = 6;
	private static final ViewContextKey<AgendaDisplayRange> agendaRangeKey = ViewContextKey.of("agendaRange");
	private static final ViewContextKey<PlageHoraireDisplay> plagesHoraireKey = ViewContextKey.of("plagesHoraire");
	private static final ViewContextKey<PlageHoraireDisplay> reservationOrphelinesKey = ViewContextKey.of("reservationOrphelines");

	//creation plage
	private static final ViewContextKey<DefaultPlageHoraire> defaultPlageHoraire = ViewContextKey.of("defaultPlageHoraire");
	private static final ViewContextKey<CreationPlageHoraireForm> creationPlageHoraireFormKey = ViewContextKey.of("creationPlageHoraireForm");

	//publish plage
	private static final ViewContextKey<PublicationTrancheHoraireForm> publicationTrancheHoraireFormKey = ViewContextKey.of("publicationTrancheHoraireForm");

	//detail plage
	private static final ViewContextKey<PlageHoraireDisplay> plageHoraireDetailKey = ViewContextKey.of("plageHoraireDetail");
	private static final ViewContextKey<TrancheHoraireDisplay> trancheHorairesKey = ViewContextKey.of("trancheHoraires");

	//duplication semaine
	private static final ViewContextKey<DuplicationSemaineForm> duplicationSemaineFormKey = ViewContextKey.of("duplicationSemaineForm");

	@Inject
	private PlanningServices planningServices;

	public void initContext(final ViewContext viewContext, final UID<Agenda> ageUid, final CreationPlageHoraireForm creationPlageHoraireForm, final DuplicationSemaineForm duplicationSemaineForm) {

		final var showDays = 6;
		final var todayDate = LocalDate.now();

		//---
		final var agendaDisplayRange = new AgendaDisplayRange();
		agendaDisplayRange.setAgeId(ageUid.getId());
		agendaDisplayRange.setShowDays(showDays);
		agendaDisplayRange.setMondayLock(true);

		//prépare le agendaDisplayRange, reload les creneaux et prepare la popin publish plage
		prepareContextAtDate(todayDate, agendaDisplayRange, ageUid, viewContext);

		//pour popin creation plage
		viewContext.publishDto(creationPlageHoraireFormKey, creationPlageHoraireForm);
		final var defaultPlageHoraires = planningServices.getDefaultPlageHoraireByAgenda(ageUid, todayDate.minusMonths(1), todayDate.plusMonths(3));
		viewContext.publishDtList(defaultPlageHoraire, defaultPlageHoraires);

		//pour popin detail plage avec la liste des tranches
		viewContext.publishDto(plageHoraireDetailKey, new PlageHoraireDisplay());
		viewContext.publishDtList(trancheHorairesKey, new DtList<>(TrancheHoraireDisplay.class));

		//pour popin duplication
		viewContext.publishDto(duplicationSemaineFormKey, duplicationSemaineForm);

	}

	@PostMapping("/_reload")
	public ViewContext reload(final ViewContext viewContext, @ViewAttribute("agendaRange") final AgendaDisplayRange agenda, @ViewAttribute("plageHoraireDetail") final PlageHoraireDisplay plageHoraireDetail) {
		prepareContextAtDate(agenda.getShowDate(), agenda, UID.of(Agenda.class, agenda.getAgeId()), viewContext);
		if (plageHoraireDetail.getPlhId() != null) {
			loadPlageHoraireDetail(viewContext, agenda, plageHoraireDetail.getPlhId());
		}
		return viewContext;
	}

	@PostMapping("/_semainePrecedente")
	public ViewContext semainePrecedente(final ViewContext viewContext, @ViewAttribute("agendaRange") final AgendaDisplayRange agenda) {
		prepareContextAtDate(agenda.getShowDate().minusWeeks(1), agenda, UID.of(Agenda.class, agenda.getAgeId()), viewContext);
		return viewContext;
	}

	@PostMapping("/_semaineSuivante")
	public ViewContext semaineSuivante(final ViewContext viewContext, @ViewAttribute("agendaRange") final AgendaDisplayRange agenda) {
		prepareContextAtDate(agenda.getShowDate().plusWeeks(1), agenda, UID.of(Agenda.class, agenda.getAgeId()), viewContext);
		return viewContext;
	}

	@PostMapping("/_createPlage")
	public ViewContext createPlage(final ViewContext viewContext, @ViewAttribute("agendaRange") final AgendaDisplayRange agenda,
			@ViewAttribute("creationPlageHoraireForm") final CreationPlageHoraireForm creationPlageHoraireForm) {
		final UID<Agenda> ageUid = UID.of(Agenda.class, agenda.getAgeId());
		planningServices.createPlageHoraire(ageUid, creationPlageHoraireForm);

		prepareContextAtDate(creationPlageHoraireForm.getDateLocale(), agenda, ageUid, viewContext);
		return viewContext;
	}

	@PostMapping("_prepareDuplicateSemaine")
	public ViewContext prepareDuplicateSemaine(final ViewContext viewContext, @ViewAttribute("agendaRange") final AgendaDisplayRange agendaRange,
			@ViewAttribute("duplicationSemaineForm") final DuplicationSemaineForm duplicationSemaineForm) {
		if (viewContext.getUiList(plagesHoraireKey).isEmpty()) {
			//erreur bloquante
			throw new VUserException("La semaine que vous souhaitez dupliquer n'a aucune plage horaire");
		}

		//par defaut
		//le modèle de la semaine à dupliquer permet de déterminer les jours travaillés, utilisés ci-dessous (ex : du lundi au vendredi)
		//la date de début correspond à la première date sans plages horaires sur le modèle de la semaine à dupliquer (en ne comptant que les jours travaillés)
		//la date de fin correspond à la date de début plus 6 jours (cela fait 1 semaine, car la date de fin est incluses)
		duplicationSemaineForm.setDateLocaleFromDebut(agendaRange.getFirstDate());
		duplicationSemaineForm.setDateLocaleFromFin(agendaRange.getLastDate());
		duplicationSemaineForm.setDateLocaleToDebut(planningServices.getPremierJourLibrePourDuplication(UID.of(Agenda.class, agendaRange.getAgeId()), agendaRange));
		duplicationSemaineForm.setDateLocaleToFin(duplicationSemaineForm.getDateLocaleToDebut().plusDays(NB_JOURS_DUPLICATE)); //1 semaine entiere (borne incluse)
		viewContext.publishDto(duplicationSemaineFormKey, duplicationSemaineForm);

		return viewContext;
	}

	@PostMapping("/_duplicateSemaine")
	public ViewContext duplicateSemaine(final ViewContext viewContext, @ViewAttribute("agendaRange") final AgendaDisplayRange agenda,
			@ViewAttribute("duplicationSemaineForm") final DuplicationSemaineForm duplicationSemaineForm) {
		final UID<Agenda> ageUid = UID.of(Agenda.class, agenda.getAgeId());
		planningServices.duplicateSemaine(ageUid, duplicationSemaineForm);
		prepareContextAtDate(duplicationSemaineForm.getDateLocaleToDebut(), agenda, ageUid, viewContext);
		return viewContext;
	}

	@PostMapping("/_publishPlage")
	public ViewContext publishPlage(final ViewContext viewContext, @ViewAttribute("agendaRange") final AgendaDisplayRange agenda,
			@ViewAttribute("publicationTrancheHoraireForm") final PublicationTrancheHoraireForm publicationTrancheHoraireForm) {

		final UID<Agenda> ageUid = UID.of(Agenda.class, agenda.getAgeId());
		planningServices.publishPlageHorairesAndRelinkReservation(ageUid, publicationTrancheHoraireForm);

		prepareContextAtDate(publicationTrancheHoraireForm.getDateLocaleDebut(), agenda, ageUid, viewContext);
		return viewContext;
	}

	@PostMapping("/_deletePlage")
	public ViewContext deletePlage(final ViewContext viewContext, @ViewAttribute("agendaRange") final AgendaDisplayRange agenda, @RequestParam("plhId") final Long plhId) {
		final UID<Agenda> ageUid = UID.of(Agenda.class, agenda.getAgeId());
		planningServices.deletePlageHoraireCascade(ageUid, UID.of(PlageHoraire.class, plhId));

		prepareContextAtDate(agenda.getShowDate(), agenda, ageUid, viewContext);
		return viewContext;
	}

	@PostMapping("/_loadPlageHoraireDetail")
	public ViewContext loadPlageHoraireDetail(final ViewContext viewContext, @ViewAttribute("agendaRange") final AgendaDisplayRange agenda, @RequestParam("plhId") final Long plhId) {
		final UID<Agenda> ageUid = UID.of(Agenda.class, agenda.getAgeId());
		final UID<PlageHoraire> plhUid = UID.of(PlageHoraire.class, plhId);
		final var plageHoraireDisplay = planningServices.getPlageHoraireDisplay(ageUid, plhUid);
		final var trancheHoraire = planningServices.getTrancheHoraireDisplayByPlage(ageUid, plhUid);

		viewContext.publishDto(plageHoraireDetailKey, plageHoraireDisplay);
		viewContext.publishDtList(trancheHorairesKey, trancheHoraire);
		return viewContext;
	}

	@PostMapping("/_deleteTrancheHoraire")
	public ViewContext deleteTrancheHoraire(final ViewContext viewContext, @ViewAttribute("agendaRange") final AgendaDisplayRange agenda, @ViewAttribute("plageHoraireDetail") final PlageHoraireDisplay plageHoraireDetail, @RequestParam("trhId") final Long trhId) {
		final UID<Agenda> ageUid = UID.of(Agenda.class, agenda.getAgeId());
		final UID<TrancheHoraire> trhUid = UID.of(TrancheHoraire.class, trhId);
		planningServices.closeTrancheHoraire(ageUid, trhUid);
		return loadPlageHoraireDetail(viewContext, agenda, plageHoraireDetail.getPlhId());
	}

	private void prepareContextAtDate(final LocalDate showDate, final AgendaDisplayRange agenda, final UID<Agenda> ageUid, final ViewContext viewContext) {
		agenda.setShowDate(showDate);
		agenda.setFirstDate(toPreviousMonday(showDate));
		agenda.setLastDate(agenda.getFirstDate().plusDays(agenda.getShowDays() - 1l));
		viewContext.publishDto(agendaRangeKey, agenda);
		viewContext.publishDto(publicationTrancheHoraireFormKey, preparePublicationTrancheHoraireForm(agenda));
		reloadPlageHoraires(viewContext, ageUid, agenda.getFirstDate(), agenda.getLastDate());
	}

	private static PublicationTrancheHoraireForm preparePublicationTrancheHoraireForm(final AgendaDisplayRange agendaRange) {
		//par defaut non renseigné : il faut regarder l'historique pour proposer par exemple : la semaine prochaine à 8h00
		final LocalDate today = LocalDate.now();
		final var publicationTrancheHoraireForm = new PublicationTrancheHoraireForm();
		publicationTrancheHoraireForm.setDateLocaleDebut(today.isAfter(agendaRange.getFirstDate()) ? today : agendaRange.getFirstDate()); //par défaut aujourd'hui->samedi
		publicationTrancheHoraireForm.setDateLocaleFin(agendaRange.getLastDate());
		//publicationTrancheHoraireForm.setPublicationDateLocale(toPreviousMonday(LocalDate.now().plusWeeks(1)));
		//publicationTrancheHoraireForm.setPublicationMinutesDebut(8 * 60);
		publicationTrancheHoraireForm.setPublishNow(false); //par défaut on planifie
		return publicationTrancheHoraireForm;
	}

	private void reloadPlageHoraires(final ViewContext viewContext, final UID<Agenda> agendaUid, final LocalDate firstDate, final LocalDate lastDate) {
		final var plagesHoraire = planningServices.getPlageHoraireDisplayByAgenda(agendaUid, firstDate, lastDate);
		viewContext.publishDtList(plagesHoraireKey, plagesHoraire);

		final var reservationOrphelines = planningServices.getReservationOrphelines(agendaUid, firstDate, lastDate);
		viewContext.publishDtList(reservationOrphelinesKey, reservationOrphelines);
	}

	private static LocalDate toPreviousMonday(final LocalDate localDate) {
		return localDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
	}
}
