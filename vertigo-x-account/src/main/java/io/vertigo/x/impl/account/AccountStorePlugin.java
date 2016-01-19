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
	/**
	 * @return the number of accounts 
	 */
	long getAccountsCount();

	/**
	 * @param accountURI Account uri
	 * @return Account
	 */
	Account getAccount(URI<Account> accountURI);

	Set<URI<AccountGroup>> getGroupURIs(URI<Account> accountURI);

	//l'id doit être renseigné  pour chaque account !!
	/**
	 * Saves a collection of accounts.
	 * Caution : all the accounts must have an id.
	 * @param accounts the list of accounts
	 */
	void saveAccounts(List<Account> accounts);

	/**
	 * @return the number of groups.
	 */
	long getGroupsCount();

	//il est possible de proposer tous les groupes mais pas tous les accounts ?
	/**
	 * Lists all the groups.
	 * @return all the groups.
	 */
	Collection<AccountGroup> getAllGroups();

	/**
	 * Gets the group defined by an URI. 
	 * @param groupURI the group URI
	 * @return the group
	 */
	AccountGroup getGroup(URI<AccountGroup> groupURI);

	/**
	 * Lists the accounts for a defined group.
	 * @param groupURI the group URI
	 * @return the list of acccounts.
	 */
	Set<URI<Account>> getAccountURIs(URI<AccountGroup> groupURI);

	/**
	 * Saves a group.
	 * @param group the group
	 */
	void saveGroup(AccountGroup group);

	/**
	 * Attaches an account to a group.
	 * @param accountURI the account
	 * @param groupURI the group
	 */
	void attach(URI<Account> accountURI, URI<AccountGroup> groupURI);

	/**
	 * Detaches an account from a group.
	 * @param accountURI
	 * @param groupURI
	 */
	void detach(URI<Account> accountURI, URI<AccountGroup> groupURI);

	/**
	 * Defines a photo to an account.
	 * 
	 * @param accountURI the account 
	 * @param photo the photo
	 */
	void setPhoto(URI<Account> accountURI, VFile photo);

	/**
	 * Gets the photo of an account defined by its URI.
	 * 
	 * @param accountURI the account 
	 * @return the photo as a file
	 */
	Option<VFile> getPhoto(URI<Account> accountURI);
}
