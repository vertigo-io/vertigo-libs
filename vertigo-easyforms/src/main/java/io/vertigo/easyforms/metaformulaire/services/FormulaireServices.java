package io.vertigo.easyforms.metaformulaire.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.function.IntPredicate;
import java.util.function.Predicate;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.inject.Inject;

import fr.gouv.interieur.rdvpref.demarche.domain.Demarche;
import fr.gouv.interieur.rdvpref.referentiel.i18n.MetaFormulaireResources;
import fr.gouv.interieur.rdvpref.reservation.domain.Reservation;
import io.vertigo.commons.eventbus.EventBusManager;
import io.vertigo.commons.transaction.Transactional;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.Component;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.structure.definitions.ConstraintException;
import io.vertigo.datamodel.structure.definitions.FormatterException;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.easyforms.metaformulaire.domain.ControleDeChampDefinitionProvider.ControleDeChampEnum;
import io.vertigo.easyforms.metaformulaire.domain.ModeleFormulaire;
import io.vertigo.easyforms.metaformulaire.domain.ModeleFormulaire.Champ;
import io.vertigo.easyforms.metaformulaire.domain.TypeDeChamp;
import io.vertigo.easyforms.metaformulaire.domain.TypeDeChampDefinitionProvider;
import io.vertigo.easyforms.smarttypes.Formulaire;
import io.vertigo.easyforms.smarttypes.FormulaireDemarche;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.ValidationUserException;

@Transactional
public class FormulaireServices implements Component {

	private static final String FORMULAIRE_PREFIX = "formulaire_";
	private static final String ERREUR_CONTROLE_FORMULAIRE_MEASURE = "erreurControleFormulaire";

	private static final int MIN_DELAY_DISPONIBILITE_MINUTE = 30; //delais minimum : on ne check que les creneaux à venir ou à moins 30min par rapport à now()
	private static final int MIN_MINUTES_OF_DAY = 0;

	private static final int AGE_13_ANS = 13;
	private static final int AGE_16_ANS = 16;
	private static final int AGE_MAJORITE = 18;

	//vérifie qu'on a +33 ou 0033 ou 0 + 9 chiffres . peut avoir des () des . ou des espaces. doit finir par 2 chiffres consécutifs
	public static final Predicate<String> PREDICATE_TELEPHONE_FR = Pattern.compile("^((((?:\\+|00)33\\W*)|0)[1-9](?:\\W*\\d){7}\\d)$").asMatchPredicate();

	//FR mobile : +33|0 puis 6 ou 7
	//Les numéros mobiles outre mer:
	//+590 690 (Guadeloupe)
	//+594 694 (Guyane)
	//+596 696 (Martinique)
	//+262 639 (Mayotte)
	//+262 692 (La Réunion)
	//+262 693 (La Réunion)
	//+508 (Saint-Pierre-et-Miquelon)
	//+689 (Polynésie française)
	//+681 (Wallis et Futuna)
	//+687 (Nouvelle Calédonie)
	public static final Predicate<String> PREDICATE_TELEPHONE_SMS = Pattern.compile(
			"^(?:(((?:(?:\\+|00)33\\W*)|0)[67](?:\\W*\\d){7}\\d)"
					+ "|(((?:\\+|00)590\\W*)6\\W*9\\W*0(?:\\W*\\d){5}\\d)"
					+ "|(((?:\\+|00)594\\W*)6\\W*9\\W*4(?:\\W*\\d){5}\\d)"
					+ "|(((?:\\+|00)596\\W*)6\\W*9\\W*6(?:\\W*\\d){5}\\d)"
					+ "|(((?:\\+|00)262\\W*)6\\W*(?:3\\W*9|9\\W*2|9\\W*3)(?:\\W*\\d){5}\\d)"
					+ "|(((?:\\+|00)(?:508|689|681|687)\\W*)[0-9](?:\\W*\\d){7}\\d))$")
			.asMatchPredicate();

	private static final Set<String> EMAIL_DOMAIN_BLACK_LIST = Set.of("yopmail.com", "yopmail.net", "mailinator.com", "jetable.org", "trashmail.com", "throwawaymail.com", "emailondeck.com", "emailfake.com");

	@Inject
	private SmartTypeManager smartTypeManager;
	@Inject
	private VTransactionManager transactionManager;
	@Inject
	private EventBusManager eventBusManager;
	@Inject
	private AnalyticsManager analyticsManager;

