package io.vertigo.addons.account;

import io.vertigo.dynamo.domain.model.URI;

import java.util.Collection;
import java.util.Set;

/**
 * @author pchretien
 */
public interface AccountStore {
	boolean exists(URI<Account> accountURI);

	Account getAccount(URI<Account> accountURI);

	//il est possible de proposer tous les groupes mais pas tous les accounts ?
	//a terme faire un chunker.
	Collection<Account> getAllAccounts();

	//l'id doit être renseigné !!	
	void saveAccount(Account account);

	//-----Gestion des groupes
	//il est possible de proposer tous les groupes mais pas tous les accounts ?
	Collection<AccountGroup> getAllGroups();

	AccountGroup getGroup(URI<AccountGroup> groupURI);

	void saveGroup(AccountGroup group);

	//-----
	void attach(URI<Account> accountURI, URI<AccountGroup> groupURI);

	void detach(URI<Account> accountURI, URI<AccountGroup> groupURI);

	Set<URI<AccountGroup>> getGroupURIs(URI<Account> accountURI);

	Set<URI<Account>> getAccountURIs(URI<AccountGroup> groupURI);
}
