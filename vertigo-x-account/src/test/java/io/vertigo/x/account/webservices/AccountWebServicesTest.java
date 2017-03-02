/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2016, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.x.account.webservices;

import javax.inject.Inject;

import org.apache.http.HttpStatus;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.jayway.restassured.RestAssured;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.x.account.MyAppConfig;
import io.vertigo.x.account.data.Accounts;
import io.vertigo.x.account.services.AccountServices;
import io.vertigo.x.connectors.redis.RedisConnector;
import redis.clients.jedis.Jedis;

/**
 * Account extension web services tests.
 * @author npiedeloup
 */
public final class AccountWebServicesTest {
	private static AutoCloseableApp app;
	@Inject
	private AccountServices accountServices;
	@Inject
	private RedisConnector redisConnector;

	static {
		RestAssured.port = MyAppConfig.WS_PORT;
	}

	@BeforeClass
	public static void setUp() {
		app = new AutoCloseableApp(MyAppConfig.vegaConfig());
	}

	@Before
	public void setUpInstance() {
		DIInjector.injectMembers(this, app.getComponentSpace());
		//-----
		try (final Jedis jedis = redisConnector.getResource()) {
			jedis.flushAll();
		} //populate accounts
		Accounts.initData(accountServices);
	}

	@AfterClass
	public static void tearDown() {
		if (app != null) {
			app.close();
		}
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