	public void checkFormulaire(Entity formulaireOwner, final Formulaire formulaire, final ModeleFormulaire modeleFormulaire, final UiMessageStack uiMessageStack) {
		final Set<String> champsAutorises = modeleFormulaire.getChamps().stream().map(Champ::getCodeChamp).collect(Collectors.toSet());
		for (final String champFormulaire : formulaire.keySet()) {
			if (!champsAutorises.contains(champFormulaire)) {
				uiMessageStack.error("Champ non autorisé ", formulaireOwner, FORMULAIRE_PREFIX + champFormulaire);
			}
		}
		//---
		final var formulaireCore = new Formulaire();
		final var formulaireDisplay = new Formulaire();

		final List<Formulaire> formulaireUniques = new ArrayList<>();
		final List<Champ> champUniques = new ArrayList<>();
		for (final Champ champ : modeleFormulaire.getChamps()) {
			checkChampFormulaire(champ, formulaireOwner, uiMessageStack, formulaireCore, formulaireDisplay, champUniques, formulaireUniques);
		}

		//on fait les contrôles d'unicités en masse qui si tout est bon
		if (!uiMessageStack.hasErrors() && !formulaireUniques.isEmpty()) {
			checkUnique(formulaireUniques, champUniques, formulaireOwner.getUID(), uiMessageStack,
					MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_UNIQUE_ERROR, reservation);
		}

		//---
		if (uiMessageStack.hasErrors()) {
			throw new ValidationUserException();
		}

		//on dénormalise les champs importants: nom, prenom, email, formulaireDisplay
		// si on a un champ téléphone on le dénormalise pour le rappel (on prend le premier)
		modeleFormulaire.getChamps()
				.stream()
				.filter(champ -> TypeDeChampDefinitionProvider.TYPE_TELEPHONE.equals(champ.getTypeChamp()))
				.findFirst()
				.ifPresent(champ -> formulaireCore.put("telSms", reservation.getFormulaire().get(champ.getCodeChamp()))); // dans le formulaire on a la valeur du champ bien formattée

		reservation.setFormulaireCore(formulaireCore);
		reservation.setFormulaireDisplay(formulaireDisplay);
	}

