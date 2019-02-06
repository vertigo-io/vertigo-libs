/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.geo;

import io.vertigo.app.config.Feature;
import io.vertigo.app.config.Features;
import io.vertigo.geo.impl.services.geocoder.GeoCoderManagerImpl;
import io.vertigo.geo.plugins.geocoder.google.GoogleGeoCoderPlugin;
import io.vertigo.geo.services.geocoder.GeoCoderManager;

/**
 * Defines the 'geo' extension
 * @author mlaroche
 */
public final class GeoFeatures extends Features<GeoFeatures> {

	/**
	 * Construtor;
	 */
	public GeoFeatures() {
		super("vertigo-geo");
	}

	/**
	 * Activates notifications
	 * @return the features
	 */
	@Feature("geocoding")
	public GeoFeatures withGeocoding() {
		getModuleConfigBuilder().addComponent(GeoCoderManager.class, GeoCoderManagerImpl.class);
		return this;
	}

	/**
	 * Activates comments
	 * @return the features
	 */
	@Feature("googleGeocoder")
	public GeoFeatures withGoogleGeocoder() {
		getModuleConfigBuilder().addPlugin(GoogleGeoCoderPlugin.class);
		return this;
	}

	@Override
	protected void buildFeatures() {
		// nothing
	}
}
