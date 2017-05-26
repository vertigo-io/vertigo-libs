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
package io.vertigo.geo.services.geocoder;

import io.vertigo.lang.Assertion;

/**
 * Objet permettant de définir un emplacement par ses coordonnées.
 * @author spoitrenaud
 */
public final class GeoLocation {
	public static final GeoLocation UNDEFINED = new GeoLocation();
	private final String countryCode;
	private final String level1;//région
	private final String level2; //département
	private final String locality;

	private final Double latitude;
	private final Double longitude;

	//	private final String accuracy;

	/**
	 * Constructeur public
	 * Notamment utilisé pour la désérialisation.
	 */
	public GeoLocation() {
		latitude = null;
		longitude = null;
		//		accuracy = null;
		this.countryCode = null;
		this.level1 = null;
		this.level2 = null;
		this.locality = null;
	}

	public GeoLocation(final double latitude, final double longitude) {
		this(latitude, longitude, null, null, null, null);
	}

	public GeoLocation(final double latitude, final double longitude, final String countryCode, final String level1, final String level2, final String locality) {
		//	Assertion.notEmpty(accuracy);
		Assertion.checkNotNull(latitude);
		Assertion.checkNotNull(longitude);
		Assertion.checkArgument((!Double.isNaN(latitude) && !Double.isNaN(longitude)), "UNDEFINDED or defined");
		//-----
		//		this.accuracy = accuracy;
		this.latitude = Double.isNaN(latitude) ? null : latitude;
		this.longitude = Double.isNaN(longitude) ? null : longitude;
		this.countryCode = countryCode;
		this.level1 = level1;
		this.level2 = level2;
		this.locality = locality;
	}

	/**
	 * @return Latitude du résultat
	 */
	public double getLatitude() {
		Assertion.checkArgument(latitude != null, "latitude is not defined, Use isUndefined");
		//-----
		return latitude;
	}

	/**
	 * @return Longitude du résultat
	 */
	public double getLongitude() {
		Assertion.checkArgument(longitude != null, "longitude is not defined, Use isUndefined");
		return longitude;
	}

	public boolean isUndefined() {
		return latitude == null;
	}

	public String getLocality() {
		return locality;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public String getLevel1() {
		return level1;
	}

	public String getLevel2() {
		return level2;
	}

	@Override
	public String toString() {
		if (isUndefined()) {
			return "UNDEFINDED";
		}
		return "lat:" + latitude + " ; lng:" + longitude;
	}
}
