package io.vertigo.planning.agenda.services.fo.plugin;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.commons.eventbus.EventBusSubscribed;
import io.vertigo.commons.transaction.Transactional;
import io.vertigo.connectors.redis.RedisConnector;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.analytics.trace.Trace;
import io.vertigo.core.daemon.DaemonScheduled;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.node.config.discovery.NotDiscoverable;
import io.vertigo.datamodel.criteria.Criterions;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.DtListState;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.planning.agenda.dao.AgendaDAO;
import io.vertigo.planning.agenda.dao.TrancheHoraireDAO;
import io.vertigo.planning.agenda.domain.Agenda;
import io.vertigo.planning.agenda.domain.CritereTrancheHoraire;
import io.vertigo.planning.agenda.domain.TrancheHoraire;
import io.vertigo.planning.agenda.services.TrancheHoraireEvent;
import io.vertigo.planning.agenda.services.TrancheHoraireEvent.HoraireImpacte;
import redis.clients.jedis.params.ScanParams;

@NotDiscoverable
public class RedisFoConsultationPlanningPlugin extends DbFoConsultationPlanningPlugin {

	private static final String SINGLE_JEDIS_NODE = "singleNode";
	private static final int SYNCHRO_FREQUENCE_SECOND = 60;
	private static final long EXPIRATION_DELAY_TRANCHE_HORAIRE_SECOND = SYNCHRO_FREQUENCE_SECOND + 60;

	private static final int EXPIRATION_DELAY_DATE_PREMIERE_DISPO_SECONDE = 15;
	private static final int EXPIRATION_DELAY_DATE_DERNIERE_PUBLI_SECONDE = 60;
	private static final long TTL_MINIMUM_TO_INCR_DISPO = 5;

	@Inject
	private RedisConnector redisConnector;

	@Inject
	private AgendaDAO agendaDAO;
	@Inject
	private TrancheHoraireDAO trancheHoraireDAO;
	@Inject
	private AnalyticsManager analyticsManager;

	private static final int MAX_LOOP = 100;

	@Trace(category = "redis", name = "getTrancheHoraireDisponibles")
	@Override
	public DtList<TrancheHoraire> getTrancheHoraireDisponibles(final CritereTrancheHoraire critereTrancheHoraire) {
		final var formatterLocaleDate = DateTimeFormatter.ofPattern("yyyyMMdd");
		final var tranchesResult = new DtList<TrancheHoraire>(TrancheHoraire.class);
		final LocalDate minDisplayDay = critereTrancheHoraire.getDateMin();
		int minDisplayMinute = critereTrancheHoraire.getMinutesMin();

		try (final var jedis = redisConnector.getClient(SINGLE_JEDIS_NODE)) {
			for (var jourToAdd = 0; jourToAdd < 7; ++jourToAdd) {
				final var localDateToLookup = critereTrancheHoraire.getPremierJour().plusDays(jourToAdd);
				if (localDateToLookup.isBefore(minDisplayDay)) {
					continue;
				} else if (!localDateToLookup.isEqual(minDisplayDay)) {
					//le minDisplayMinute ne sert que si localDateToLookup == minDisplayDay
					minDisplayMinute = 0;
				}

				for (final Long ageId : critereTrancheHoraire.getAgeIds()) {
					// on boucle sur les agendas
					final var prefixCleFonctionelle = ageId + ":" + formatterLocaleDate.format(localDateToLookup);
					var cursor = "0";
					final var scanParams = new ScanParams();
					scanParams.count(100);
					final int filterMinDisplayMinute = minDisplayMinute;
					var loop = 0;
					do {
						//
						final var scanResult = jedis.sscan(prefixCleFonctionelle + ":horaire", cursor, scanParams);
						cursor = scanResult.getCursor();
						scanResult.getResult()
								.stream()
								.map(minStr -> Integer.parseInt(minStr))
								.filter(minutesDebut -> minutesDebut >= filterMinDisplayMinute)
								.forEach(minutesDebut -> {
									final var infoTranche = jedis.hgetAll(prefixCleFonctionelle + ":" + minutesDebut);
									if (!infoTranche.isEmpty() && Integer.parseInt(infoTranche.get("nbDispos")) > 0) {
										tranchesResult.add(fromMapAndKey(minutesDebut, localDateToLookup, infoTranche));
									}
								});
						if (++loop > MAX_LOOP) {
							throw new VSystemException("Too many loop for " + localDateToLookup.toString());
						}
					} while (!"0".equals(cursor));
				}
			}
		}
		return tranchesResult;
	}

	private static TrancheHoraire fromMapAndKey(final int minutesDebut, final LocalDate localDate, final Map<String, String> hgetAll) {
		final var trancheHoraire = new TrancheHoraire();
		trancheHoraire.setTrhId(Long.valueOf(hgetAll.get("trhId")));
		trancheHoraire.setDateLocale(localDate);
		trancheHoraire.setMinutesDebut(minutesDebut);
		return trancheHoraire;
	}

