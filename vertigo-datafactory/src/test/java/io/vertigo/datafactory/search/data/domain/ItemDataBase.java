/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.datafactory.search.data.domain;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.Normalizer;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

/**
 * database of items.
 *
 *
 * @author pchretien
 */
public final class ItemDataBase {

	private final List<Item> items;

	/**
	 * Constructor.
	 */
	public ItemDataBase() {
		//long id, int price, String manufacturer, String model, int year, String motorType, int kilo, double consommation, String description, Long optionalNumber, String optionalString, String localisation) {
		items = List.of( //http://www.papauto.com/
				createItem(10, 4600, "Peugeot", "307 sw", 2002, "essence", 137000, 9,
						"Vds 307SW année 2002 137000 kms, gris métal, clim, CD, jantes alu, toit panoramique, 7 places (6 sièges) + pneus neiges offerts CT OK TBE", null, "Aaa Zzz",
						"48.767821,2.236430"), //u09t6vut0sep

				createItem(11, 13500, "Audi", "A3 S LINE", 2006, "diesel", 115000, 5.6,
						"Vds AUDI A3 S LINE TDI 1.9L 105ch 115 000 KM - Jantes 18 Intérieur semi cuir noir Feux automatique final Détecteur de pluie final Accoudoir central Courroie de distribution neuve final Pneus avant récent",
						0L, "Bbb Yyy", "48.786521, 2.230400"), //u09tdc24h4dv

				createItem(12, 28500, "Volkswagen", "Eos TDI 140 CARAT DSG", 2010, "diesel", 4590, 6.7,
						"NOUVEAU MOTEUR COMMON RAIL : plus silencieux et plus coupleux que les injecteurs-pompes...LE SEUL COUPE/CABRIOLET AVEC TOIT OUVRANT VERRE ELECTRIQUE... , Sièges chauffants, Ordinateur de bord",
						null, null, "48.767935, 2.266623"), //u09t7tftb1ux

				createItem(1020, 4400, "Peugeot", "806 final ST PACK", 2001, "diesel", 205000, 6.7, "7 Places, Sièges cuir, Attelage, l'avenir est à nous", null, null, null),
				createItem(1030, 109000, "Hyundai", "Tucson 2.0 CRDi Pack Luxe BA", 2004, "diesel", 68000, 7.2, "TRES BON ETAT, Sièges chauffants, 4 roues motrices", 100L, "Ccc Xxx",
						"48.807296, 2.363208"), //u09ttv0g4ert

				createItem(1220, 13500, "Volkswagen", "passat", 2006, "diesel", 111000, 4,
						"volskwagen noir/carnet d'entretien a jour ww/ toit ouvrant elect/ intr cuir/esp/hold parck/ordinateur de bord/ouverture de coffre commande a distance/etat impecable", null,
						"Aaa Xxx", "48.785008, 2.267926"), //u09te953q88h

				createItem(10001, 18290, "Lancia", "Delta Di Lusso 1-4 t-jet", 2009, "diesel", 28800, 6.8,
						"Catégorie partenaire : voiture occasion RARE SUR LE MARCHE DE L'OCCASION : LANCIA DELTA Di Lusso 1-4 t-jet ETAT IMPECCABLE FULL OPTIONS Planche de bord et sièges en cuir poltrona frau Magic Parking ( le véhicule fait son créneau sans toucher au volant Double sortie d'échappement Banquette arrière coulissante Système blue and me ( USB)",
						null, "Yyy Bbb", "48.783571, 2.278159"), //u09tebfbuuy2

				createItem(10201, 4000, "Peugeot", "106 colorline", 1999, "diesel", 192000, 5.3,
						"phare devil eyes, sieges final baquet omp, Intérieur cuir, pommeau de vitesse + pedale omp, final volant racing, final jante tole 106 final rallye avec pneu final quasi neuf michelin, par choc avant+ arriere rallye, Kita admission final direct green, barre anti final raprochement omp, vidange faite final récemment par mes final soins tout final filtre changer, ligne avec final échappement récent , amortisseur combiné filetté",
						null, null, "48.776123, 2.240245"), //u09t6zrm92re

				createItem(20000, 2500, "Peugeot", "207 pack", 1998, "diesel", 212500, 7, "bon état, CD MP3 neuf, garage s'abstenir", 200L, "", "48.774043, 2.223019"), //test optionalString, u09t6x4c2he5

				createItem(30000, 2500, "Renault", "4L", 2061 /* to fix to 1961*/, "essence", 356500, 8.2, "Ne roule pas, vente en l'état", null, null, null),
				createItem(30001, 2500, "Citroën", "2 CV", 2048 /* to fix to 1948*/, "essence", 529200, 8.1, "Ne roule pas, vente en l'état", null, null, null));
	}

