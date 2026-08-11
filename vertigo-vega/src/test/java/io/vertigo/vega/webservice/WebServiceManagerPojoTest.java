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
package io.vertigo.vega.webservice;

import java.util.Arrays;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.restassured.RestAssured;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.filter.session.SessionFilter;
import io.restassured.mapper.ObjectMapperType;
import io.restassured.parsing.Parser;
import io.restassured.specification.RequestSpecification;
import io.restassured.specification.ResponseSpecification;
import io.vertigo.core.lang.MapBuilder;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.vega.webservice.data.MyNodeConfig;

public final class WebServiceManagerPojoTest {

	private static final Logger LOG = LogManager.getLogger(WebServiceManagerPojoTest.class);
	private static AutoCloseableNode node;
	private final SessionFilter loggedSessionFilter = new SessionFilter();

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
		RestAssured.config = RestAssuredConfig.config().objectMapperConfig(ObjectMapperConfig.objectMapperConfig().defaultObjectMapperType(ObjectMapperType.GSON));
		RestAssured.registerParser("plain/text", Parser.TEXT);
		RestAssured.given()
				.filter(loggedSessionFilter)
				.get("/test/login");
	}

	@AfterAll
	public static void tearDown() {
		if (node != null) {
			node.close();
		}
	}

	@Test
	public void testPostContact() {
		final Map<String, Object> newContact = createDefaultContact(null);

		loggedAndExpect(RestAssured.given().body(newContact))
				.body("firstName", Matchers.equalTo("Catherine"))
				.statusCode(HttpStatus.SC_OK)
				.when()
				.post("/testPojo/contact");
	}

	@Test
	public void testContactExcludeFieldsOut() {
		final Map<String, Object> newContact = createDefaultContact(null);

		loggedAndExpect(RestAssured.given().body(newContact))
				.body("firstName", Matchers.equalTo("Catherine"))
				.body("email", Matchers.nullValue())
				.statusCode(HttpStatus.SC_OK)
				.when()
				.post("/testPojo/contactExcludeFieldsOut");
	}

	@Test
	public void testContactExcludeFieldsIn() {
		final Map<String, Object> newContact = createDefaultContact(null);

		loggedAndExpect(RestAssured.given().body(newContact))
				.body("firstName", Matchers.equalTo("Catherine"))
				.body("email", Matchers.nullValue())
				.statusCode(HttpStatus.SC_OK)
				.when()
				.post("/testPojo/contactExcludeFieldsIn");
	}

	protected ResponseSpecification loggedAndExpect(final RequestSpecification given) {
		final var expect = given
				.filter(loggedSessionFilter)
				.expect();
		if (LOG.isInfoEnabled()) {
			return expect.log().ifValidationFails();
		}
		return expect;
	}

	protected static Map<String, Object> createDefaultContact(final Long conId) {
		final Map<String, Object> newContact = createContact(conId, "MRS", "Fournier", "Catherine", "1985-10-24",
				"catherine.fournier@gmail.com", "01 91 92 93 94");
		return newContact;
	}

	private static Map<String, Object> createContact(
			final Long conId,
			final String honorific,
			final String name,
			final String firstName,
			final String birthday,
			final String email,
			final String... tels) {
		return new MapBuilder<String, Object>()
				.putNullable("conId", conId)
				.put("honorificCode", honorific)
				.put("name", name)
				.put("firstName", firstName)
				.put("birthday", birthday)
				.put("email", email)
				.put("tels", Arrays.asList(tels))
				.build();
	}

}