	@Trace(category = "redis", name = "getDateDePremiereDisponibilite")
	@Override
	public Optional<LocalDate> getDateDePremiereDisponibilite(final CritereTrancheHoraire critereTrancheHoraire) {
		final var premierJour = critereTrancheHoraire.getPremierJour();
		final var formatterLocaleDate = DateTimeFormatter.ofPattern("yyyyMMdd");
		// we make a hascode of the list of ageId for the key, because here redis is a simple cache over the db
		final var keyProchaineDispo = critereTrancheHoraire.getAgeIds().hashCode() + ":" + formatterLocaleDate.format(premierJour) + ":prochaine-dispo";
		try (var jedis = redisConnector.getClient(SINGLE_JEDIS_NODE)) {
			final var prochaineDispo = jedis.get(keyProchaineDispo);
			if (prochaineDispo == null) {
				final var prochaineDispoDbOpt = super.getDateDePremiereDisponibilite(critereTrancheHoraire);
				prochaineDispoDbOpt.ifPresentOrElse(prochaineDispoDb -> {
					jedis.set(keyProchaineDispo, formatterLocaleDate.format(prochaineDispoDb));
				}, () -> {
					jedis.set(keyProchaineDispo, "none");
				});
				jedis.expire(keyProchaineDispo, EXPIRATION_DELAY_DATE_PREMIERE_DISPO_SECONDE);
				return prochaineDispoDbOpt;
			} else if ("none".equals(prochaineDispo)) {
				return Optional.empty();
			}
			return Optional.of(LocalDate.parse(prochaineDispo, formatterLocaleDate));
		}
	}

	@Trace(category = "redis", name = "getDateDeDernierePublication")
	@Override
	public Optional<LocalDate> getDateDeDernierePublication(final List<UID<Agenda>> agendaUids) {

		final var formatterLocaleDate = DateTimeFormatter.ofPattern("yyyyMMdd");
		final var keyDernierePublication = agendaUids.hashCode() + ":derniere-publication";
		try (var jedis = redisConnector.getClient(SINGLE_JEDIS_NODE)) {
			final var dateDernierePublication = jedis.get(keyDernierePublication);
			if (dateDernierePublication == null) {
				final var dernierePublicationDbOpt = super.getDateDeDernierePublication(agendaUids);
				dernierePublicationDbOpt.ifPresentOrElse(prochaineDispoDb -> {
					jedis.set(keyDernierePublication, formatterLocaleDate.format(prochaineDispoDb));
				}, () -> {
					jedis.set(keyDernierePublication, "none");
				});
				jedis.expire(keyDernierePublication, EXPIRATION_DELAY_DATE_DERNIERE_PUBLI_SECONDE);
				return dernierePublicationDbOpt;
			} else if ("none".equals(dateDernierePublication)) {
				return Optional.empty();
			}
			return Optional.of(LocalDate.parse(dateDernierePublication, formatterLocaleDate));
		}
	}

	@DaemonScheduled(name = "DmnSynchroDbRedisCreneau", periodInSeconds = SYNCHRO_FREQUENCE_SECOND)
	@Transactional
	public void synchroDbRedisCreneau() {
		// pour l'instant on prend toutes les agendas
		final var agendas = agendaDAO.findAll(Criterions.alwaysTrue(), DtListState.of(null));

		for (final Agenda agenda : agendas) {
			analyticsManager.trace("synchroagenda", agenda.getUID().urn(), tracer -> {
				final var trancheHoraires = trancheHoraireDAO.synchroGetTrancheHorairesByAgeId(agenda.getAgeId(), Instant.now());
				synchroDbRedisCreneauFromTrancheHoraire(Map.of(agenda.getAgeId(), trancheHoraires));
				tracer.incMeasure("nbDispos", 0) //pour init a 0
						.setTag("agenda", agenda.getUID().urn())
						.setMetadata("agendaName", agenda.getNom());
			});
		}
	}

