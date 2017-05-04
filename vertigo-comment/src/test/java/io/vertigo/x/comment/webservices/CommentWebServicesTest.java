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
package io.vertigo.x.comment.webservices;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;

import org.apache.http.HttpStatus;
import org.hamcrest.Matchers;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.jayway.restassured.RestAssured;
import com.jayway.restassured.filter.session.SessionFilter;
import com.jayway.restassured.parsing.Parser;
import com.jayway.restassured.response.Response;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.core.connectors.redis.RedisConnector;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.util.MapBuilder;
import io.vertigo.x.account.services.Account;
import io.vertigo.x.account.services.AccountGroup;
import io.vertigo.x.account.services.AccountServices;
import io.vertigo.x.comment.MyAppConfig;
import io.vertigo.x.comment.data.Accounts;
import io.vertigo.x.comment.services.Comment;
import io.vertigo.x.comment.services.CommentServices;
import redis.clients.jedis.Jedis;
import spark.Spark;

public final class CommentWebServicesTest {
	private static final int WS_PORT = 8088;
	private final SessionFilter sessionFilter = new SessionFilter();
	private static AutoCloseableApp app;

	private static String CONCEPT_KEY_NAME;
	private static URI<Account> account1Uri;
	private static URI<KeyConcept> keyConcept1Uri;
	private static URI<KeyConcept> keyConcept2Uri;

	@Inject
	private RedisConnector redisConnector;
	@Inject
	private CommentServices commentServices;
	@Inject
	private AccountServices accountServices;

	@BeforeClass
	public static void setUp() {
		beforeSetUp();
		app = new AutoCloseableApp(MyAppConfig.vegaConfig());
	}

	@Before
	public void setUpInstance() {
		DIInjector.injectMembers(this, app.getComponentSpace());
		try (final Jedis jedis = redisConnector.getResource()) {
			jedis.flushAll();
		}
		Accounts.initData(accountServices);
		account1Uri = Accounts.createAccountURI("1");

		//on triche un peu, car AcountGroup n'est pas un KeyConcept
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(AccountGroup.class);
		keyConcept1Uri = new URI<>(dtDefinition, "10");
		keyConcept2Uri = new URI<>(dtDefinition, "20");
		CONCEPT_KEY_NAME = dtDefinition.getClassSimpleName();
	}

	@AfterClass
	public static void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	private static void beforeSetUp() {
		Spark.setPort(WS_PORT);

		//RestAsssured init
		RestAssured.baseURI = "http://localhost";
		RestAssured.port = WS_PORT;
	}

	@Before
	public void preTestLogin() {
		RestAssured.registerParser("plain/text", Parser.TEXT);
		RestAssured.given()
				.filter(sessionFilter)
				.get("/test/login?id=1");
	}

	@Test
	public void testGetComments() {
		final Comment comment = Comment.builder()
				.withAuthor(account1Uri)
				.withMsg("Lorem ipsum")
				.build();
		commentServices.publish(account1Uri, comment, keyConcept1Uri);

		//Check we got this comment
		RestAssured.given().filter(sessionFilter)
				.expect()
				.body("size()", Matchers.greaterThanOrEqualTo(1))
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/comment/api/comments?concept=" + CONCEPT_KEY_NAME + "&id=" + keyConcept1Uri.getId());
	}

	@Test
	public void testPublishComment() {
		final Comment newComment = Comment.builder()
				.withAuthor(account1Uri)
				.withMsg("Lorem ipsum")
				.build();

		RestAssured.given().filter(sessionFilter)
				.body(commentToMap(newComment))
				.expect()
				.statusCode(HttpStatus.SC_NO_CONTENT)
				.log().ifError()
				.when()
				.post("/x/comment/api/comments?concept=" + CONCEPT_KEY_NAME + "&id=" + keyConcept1Uri.getId());

		RestAssured.given().filter(sessionFilter)
				.expect()
				.body("size()", Matchers.greaterThanOrEqualTo(1))
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/comment/api/comments?concept=" + CONCEPT_KEY_NAME + "&id=" + keyConcept1Uri.getId());
	}

	@Test
	public void testEditComment() {
		final Comment newComment = Comment.builder()
				.withAuthor(account1Uri)
				.withMsg("Lorem ipsum")
				.build();

		RestAssured.given().filter(sessionFilter)
				.body(commentToMap(newComment))
				.expect()
				.statusCode(HttpStatus.SC_NO_CONTENT)
				.log().ifError()
				.when()
				.post("/x/comment/api/comments?concept=" + CONCEPT_KEY_NAME + "&id=" + keyConcept1Uri.getId());

		final Response response = RestAssured.given().filter(sessionFilter)
				.expect()
				.body("size()", Matchers.greaterThanOrEqualTo(1))
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/comment/api/comments?concept=" + CONCEPT_KEY_NAME + "&id=" + keyConcept1Uri.getId());
		final String uuid = response.body().path("get(0).uuid");

		final Comment editComment = Comment.builder()
				.withUuid(UUID.fromString(uuid))
				.withAuthor(account1Uri)
				.withCreationDate(newComment.getCreationDate())
				.withMsg("edited Lorem ipsum edited")
				.build();

		RestAssured.given().filter(sessionFilter)
				.body(commentToMap(editComment))
				.expect()
				.statusCode(HttpStatus.SC_NO_CONTENT)
				.log().ifError()
				.when()
				.put("/x/comment/api/comments/" + uuid);

		RestAssured.given().filter(sessionFilter)
				.expect()
				.body("size()", Matchers.greaterThanOrEqualTo(1))
				.body("get(0).msg", Matchers.equalTo("edited Lorem ipsum edited"))
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/comment/api/comments?concept=" + CONCEPT_KEY_NAME + "&id=" + keyConcept1Uri.getId());

	}

	@Test
	public void testSeparationComment() {
		final Comment newComment = Comment.builder()
				.withAuthor(account1Uri)
				.withMsg("Lorem ipsum")
				.build();

		RestAssured.given().filter(sessionFilter)
				.body(commentToMap(newComment))
				.expect()
				.statusCode(HttpStatus.SC_NO_CONTENT)
				.log().ifError()
				.when()
				.post("/x/comment/api/comments?concept=" + CONCEPT_KEY_NAME + "&id=" + keyConcept1Uri.getId());

		RestAssured.given().filter(sessionFilter)
				.expect()
				.body("size()", Matchers.equalTo(0))
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/comment/api/comments?concept=" + CONCEPT_KEY_NAME + "&id=" + keyConcept2Uri.getId());
	}

	@Test
	public void testGetStatus() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/comment/status");
	}

	@Test
	public void testGetStats() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/comment/stats");
	}

	@Test
	public void testGetConfig() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/comment/config");
	}

	@Test
	public void testGetHelp() {
		RestAssured.given()
				.expect()
				.statusCode(HttpStatus.SC_OK)
				.log().ifError()
				.when()
				.get("/x/comment/help");
	}

	/*private static String convertDate(final String dateStr) throws ParseException {
		if (dateStr == null) {
			return null;
		}
		final Date date = new SimpleDateFormat("dd/MM/yyyy").parse(dateStr);
		return convertDate(date);
	}*/

	private static String convertDate(final Date date) {
		return date == null ? null : new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").format(date);
	}

	private static Map<String, Object> commentToMap(final Comment comment) {
		return new MapBuilder<String, Object>()
				.put("uuid", comment.getUuid())
				.put("author", comment.getAuthor().urn())
				.put("msg", comment.getMsg())
				.put("creationDate", convertDate(comment.getCreationDate()))
				.putNullable("lastModified", convertDate(comment.getLastModified()))
				.build();
	}
}
