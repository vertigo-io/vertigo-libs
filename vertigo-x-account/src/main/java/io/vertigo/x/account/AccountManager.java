package io.vertigo.x.account;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.lang.Component;

/**
 * @author pchretien
 */
public interface AccountManager extends Component {

	/**
	 * @param accountURI Account to logged
	 */
	void login(URI<Account> accountURI);

	/**
	 * @return Logged account
	 */
	URI<Account> getLoggedAccount();

	/**
	 * Gets the default photo of an account.
	 * 
	 * @return the photo as a file
	 */
	VFile getDefaultPhoto();

	/**
	 * @return the tore of accounts
	 */
	AccountStore getStore();
}
