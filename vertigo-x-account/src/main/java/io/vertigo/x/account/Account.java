/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.x.account;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.lang.Assertion;

/**
 * This class defines the account of a user/organization/system.
 s* 
 * @author pchretien
 */
@DtDefinition
public final class Account implements DtObject {
	private static final long serialVersionUID = 7509030642946579907L;

	@Field(type = "PRIMARY_KEY", domain = "DO_X_ACCOUNT_ID", required = true, label = "id")
	private final String id;

	@Field(domain = "DO_X_ACCOUNT_NAME", label = "displayName")
	private final String displayName;

	@Field(domain = "DO_X_ACCOUNT_EMAIL", label = "email")
	private final String email;

	Account(final String id, final String displayName, final String email) {
		Assertion.checkArgNotEmpty(id);
		//-----
		this.id = id;
		this.displayName = displayName;
		this.email = email;
	}

	/**
	 * @return the id of the account
	 */
	public String getId() {
		return id;
	}

	/**
	 * @return the diplayName
	 */
	public String getDisplayName() {
		return displayName;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
}
