/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.struts2.ui.controller.accueil;

import javax.inject.Inject;

import io.vertigo.struts2.core.ContextForm;
import io.vertigo.struts2.core.UiRequestUtil;
import io.vertigo.struts2.domain.users.UserAuthentification;
import io.vertigo.struts2.services.users.UserServices;
import io.vertigo.struts2.ui.controller.AbstractTestActionSupport;

/**
 * @author npiedeloup
 */
public final class LoginAction extends AbstractTestActionSupport {
	private static final long serialVersionUID = 3517185648660870776L;

	@Inject
	private UserServices userServices;

	private final ContextForm<UserAuthentification> utilisateurLoginRef = new ContextForm<>("utilisateur", this);

	/** {@inheritDoc} */
	@Override
	public void initContext() {
		final UserAuthentification utilisateurLogin = new UserAuthentification();
		utilisateurLogin.setLogin("test");
		utilisateurLoginRef.publish(utilisateurLogin);
		toModeEdit();
	}

	/**
	 * Connexion.
	 * @return outcome du login
	 */
	public String login() {
		final UserAuthentification userAuthentification = utilisateurLoginRef.readDto();
		userServices.loginUser(userAuthentification.getLogin(), userAuthentification.getPassword());
		return SUCCESS; //success va sur accueil
	}

	/**
	 * Déconnexion.
	 * @return outcome du logout
	 */
	public String logout() {
		UiRequestUtil.invalidateHttpSession();
		return "reload"; // reload la page
	}

	/** {@inheritDoc} */
	@Override
	public String getPageName() {
		return "Page de connexion";
	}
}
