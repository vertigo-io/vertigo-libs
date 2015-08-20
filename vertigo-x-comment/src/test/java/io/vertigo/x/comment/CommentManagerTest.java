package io.vertigo.x.comment;

import io.vertigo.core.App;
import io.vertigo.core.Home;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.KeyConcept;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountBuilder;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class CommentManagerTest {
	private static App app;
	private static URI<Account> account1Uri;
	private static URI<Account> account2Uri;
	private static URI<KeyConcept> keyConcept1Uri;

	@Inject
	private CommentManager commentManager;

	@Before
	public void setUp() {
		app = new App(MyApp.config());
		Injector.injectMembers(this, Home.getComponentSpace());
		initData();
	}

	@After
	public void tearDown() {
		app.close();
	}

	private static void initData() {
		final Account testAccount1 = new AccountBuilder("1").withDisplayName("Palmer Luckey").withEmail("palmer.luckey@yopmail.com").build();
		final Account testAccount2 = new AccountBuilder("2").withDisplayName("Bill Clinton").withEmail("bill.clinton@yopmail.com").build();
		account1Uri = DtObjectUtil.createURI(Account.class, testAccount1.getId());
		account2Uri = DtObjectUtil.createURI(Account.class, testAccount2.getId());

		final AccountGroup testAccountGroup1 = new AccountGroup("100", "TIME's cover");
		final URI<AccountGroup> group1Uri = DtObjectUtil.createURI(AccountGroup.class, testAccountGroup1.getId());

		final AccountManager accountManager = Home.getComponentSpace().resolve(AccountManager.class);
		accountManager.saveAccount(testAccount1);
		accountManager.saveAccount(testAccount2);
		accountManager.saveGroup(testAccountGroup1);

		accountManager.attach(account1Uri, group1Uri);
		accountManager.attach(account2Uri, group1Uri);

		//on triche un peu, car AcountGroup n'est pas un KeyConcept
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(AccountGroup.class);
		keyConcept1Uri = new URI<>(dtDefinition, 10);
		keyConcept1Uri = new URI<>(dtDefinition, 20);
	}

	@Test
	public void testComments() {
		final Comment comment = new CommentBuilder()
				.withAuthor(account1Uri)
				.withMsg("Tu as bien fait de partir, Arthur Rimbaud! Tes dix-huit ans réfractaires à l'amitié, à la malveillance, à la sottise des poètes de Paris ainsi qu'au ronronnement d'abeille stérile de ta famille ardennaise un peu folle, tu as bien fait de les éparpiller aux vents du large..")
				.build();
		for (int i = 0; i < 10; i++) {
			commentManager.publish(comment, keyConcept1Uri);
		}

		Assert.assertEquals(10, commentManager.getComments(keyConcept1Uri).size());
	}
}
