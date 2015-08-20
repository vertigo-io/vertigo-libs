package io.vertigo.x.account.data;

import io.codearte.jfairy.Fairy;
import io.codearte.jfairy.producer.person.Person;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountBuilder;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Accounts {

	public static void initData(AccountManager accountManager) {
		final Account testAccount0 = new AccountBuilder("0").withDisplayName("John doe").withEmail("john.doe@yopmail.com").build();
		final Account testAccount1 = new AccountBuilder("1").withDisplayName("Palmer Luckey").withEmail("palmer.luckey@yopmail.com").build();
		final Account testAccount2 = new AccountBuilder("2").withDisplayName("Bill Clinton").withEmail("bill.clinton@yopmail.com").build();
		final URI<Account> account1Uri = DtObjectUtil.createURI(Account.class, testAccount1.getId());
		final URI<Account> account2Uri = DtObjectUtil.createURI(Account.class, testAccount2.getId());

		final AccountGroup testAccountGroup1 = new AccountGroup("100", "TIME's cover");
		final URI<AccountGroup> group1Uri = DtObjectUtil.createURI(AccountGroup.class, testAccountGroup1.getId());

		accountManager.saveAccounts(Arrays.asList(testAccount0, testAccount1, testAccount2));
		accountManager.saveGroup(testAccountGroup1);

		accountManager.attach(account1Uri, group1Uri);
		accountManager.attach(account2Uri, group1Uri);

		//---create 5 000 noisy data 	
		List<Account> accounts = createFairyAccounts();
		accountManager.saveAccounts(accounts);
	}

	public static int id = 10;

	private static List<Account> createFairyAccounts() {
		final Fairy fairy = Fairy.create();
		final List<Account> accounts = new ArrayList<>();
		for (int i = 0; i < 5000; i++) {
			accounts.add(createFairyAccount(fairy));
		}
		return accounts;
	}

	private static Account createFairyAccount(Fairy fairy) {
		Person person = fairy.person();
		return new AccountBuilder(Integer.toString(id++))
				.withDisplayName(person.fullName())
				.withEmail(person.email())
				.build();
	}
}
