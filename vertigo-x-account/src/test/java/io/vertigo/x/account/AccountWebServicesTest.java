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
package io.vertigo.x.account;

import io.vertigo.core.App;
import io.vertigo.core.Home;
import io.vertigo.vega.plugins.rest.routesregister.sparkjava.VegaSparkApplication;
import io.vertigo.x.account.data.Accounts;

import org.apache.http.HttpStatus;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import spark.Spark;

import com.jayway.restassured.RestAssured;

/**
 * Account addon web services tests.
 * @author npiedeloup
 */
public final class AccountWebServicesTest {
	private static final int WS_PORT = 8088;
	private static App app;

	@BeforeClass
	public static void setUp() {
		app = new App(MyApp.vegaConfig());
		doSetUp();

		final AccountManager accountManager = Home.getComponentSpace().resolve(AccountManager.class);
		Accounts.initData(accountManager);
	}

	@AfterClass
	public static void tearDown() {
		app.close();
	}

	private static void doSetUp() {
		Spark.setPort(WS_PORT);

		//RestAsssured init
		RestAssured.baseURI = "http://localhost";
		RestAssured.port = WS_PORT;

		//init must be done foreach tests as Home was restarted each times
		new VegaSparkApplication().init();
	}

	@Test
	public void testGetAccountById() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/account/api/accounts/1");
	}

	@Test
	public void testGetPhotoByAccountId() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/account/api/accounts/1/photo");
	}

	@Test
	public void testGetAllGroups() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/account/api/groups");
	}

	@Test
	public void testGetGroupById() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/account/api/groups/100");
	}

	@Test
	public void testGetAddonStatus() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/account/status");
	}

	@Test
	public void testGetStats() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/account/stats");
	}

	@Test
	public void testGetConfig() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/account/config");
	}

	@Test
	public void testGetHelp() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/account/help");
	}

}