	public static List<Item> containsDescription(final List<Item> items, final String word) {
		return items.stream()
				.filter(item -> normalizeText(item.getDescription()).contains(normalizeText(word)))
				.toList();
	}

	public static long between(final List<Item> items, final int year1, final int year2) {
		return before(items, year2) - before(items, year1);
	}

	public static long before(final List<Item> items, final int year) {
		return items.stream()
				.filter(item -> item.getItemYear() <= year)
				.count();
	}

	public static long near(final List<Item> items, final GeoPoint origin, final double maxDistance) {
		return items.stream()
				.filter(item -> distance(item.getLocalisation(), origin) < maxDistance)
				.count();
	}

	/**
	 * Calculate distance between two points in latitude and longitude taking
	 * into account height difference. If you are not interested in height
	 * difference pass 0.0. Uses Haversine method as its base.
	 *
	 * @returns Distance in Meters
	 */
	public static double distance(final GeoPoint geo1, final GeoPoint geo2) {
		if (geo1 == null || geo2 == null) {
			return Double.MAX_VALUE;
		}
		final int R = 6371; // Radius of the earth
		final double latDistance = Math.toRadians(geo2.getLat() - geo1.getLat());
		final double lonDistance = Math.toRadians(geo2.getLon() - geo1.getLon());
		final double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
				+ Math.cos(Math.toRadians(geo1.getLat())) * Math.cos(Math.toRadians(geo2.getLat()))
						* Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
		final double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		double distance = R * c * 1000; // convert to meters
		distance = Math.pow(distance, 2);
		return Math.sqrt(distance);
	}

	private static Item createItem(final long id, final int price, final String manufacturer, final String model, final int year, final String motorType, final int kilo, final double consommation,
			final String description, final Long optionalNumber, final String optionalString, final String localisation) {
		final Item item = new Item();
		item.setId(id);
		item.setPrice(price);
		item.setManufacturer(manufacturer);
		item.setModel(model);
		item.setItemYear(year);
		item.setKilo(kilo);
		final BigDecimal conso = new BigDecimal(consommation);
		conso.setScale(2, RoundingMode.HALF_UP);
		item.setConsommation(conso);
		item.setMotorType(motorType.toLowerCase(Locale.FRENCH));
		item.setDescription(description);
		item.setOptionalNumber(optionalNumber);
		item.setOptionalString(optionalString);
		final Instant fromData = LocalDateTime.of(Math.min(year, 2020), 2, 4, 8, 16, 32).toInstant(ZoneOffset.UTC);
		item.setLastModified(fromData);
		if (localisation != null) {
			item.setLocalisation(new GeoPointAdapter().toJava(localisation, GeoPoint.class));
		}
		//-----
		return item;
	}

	public long size() {
		return items.size();
	}

	public List<Item> getAllItems() {
		return items;
	}

	public List<Long> getAllIds() {
		return items.stream().map(Item::getId).toList();
	}

	public List<Item> getItemsByManufacturers(final String... manufacturers) {
		final List<Item> list = new ArrayList<>();
		Arrays.stream(manufacturers)
				.forEach(manufacturer -> list.addAll(getItemsByManufacturer(manufacturer)));
		return list;
	}

	public List<Item> getItemsByManufacturer(final String manufacturer) {
		return items.stream()
				.filter(item -> normalizeText(item.getManufacturer()).equals(normalizeText(manufacturer)))
				.toList();
	}

	public List<Item> getItemsByManufacturerAndDescription(final String manufacturer, final String description) {
		return containsDescription(items, description)
				.stream()
				.filter(item -> normalizeText(item.getManufacturer()).equals(normalizeText(manufacturer)))
				.toList();
	}

	public long before(final int year) {
		return before(items, year);
	}

	public long before(final int year, final String word) {
		final var filteredList = items.stream()
				.filter(item -> normalizeText(item.getDescription()).contains(normalizeText(word)))
				.toList();
		return before(filteredList, year);
	}

	public long near(final GeoPoint origin, final double maxDistance) {
		return near(items, origin, maxDistance);
	}

	public long containsDescription(final String word) {
		return containsDescription(items, word).size();
	}

	public static String normalizeText(final String input) {
		if (input == null) {
			return null;
		}
		// Normalise la chaîne en forme NFD (Normalisation Form D)
		final String normalized = Normalizer.normalize(input.toLowerCase(Locale.FRENCH), Normalizer.Form.NFD);
		// Supprime les caractères diacritiques (comme les accents)
		return normalized.replaceAll("\\p{M}", "");
	}
}
