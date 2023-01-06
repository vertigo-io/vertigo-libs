/**
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
package io.vertigo.vega.webservice;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Collections;

import org.apache.http.HttpStatus;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.restassured.RestAssured;
import io.restassured.filter.session.SessionFilter;
import io.restassured.parsing.Parser;
import io.restassured.specification.RequestSpecification;
import io.restassured.specification.ResponseSpecification;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.vega.webservice.data.MyNodeConfig;

public final class WebServiceManagerSmartTypesTest {

	private static final String GEO_POINT_TEXT = "-65.19704,65.19704";
	private static final String GEO_POINT_QUOTED_TEXT = "\"-65.19704,65.19704\"";
	private static final String GEO_POINT_JSON = "{\"lon\":-48.86667,\"lat\":48.86667}";

	private final SessionFilter loggedSessionFilter = new SessionFilter();
	private static AutoCloseableNode node;

	static {
		//RestAsssured init
		RestAssured.port = MyNodeConfig.WS_PORT;
	}

	@BeforeAll
	public static void setUp() {
		node = new AutoCloseableNode(MyNodeConfig.config(true));
	}

	@BeforeEach
	public void preTestLogin() {
		RestAssured.registerParser("plain/text", Parser.TEXT);
		RestAssured.given()
				.filter(loggedSessionFilter)
				.get("/test/login");

	}

	@AfterAll
	public static void tearDown() {
		if (node != null) {
			node.close();
			node = null;
		}
	}

	@Test
	public void testPathText() {
		loggedAndExpect(given().pathParam("geo", GEO_POINT_QUOTED_TEXT))
				.statusCode(HttpStatus.SC_OK)
				.body(Matchers.is(Matchers.containsString(GEO_POINT_TEXT)))
				.when()
				.get("/test/smartTypes/text/path/{geo}");
	}

	@Test
	public void testPathJson() throws UnsupportedEncodingException {

		loggedAndExpect(given().urlEncodingEnabled(false).pathParam("geo", URLEncoder.encode(GEO_POINT_JSON, "UTF8")))
				.statusCode(HttpStatus.SC_OK)
				.body("lat", Matchers.is(Matchers.greaterThan(48.86666F)))
				.body("lat", Matchers.is(Matchers.lessThan(48.86668F)))
				.when()
				.get("/test/smartTypes/json/path/{geo}");
	}

	@Test
	public void testQueryText() {
		loggedAndExpect(given().queryParam("geoPoint", GEO_POINT_QUOTED_TEXT))
				.statusCode(HttpStatus.SC_OK)
				.body(Matchers.is(Matchers.containsString(GEO_POINT_TEXT)))
				.when()
				.get("/test/smartTypes/text/query");
	}

	@Test
	public void testQueryJsonMonofield() {
		loggedAndExpect(given().queryParam("geoPoint", GEO_POINT_JSON))
				.statusCode(HttpStatus.SC_OK)
				.body("lat", Matchers.is(Matchers.greaterThan(48.86666F)))
				.body("lat", Matchers.is(Matchers.lessThan(48.86668F)))
				.when()
				.get("/test/smartTypes/json/query");
	}

	@Test
	public void testBodyText() {
		loggedAndExpect(given().body(GEO_POINT_QUOTED_TEXT))
				.statusCode(HttpStatus.SC_OK)
				.body(Matchers.is(Matchers.containsString(GEO_POINT_TEXT)))
				.when()

				.post("/test/smartTypes/text/body");
	}

	@Test
	public void testBodyJson() {
		loggedAndExpect(given().body(GEO_POINT_JSON))
				.statusCode(HttpStatus.SC_OK)
				.body("lat", Matchers.is(Matchers.greaterThan(48.86666F)))
				.body("lat", Matchers.is(Matchers.lessThan(48.86668F)))
				.when()
				.post("/test/smartTypes/json/body");
	}

	@Test
	public void testInnerBodyText() {
		loggedAndExpect(given().body(Collections.singletonMap("geoPoint", GEO_POINT_TEXT)))
				.statusCode(HttpStatus.SC_OK)
				.body(Matchers.is(Matchers.containsString(GEO_POINT_TEXT)))
				.when()
				.post("/test/smartTypes/text/innerbody");
	}

	@Test
	public void testInnerBodyJson() {
		loggedAndExpect(given().body(Collections.singletonMap("geoPoint", GEO_POINT_JSON)))
				.statusCode(HttpStatus.SC_OK)
				.body("lat", Matchers.is(Matchers.greaterThan(48.86666F)))
				.body("lat", Matchers.is(Matchers.lessThan(48.86668F)))
				.when()
				.post("/test/smartTypes/json/innerbody");
	}

	//=========================================================================

	private static RequestSpecification given() {
		return RestAssured.given();
	}

	/*private ResponseSpecification loggedAndExpect() {
		return RestAssured.given()
				.filter(loggedSessionFilter)
				.expect().log().ifValidationFails();
	}*/

	private ResponseSpecification loggedAndExpect(final RequestSpecification given) {
		return given
				.filter(loggedSessionFilter)
				.expect().log().ifValidationFails();
	}

}
