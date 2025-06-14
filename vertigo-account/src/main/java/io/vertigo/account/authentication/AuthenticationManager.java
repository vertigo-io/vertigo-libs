/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.account.authentication;

import java.util.Optional;

import io.vertigo.account.account.Account;
import io.vertigo.core.node.component.Manager;

/**
 * Authentication.
 * 	- login
 * 	- logout
 *
 * @author npiedeloup
 */
public interface AuthenticationManager extends Manager {

	/**
	 * Tries and checks to login. Login user if successfull.
	 * @param token the authentification token
	 * @return Account the user account (Principal)
	 */
	Optional<Account> login(final AuthenticationToken token);
	
	/**
	 * Tries and checks to login. (don't change current login user)
	 * @param token the authentification token
	 * @return Account the user account (Principal)
	 */
	Optional<Account> tryLoginAccount(final AuthenticationToken token);

	/**
	 * Closes the current session.
	 */
	void logout();

	/**
	 * @return the current logged account
	 */
	Optional<Account> getLoggedAccount();

}