	private void checkChampFormulaire(final Champ champ, final Reservation reservation, final UiMessageStack uiMessageStack, final FormulaireDemarche formulaireCore, final FormulaireDemarche formulaireDisplay, final List<Champ> champUniques, final List<FormulaireDemarche> formulaireUniques) {
		final var typeChamp = getTypeDeChampByNom(champ.getTypeChamp());
		final var smartTypeDefinition = getSmartTypeByNom(typeChamp.getSmartType());
		final var inputValue = reservation.getFormulaire().get(champ.getCodeChamp());
		if (inputValue == null || inputValue.isBlank()) {
			if (!champ.getControleDeChamps().contains(ControleDeChampEnum.Optionel.name())) {
				uiMessageStack.error("Le champ doit être renseigné", reservation, FORMULAIRE_PREFIX + champ.getCodeChamp());
				analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
						.incMeasure(ERREUR_CONTROLE_FORMULAIRE_MEASURE, 1)
						.setTag("controle", "Obligatoire")
						.setTag("champ", champ.getLibelle()));
			}
		} else {
			try {
				//on ne fait aucun check si le champ est null
				final var typedValue = smartTypeManager.stringToValue(smartTypeDefinition, inputValue);
				final var formatedValue = smartTypeManager.valueToString(smartTypeDefinition, typedValue);
				reservation.getFormulaire().put(champ.getCodeChamp(), formatedValue);

				smartTypeManager.validate(smartTypeDefinition, Cardinality.OPTIONAL_OR_NULLABLE, typedValue);
				verifierControleDeChamps(champ, typedValue, reservation, uiMessageStack);

				//on dénormalise les champs display: nom, prenom, email, formulaireDisplay et formulaireUnicite
				if (champ.isDisplay()) {
					if (champ.isDefault()) {
						formulaireCore.put(champ.getCodeChamp(), formatedValue);
					} else {
						formulaireDisplay.put(champ.getLibelle(), formatedValue);
					}
				}

				//on dénormalise les champs d'unicite
				if (champ.getControleDeChamps().contains(ControleDeChampEnum.Unique.name())) {
					champUniques.add(champ);
					final var formulaireDemarche = new FormulaireDemarche();
					formulaireDemarche.put(champ.getCodeChamp(), formatedValue);
					formulaireUniques.add(formulaireDemarche);
				}
			} catch (final FormatterException e) {
				uiMessageStack.error(e.getMessageText().getDisplay(), reservation, FORMULAIRE_PREFIX + champ.getCodeChamp());
				analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
						.incMeasure(ERREUR_CONTROLE_FORMULAIRE_MEASURE, 1)
						.setTag("controle", "Formatter")
						.setTag("smartType", smartTypeDefinition.id().shortName())
						.setTag("champ", champ.getLibelle()));
			} catch (final ConstraintException e) {
				uiMessageStack.error(e.getMessageText().getDisplay(), reservation, FORMULAIRE_PREFIX + champ.getCodeChamp());
				analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
						.incMeasure(ERREUR_CONTROLE_FORMULAIRE_MEASURE, 1)
						.setTag("controle", "Constraints")
						.setTag("smartType", smartTypeDefinition.id().shortName())
						.setTag("champ", champ.getLibelle()));
			}
		}
	}

	private void verifierControleDeChamps(final Champ champ, final Object typedValue, final Reservation reservation, final UiMessageStack uiMessageStack) {
		for (final String controlesDeChamp : champ.getControleDeChamps()) {
			//on tente le valueOf de l'enum malgres l'exception car il ne faut pas manquer de contrôles, et le code doit être maitrisée
			var controlePasse = false;
			switch (ControleDeChampEnum.valueOf(controlesDeChamp)) {
				case AgdrefPresent:
					controlePasse = checkAgdrefPresent((String) typedValue, uiMessageStack,
							MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_AGDREF_PRESENT_ERROR, reservation, champ.getCodeChamp());
					break;
				case FinValiditeAgdref6mois:
					controlePasse = checkFinValiditeAgdref6mois((String) typedValue, uiMessageStack,
							MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_FIN_VALIDITE_AGDREF_6MOIS_ERROR, reservation, champ.getCodeChamp());
					break;
				case EmailNotInBlackList:
					controlePasse = checkEmailNotInBlackList((String) typedValue, uiMessageStack,
							MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_EMAIL_NOT_IN_BLACK_LIST_ERROR, reservation, champ.getCodeChamp());
					break;
				case EmailGouvFr:
					controlePasse = checkEmailGouvFr((String) typedValue, uiMessageStack,
							MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_EMAIL_GOUV_FR_ERROR, reservation, champ.getCodeChamp());
					break;
				case GTE13ans:
					controlePasse = checkAgeRevolu((LocalDate) typedValue, reservation.getDateLocale(), age -> age >= AGE_13_ANS, uiMessageStack,
							MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_G_T_E_13ANS_ERROR, reservation, champ.getCodeChamp());
					break;
				case GTE16ans:
					controlePasse = checkAgeRevolu((LocalDate) typedValue, reservation.getDateLocale(), age -> age >= AGE_16_ANS, uiMessageStack,
							MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_G_T_E_16ANS_ERROR, reservation, champ.getCodeChamp());
					break;
				case LT16ans:
					controlePasse = checkAgeRevolu((LocalDate) typedValue, reservation.getDateLocale(), age -> age < AGE_16_ANS, uiMessageStack,
							MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_L_T_16ANS_ERROR, reservation, champ.getCodeChamp());
					break;
				case GTE18ans:
					controlePasse = checkAgeRevolu((LocalDate) typedValue, reservation.getDateLocale(), age -> age >= AGE_MAJORITE, uiMessageStack,
							MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_G_T_E_18ANS_ERROR, reservation, champ.getCodeChamp());
					break;
				case LT18ans:
					controlePasse = checkAgeRevolu((LocalDate) typedValue, reservation.getDateLocale(), age -> age < AGE_MAJORITE, uiMessageStack,
							MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_L_T_18ANS_ERROR, reservation, champ.getCodeChamp());
					break;
				case LTE18ans:
					controlePasse = checkAgeRevolu((LocalDate) typedValue, reservation.getDateLocale(), age -> age <= AGE_MAJORITE, uiMessageStack,
							MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_L_T_E_18ANS_ERROR, reservation, champ.getCodeChamp());
					break;
				case TelephoneFr:
					controlePasse = checkTelephoneFr((String) typedValue, uiMessageStack,
							MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_TELEPHONE_FR_ERROR, reservation, champ.getCodeChamp());
					break;
				case TelephoneMobileSms:
					controlePasse = checkTelephoneMobileSms((String) typedValue, uiMessageStack,
							MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_TELEPHONE_MOBILE_SMS_ERROR, reservation, champ.getCodeChamp());
					break;
				case CodeDepartement:
					controlePasse = checkCodeDepartement((String) typedValue, uiMessageStack,
							MetaFormulaireResources.RDVPREF_FORMULAIRE_CONTROLE_CODE_DEPARTEMENT_ERROR, reservation, champ.getCodeChamp());
					break;
				case Unique:
					//Le contrôle d'unicité est réalisé de manière ensembliste ensuite et si tous les autres contrôles sont passés
					controlePasse = true;
					break;
				case Optionel:
					controlePasse = true;
					break;
				default:
					throw new IllegalArgumentException("Contrôle de champ inconnu " + controlesDeChamp);
			}
			if (!controlePasse) {
				analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
						.incMeasure(ERREUR_CONTROLE_FORMULAIRE_MEASURE, 1)
						.setTag("controle", controlesDeChamp)
						.setTag("champ", champ.getLibelle()));

				break; //si un contrôle ne passe pas sur un champ, on passe au champ suivant
			}
		}
	}

	private boolean checkUnique(
			final List<FormulaireDemarche> formulaireUniqueSplit,
			final List<Champ> champUniques,
			final UID<Demarche> demUid,
			final UiMessageStack uiMessageStack,
			final MetaFormulaireResources metaFormulaireResource,
			final Reservation reservation) {
		//RDV-221 : on prend le TimeZone du site de la demarche
		reservation.siteGeographique().load();
		final var zoneId = ZoneId.of(reservation.siteGeographique().get().getZoneId());
		final var nowDateTime = Instant.now().atZone(zoneId);
		final var currentMinutesOfDay = nowDateTime.getHour() * 60 + nowDateTime.getMinute();
		//on garde un delai minimum : l'unicité prend en compte les creneaux à venir ou dépassés depuis moins de 30 minutes
		final var queryMinutesOfDay = Math.max(currentMinutesOfDay - MIN_DELAY_DISPONIBILITE_MINUTE, MIN_MINUTES_OF_DAY);

		final var reservationDoublon = reservationDAO.getFirstReservationUniqueDoublon(reservation.getResId(), (Long) demUid.getId(), nowDateTime.toLocalDate(), queryMinutesOfDay, formulaireUniqueSplit);
		if (reservationDoublon.isEmpty()) {
			return true;
		}
		final var labelField = champUniques.stream()
				.map(Champ::getLibelle)
				.collect(Collectors.joining(" ou "));

		for (final Champ champUnique : champUniques) {
			//Pour le message d'erreur unique : 0 : nom de la démarche, 1 label du champs non unique
			uiMessageStack.error(LocaleMessageText.of(metaFormulaireResource, reservation.getNomDemarche(), labelField).getDisplay(), reservation, FORMULAIRE_PREFIX + champUnique.getCodeChamp());
		}

		final var codeField = champUniques.stream()
				.map(Champ::getCodeChamp)
				.collect(Collectors.joining(","));
		analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
				.incMeasure(ERREUR_CONTROLE_FORMULAIRE_MEASURE, 1)
				.setTag("controle", "Unique")
				.setTag("champ", codeField));
		return false;
	}

	private static boolean checkTelephoneFr(
			final String telephone,
			final UiMessageStack uiMessageStack,
			final MetaFormulaireResources metaFormulaireResource,
			final Reservation reservation, final String codeChamp) {
		if (PREDICATE_TELEPHONE_FR.test(telephone)) {
			return true;
		}
		uiMessageStack.error(LocaleMessageText.of(metaFormulaireResource).getDisplay(), reservation, FORMULAIRE_PREFIX + codeChamp);
		return false;
	}

	private static boolean checkTelephoneMobileSms(
			final String telephone,
			final UiMessageStack uiMessageStack,
			final MetaFormulaireResources metaFormulaireResource,
			final Reservation reservation, final String codeChamp) {
		if (PREDICATE_TELEPHONE_SMS.test(telephone)) {
			return true;
		}
		uiMessageStack.error(LocaleMessageText.of(metaFormulaireResource).getDisplay(), reservation, FORMULAIRE_PREFIX + codeChamp);
		return false;
	}

	private static boolean checkAgeRevolu(
			final LocalDate dateNaissance,
			final LocalDate dateRdv,
			final IntPredicate ageValidator,
			final UiMessageStack uiMessageStack,
			final MetaFormulaireResources metaFormulaireResource,
			final Reservation reservation,
			final String codeChamp) {
		final var age = Period.between(dateNaissance, dateRdv).getYears();
		if (ageValidator.test(age)) {
			return true;
		}
		uiMessageStack.error(LocaleMessageText.of(metaFormulaireResource).getDisplay(), reservation, FORMULAIRE_PREFIX + codeChamp);
		return false;
	}

	private static boolean checkEmailNotInBlackList(
			final String email,
			final UiMessageStack uiMessageStack,
			final MetaFormulaireResources metaFormulaireResource,
			final Reservation reservation,
			final String codeChamp) {
		final int arobaIndex = email.indexOf('@');//le format a été vérifié
		final String emailDomain = email.substring(arobaIndex + 1).toLowerCase(Locale.ROOT);
		if (!EMAIL_DOMAIN_BLACK_LIST.contains(emailDomain)) {
			return true;
		}
		uiMessageStack.error(LocaleMessageText.of(metaFormulaireResource).getDisplay(), reservation, FORMULAIRE_PREFIX + codeChamp);
		return false;
	}

	private static boolean checkEmailGouvFr(
			final String email,
			final UiMessageStack uiMessageStack,
			final MetaFormulaireResources metaFormulaireResource,
			final Reservation reservation,
			final String codeChamp) {
		if (email.toLowerCase(Locale.ROOT).endsWith(".gouv.fr")) {
			return true;
		}
		uiMessageStack.error(LocaleMessageText.of(metaFormulaireResource).getDisplay(), reservation, FORMULAIRE_PREFIX + codeChamp);
		return false;
	}

	private boolean checkFinValiditeAgdref6mois(
			final String numAgdref,
			final UiMessageStack uiMessageStack,
			final MetaFormulaireResources metaFormulaireResource,
			final Reservation reservation,
			final String codeChamp) {
		final var agdref = agdrefServices.searchAgdrefByNumero(numAgdref);
		if (agdref.isPresent()) {
			final var dateLimite = agdref.get().getEndDateValidity().minusMonths(6);
			if (LocalDate.now().isAfter(dateLimite)) { // il faut : now <= dateLimite
				return true;
			}
		}
		uiMessageStack.error(LocaleMessageText.of(metaFormulaireResource).getDisplay(), reservation, FORMULAIRE_PREFIX + codeChamp);
		return false;
	}

	private boolean checkAgdrefPresent(
			final String numAgdref,
			final UiMessageStack uiMessageStack,
			final MetaFormulaireResources metaFormulaireResource,
			final Reservation reservation,
			final String codeChamp) {
		final var agdref = agdrefServices.searchAgdrefByNumero(numAgdref);
		if (agdref.isPresent()) {
			return true;
		}
		uiMessageStack.error(LocaleMessageText.of(metaFormulaireResource).getDisplay(), reservation, FORMULAIRE_PREFIX + codeChamp);
		return false;
	}

	private boolean checkCodeDepartement(
			final String codePostal,
			final UiMessageStack uiMessageStack,
			final MetaFormulaireResources metaFormulaireResource,
			final Reservation reservation,
			final String codeChamp) {
		reservation.siteGeographique().load();
		final var siteGeographique = reservation.siteGeographique().get();
		if (codePostal.startsWith(extractDepCd(siteGeographique.getCode()))) {
			return true;
		}
		uiMessageStack.error(LocaleMessageText.of(metaFormulaireResource).getDisplay(), reservation, FORMULAIRE_PREFIX + codeChamp);
		return false;
	}

	private String extractDepCd(final String codePostal) {
		Assertion.check()
				.isNotBlank(codePostal)
				.isTrue(codePostal.length() >= 3, "Le code postal doit avoir plus de 3 chiffres pour extraire le code département");
		//le code département prend les 2 premiers chiffres du code postal, sauf pour outre-mer on en prend 3 : https://fr.wikipedia.org/wiki/Num%C3%A9rotation_des_d%C3%A9partements_fran%C3%A7ais
		return codePostal.substring(0, codePostal.startsWith("97") || codePostal.startsWith("98") ? 3 : 2);
	}

	private static TypeDeChamp getTypeDeChampByNom(final String nomTypeDeChamp) {
		return Node.getNode().getDefinitionSpace().resolve(nomTypeDeChamp, TypeDeChamp.class);
	}

	private static SmartTypeDefinition getSmartTypeByNom(final String nomSmartType) {
		return Node.getNode().getDefinitionSpace().resolve(nomSmartType, SmartTypeDefinition.class);
	}

}
