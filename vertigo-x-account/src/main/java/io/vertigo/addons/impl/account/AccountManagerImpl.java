package io.vertigo.addons.impl.account;

import io.vertigo.addons.account.Account;
import io.vertigo.addons.account.AccountGroup;
import io.vertigo.addons.account.AccountManager;
import io.vertigo.addons.account.AccountStore;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.file.FileManager;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.Option;

import java.io.File;
import java.util.Collection;
import java.util.Set;

import javax.inject.Inject;

/**
 * @author pchretien
 */
public final class AccountManagerImpl implements AccountManager {
	private final AccountStore accountStore;
	private final VFile defaultPhoto;

	/**
	 * Constructor.
	 * @param accountPlugin Account store plugin
	 */
	@Inject
	public AccountManagerImpl(final AccountStorePlugin accountPlugin, final FileManager fileManager) {
		Assertion.checkNotNull(accountPlugin);
		Assertion.checkNotNull(fileManager);
		//-----
		accountStore = accountPlugin;
		defaultPhoto = fileManager.createFile("defaultPhoto.png", "image/png", new File(AccountManagerImpl.class.getResource("defaultPhoto.png").getFile()));
	}

	/** {@inheritDoc} */
	@Override
	public long getNbAccounts() {
		return accountStore.getNbAccounts();
	}

	/** {@inheritDoc} */
	@Override
	public Account getAccount(final URI<Account> accountURI) {
		return accountStore.getAccount(accountURI);
	}

	/** {@inheritDoc} */
	@Override
	public Set<URI<AccountGroup>> getGroupURIs(final URI<Account> accountURI) {
		return accountStore.getGroupURIs(accountURI);
	}

	/** {@inheritDoc} */
	@Override
	public void saveAccount(final Account account) {
		accountStore.saveAccount(account);
	}

	/** {@inheritDoc} */
	@Override
	public long getNbGroups() {
		return accountStore.getNbGroups();
	}

	/** {@inheritDoc} */
	@Override
	public Collection<AccountGroup> getAllGroups() {
		return accountStore.getAllGroups();
	}

	/** {@inheritDoc} */
	@Override
	public AccountGroup getGroup(final URI<AccountGroup> groupURI) {
		return accountStore.getGroup(groupURI);
	}

	/** {@inheritDoc} */
	@Override
	public Set<URI<Account>> getAccountURIs(final URI<AccountGroup> groupURI) {
		return accountStore.getAccountURIs(groupURI);
	}

	/** {@inheritDoc} */
	@Override
	public void saveGroup(final AccountGroup saveGroup) {
		accountStore.saveGroup(saveGroup);
	}

	/** {@inheritDoc} */
	@Override
	public void attach(final URI<Account> accountURI, final URI<AccountGroup> groupURI) {
		accountStore.attach(accountURI, groupURI);
	}

	/** {@inheritDoc} */
	@Override
	public void detach(final URI<Account> accountURI, final URI<AccountGroup> groupURI) {
		accountStore.detach(accountURI, groupURI);
	}

	/** {@inheritDoc} */
	@Override
	public void setPhoto(final URI<Account> accountURI, final VFile photo) {
		accountStore.setPhoto(accountURI, photo);
	}

	/** {@inheritDoc} */
	@Override
	public VFile getPhoto(final URI<Account> accountURI) {
		final Option<VFile> photo = accountStore.getPhoto(accountURI);
		return photo.getOrElse(defaultPhoto);
	}

}
