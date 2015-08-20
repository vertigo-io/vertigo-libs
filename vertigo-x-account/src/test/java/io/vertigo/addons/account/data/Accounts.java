package io.vertigo.addons.account.data;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountBuilder;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;

public class Accounts {

	public static void initData(AccountManager accountManager) {
		final Account testAccount0 = new AccountBuilder("0").withDisplayName("John doe").withEmail("john.doe@yopmail.com").build();
		final Account testAccount1 = new AccountBuilder("1").withDisplayName("Palmer Luckey").withEmail("palmer.luckey@yopmail.com").build();
		final Account testAccount2 = new AccountBuilder("2").withDisplayName("Bill Clinton").withEmail("bill.clinton@yopmail.com").build();
		final URI<Account> account1Uri = DtObjectUtil.createURI(Account.class, testAccount1.getId());
		final URI<Account> account2Uri = DtObjectUtil.createURI(Account.class, testAccount2.getId());

		final AccountGroup testAccountGroup1 = new AccountGroup("100", "TIME's cover");
		final URI<AccountGroup> group1Uri = DtObjectUtil.createURI(AccountGroup.class, testAccountGroup1.getId());

		accountManager.saveAccount(testAccount0);
		accountManager.saveAccount(testAccount1);
		accountManager.saveAccount(testAccount2);
		accountManager.saveGroup(testAccountGroup1);

		accountManager.attach(account1Uri, group1Uri);
		accountManager.attach(account2Uri, group1Uri);
	}

}
