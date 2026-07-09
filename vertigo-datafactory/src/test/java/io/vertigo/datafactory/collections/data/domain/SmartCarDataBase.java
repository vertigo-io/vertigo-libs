/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.datafactory.collections.data.domain;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import io.vertigo.datafactory.impl.collections.functions.filter.DtListPatternFilterUtil;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datamodel.data.util.VCollectors;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;

/**
 * Base de données des voitures.
 *
 * @author pchretien
 */
public final class SmartCarDataBase {

	private static final SmartTypeDefinition TAGS_SMART_TYPE = DataModelUtil.findDataDefinition(SmartCar.class).getField("tags").smartTypeDefinition();

	private final List<SmartCar> cars;

	public SmartCarDataBase() {
		long id = 0;
		cars = List.of(
				createSmartCar(id++, "Peugeot", 2002,
						"Vds 307SW année 2002 137000 kms, gris métal, clim, CD, jantes alu, toit panoramique, 7 places (6 sièges), pneus neiges offerts, CT OK, TBE",
						"7 places|gris métal|clim|toit panoramique"),
				createSmartCar(id++, "Audi", 2006,
						"AUDI A3 S LINE TDI 1.9L 105ch 115 000 KM, Jantes 18, Intérieur semi cuir, noir, Feux automatique, Détecteur de pluie, Accoudoir central, Courroie de distribution neuve, Pneus avant récent",
						"Jantes 18|semi cuir|Feux automatique"),
				createSmartCar(id++, "Volkswagen", 2010,
						"NOUVEAU MOTEUR COMMON RAIL : plus silencieux et plus coupleux que les injecteurs-pompes...LE SEUL COUPE/CABRIOLET AVEC TOIT OUVRANT VERRE ELECTRIQUE... , Sièges chauffants, Ordinateur de bord",
						"Sièges chauffants|Ordinateur de bord|toit ouvrant"),
				createSmartCar(id++, "Peugeot", 2001, "7 Places, Sièges cuir, Attelage, l'avenir est à nous",
						"7 places|Sièges cuir|Attelage"),
				createSmartCar(id++, "Hyundai", 2004, "TRES BON ETAT, gris métal, Sièges chauffants, 4 roues motrices",
						"gris métal|Sièges chauffants|4 roues motrices"),
				createSmartCar(id++, "Volkswagen", 2006,
						"volskwagen noir/carnet d'entretien a jour ww/ toit ouvrant elect/ intr cuir/esp/hold parck/ordinateur de bord/ouverture de coffre commande a distance/etat impecable",
						"cuir|toit ouvrant|ordinateur de bord"),
				createSmartCar(id++, "Lancia", 2009,
						"Catégorie partenaire : voiture occasion RARE SUR LE MARCHE DE L'OCCASION : LANCIA DELTA Di Lusso 1-4 t-jet ETAT IMPECCABLE FULL OPTIONS Planche de bord et sièges en cuir poltrona frau Magic Parking ( le véhicule fait son créneau sans toucher au volant, Double sortie d'échappement, Banquette arrière coulissante, Système blue and me ( USB)",
						"cuir|Magic Parking|USB"),
				createSmartCar(id++, "Peugeot", 1999,
						"phare devil eyes, sieges, baquet omp, Intérieur cuir, pommeau de vitesse + pedale omp, volant racing, jante tole 106, rallye avec pneu , quasi neuf michelin, par choc avant+ arriere rallye, Kita admission , direct green, barre anti , raprochement omp, vidange faite final récemment par mes final soins tout , filtre changer, ligne avec final échappement récent , amortisseur combiné filetté",
						"Intérieur cuir|jantes|rallye"),
				createSmartCar(id++, "Peugeot", 1998, "bon état, CD MP3 neuf, Attelage, garage s'abstenir",
						"Attelage|CD MP3"));
	}

	private static SmartCar createSmartCar(
			final long id,
			final String manufacturer,
			final int year,
			final String description,
			final String tags) {
		final SmartCar car = new SmartCar();
		car.setId(id);
		car.setManufacturer(manufacturer);
		car.setYear(year);
		car.setDescription(description);
		car.setTags(tags);
		return car;
	}

	public long size() {
		return cars
				.size();
	}

	public DtList<SmartCar> getAllCars() {
		return cars
				.stream()
				.collect(VCollectors.toDtList(SmartCar.class));
	}

	public List<SmartCar> getCarsByManufacturer(final String manufacturer) {
		return cars
				.stream()
				.filter(car -> car.getManufacturer().toLowerCase(Locale.FRENCH).equals(manufacturer))
				.toList();
	}

	public long getCarsBefore(final int year) {
		return cars
				.stream()
				.filter(car -> car.getYear() <= year)
				.count();
	}

	public List<SmartCar> getCarsByDescription(final String... keywords) {
		return cars
				.stream()
				.filter(car -> {
					final var description = car.getDescription();
					for (final String keyword : keywords) {
						if (description.contains(keyword)) {
							return true;
						}
					}
					return false;
				})
				.toList();
	}

	/**
	 * Retourne les voitures possédant au moins un des tags pipe-séparés (OR).
	 */
	public List<SmartCar> getCarsByTag(final String... tags) {
		return cars
				.stream()
				.filter(car -> Arrays.stream(tags)
						.anyMatch(tag -> Arrays.asList(DtListPatternFilterUtil.tokenizedIndexValue(TAGS_SMART_TYPE, car.getTags())).contains(tag)))
				.toList();
	}
}