	private void synchroDbRedisCreneauFromTrancheHoraire(final Map<Long, List<TrancheHoraire>> trancheHorairesByDemId) {
		final var formatterLocaleDate = DateTimeFormatter.ofPattern("yyyyMMdd");
		int nbTranches = 0;
		int sumAgeDispo = 0;
		int minAgeDispo = Integer.MAX_VALUE;
		int maxAgeDispo = -1;
		try (var jedis = redisConnector.getClient(SINGLE_JEDIS_NODE)) {
			for (final Entry<Long, List<TrancheHoraire>> trancheHoraireEntry : trancheHorairesByDemId.entrySet()) {
				for (final TrancheHoraire trancheHoraire : trancheHoraireEntry.getValue()) {
					final long time = System.currentTimeMillis();
					try (final var tx = jedis.multi()) {
						final var prefixCleFonctionelle = trancheHoraireEntry.getKey() + ":" + formatterLocaleDate.format(trancheHoraire.getDateLocale());
						final var cleFonctionelle = prefixCleFonctionelle + ":" + trancheHoraire.getMinutesDebut();
						tx.hset(cleFonctionelle, Map.of(
								"nbDispos", trancheHoraire.getNbGuichet().toString(), //pas vraiment le nombre de guichet, le select retourne le nombre de dispo
								"trhId", trancheHoraire.getTrhId().toString()));
						tx.expire(cleFonctionelle, EXPIRATION_DELAY_TRANCHE_HORAIRE_SECOND);
						tx.sadd(prefixCleFonctionelle + ":horaire", trancheHoraire.getMinutesDebut().toString());
						tx.expire(prefixCleFonctionelle + ":horaire", EXPIRATION_DELAY_TRANCHE_HORAIRE_SECOND);
						tx.exec();
					} finally {
						analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
								.incMeasure("sub_redis_duration", System.currentTimeMillis() - time)
								.incMeasure("sub_redis_count", 1));
					}
					if (trancheHoraire.getNbGuichet() > 0) {
						final int ageDispoSecond = (int) ChronoUnit.SECONDS.between(trancheHoraire.getInstantPublication(), Instant.now());
						++nbTranches;
						sumAgeDispo += ageDispoSecond;
						minAgeDispo = Math.min(ageDispoSecond, minAgeDispo);
						maxAgeDispo = Math.max(ageDispoSecond, maxAgeDispo);
						analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
								.incMeasure("nbDispos", trancheHoraire.getNbGuichet()));
					}
				}
			}
		}
		if (nbTranches > 0) {
			final int nbTranchesTracer = nbTranches;
			final int sumAgeDispoTracer = sumAgeDispo;
			final int minAgeDispoTracer = minAgeDispo;
			final int maxAgeDispoTracer = maxAgeDispo;
			analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer

					.setMeasure("nbTranches", nbTranchesTracer)
					.setMeasure("sumAgeDispo", sumAgeDispoTracer)
					.setMeasure("minAgeDispo", minAgeDispoTracer)
					.setMeasure("maxAgeDispo", maxAgeDispoTracer));
		}
	}

	private void synchroDbRedisCreneauFromHoraireImpacte(final Map<Long, List<HoraireImpacte>> horaireImpacteByDem) {
		final Map<Long, List<TrancheHoraire>> trancheHoraireByDemToResync = new HashMap<>();

		for (final Entry<Long, List<HoraireImpacte>> entry : horaireImpacteByDem.entrySet()) {
			final List<LocalDate> listDates = entry.getValue().stream()
					.map(HoraireImpacte::getLocalDate)
					.collect(Collectors.toList());
			final var trancheHoraires = trancheHoraireDAO.synchroGetTrancheHorairesByAgeIdAndDates(entry.getKey(), listDates, Instant.now());
			trancheHoraireByDemToResync.put(entry.getKey(), trancheHoraires);
		}
		synchroDbRedisCreneauFromTrancheHoraire(trancheHoraireByDemToResync);
	}

	@Transactional
	@EventBusSubscribed
	public void onTrancheHoraireEvent(final TrancheHoraireEvent trancheHoraireEvent) {
		try (var jedis = redisConnector.getClient(SINGLE_JEDIS_NODE)) {
			final boolean setZero;
			final int increment;
			switch (trancheHoraireEvent.getType()) {
				case SUPPRIME:
					setZero = true;
					increment = 0;
					break;
				case CONSOMME:
					setZero = false;
					increment = -1;
					break;
				case LIBERE:
					setZero = false;
					increment = 1;
					break;
				default:
					throw new VSystemException("type d'evenement de tranche horaire inconnu {0}", trancheHoraireEvent.getType());
			}
			final var formatterLocaleDate = DateTimeFormatter.ofPattern("yyyyMMdd");
			final Map<Long, List<HoraireImpacte>> horaireImpacteByDemToResync = new HashMap<>();
			for (final HoraireImpacte horaire : trancheHoraireEvent.getHoraires()) {
				final var prefixCleFonctionelle = horaire.getAgeId() + ":" + formatterLocaleDate.format(horaire.getLocalDate());
				final var cleFonctionelle = prefixCleFonctionelle + ":" + horaire.getMinutesDebut();
				final long ttl = jedis.ttl(cleFonctionelle);
				if (ttl < TTL_MINIMUM_TO_INCR_DISPO) { //si le creneau n'est plus là, ou si il expire dans moins de 5s, on ne fait pas de incr, on lance la resynchro
					horaireImpacteByDemToResync.computeIfAbsent(horaire.getAgeId(), (demid) -> new ArrayList<>())
							.add(horaire);
				} else {
					long newVal = 0;
					if (!setZero) {
						newVal = jedis.hincrBy(cleFonctionelle, "nbDispos", increment);
					}
					if (setZero || newVal < 0) {
						jedis.hset(cleFonctionelle, "nbDispos", "0");
					}
				}
			}
			if (!horaireImpacteByDemToResync.isEmpty()) {
				synchroDbRedisCreneauFromHoraireImpacte(horaireImpacteByDemToResync);
			}
		}

	}
}
