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
package io.vertigo.addons.notification;

import io.vertigo.core.App;
import io.vertigo.core.Home;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.vega.plugins.rest.routesregister.sparkjava.VegaSparkApplication;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountBuilder;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;

import org.apache.http.HttpStatus;
import org.hamcrest.Matchers;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import spark.Spark;

import com.jayway.restassured.RestAssured;
import com.jayway.restassured.filter.session.SessionFilter;
import com.jayway.restassured.parsing.Parser;

public final class NotificationWebServicesTest {
	private static final int WS_PORT = 8088;
	private final SessionFilter sessionFilter = new SessionFilter();
	private static App app;

	@BeforeClass
	public static void setUp() {
		app = new App(MyApp.config());
		doSetUp();

		initData();
	}

	@Before
	public void preTestLogin() {
		RestAssured.registerParser("plain/text", Parser.TEXT);
		RestAssured.given()
				.filter(sessionFilter)
				.get("/test/login?id=1");
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

	private static void initData() {

		final Account testAccount1 = new AccountBuilder("1").withDisplayName("Palmer Luckey").withEmail("palmer.luckey@yopmail.com").build();
		final Account testAccount2 = new AccountBuilder("2").withDisplayName("Bill Clinton").withEmail("bill.clinton@yopmail.com").build();
		final URI<Account> account1Uri = DtObjectUtil.createURI(Account.class, testAccount1.getId());
		final URI<Account> account2Uri = DtObjectUtil.createURI(Account.class, testAccount2.getId());

		final AccountGroup testAccountGroup1 = new AccountGroup("100", "TIME's cover");
		final URI<AccountGroup> group1Uri = DtObjectUtil.createURI(AccountGroup.class, testAccountGroup1.getId());

		final AccountManager accountManager = Home.getComponentSpace().resolve(AccountManager.class);
		accountManager.saveAccount(testAccount1);
		accountManager.saveAccount(testAccount2);
		accountManager.saveGroup(testAccountGroup1);

		accountManager.attach(account1Uri, group1Uri);
		accountManager.attach(account2Uri, group1Uri);
	}

	@Test
	public void testGetCurrentNotifications() {
		final NotificationManager notificationManager = Home.getComponentSpace().resolve(NotificationManager.class);
		final Notification notification = new NotificationBuilder()
				.withSender("AddonTest")
				.withType("MSG")
				.withTitle("Message de Vertigo")
				.withMsg("Lorem ipsum")
				.build();
		notificationManager.send(notification, DtObjectUtil.createURI(AccountGroup.class, "100"));

		RestAssured.given().filter(sessionFilter)
				.expect()
				.body("size()", Matchers.greaterThanOrEqualTo(1))
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/notification/api/messages");
	}

	@Test
	public void testGetRemovetNotifications() {
		final NotificationManager notificationManager = Home.getComponentSpace().resolve(NotificationManager.class);
		final Notification notification = new NotificationBuilder()
				.withSender("AddonTest")
				.withType("MSG")
				.withTitle("Message de Vertigo")
				.withMsg("Lorem ipsum")
				.build();
		notificationManager.send(notification, DtObjectUtil.createURI(AccountGroup.class, "100"));

		RestAssured.given().filter(sessionFilter)
				.expect()
				.body("size()", Matchers.equalTo(1))
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/notification/api/messages");

		RestAssured.given().filter(sessionFilter)
				.expect()
				.statusCode(HttpStatus.SC_NO_CONTENT)
				.log().ifError()
				.when()
				.delete("/x/notification/api/messages/" + notification.getUuid().toString());

		RestAssured.given().filter(sessionFilter)
				.expect()
				.body("size()", Matchers.equalTo(0))
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/notification/api/messages");

	}

	@Test
	public void testGetAddonStatus() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/notification/status");
	}

	@Test
	public void testGetAddonStats() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/notification/stats");
	}

	@Test
	public void testGetAddonConfig() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/notification/config");
	}

	@Test
	public void testGetAddonHelp() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/notification/help");
	}

}
