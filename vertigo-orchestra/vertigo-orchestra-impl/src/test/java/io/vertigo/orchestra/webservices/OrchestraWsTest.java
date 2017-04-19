/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.orchestra.webservices;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.hamcrest.Matchers;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import io.restassured.RestAssured;
import io.restassured.filter.session.SessionFilter;
import io.restassured.parsing.Parser;
import io.vertigo.app.AutoCloseableApp;
import io.vertigo.app.Home;
import io.vertigo.orchestra.MyAppConfig;
import io.vertigo.orchestra.definitions.OrchestraDefinitionManager;
import io.vertigo.orchestra.definitions.ProcessDefinition;
import io.vertigo.orchestra.definitions.ProcessDefinitionBuilder;
import io.vertigo.orchestra.definitions.ProcessType;
import io.vertigo.orchestra.services.OrchestraServices;
import io.vertigo.orchestra.services.execution.engine.EmptyActivityEngine;
import io.vertigo.util.DateUtil;

/**
 * Test des WS Orchestra
 * @author mlaroche
 *
 */
public class OrchestraWsTest {

	private static AutoCloseableApp app;

	private final static SessionFilter loggedSessionFilter = new SessionFilter();

	static {
		//RestAsssured init
		RestAssured.port = MyAppConfig.WS_PORT;
	}

	@BeforeClass
	public static void setUp() {
		app = new AutoCloseableApp(MyAppConfig.configWithVega());

		final OrchestraDefinitionManager orchestraDefinitionManager = Home.getApp().getComponentSpace().resolve(OrchestraDefinitionManager.class);
		final OrchestraServices orchestraServices = Home.getApp().getComponentSpace().resolve(OrchestraServices.class);

		final ProcessDefinition processDefinition = new ProcessDefinitionBuilder("TEST_BASIC", "TEST BASIC", ProcessType.SUPERVISED)
				.addActivity("DUMB ACTIVITY", "DUMB ACTIVITY", EmptyActivityEngine.class)
				.build();

		final ProcessDefinition processDefinition2 = new ProcessDefinitionBuilder("TEST_BASIC_2", "TEST BASIC_2", ProcessType.SUPERVISED)
				.addActivity("DUMB ACTIVITY_2", "DUMB ACTIVITY", io.vertigo.orchestra.services.execution.engine.EmptyActivityEngine.class)
				.addActivity("DUMB ACTIVITY_3", "DUMB ACTIVITY", io.vertigo.orchestra.services.execution.engine.DumbErrorActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition);
		orchestraServices.getScheduler().scheduleAt(processDefinition, DateUtil.newDateTime(), Collections.emptyMap());
		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition2);
		orchestraServices.getScheduler().scheduleAt(processDefinition2, DateUtil.newDateTime(), Collections.emptyMap());

		RestAssured.registerParser("plain/text", Parser.TEXT);
		RestAssured.given()
				.filter(loggedSessionFilter)
				.get("/test/login");

	}

	@AfterClass
	public static void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	@Test
	public void testDefinitions() {
		RestAssured.given()
				.filter(loggedSessionFilter)
				.expect()
				.log()
				.all()
				.body("name", Matchers.equalTo("TEST_BASIC"))
				.body("activities", Matchers.hasSize(1))
				.statusCode(HttpStatus.SC_OK)
				.when()
				.get("/orchestra/definitions/TEST_BASIC");
	}

	@Test
	public void testSearchDefinition() {
		final Map<String, Object> body = new HashMap<>();
		body.put("criteria", "TEST");
		//---
		RestAssured.given()
				.filter(loggedSessionFilter)
				.body(body)
				.expect()
				.log()
				.all()
				.body("size()", Matchers.is(2))
				.statusCode(HttpStatus.SC_OK)
				.when()
				.post("/orchestra/definitions/_search");
	}

}
