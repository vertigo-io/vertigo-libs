/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.geo.services.geocoder.google;

import javax.inject.Inject;

import org.junit.Assert;
import org.junit.Test;

import io.vertigo.AbstractTestCaseJU4;
import io.vertigo.geo.services.geocoder.GeoCoderManager;
import io.vertigo.geo.services.geocoder.GeoLocation;

/**
 * @author spoitrenaud
 */
public class GoogleGeoCoderManagerTest extends AbstractTestCaseJU4 {
	@Inject
	private GeoCoderManager geoCoderManager;

	/**
	 * Test de géolocalisation d'une chaîne null.
	 */
	@Test(expected = NullPointerException.class)
	public final void testNull() {
		// On vérifie que la géolocalisation d'une addresse n'existant pas retourne une liste vide
		final GeoLocation geoLocation = geoCoderManager.findLocation(null);
		Assert.assertTrue(geoLocation.isUndefined());
	}

	/**
	 * Test de géolocalisation d'une chaîne vide.
	 */
	public final void testEmpty() {
		// On vérifie que la géolocalisation d'une addresse n'existant pas
		// retourne une liste vide
		final GeoLocation geoLocation = geoCoderManager.findLocation("");
		Assert.assertTrue(geoLocation.isUndefined());
	}

	/**
	 * Test de geolocalisation d'une adresse retournant un seul résultat.
	 * Test avec un accent.
	 */
	@Test
	public final void testEtain() {
		// Géolocalisation
		final String address = "étain,55400,Meuse,Lorraine,FRANCE";
		final GeoLocation geoLocation = geoCoderManager.findLocation(address);
		AssertNear(geoLocation, 49.213506, 5.63623222988, 2);
		Assert.assertEquals("étain", geoLocation.getLocality().toLowerCase());
		Assert.assertEquals("meuse", geoLocation.getLevel2().toLowerCase());
		Assert.assertEquals("grand est", geoLocation.getLevel1().toLowerCase());
		Assert.assertEquals("FR", geoLocation.getCountryCode());
	}

	/**
	 * Test de geolocalisation d'une adresse retournant un seul résultat.
	 */
	@Test
	public final void testOneResult() {
		// Géolocalisation
		final GeoLocation geoLocation = geoCoderManager.findLocation("4, rue du vieux lavoir, 91190, Saint-Aubin");
		AssertNear(geoLocation, 48.713709, 2.138841, 0.1);
	}

	/**
	 * Test de géolocalisation d'une adresse retournant un seul résultat.
	 */
	@Test
	public final void testOneResult2() {
		final GeoLocation geoLocation = geoCoderManager.findLocation("4 rue du VIEux lavoir, 91190 Saint-aubin, france");
		AssertNear(geoLocation, 48.713709, 2.138841, 0.1);
		Assert.assertEquals("essonne", geoLocation.getLevel2().toLowerCase());
	}

	/**
	 * Test de calcul de distance.
	 */
	@Test
	public final void testDistance() {
		final GeoLocation paris = new GeoLocation(48.8667, 2.3333);
		final GeoLocation roma = new GeoLocation(41.9000, 12.4833);

		final double distance = geoCoderManager.distanceKm(paris, roma);
		Assert.assertTrue(Math.abs(distance - 1105.76) < 1);
	}

	//-------------------------------------------------------------------------
	//--------------------------Static-----------------------------------------
	//-------------------------------------------------------------------------

	/**
	 * Test de géolocalisation d'une adresse retournant plusieurs résultats.
	 */
	@Test
	public final void testManyResults() {
		// Géolocalisation
		final GeoLocation coordinates = geoCoderManager.findLocation("brussels");
		AssertNear(coordinates, 50.84807, 4.349427, 2);
	}

	private void AssertNear(final GeoLocation geoLocation, final double latitude, final double longitude, final double distanceMaxKm) {
		Assert.assertTrue(!geoLocation.isUndefined());
		Assert.assertTrue(near(geoLocation, latitude, longitude, distanceMaxKm));
	}

	/**
	 * Méthode permettant de vérifier qu'un résultat se situe bien dans un périmètre donné.
	 *
	 * @param latitude Latitude du centre du périmètre
	 * @param longitude Longitude du centre du périmètre
	 * @param distanceMax le rayon du cercle en km
	 * @return True si le point recherché est dans le périmètre considéré
	 */
	private boolean near(final GeoLocation geoLocation, final double latitude, final double longitude, final double distanceMax) {
		final GeoLocation geoLocation2 = new GeoLocation(latitude, longitude);
		return geoCoderManager.distanceKm(geoLocation, geoLocation2) < distanceMax;
	}
}
