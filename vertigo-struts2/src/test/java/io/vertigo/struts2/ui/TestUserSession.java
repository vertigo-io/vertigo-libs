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
package io.vertigo.struts2.ui;

import java.util.Locale;

import io.vertigo.persona.security.UserSession;
import io.vertigo.struts2.domain.users.ApplicationUser;

/**
 * Session d'un utilisateur<br>
 * Un utilisateur possède une liste de profils correspondant à des rêgles au sein d'une ou plusieurs entités.<br>
 * On considère que toute session utilisateur créée implique que l'utilisateur est authentifié.
 *
 * @author cgodard
 */
public final class TestUserSession extends UserSession {

	/**
	 * Serial Version.
	 */
	private static final long serialVersionUID = 2497388902473962429L;

	private ApplicationUser applicationUser;

	/**
	 * @return Default Locale.
	 */
	@Override
	public Locale getLocale() {
		return Locale.FRANCE;
	}

	public void setApplicationUser(final ApplicationUser applicationUser) {
		this.applicationUser = applicationUser;
	}

	public ApplicationUser getApplicationUser() {
		return applicationUser;
	}

}
