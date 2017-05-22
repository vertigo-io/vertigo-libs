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
package io.vertigo.social.comment.services;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import io.vertigo.account.identity.Account;
import io.vertigo.account.identity.AccountGroup;
import io.vertigo.account.identity.IdentityManager;
import io.vertigo.app.AutoCloseableApp;
import io.vertigo.app.Home;
import io.vertigo.commons.impl.connectors.redis.RedisConnector;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.social.MyAppConfig;
import io.vertigo.social.comment.data.Accounts;
import io.vertigo.social.services.comment.Comment;
import io.vertigo.social.services.comment.CommentServices;
import redis.clients.jedis.Jedis;

public class CommentManagerTest {

	@Inject
	private IdentityManager identityManager;
	@Inject
	private CommentServices commentServices;
	@Inject
	private RedisConnector redisConnector;

	private AutoCloseableApp app;
	private URI<KeyConcept> keyConcept1Uri;

	private URI<Account> accountURI1;

	@Before
	public void setUp() {
		app = new AutoCloseableApp(MyAppConfig.vegaConfig());
		DIInjector.injectMembers(this, Home.getApp().getComponentSpace());
		try (final Jedis jedis = redisConnector.getResource()) {
			jedis.flushAll();
		}
		accountURI1 = Accounts.createAccountURI("1");
		Accounts.initData(identityManager);

		//on triche un peu, car AcountGroup n'est pas un KeyConcept
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(AccountGroup.class);
		keyConcept1Uri = new URI<>(dtDefinition, "10");
		keyConcept1Uri = new URI<>(dtDefinition, "20");

	}

	@After
	public void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	@Test
	public void testComments() {
		final Comment comment = Comment.builder()
				.withAuthor(accountURI1)
				.withMsg("Tu as bien fait de partir, Arthur Rimbaud! Tes dix-huit ans réfractaires à l'amitié, à la malveillance, à la sottise des poètes de Paris ainsi qu'au ronronnement d'abeille stérile de ta famille ardennaise un peu folle, tu as bien fait de les éparpiller aux vents du large..")
				.build();
		for (int i = 0; i < 10; i++) {
			commentServices.publish(accountURI1, comment, keyConcept1Uri);
		}

		Assert.assertEquals(10, commentServices.getComments(keyConcept1Uri).size());
	}
}
