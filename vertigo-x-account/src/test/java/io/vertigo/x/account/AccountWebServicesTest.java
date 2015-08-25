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
import io.vertigo.x.account.data.Accounts;

import org.apache.http.HttpStatus;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import spark.Spark;

import com.jayway.restassured.RestAssured;

/**
 * Account extension web services tests.
 * @author npiedeloup
 */
public final class AccountWebServicesTest {
	private static final int WS_PORT = 8088;
	private static App app;

	static {
		RestAssured.baseURI = "http://localhost";
		RestAssured.port = WS_PORT;
	}

	@BeforeClass
	public static void setUp() {
		Spark.setPort(WS_PORT);
		app = new App(MyAppConfig.vegaConfig());

		final AccountManager accountManager = Home.getComponentSpace().resolve(AccountManager.class);
		Accounts.initData(accountManager);
	}

	@AfterClass
	public static void tearDown() {
		app.close();
	}

	private static void assertStatusCode(final int expectedStatus, final String path) {
		RestAssured.given()
				.expect()
				.statusCode(expectedStatus)
				.log().ifError()
				.when()
				.get(path);
	}

	@Test
	public void testGetAccountById() {
		assertStatusCode(HttpStatus.SC_OK, "/x/account/api/accounts/1");
	}

	@Test
	public void testGetPhotoByAccountId() {
		assertStatusCode(HttpStatus.SC_OK, "/x/account/api/accounts/1/photo");
	}

	@Test
	public void testGetAllGroups() {
		assertStatusCode(HttpStatus.SC_OK, "/x/account/api/groups");
	}

	@Test
	public void testGetGroupById() {
		assertStatusCode(HttpStatus.SC_OK, "/x/account/api/groups/100");
	}

	@Test
	public void testGetStatus() {
		assertStatusCode(HttpStatus.SC_OK, "/x/account/status");
	}

	@Test
	public void testGetStats() {
		assertStatusCode(HttpStatus.SC_OK, "/x/account/stats");
	}

	@Test
	public void testGetConfig() {
		assertStatusCode(HttpStatus.SC_OK, "/x/account/config");
	}

	@Test
	public void testGetHelp() {
		assertStatusCode(HttpStatus.SC_OK, "/x/account/help");
	}

}
