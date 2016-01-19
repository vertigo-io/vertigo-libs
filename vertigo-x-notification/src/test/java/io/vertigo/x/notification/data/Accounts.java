package io.vertigo.x.notification.data;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.util.ListBuilder;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountBuilder;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;

import java.util.Arrays;
import java.util.List;

public final class Accounts {

	private Accounts() {
		//rien
	}

	public static URI<Account> createAccountURI(final String id) {
		return DtObjectUtil.createURI(Account.class, id);
	}

	public static URI<AccountGroup> createGroupURI(final String id) {
		return DtObjectUtil.createURI(AccountGroup.class, id);
	}

	public static void initData(final AccountManager accountManager) {
		final Account testAccount0 = new AccountBuilder("0").withDisplayName("John doe").withEmail("john.doe@yopmail.com").build();
		final Account testAccount1 = new AccountBuilder("1").withDisplayName("Palmer Luckey").withEmail("palmer.luckey@yopmail.com").build();
		final Account testAccount2 = new AccountBuilder("2").withDisplayName("Bill Clinton").withEmail("bill.clinton@yopmail.com").build();
		accountManager.saveAccounts(Arrays.asList(testAccount0, testAccount1, testAccount2));

		final URI<Account> accountURI1 = createAccountURI(testAccount1.getId());
		final URI<Account> accountURI2 = createAccountURI(testAccount2.getId());

		final AccountGroup testAccountGroup1 = new AccountGroup("100", "TIME's cover");
		final URI<AccountGroup> group1Uri = DtObjectUtil.createURI(AccountGroup.class, testAccountGroup1.getId());
		accountManager.saveGroup(testAccountGroup1);

		accountManager.attach(accountURI1, group1Uri);
		accountManager.attach(accountURI2, group1Uri);

		final AccountGroup groupAll = new AccountGroup("ALL", "Everyone");
		final URI<AccountGroup> groupAllUri = DtObjectUtil.createURI(AccountGroup.class, groupAll.getId());
		accountManager.saveGroup(groupAll);
		accountManager.attach(accountURI1, groupAllUri);
		accountManager.attach(accountURI2, groupAllUri);

		//---create 5 000 noisy data
		final List<Account> accounts = createAccounts();
		for (final Account account : accounts) {
			accountManager.saveAccounts(accounts);
			final URI<Account> accountUri = createAccountURI(account.getId());
			accountManager.attach(accountUri, groupAllUri);
		}

	}

	private static int SEQ_ID = 10;

	private static List<Account> createAccounts() {
		return new ListBuilder<Account>()
				.add(createAccount("Jean Meunier", "jmeunier@yopmail.com"))
				.add(createAccount("Emeline Granger", "egranger@yopmail.com"))
				.add(createAccount("Silvia Robert", "sylv.robert@yopmail.com"))
				.add(createAccount("Manuel Long", "manu@yopmail.com"))
				.add(createAccount("David Martin", "david.martin@yopmail.com"))
				.add(createAccount("Véronique LeBourgeois", "vero89@yopmail.com"))
				.add(createAccount("Bernard Dufour", "bdufour@yopmail.com"))
				.add(createAccount("Nicolas Legendre", "nicolas.legendre@yopmail.com"))
				.add(createAccount("Marie Garnier", "marie.garnier@yopmail.com"))
				.add(createAccount("Hugo Bertrand", "hb@yopmail.com"))
				.build();
	}

	private static Account createAccount(final String displayName, final String email) {
		return new AccountBuilder(Integer.toString(SEQ_ID++))
				.withDisplayName(displayName)
				.withEmail(email)
				.build();
	}
}
