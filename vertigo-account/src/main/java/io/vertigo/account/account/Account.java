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
package io.vertigo.account.account;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.data.stereotype.Field;

/**
 * This class defines the account of a user/organization/system.
 *
 * @author pchretien
 */
public record Account(
		@Field(type = "ID", smartType = "DoXAccountId", cardinality = Cardinality.ONE, label = "id") String id,
		@Field(smartType = "DoXAccountName", label = "displayName") String displayName,
		@Field(smartType = "DoXAccountEmail", label = "email") String email,
		@Field(smartType = "DoXAccountPhoto", label = "photo") String photo,
		@Field(smartType = "DoXAccountAuthToken", label = "authToken") String authToken) implements Entity {

	private static final long serialVersionUID = 7509030642946579907L;

	public Account {
		Assertion.check().isNotBlank(id);
	}

	/**
	 * Static method factory for AccountBuilder
	 * @param id the id of the account
	 * @return AccountBuilder
	 */
	public static AccountBuilder builder(final String id) {
		return new AccountBuilder(id);
	}

	/** {@inheritDoc} */
	@Override
	public UID<Account> getUID() {
		return UID.of(Account.class, this.id());
	}
}
