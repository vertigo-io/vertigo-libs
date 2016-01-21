package io.vertigo.x.impl.account;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.file.FileManager;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.WrappedException;
import io.vertigo.persona.security.UserSession;
import io.vertigo.persona.security.VSecurityManager;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;

import java.io.File;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.inject.Inject;

/**
 * @author pchretien
 */
public final class AccountManagerImpl implements AccountManager {
	private static final String X_ACCOUNT_ID = "X_ACCOUNT_ID";
	private final VSecurityManager securityManager;
	private final AccountStorePlugin accountStorePlugin;
	private final VFile defaultPhoto;

	/**
	 * Constructor.
	 * @param accountStorePlugin Account store plugin
	 * @param fileManager File Manager
	 * @param securityManager Security manager
	 */
	@Inject
	public AccountManagerImpl(final AccountStorePlugin accountStorePlugin, final FileManager fileManager, final VSecurityManager securityManager) {
		Assertion.checkNotNull(accountStorePlugin);
		Assertion.checkNotNull(fileManager);
		Assertion.checkNotNull(securityManager);
		//-----
		this.accountStorePlugin = accountStorePlugin;
		this.securityManager = securityManager;
		defaultPhoto = createDefaultPhoto(fileManager);
	}

	private static VFile createDefaultPhoto(final FileManager fileManager) {
		try {
			return fileManager.createFile(new File(AccountManagerImpl.class.getResource("/io/vertigo/x/impl/account/defaultPhoto.png").toURI()));
		} catch (final URISyntaxException e) {
			throw new WrappedException(e);
		}
	}

	/** {@inheritDoc} */
	@Override
	public void login(final URI<Account> accountURI) {
		final UserSession userSession = securityManager.getCurrentUserSession().get();
		userSession.putAttribute(X_ACCOUNT_ID, accountURI);
	}

	/** {@inheritDoc} */
	@Override
	public URI<Account> getLoggedAccount() {
		final UserSession userSession = securityManager.getCurrentUserSession().get();
		final URI<Account> accountUri = userSession.getAttribute(X_ACCOUNT_ID);
		Assertion.checkNotNull(accountUri, "Account was not logged");
		return accountUri;
	}

	/** {@inheritDoc} */
	@Override
	public long getAccountsCount() {
		return accountStorePlugin.getAccountsCount();
	}

	/** {@inheritDoc} */
	@Override
	public Account getAccount(final URI<Account> accountURI) {
		return accountStorePlugin.getAccount(accountURI);
	}

	/** {@inheritDoc} */
	@Override
	public Set<URI<AccountGroup>> getGroupURIs(final URI<Account> accountURI) {
		return accountStorePlugin.getGroupURIs(accountURI);
	}

	/** {@inheritDoc} */
	@Override
	public void saveAccounts(final List<Account> accounts) {
		accountStorePlugin.saveAccounts(accounts);
	}

	/** {@inheritDoc} */
	@Override
	public long getGroupsCount() {
		return accountStorePlugin.getGroupsCount();
	}

	/** {@inheritDoc} */
	@Override
	public Collection<AccountGroup> getAllGroups() {
		return accountStorePlugin.getAllGroups();
	}

	/** {@inheritDoc} */
	@Override
	public AccountGroup getGroup(final URI<AccountGroup> groupURI) {
		return accountStorePlugin.getGroup(groupURI);
	}

	/** {@inheritDoc} */
	@Override
	public Set<URI<Account>> getAccountURIs(final URI<AccountGroup> groupURI) {
		return accountStorePlugin.getAccountURIs(groupURI);
	}

	/** {@inheritDoc} */
	@Override
	public void saveGroup(final AccountGroup saveGroup) {
		accountStorePlugin.saveGroup(saveGroup);
	}

	/** {@inheritDoc} */
	@Override
	public void attach(final URI<Account> accountURI, final URI<AccountGroup> groupURI) {
		accountStorePlugin.attach(accountURI, groupURI);
	}

	/** {@inheritDoc} */
	@Override
	public void detach(final URI<Account> accountURI, final URI<AccountGroup> groupURI) {
		accountStorePlugin.detach(accountURI, groupURI);
	}

	/** {@inheritDoc} */
	@Override
	public void setPhoto(final URI<Account> accountURI, final VFile photo) {
		accountStorePlugin.setPhoto(accountURI, photo);
	}

	/** {@inheritDoc} */
	@Override
	public VFile getPhoto(final URI<Account> accountURI) {
		return accountStorePlugin.getPhoto(accountURI).getOrElse(defaultPhoto);
	}
}
