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
package io.vertigo.vega.webservice.data.ws;

import io.vertigo.core.lang.VUserException;
import io.vertigo.vega.webservice.WebServices;
import io.vertigo.vega.webservice.data.domain.GeoPoint;
import io.vertigo.vega.webservice.data.domain.GeoPointJson;
import io.vertigo.vega.webservice.stereotype.GET;
import io.vertigo.vega.webservice.stereotype.InnerBodyParam;
import io.vertigo.vega.webservice.stereotype.POST;
import io.vertigo.vega.webservice.stereotype.PathParam;
import io.vertigo.vega.webservice.stereotype.PathPrefix;
import io.vertigo.vega.webservice.stereotype.QueryParam;

//basé sur http://www.restapitutorial.com/lessons/httpmethods.html

@PathPrefix("/test/smartTypes")
public final class SmartTypesTestWebServices implements WebServices {

	@GET("/text/path/{geoPoint}")
	public GeoPoint getPathText(@PathParam("geoPoint") final GeoPoint geoPoint) {
		if (geoPoint.getLat() + geoPoint.getLon() > 0.00001) {
			throw new VUserException("Only accept Lat == -Lon (" + geoPoint.toString() + ")");
		}
		return geoPoint;
	}

	@GET("/json/path/{geoPoint}")
	public GeoPointJson getPathJson(@PathParam("geoPoint") final GeoPointJson geoPoint) {
		if (geoPoint.getLat() + geoPoint.getLon() > 0.00001) {
			throw new VUserException("Only accept Lat == -Lon (" + geoPoint.toString() + ")");
		}
		return geoPoint;
	}

	@GET("/text/query")
	public GeoPoint getQueryText(@QueryParam("geoPoint") final GeoPoint geoPoint) {
		if (geoPoint.getLat() + geoPoint.getLon() > 0.00001) {
			throw new VUserException("Only accept Lat == -Lon (" + geoPoint.toString() + ")");
		}
		return geoPoint;
	}

	@GET("/json/query")
	public GeoPointJson getQueryJson(@QueryParam("geoPoint") final GeoPointJson geoPoint) {
		if (geoPoint.getLat() + geoPoint.getLon() > 0.00001) {
			throw new VUserException("Only accept Lat == -Lon (" + geoPoint.toString() + ")");
		}
		return geoPoint;
	}

	@POST("/text/body")
	public GeoPoint getBodyText(final GeoPoint geoPoint) {
		if (geoPoint.getLat() + geoPoint.getLon() > 0.00001) {
			throw new VUserException("Only accept Lat == -Lon (" + geoPoint.toString() + ")");
		}
		return geoPoint;
	}

	@POST("/json/body")
	public GeoPointJson getBodyJson(final GeoPointJson geoPoint) {
		if (geoPoint.getLat() + geoPoint.getLon() > 0.00001) {
			throw new VUserException("Only accept Lat == -Lon (" + geoPoint.toString() + ")");
		}
		return geoPoint;
	}

	@POST("/text/innerbody")
	public GeoPoint getInnerBodyText(@InnerBodyParam("geoPoint") final GeoPoint geoPoint) {
		if (geoPoint.getLat() + geoPoint.getLon() > 0.00001) {
			throw new VUserException("Only accept Lat == -Lon (" + geoPoint.toString() + ")");
		}
		return geoPoint;
	}

	@POST("/json/innerbody")
	public GeoPointJson getInnerBodyJson(@InnerBodyParam("geoPoint") final GeoPointJson geoPoint) {
		if (geoPoint.getLat() + geoPoint.getLon() > 0.00001) {
			throw new VUserException("Only accept Lat == -Lon (" + geoPoint.toString() + ")");
		}
		return geoPoint;
	}
}
