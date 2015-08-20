package io.vertigo.x.impl.account;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.lang.Option;
import io.vertigo.lang.Plugin;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountGroup;

import java.util.Collection;
import java.util.List;
import java.util.Set;

/**
 * @author pchretien
 */
public interface AccountStorePlugin extends Plugin {

	long getAccountsCount();

	boolean exists(URI<Account> accountURI);

	Account getAccount(URI<Account> accountURI);

	Set<URI<AccountGroup>> getGroupURIs(URI<Account> accountURI);

	//l'id doit être renseigné  pour chaque account !!
	void saveAccounts(List<Account> account);

	//-----Gestion des groupes
	long getGroupsCount();

	//il est possible de proposer tous les groupes mais pas tous les accounts ?
	Collection<AccountGroup> getAllGroups();

	AccountGroup getGroup(URI<AccountGroup> groupURI);

	Set<URI<Account>> getAccountURIs(URI<AccountGroup> groupURI);

	void saveGroup(AccountGroup group);

	//-----
	void attach(URI<Account> accountURI, URI<AccountGroup> groupURI);

	void detach(URI<Account> accountURI, URI<AccountGroup> groupURI);

	//-----
	void setPhoto(URI<Account> accountURI, VFile photo);

	Option<VFile> getPhoto(URI<Account> accountURI);
}
