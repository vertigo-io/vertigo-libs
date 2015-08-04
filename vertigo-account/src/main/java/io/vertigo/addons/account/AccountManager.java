package io.vertigo.addons.account;

import io.vertigo.lang.Component;

/**
 * @author pchretien
 */
public interface AccountManager extends Component {
	AccountStore getStore();
}
