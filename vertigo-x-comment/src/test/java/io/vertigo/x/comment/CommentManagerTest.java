package io.vertigo.x.comment;

import io.vertigo.app.App;
import io.vertigo.app.Home;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.comment.data.Accounts;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class CommentManagerTest {

	@Inject
	private AccountManager accountManager;
	@Inject
	private CommentManager commentManager;

	private static App app;
	private URI<KeyConcept> keyConcept1Uri;

	private URI<Account> accountURI1;

	@Before
	public void setUp() {
		app = new App(MyAppConfig.config());

		Injector.injectMembers(this, Home.getApp().getComponentSpace());
		accountURI1 = Accounts.createAccountURI("1");

		Accounts.initData(accountManager);
		accountManager.login(accountURI1);

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
		final Comment comment = new CommentBuilder()
				.withAuthor(accountURI1)
				.withMsg("Tu as bien fait de partir, Arthur Rimbaud! Tes dix-huit ans réfractaires à l'amitié, à la malveillance, à la sottise des poètes de Paris ainsi qu'au ronronnement d'abeille stérile de ta famille ardennaise un peu folle, tu as bien fait de les éparpiller aux vents du large..")
				.build();
		for (int i = 0; i < 10; i++) {
			commentManager.publish(comment, keyConcept1Uri);
		}

		Assert.assertEquals(10, commentManager.getComments(keyConcept1Uri).size());
	}
}
